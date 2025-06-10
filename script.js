const themeToggle = document.getElementById("checkbox");
const langToggle = document.getElementById("language-checkbox");
const langLabel = document.querySelector(".lang-label");

let isJapanese = false;

// Language translations object
const translations = {
  en: {
    title: "Cybersecurity Multi-Tool",
    subtitle: "A collection of security related tools",
    aboutTitle: "About This Collection",
    aboutDesc: "Ever wonder what is possible with just statically hosted pages?<br>This collection of cybersecurity tools is designed to help users understand and implement better security practices while also demonstrating what is possible with a minimal tech stack. Each tool serves an educational purpose while providing practical functionality for everyday security needs.",
    footer: "Created by TTB3AR",
    collectionNote: "Arch btw",
    dashboard: {
      title: "Security Information Dashboard",
      subtitle: "What information can your browser access statically?",
      ip: "IP Address",
      location: "Location",
      os: "Operating System",
      screen: "Screen Resolution",
      js: "JavaScript Status",
      adblock: "Ad Blocker",
      referrer: "Referrer",
      language: "Browser Language",
      //timezone: "Time Zone",
      storage: "Local Storage"
    },
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
        desc: "Encrypt and decrypt data using Advanced Encryption Standard(AES)",
        button: "Launch Tool"
      }
    }
  },
  jp: {
    title: "サイバーセキュリティマルチツール",
    subtitle: "包括的なセキュリティツールスイート",
    aboutTitle: "このコレクションについて",
    aboutDesc: "静的ホスティングされたページだけで何が可能なのか、考えたことはありますか？<br>このサイバーセキュリティツールのコレクションは、ユーザーがより良いセキュリティ実践を理解し実装するのを支援するだけでなく、最小限のテクノロジースタックで何が可能かを示すように設計されています。各ツールは教育的な目的を果たす一方で、日常のセキュリティニーズに対応する実践的な機能を提供しています。",
    footer: "TTB3AR制作",
    collectionNote: "ちなみにアーチ",
    dashboard: {
      title: "セキュリティ情報ダッシュボード",
      subtitle: "ブラウザは静的にどのような情報を取得できるか",
      ip: "IPアドレス",
      location: "位置情報",
      os: "オペレーティングシステム",
      screen: "画面解像度",
      js: "JavaScript状態",
      adblock: "広告ブロッカー",
      referrer: "リファラー",
      language: "ブラウザ言語",
      //timezone: "タイムゾーン",
      storage: "ローカルストレージ"
    },
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
        desc: "Advanced Encryption Standard(AES)を使用してデータを暗号化・復号化",
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

  // Update dashboard language
  updateDashboardLanguage(language);
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

// Dashboard Functions
async function initializeDashboard() {
  // Basic information that doesn't require API calls
  updateBasicInfo();
  
  // API-dependent information
  await updateIPInfo();
  
  // Ad blocker detection
  detectAdBlocker();
}

function updateBasicInfo() {
  // Operating System
  const os = getOperatingSystem();
  document.getElementById('os-value').textContent = os;
  
  // Screen Resolution
  const screenRes = `${screen.width} × ${screen.height}`;
  document.getElementById('screen-value').textContent = screenRes;
  
  // JavaScript Status (always enabled if this runs)
  document.getElementById('js-value').textContent = isJapanese ? "有効" : "Enabled";
  document.getElementById('js-value').className = "dashboard-value status-enabled";
  
  // Referrer
  const referrer = document.referrer || (isJapanese ? "直接アクセス" : "Direct Access");
  document.getElementById('referrer-value').textContent = referrer;
  
  // Browser Language
  const browserLang = navigator.language || navigator.userLanguage;
  document.getElementById('lang-value').textContent = browserLang;
  
  // Time Zone
  //const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //document.getElementById('timezone-value').textContent = timezone;
  
  // Local Storage
  const storageSupport = checkLocalStorage();
  document.getElementById('storage-value').textContent = storageSupport.text;
  document.getElementById('storage-value').className = `dashboard-value ${storageSupport.class}`;
}

function getOperatingSystem() {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Windows NT 10.0')) return 'Windows 10/11';
  if (userAgent.includes('Windows NT 6.3')) return 'Windows 8.1';
  if (userAgent.includes('Windows NT 6.2')) return 'Windows 8';
  if (userAgent.includes('Windows NT 6.1')) return 'Windows 7';
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac OS X')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  
  return isJapanese ? "不明" : "Unknown";
}

function checkLocalStorage() {
  try {
    const testKey = 'test-storage';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return {
      text: isJapanese ? "利用可能" : "Available",
      class: "status-enabled"
    };
  } catch (error) {
    return {
      text: isJapanese ? "利用不可" : "Not Available",
      class: "status-disabled"
    };
  }
}

async function updateIPInfo() {
  try {
    const response = await fetch('https://ipinfo.io/json');
    const data = await response.json();
    
    // Update IP Address
    document.getElementById('ip-value').textContent = data.ip || (isJapanese ? "取得できません" : "Unable to fetch");
    
    // Update Location
    const location = data.city && data.region && data.country 
      ? `${data.city}, ${data.region}, ${data.country}`
      : (isJapanese ? "取得できません" : "Unable to fetch");
    document.getElementById('location-value').textContent = location;
    
  } catch (error) {
    console.warn('Could not fetch IP information:', error);
    document.getElementById('ip-value').textContent = isJapanese ? "取得できません" : "Unable to fetch";
    document.getElementById('location-value').textContent = isJapanese ? "取得できません" : "Unable to fetch";
  }
}

function detectAdBlocker() {
  // Create a test element that ad blockers typically block
  const testAd = document.createElement('div');
  testAd.innerHTML = '&nbsp;';
  testAd.className = 'adsbox';
  testAd.style.position = 'absolute';
  testAd.style.left = '-10000px';
  testAd.style.width = '1px';
  testAd.style.height = '1px';
  
  document.body.appendChild(testAd);
  
  setTimeout(() => {
    const isBlocked = testAd.offsetHeight === 0;
    const adBlockStatus = isBlocked 
      ? (isJapanese ? "検出" : "Detected")
      : (isJapanese ? "未検出" : "Not Detected");
    
    document.getElementById('adblock-value').textContent = adBlockStatus;
    document.getElementById('adblock-value').className = `dashboard-value ${isBlocked ? 'status-detected' : 'status-not-detected'}`;
    
    document.body.removeChild(testAd);
  }, 100);
}

function updateDashboardLanguage(language) {
  const texts = translations[language];
  
  document.getElementById('dashboard-title').textContent = texts.dashboard.title;
  document.getElementById('dashboard-subtitle').textContent = texts.dashboard.subtitle;
  document.getElementById('ip-title').textContent = texts.dashboard.ip;
  document.getElementById('location-title').textContent = texts.dashboard.location;
  document.getElementById('os-title').textContent = texts.dashboard.os;
  document.getElementById('screen-title').textContent = texts.dashboard.screen;
  document.getElementById('js-title').textContent = texts.dashboard.js;
  document.getElementById('adblock-title').textContent = texts.dashboard.adblock;
  document.getElementById('referrer-title').textContent = texts.dashboard.referrer;
  document.getElementById('lang-title').textContent = texts.dashboard.language;
  //document.getElementById('timezone-title').textContent = texts.dashboard.timezone;
  document.getElementById('storage-title').textContent = texts.dashboard.storage;
  
  // Update dynamic content that changes based on language
  updateBasicInfo();
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
  
  // Initialize dashboard
  initializeDashboard();
  
  // Then set up event listeners
  themeToggle.addEventListener("change", toggleTheme);
  langToggle.addEventListener("change", toggleLanguage);
});
