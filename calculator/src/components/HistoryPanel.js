class HistoryPanel {
  constructor() {
    this.element = null;
    this.historyList = null;
    this.calculations = this.loadHistory();
    
    // Bind methods
    this.clearHistory = this.clearHistory.bind(this);
  }
  
  loadHistory() {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('calculatorHistory');
    
    if (savedHistory) {
      try {
        return JSON.parse(savedHistory);
      } catch (e) {
        console.error('Error parsing calculator history', e);
      }
    }
    
    return [];
  }
  
  saveHistory() {
    // Save history to localStorage
    localStorage.setItem('calculatorHistory', JSON.stringify(this.calculations));
  }
  
  render() {
    this.element = document.createElement('div');
    this.element.className = 'history-panel';
    
    const header = document.createElement('div');
    header.className = 'history-header';
    
    const title = document.createElement('h2');
    title.textContent = 'History';
    
    const clearButton = document.createElement('button');
    clearButton.className = 'history-clear-button';
    clearButton.textContent = 'Clear';
    clearButton.addEventListener('click', this.clearHistory);
    
    header.appendChild(title);
    header.appendChild(clearButton);
    
    this.historyList = document.createElement('div');
    this.historyList.className = 'history-list';
    
    // Add empty state if no calculations
    if (this.calculations.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'history-empty';
      emptyState.textContent = 'No calculations yet';
      this.historyList.appendChild(emptyState);
    } else {
      // Add saved calculations
      this.calculations.forEach(calculation => {
        const historyItem = this.createHistoryItem(calculation);
        this.historyList.appendChild(historyItem);
      });
    }
    
    this.element.appendChild(header);
    this.element.appendChild(this.historyList);
    
    return this.element;
  }
  
  addCalculation(calculation) {
    // Add calculation to the list
    this.calculations.unshift(calculation);
    
    // Keep only the last 50 calculations
    if (this.calculations.length > 50) {
      this.calculations.pop();
    }
    
    // Save to localStorage
    this.saveHistory();
    
    // Update UI
    this.updateHistoryList();
  }
  
  updateHistoryList() {
    // Clear the list
    this.historyList.innerHTML = '';
    
    // Add calculations
    if (this.calculations.length === 0) {
      const emptyState = document.createElement('div');
      emptyState.className = 'history-empty';
      emptyState.textContent = 'No calculations yet';
      this.historyList.appendChild(emptyState);
    } else {
      this.calculations.forEach(calculation => {
        const historyItem = this.createHistoryItem(calculation);
        this.historyList.appendChild(historyItem);
      });
    }
  }
  
  createHistoryItem(calculation) {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    const equation = document.createElement('div');
    equation.className = 'history-equation';
    equation.textContent = calculation.equation;
    
    const result = document.createElement('div');
    result.className = 'history-result';
    result.textContent = calculation.result;
    
    historyItem.appendChild(equation);
    historyItem.appendChild(result);
    
    // Add click handler to use this calculation
    historyItem.addEventListener('click', () => {
      // Create custom event to send to calculator
      const event = new CustomEvent('useHistoryCalculation', { 
        detail: calculation 
      });
      document.dispatchEvent(event);
      
      // Add selection animation
      historyItem.classList.add('history-item-selected');
      setTimeout(() => {
        historyItem.classList.remove('history-item-selected');
      }, 300);
    });
    
    return historyItem;
  }
  
  clearHistory() {
    // Clear calculations
    this.calculations = [];
    
    // Save to localStorage
    this.saveHistory();
    
    // Update UI
    this.updateHistoryList();
    
    // Add animation
    this.element.classList.add('history-clear-animation');
    setTimeout(() => {
      this.element.classList.remove('history-clear-animation');
    }, 300);
  }
}

export default HistoryPanel;