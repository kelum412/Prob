document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme and Language
  initTheme();
  initLanguage();

  // Inject Header and Footer dynamically
  injectHeader();
  injectFooter();

  // Active Link Highlighting
  highlightActiveLink();

  // Setup Scroll-reveal Animations
  initScrollReveal();

  // Setup Scroll-based Shrink effect & progress bar
  initHeaderScroll();

  // Handle service quick redirect parameters
  initServicesFilter();
});

/* ==========================================================================
   Language Switcher System
   ========================================================================== */
function initLanguage() {
  const savedLang = localStorage.getItem('site-lang') || 'si'; // Default to Sinhala
  document.documentElement.className = document.documentElement.className.replace(/lang-(si|en|ta)/, '');
  document.documentElement.classList.add(`lang-${savedLang}`);
  updateDropdownLanguages();
}

window.toggleLanguage = function(lang) {
  localStorage.setItem('site-lang', lang);
  document.documentElement.classList.remove('lang-si', 'lang-en', 'lang-ta');
  document.documentElement.classList.add(`lang-${lang}`);
  
  updateDropdownLanguages();
  
  // Re-init header/footer if language toggled dynamically to update static translation text
  injectHeader();
  injectFooter();
  highlightActiveLink();
  setupMobileMenu();
}

function updateDropdownLanguages() {
  const currentLang = localStorage.getItem('site-lang') || 'si';
  const options = document.querySelectorAll('option[data-lang-si], option[data-lang-en], option[data-lang-ta]');
  options.forEach(opt => {
    const text = opt.getAttribute(`data-lang-${currentLang}`);
    if (text) {
      opt.textContent = text;
    }
  });
}

/* ==========================================================================
   Theme Switcher System
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('site-theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

window.toggleTheme = function() {
  const isDark = document.documentElement.classList.contains('dark');
  if (isDark) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('site-theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('site-theme', 'dark');
  }
  updateThemeIcons();
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const moonIcons = document.querySelectorAll('.theme-icon-moon');
  const sunIcons = document.querySelectorAll('.theme-icon-sun');
  
  if (isDark) {
    moonIcons.forEach(i => i.classList.add('hidden'));
    sunIcons.forEach(i => i.classList.remove('hidden'));
  } else {
    moonIcons.forEach(i => i.classList.remove('hidden'));
    sunIcons.forEach(i => i.classList.add('hidden'));
  }
}

/* ==========================================================================
   Dynamic Navigation Header (Floating Glassmorphic Menu)
   ========================================================================== */
function injectHeader() {
  const headerContainer = document.getElementById('global-header');
  if (!headerContainer) return;

  const currentLang = localStorage.getItem('site-lang') || 'si';

  // Navigation labels
  const navText = {
    si: {
      dept: "දකුණු පළාත් සමාජ සුබසාධන, පරිවාස හා ළමාරක්ෂක සේවා දෙපාර්තමේන්තුව",
      home: "ප්‍රධාන පිටුව",
      about: "අප ගැන",
      services: "සේවා",
      downloads: "බාගත කිරීම්",
      gallery: "ඡායාරූප",
      contact: "සම්බන්ධතා",
      hotline: "ඇමතුම්: 1929"
    },
    en: {
      dept: "Southern Province Department of Social Welfare, Probation & Child Care Services",
      home: "Home",
      about: "About Us",
      services: "Services",
      downloads: "Downloads",
      gallery: "Gallery",
      contact: "Contact Us",
      hotline: "Hotline: 1929"
    },
    ta: {
      dept: "தென் மாகாண சமூக நலன்புரி, நன்னடத்தை, சிறுவர் பராமரிப்புச் சேவைகள் திணைக்களம்",
      home: "முகப்பு",
      about: "எங்களைப் பற்றி",
      services: "சேவைகள்",
      downloads: "பதிவிறக்கங்கள்",
      gallery: "புகைப்படங்கள்",
      contact: "தொடர்புகள்",
      hotline: "அழைப்பு: 1929"
    }
  }[currentLang];

  const html = `
    <!-- Floating Header Container -->
    <div id="header-container-div" class="fixed top-4 inset-x-4 max-w-7xl mx-auto z-50 px-2 fixed-header-container">
      <nav class="glass-nav rounded-full border shadow-lg px-6 py-3 flex items-center justify-between transition-all duration-300 relative overflow-hidden">
        <!-- Scroll Progress Bar -->
        <div class="scroll-progress-bar"></div>

        <!-- DESKTOP HEADER (Large screens) -->
        <div class="hidden lg:flex items-center justify-between w-full" id="desktop-nav-content">
          <!-- Left: Brand (Logos & Shorter Name) -->
          <a href="index.html" class="flex items-center space-x-3.5 group flex-shrink-0">
            <div class="flex items-center space-x-1.5 relative">
              <img src="assets/gov-logo.png" alt="Gov Crest" class="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105">
              <img src="assets/official-logo.png" alt="Dept Logo" class="h-10 w-10 object-contain transition-all duration-300 group-hover:rotate-6">
            </div>
            <div class="h-8 w-px bg-slate-300 dark:bg-slate-700"></div>
            <div class="flex flex-col">
              <h1 class="text-[12px] xl:text-[14px] font-black text-slate-800 dark:text-white leading-tight tracking-tight font-display max-w-[320px] xl:max-w-[400px] transition-colors duration-300 group-hover:text-[#fbbf24] dark:group-hover:text-[#0ea5e9]">
                ${navText.dept}
              </h1>
            </div>
          </a>

          <!-- Center: Menu Links -->
          <div class="flex-1 flex justify-center space-x-6 xl:space-x-8 text-[13.5px] font-bold tracking-wide">
            <a href="index.html" class="nav-link text-slate-650 dark:text-slate-300 hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors py-1" data-nav="home">${navText.home}</a>
            <a href="about.html" class="nav-link text-slate-650 dark:text-slate-300 hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors py-1" data-nav="about">${navText.about}</a>
            <a href="services.html" class="nav-link text-slate-650 dark:text-slate-300 hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors py-1" data-nav="services">${navText.services}</a>
            <a href="downloads.html" class="nav-link text-slate-650 dark:text-slate-300 hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors py-1" data-nav="downloads">${navText.downloads}</a>
            <a href="gallery.html" class="nav-link text-slate-650 dark:text-slate-300 hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors py-1" data-nav="gallery">${navText.gallery}</a>
            <a href="contact.html" class="nav-link text-slate-650 dark:text-slate-300 hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors py-1" data-nav="contact">${navText.contact}</a>
          </div>

          <!-- Right: Controls -->
          <div class="flex items-center space-x-4 flex-shrink-0">
            <!-- Theme Toggle -->
            <button onclick="toggleTheme()" class="theme-btn p-2 rounded-full hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors text-slate-500 dark:text-slate-400" aria-label="Toggle Theme">
              <svg class="theme-icon-moon w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              <svg class="theme-icon-sun w-[18px] h-[18px] hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m2.828 0l-.707-.707m12.728-12.728l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
            </button>

            <!-- Language selector -->
            <div class="relative flex items-center bg-slate-100/80 dark:bg-slate-800/85 rounded-full p-0.5 border border-slate-200/50 dark:border-slate-700/50 text-[11.5px] font-extrabold shadow-inner">
              <button onclick="toggleLanguage('si')" data-target-lang="si" class="lang-btn px-3 py-1 rounded-full transition-all duration-300 ${currentLang === 'si' ? 'bg-[#fbbf24] text-slate-950 font-bold shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}">SI</button>
              <button onclick="toggleLanguage('en')" data-target-lang="en" class="lang-btn px-3 py-1 rounded-full transition-all duration-300 ${currentLang === 'en' ? 'bg-[#fbbf24] text-slate-950 font-bold shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}">EN</button>
              <button onclick="toggleLanguage('ta')" data-target-lang="ta" class="lang-btn px-3 py-1 rounded-full transition-all duration-300 ${currentLang === 'ta' ? 'bg-[#fbbf24] text-slate-950 font-bold shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}">TA</button>
            </div>
          </div>
        </div>

        <!-- MOBILE HEADER (Small screens) -->
        <div class="flex lg:hidden justify-between items-center w-full transition-all duration-300" id="mobile-nav-content">
          <a href="index.html" class="flex items-center space-x-2 group mr-2">
            <!-- Dual Logo Representation on Mobile -->
            <div class="flex items-center space-x-1 flex-shrink-0">
              <img src="assets/gov-logo.png" alt="Gov Crest" class="w-8 h-8 object-contain">
              <img src="assets/official-logo.png" alt="Dept Logo" class="w-8 h-8 object-contain">
            </div>
            <div class="flex flex-col">
              <h1 class="text-[10px] sm:text-xs font-black text-slate-800 dark:text-white leading-tight tracking-tight font-display transition-colors duration-300">
                ${navText.dept}
              </h1>
            </div>
          </a>

          <!-- Mobile Controls & Burger -->
          <div class="flex items-center space-x-2 flex-shrink-0">
            <button onclick="toggleTheme()" class="theme-btn p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400" aria-label="Toggle Theme">
              <svg class="theme-icon-moon w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              <svg class="theme-icon-sun w-[16px] h-[16px] hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m2.828 0l-.707-.707m12.728-12.728l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
            </button>
            
            <div class="flex items-center bg-slate-100/80 dark:bg-slate-850/80 rounded-full p-0.5 border border-slate-200/50 dark:border-slate-800/50 text-[8px] font-extrabold shadow-inner">
              <button onclick="toggleLanguage('si')" data-target-lang="si" class="lang-btn px-2 py-0.5 rounded-full transition-all ${currentLang === 'si' ? 'bg-[#fbbf24] text-slate-950 font-bold shadow-sm' : 'text-slate-500 dark:text-slate-400'}">SI</button>
              <button onclick="toggleLanguage('en')" data-target-lang="en" class="lang-btn px-2 py-0.5 rounded-full transition-all ${currentLang === 'en' ? 'bg-[#fbbf24] text-slate-950 font-bold shadow-sm' : 'text-slate-500 dark:text-slate-400'}">EN</button>
              <button onclick="toggleLanguage('ta')" data-target-lang="ta" class="lang-btn px-2 py-0.5 rounded-full transition-all ${currentLang === 'ta' ? 'bg-[#fbbf24] text-slate-950 font-bold shadow-sm' : 'text-slate-500 dark:text-slate-400'}">TA</button>
            </div>
            
            <button id="mobile-menu-btn" class="p-1.5 rounded-xl text-slate-500 dark:text-slate-400 focus:outline-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </nav>
    </div>

    <!-- Mobile Drawer Menu (Slides from the right) -->
    <div id="mobile-drawer" class="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex justify-end">
      <div class="w-80 bg-[#0d1527]/95 dark:bg-slate-900/90 backdrop-blur-xl h-full p-6 shadow-2xl flex flex-col justify-between border-l border-slate-200/50 dark:border-slate-800/50">
        <div>
          <div class="flex justify-between items-center mb-8 border-b pb-4 border-slate-200/50 dark:border-slate-800/50">
            <span class="font-extrabold text-indigo-650 dark:text-indigo-400 text-sm tracking-wider uppercase font-display">Navigation Menu</span>
            <button id="close-drawer-btn" class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="flex flex-col space-y-4 font-semibold text-sm">
            <a href="index.html" class="nav-link flex items-center gap-3 text-slate-600 dark:text-slate-355 hover:text-indigo-650 dark:hover:text-indigo-400 py-2 border-b border-slate-100/50 dark:border-slate-800/30" data-nav="home">🏠 <span>${navText.home}</span></a>
            <a href="about.html" class="nav-link flex items-center gap-3 text-slate-600 dark:text-slate-355 hover:text-indigo-650 dark:hover:text-indigo-400 py-2 border-b border-slate-100/50 dark:border-slate-800/30" data-nav="about">ℹ️ <span>${navText.about}</span></a>
            <a href="services.html" class="nav-link flex items-center gap-3 text-slate-600 dark:text-slate-355 hover:text-indigo-650 dark:hover:text-indigo-400 py-2 border-b border-slate-100/50 dark:border-slate-800/30" data-nav="services">🛠️ <span>${navText.services}</span></a>
            <a href="downloads.html" class="nav-link flex items-center gap-3 text-slate-600 dark:text-slate-355 hover:text-indigo-650 dark:hover:text-indigo-400 py-2 border-b border-slate-100/50 dark:border-slate-800/30" data-nav="downloads">📥 <span>${navText.downloads}</span></a>
            <a href="gallery.html" class="nav-link flex items-center gap-3 text-slate-600 dark:text-slate-355 hover:text-indigo-650 dark:hover:text-indigo-400 py-2 border-b border-slate-100/50 dark:border-slate-800/30" data-nav="gallery">🖼️ <span>${navText.gallery}</span></a>
            <a href="contact.html" class="nav-link flex items-center gap-3 text-slate-600 dark:text-slate-355 hover:text-indigo-650 dark:hover:text-indigo-400 py-2 border-b border-slate-100/50 dark:border-slate-800/30" data-nav="contact">📞 <span>${navText.contact}</span></a>
          </div>
        </div>
        <div class="border-t pt-4 border-slate-200/50 dark:border-slate-800/50 text-[10px] text-slate-400">
          <p>© 2026 ${navText.dept}</p>
        </div>
      </div>
    </div>
  `;

  headerContainer.innerHTML = html;
  updateThemeIcons();
  setupMobileMenu();
}

function setupMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-drawer-btn');
  const drawer = document.getElementById('mobile-drawer');

  if (btn && drawer) {
    btn.onclick = () => drawer.classList.add('active');
  }
  if (closeBtn && drawer) {
    closeBtn.onclick = () => drawer.classList.remove('active');
  }
  if (drawer) {
    drawer.onclick = (e) => {
      if (e.target === drawer) drawer.classList.remove('active');
    }
  }
}

function initHeaderScroll() {
  const handleScroll = () => {
    const headerContainerDiv = document.getElementById('header-container-div');
    const nav = document.querySelector('#global-header nav');
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    if (headerContainerDiv && nav) {
      if (window.scrollY > 20) {
        headerContainerDiv.classList.add('scrolled');
        nav.classList.add('nav-scrolled');
      } else {
        headerContainerDiv.classList.remove('scrolled');
        nav.classList.remove('nav-scrolled');
      }
    }

    if (progressBar) {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial call
}

/* ==========================================================================
   Dynamic Trilingual Footer
   ========================================================================== */
function injectFooter() {
  const footerContainer = document.getElementById('global-footer');
  if (!footerContainer) return;

  const currentLang = localStorage.getItem('site-lang') || 'si';

  const footerText = {
    si: {
      dept: "සමාජ සුබසාධන, පරිවාස හා ළමාරක්ෂක සේවා දෙපාර්තමේන්තුව",
      govName: "දකුණු පළාත් සභාව",
      hotlineTitle: "හදිසි ඇමතුම් සේවා (නොමිලේ)",
      childHotline: "පරිවාස හා ළමාරක්ෂක හදිසි ඇමතුම: 1929",
      elderHotline: "වැඩිහිටි උපකාරක සේවය: 1920",
      contactUs: "අපව සම්බන්ධ කරගන්න",
      address: "ලිපිනය: කිතුලම්පිටිය, ගාල්ල, ශ්‍රී ලංකාව",
      phone: "දුරකථන: +94 (0) 91 224 8259",
      fax: "ෆැක්ස්: +94 (0) 91 222 6573",
      email: "විද්‍යුත් තැපෑල: probationdepsp@gmail.com",
      quickLinks: "ක්ෂණික සබැඳි",
      terms: "නියමයන් සහ කොන්දේසි",
      rights: "සියලුම හිමිකම් ඇවිරිණි."
    },
    en: {
      dept: "Department of Social Welfare, Probation & Child Care Services",
      govName: "Southern Provincial Council",
      hotlineTitle: "Emergency Help Services (Toll-Free)",
      childHotline: "Child Protection Hotline: 1929",
      elderHotline: "Elders Assistance Desk: 1920",
      contactUs: "Contact Us",
      address: "Address: Kithulampitiya, Galle, Sri Lanka",
      phone: "Phone: +94 (0) 91 224 8259",
      fax: "Fax: +94 (0) 91 222 6573",
      email: "Email: probationdepsp@gmail.com",
      quickLinks: "Quick Links",
      terms: "Terms & Conditions",
      rights: "All Rights Reserved."
    },
    ta: {
      dept: "சமூக நலன்புரி, நன்னடத்தை, சிறுவர் பராமரிப்புச் சேவைகள் திணைக்களம்",
      govName: "தென் மாகாண சபை",
      hotlineTitle: "அவசர உதவி சேவைகள் (கட்டணமற்றது)",
      childHotline: "சிறுவர் பாதுகாப்பு அவசர அழைப்பு: 1929",
      elderHotline: "முதியோர் உதவி மையம்: 1920",
      contactUs: "தொடர்பு கொள்ள",
      address: "முகவரி: கிதுலம்பிட்டிய, காலி, இலங்கை",
      phone: "தொலைபேசி: +94 (0) 91 224 8259",
      fax: "தொலைநகல்: +94 (0) 91 222 6573",
      email: "மின்னஞ்சல்: probationdepsp@gmail.com",
      quickLinks: "விரைவு இணைப்புகள்",
      terms: "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
      rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
    }
  }[currentLang];

  const html = `
    <footer class="bg-[#030712] text-slate-350 border-t border-slate-800/80 pt-20 pb-10 px-4 md:px-8 font-sans relative overflow-hidden">
      <!-- Glow background decoration -->
      <div class="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        <!-- Dept Identity -->
        <div class="space-y-5">
          <div class="flex items-center space-x-3.5">
            <img src="assets/official-logo.png" alt="Logo" class="w-14 h-14 brightness-110 drop-shadow-[0_0_10px_rgba(250,191,36,0.15)]">
            <div>
              <p class="text-[10.5px] uppercase text-[#fbbf24] font-black tracking-widest leading-none mb-1">${footerText.govName}</p>
              <h3 class="text-sm md:text-[15px] font-black text-white tracking-wide leading-snug font-display">${footerText.dept}</h3>
            </div>
          </div>
          <p class="text-[13px] text-slate-400 leading-relaxed font-sans pt-2">
            ${currentLang === 'si' 
              ? "දකුණු පළාතේ සෑම දරුවෙකුගේම සුරක්ෂිතභාවය තහවුරු කිරීමට සහ ජ්‍යෙෂ්ඨ පුරවැසියන් ඇතුළු සමස්ත ප්‍රජාවගේ සුබසාධනය නැංවීමට කැපවී සිටිමු."
              : currentLang === 'ta'
              ? "தென் மாகாணத்தில் உள்ள ஒவ்வொரு குழந்தையினதும் பாதுகாப்பை உறுதி செய்வதற்கும், முதியவர்கள் மற்றும் சமூகத்தின் நலனை மேம்படுத்துவதற்கும் அர்ப்பணிக்கப்பட்டுள்ளது."
              : "Dedicated to ensuring the safety of every child in the Southern Province and elevating the welfare of our senior citizens and community."}
          </p>
        </div>

        <!-- Emergency Hotlines (Highlight Card) -->
        <div class="bg-[#0d1527] border border-[#0ea5e9]/20 p-6 rounded-3xl space-y-4 shadow-xl shadow-black/20">
          <h4 class="text-[11px] uppercase tracking-widest text-[#0ea5e9] font-black font-display">${footerText.hotlineTitle}</h4>
          <ul class="space-y-3.5 pt-1">
            <li class="flex items-center space-x-3 text-[13px] bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
              <span class="w-2 h-2 rounded-full bg-red-500 inline-block animate-ping"></span>
              <strong class="text-red-200">${footerText.childHotline}</strong>
            </li>
            <li class="flex items-center space-x-3 text-[13px] bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl">
              <span class="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
              <strong class="text-amber-200">${footerText.elderHotline}</strong>
            </li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="text-sm uppercase tracking-wider text-white font-extrabold font-display border-b border-slate-800 pb-2">${footerText.quickLinks}</h4>
          <ul class="space-y-2.5 text-[13.5px] text-slate-400 font-sans">
            <li><a href="about.html" class="hover:text-[#fbbf24] transition-colors flex items-center gap-2">➔ <span data-lang="si">අප ගැන</span><span data-lang="en">About Us</span><span data-lang="ta">எங்களைப் பற்றி</span></a></li>
            <li><a href="services.html" class="hover:text-[#fbbf24] transition-colors flex items-center gap-2">➔ <span data-lang="si">සේවා</span><span data-lang="en">Our Services</span><span data-lang="ta">சேவைகள்</span></a></li>
            <li><a href="downloads.html" class="hover:text-[#fbbf24] transition-colors flex items-center gap-2">➔ <span data-lang="si">බාගත කිරීම්</span><span data-lang="en">Applications & Forms</span><span data-lang="ta">பதிவிறக்கங்கள்</span></a></li>
            <li><a href="gallery.html" class="hover:text-[#fbbf24] transition-colors flex items-center gap-2">➔ <span data-lang="si">ඡායාරූප</span><span data-lang="en">Photo Gallery</span><span data-lang="ta">புகைப்படங்கள்</span></a></li>
          </ul>
        </div>

        <!-- Direct Contact Details -->
        <div class="space-y-4">
          <h4 class="text-sm uppercase tracking-wider text-white font-extrabold font-display border-b border-slate-800 pb-2">${footerText.contactUs}</h4>
          <ul class="space-y-3 text-[13.5px] text-slate-400 font-sans">
            <li class="flex items-start gap-2.5">📍 <span class="leading-normal">${footerText.address}</span></li>
            <li class="flex items-center gap-2.5">📞 <span class="leading-normal">${footerText.phone}</span></li>
            <li class="flex items-center gap-2.5">📠 <span class="leading-normal">${footerText.fax}</span></li>
            <li class="flex items-center gap-2.5">✉️ <a href="mailto:probationdepsp@gmail.com" class="hover:text-[#fbbf24] transition-colors leading-normal">${footerText.email}</a></li>
          </ul>
        </div>
      </div>

      <!-- Copyright & Credits -->
      <div class="max-w-7xl mx-auto border-t border-slate-800/80 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-[12.5px] text-slate-500 relative z-10">
        <p class="text-center md:text-left">© 2026 ${footerText.dept}. ${footerText.rights}</p>
        <div class="flex space-x-4 mt-4 md:mt-0 font-sans">
          <a href="#" class="hover:underline hover:text-slate-400">${footerText.terms}</a>
          <span class="text-slate-800">|</span>
          <span class="text-slate-450">Designed by Kelum Chamara Lakmal</span>
        </div>
      </div>
    </footer>
  `;

  footerContainer.innerHTML = html;
}

/* ==========================================================================
   Active Link Highlighting
   ========================================================================== */
function highlightActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const page = link.getAttribute('href');
    if (page === currentPath) {
      link.classList.add('active');
      link.classList.remove('text-slate-600', 'dark:text-slate-300');
    } else {
      link.classList.remove('active');
      link.classList.add('text-slate-600', 'dark:text-slate-300');
    }
  });
}

/* ==========================================================================
   Scroll Reveal System
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 120; // threshold
      
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      }
    }
  };

  window.addEventListener('scroll', revealOnScroll);
  // Initial check
  revealOnScroll();
}

/* ==========================================================================
   Interactive Count Animate Hook
   ========================================================================== */
window.animateNumbers = function() {
  const counters = document.querySelectorAll('.counter-val');
  const speed = 100; // lower is faster
  
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace('+', '');
      const inc = Math.ceil(target / speed);
      
      if (count < target) {
        counter.innerText = (count + inc) + '+';
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target + '+';
      }
    };
    updateCount();
  });
}

/* ==========================================================================
   Quick Actions Helper Search Redirection
   ========================================================================== */
window.handleQuickSearch = function() {
  const serviceSelect = document.getElementById('quick-service');
  const divisionSelect = document.getElementById('quick-division');
  const service = serviceSelect ? serviceSelect.value : '';
  const division = divisionSelect ? divisionSelect.value : '';
  
  let url = 'services.html';
  if (service || division) {
    url += `?service=${service}&division=${division}`;
  }
  window.location.href = url;
}

/* ==========================================================================
   Handle quick redirects from Home Quick Actions
   ========================================================================== */
function initServicesFilter() {
  const urlParams = new URLSearchParams(window.location.search);
  const service = urlParams.get('service');
  if (service && window.location.pathname.includes('services.html')) {
    setTimeout(() => {
      if (typeof switchTab === 'function') {
        if (service === 'probation') {
          switchTab('childcare-services');
        } else {
          switchTab('welfare-services');
        }
      }
    }, 100);
  }
}

