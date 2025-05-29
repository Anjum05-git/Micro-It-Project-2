import Calculator from './Calculator';
import ThemeToggle from './ThemeToggle';
import HistoryPanel from './HistoryPanel';

class App {
  constructor() {
    this.calculator = null;
    this.themeToggle = null;
    this.historyPanel = null;
  }

  init() {
    // Create the app container
    const appContainer = document.getElementById('app');
    
    // Create app layout
    const appLayout = document.createElement('div');
    appLayout.className = 'app-layout';
    
    // Create header
    const header = document.createElement('header');
    header.className = 'app-header';
    
    const title = document.createElement('h1');
    title.textContent = 'Calculator';
    
    this.themeToggle = new ThemeToggle();
    
    header.appendChild(title);
    header.appendChild(this.themeToggle.render());
    
    // Create main container
    const main = document.createElement('main');
    main.className = 'app-main';
    
    // Create calculator container
    const calculatorContainer = document.createElement('div');
    calculatorContainer.className = 'calculator-container';
    
    // Create calculator
    this.calculator = new Calculator();
    calculatorContainer.appendChild(this.calculator.render());
    
    // Create history panel
    this.historyPanel = new HistoryPanel();
    
    // Add event listener to update history
    this.calculator.on('calculation', (calculation) => {
      this.historyPanel.addCalculation(calculation);
    });
    
    main.appendChild(calculatorContainer);
    main.appendChild(this.historyPanel.render());
    
    // Create footer
    const footer = document.createElement('footer');
    footer.className = 'app-footer';
    
    const footerText = document.createElement('p');
    footerText.textContent = '© 2025 Apple-inspired Calculator';
    
    footer.appendChild(footerText);
    
    // Assemble app
    appLayout.appendChild(header);
    appLayout.appendChild(main);
    appLayout.appendChild(footer);
    
    appContainer.appendChild(appLayout);
    
    // Initialize keyboard support
    this.initKeyboardSupport();
    
    // Set default theme
    this.themeToggle.applyTheme();
  }
  
  initKeyboardSupport() {
    document.addEventListener('keydown', (event) => {
      this.calculator.handleKeyPress(event);
    });
  }
}

export default App;