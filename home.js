<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Universal Calculator</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .calculator-container {
            width: 100%;
            max-width: 1000px;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        
        .calculator-header {
            background: linear-gradient(90deg, #2c3e50, #4ca1af);
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .calculator-header h1 {
            font-size: 2.2rem;
            margin-bottom: 10px;
        }
        
        .calculator-header p {
            font-size: 1rem;
            opacity: 0.9;
        }
        
        .calculator-body {
            display: flex;
            flex-wrap: wrap;
        }
        
        .calculator-display {
            width: 100%;
            padding: 20px;
            background: #2c3e50;
            color: white;
            text-align: right;
            font-size: 2.5rem;
            font-weight: 300;
            overflow-x: auto;
            border-bottom: 2px solid #34495e;
        }
        
        .mode-selector {
            width: 100%;
            display: flex;
            background: #ecf0f1;
            border-bottom: 1px solid #bdc3c7;
        }
        
        .mode-btn {
            flex: 1;
            padding: 15px;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 600;
            color: #2c3e50;
            transition: all 0.3s ease;
        }
        
        .mode-btn.active {
            background: #3498db;
            color: white;
        }
        
        .mode-btn:hover {
            background: #2980b9;
            color: white;
        }
        
        .calculator-content {
            display: flex;
            width: 100%;
        }
        
        .calculator-main {
            flex: 7;
            padding: 20px;
        }
        
        .calculator-history {
            flex: 3;
            padding: 20px;
            background: #f5f5f5;
            border-left: 1px solid #ddd;
            max-height: 500px;
            overflow-y: auto;
        }
        
        .calculator-history h3 {
            margin-bottom: 15px;
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 5px;
        }
        
        .history-item {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            font-size: 0.9rem;
        }
        
        .history-item:hover {
            background: #e8f4fc;
        }
        
        .calculator-panel {
            display: none;
        }
        
        .calculator-panel.active {
            display: block;
        }
        
        .button-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        
        .scientific-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
        }
        
        .conversion-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        
        .calc-btn {
            padding: 15px;
            font-size: 1.2rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            background: #ecf0f1;
            color: #2c3e50;
            transition: all 0.2s ease;
        }
        
        .calc-btn:hover {
            background: #d6dbdf;
        }
        
        .calc-btn.operator {
            background: #3498db;
            color: white;
        }
        
        .calc-btn.operator:hover {
            background: #2980b9;
        }
        
        .calc-btn.function {
            background: #9b59b6;
            color: white;
        }
        
        .calc-btn.function:hover {
            background: #8e44ad;
        }
        
        .calc-btn.equals {
            background: #2ecc71;
            color: white;
        }
        
        .calc-btn.equals:hover {
            background: #27ae60;
        }
        
        .calc-btn.clear {
            background: #e74c3c;
            color: white;
        }
        
        .calc-btn.clear:hover {
            background: #c0392b;
        }
        
        .input-group {
            margin-bottom: 15px;
        }
        
        .input-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .input-group input, .input-group select {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
        }
        
        .conversion-result {
            margin-top: 15px;
            padding: 15px;
            background: #e8f4fc;
            border-radius: 5px;
            font-size: 1.2rem;
            text-align: center;
            color: #2c3e50;
        }
        
        @media (max-width: 768px) {
            .calculator-content {
                flex-direction: column;
            }
            
            .calculator-history {
                border-left: none;
                border-top: 1px solid #ddd;
            }
            
            .button-grid {
                grid-template-columns: repeat(4, 1fr);
            }
            
            .scientific-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        
        @media (max-width: 480px) {
            .mode-btn {
                padding: 10px 5px;
                font-size: 0.8rem;
            }
            
            .button-grid {
                grid-template-columns: repeat(4, 1fr);
            }
            
            .scientific-grid {
                grid-template-columns: repeat(3, 1fr);
            }
            
            .calc-btn {
                padding: 12px;
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="calculator-container">
        <div class="calculator-header">
            <h1>Universal Calculator</h1>
            <p>All calculation types in one place</p>
        </div>
        
        <div class="calculator-display" id="display">0</div>
        
        <div class="mode-selector">
            <button class="mode-btn active" data-mode="standard">Standard</button>
            <button class="mode-btn" data-mode="scientific">Scientific</button>
            <button class="mode-btn" data-mode="financial">Financial</button>
            <button class="mode-btn" data-mode="conversion">Conversion</button>
            <button class="mode-btn" data-mode="programmer">Programmer</button>
        </div>
        
        <div class="calculator-content">
            <div class="calculator-main">
                <!-- Standard Calculator -->
                <div class="calculator-panel active" id="standard-panel">
                    <div class="button-grid">
                        <button class="calc-btn clear" onclick="clearDisplay()">C</button>
                        <button class="calc-btn function" onclick="backspace()">⌫</button>
                        <button class="calc-btn function" onclick="appendToDisplay('%')">%</button>
                        <button class="calc-btn operator" onclick="appendToDisplay('/')">/</button>
                        
                        <button class="calc-btn" onclick="appendToDisplay('7')">7</button>
                        <button class="calc-btn" onclick="appendToDisplay('8')">8</button>
                        <button class="calc-btn" onclick="appendToDisplay('9')">9</button>
                        <button class="calc-btn operator" onclick="appendToDisplay('*')">×</button>
                        
                        <button class="calc-btn" onclick="appendToDisplay('4')">4</button>
                        <button class="calc-btn" onclick="appendToDisplay('5')">5</button>
                        <button class="calc-btn" onclick="appendToDisplay('6')">6</button>
                        <button class="calc-btn operator" onclick="appendToDisplay('-')">-</button>
                        
                        <button class="calc-btn" onclick="appendToDisplay('1')">1</button>
                        <button class="calc-btn" onclick="appendToDisplay('2')">2</button>
                        <button class="calc-btn" onclick="appendToDisplay('3')">3</button>
                        <button class="calc-btn operator" onclick="appendToDisplay('+')">+</button>
                        
                        <button class="calc-btn" onclick="appendToDisplay('0')">0</button>
                        <button class="calc-btn" onclick="appendToDisplay('.')">.</button>
                        <button class="calc-btn equals" onclick="calculate()" colspan="2">=</button>
                    </div>
                </div>
                
                <!-- Scientific Calculator -->
                <div class="calculator-panel" id="scientific-panel">
                    <div class="scientific-grid">
                        <button class="calc-btn clear" onclick="clearDisplay()">C</button>
                        <button class="calc-btn function" onclick="backspace()">⌫</button>
                        <button class="calc-btn function" onclick="appendToDisplay('%')">%</button>
                        <button class="calc-btn operator" onclick="appendToDisplay('/')">/</button>
                        <button class="calc-btn operator" onclick="appendToDisplay('*')">×</button>
                        
                        <button class="calc-btn" onclick="appendToDisplay('7')">7</button>
                        <button class="calc-btn" onclick="appendToDisplay('8')">8</button>
                        <button class="calc-btn" onclick="appendToDisplay('9')">9</button>
                        <button class="calc-btn operator" onclick="appendToDisplay('-')">-</button>
                        <button class="calc-btn function" onclick="calculateFunction('sin')">sin</button>
                        
                        <button class="calc-btn" onclick="appendToDisplay('4')">4</button>
                        <button class="calc-btn" onclick="appendToDisplay('5')">5</button>
                        <button class="calc-btn" onclick="appendToDisplay('6')">6</button>
                        <button class="calc-btn operator" onclick="appendToDisplay('+')">+</button>
                        <button class="calc-btn function" onclick="calculateFunction('cos')">cos</button>
                        
                        <button class="calc-btn" onclick="appendToDisplay('1')">1</button>
                        <button class="calc-btn" onclick="appendToDisplay('2')">2</button>
                        <button class="calc-btn" onclick="appendToDisplay('3')">3</button>
                        <button class="calc-btn function" onclick="calculateFunction('pow')">x^y</button>
                        <button class="calc-btn function" onclick="calculateFunction('tan')">tan</button>
                        
                        <button class="calc-btn" onclick="appendToDisplay('0')">0</button>
                        <button class="calc-btn" onclick="appendToDisplay('.')">.</button>
                        <button class="calc-btn function" onclick="calculateFunction('sqrt')">√</button>
                        <button class="calc-btn function" onclick="calculateFunction('log')">log</button>
                        <button class="calc-btn equals" onclick="calculate()">=</button>
                    </div>
                </div>
                
                <!-- Financial Calculator -->
                <div class="calculator-panel" id="financial-panel">
                    <div class="input-group">
                        <label for="principal">Principal Amount ($)</label>
                        <input type="number" id="principal" placeholder="Enter principal amount">
                    </div>
                    
                    <div class="input-group">
                        <label for="interest">Annual Interest Rate (%)</label>
                        <input type="number" id="interest" placeholder="Enter interest rate">
                    </div>
                    
                    <div class="input-group">
                        <label for="time">Time Period (Years)</label>
                        <input type="number" id="time" placeholder="Enter time period">
                    </div>
                    
                    <div class="button-grid">
                        <button class="calc-btn equals" onclick="calculateLoan()">Calculate Loan</button>
                        <button class="calc-btn equals" onclick="calculateInvestment()">Calculate Investment</button>
                    </div>
                    
                    <div class="conversion-result" id="financial-result">
                        Result will be shown here
                    </div>
                </div>
                
                <!-- Conversion Calculator -->
                <div class="calculator-panel" id="conversion-panel">
                    <div class="input-group">
                        <label for="conversion-type">Conversion Type</label>
                        <select id="conversion-type">
                            <option value="length">Length</option>
                            <option value="weight">Weight</option>
                            <option value="temperature">Temperature</option>
                            <option value="currency">Currency (Approx)</option>
                        </select>
                    </div>
                    
                    <div class="conversion-grid">
                        <div class="input-group">
                            <label for="from-value">From</label>
                            <input type="number" id="from-value" placeholder="Enter value">
                        </div>
                        
                        <div class="input-group">
                            <label for="from-unit">Unit</label>
                            <select id="from-unit">
                                <option value="meter">Meter</option>
                                <option value="kilometer">Kilometer</option>
                                <option value="mile">Mile</option>
                                <option value="foot">Foot</option>
                            </select>
                        </div>
                        
                        <div class="input-group">
                            <label for="to-value">To</label>
                            <input type="text" id="to-value" readonly placeholder="Result">
                        </div>
                        
                        <div class="input-group">
                            <label for="to-unit">Unit</label>
                            <select id="to-unit">
                                <option value="meter">Meter</option>
                                <option value="kilometer">Kilometer</option>
                                <option value="mile">Mile</option>
                                <option value="foot">Foot</option>
                            </select>
                        </div>
                    </div>
                    
                    <button class="calc-btn equals" onclick="convertUnits()" style="width: 100%; margin-top: 20px;">Convert</button>
                </div>
                
                <!-- Programmer Calculator -->
                <div class="calculator-panel" id="programmer-panel">
                    <div class="button-grid">
                        <button class="calc-btn clear" onclick="clearDisplay()">C</button>
                        <button class="calc-btn function" onclick="backspace()">⌫</button>
                        <button class="calc-btn function" onclick="appendToDisplay('(')">(</button>
                        <button class="calc-btn function" onclick="appendToDisplay(')')">)</button>
                        
                        <button class="calc-btn function" onclick="convertBase(2)">Bin</button>
                        <button class="calc-btn function" onclick="convertBase(8)">Oct</button>
                        <button class="calc-btn function" onclick="convertBase(16)">Hex</button>
                        <button class="calc-btn function" onclick="convertBase(10)">Dec</button>
                        
                        <button class="calc-btn" onclick="appendToDisplay('7')">7</button>
                        <button class="calc-btn" onclick="appendToDisplay('8')">8</button>
                        <button class="calc-btn" onclick="appendToDisplay('9')">9</button>
                        <button class="calc-btn operator" onclick="appendToDisplay('&')">AND</button>
                        
                        <button class="calc-btn" onclick="appendToDisplay('4')">4</button>
                        <button class="calc-btn" onclick="appendToDisplay('5')">5</button>
                        <button class="calc-btn" onclick="appendToDisplay('6')">6</button>
                        <button class="calc-btn operator" onclick="appendToDisplay('|')">OR</button>
                        
                        <button class="calc-btn" onclick="appendToDisplay('1')">1</button>
                        <button class="calc-btn" onclick="appendToDisplay('2')">2</button>
                        <button class="calc-btn" onclick="appendToDisplay('3')">3</button>
                        <button class="calc-btn operator" onclick="appendToDisplay('^')">XOR</button>
                        
                        <button class="calc-btn" onclick="appendToDisplay('0')">0</button>
                        <button class="calc-btn function" onclick="appendToDisplay('~')">NOT</button>
                        <button class="calc-btn function" onclick="appendToDisplay('<<')"><<</button>
                        <button class="calc-btn equals" onclick="calculate()">=</button>
                    </div>
                </div>
            </div>
            
            <div class="calculator-history">
                <h3>Calculation History</h3>
                <div id="history-list">
                    <!-- History items will be added here -->
                </div>
            </div>
        </div>
    </div>

    <script>
        // Display element
        const display = document.getElementById('display');
        let currentInput = '0';
        let currentMode = 'standard';
        
        // Update display
        function updateDisplay() {
            display.textContent = currentInput;
        }
        
        // Append to display
        function appendToDisplay(value) {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            updateDisplay();
        }
        
        // Clear display
        function clearDisplay() {
            currentInput = '0';
            updateDisplay();
        }
        
        // Backspace function
        function backspace() {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }
        
        // Calculate result
        function calculate() {
            try {
                const result = eval(currentInput);
                addToHistory(`${currentInput} = ${result}`);
                currentInput = result.toString();
                updateDisplay();
            } catch (error) {
                currentInput = 'Error';
                updateDisplay();
                setTimeout(() => {
                    currentInput = '0';
                    updateDisplay();
                }, 1500);
            }
        }
        
        // Scientific functions
        function calculateFunction(func) {
            try {
                let result;
                const inputValue = parseFloat(currentInput);
                
                switch(func) {
                    case 'sin':
                        result = Math.sin(inputValue * Math.PI / 180);
                        break;
                    case 'cos':
                        result = Math.cos(inputValue * Math.PI / 180);
                        break;
                    case 'tan':
                        result = Math.tan(inputValue * Math.PI / 180);
                        break;
                    case 'sqrt':
                        result = Math.sqrt(inputValue);
                        break;
                    case 'log':
                        result = Math.log10(inputValue);
                        break;
                    case 'pow':
                        currentInput += '**';
                        updateDisplay();
                        return;
                }
                
                addToHistory(`${func}(${inputValue}) = ${result}`);
                currentInput = result.toString();
                updateDisplay();
            } catch (error) {
                currentInput = 'Error';
                updateDisplay();
                setTimeout(() => {
                    currentInput = '0';
                    updateDisplay();
                }, 1500);
            }
        }
        
        // Financial calculations
        function calculateLoan() {
            const principal = parseFloat(document.getElementById('principal').value);
            const interest = parseFloat(document.getElementById('interest').value) / 100 / 12;
            const time = parseFloat(document.getElementById('time').value) * 12;
            
            if (principal && interest && time) {
                const x = Math.pow(1 + interest, time);
                const monthly = (principal * x * interest) / (x - 1);
                
                const resultElement = document.getElementById('financial-result');
                resultElement.innerHTML = `
                    Monthly Payment: $${monthly.toFixed(2)}<br>
                    Total Payment: $${(monthly * time).toFixed(2)}<br>
                    Total Interest: $${((monthly * time) - principal).toFixed(2)}
                `;
                
                addToHistory(`Loan Calculation: P=${principal}, R=${interest*1200}%, T=${time/12}yr -> Monthly: $${monthly.toFixed(2)}`);
            }
        }
        
        function calculateInvestment() {
            const principal = parseFloat(document.getElementById('principal').value);
            const interest = parseFloat(document.getElementById('interest').value) / 100;
            const time = parseFloat(document.getElementById('time').value);
            
            if (principal && interest && time) {
                const amount = principal * Math.pow(1 + interest, time);
                
                const resultElement = document.getElementById('financial-result');
                resultElement.innerHTML = `
                    Future Value: $${amount.toFixed(2)}<br>
                    Total Interest: $${(amount - principal).toFixed(2)}
                `;
                
                addToHistory(`Investment: P=${principal}, R=${interest*100}%, T=${time}yr -> FV: $${amount.toFixed(2)}`);
            }
        }
        
        // Unit conversion
        function convertUnits() {
            const conversionType = document.getElementById('conversion-type').value;
            const fromValue = parseFloat(document.getElementById('from-value').value);
            const fromUnit = document.getElementById('from-unit').value;
            const toUnit = document.getElementById('to-unit').value;
            
            if (!fromValue) return;
            
            let result;
            
            // Length conversions
            if (conversionType === 'length') {
                // Convert to meters first
                let meters;
                switch(fromUnit) {
                    case 'meter': meters = fromValue; break;
                    case 'kilometer': meters = fromValue * 1000; break;
                    case 'mile': meters = fromValue * 1609.34; break;
                    case 'foot': meters = fromValue * 0.3048; break;
                }
                
                // Convert from meters to target unit
                switch(toUnit) {
                    case 'meter': result = meters; break;
                    case 'kilometer': result = meters / 1000; break;
                    case 'mile': result = meters / 1609.34; break;
                    case 'foot': result = meters / 0.3048; break;
                }
            }
            // Weight conversions
            else if (conversionType === 'weight') {
                // Convert to kilograms first
                let kilograms;
                switch(fromUnit) {
                    case 'gram': kilograms = fromValue / 1000; break;
                    case 'kilogram': kilograms = fromValue; break;
                    case 'pound': kilograms = fromValue * 0.453592; break;
                    case 'ounce': kilograms = fromValue * 0.0283495; break;
                }
                
                // Convert from kilograms to target unit
                switch(toUnit) {
                    case 'gram': result = kilograms * 1000; break;
                    case 'kilogram': result = kilograms; break;
                    case 'pound': result = kilograms / 0.453592; break;
                    case 'ounce': result = kilograms / 0.0283495; break;
                }
            }
            // Temperature conversions
            else if (conversionType === 'temperature') {
                // Convert to Celsius first
                let celsius;
                switch(fromUnit) {
                    case 'celsius': celsius = fromValue; break;
                    case 'fahrenheit': celsius = (fromValue - 32) * 5/9; break;
                    case 'kelvin': celsius = fromValue - 273.15; break;
                }
                
                // Convert from Celsius to target unit
                switch(toUnit) {
                    case 'celsius': result = celsius; break;
                    case 'fahrenheit': result = (celsius * 9/5) + 32; break;
                    case 'kelvin': result = celsius + 273.15; break;
                }
            }
            // Currency conversions (approximate)
            else if (conversionType === 'currency') {
                // Using approximate conversion rates
                const rates = {
                    usd: { eur: 0.85, gbp: 0.75, jpy: 110.0, inr: 74.0 },
                    eur: { usd: 1.18, gbp: 0.88, jpy: 129.5, inr: 87.0 },
                    gbp: { usd: 1.33, eur: 1.14, jpy: 147.0, inr: 99.0 },
                    jpy: { usd: 0.0091, eur: 0.0077, gbp: 0.0068, inr: 0.67 },
                    inr: { usd: 0.013, eur: 0.011, gbp: 0.010, jpy: 1.49 }
                };
                
                if (rates[fromUnit] && rates[fromUnit][toUnit]) {
                    result = fromValue * rates[fromUnit][toUnit];
                } else {
                    result = fromValue; // Same currency
                }
            }
            
            document.getElementById('to-value').value = result.toFixed(6);
            addToHistory(`Converted ${fromValue} ${fromUnit} to ${result.toFixed(2)} ${toUnit}`);
        }
        
        // Base conversion for programmer calculator
        function convertBase(base) {
            const value = parseInt(currentInput, 10);
            
            if (isNaN(value)) {
                currentInput = 'Error';
                updateDisplay();
                return;
            }
            
            switch(base) {
                case 2:
                    currentInput = value.toString(2);
                    break;
                case 8:
                    currentInput = value.toString(8);
                    break;
                case 16:
                    currentInput = value.toString(16).toUpperCase();
                    break;
                case 10:
                    // Already in decimal
                    break;
            }
            
            updateDisplay();
            addToHistory(`Converted to base ${base}: ${currentInput}`);
        }
        
        // Add to history
        function addToHistory(calculation) {
            const historyList = document.getElementById('history-list');
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.textContent = calculation;
            historyList.prepend(historyItem);
        }
        
        // Mode switching
        document.querySelectorAll('.mode-btn').forEach(button => {
            button.addEventListener('click', function() {
                const mode = this.getAttribute('data-mode');
                
                // Update active button
                document.querySelectorAll('.mode-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Update active panel
                document.querySelectorAll('.calculator-panel').forEach(panel => {
                    panel.classList.remove('active');
                });
                document.getElementById(`${mode}-panel`).classList.add('active');
                
                currentMode = mode;
            });
        });
        
        // Update conversion units when type changes
        document.getElementById('conversion-type').addEventListener('change', function() {
            const type = this.value;
            const fromUnit = document.getElementById('from-unit');
            const toUnit = document.getElementById('to-unit');
            
            // Clear previous options
            fromUnit.innerHTML = '';
            toUnit.innerHTML = '';
            
            let options;
            
            switch(type) {
                case 'length':
                    options = ['meter', 'kilometer', 'mile', 'foot'];
                    break;
                case 'weight':
                    options = ['gram', 'kilogram', 'pound', 'ounce'];
                    break;
                case 'temperature':
                    options = ['celsius', 'fahrenheit', 'kelvin'];
                    break;
                case 'currency':
                    options = ['usd', 'eur', 'gbp', 'jpy', 'inr'];
                    break;
            }
            
            // Add new options
            options.forEach(option => {
                const fromOption = document.createElement('option');
                fromOption.value = option;
                fromOption.textContent = option.charAt(0).toUpperCase() + option.slice(1);
                fromUnit.appendChild(fromOption);
                
                const toOption = document.createElement('option');
                toOption.value = option;
                toOption.textContent = option.charAt(0).toUpperCase() + option.slice(1);
                toUnit.appendChild(toOption);
            });
            
            // Set different default to unit
            if (options.length > 1) {
                toUnit.selectedIndex = 1;
            }
        });
        
        // Initialize
        updateDisplay();
    </script>
</body>
</html>