class CalculatorDisplay {
  constructor() {
    this.element = null;
    this.displayValueElement = null;
    this.equationElement = null;
  }
  
  render() {
    this.element = document.createElement('div');
    this.element.className = 'calculator-display';
    
    // Create equation display (shows the current calculation)
    this.equationElement = document.createElement('div');
    this.equationElement.className = 'calculator-equation';
    
    // Create main display (shows the current input or result)
    this.displayValueElement = document.createElement('div');
    this.displayValueElement.className = 'calculator-value';
    this.displayValueElement.textContent = '0';
    
    this.element.appendChild(this.equationElement);
    this.element.appendChild(this.displayValueElement);
    
    return this.element;
  }
  
  updateDisplay(value, equation = '') {
    // Format the display value
    let formattedValue = value;
    
    // Handle large numbers with scientific notation
    if (value.length > 10 && !value.includes('e')) {
      const num = parseFloat(value);
      formattedValue = num.toExponential(5);
    }
    
    // Update the display elements
    this.displayValueElement.textContent = formattedValue;
    this.equationElement.textContent = equation;
    
    // Adjust font size based on length
    const fontSize = this.calculateFontSize(formattedValue.length);
    this.displayValueElement.style.fontSize = `${fontSize}px`;
    
    // Add animation class
    this.displayValueElement.classList.add('update-animation');
    
    // Remove animation class after animation completes
    setTimeout(() => {
      this.displayValueElement.classList.remove('update-animation');
    }, 150);
  }
  
  calculateFontSize(length) {
    // Base font size for display
    const baseFontSize = 48;
    
    // Reduce font size for longer numbers
    if (length > 8) {
      return baseFontSize - (length - 8) * 3;
    }
    
    return baseFontSize;
  }
}

export default CalculatorDisplay;