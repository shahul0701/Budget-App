const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.getAllAuthUsers = functions.https.onCall(async (data, context) => {
  // Verify admin privileges
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Admin access required');
  }

  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerData: user.providerData,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime
      },
      disabled: user.disabled
    }));
    
    return { users };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Error fetching users');
  }
});