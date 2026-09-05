/* ==========================================================================
   Babu Saheb - Developer Portfolio JavaScript Interactivity
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. DYNAMIC TYPING EFFECT ---
  const typingTextEl = document.getElementById("typing-text");
  const roles = [
    "🚀 Flutter Developer",
    "🍎 iOS Developer (Swift)",
    "🟢 Node.js / Express.js Developer",
    "📱 Cross-Platform App Specialist",
    "🔥 REST API & Backend Engineer",
    "⚡ BLoC | GetX | Provider | Firebase",
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
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      backToTopBtn.classList.add("visible");
    } else {
      navbar.classList.remove("scrolled");
      backToTopBtn.classList.remove("visible");
    }

    // ScrollSpy active link
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.innerHTML = navMenu.classList.contains("active")
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- 3. THEME TOGGLE (DARK / LIGHT) ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  themeToggleBtn.addEventListener("click", () => {
    if (document.body.getAttribute("data-theme") === "dark") {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      showToast("Switched to Light Mode");
    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      showToast("Switched to Dark Mode");
    }
  });

  // --- 4. TECH STACK FILTERING ---
  const skillFilterBtns = document.querySelectorAll(
    ".skills-filter .filter-btn[data-filter]",
  );
  const skillCards = document.querySelectorAll("#skills-container .skill-card");

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      skillFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      skillCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // --- 5. PROJECTS CATEGORY FILTERING ---
  const pFilterBtns = document.querySelectorAll(
    ".skills-filter .filter-btn[data-pfilter]",
  );
  const projectCards = document.querySelectorAll(
    ".projects-grid .project-card",
  );

  pFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      pFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const pfilter = btn.getAttribute("data-pfilter");

      projectCards.forEach((card) => {
        if (pfilter === "all" || card.getAttribute("data-pcat") === pfilter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // --- 6. PROJECT MODAL DATA & HANDLER ---
  const projectModalData = {
    quickmed: {
      title: "QuickMed – Telemedicine & Online Doctor Consultation",
      badge: "Play Store & App Store",
      image: "images/quickmed/unnamed.webp",
      images: [
        {
          src: "images/quickmed/unnamed.webp",
          alt: "QuickMed telemedicine consultation request screen",
        },
        {
          src: "images/quickmed/image1.webp",
          alt: "QuickMed doctor call appointment screen",
        },
        {
          src: "images/quickmed/image2.webp",
          alt: "QuickMed digital prescription and referral screen",
        },
        {
          src: "images/quickmed/image3.webp",
          alt: "QuickMed health insurance billing screen",
        },
      ],
      description:
        "QuickMed is a production-ready telemedicine mobile app enabling patients to consult licensed doctors remotely across Switzerland and the EU. Built with Flutter for Android and iOS, it provides core healthcare workflows including doctor discovery, audio/video consultations, patient registration and authentication, prescriptions and refills, specialist referrals, lab and imaging referrals, and sick notes.",
      highlights: [
        "Production-ready telemedicine platform deployed on both Google Play Store and Apple App Store",
        "Core healthcare workflows: doctor discovery, audio/video consultations, patient registration & authentication",
        "Digital prescriptions & refills, specialist referrals, lab and imaging referrals, and sick notes",
        "REST API integration, Firebase services, push notifications, authentication flows, and real-time features",
        "Live digital healthcare application serving patients across Switzerland and the EU",
      ],
      stack: [
        "Flutter",
        "Dart",
        "Node.js",
        "Express.js",
        "Firebase",
        "REST API",
      ],
      links: [
        {
          label: "Google Play Store",
          icon: "fa-brands fa-google-play",
          href: "https://play.google.com/store/apps/details?id=com.quickmed.quickmed&pcampaignid=web_share",
        },
        {
          label: "Apple App Store",
          icon: "fa-brands fa-apple",
          href: "https://apps.apple.com/ch/app/quickmed-app/id6737278009",
        },
      ],
    },
    salvaging: {
      title: "Salvaging App",
      badge: "Play Store & App Store",
      image: "images/salvaging_app.png",
      images: [
        {
          src: "images/salvaging/salvaingLogin_page.webp",
          alt: "Salvaging app login screen",
        },
        {
          src: "images/salvaging/byItems.webp",
          alt: "Salvaging app browse items screen",
        },
        {
          src: "images/salvaging/unnamed.webp",
          alt: "Salvaging app marketplace screen",
        },
        {
          src: "images/salvaging/unnamed (1).webp",
          alt: "Salvaging app product details screen",
        },
      ],
      description:
        "Cross-platform marketplace for leftover and surplus construction materials, deployed on Android, iOS, and Web from a single Flutter codebase. Connects contractors, suppliers, and individuals to buy and sell excess building inventory, reducing landfill waste and optimizing construction budgets.",
      highlights: [
        "Cross-platform development using Flutter — deployed on Android, iOS, and Web from a single codebase",
        "Firebase integration for authentication, database, and real-time updates",
        "Custom REST APIs for advanced functionality and backend support",
        "Marketplace feature enabling users to list leftover building/construction materials for resale with search, filter, and listing management",
        "Firebase push notifications & real-time chat between buyers & sellers",
      ],
      stack: [
        "Flutter",
        "Dart",
        "Node.js",
        "Express.js",
        "Firebase",
        "REST API",
      ],
      links: [
        {
          label: "Google Play Store",
          icon: "fa-brands fa-google-play",
          href: "https://play.google.com/store/apps/details?id=com.salvaging",
        },
        {
          label: "Apple App Store",
          icon: "fa-brands fa-apple",
          href: "https://apps.apple.com/in/app/salvaging/id6737816871",
        },
      ],
    },
    realestate: {
      title: "RealEstate App",
      badge: "Play Store & App Store",
      image: "images/real_estate_app.png",
      description:
        "Property platform supporting six user roles with role-based UI and functionality. Integrated Google Maps, payment gateways (Razorpay), and real-time status updates for listings and transactions.",
      highlights: [
        "Six user roles with role-based UI and functionality",
        "Interactive map integration with Google Maps API",
        "Razorpay payment gateway integration for transactions",
        "Real-time status updates for listings and transactions",
        "Node.js backend with Flutter client app and Firebase",
      ],
      stack: [
        "Flutter",
        "Dart",
        "Node.js",
        "Firebase",
        "Razorpay",
        "Google Maps API",
      ],
      links: [
        {
          label: "Google Play Store",
          icon: "fa-brands fa-google-play",
          href: "https://play.google.com/store/apps/details?id=com.lnh.landsandhomes",
        },
        {
          label: "Apple App Store",
          icon: "fa-brands fa-apple",
          href: "https://apps.apple.com/in/app/lands-homes/id6749686247",
        },
      ],
    },
    talkup: {
      title: "TalkUp.AI",
      badge: "AI Application",
      image: "images/talkup_ai.png",
      description:
        "An AI-powered communication and translation assistant enabling real-time multilingual conversations using voice recognition and NLP. Features voice-to-text, text-to-voice, and real-time translation for seamless cross-language communication.",
      highlights: [
        "AI-powered communication and translation assistant for real-time multilingual conversations",
        "Voice recognition and NLP for smart responses and language practice",
        "Voice-to-text, text-to-voice, and real-time translation features",
        "Conversational AI integration for intelligent assistance",
        "Node.js server with Socket.io orchestrating AI models & user sessions",
      ],
      stack: ["Flutter", "Dart", "Node.js", "Socket.io", "NLP", "AI Models"],
      link: "https://play.google.com/store/apps/details?id=com.talkup.ai",
    },
    vticpl: {
      title: "VTiCPL App",
      badge: "Live Website",
      image:
        "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=800&auto=format&fit=crop",
      description:
        "A field reporting app for construction companies, letting staff manage and document site progress efficiently. Features employee authentication, a Create Project (Site) module, prefilled data upload forms, and required-angle photo capture/upload with an approval-status tracking view.",
      highlights: [
        "Employee authentication and role-based access control",
        "Create Project (Site) module for construction project management",
        "Prefilled data upload forms for efficient field reporting",
        "Required-angle photo capture and upload with approval-status tracking view",
        "Node.js / Express.js backend with Flutter client",
      ],
      stack: ["Flutter", "Node.js", "Express.js", "REST API"],
      link: "https://vticpl.in/",
    },
    crystal: {
      title: "Crystal Ice App",
      badge: "Enterprise Platform",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      description:
        "A business and field-staff management app with analytics dashboards for operational tracking. Implements role-based access for office and field staff along with real-time reporting features.",
      highlights: [
        "Role-based access for office and field staff",
        "Analytics dashboards for operational tracking",
        "Real-time reporting features with MongoDB aggregation",
        "Staff live location tracking & route optimization",
        "Clean BLoC architecture in Flutter",
      ],
      stack: ["Flutter", "Node.js", "MongoDB", "Express.js", "BLoC"],
      link: "#",
    },
    vendor: {
      title: "Vendor App",
      badge: "Play Store",
      image:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop",
      description:
        "Full-featured vendor management system providing merchants with instant order alerts, product status updates, inventory control, and payment history.",
      highlights: [
        "Instant push notifications for new order placement",
        "Order status workflow (Accepted, Preparing, Dispatched, Delivered)",
        "Financial dashboard with total revenue & payout tracking",
        "Node.js & Express REST API architecture",
      ],
      stack: ["Flutter", "Dart", "Node.js", "REST API", "Firebase FCM"],
      link: "https://play.google.com/store/apps/details?id=com.acunec.obc_vendor",
    },
    fotato: {
      title: "Fotato App",
      badge: "Play Store",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop",
      description:
        "A photo-sharing platform with a smooth, responsive UI for uploading, browsing, and interacting with shared photos. Integrated Firebase for authentication, storage, and real-time content updates.",
      highlights: [
        "Photo-sharing platform with smooth, responsive UI for uploading and browsing photos",
        "Firebase integration for authentication, storage, and real-time content updates",
        "Real-time comments, likes, and user activity feed",
        "Optimized image caching using Flutter cached_network_image",
        "Custom photo filter application and image crop UI",
      ],
      stack: ["Flutter", "Dart", "Node.js", "Firebase", "Cloud Storage"],
      link: "https://play.google.com/store/apps/details?id=com.fotato.user",
    },
    obc: {
      title: "OBC: ObsessedByCar – Spare Parts",
      badge: "Play Store",
      image:
        "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop",
      description:
        "An e-commerce mobile app for browsing and purchasing car accessories, spare parts, and performance products. Features advanced search, filtering, category-based navigation, secure order management with real-time tracking, and wishlist functionality.",
      highlights: [
        "Advanced search, filtering, and category-based product navigation",
        "Secure order management system with real-time tracking",
        "Wishlist and favorites management for users",
        "Built with Flutter for cross-platform Android & iOS, powered by Node.js REST API",
      ],
      stack: ["Flutter", "Dart", "Node.js", "Express.js", "REST API"],
      link: "https://play.google.com/store/apps/details?id=com.acunec.obc_vendor",
    },
    "obc-vendor": {
      title: "OBC Vendor App",
      badge: "Play Store",
      image:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop",
      description:
        "The OBC Vendor App simplifies listing and management of car spare parts on a single platform. Vendors can manage inventory, update prices and stock in real-time, and process orders through an intuitive dashboard.",
      highlights: [
        "Inventory management with real-time price and stock updates",
        "Order management dashboard for vendor processing",
        "Instant push notifications for new orders",
        "Node.js & Express REST API architecture with Firebase FCM",
      ],
      stack: [
        "Flutter",
        "Dart",
        "Node.js",
        "Express.js",
        "REST API",
        "Firebase FCM",
      ],
      links: [
        {
          label: "Google Play Store",
          icon: "fa-brands fa-google-play",
          href: "https://play.google.com/store/apps/details?id=com.acunec.obc_vendor",
        },
      ],
    },
    zodia: {
      title: "Zodia India",
      badge: "Live E-Commerce",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop",
      description:
        "Premium men's fashion e-commerce store with custom Node.js/Express.js backend powering product catalog, shopping cart API, and payment gateway integrations.",
      highlights: [
        "High-performance REST API with JWT authentication",
        "Scalable database queries for product filtering & sorting",
        "Integration with payment gateways and order fulfillment APIs",
        "Secure session and inventory management",
      ],
      stack: ["Node.js", "Express.js", "REST API", "MongoDB / MySQL", "JWT"],
      link: "https://zodiaindia.com/",
    },
    datekarlo: {
      title: "Date Karlo",
      badge: "Dating Platform",
      image:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop",
      description:
        "A dating app focused on helping users build meaningful connections through profile matching and messaging. Integrated REST APIs for user profiles, matching logic, and real-time chat features.",
      highlights: [
        "Profile matching and matching logic algorithms",
        "Real-time chat messaging with REST API integration",
        "User profile management and verification",
        "Custom swipe card gesture physics built in Flutter",
        "Node.js REST API backend",
      ],
      stack: ["Flutter", "Dart", "Node.js", "REST API", "Socket.io"],
      link: "https://datekarlo.com/",
    },
  };

  const projectModal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content");
  const modalCloseBtn = document.getElementById("modal-close");
  const openModalBtns = document.querySelectorAll(".open-modal-btn");

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-project");
      const data = projectModalData[key];

      if (!data) return;

      modalContent.innerHTML = `
        <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.8rem;">
          <span style="padding:0.2rem 0.6rem; background:rgba(56,189,248,0.15); border:1px solid var(--primary); border-radius:4px; font-size:0.75rem; font-family:var(--font-mono); color:var(--primary);">${data.badge}</span>
        </div>
        <h2 style="font-size:1.8rem; font-weight:800; color:var(--text-main); margin-bottom:1rem;">${data.title}</h2>
        ${
          data.images
            ? `<div class="modal-image-gallery" aria-label="${data.title} app screens">
          ${data.images.map((image) => `<img src="${image.src}" alt="${image.alt}" loading="lazy">`).join("")}
        </div>`
            : ""
        }
        <p style="color:var(--text-muted); font-size:0.98rem; line-height:1.6; margin-bottom:1.4rem;">${data.description}</p>
        
        <h4 style="color:var(--primary); margin-bottom:0.6rem;">Key Features & Architecture:</h4>
        <ul style="list-style:none; margin-bottom:1.5rem;">
          ${data.highlights.map((h) => `<li style="position:relative; padding-left:1.2rem; margin-bottom:0.4rem; color:var(--text-muted); font-size:0.92rem;"><span style="position:absolute; left:0; color:var(--success);">✔</span> ${h}</li>`).join("")}
        </ul>

        <h4 style="color:var(--secondary); margin-bottom:0.6rem;">Tech Stack:</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.8rem;">
          ${data.stack.map((s) => `<span class="tech-pill">${s}</span>`).join("")}
        </div>

        ${
          data.links
            ? `<div style="display:flex; flex-wrap:wrap; gap:0.75rem;">
          ${data.links.map((l) => `<a href="${l.href}" target="_blank" rel="noopener" class="btn-primary" style="display:inline-flex;"><i class="${l.icon || "fa-solid fa-arrow-up-right-from-square"}"></i> ${l.label}</a>`).join("")}
        </div>`
            : data.link && data.link !== "#"
              ? `<a href="${data.link}" target="_blank" rel="noopener" class="btn-primary" style="display:inline-flex;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Project / App Store</a>`
              : ""
        }
      `;

      projectModal.classList.add("active");
    });
  });

  modalCloseBtn.addEventListener("click", () => {
    projectModal.classList.remove("active");
  });

  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove("active");
    }
  });

  // --- 7. INTERACTIVE TERMINAL EMULATOR ---
  const terminalForm = document.getElementById("terminal-form");
  const terminalInput = document.getElementById("terminal-input");
  const terminalOutput = document.getElementById("terminal-output");

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
<span style="color:var(--text-main);">Babu Saheb | Mobile Developer (Flutter, iOS, Node.js)</span>
📍 Location: Jaipur, India
🎓 Education: B.Tech in CSE (2020 - 2024)
💼 Experience: 2+ Years building mobile apps and backend APIs
`,
    skills: () => `
<span style="color:var(--primary);">Mobile Dev:</span> Flutter, Dart, Swift, BLoC, GetX, Provider, Firebase, Android, iOS
<span style="color:var(--secondary);">Backend:</span> Node.js, Express.js, REST APIs, JWT, Socket.io
<span style="color:var(--success);">Databases:</span> MongoDB, MySQL, Firestore
<span style="color:var(--warning);">Languages:</span> Dart, Swift, JavaScript (ES6+), TypeScript, Java, HTML5/CSS3
<span style="color:var(--accent);">Tools:</span> Android Studio, Xcode, Git, Postman, Figma, VS Code, Firebase Console
`,
    projects: () => `
1. <span style="color:var(--primary);">QuickMed App</span> - Swiss telemedicine platform
2. <span style="color:var(--primary);">Salvaging App</span> - Construction materials marketplace
3. <span style="color:var(--primary);">Real Estate App</span> - Role-based property portal
4. <span style="color:var(--primary);">TalkUp.AI</span> - Voice AI conversation assistant
5. <span style="color:var(--primary);">VTiCPL App</span> - Site reporting & photo upload platform
6. <span style="color:var(--primary);">Crystal Ice App</span> - Field staff & business tracking
7. <span style="color:var(--primary);">Vendor App</span> - Multi-vendor management platform
8. <span style="color:var(--primary);">Fotato App</span> - Photo sharing social platform
9. <span style="color:var(--primary);">OBC: ObsessedByCar</span> - Car spare parts e-commerce
10. <span style="color:var(--primary);">OBC Vendor App</span> - Vendor management for car parts
11. <span style="color:var(--primary);">Zodia India</span> - Men's fashion e-commerce platform
12. <span style="color:var(--primary);">Date Karlo</span> - Dating & matching platform
`,
    experience: () => `
💼 <span style="color:var(--primary);">Bigwon Digital Services Pvt. Ltd</span> (Jaipur) | Nov 2025 - Present
   Role: Flutter Developer
💼 <span style="color:var(--secondary);">Mobiloitte Technologies Pvt Ltd</span> (New Delhi) | June 2024 - Nov 2025
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
`,
  };

  if (terminalForm)
    terminalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cmdInput = terminalInput.value.trim().toLowerCase();
      terminalInput.value = "";

      if (!cmdInput) return;

      // Append prompt line
      const promptLine = document.createElement("div");
      promptLine.className = "terminal-line";
      promptLine.innerHTML = `<span class="prompt">babu@engineer</span>:<span class="prompt-path">~</span>$ ${cmdInput}`;
      terminalOutput.appendChild(promptLine);

      if (cmdInput === "clear") {
        terminalOutput.innerHTML = "";
        return;
      }

      const responseLine = document.createElement("div");
      responseLine.className = "terminal-line";

      if (terminalCommands[cmdInput]) {
        responseLine.innerHTML = terminalCommands[cmdInput]();
      } else {
        responseLine.innerHTML = `<span style="color:#ef4444;">zsh: command not found: ${cmdInput}. Type <span style="color:var(--warning);">help</span> for options.</span>`;
      }

      terminalOutput.appendChild(responseLine);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    });

  // --- 8. CONTACT FORM SUBMISSION & COPY EMAIL ---
  const contactForm = document.getElementById("contact-form");
  const copyEmailBtn = document.getElementById("copy-email-btn");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/babusahebji4027@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message,
            _subject: `[Portfolio Inquiry] ${subject} from ${name}`,
          }),
        },
      );

      if (response.ok) {
        showToast(
          `Thank you ${name}! Your message was delivered directly to babusahebji4027@gmail.com.`,
        );
        contactForm.reset();
      } else {
        showToast("Redirecting to mail client...");
        const mailtoUrl = `mailto:babusahebji4027@gmail.com?subject=${encodeURIComponent(`[Portfolio Contact] ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoUrl;
      }
    } catch (err) {
      showToast("Redirecting to mail client...");
      const mailtoUrl = `mailto:babusahebji4027@gmail.com?subject=${encodeURIComponent(`[Portfolio Contact] ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });

  copyEmailBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText("babusahebji4027@gmail.com")
      .then(() => {
        showToast("Copied babusahebji4027@gmail.com to clipboard!");
      })
      .catch(() => {
        showToast("Email: babusahebji4027@gmail.com");
      });
  });

  // --- TOAST NOTIFICATION UTILITY ---
  function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-message");

    toastMsg.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }
});
