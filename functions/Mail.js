const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
admin.initializeApp();

// Configure nodemailer with your email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred email service
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password
  }
});

exports.sendMonthlyReport = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { email, reportData, isTest } = data;
  
  try {
    // Generate HTML email content
    const emailContent = generateEmailContent(reportData, isTest);
    
    // Setup email options
    const mailOptions = {
      from: functions.config().gmail.email,
      to: email,
      subject: isTest ? 'Test: Your Monthly Financial Report' : 'Your Monthly Financial Report',
      html: emailContent
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send email');
  }
});

function generateEmailContent(reportData, isTest) {
  const { period, totalIncome, totalExpenses, netProfit, incomeByCategory, expensesByCategory, insights } = reportData;
  
  // Generate category tables
  const incomeTable = Object.entries(incomeByCategory)
    .map(([category, amount]) => 
      `<tr><td>${category}</td><td style="text-align:right;color:#2ecc71;">₹${amount.toFixed(2)}</td></tr>`
    ).join('');
    
  const expensesTable = Object.entries(expensesByCategory)
    .map(([category, amount]) => 
      `<tr><td>${category}</td><td style="text-align:right;color:#e74c3c;">₹${amount.toFixed(2)}</td></tr>`
    ).join('');
  
  // Generate insights list
  const insightsList = insights.map(insight => `<li>${insight}</li>`).join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; background: #3498db; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
        .content { background: #f9f9f9; padding: 20px; }
        .summary { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .summary-card { flex: 1; text-align: center; padding: 15px; border-radius: 5px; margin: 0 10px; }
        .income { background: #e8f5e9; border-left: 4px solid #2ecc71; }
        .expenses { background: #ffebee; border-left: 4px solid #e74c3c; }
        .net { background: #e3f2fd; border-left: 4px solid #3498db; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f2f2f2; }
        .insights { background: #fff8e1; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${isTest ? 'Test ' : ''}Monthly Financial Report</h1>
          <p>${period}</p>
        </div>
        
        <div class="content">
          <div class="summary">
            <div class="summary-card income">
              <h3>Total Income</h3>
              <p style="font-size:24px;color:#2ecc71;">₹${totalIncome}</p>
            </div>
            <div class="summary-card expenses">
              <h3>Total Expenses</h3>
              <p style="font-size:24px;color:#e74c3c;">₹${totalExpenses}</p>
            </div>
            <div class="summary-card net">
              <h3>Net ${parseFloat(netProfit) >= 0 ? 'Profit' : 'Loss'}</h3>
              <p style="font-size:24px;color:${parseFloat(netProfit) >= 0 ? '#2ecc71' : '#e74c3c'};">₹${netProfit}</p>
            </div>
          </div>
          
          <h2>Income Breakdown</h2>
          <table>
            <tr><th>Category</th><th style="text-align:right;">Amount</th></tr>
            ${incomeTable || '<tr><td colspan="2" style="text-align:center;">No income data</td></tr>'}
          </table>
          
          <h2>Expense Breakdown</h2>
          <table>
            <tr><th>Category</th><th style="text-align:right;">Amount</th></tr>
            ${expensesTable || '<tr><td colspan="2" style="text-align:center;">No expense data</td></tr>'}
          </table>
          
          <div class="insights">
            <h2>Spending Insights</h2>
            <ul>
              ${insightsList}
            </ul>
          </div>
          
          ${isTest ? '<p style="text-align:center;margin-top:30px;color:#777;">This is a test email sent from your financial tracking application.</p>' : ''}
        </div>
      </div>
    </body>
    </html>
  `;
}
