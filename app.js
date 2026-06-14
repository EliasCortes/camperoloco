/* ==========================================================================
   CAMPEROLOCO APPLICATION SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. STICKY HEADER & SCROLL SPY
     ========================================================================== */
  const header = document.getElementById('nav-header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Sticky header class
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy: Active menu item based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close mobile menu when clicking a link
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     3. DYNAMIC WEEKLY SCHEDULE (Follow the Truck)
     ========================================================================== */
  const scheduleData = {
    lun: {
      dayName: 'Lunes',
      location: 'Kulturbrauerei (Street Food Market)',
      address: 'Schönhauser Allee 36, 10435 Berlin-Prenzlauer Berg',
      startHour: 12,
      endHour: 20,
      mapsLink: 'https://maps.google.com/?q=Kulturbrauerei+Berlin',
      closed: false
    },
    mar: {
      dayName: 'Martes',
      location: 'Markthalle Neun',
      address: 'Eisenbahnstraße 42/43, 10997 Berlin-Kreuzberg',
      startHour: 12,
      endHour: 20,
      mapsLink: 'https://maps.google.com/?q=Markthalle+Neun+Berlin',
      closed: false
    },
    mie: {
      dayName: 'Miércoles',
      location: 'Catering Privado / Preparación de Ingredientes',
      address: 'Berlín, Alemania',
      startHour: 0,
      endHour: 0,
      mapsLink: 'https://maps.google.com/?q=Berlin',
      closed: true
    },
    jue: {
      dayName: 'Jueves',
      location: 'Bite Club (Arena Berlin)',
      address: 'Eichenstraße 4, 12435 Berlin-Alt-Treptow',
      startHour: 17,
      endHour: 23,
      mapsLink: 'https://maps.google.com/?q=Arena+Berlin',
      closed: false
    },
    vie: {
      dayName: 'Viernes',
      location: 'Mauerpark (Viernes de Camperos)',
      address: 'Bernauer Str. 63-64, 13355 Berlin-Mitte',
      startHour: 12,
      endHour: 21,
      mapsLink: 'https://maps.google.com/?q=Mauerpark+Berlin',
      closed: false
    },
    sab: {
      dayName: 'Sábado',
      location: 'Boxhagener Platz (Food Market)',
      address: 'Boxhagener Platz, 10245 Berlin-Friedrichshain',
      startHour: 10,
      endHour: 18,
      mapsLink: 'https://maps.google.com/?q=Boxhagener+Platz+Berlin',
      closed: false
    },
    dom: {
      dayName: 'Domingo',
      location: 'Mauerpark Flea Market',
      address: 'Gleimstraße 55, 10437 Berlin-Prenzlauer Berg',
      startHour: 10,
      endHour: 18,
      mapsLink: 'https://maps.google.com/?q=Mauerpark+Berlin',
      closed: false
    }
  };

  const scheduleTabsContainer = document.getElementById('schedule-tabs');
  const scheduleDisplay = document.getElementById('schedule-display');

  // Determine if a day/time is active
  function checkLiveStatus(dayKey, startHr, endHr, isClosed) {
    if (isClosed) return { label: 'Cerrado', class: 'closed' };

    const now = new Date();
    const daysMap = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];
    const currentDayKey = daysMap[now.getDay()];
    const currentHour = now.getHours();

    if (currentDayKey === dayKey && currentHour >= startHr && currentHour < endHr) {
      return { label: 'Abierto Ahora', class: 'live' };
    }
    return { label: 'Cerrado', class: 'closed' };
  }

  function renderScheduleCard(dayKey) {
    const data = scheduleData[dayKey];
    if (!data) return;

    const status = checkLiveStatus(dayKey, data.startHour, data.endHour, data.closed);
    const timeDisplay = data.closed ? 'Cerrado por catering / descanso' : `${data.startHour}:00h - ${data.endHour}:00h`;

    const html = `
      <div class="schedule-card" style="animation: fadeIn 0.4s ease-out">
        <div class="schedule-card-header">
          <span class="live-badge ${status.class}">${status.label}</span>
          <span class="day-full-name">${data.dayName}</span>
        </div>
        <div class="schedule-card-body">
          <div class="schedule-info">
            <h3 class="location-title">${data.location}</h3>
            <p class="location-address">${data.address}</p>
            <div class="schedule-time">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>${timeDisplay}</span>
            </div>
          </div>
          <div class="schedule-action">
            ${data.closed ? '' : `
              <a href="${data.mapsLink}" target="_blank" class="btn btn-primary">
                Cómo llegar (Google Maps)
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </a>
            `}
          </div>
        </div>
      </div>
    `;

    scheduleDisplay.innerHTML = html;
  }

  if (scheduleTabsContainer) {
    const tabBtns = scheduleTabsContainer.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const day = btn.getAttribute('data-day');
        renderScheduleCard(day);
      });
    });

    // Set tab to current day on page load
    const now = new Date();
    const daysMap = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];
    const todayKey = daysMap[now.getDay()];
    const todayTab = scheduleTabsContainer.querySelector(`[data-day="${todayKey}"]`);
    if (todayTab) {
      todayTab.click();
    } else {
      renderScheduleCard('lun');
    }
  }

  /* ==========================================================================
     4. DATA-DRIVEN INTERACTIVE MENU
     ========================================================================== */
  const menuData = [
    {
      id: 'campero-clasico',
      name: 'El Campero Clásico',
      price: '7.80€',
      category: 'clasicos',
      description: 'El campero tradicional de Málaga. Pan de mollete redondo tostado e ingredientes de primera calidad fundidos al grill.',
      image: 'assets/Campero.jpeg',
      hoverImage: 'assets/Campero 2.jpeg',
      allergens: ['G', 'L', 'H'],
      isVegetarian: false,
      tag: 'Más Vendido',
      ingredients: [
        { name: 'Pan Mollete', icon: '🥖' },
        { name: 'Jamón York', icon: '🥓' },
        { name: 'Queso Edam', icon: '🧀' },
        { name: 'Lechuga', icon: '🥬' },
        { name: 'Tomate', icon: '🍅' },
        { name: 'Mayonesa', icon: '🥚' }
      ]
    },
    {
      id: 'patatas-bravas',
      name: 'Patatas Bravas Locas',
      price: '4.80€',
      category: 'tapas-bebidas',
      description: 'Patatas gajo rústicas cortadas a mano, crujientes por fuera y cremosas por dentro, con salsa brava Camperoloco (picante andaluz) y alioli de ajo asado.',
      image: 'assets/patatas bravas.jpeg',
      allergens: ['H'],
      isVegetarian: true,
      tag: 'Acompañante',
      ingredients: [
        { name: 'Patatas Rústicas', icon: '🥔' },
        { name: 'Salsa Brava', icon: '🌶️' },
        { name: 'Alioli Ajo', icon: '🧄' }
      ]
    },
    {
      id: 'datiles-bacon',
      name: 'Dátiles con Bacón',
      price: '5.50€',
      category: 'tapas-bebidas',
      description: 'Dátiles dulces envueltos en crujiente bacón ahumado, una combinación perfecta de dulce y salado.',
      image: 'assets/Datiles.jpeg',
      allergens: [],
      isVegetarian: false,
      tag: 'Tapa',
      ingredients: [
        { name: 'Dátiles', icon: '🌴' },
        { name: 'Bacón Ahumado', icon: '🥓' }
      ]
    },
    {
      id: 'mix-tapas',
      name: 'Mix de Tapas',
      price: '12.00€',
      category: 'tapas-bebidas',
      description: 'Una selección de nuestras mejores tapas para compartir, incluyendo patatas y especialidades de la casa.',
      image: 'assets/Mix.jpeg',
      allergens: ['G', 'L', 'H'],
      isVegetarian: false,
      tag: 'Para Compartir',
      ingredients: [
        { name: 'Surtido Tapas', icon: '🧆' }
      ]
    }
  ];

  const menuGrid = document.getElementById('menu-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderMenuCards(categoryFilter = 'todos') {
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    
    const filteredMenu = categoryFilter === 'todos' 
      ? menuData 
      : menuData.filter(item => item.category === categoryFilter);

    filteredMenu.forEach(item => {
      const veggieBadge = item.isVegetarian ? '<span class="menu-item-badge vegetarian">Veggie</span>' : '';
      const specialBadge = item.tag && !item.isVegetarian ? `<span class="menu-item-badge">${item.tag}</span>` : '';
      const allergenTags = item.allergens.map(a => `<span class="allergen-tag" title="Alérgeno: ${a}">${a}</span>`).join('');

      const card = document.createElement('div');
      card.className = 'menu-item-card';
      card.setAttribute('data-id', item.id);
      
      card.innerHTML = `
        <div class="menu-item-image">
          <img src="${item.image}" alt="${item.name}" class="menu-item-img ${item.hoverImage ? 'has-hover' : ''}">
          ${item.hoverImage ? `<img src="${item.hoverImage}" alt="${item.name} Hover" class="menu-item-img-hover">` : ''}
          ${veggieBadge}
          ${specialBadge}
        </div>
        <div class="menu-item-content">
          <div class="menu-item-header">
            <h3 class="menu-item-title">${item.name}</h3>
            <span class="menu-item-price">${item.price}</span>
          </div>
          <p class="menu-item-desc">${item.description}</p>
          <div class="menu-item-footer">
            <div class="allergens-list">
              ${allergenTags}
            </div>
            <button class="btn-details" data-item-id="${item.id}">Ver Ingredientes</button>
          </div>
        </div>
      `;
      
      menuGrid.appendChild(card);
    });

    // Add click listeners to "Ver Ingredientes" buttons
    const detailBtns = menuGrid.querySelectorAll('.btn-details');
    detailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const itemId = btn.getAttribute('data-item-id');
        openFoodModal(itemId);
      });
    });

    // Make whole card clickable for details
    const cards = menuGrid.querySelectorAll('.menu-item-card');
    cards.forEach(c => {
      c.addEventListener('click', () => {
        const itemId = c.getAttribute('data-id');
        openFoodModal(itemId);
      });
    });
  }

  // Hook filters click
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderMenuCards(cat);
    });
  });

  // Run initial render
  renderMenuCards('todos');

  /* ==========================================================================
     5. FOOD CUSTOMIZER / DETAILS MODAL
     ========================================================================== */
  const foodModal = document.getElementById('food-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalBodyGrid = document.getElementById('modal-body-grid');

  function openFoodModal(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item || !foodModal || !modalBodyGrid) return;

    const ingredientsHTML = item.ingredients.map(ing => `
      <div class="ingredient-bullet">
        <span class="ingredient-bullet-icon">${ing.icon}</span>
        <span>${ing.name}</span>
      </div>
    `).join('');

    const veggieLabel = item.isVegetarian ? '<span style="color: var(--color-success); font-weight: 700;">[Apto para Vegetarianos]</span>' : '';

    modalBodyGrid.innerHTML = `
      <div class="modal-image-side">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="modal-text-side">
        <h3 class="modal-title">${item.name}</h3>
        <div class="modal-price">${item.price}</div>
        <p class="modal-desc">${item.description} ${veggieLabel}</p>
        <div class="ingredients-details">
          <h4>¿Qué lleva? (Ingredientes)</h4>
          <div class="ingredients-list-grid">
            ${ingredientsHTML}
          </div>
        </div>
      </div>
    `;

    foodModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Stop background scroll
  }

  function closeFoodModal() {
    if (!foodModal) return;
    foodModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeFoodModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeFoodModal);
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeFoodModal();
    }
  });

  /* ==========================================================================
     6. MULTI-STEP BOOKING FORM
     ========================================================================== */
  const bookingForm = document.getElementById('booking-form');
  const guestsRange = document.getElementById('booking-guests');
  const guestsVal = document.getElementById('guests-val');
  const formSuccess = document.getElementById('form-success');
  const bookingSummaryBox = document.getElementById('booking-summary-box');
  const resetFormBtn = document.getElementById('btn-reset-form');

  // Guests range slider listener
  if (guestsRange && guestsVal) {
    guestsRange.addEventListener('input', () => {
      guestsVal.textContent = guestsRange.value;
    });
  }

  // Handle Form navigation steps
  const steps = [
    { num: 1, id: 'step-1-content' },
    { num: 2, id: 'step-2-content' },
    { num: 3, id: 'step-3-content' }
  ];

  let currentStepNum = 1;

  function updateStepsVisibility() {
    steps.forEach(step => {
      const stepContent = document.getElementById(step.id);
      const progressStep = document.querySelector(`.progress-step[data-step="${step.num}"]`);
      
      if (step.num === currentStepNum) {
        stepContent.classList.add('active');
        progressStep.classList.add('active');
        progressStep.classList.remove('completed');
      } else if (step.num < currentStepNum) {
        stepContent.classList.remove('active');
        progressStep.classList.remove('active');
        progressStep.classList.add('completed');
      } else {
        stepContent.classList.remove('active');
        progressStep.classList.remove('active');
        progressStep.classList.remove('completed');
      }
    });
  }

  // Field validations
  function validateField(inputEl, errorEl) {
    let isValid = true;
    const parent = inputEl.closest('.input-group');

    if (inputEl.hasAttribute('required')) {
      if (inputEl.value.trim() === '') {
        isValid = false;
      }
    }

    if (isValid && inputEl.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputEl.value.trim())) {
        isValid = false;
      }
    }

    if (!isValid) {
      parent.classList.add('error');
    } else {
      parent.classList.remove('error');
    }

    return isValid;
  }

  // Validate all fields inside active step
  function validateCurrentStep() {
    let stepIsValid = true;
    
    if (currentStepNum === 1) {
      const name = document.getElementById('booking-name');
      const email = document.getElementById('booking-email');
      const phone = document.getElementById('booking-phone');
      
      const v1 = validateField(name);
      const v2 = validateField(email);
      const v3 = validateField(phone);
      
      stepIsValid = v1 && v2 && v3;
    } else if (currentStepNum === 2) {
      const date = document.getElementById('booking-date');
      const type = document.getElementById('booking-type');
      const location = document.getElementById('booking-location');
      
      const v1 = validateField(date);
      const v2 = validateField(type);
      const v3 = validateField(location);
      
      stepIsValid = v1 && v2 && v3;
    }

    return stepIsValid;
  }

  // Event Listeners for NEXT buttons
  document.getElementById('btn-to-step-2').addEventListener('click', () => {
    if (validateCurrentStep()) {
      currentStepNum = 2;
      updateStepsVisibility();
    }
  });

  document.getElementById('btn-to-step-3').addEventListener('click', () => {
    if (validateCurrentStep()) {
      currentStepNum = 3;
      updateStepsVisibility();
    }
  });

  // Event Listeners for PREV buttons
  document.getElementById('btn-back-to-step-1').addEventListener('click', () => {
    currentStepNum = 1;
    updateStepsVisibility();
  });

  document.getElementById('btn-back-to-step-2').addEventListener('click', () => {
    currentStepNum = 2;
    updateStepsVisibility();
  });

  // Real-time error removal when typing
  const inputsToWatch = bookingForm.querySelectorAll('input, select, textarea');
  inputsToWatch.forEach(input => {
    input.addEventListener('input', () => {
      const parent = input.closest('.input-group');
      if (parent) parent.classList.remove('error');
    });
    input.addEventListener('change', () => {
      const parent = input.closest('.input-group');
      if (parent) parent.classList.remove('error');
    });
  });

  // Form Submit Handler
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateCurrentStep()) {
      // Collect values
      const name = document.getElementById('booking-name').value;
      const email = document.getElementById('booking-email').value;
      const phone = document.getElementById('booking-phone').value;
      const date = document.getElementById('booking-date').value;
      const typeEl = document.getElementById('booking-type');
      const typeText = typeEl.options[typeEl.selectedIndex].text;
      const guests = document.getElementById('booking-guests').value;
      const location = document.getElementById('booking-location').value;
      const message = document.getElementById('booking-message').value || 'Ninguna especificada.';

      // Format date nicely
      const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });

      // Populate Recap Summary box
      bookingSummaryBox.innerHTML = `
        <div class="summary-title">Resumen de tu Solicitud</div>
        <div class="summary-item"><span>Contacto:</span> <span>${name}</span></div>
        <div class="summary-item"><span>Email:</span> <span>${email}</span></div>
        <div class="summary-item"><span>Teléfono:</span> <span>${phone}</span></div>
        <div class="summary-item"><span>Evento:</span> <span>${typeText}</span></div>
        <div class="summary-item"><span>Fecha:</span> <span>${formattedDate}</span></div>
        <div class="summary-item"><span>Invitados:</span> <span>${guests} personas</span></div>
        <div class="summary-item"><span>Ubicación:</span> <span>${location}</span></div>
      `;

      // Log results to console (simulating save to CRM)
      console.log('--- NUEVA RESERVA DE CATERING REGISTRADA (CAMPEROLOCO CRM) ---');
      console.log({ name, email, phone, date, eventType: typeText, guests, location, message });

      // Hide form steps progress & form itself
      document.querySelector('.form-progress').style.display = 'none';
      bookingForm.style.display = 'none';
      
      // Show Success screen
      formSuccess.classList.add('active');
    }
  });

  // Form Reset Handler
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      bookingForm.reset();
      guestsVal.textContent = '150';
      
      // Reset steps
      currentStepNum = 1;
      updateStepsVisibility();
      
      // Display form elements
      document.querySelector('.form-progress').style.display = 'flex';
      bookingForm.style.display = 'block';
      
      // Hide Success screen
      formSuccess.classList.remove('active');
    });
  }

  /* ==========================================================================
     7. TESTIMONIALS SLIDER
     ========================================================================== */
  const slider = document.getElementById('testimonials-slider');
  const prevBtn = document.getElementById('prev-review');
  const nextBtn = document.getElementById('next-review');
  const dotsContainer = document.getElementById('slider-dots');
  
  if (slider && prevBtn && nextBtn && dotsContainer) {
    const cards = slider.querySelectorAll('.testimonial-card');
    const dots = dotsContainer.querySelectorAll('.dot');
    let currentIndex = 0;
    const totalCards = cards.length;

    function updateSliderPosition() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update dots state
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalCards;
      updateSliderPosition();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      updateSliderPosition();
    });

    // Dot click triggers
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.getAttribute('data-index'), 10);
        updateSliderPosition();
      });
    });

    // Auto rotate every 8 seconds
    let autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalCards;
      updateSliderPosition();
    }, 8000);

    // Stop auto-slide when interacting
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateSliderPosition();
      }, 8000);
    }

    nextBtn.addEventListener('click', resetAutoSlide);
    prevBtn.addEventListener('click', resetAutoSlide);
    dots.forEach(d => d.addEventListener('click', resetAutoSlide));
  }

  /* ==========================================================================
     8. NEWSLETTER FORM HANDLER
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');

  if (newsletterForm && newsletterSuccess) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      
      console.log(`--- NUEVA SUSCRIPCIÓN A NEWSLETTER --- Email: ${email}`);
      
      // Transition display
      newsletterForm.style.display = 'none';
      newsletterSuccess.style.display = 'block';
    });
  }

  /* ==========================================================================
     9. LEGAL STATEMENTS MOCK TRIGGER
     ========================================================================== */
  const impressumLink = document.getElementById('impressum-link');
  const datenschutzLink = document.getElementById('datenschutz-link');

  if (impressumLink) {
    impressumLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert(`Camperoloco Berlin Foodtruck GbR\nRepresentada por: Málaga Street Food Team\nContacto: hola@camperoloco.de\nBerlín, Alemania.`);
    });
  }

  if (datenschutzLink) {
    datenschutzLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert(`Política de Privacidad:\nCamperoloco no comparte tus datos de catering ni de contacto con terceros. Las cookies de este sitio son puramente funcionales.`);
    });
  }

});
