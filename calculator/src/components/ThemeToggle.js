class ThemeToggle {
  constructor() {
    this.element = null;
    this.isDarkMode = this.getInitialTheme();
    
    // Bind methods
    this.toggleTheme = this.toggleTheme.bind(this);
  }
  
  getInitialTheme() {
    // Check for saved preference
    const savedTheme = localStorage.getItem('calculatorTheme');
    
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    
    return false;
  }
  
  render() {
    this.element = document.createElement('button');
    this.element.className = 'theme-toggle';
    this.updateToggleIcon();
    
    // Add event listener
    this.element.addEventListener('click', this.toggleTheme);
    
    return this.element;
  }
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.updateToggleIcon();
    
    // Add animation
    this.element.classList.add('theme-toggle-animation');
    setTimeout(() => {
      this.element.classList.remove('theme-toggle-animation');
    }, 300);
  }
  
  applyTheme() {
    // Save preference
    localStorage.setItem('calculatorTheme', this.isDarkMode ? 'dark' : 'light');
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
  
  updateToggleIcon() {
    this.element.innerHTML = this.isDarkMode ? 
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 18C8.7 18 6 15.3 6 12C6 8.7 8.7 6 12 6C15.3 6 18 8.7 18 12C18 15.3 15.3 18 12 18ZM12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4Z" fill="currentColor"/></svg>' : 
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C17.5 22 22 17.5 22 12C22 11.3 21.9 10.7 21.8 10C20.2 15.4 14.4 18.8 9 17.2C6.8 16.5 4.9 14.6 4.3 12.4C3.6 10.2 4.1 7.8 5.6 5.9C3 8.3 2.2 12.2 4 15.5C5.9 18.8 9.9 22 12 22Z" fill="currentColor"/></svg>';
  }
}

export default ThemeToggle;