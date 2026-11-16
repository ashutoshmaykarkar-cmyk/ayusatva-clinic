(() => {
  'use strict';
  const config = window.SITE_CONFIG || {};
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  // Only populate fields with data that the website owner has actually verified.
  $$('[data-config]').forEach((el) => {
    const key = el.dataset.config;
    const value = config[key];
    if (typeof value === 'string' && value.trim() && !value.includes('[')) {
      if (key === 'phone') {
        el.innerHTML = `<a href="tel:${value.replace(/\s+/g, '')}" style="color:inherit;text-decoration:none;">${value}</a>`;
      } else if (key === 'email') {
        el.innerHTML = `<a href="mailto:${value}" style="color:inherit;text-decoration:none;">${value}</a>`;
      } else if (key === 'hours') {
        el.innerHTML = value.replace(' | ', '<br/>');
      } else {
        el.textContent = value;
      }
    }
  });
  $('#year').textContent = new Date().getFullYear();

  const menuButton = $('#menu-toggle');
  const mobileMenu = $('#mobile-menu');
  function closeMenu() {
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
  }
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    mobileMenu.hidden = isOpen;
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  });
  $$('a', mobileMenu).forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !mobileMenu.hidden) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1350 && !mobileMenu.hidden) closeMenu();
  });

  // Keep the selected navigation item useful for keyboard and screen reader users.
  if ('IntersectionObserver' in window) {
    const anchors = $$('.desktop-nav a');
    const sectionTargets = anchors.map((link) => $(link.getAttribute('href'))).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.filter(e => e.isIntersecting).forEach(entry => {
        anchors.forEach(link => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    sectionTargets.forEach((section) => observer.observe(section));
  }

  // Build structured data without invented address, awards or professional credentials.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    'name': config.clinicName || 'Ayusatva Ayurved & Panchkarma Clinic',
    'description': 'Ayurvedic consultations, classical Panchakarma education and lifestyle guidance.',
    'medicalSpecialty': 'Ayurveda'
  };
  if (config.websiteUrl && /^https:\/\//.test(config.websiteUrl)) schema.url = config.websiteUrl;
  if (config.phone && !config.phone.includes('[')) schema.telephone = config.phone;
  if (config.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) schema.email = config.email;
  if (config.address && !config.address.includes('[')) schema.address = { '@type': 'PostalAddress', 'streetAddress': config.address };
  const schemaTag = document.createElement('script');
  schemaTag.type = 'application/ld+json';
  schemaTag.textContent = JSON.stringify(schema);
  document.head.appendChild(schemaTag);

  const articles = {
    dinacharya: {
      tag: 'LIFESTYLE / AYURVEDIC LIVING',
      title: 'Dinacharya: finding a rhythm in your day',
      body: `<p>In classical Ayurveda, <em>Dinacharya</em> refers to a daily routine. Its underlying idea is simple: everyday patterns deserve attention when thinking about how we live and feel.</p>
      <h3>Begin with what is sustainable</h3>
      <p>A realistic routine need not be elaborate. Making time for meals, adequate sleep, personal hygiene and gentle movement can help create a more predictable day. The right approach depends on age, occupation, climate, health and personal needs.</p>
      <h3>Routine is not rigidity</h3>
      <p>Traditional texts describe specific practices, but not every recommendation is suitable for every person. For example, fasting, herbal preparations or vigorous cleansing techniques should not be adopted merely because they appear in a wellness trend.</p>
      <h3>Make it individual</h3>
      <p>Discuss significant dietary or lifestyle changes with a qualified healthcare professional if you are pregnant, have a medical condition, or take regular medication.</p>
      <p class="article-note">Educational reading only. It is not a personalised treatment plan or a substitute for medical advice.</p>`
    },
    prakriti: {
      tag: 'CLASSICAL CONCEPTS / AYURVEDIC THEORY',
      title: 'Prakriti: the language of individuality',
      body: `<p><em>Prakriti</em> is a classical Ayurvedic term describing an individual's constitutional characteristics. It is traditionally discussed in relation to the doshas—Vata, Pitta and Kapha.</p>
      <h3>More than an online quiz</h3>
      <p>Ayurvedic assessment is contextual. It considers a person's history, patterns and circumstances rather than relying on a single short questionnaire. Online “dosha tests” should not be treated as diagnostic medical tools.</p>
      <h3>What the concept can offer</h3>
      <p>Prakriti can provide a starting point for a conversation about habits and individual differences within Ayurveda. It is not a replacement for a clinical diagnosis, investigations or evidence-based treatment where required.</p>
      <h3>A balanced view</h3>
      <p>The classical framework is historically important, while evidence supporting particular modern health claims based on dosha classifications varies. A responsible consultation makes that distinction clear.</p>
      <p class="article-note">Educational reading only. Seek medical evaluation for persistent or concerning symptoms.</p>`
    },
    panchakarma: {
      tag: 'PANCHAKARMA / PATIENT EDUCATION',
      title: 'Panchakarma: beyond the wellness trend',
      body: `<p>Panchakarma is frequently used in wellness advertising, sometimes as a synonym for massage or “detox.” Classical Ayurveda describes something more specific: a sequence of therapeutic procedures with preparatory and follow-up phases.</p>
      <h3>Not all oil therapies are Panchakarma</h3>
      <p>Abhyanga and Shirodhara may be associated with Ayurvedic care, but they do not individually constitute the classical five Panchakarma procedures. Those have particular indications and methods.</p>
      <h3>Assessment comes first</h3>
      <p>Classical descriptions include Vamana, Virechana, Basti and Nasya, with differences among schools regarding the fifth classification. These methods can involve clinically significant risks and require trained professional supervision.</p>
      <h3>Ask informed questions</h3>
      <p>Before any procedure, discuss why it is proposed, potential benefits and harms, alternatives, contraindications, expected follow-up and how complications would be handled. Avoid unverified claims that a treatment cures all diseases or removes vaguely defined “toxins.”</p>
      <p class="article-note">Reference: Central Ayurveda Research Institute, Government of India — <a href="https://www.cari.gov.in/about-ayurveda" target="_blank" rel="noopener noreferrer">About Ayurveda ↗</a>. Educational reading only.</p>`
    }
  };
  const articleDialog = $('#article-dialog');
  const articleBody = $('#dialog-body');
  $$('[data-article]').forEach(btn => btn.addEventListener('click', () => {
    const article = articles[btn.dataset.article];
    if (!article) return;
    articleBody.innerHTML = `<div class="article-kicker">${article.tag}</div><h2 id="article-dialog-title">${article.title}</h2>${article.body}`;
    articleDialog.showModal();
  }));
  $('#close-article').addEventListener('click', () => articleDialog.close());
  articleDialog.addEventListener('click', e => { if (e.target === articleDialog) articleDialog.close(); });

  // Optional appointment form handler (if present)
  const form = $('#appointment-form');
  if (form) {
    const dateInput = $('#preferred-date');
    const feedback = $('#form-feedback');
    const requestDialog = $('#request-dialog');
    const requestPreview = $('#request-preview');
    const requestStatus = $('#request-status');
    const copyStatus = $('#copy-status');
    const pad = n => String(n).padStart(2, '0');
    const today = new Date();
    if (dateInput) dateInput.min = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
    const safe = value => String(value ?? '').trim();
    let pendingRequestText = '';

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!feedback) return;
      feedback.textContent = '';
      const name = safe($('#full-name')?.value);
      const phone = safe($('#phone')?.value);
      const mode = safe($('#consultation-mode')?.value);
      const service = safe($('#service')?.value);
      const date = safe(dateInput?.value);
      const time = safe($('#preferred-time')?.value);
      const note = safe($('#note')?.value);
      const consent = $('#consent')?.checked;
      if (name.length < 2) return showError('Please enter your full name.', $('#full-name'));
      if (!/^[+\d()\-\s]{7,20}$/.test(phone) || (phone.match(/\d/g)||[]).length < 7) return showError('Please enter a valid contact number.', $('#phone'));
      if (!mode) return showError('Please choose your consultation preference.', $('#consultation-mode'));
      if (!date || (dateInput && date < dateInput.min)) return showError('Please choose a date from today onward.', dateInput);
      if (!consent) return showError('Please acknowledge the notice.', $('#consent'));
      const lines = [
        `Inquiry — ${config.clinicName || 'Ayusatva Ayurved & Panchkarma Clinic'}`,
        `Doctor: ${config.doctorName || 'Dr. Vaishnavi Maykarkar (Warghane)'}`,
        `Name: ${name}`,
        `Contact: ${phone}`,
        `Preference: ${mode}`,
        `Interested in: ${service}`,
        `Requested date: ${date}`,
        `Preferred time: ${time}`
      ];
      if (note) lines.push(`Note: ${note}`);
      lines.push('', 'Inquiry sent via Ayusatva website.');
      pendingRequestText = lines.join('\n');
      if (requestPreview) requestPreview.textContent = pendingRequestText;
      if (copyStatus) copyStatus.textContent = '';
      const whatsApp = safe(config.whatsappNumber).replace(/\D/g, '');
      const email = safe(config.email);
      if (whatsApp.length >= 10) {
        if (requestStatus) requestStatus.textContent = 'A pre-filled WhatsApp message is ready.';
        requestDialog?.showModal();
        window.open(`https://wa.me/${whatsApp}?text=${encodeURIComponent(pendingRequestText)}`, '_blank', 'noopener,noreferrer');
      } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (requestStatus) requestStatus.textContent = 'An email draft is opening.';
        requestDialog?.showModal();
        const subject = encodeURIComponent(`Inquiry — ${name}`);
        window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(pendingRequestText)}`;
      }
    });
    function showError(message, field) {
      if (feedback) feedback.textContent = message;
      field?.focus();
    }
    $('#close-request')?.addEventListener('click', () => requestDialog?.close());
    $('#request-dismiss')?.addEventListener('click', () => requestDialog?.close());
    requestDialog?.addEventListener('click', e => { if (e.target === requestDialog) requestDialog.close(); });
  }
})();


// Therapy filter + spotlight interactions
(() => {
  const filterButtons = Array.from(document.querySelectorAll('.therapy-filter-btn'));
  const therapyCards = Array.from(document.querySelectorAll('[data-therapy-card]'));
  const spotlightTabs = Array.from(document.querySelectorAll('.spotlight-tab'));
  const spotlightButtons = Array.from(document.querySelectorAll('[data-spotlight-target]'));
  const spotlightData = {
    'vamana': {title:'Vamana', tag:'PANCHAKARMA', image:'assets/therapy-vamana.webp', alt:'AI-generated conceptual image for Vamana', summary:'A classical category of medically supervised therapeutic emesis, with significant contraindications.', use:'Understanding classical supervised protocols', note:'Aspiration and dehydration are potentially serious risks.', points:['Never induce vomiting at home.', 'Requires trained clinical supervision and screening.', 'It is not a routine wellness treatment.']},

    'virechana': {title:'Virechana', tag:'PANCHAKARMA', image:'assets/therapy-virechana.webp', alt:'AI-generated conceptual image for Virechana', summary:'A classical category of supervised therapeutic purgation with preparatory and recovery phases.', use:'Explaining a classical Panchakarma procedure', note:'Can cause dehydration and electrolyte changes.', points:['Not a general detox or self-administered laxative.', 'Medical eligibility must be confirmed.', 'Monitoring and aftercare are essential.']},

    'netra-tarpana': {title:'Netra Tarpana', tag:'EYE CARE TRADITION', image:'assets/therapy-netra-tarpana.webp', alt:'AI-generated conceptual image for Netra Tarpana', summary:'A specialized classical eye-region procedure requiring trained supervision and stringent hygiene.', use:'Understanding traditional eye-related care', note:'Eye pain, redness or vision changes need ophthalmic evaluation.', points:['Do not attempt eye procedures at home.', 'Do not replace prescribed ophthalmic treatment.', 'A qualified professional must assess suitability.']},

    'greeva-basti': {title:'Greeva Basti', tag:'LOCALIZED CARE', image:'assets/therapy-greeva-basti.webp', alt:'AI-generated conceptual image for Greeva Basti', summary:'Warm oil retention over the neck area, discussed as a localized external Ayurvedic practice.', use:'Neck comfort and routine discussions', note:'Temperature, positioning and clinical screening are essential.', points:['Not an internal Basti or a proven treatment for spine disease.', 'Seek assessment for progressive symptoms.', 'The clinic must confirm local service availability.']},

    'shirodhara': {title:'Shirodhara', tag:'HEAD & SENSES', image:'assets/therapy-shirodhara.webp', alt:'Shirodhara therapy photo', summary:'A carefully delivered stream used in selected therapy plans to create a deeply calming therapeutic environment.', use:'Relaxation-focused protocols, restorative care discussions', note:'Suitability depends on constitution, tolerance and clinical goals.', points:['Requires a planned setting and a suitable medium.','Often combined with preparatory and follow-up steps.','Not positioned as a one-size-fits-all therapy.']},
    'abhyanga': {title:'Abhyanga', tag:'BODY THERAPY', image:'assets/therapy-abhyanga.webp', alt:'Abhyanga therapy photo', summary:'Warm oil application used within classical external therapy plans after considering body type, comfort and purpose.', use:'Dryness, stiffness, general soothing external care', note:'Oils, pressure and session style are individualized.', points:['May precede Swedana or other external therapies.','Pressure and timing are adapted to the person.','Usually paired with diet and routine guidance.']},
    'nasya': {title:'Nasya', tag:'HEAD & SENSES', image:'assets/therapy-nasya.webp', alt:'Nasya therapy photo', summary:'Classical nasal therapy under supervision, usually chosen after understanding timing, tolerance and the therapeutic aim.', use:'Head-neck focused traditional care discussions', note:'Requires correct timing, preparation and aftercare.', points:['Usually not advised casually without assessment.','Media and dosage vary by context.','Aftercare instructions are an important part of the therapy.']},
    'kati-basti': {title:'Kati Basti', tag:'LOCALIZED CARE', image:'assets/therapy-kati-basti.webp', alt:'Kati Basti therapy photo', summary:'Localized warm oil retention over the lower back in selected external therapy plans.', use:'Comfort-oriented lower-back support discussions', note:'Often one part of a broader musculoskeletal care plan.', points:['External therapy selected after clinical discussion.','May be paired with massage, steam or exercises.','Session duration and repetition are individualized.']},
    'basti': {title:'Basti', tag:'PANCHAKARMA / CLEANSING', image:'assets/therapy-basti.webp', alt:'Basti therapy photo', summary:'One of the principal classical Panchakarma categories, involving medicated enemas under professional supervision.', use:'Selected Panchakarma pathways after full assessment', note:'This is a clinical procedure category, not a generic home remedy.', points:['Different types are chosen for different therapeutic goals.','Preparation, sequence and observation matter.','Requires professional judgment and monitoring.']},
    'swedana': {title:'Swedana', tag:'BODY THERAPY', image:'assets/therapy-swedana.webp', alt:'Swedana therapy photo', summary:'Therapeutic fomentation or steam used to support comfort and preparatory care in selected plans.', use:'Supportive external therapy plans', note:'Heat intensity should match the person and the purpose.', points:['Commonly paired with oil-based external care.','Can be localized or full-body depending on the plan.','Should be planned carefully in heat-sensitive individuals.']},
    'udvartana': {title:'Udvartana', tag:'BODY THERAPY', image:'assets/therapy-udvartana.webp', alt:'Udvartana therapy photo', summary:'A herbal powder massage traditionally used in stimulating external body-care protocols.', use:'Stimulating external therapy discussions', note:'Texture and friction level need to suit the person.', points:['May be selected for body-care and routine plans.','Herbal choice and pressure level differ by context.','Commonly discussed alongside food and lifestyle review.']},
    'janu-basti': {title:'Janu Basti', tag:'LOCALIZED CARE', image:'assets/therapy-janu-basti.webp', alt:'Janu Basti therapy photo', summary:'Localized external therapy around the knee region, used in selected comfort-oriented care plans.', use:'Knee comfort and movement-support discussions', note:'Usually part of a broader activity and therapy plan.', points:['May be combined with external oils and fomentation.','Selected after understanding mobility concerns.','Often paired with supportive home-care advice.']}
  };

  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    const key = btn.dataset.filter || 'all';
    filterButtons.forEach(b => {const active = b === btn; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active));});
    therapyCards.forEach(card => {
      const cats = (card.dataset.category || '').split(/\s+/).filter(Boolean);
      const show = key === 'all' || cats.includes(key);
      card.classList.toggle('is-hidden', !show);
    });
  }));

  const image = document.getElementById('spotlight-image');
  const tag = document.getElementById('spotlight-tag');
  const title = document.getElementById('spotlight-title');
  const summary = document.getElementById('spotlight-summary');
  const use = document.getElementById('spotlight-use');
  const note = document.getElementById('spotlight-note');
  const points = document.getElementById('spotlight-points');
  const detailLink = document.getElementById('spotlight-detail-link');
  function setSpotlight(key){
    const data = spotlightData[key];
    if(!data || !image) return;
    spotlightTabs.forEach(tab => {const active = tab.dataset.spotlight === key; tab.classList.toggle('active', active); tab.setAttribute('aria-pressed', String(active));});
    image.src = data.image; image.alt = data.alt; tag.textContent = data.tag; title.textContent = data.title; summary.textContent = data.summary; use.textContent = data.use; note.textContent = data.note;
    points.replaceChildren(...data.points.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
    if (detailLink) detailLink.href = `therapies/${key}.html`;

  }
  spotlightTabs.forEach(tab => tab.addEventListener('click', () => setSpotlight(tab.dataset.spotlight)));
  spotlightButtons.forEach(btn => btn.addEventListener('click', () => { setSpotlight(btn.dataset.spotlightTarget); document.querySelector('.therapy-spotlight')?.scrollIntoView({behavior:'smooth',block:'start'}); }));
})();
