document.addEventListener('DOMContentLoaded', () => {

  // --- 1. HEADER SCROLL & BACK-TO-TOP CLASS ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 2. MOBILE MENU TOGGLE ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // --- 3. ACTIVE NAVIGATION LINK TRACKING ---
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // --- 4. TESTIMONIALS SLIDER ---
  const track = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('sliderDots');
  const slides = document.querySelectorAll('.slide');
  
  if (track && slides.length > 0) {
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create Navigation Dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    const updateSlider = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

    const goToSlide = (index) => {
      currentIndex = index;
      updateSlider();
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider();
    };

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto running slider (every 7 seconds)
    let autoPlayInterval = setInterval(nextSlide, 7000);
    
    // Pause auto run on hover/interaction
    const resetAutoplay = () => {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(nextSlide, 7000);
    };

    nextBtn.addEventListener('click', resetAutoplay);
    prevBtn.addEventListener('click', resetAutoplay);
    dots.forEach(d => d.addEventListener('click', resetAutoplay));
  }

  // --- 5. FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-body').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // --- 6. APPOINTMENT BOOKING FORM VALIDATION, CUSTOM CALENDAR & MODAL ---
  const bookingForm = document.getElementById('bookingForm');
  const formMsg = document.getElementById('formMsg');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  // --- CUSTOM INTERACTIVE CALENDAR FOR DATE SELECTION ---
  function initCustomCalendar() {
    const calendarTrigger = document.getElementById('calendarTrigger');
    const calendarTriggerText = document.getElementById('calendarTriggerText');
    const customCalendarCard = document.getElementById('customCalendarCard');
    const calPrevMonth = document.getElementById('calPrevMonth');
    const calNextMonth = document.getElementById('calNextMonth');
    const calMonthYear = document.getElementById('calMonthYear');
    const calDaysGrid = document.getElementById('calDaysGrid');
    const calSlotsWrapper = document.getElementById('calSlotsWrapper');
    const selectedDateBadge = document.getElementById('selectedDateBadge');
    const slotsGrid = document.getElementById('slotsGrid');
    const sundayNotice = document.getElementById('sundayNotice');
    const calTodayBtn = document.getElementById('calTodayBtn');
    const hiddenDateInput = document.getElementById('date');

    if (!calendarTrigger || !customCalendarCard || !calDaysGrid) return;

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let currYear = today.getFullYear();
    let currMonth = today.getMonth();

    let selectedDate = null; // Date object
    let selectedDateStr = ''; // YYYY-MM-DD
    window.__selectedTimeSlot = '';

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    function formatDateFormatted(d) {
      const dayName = dayNames[d.getDay()];
      const dayNum = d.getDate();
      const monthName = monthNames[d.getMonth()].slice(0, 3);
      const year = d.getFullYear();
      return `${dayName}, ${dayNum} ${monthName} ${year}`;
    }

    function formatDateISO(d) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }

    function renderCalendar() {
      calMonthYear.innerText = `${monthNames[currMonth]} ${currYear}`;
      calDaysGrid.innerHTML = '';

      const firstDayIndex = new Date(currYear, currMonth, 1).getDay();
      const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
      const lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();

      // Days from previous month
      for (let i = firstDayIndex; i > 0; i--) {
        const prevDay = lastDateOfPrevMonth - i + 1;
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'cal-day-cell other-month';
        cell.innerText = prevDay;
        calDaysGrid.appendChild(cell);
      }

      // Days of current month
      for (let day = 1; day <= lastDateOfMonth; day++) {
        const cellDate = new Date(currYear, currMonth, day);
        cellDate.setHours(0, 0, 0, 0);

        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'cal-day-cell';
        cell.innerText = day;

        const isPast = cellDate < today;
        const isSunday = cellDate.getDay() === 0;
        const isToday = cellDate.getTime() === today.getTime();
        const isSelected = selectedDate && cellDate.getTime() === selectedDate.getTime();

        if (isPast) {
          cell.classList.add('disabled');
        } else if (isSunday) {
          cell.classList.add('sunday-closed');
        }

        if (isToday) {
          cell.classList.add('today');
        }

        if (isSelected) {
          cell.classList.add('selected');
        }

        cell.addEventListener('click', (e) => {
          e.stopPropagation();

          if (isPast) return;

          if (isSunday) {
            if (sundayNotice) {
              sundayNotice.style.display = 'block';
              setTimeout(() => {
                if (sundayNotice) sundayNotice.style.display = 'none';
              }, 3500);
            }
            return;
          }

          if (sundayNotice) sundayNotice.style.display = 'none';

          selectedDate = cellDate;
          selectedDateStr = formatDateISO(cellDate);
          if (hiddenDateInput) hiddenDateInput.value = selectedDateStr;

          // Re-render grid to update active selection state
          renderCalendar();

          // Show time slots
          const formatted = formatDateFormatted(cellDate);
          if (selectedDateBadge) selectedDateBadge.innerText = formatted;
          if (calSlotsWrapper) calSlotsWrapper.style.display = 'flex';

          updateTriggerLabel(formatted);
        });

        calDaysGrid.appendChild(cell);
      }

      // Fill remaining grid spaces for next month
      const totalCellsSoFar = firstDayIndex + lastDateOfMonth;
      const nextDays = (7 - (totalCellsSoFar % 7)) % 7;
      for (let j = 1; j <= nextDays; j++) {
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'cal-day-cell other-month';
        cell.innerText = j;
        calDaysGrid.appendChild(cell);
      }
    }

    function updateTriggerLabel(formattedDate) {
      const slotText = window.__selectedTimeSlot ? ` (${window.__selectedTimeSlot})` : '';
      calendarTriggerText.className = 'calendar-trigger-text';
      calendarTriggerText.innerHTML = `📅 ${formattedDate}${slotText}`;
    }

    // Prev Month Button
    if (calPrevMonth) {
      calPrevMonth.addEventListener('click', (e) => {
        e.stopPropagation();
        currMonth--;
        if (currMonth < 0) {
          currMonth = 11;
          currYear--;
        }
        renderCalendar();
      });
    }

    // Next Month Button
    if (calNextMonth) {
      calNextMonth.addEventListener('click', (e) => {
        e.stopPropagation();
        currMonth++;
        if (currMonth > 11) {
          currMonth = 0;
          currYear++;
        }
        renderCalendar();
      });
    }

    // Today Quick Selection Button
    if (calTodayBtn) {
      calTodayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currYear = today.getFullYear();
        currMonth = today.getMonth();

        // If today is Sunday, select next day (Monday)
        let targetDate = new Date(today);
        if (targetDate.getDay() === 0) {
          targetDate.setDate(targetDate.getDate() + 1);
        }

        selectedDate = targetDate;
        selectedDateStr = formatDateISO(targetDate);
        if (hiddenDateInput) hiddenDateInput.value = selectedDateStr;

        renderCalendar();

        const formatted = formatDateFormatted(targetDate);
        if (selectedDateBadge) selectedDateBadge.innerText = formatted;
        if (calSlotsWrapper) calSlotsWrapper.style.display = 'flex';

        updateTriggerLabel(formatted);
      });
    }

    // Time Slot Selection (Two-Way Sync with Form Dropdown)
    const timeSlotSelect = document.getElementById('timeSlot');

    if (slotsGrid) {
      const slotChips = slotsGrid.querySelectorAll('.slot-chip');
      slotChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          slotChips.forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');
          const timeVal = chip.getAttribute('data-time');
          window.__selectedTimeSlot = timeVal;
          if (timeSlotSelect) {
            timeSlotSelect.value = timeVal;
          }
          if (selectedDate) {
            updateTriggerLabel(formatDateFormatted(selectedDate));
          }
        });
      });
    }

    if (timeSlotSelect) {
      timeSlotSelect.addEventListener('change', () => {
        const timeVal = timeSlotSelect.value;
        window.__selectedTimeSlot = timeVal;
        if (slotsGrid) {
          const slotChips = slotsGrid.querySelectorAll('.slot-chip');
          slotChips.forEach(c => {
            if (c.getAttribute('data-time') === timeVal) {
              c.classList.add('selected');
            } else {
              c.classList.remove('selected');
            }
          });
        }
        if (selectedDate) {
          updateTriggerLabel(formatDateFormatted(selectedDate));
        }
      });
    }

    // Toggle Calendar Dropdown Card
    function toggleCalendar(show) {
      const isOpen = show !== undefined ? show : !customCalendarCard.classList.contains('open');
      if (isOpen) {
        customCalendarCard.classList.add('open');
        calendarTrigger.classList.add('active');
        calendarTrigger.setAttribute('aria-expanded', 'true');
      } else {
        customCalendarCard.classList.remove('open');
        calendarTrigger.classList.remove('active');
        calendarTrigger.setAttribute('aria-expanded', 'false');
      }
    }

    calendarTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCalendar();
    });

    calendarTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCalendar();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!calendarTrigger.contains(e.target) && !customCalendarCard.contains(e.target)) {
        toggleCalendar(false);
      }
    });

    // Initial render
    renderCalendar();

    // Attach reset listener
    if (bookingForm) {
      bookingForm.addEventListener('reset', () => {
        selectedDate = null;
        selectedDateStr = '';
        window.__selectedTimeSlot = '';
        if (hiddenDateInput) hiddenDateInput.value = '';
        if (timeSlotSelect) timeSlotSelect.selectedIndex = 0;
        calendarTriggerText.className = 'calendar-trigger-placeholder';
        calendarTriggerText.innerText = 'Select Appointment Date';
        if (calSlotsWrapper) calSlotsWrapper.style.display = 'none';
        if (slotsGrid) {
          slotsGrid.querySelectorAll('.slot-chip').forEach(c => c.classList.remove('selected'));
        }
        toggleCalendar(false);
        renderCalendar();
      });
    }
  }

  // Initialize Calendar
  initCustomCalendar();

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const gender = document.getElementById('gender').value;
      const age = document.getElementById('age').value.trim();
      const treatment = document.getElementById('treatment').value;
      const date = document.getElementById('date').value;
      const timeSlotSelect = document.getElementById('timeSlot');
      const timeSlotVal = (timeSlotSelect && timeSlotSelect.value) ? timeSlotSelect.value : (window.__selectedTimeSlot || '');
      const notes = document.getElementById('notes').value.trim();

      // Basic Validation
      if (!date) {
        showFormMessage('Please click to select an appointment date from the calendar.', 'error');
        const trigger = document.getElementById('calendarTrigger');
        if (trigger) {
          trigger.focus();
          trigger.click();
        }
        return;
      }

      if (!timeSlotVal) {
        showFormMessage('Please select a specific appointment time slot.', 'error');
        if (timeSlotSelect) timeSlotSelect.focus();
        return;
      }

      if (!name || !phone || !gender || !age || !treatment) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }
      
      if (phone.length < 10) {
        showFormMessage('Please enter a valid 10-digit phone number.', 'error');
        return;
      }

      // Disable submit button & show saving state
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:8px;">
        <svg style="animation:spin 1s linear infinite" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>Saving Appointment...</span>`;

      // Add spinner keyframe to head if not present
      if (!document.getElementById('spinStyle')) {
        const s = document.createElement('style');
        s.id = 'spinStyle';
        s.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(s);
      }

      // --- Save to Firebase Firestore & Send FCM Notification ---
      const SERVER_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port !== '3000'
        ? 'http://localhost:3000'
        : '';


      try {
        const parts = date.split('-');
        const formattedDateStr = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : date;
        const isMorning = timeSlotVal.includes('AM') || timeSlotVal.startsWith('09') || timeSlotVal.startsWith('10') || timeSlotVal.startsWith('11');
        const sessionName = isMorning ? 'Morning Session (09:30 AM - 01:30 PM)' : 'Evening Session (04:30 PM - 08:30 PM)';

        if (window.__firebase) {
          const { db, collection, addDoc, serverTimestamp } = window.__firebase;
          await addDoc(collection(db, 'appointments'), {
            name,
            phone,
            gender,
            age,
            treatment,
            date: formattedDateStr,                                     // Date field e.g. "12/08/2026"
            time: timeSlotVal,                                          // Dedicated specific timing e.g. "11:00 AM"
            session: sessionName,                                       // Session name
            appointmentDateTime: `${formattedDateStr} at ${timeSlotVal}`, // Combined datetime
            notes: notes || '',
            status: 'pending',
            createdAt: serverTimestamp()
          });
        }

        // Send FCM Push Notification via server
        fetch(SERVER_URL + '/send-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            patientName: name, 
            gender, 
            age, 
            treatment, 
            date: formattedDateStr,
            time: timeSlotVal,
            session: sessionName
          })
        }).then(function(res) { return res.json(); })
          .then(function(data) { console.log('FCM sent:', data); })
          .catch(function(err) { console.error('FCM error:', err); });

        // Populate Success Modal Details
        document.getElementById('mName').innerText = name;
        document.getElementById('mGenderAge').innerText = gender + ' / ' + age;
        document.getElementById('mTreatment').innerText = treatment;
        document.getElementById('mDate').innerText = formattedDateStr;
        const mTimeElem = document.getElementById('mTime');
        if (mTimeElem) {
          mTimeElem.innerText = `${timeSlotVal} (${isMorning ? 'Morning' : 'Evening'})`;
        }

        // Show Success Modal
        successModal.classList.add('active');
        
        // Reset Form & Messages
        bookingForm.reset();
        formMsg.style.display = 'none';

      } catch (err) {
        console.error('Firebase save error:', err);
        showFormMessage('⚠️ Booking could not be saved. Please try again or call us directly.', 'error');
      } finally {
        // Restore submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });

    if (closeModalBtn && successModal) {
      closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
      });
      
      // Close modal on clicking backdrop
      successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
          successModal.classList.remove('active');
        }
      });
    }
  }

  function showFormMessage(msg, type) {
    formMsg.innerText = msg;
    formMsg.className = `form-message ${type}`;
    formMsg.style.display = 'block';
    
    // Auto scroll to message
    formMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // --- 7. GSAP SCROLL AND JUMPING ANIMATIONS ---
  // Ensure GSAP and ScrollTrigger are loaded before initializing animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Dynamic stats counter function
    const animateCounters = () => {
      const stats = document.querySelectorAll('.stat-num');
      stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-val'));
        const obj = { value: 0 };
        
        gsap.to(obj, {
          value: target,
          duration: 2.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-bar',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          onUpdate: () => {
            if (target === 5000) {
              stat.innerText = Math.floor(obj.value) + '+';
            } else if (target === 10 || target === 15) {
              stat.innerText = Math.floor(obj.value) + '+';
            } else if (target === 99) {
              stat.innerText = Math.floor(obj.value) + '%';
            } else {
              stat.innerText = Math.floor(obj.value);
            }
          }
        });
      });
    };
    animateCounters();

    // Hero Section Animations
    const heroTl = gsap.timeline();
    heroTl.from('.hero-badge', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
    .from('.hero-title', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-desc', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-buttons', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-image-wrapper', {
      scale: 0.85,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.2)'
    }, '-=1')
    .from('.h-card-1', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.5)'
    }, '-=0.6')
    .from('.h-card-2', {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.5)'
    }, '-=0.8')
    .from('.scroll-indicator', {
      y: -20,
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power1.inOut'
    }, '-=0.2');

    // Services Cards Scroll Trigger disabled for debugging
    /* gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '#services',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }); */

    // About Us Left-Right slide trigger
    gsap.from('.about-img-container', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 85%',
        once: true
      },
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      clearProps: 'all'
    });

    gsap.from('.about-experience-badge', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        once: true
      },
      scale: 0,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'back.out(2)',
      clearProps: 'all'
    });

    gsap.from('.about-info-content > *', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 85%',
        once: true
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    });

    // Testimonials Card trigger
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '#testimonials',
        start: 'top 85%',
        once: true
      },
      scale: 0.95,
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      clearProps: 'all'
    });

    // Contact Section triggers
    gsap.from('.booking-form-wrapper', {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 85%',
        once: true
      },
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all'
    });

    gsap.from('.info-card', {
      scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 85%',
        once: true
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      clearProps: 'all'
    });

    // FAQ Section trigger
    gsap.from('.faq-item', {
      scrollTrigger: {
        trigger: '#faq',
        start: 'top 85%',
        once: true
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    });

    // Refresh GSAP ScrollTrigger after images and iframe load
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });

    // Interactive mouse glow follower
    const mouseGlow = document.getElementById('mouseGlow');
    if (mouseGlow) {
      // Start in the center of the screen
      gsap.set(mouseGlow, { x: window.innerWidth / 2, y: window.innerHeight / 2 });

      window.addEventListener('mousemove', (e) => {
        gsap.to(mouseGlow, {
          x: e.clientX,
          y: e.clientY,
          duration: 1.5,
          ease: 'power2.out'
        });
      });
    }
// Theme toggle logic
const themeBtn = document.getElementById('themeToggleBtn');
if (themeBtn) {
  // Determine initial theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isLight = savedTheme ? savedTheme === 'light' : !prefersDark;
  if (isLight) {
    document.body.classList.add('light-theme');
  }
  // Click handler to toggle theme
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const nowLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', nowLight ? 'light' : 'dark');
  });
}

  } else {
    // Fallback counter if GSAP is not available
    const animateFallbacks = () => {
      const stats = document.querySelectorAll('.stat-num');
      stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-val'));
        let current = 0;
        const increment = target / 50;
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            clearInterval(interval);
            if (target === 5000 || target === 10 || target === 15) {
              stat.innerText = target + '+';
            } else if (target === 99) {
              stat.innerText = target + '%';
            } else {
              stat.innerText = target;
            }
          } else {
            stat.innerText = Math.floor(current);
          }
        }, 30);
      });
    };

    // Trigger standard fallback counters with intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateFallbacks();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) observer.observe(statsBar);
  }

});
