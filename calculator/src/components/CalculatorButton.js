class CalculatorButton {
  constructor(text, type, action, wide = false) {
    this.text = text;
    this.type = type;
    this.action = action;
    this.wide = wide;
    this.element = null;
    this.eventListeners = {
      click: []
    };
    
    // Bind methods
    this.handleClick = this.handleClick.bind(this);
  }
  
  on(event, callback) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].push(callback);
    }
  }
  
  emit(event, data) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => callback(data));
    }
  }
  
  render() {
    this.element = document.createElement('button');
    this.element.className = `calculator-button calculator-button-${this.type}`;
    this.element.textContent = this.text;
    
    if (this.wide) {
      this.element.classList.add('calculator-button-wide');
    }
    
    // Add event listener
    this.element.addEventListener('click', this.handleClick);
    
    return this.element;
  }
  
  handleClick() {
    // Add press animation
    this.element.classList.add('calculator-button-pressed');
    
    // Remove press animation after animation completes
    setTimeout(() => {
      this.element.classList.remove('calculator-button-pressed');
    }, 150);
    
    // Emit click event with button action
    this.emit('click', this.action);
  }
}

export default CalculatorButton;