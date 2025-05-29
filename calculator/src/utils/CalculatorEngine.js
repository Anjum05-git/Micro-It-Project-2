class CalculatorEngine {
  constructor() {
    this.state = {
      currentValue: '0',
      prevValue: null,
      operator: null,
      waitingForOperand: false,
      equation: '',
      memory: '0'
    };
  }
  
  getDisplayValue() {
    return this.state.currentValue;
  }
  
  getEquation() {
    return this.state.equation;
  }
  
  processAction(action) {
    // Track if this action completes a calculation
    let isCompleteCalculation = false;
    
    // Handle different action types
    if (/^[0-9]$/.test(action)) {
      this.inputDigit(action);
    } else if (action === '.') {
      this.inputDecimal();
    } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
      this.inputOperator(action);
    } else if (action === 'equals') {
      this.calculateResult();
      isCompleteCalculation = true;
    } else if (action === 'clear') {
      this.clearAll();
    } else if (action === 'backspace') {
      this.backspace();
    } else if (action === 'negate') {
      this.negate();
    } else if (action === 'percent') {
      this.percent();
    } else if (action === 'memoryStore') {
      this.memoryStore();
    } else if (action === 'memoryRecall') {
      this.memoryRecall();
    } else if (action === 'memoryClear') {
      this.memoryClear();
    } else if (action === 'memoryAdd') {
      this.memoryAdd();
    } else if (action === 'memorySubtract') {
      this.memorySubtract();
    }
    
    // Return current state for display
    return {
      displayValue: this.state.currentValue,
      equation: this.state.equation,
      isCompleteCalculation
    };
  }
  
  inputDigit(digit) {
    const { currentValue, waitingForOperand } = this.state;
    
    if (waitingForOperand) {
      this.state.currentValue = digit;
      this.state.waitingForOperand = false;
    } else {
      this.state.currentValue = currentValue === '0' ? digit : currentValue + digit;
    }
  }
  
  inputDecimal() {
    const { currentValue, waitingForOperand } = this.state;
    
    if (waitingForOperand) {
      this.state.currentValue = '0.';
      this.state.waitingForOperand = false;
    } else if (currentValue.indexOf('.') === -1) {
      this.state.currentValue = currentValue + '.';
    }
  }
  
  inputOperator(operator) {
    const { currentValue, prevValue, operator: prevOperator } = this.state;
    const currentValueNum = parseFloat(currentValue);
    
    if (prevValue === null) {
      this.state.prevValue = currentValueNum;
      this.state.equation = currentValue + this.getOperatorSymbol(operator);
    } else if (prevOperator) {
      const result = this.calculate(prevValue, currentValueNum, prevOperator);
      this.state.currentValue = String(result);
      this.state.prevValue = result;
      this.state.equation = result + this.getOperatorSymbol(operator);
    } else {
      this.state.equation = currentValue + this.getOperatorSymbol(operator);
    }
    
    this.state.waitingForOperand = true;
    this.state.operator = operator;
  }
  
  calculateResult() {
    const { currentValue, prevValue, operator } = this.state;
    
    if (prevValue !== null && operator) {
      const currentValueNum = parseFloat(currentValue);
      const result = this.calculate(prevValue, currentValueNum, operator);
      
      // Format the equation
      const equation = `${prevValue} ${this.getOperatorSymbol(operator)} ${currentValue} =`;
      
      this.state.currentValue = String(result);
      this.state.equation = equation;
      this.state.prevValue = null;
      this.state.operator = null;
      this.state.waitingForOperand = true;
    }
  }
  
  calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
      case 'add':
        return firstOperand + secondOperand;
      case 'subtract':
        return firstOperand - secondOperand;
      case 'multiply':
        return firstOperand * secondOperand;
      case 'divide':
        return secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
      default:
        return secondOperand;
    }
  }
  
  getOperatorSymbol(operator) {
    switch (operator) {
      case 'add':
        return ' + ';
      case 'subtract':
        return ' - ';
      case 'multiply':
        return ' × ';
      case 'divide':
        return ' ÷ ';
      default:
        return '';
    }
  }
  
  clearAll() {
    this.state = {
      currentValue: '0',
      prevValue: null,
      operator: null,
      waitingForOperand: false,
      equation: '',
      memory: this.state.memory
    };
  }
  
  backspace() {
    const { currentValue } = this.state;
    
    if (currentValue !== '0' && !this.state.waitingForOperand) {
      this.state.currentValue = currentValue.length === 1 ? '0' : currentValue.slice(0, -1);
    }
  }
  
  negate() {
    const { currentValue } = this.state;
    
    if (currentValue !== '0') {
      this.state.currentValue = currentValue.charAt(0) === '-' ? 
        currentValue.slice(1) : '-' + currentValue;
    }
  }
  
  percent() {
    const { currentValue } = this.state;
    const value = parseFloat(currentValue);
    
    if (value !== 0) {
      this.state.currentValue = String(value / 100);
    }
  }
  
  memoryStore() {
    this.state.memory = this.state.currentValue;
  }
  
  memoryRecall() {
    this.state.currentValue = this.state.memory;
    this.state.waitingForOperand = false;
  }
  
  memoryClear() {
    this.state.memory = '0';
  }
  
  memoryAdd() {
    const result = parseFloat(this.state.memory) + parseFloat(this.state.currentValue);
    this.state.memory = String(result);
  }
  
  memorySubtract() {
    const result = parseFloat(this.state.memory) - parseFloat(this.state.currentValue);
    this.state.memory = String(result);
  }
}

export default CalculatorEngine;