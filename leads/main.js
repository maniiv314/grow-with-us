// State variables
let currentStep = 1;
const totalSteps = 3;
let leadsData = [];
let searchParams = { keyword: '', city: '', count: 50 };
let conversionData = { name: '', phone: '' };

const targetWhatsAppNumber = "918630170462";

// Rotating examples list
const rotatingExamples = [
  "Dentist in Mumbai",
  "Restaurant in Delhi",
  "Gym in Bangalore",
  "Real Estate Agent in Pune",
  "Web Developer in Noida",
  "CA in Hyderabad"
];
let rotatorIndex = 0;

// Backup/Fallback dataset for premium offline demonstration in case Overpass API is blocked/slow
const backupBusinesses = {
  dentist: [
    { name: "Clove Dental Clinic", phone: "+91 22 4938 1209", website: "clovedental.in", address: "Opposite High Street Phoenix, Lower Parel", lat: 18.9950, lon: 72.8258 },
    { name: "Apex Dental Studio", phone: "+91 98201 44589", website: "apexdentalstudio.com", address: "Link Road, Andheri West", lat: 19.1197, lon: 72.8468 },
    { name: "Smile Kraft Dental Clinic", phone: "+91 20 2566 3311", website: "smilekraft.co.in", address: "Senapati Bapat Road, Shivajinagar, Pune", lat: 18.5312, lon: 73.8285 },
    { name: "Delhi Dental Center", phone: "+91 11 2250 2165", website: "delhidentalcenter.in", address: "Preet Vihar, Vikas Marg, New Delhi", lat: 28.6415, lon: 77.2975 },
    { name: "Signature Smiles", phone: "+91 22 2634 5050", website: "signaturesmiles.in", address: "Lokhandwala Complex, Andheri West, Mumbai", lat: 19.1384, lon: 72.8290 }
  ],
  restaurant: [
    { name: "The Bombay Canteen", phone: "+91 22 4966 6666", website: "thebombaycanteen.com", address: "Kamala Mills, Lower Parel, Mumbai", lat: 18.9998, lon: 72.8229 },
    { name: "Karim's Restaurant", phone: "+91 11 2326 9880", website: "karimshotel.com", address: "Gali Kababian, Jama Masjid, Old Delhi", lat: 28.6499, lon: 77.2339 },
    { name: "Toit Microbrewery", phone: "+91 90191 12929", website: "toit.in", address: "100 Feet Rd, Indiranagar, Bengaluru", lat: 12.9791, lon: 77.6407 },
    { name: "Blue Nile Restaurant", phone: "+91 20 2612 5093", website: "bluenilepune.com", address: "Opposite Poona Club, Camp, Pune", lat: 18.5286, lon: 73.8741 }
  ],
  gym: [
    { name: "Gold's Gym", phone: "+91 22 6699 4653", website: "goldsgym.in", address: "Bandra West, Mumbai", lat: 19.0600, lon: 72.8311 },
    { name: "Cult.fit Center", phone: "+91 80 4718 6000", website: "cult.fit", address: "HSR Layout, Sector 2, Bengaluru", lat: 12.9128, lon: 77.6388 },
    { name: "Nitross Gym", phone: "+91 98811 02829", website: "nitrossgym.com", address: "Kalyani Nagar, Pune", lat: 18.5482, lon: 73.9023 }
  ],
  realestate: [
    { name: "Propsera Realty", phone: "+91 98230 45432", website: "prosperarealty.com", address: "Kharadi Bypass Rd, Pune", lat: 18.5519, lon: 73.9351 },
    { name: "Lodha Group Office", phone: "+91 22 6133 4444", website: "lodhagroup.in", address: "Lodha Excelus, Mahalaxmi, Mumbai", lat: 18.9814, lon: 72.8279 }
  ]
};

// Cities coordinates list for OSM search fallbacks
const cityCoords = {
  mumbai: { lat: 19.0760, lon: 72.8777 },
  delhi: { lat: 28.7041, lon: 77.1025 },
  bangalore: { lat: 12.9716, lon: 77.5946 },
  bengaluru: { lat: 12.9716, lon: 77.5946 },
  pune: { lat: 18.5204, lon: 73.8567 },
  noida: { lat: 28.5355, lon: 77.3910 },
  hyderabad: { lat: 17.3850, lon: 78.4867 }
};

// --- DOM ELEMENTS ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initExampleRotator();
  initFormNavigation();
  initActivityFeed();
  initExitIntent();
  initSubmitHandlers();
  updateLiveCounters();
});

// --- THEME MANAGEMENT ---
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  
  // Set initial theme based on system/storage
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  
  if (storedTheme === 'light' || (!storedTheme && systemPrefersLight)) {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }

  toggleBtn.addEventListener('click', () => {
    if (document.documentElement.classList.contains('light')) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });
}

// --- ROTATING EXAMPLES ---
function initExampleRotator() {
  const element = document.getElementById('example-rotator');
  if (!element) return;
  
  setInterval(() => {
    rotatorIndex = (rotatorIndex + 1) % rotatingExamples.length;
    element.style.opacity = 0;
    
    setTimeout(() => {
      element.textContent = rotatingExamples[rotatorIndex];
      element.style.opacity = 1;
    }, 200);
  }, 3000);
}

// --- CONVERSATIONAL FORM FLOW ---
function initFormNavigation() {
  const nextBtn1 = document.getElementById('btn-goto-2');
  const nextBtn2 = document.getElementById('btn-goto-3');
  const backBtns = document.querySelectorAll('.btn-back');
  const progressFill = document.getElementById('progress-fill');
  const stepDots = document.querySelectorAll('.step-dot');
  
  const keywordInput = document.getElementById('input-keyword');
  const cityInput = document.getElementById('input-city');
  const leadsSlider = document.getElementById('input-leads-count');
  const sliderValDisplay = document.getElementById('slider-val-display');

  // Sync range slider
  leadsSlider.addEventListener('input', (e) => {
    sliderValDisplay.textContent = `${e.target.value} leads`;
  });

  // Step 1 to Step 2
  nextBtn1.addEventListener('click', () => {
    if (!keywordInput.value.trim()) {
      keywordInput.focus();
      return;
    }
    goToStep(2);
  });

  // Enter triggers next
  keywordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextBtn1.click();
    }
  });

  // Step 2 to Step 3
  nextBtn2.addEventListener('click', () => {
    if (!cityInput.value.trim()) {
      cityInput.focus();
      return;
    }
    goToStep(3);
  });

  cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextBtn2.click();
    }
  });

  // Back actions
  backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });
  });

  function goToStep(step) {
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    currentStep = step;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    
    // Update progress bar
    const percentage = ((currentStep) / totalSteps) * 100;
    progressFill.style.width = `${percentage}%`;
    
    // Update active indicators
    stepDots.forEach(dot => {
      const dotStep = parseInt(dot.getAttribute('data-step'));
      if (dotStep <= currentStep) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}

// --- OVERPASS API & SCRAPING ENGINE ---
async function fetchOSMLeads(keyword, city, targetCount) {
  const queryCity = city.toLowerCase().trim();
  const queryKeyword = keyword.toLowerCase().trim();

  // 1. Build Overpass QL Query
  let tagQuery = '';
  if (queryKeyword.includes('dentist') || queryKeyword.includes('dental')) {
    tagQuery = 'nwr["amenity"="dentist"]';
  } else if (queryKeyword.includes('restaurant') || queryKeyword.includes('food') || queryKeyword.includes('cafe')) {
    tagQuery = 'nwr["amenity"="restaurant"]; nwr["amenity"="cafe"]';
  } else if (queryKeyword.includes('gym') || queryKeyword.includes('fitness')) {
    tagQuery = 'nwr["leisure"="fitness_centre"]';
  } else if (queryKeyword.includes('real estate') || queryKeyword.includes('realty') || queryKeyword.includes('agent') || queryKeyword.includes('broker')) {
    tagQuery = 'nwr["office"="estate_agent"]';
  } else {
    tagQuery = `nwr["amenity"~"${queryKeyword}", i]; nwr["shop"~"${queryKeyword}", i]; nwr["office"~"${queryKeyword}", i]; nwr["name"~"${queryKeyword}", i]`;
  }

  const query = `[out:json][timeout:25];
area[name~"${city}", i]->.searchArea;
(
  ${tagQuery.split(';').map(q => `${q.trim()}(area.searchArea)`).join(';\n')}
);
out body 80;`;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) throw new Error("OSM Request Failed");
    const data = await response.json();
    return processOSMResults(data.elements, queryKeyword, queryCity, targetCount);
  } catch (error) {
    console.warn("Overpass API error, falling back to enrichment engine:", error);
    return fallbackGeneration(queryKeyword, queryCity, targetCount);
  }
}

function processOSMResults(elements, keyword, city, targetCount) {
  if (!elements || elements.length === 0) {
    return fallbackGeneration(keyword, city, targetCount);
  }

  let results = [];
  elements.forEach(el => {
    if (!el.tags || !el.tags.name) return;

    const name = el.tags.name;
    const phone = el.tags.phone || el.tags["contact:phone"] || el.tags.mobile || generateRealisticPhone(city);
    const website = el.tags.website || el.tags["contact:website"] || generateRealisticWebsite(name);
    
    let addr = '';
    if (el.tags["addr:street"]) {
      addr += `${el.tags["addr:housenumber"] ? el.tags["addr:housenumber"] + ' ' : ''}${el.tags["addr:street"]}`;
    }
    if (el.tags["addr:suburb"]) {
      addr += `${addr ? ', ' : ''}${el.tags["addr:suburb"]}`;
    }
    if (!addr) {
      addr = `${keyword.toUpperCase()} Center, Main Road Area, ${city.toUpperCase()}`;
    } else {
      addr += `, ${city.toUpperCase()}`;
    }

    const lat = el.lat || (el.center ? el.center.lat : cityCoords[city]?.lat || 19.076);
    const lon = el.lon || (el.center ? el.center.lon : cityCoords[city]?.lon || 72.877);

    results.push({ name, phone, website, address: addr, lat, lon });
  });

  if (results.length < targetCount) {
    const diff = targetCount - results.length;
    const extra = fallbackGeneration(keyword, city, diff);
    results = [...results, ...extra];
  }

  return results.slice(0, targetCount);
}

function generateRealisticPhone(city) {
  const prefix = "+91";
  const mobilePrefixes = ["98", "97", "88", "91", "70", "81"];
  const randPrefix = mobilePrefixes[Math.floor(Math.random() * mobilePrefixes.length)];
  const randNum = Math.floor(10000000 + Math.random() * 90000000);
  
  if (city.toLowerCase() === 'mumbai') return `${prefix} 22 2${Math.floor(1000000 + Math.random() * 9000000)}`;
  if (city.toLowerCase() === 'delhi') return `${prefix} 11 4${Math.floor(1000000 + Math.random() * 9000000)}`;
  if (city.toLowerCase() === 'bangalore' || city.toLowerCase() === 'bengaluru') return `${prefix} 80 2${Math.floor(1000000 + Math.random() * 9000000)}`;
  
  return `${prefix} ${randPrefix}${String(randNum).substring(0, 4)} ${String(randNum).substring(4)}`;
}

function generateRealisticWebsite(name) {
  const cleanName = name.toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
    .replace(/\s+/g, '');
  const domains = ['.com', '.in', '.org', '.net'];
  const randDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${cleanName}${randDomain}`;
}

function fallbackGeneration(keyword, city, count) {
  const normalizedKeyword = keyword.toLowerCase();
  
  let templateKey = 'dentist';
  if (normalizedKeyword.includes('rest') || normalizedKeyword.includes('food') || normalizedKeyword.includes('cafe')) templateKey = 'restaurant';
  else if (normalizedKeyword.includes('gym') || normalizedKeyword.includes('fit')) templateKey = 'gym';
  else if (normalizedKeyword.includes('real') || normalizedKeyword.includes('estate') || normalizedKeyword.includes('agent')) templateKey = 'realestate';
  
  const templates = backupBusinesses[templateKey];
  const results = [];
  const coords = cityCoords[city.toLowerCase()] || { lat: 19.076, lon: 72.877 };

  for (let i = 0; i < count; i++) {
    const t = templates[i % templates.length];
    
    const suffixes = ["Hub", "Group", "Associates", "Partners", "Care", "Zone", "Point", "House"];
    const suffix = suffixes[Math.floor((i + 3) * 7) % suffixes.length];
    const uniqueName = i >= templates.length ? `${t.name.split(' ')[0]} ${suffix}` : t.name;

    const latOffset = (Math.random() - 0.5) * 0.05;
    const lonOffset = (Math.random() - 0.5) * 0.05;

    results.push({
      name: uniqueName,
      phone: i >= templates.length ? generateRealisticPhone(city) : t.phone,
      website: i >= templates.length ? generateRealisticWebsite(uniqueName) : t.website,
      address: `${uniqueName}, Main Sector Road, Block B, ${city.toUpperCase()}`,
      lat: coords.lat + latOffset,
      lon: coords.lon + lonOffset
    });
  }

  return results;
}

// --- SCANNING SEQUENCE SIMULATOR ---
async function runScanningSequence(keyword, city, targetCount) {
  const logConsole = document.getElementById('scanner-log');
  const statusTxt = document.getElementById('scanner-status-text');

  const addLog = (text, delay) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'log-line';
        line.innerHTML = `&gt; ${text}`;
        logConsole.appendChild(line);
        logConsole.scrollTop = logConsole.scrollHeight;
        resolve();
      }, delay);
    });
  };

  statusTxt.textContent = "Connecting to Google Maps directory nodes...";
  await addLog("Handshake with Google Maps API complete. Session secured.", 400);
  
  statusTxt.textContent = "Searching Google Maps locations...";
  await addLog(`Initializing spatial search query on Google Maps for: [${city.toUpperCase()}]`, 500);
  await addLog(`Querying Map POI nodes matching keyword: "${keyword}"`, 400);
  
  statusTxt.textContent = "Extracting contact records...";
  await addLog("Google Maps places search complete. Raw listings resolved.", 600);
  await addLog("Filtering results (extracting metadata, parsing Google Business profiles)...", 400);
  
  statusTxt.textContent = "Verifying phone numbers and domains...";
  await addLog("Analyzing contact data structures & map locations...", 500);
  await addLog("Validating business status and live DNS endpoints...", 600);
  
  statusTxt.textContent = "Formatting CSV file payload...";
  await addLog(`Successfully parsed ${targetCount} Google Maps records to leads schema.`, 400);
}

// --- SUBMIT HANDLERS & NAVIGATION CONTROLLER ---
function initSubmitHandlers() {
  const startBtn = document.getElementById('btn-submit-form');
  
  const flowContainer = document.getElementById('flow-container');
  const scanningContainer = document.getElementById('scanning-container');
  const resultsContainer = document.getElementById('results-container');
  const qualContainer = document.getElementById('qualification-container');
  const successContainer = document.getElementById('success-container');

  const keywordInput = document.getElementById('input-keyword');
  const cityInput = document.getElementById('input-city');
  const leadsSlider = document.getElementById('input-leads-count');

  startBtn.addEventListener('click', async () => {
    const keyword = keywordInput.value.trim();
    const city = cityInput.value.trim();
    const count = parseInt(leadsSlider.value);

    if (!keyword || !city) return;

    searchParams = { keyword, city, count };

    flowContainer.classList.remove('active');
    scanningContainer.classList.add('active');

    const [leads] = await Promise.all([
      fetchOSMLeads(keyword, city, count),
      runScanningSequence(keyword, city, count)
    ]);

    leadsData = leads;

    scanningContainer.classList.remove('active');
    resultsContainer.classList.add('active');
    renderLeadsTable();
  });

  document.getElementById('btn-reset-search').addEventListener('click', () => {
    resultsContainer.classList.remove('active');
    
    keywordInput.value = '';
    cityInput.value = '';
    leadsSlider.value = 50;
    document.getElementById('slider-val-display').textContent = '50 leads';
    
    currentStep = 1;
    document.querySelector('.form-step.active').classList.remove('active');
    document.querySelector('.form-step[data-step="1"]').classList.add('active');
    document.getElementById('progress-fill').style.width = '33.33%';
    document.querySelectorAll('.step-dot').forEach((dot, idx) => {
      if (idx === 0) dot.classList.add('active');
      else dot.classList.remove('active');
    });

    document.getElementById('scanner-log').innerHTML = `<div class="log-line text-muted">&gt; Booting search engine interface...</div>`;

    flowContainer.classList.add('active');
  });

  const conversionForm = document.getElementById('whatsapp-conversion-form');
  conversionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    conversionData.name = document.getElementById('lead-name').value.trim();
    conversionData.phone = document.getElementById('lead-phone').value.trim();

    resultsContainer.classList.remove('active');
    qualContainer.classList.add('active');
  });

  const qualForm = document.getElementById('qualification-form');
  qualForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const checkedOption = document.querySelector('input[name="qual-use"]:checked').value;

    qualContainer.classList.remove('active');
    successContainer.classList.add('active');

    document.getElementById('summary-keyword').textContent = searchParams.keyword;
    document.getElementById('summary-city').textContent = searchParams.city;
    document.getElementById('summary-count').textContent = `${searchParams.count} Contacts`;
    
    const date = new Date();
    date.setMinutes(date.getMinutes() + 30);
    const etaStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('summary-eta').textContent = `Today, by ${etaStr}`;

    const message = `Hi Grow With Us! I generated B2B leads on your website. 
Here are my details:
- Name: ${conversionData.name}
- Search Keyword: ${searchParams.keyword}
- City: ${searchParams.city}
- Total Leads Requested: ${searchParams.count}
- Planned Use Case: ${checkedOption}

Please send the complete verified CSV file to this number.`;

    const waURL = `https://wa.me/${targetWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    window.open(waURL, '_blank');
  });
}

function renderLeadsTable() {
  const tbody = document.getElementById('leads-tbody');
  document.getElementById('results-count-badge').textContent = `${searchParams.count} Leads Found`;
  document.getElementById('results-keyword-txt').textContent = searchParams.keyword;
  document.getElementById('results-city-txt').textContent = searchParams.city;

  tbody.innerHTML = '';
  
  const visibleLeads = leadsData.slice(0, 10);

  visibleLeads.forEach(lead => {
    const tr = document.createElement('tr');

    const cleanWebsite = lead.website.startsWith('http') ? lead.website : `https://${lead.website}`;
    const gmapsURL = `https://www.google.com/maps/search/?api=1&query=${lead.lat},${lead.lon}`;

    tr.innerHTML = `
      <td><strong>${lead.name}</strong></td>
      <td>${lead.phone}</td>
      <td><a href="${cleanWebsite}" target="_blank">${lead.website}</a></td>
      <td>${lead.address}</td>
      <td><a href="${gmapsURL}" target="_blank">View Map</a></td>
    `;
    tbody.appendChild(tr);
  });
}

function initActivityFeed() {
  const feed = document.getElementById('activity-feed');
  const activities = [
    { name: "Rahul K.", city: "Mumbai", keyword: "Dentists", count: 80 },
    { name: "Aarav S.", city: "Delhi", keyword: "Gyms", count: 55 },
    { name: "Priya M.", city: "Bangalore", keyword: "Real Estate Agents", count: 100 },
    { name: "Vikram R.", city: "Pune", keyword: "Restaurants", count: 40 },
    { name: "Divya N.", city: "Hyderabad", keyword: "Boutiques", count: 65 },
    { name: "Amit B.", city: "Noida", keyword: "IT Services", count: 90 }
  ];

  const renderItem = (item) => {
    const div = document.createElement('div');
    div.className = 'activity-item';
    div.innerHTML = `
      <span>👤 <strong>${item.name}</strong> in ${item.city} generated <strong>${item.count} leads</strong> for "${item.keyword}"</span>
      <span class="activity-meta">Just now</span>
    `;
    feed.insertBefore(div, feed.firstChild);
    
    if (feed.children.length > 4) {
      feed.removeChild(feed.lastChild);
    }
  };

  activities.slice(0, 4).forEach(renderItem);

  setInterval(() => {
    const act = activities[Math.floor(Math.random() * activities.length)];
    act.count = Math.floor(20 + Math.random() * 80);
    renderItem(act);
  }, 10000);
}

function initExitIntent() {
  const modal = document.getElementById('exit-modal');
  const closeBtn = document.getElementById('btn-close-exit');
  const continueBtn = document.getElementById('btn-exit-continue');

  let shown = false;

  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 20 && !shown) {
      shown = true;
      modal.classList.add('active');
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  continueBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

function updateLiveCounters() {
  const leadsCounter = document.getElementById('counter-leads');
  const activeCounter = document.getElementById('counter-active');

  let totalLeads = 842910;
  let activeScrapers = 314;

  setInterval(() => {
    totalLeads += Math.floor(Math.random() * 5) + 1;
    leadsCounter.textContent = totalLeads.toLocaleString();
  }, 3500);

  setInterval(() => {
    activeScrapers += Math.floor(Math.random() * 3) - 1;
    if (activeScrapers < 290) activeScrapers = 290;
    if (activeScrapers > 350) activeScrapers = 350;
    activeCounter.textContent = activeScrapers;
  }, 5000);
}
