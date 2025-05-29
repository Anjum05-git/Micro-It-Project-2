import CalculatorDisplay from './CalculatorDisplay';
import CalculatorButton from './CalculatorButton';
import CalculatorEngine from '../utils/CalculatorEngine';

class Calculator {
  constructor() {
    this.element = null;
    this.display = new CalculatorDisplay();
    this.engine = new CalculatorEngine();
    this.eventListeners = {
      calculation: []
    };
    
    // Bind methods
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
    this.element = document.createElement('div');
    this.element.className = 'calculator';
    
    // Add display
    this.element.appendChild(this.display.render());
    
    // Add buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'calculator-buttons';
    
    // Define button layout
    const buttonLayout = [
      [
        { text: 'C', type: 'function', action: 'clear' },
        { text: '±', type: 'function', action: 'negate' },
        { text: '%', type: 'function', action: 'percent' },
        { text: '÷', type: 'operator', action: 'divide' }
      ],
      [
        { text: '7', type: 'number', action: '7' },
        { text: '8', type: 'number', action: '8' },
        { text: '9', type: 'number', action: '9' },
        { text: '×', type: 'operator', action: 'multiply' }
      ],
      [
        { text: '4', type: 'number', action: '4' },
        { text: '5', type: 'number', action: '5' },
        { text: '6', type: 'number', action: '6' },
        { text: '−', type: 'operator', action: 'subtract' }
      ],
      [
        { text: '1', type: 'number', action: '1' },
        { text: '2', type: 'number', action: '2' },
        { text: '3', type: 'number', action: '3' },
        { text: '+', type: 'operator', action: 'add' }
      ],
      [
        { text: '0', type: 'number', action: '0', wide: true },
        { text: '.', type: 'number', action: '.' },
        { text: '=', type: 'operator', action: 'equals' }
      ]
    ];
    
    // Create buttons
    buttonLayout.forEach(row => {
      const rowElement = document.createElement('div');
      rowElement.className = 'calculator-row';
      
      row.forEach(button => {
        const buttonElement = new CalculatorButton(
          button.text,
          button.type,
          button.action,
          button.wide
        );
        
        buttonElement.on('click', this.handleButtonClick);
        rowElement.appendChild(buttonElement.render());
      });
      
      buttonsContainer.appendChild(rowElement);
    });
    
    this.element.appendChild(buttonsContainer);
    
    // Initialize calculator display with engine state
    this.display.updateDisplay(this.engine.getDisplayValue(), this.engine.getEquation());
    
    return this.element;
  }
  
  handleButtonClick(action) {
    const result = this.engine.processAction(action);
    
    // Update display
    this.display.updateDisplay(result.displayValue, result.equation);
    
    // Play button sound
    this.playButtonSound();
    
    // Emit calculation event if there's a complete calculation
    if (result.isCompleteCalculation) {
      this.emit('calculation', {
        equation: result.equation,
        result: result.displayValue
      });
    }
  }
  
  handleKeyPress(event) {
    const key = event.key;
    let action = null;
    
    // Map keyboard keys to calculator actions
    if (/^[0-9]$/.test(key)) {
      action = key;
    } else {
      switch (key) {
        case '.':
          action = '.';
          break;
        case '+':
          action = 'add';
          break;
        case '-':
          action = 'subtract';
          break;
        case '*':
          action = 'multiply';
          break;
        case '/':
          action = 'divide';
          break;
        case 'Enter':
          action = 'equals';
          break;
        case '=':
          action = 'equals';
          break;
        case 'Escape':
          action = 'clear';
          break;
        case 'Backspace':
          action = 'backspace';
          break;
        case '%':
          action = 'percent';
          break;
      }
    }
    
    if (action) {
      this.handleButtonClick(action);
      event.preventDefault();
    }
  }
  
  playButtonSound() {
    // Check if sound is enabled in settings
    const soundEnabled = localStorage.getItem('calculatorSoundEnabled') === 'true';
    
    if (soundEnabled) {
      // Create a simple sound
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 600;
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1);
      oscillator.stop(context.currentTime + 0.1);
    }
  }
}

export default Calculator;