const themeToggle = document.getElementById("checkbox");
const langToggle = document.getElementById("language-checkbox");
const langLabel = document.querySelector(".lang-label");

let isJapanese = false;

// Language translations object
const translations = {
  en: {
    title: "Cybersecurity Multi-Tool",
    subtitle: "Your comprehensive suite of security tools",
    aboutTitle: "About This Collection",
    aboutDesc: "This collection of cybersecurity tools is designed to help users understand and implement better security practices. Each tool serves an educational purpose while providing practical functionality for everyday security needs.",
    footer: "Created by TTB3AR",
    collectionNote: "Part of the Cybersecurity Tools Collection",
    tools: {
      1: {
        title: "Password Generator",
        desc: "Generate secure, customizable passwords with various options and settings",
        button: "Launch Tool"
      },
      2: {
        title: "Password Strength Checker",
        desc: "Analyze password strength and check against breach databases",
        button: "Launch Tool"
      },
      3: {
        title: "Hashing Demonstration",
        desc: "Learn and experiment with cryptographic hash functions",
        button: "Launch Tool"
      },
      4: {
        title: "AES Encryption Tool",
        desc: "Encrypt and decrypt data using Advanced Encryption Standard",
        button: "Launch Tool"
      }
    }
  },
  jp: {
    title: "サイバーセキュリティマルチツール",
    subtitle: "包括的なセキュリティツールスイート",
    aboutTitle: "このコレクションについて",
    aboutDesc: "このサイバーセキュリティツールのコレクションは、ユーザーがより良いセキュリティ慣行を理解し実装するのを支援するために設計されています。各ツールは教育目的を果たしながら、日常のセキュリティニーズに実用的な機能を提供します。",
    footer: "TTB3AR制作",
    collectionNote: "サイバーセキュリティツールコレクションの一部",
    tools: {
      1: {
        title: "パスワード生成器",
        desc: "様々なオプションと設定で安全でカスタマイズ可能なパスワードを生成",
        button: "ツールを開く"
      },
      2: {
        title: "パスワード強度チェッカー",
        desc: "パスワードの強度を分析し、漏洩データベースと照合",
        button: "ツールを開く"
      },
      3: {
        title: "ハッシュ化デモンストレーション",
        desc: "暗号化ハッシュ関数を学習し実験",
        button: "ツールを開く"
      },
      4: {
        title: "AES暗号化ツール",
        desc: "Advanced Encryption Standardを使用してデータを暗号化・復号化",
        button: "ツールを開く"
      }
    }
  }
};

// Local Storage Functions
function saveTheme(theme) {
  try {
    localStorage.setItem('cybersecurityTools_theme', theme);
  } catch (error) {
    console.warn('Could not save theme preference:', error);
  }
}

function loadTheme() {
  try {
    return localStorage.getItem('cybersecurityTools_theme') || 'light';
  } catch (error) {
    console.warn('Could not load theme preference:', error);
    return 'light';
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem('cybersecurityTools_language', language);
  } catch (error) {
    console.warn('Could not save language preference:', error);
  }
}

function loadLanguage() {
  try {
    return localStorage.getItem('cybersecurityTools_language') || 'en';
  } catch (error) {
    console.warn('Could not load language preference:', error);
    return 'en';
  }
}

// Theme handling
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  saveTheme(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
}

function initializeTheme() {
  const savedTheme = loadTheme();
  setTheme(savedTheme);
  
  // Update the toggle switch to match the saved theme
  themeToggle.checked = (savedTheme === 'dark');
}

// Language handling
function setLanguage(language) {
  document.documentElement.setAttribute('data-language', language);
  isJapanese = (language === 'jp');
  updateUILanguage(language);
  saveLanguage(language);
}

function toggleLanguage() {
  const contentElements = document.querySelectorAll('#title, #subtitle, #about-title, #about-desc, #footer-text, #collection-note, [id^="tool-"]');
  
  contentElements.forEach(element => {
    element.classList.add('transition-content');
  });
  
  document.body.offsetHeight;
  
  contentElements.forEach(element => {
    element.classList.add('fade-out');
  });
  
  setTimeout(() => {
    const newLanguage = isJapanese ? 'en' : 'jp';
    setLanguage(newLanguage);
    
    langLabel.textContent = isJapanese ? "JP" : "EN";
    
    showLanguageIndicator(newLanguage);
    
    setTimeout(() => {
      contentElements.forEach(element => {
        element.classList.remove('fade-out');
      });
      
      setTimeout(() => {
        contentElements.forEach(element => {
          element.classList.remove('transition-content');
        });
      }, 300);
    }, 50);
  }, 300);
}

function initializeLanguage() {
  const savedLanguage = loadLanguage();
  isJapanese = (savedLanguage === 'jp');
  
  // Update the toggle switch to match the saved language
  langToggle.checked = isJapanese;
  langLabel.textContent = isJapanese ? "JP" : "EN";
  
  setLanguage(savedLanguage);
}

function updateUILanguage(language) {
  const texts = translations[language];
  
  document.getElementById('title').textContent = texts.title;
  document.getElementById('subtitle').textContent = texts.subtitle;
  document.getElementById('about-title').textContent = texts.aboutTitle;
  document.getElementById('about-desc').textContent = texts.aboutDesc;
  document.getElementById('footer-text').textContent = texts.footer;
  document.getElementById('collection-note').textContent = texts.collectionNote;
  
  // Update tool cards
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`tool-${i}-title`).textContent = texts.tools[i].title;
    document.getElementById(`tool-${i}-desc`).textContent = texts.tools[i].desc;
    document.getElementById(`tool-${i}-button`).textContent = texts.tools[i].button;
  }
  
  document.title = texts.title;
}

function showLanguageIndicator(language) {
  let indicator = document.querySelector('.language-indicator');
  
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'language-indicator';
    document.body.appendChild(indicator);
  }
  
  indicator.textContent = language === 'en' ? 'English' : '日本語';
  indicator.classList.add('show');
  
  setTimeout(() => {
    indicator.classList.remove('show');
  }, 1500);
}

// Tool card hover effects
function initializeToolCards() {
  const toolCards = document.querySelectorAll('.tool-card');
  
  toolCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('hovered');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('hovered');
    });
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize saved preferences first
  initializeTheme();
  initializeLanguage();
  initializeToolCards();
  
  // Then set up event listeners
  themeToggle.addEventListener("change", toggleTheme);
  langToggle.addEventListener("change", toggleLanguage);
});
