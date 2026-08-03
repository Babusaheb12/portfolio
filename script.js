/* ==========================================================================
   Babu Saheb - Developer Portfolio JavaScript Interactivity
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. DYNAMIC TYPING EFFECT ---
  const typingTextEl = document.getElementById('typing-text');
  const roles = [
    '🚀 Flutter Developer',
    '🟢 Node.js / Express.js Developer',
    '📱 Cross-Platform App Specialist',
    '🔥 REST API & Backend Engineer',
    '⚡ BLoC | GetX | Firebase Expert'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // --- 2. NAVBAR SCROLL & MOBILE MENU ---
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      backToTopBtn.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      backToTopBtn.classList.remove('visible');
    }

    // ScrollSpy active link
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- 3. THEME TOGGLE (DARK / LIGHT) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  themeToggleBtn.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      showToast('Switched to Light Mode');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      showToast('Switched to Dark Mode');
    }
  });

  // --- 4. TECH STACK FILTERING ---
  const skillFilterBtns = document.querySelectorAll('.skills-filter .filter-btn[data-filter]');
  const skillCards = document.querySelectorAll('#skills-container .skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 5. PROJECTS CATEGORY FILTERING ---
  const pFilterBtns = document.querySelectorAll('.skills-filter .filter-btn[data-pfilter]');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  pFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const pfilter = btn.getAttribute('data-pfilter');

      projectCards.forEach(card => {
        if (pfilter === 'all' || card.getAttribute('data-pcat') === pfilter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 6. PROJECT MODAL DATA & HANDLER ---
  const projectModalData = {
    salvaging: {
      title: "Salvaging App",
      badge: "Play Store",
      image: "images/salvaging_app.png",
      images: [
        { src: "images/salvaging/salvaingLogin_page.webp", alt: "Salvaging app login screen" },
        { src: "images/salvaging/byItems.webp", alt: "Salvaging app browse items screen" },
        { src: "images/salvaging/unnamed.webp", alt: "Salvaging app marketplace screen" },
        { src: "images/salvaging/unnamed (1).webp", alt: "Salvaging app product details screen" }
      ],
      description: "Marketplace for leftover and surplus construction materials. Connects contractors, suppliers, and individuals to buy and sell excess building inventory, reducing landfill waste and optimizing construction budgets.",
      highlights: [
        "Real-time product catalog & geolocation search",
        "Role-based buying, selling, and inventory post management",
        "Firebase push notifications & real-time chat between buyers & sellers",
        "Built with Flutter, Node.js REST API backend, and Firebase integration"
      ],
      stack: ["Flutter", "Dart", "Node.js", "Express.js", "Firebase", "REST API"],
      link: "https://play.google.com/store/apps/details?id=com.salvaging"
    },
    realestate: {
      title: "Real Estate App",
      badge: "Play Store",
      image: "images/real_estate_app.png",
      description: "Role-based property listing and navigation mobile app designed for seamless real estate discovery. Includes buyer, seller, and agent access levels with map integration.",
      highlights: [
        "Dynamic property search filters (price range, bedrooms, location)",
        "Interactive map integration with property pin markers",
        "Secure auth system & favorite property bookmarks",
        "Node.js backend with Flutter client app"
      ],
      stack: ["Flutter", "Dart", "Node.js", "Firebase", "Google Maps API"],
      link: "https://play.google.com/store/apps/details?id=com.lnh.landsandhomes"
    },
    talkup: {
      title: "TalkUp.AI",
      badge: "AI Application",
      image: "images/talkup_ai.png",
      description: "Your Voice, Empowered by Intelligence. AI-driven voice conversation application providing real-time natural language interaction and intelligent assistance.",
      highlights: [
        "Audio frequency wave visualizer widget built in Flutter",
        "Real-time voice token streaming via WebSockets / Socket.io",
        "Low-latency response handling and background audio sessions",
        "Node.js server orchestrating AI models & user sessions"
      ],
      stack: ["Flutter", "Dart", "Node.js", "Socket.io", "AI Models", "Maps API"],
      link: "https://play.google.com/store/apps/details?id=com.talkup.ai"
    },
    vticpl: {
      title: "VTiCPL App",
      badge: "Live Website",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800&auto=format&fit=crop",
      description: "Construction site reporting and management platform allowing field engineers to capture photos, log progress, and transmit site updates directly to central servers.",
      highlights: [
        "Offline log drafting with automatic background synchronization",
        "High-resolution photo uploads with EXIF metadata extraction",
        "Express.js backend with robust image processing pipelines",
        "Role-based reporting dashboards"
      ],
      stack: ["Flutter", "Node.js", "Express.js", "REST API"],
      link: "https://vticpl.in/"
    },
    crystal: {
      title: "Crystal Ice App",
      badge: "Enterprise Platform",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      description: "Business and field staff management system designed for ice distribution operations. Tracks daily deliveries, stock counts, field routes, and analytics.",
      highlights: [
        "Staff live location tracking & route optimization",
        "MongoDB aggregated daily sales and inventory metrics",
        "PDF invoice generation and receipt printing support",
        "Clean BLoC architecture in Flutter"
      ],
      stack: ["Flutter", "Node.js", "MongoDB", "Express.js", "BLoC"],
      link: "#"
    },
    vendor: {
      title: "Vendor App",
      badge: "Play Store",
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop",
      description: "Full-featured vendor management system providing merchants with instant order alerts, product status updates, inventory control, and payment history.",
      highlights: [
        "Instant push notifications for new order placement",
        "Order status workflow (Accepted, Preparing, Dispatched, Delivered)",
        "Financial dashboard with total revenue & payout tracking",
        "Node.js & Express REST API architecture"
      ],
      stack: ["Flutter", "Dart", "Node.js", "REST API", "Firebase FCM"],
      link: "https://play.google.com/store/apps/details?id=com.acunec.obc_vendor"
    },
    fotato: {
      title: "Fotato App",
      badge: "Play Store",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
      description: "Photo-sharing social media application built with a focus on fluid UI transitions, image feed optimization, caching, and social interaction.",
      highlights: [
        "Custom photo filter application and image crop UI",
        "Optimized image caching using Flutter cached_network_image",
        "Real-time comments, likes, and user activity feed",
        "Firebase Storage & Firestore backend integration"
      ],
      stack: ["Flutter", "Dart", "Node.js", "Firebase", "Cloud Storage"],
      link: "https://play.google.com/store/apps/details?id=com.fotato.user"
    },
    zodia: {
      title: "Zodia India",
      badge: "Live E-Commerce",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop",
      description: "Premium men's fashion e-commerce store with custom Node.js/Express.js backend powering product catalog, shopping cart API, and payment gateway integrations.",
      highlights: [
        "High-performance REST API with JWT authentication",
        "Scalable database queries for product filtering & sorting",
        "Integration with payment gateways and order fulfillment APIs",
        "Secure session and inventory management"
      ],
      stack: ["Node.js", "Express.js", "REST API", "MongoDB / MySQL", "JWT"],
      link: "https://zodiaindia.com/"
    },
    datekarlo: {
      title: "Date Karlo",
      badge: "Dating Platform",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop",
      description: "Modern dating app platform created to foster meaningful connections. Features profile swipe decks, distance-based matching algorithms, and encrypted real-time chat.",
      highlights: [
        "Custom swipe card gesture physics built in Flutter",
        "User profile verification & image moderation features",
        "Real-time chat messaging with socket infrastructure",
        "Node.js REST API with geographical queries"
      ],
      stack: ["Flutter", "Dart", "Node.js", "REST API", "Socket.io"],
      link: "https://datekarlo.com/"
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = projectModalData[key];

      if (!data) return;

      modalContent.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.8rem;">
          <span style="padding:0.2rem 0.6rem; background:rgba(56,189,248,0.15); border:1px solid var(--primary); border-radius:4px; font-size:0.75rem; font-family:var(--font-mono); color:var(--primary);">${data.badge}</span>
        </div>
        <h2 style="font-size:1.8rem; font-weight:800; color:var(--text-main); margin-bottom:1rem;">${data.title}</h2>
        ${data.images ? `<div class="modal-image-gallery" aria-label="${data.title} app screens">
          ${data.images.map(image => `<img src="${image.src}" alt="${image.alt}" loading="lazy">`).join('')}
        </div>` : ''}
        <p style="color:var(--text-muted); font-size:0.98rem; line-height:1.6; margin-bottom:1.4rem;">${data.description}</p>
        
        <h4 style="color:var(--primary); margin-bottom:0.6rem;">Key Features & Architecture:</h4>
        <ul style="list-style:none; margin-bottom:1.5rem;">
          ${data.highlights.map(h => `<li style="position:relative; padding-left:1.2rem; margin-bottom:0.4rem; color:var(--text-muted); font-size:0.92rem;"><span style="position:absolute; left:0; color:var(--success);">✔</span> ${h}</li>`).join('')}
        </ul>

        <h4 style="color:var(--secondary); margin-bottom:0.6rem;">Tech Stack:</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.8rem;">
          ${data.stack.map(s => `<span class="tech-pill">${s}</span>`).join('')}
        </div>

        ${data.link !== '#' ? `<a href="${data.link}" target="_blank" rel="noopener" class="btn-primary" style="display:inline-flex;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Project / App Store</a>` : ''}
      `;

      projectModal.classList.add('active');
    });
  });

  modalCloseBtn.addEventListener('click', () => {
    projectModal.classList.remove('active');
  });

  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove('active');
    }
  });

  // --- 7. INTERACTIVE TERMINAL EMULATOR ---
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  const terminalCommands = {
    help: () => `
<span style="color:var(--primary); font-weight:bold;">Available Commands:</span>
  <span style="color:var(--warning);">about</span>       - Print brief intro about Babu Saheb
  <span style="color:var(--warning);">skills</span>      - List technical skills & stack
  <span style="color:var(--warning);">projects</span>    - List live production projects
  <span style="color:var(--warning);">experience</span>  - Display work experience history
  <span style="color:var(--warning);">contact</span>     - Show contact email, phone & social links
  <span style="color:var(--warning);">motto</span>       - Display developer tagline
  <span style="color:var(--warning);">clear</span>       - Clear terminal screen
  <span style="color:var(--warning);">sudo hire</span>   - Run hiring execution payload 🚀
`,
    about: () => `
<span style="color:var(--text-main);">Babu Saheb | Flutter & Node.js Developer</span>
📍 Location: New Delhi, India
🎓 Education: B.Tech in CSE (2020 - 2024)
💼 Experience: 1.5+ Years building mobile apps and backend APIs
`,
    skills: () => `
<span style="color:var(--primary);">Mobile Dev:</span> Flutter, Dart, BLoC, GetX, Firebase, Provider, Android, iOS
<span style="color:var(--secondary);">Backend:</span> Node.js, Express.js, REST APIs, JWT, Socket.io
<span style="color:var(--success);">Databases:</span> MongoDB, MySQL, Firestore
<span style="color:var(--warning);">Languages:</span> Dart, JavaScript (ES6+), TypeScript, Java, Swift, PHP, HTML5/CSS3
`,
    projects: () => `
1. <span style="color:var(--primary);">Salvaging App</span> - Construction materials marketplace
2. <span style="color:var(--primary);">Real Estate App</span> - Role-based property portal
3. <span style="color:var(--primary);">TalkUp.AI</span> - Voice AI conversation assistant
4. <span style="color:var(--primary);">VTiCPL App</span> - Site reporting & photo upload platform
5. <span style="color:var(--primary);">Crystal Ice App</span> - Field staff & business tracking
6. <span style="color:var(--primary);">Vendor App</span> - Multi-vendor management platform
7. <span style="color:var(--primary);">Fotato App</span> - Photo sharing social platform
8. <span style="color:var(--primary);">Zodia India</span> - Men's fashion e-commerce platform
9. <span style="color:var(--primary);">Date Karlo</span> - Dating & matching platform
`,
    experience: () => `
💼 <span style="color:var(--primary);">Bigwon Digital Services Pvt. Ltd</span> (Jaipur) | Nov 2025 - Present
   Role: Flutter Developer
💼 <span style="color:var(--secondary);">Mobiloitte Technologies Pvt Ltd</span> (New Delhi) | Jan 2025 - Nov 2025
   Role: Flutter Developer
`,
    contact: () => `
📧 Email: babusahebji4027@gmail.com
📱 Phone: +91 6204592045
🔗 LinkedIn: linkedin.com/in/babu-saheb-608155239
🐙 GitHub: github.com/BabuSaheb12
💬 WhatsApp: wa.me/916204592045
`,
    motto: () => `
<span style="color:var(--accent); font-style:italic;">"Code. Build. Improve. Repeat." 🚀</span>
`,
    "sudo hire": () => `
<span style="color:var(--success); font-weight:bold;">[SUCCESS] Initiating onboarding sequence!</span>
Sending offer signal to <span style="color:var(--primary);">babusahebji4027@gmail.com</span>...
Babu Saheb is ready to join your engineering team! 🎉
`
  };

  if (terminalForm) terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cmdInput = terminalInput.value.trim().toLowerCase();
    terminalInput.value = '';

    if (!cmdInput) return;

    // Append prompt line
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = `<span class="prompt">babu@engineer</span>:<span class="prompt-path">~</span>$ ${cmdInput}`;
    terminalOutput.appendChild(promptLine);

    if (cmdInput === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    const responseLine = document.createElement('div');
    responseLine.className = 'terminal-line';

    if (terminalCommands[cmdInput]) {
      responseLine.innerHTML = terminalCommands[cmdInput]();
    } else {
      responseLine.innerHTML = `<span style="color:#ef4444;">zsh: command not found: ${cmdInput}. Type <span style="color:var(--warning);">help</span> for options.</span>`;
    }

    terminalOutput.appendChild(responseLine);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  });

  // --- 8. CONTACT FORM SUBMISSION & COPY EMAIL ---
  const contactForm = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;

    showToast(`Thank you ${name}! Message sent successfully. Babu will get back to you shortly.`);
    contactForm.reset();
  });

  copyEmailBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('babusahebji4027@gmail.com').then(() => {
      showToast('Copied babusahebji4027@gmail.com to clipboard!');
    }).catch(() => {
      showToast('Email: babusahebji4027@gmail.com');
    });
  });

  // --- TOAST NOTIFICATION UTILITY ---
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

});
