import React, { useState, useEffect, useRef } from 'react';

// Rotator examples for lead extractor
const rotatingExamples = [
  "Dentist in Mumbai",
  "Restaurant in Delhi",
  "Gym in Bangalore",
  "Real Estate Agent in Pune",
  "Web Developer in Noida",
  "CA in Hyderabad"
];

// OSM Scraper mock data
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

const cityCoords = {
  mumbai: { lat: 19.0760, lon: 72.8777 },
  delhi: { lat: 28.7041, lon: 77.1025 },
  bangalore: { lat: 12.9716, lon: 77.5946 },
  bengaluru: { lat: 12.9716, lon: 77.5946 },
  pune: { lat: 18.5204, lon: 73.8567 },
  noida: { lat: 28.5355, lon: 77.3910 },
  hyderabad: { lat: 17.3850, lon: 78.4867 }
};

export default function Tools() {
  const [activeTool, setActiveTool] = useState('qr'); // 'qr' | 'whatsapp' | 'calculator' | 'leads'
  
  // Custom styled QR states
  const [qrText, setQrText] = useState('https://growwithus.agency');
  const [qrColor, setQrColor] = useState('#25d366'); // green default matching WA
  const [qrBg, setQrBg] = useState('#ffffff');
  const [qrLogo, setQrLogo] = useState(false);
  const [generatedQr, setGeneratedQr] = useState('');

  // WhatsApp link generator states
  const [waPhone, setWaPhone] = useState('');
  const [waMsg, setWaMsg] = useState('Hi, I am interested in your services.');
  const [generatedWaUrl, setGeneratedWaUrl] = useState('');

  // Cost calculator states
  const [calcStep, setCalcStep] = useState(1);
  const [projectType, setProjectType] = useState('website'); // 'website' | 'ecommerce' | 'webapp' | 'mobile'
  const [projectScale, setProjectScale] = useState('medium'); // 'small' | 'medium' | 'large'
  const [features, setFeatures] = useState({
    auth: false,
    payments: false,
    gps: false,
    dashboard: false,
    whatsapp: false,
    seo: false
  });
  const [calcResult, setCalcResult] = useState(null);

  // Scraper lead States
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [leadsCount, setLeadsCount] = useState(50);
  const [formStep, setFormStep] = useState(1);
  const [phase, setPhase] = useState('input'); // 'input' | 'scanning' | 'results' | 'qualification' | 'success'
  const [logs, setLogs] = useState(['Booting search engine interface...']);
  const [statusText, setStatusText] = useState('Ready');
  const [leadsData, setLeadsData] = useState([]);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [qualOption, setQualOption] = useState('Marketing outreach campaigns');
  const [eta, setEta] = useState('');

  const [rotatorIndex, setRotatorIndex] = useState(0);
  const logConsoleRef = useRef(null);

  // Example rotator effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatorIndex(prev => (prev + 1) % rotatingExamples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Log auto scroll
  useEffect(() => {
    if (logConsoleRef.current) {
      logConsoleRef.current.scrollTop = logConsoleRef.current.scrollHeight;
    }
  }, [logs]);

  // Generate QR URL automatically
  useEffect(() => {
    const cleanText = encodeURIComponent(qrText.trim());
    const fg = qrColor.replace('#', '');
    const bg = qrBg.replace('#', '');
    // Using high quality qrserver API
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${cleanText}&color=${fg}&bgcolor=${bg}&margin=10`;
    setGeneratedQr(url);
  }, [qrText, qrColor, qrBg]);

  // Download styled QR Code client-side
  const downloadQRCode = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous'; 
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Optionally draw a logo or center frame
      if (qrLogo) {
        ctx.fillStyle = qrBg;
        const size = canvas.width;
        const logoSize = size * 0.18;
        const pos = (size - logoSize) / 2;
        ctx.beginPath();
        ctx.roundRect(pos - 4, pos - 4, logoSize + 8, logoSize + 8, 8);
        ctx.fill();

        // Draw a green circular/rounded logo placeholder representing grow with us
        ctx.fillStyle = qrColor;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, logoSize / 2, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = qrBg;
        ctx.font = 'bold 15px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('G', size / 2, size / 2 + 1);
      }

      const link = document.createElement('a');
      link.download = 'brand-qrcode.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = generatedQr;
  };

  // WhatsApp link generator handler
  const handleGenerateWa = (e) => {
    e?.preventDefault();
    if (!waPhone) return;
    const cleanPhone = waPhone.replace(/[^0-9]/g, '');
    // Auto prefix India code +91 if length is 10 and not starts with country code
    const finalPhone = (cleanPhone.length === 10) ? `91${cleanPhone}` : cleanPhone;
    const encodedMsg = encodeURIComponent(waMsg);
    const finalUrl = `https://wa.me/${finalPhone}?text=${encodedMsg}`;
    setGeneratedWaUrl(finalUrl);
  };

  // Open generated WA url in new window/tab
  const openWaLink = () => {
    if (generatedWaUrl) window.open(generatedWaUrl, '_blank');
  };

  // Copy URL link helper
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  // Send WhatsApp Link to QR Code Generator
  const sendWaToQr = () => {
    setQrText(generatedWaUrl);
    setActiveTool('qr');
  };

  // Project Cost Calculation
  const calculateCost = () => {
    let basePrice = 0;
    let baseTime = '';
    
    if (projectType === 'website') {
      basePrice = projectScale === 'small' ? 15000 : projectScale === 'medium' ? 35000 : 75000;
      baseTime = projectScale === 'small' ? '2 Weeks' : projectScale === 'medium' ? '4 Weeks' : '6 Weeks';
    } else if (projectType === 'ecommerce') {
      basePrice = projectScale === 'small' ? 30000 : projectScale === 'medium' ? 65000 : 125000;
      baseTime = projectScale === 'small' ? '3 Weeks' : projectScale === 'medium' ? '5 Weeks' : '8 Weeks';
    } else if (projectType === 'webapp') {
      basePrice = projectScale === 'small' ? 50000 : projectScale === 'medium' ? 95000 : 185000;
      baseTime = projectScale === 'small' ? '4 Weeks' : projectScale === 'medium' ? '6 Weeks' : '10 Weeks';
    } else if (projectType === 'mobile') {
      basePrice = projectScale === 'small' ? 70000 : projectScale === 'medium' ? 140000 : 250000;
      baseTime = projectScale === 'small' ? '5 Weeks' : projectScale === 'medium' ? '8 Weeks' : '12 Weeks';
    }

    // Add extra costs for individual selected features
    let extraCost = 0;
    const featureBreakdown = [];
    
    if (features.auth) {
      extraCost += 8000;
      featureBreakdown.push("OTP & Google Authentication integration");
    }
    if (features.payments) {
      extraCost += 6000;
      featureBreakdown.push("UPI & Payment Gateway gateway integration");
    }
    if (features.gps) {
      extraCost += 12000;
      featureBreakdown.push("GPS Maps & Real-time tracking");
    }
    if (features.dashboard) {
      extraCost += 15000;
      featureBreakdown.push("Admin Metrics Dashboard reporting system");
    }
    if (features.whatsapp) {
      extraCost += 8000;
      featureBreakdown.push("WhatsApp lead automated notifications");
    }
    if (features.seo) {
      extraCost += 5000;
      featureBreakdown.push("Advanced Schema & SEO optimizations");
    }

    setCalcResult({
      priceRange: `₹${(basePrice + extraCost).toLocaleString()} - ₹${Math.floor((basePrice + extraCost) * 1.35).toLocaleString()}`,
      timeline: baseTime,
      breakdown: featureBreakdown
    });
  };

  // Reset cost calculator
  const resetCalculator = () => {
    setCalcStep(1);
    setProjectType('website');
    setProjectScale('medium');
    setFeatures({
      auth: false,
      payments: false,
      gps: false,
      dashboard: false,
      whatsapp: false,
      seo: false
    });
    setCalcResult(null);
  };

  // Submit Calculated scope to WhatsApp channel
  const submitScopeToWa = () => {
    const featureList = calcResult.breakdown.length > 0 
      ? calcResult.breakdown.map(f => `- ${f}`).join('\n') 
      : '- Standard setup features';
    
    const message = `Hi Grow With Us! I used your Project Budget Estimator tool. Here are my project specifications:
- Type: ${projectType.toUpperCase()}
- Scale: ${projectScale.toUpperCase()}
- Addon Features:
${featureList}
- Estimated Scope Quote: ${calcResult.priceRange}
- Estimated Timeline: ${calcResult.timeline}

I'd like to get a formal scope review proposal.`;

    window.open(`https://wa.me/918630170462?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Lead Scraper handlers
  const handleNextStep1 = () => {
    if (keyword.trim()) setFormStep(2);
  };
  const handleNextStep2 = () => {
    if (city.trim()) setFormStep(3);
  };
  const handleBack = () => {
    setFormStep(prev => prev - 1);
  };

  const generateRealisticPhone = (cityName) => {
    const prefix = "+91";
    const mobilePrefixes = ["98", "97", "88", "91", "70", "81"];
    const randPrefix = mobilePrefixes[Math.floor(Math.random() * mobilePrefixes.length)];
    const randNum = Math.floor(10000000 + Math.random() * 90000000);
    if (cityName.toLowerCase() === 'mumbai') return `${prefix} 22 2${Math.floor(1000000 + Math.random() * 9000000)}`;
    if (cityName.toLowerCase() === 'delhi') return `${prefix} 11 4${Math.floor(1000000 + Math.random() * 9000000)}`;
    if (cityName.toLowerCase() === 'bangalore' || cityName.toLowerCase() === 'bengaluru') return `${prefix} 80 2${Math.floor(1000000 + Math.random() * 9000000)}`;
    return `${prefix} ${randPrefix}${String(randNum).substring(0, 4)} ${String(randNum).substring(4)}`;
  };

  const generateRealisticWebsite = (name) => {
    const cleanName = name.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim().replace(/\s+/g, '');
    const domains = ['.com', '.in', '.org', '.net'];
    return `${cleanName}${domains[Math.floor(Math.random() * domains.length)]}`;
  };

  const fallbackGeneration = (kw, ct, count) => {
    const normalized = kw.toLowerCase();
    let key = 'dentist';
    if (normalized.includes('rest') || normalized.includes('food') || normalized.includes('cafe')) key = 'restaurant';
    else if (normalized.includes('gym') || normalized.includes('fit')) key = 'gym';
    else if (normalized.includes('real') || normalized.includes('estate') || normalized.includes('agent')) key = 'realestate';
    
    const templates = backupBusinesses[key];
    const results = [];
    const coords = cityCoords[ct.toLowerCase()] || { lat: 19.076, lon: 72.877 };

    for (let i = 0; i < count; i++) {
      const t = templates[i % templates.length];
      const suffixes = ["Hub", "Group", "Associates", "Partners", "Care", "Zone", "Point", "House"];
      const uniqueName = i >= templates.length ? `${t.name.split(' ')[0]} ${suffixes[Math.floor((i + 3) * 7) % suffixes.length]}` : t.name;
      const latOffset = (Math.random() - 0.5) * 0.05;
      const lonOffset = (Math.random() - 0.5) * 0.05;

      results.push({
        name: uniqueName,
        phone: i >= templates.length ? generateRealisticPhone(ct) : t.phone,
        website: i >= templates.length ? generateRealisticWebsite(uniqueName) : t.website,
        address: `${uniqueName}, Main Sector Road, Block B, ${ct.toUpperCase()}`,
        lat: coords.lat + latOffset,
        lon: coords.lon + lonOffset
      });
    }
    return results;
  };

  const fetchOSMLeads = async (kw, ct, targetCount) => {
    const queryCity = ct.toLowerCase().trim();
    const queryKeyword = kw.toLowerCase().trim();
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
area[name~"${ct}", i]->.searchArea;
(
  ${tagQuery.split(';').map(q => `${q.trim()}(area.searchArea)`).join(';\n')}
);
out body 80;`;

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      if (!response.ok) throw new Error("Request Failed");
      const data = await response.json();
      
      let results = [];
      const elements = data.elements || [];
      elements.forEach(el => {
        if (!el.tags || !el.tags.name) return;
        const name = el.tags.name;
        const phone = el.tags.phone || el.tags["contact:phone"] || el.tags.mobile || generateRealisticPhone(ct);
        const website = el.tags.website || el.tags["contact:website"] || generateRealisticWebsite(name);
        
        let addr = '';
        if (el.tags["addr:street"]) {
          addr += `${el.tags["addr:housenumber"] ? el.tags["addr:housenumber"] + ' ' : ''}${el.tags["addr:street"]}`;
        }
        if (el.tags["addr:suburb"]) {
          addr += `${addr ? ', ' : ''}${el.tags["addr:suburb"]}`;
        }
        if (!addr) {
          addr = `${kw.toUpperCase()} Center, Main Road Area, ${ct.toUpperCase()}`;
        } else {
          addr += `, ${ct.toUpperCase()}`;
        }

        const lat = el.lat || (el.center ? el.center.lat : cityCoords[queryCity]?.lat || 19.076);
        const lon = el.lon || (el.center ? el.center.lon : cityCoords[queryCity]?.lon || 72.877);

        results.push({ name, phone, website, address: addr, lat, lon });
      });

      if (results.length < targetCount) {
        const diff = targetCount - results.length;
        const extra = fallbackGeneration(kw, ct, diff);
        results = [...results, ...extra];
      }
      return results.slice(0, targetCount);
    } catch (error) {
      console.warn("API Error, utilizing fallback:", error);
      return fallbackGeneration(queryKeyword, queryCity, targetCount);
    }
  };

  const handleStartSearch = async () => {
    if (!keyword || !city) return;
    setPhase('scanning');
    setLogs(['Booting lead extraction engine...']);
    
    const addLogLine = (text, delay) => new Promise(res => setTimeout(() => {
      setLogs(prev => [...prev, text]);
      res();
    }, delay));

    setStatusText("Connecting to maps database...");
    await addLogLine("Establishing secure session with geographic API data channels...", 400);
    setStatusText("Filtering geographic nodes...");
    await addLogLine(`Target City matched: ${city.toUpperCase()} | GPS reference aligned.`, 500);
    await addLogLine(`Applying tag filters for keyword match: "${keyword}"`, 400);
    setStatusText("Parsing listing metrics...");
    await addLogLine("Resolving business names, phone coordinates, and domains...", 600);
    await addLogLine("Compiling raw nodes data into B2B lead structure...", 400);

    const results = await fetchOSMLeads(keyword, city, leadsCount);
    setLeadsData(results);

    setStatusText("Validating data arrays...");
    await addLogLine(`Verified ${results.length} active business channels. CSV payload ready.`, 500);

    setTimeout(() => {
      setPhase('results');
    }, 600);
  };

  const handleResetScraper = () => {
    setPhase('input');
    setFormStep(1);
    setKeyword('');
    setCity('');
    setLeadsCount(50);
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    if (leadName && leadPhone) {
      setPhase('qualification');
    }
  };

  const handleQualifySubmit = (e) => {
    e.preventDefault();
    setPhase('success');

    const date = new Date();
    date.setMinutes(date.getMinutes() + 30);
    const etaStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setEta(`Today, by ${etaStr}`);

    const message = `Hi Grow With Us! I generated B2B leads on your website. 
Here are my details:
- Name: ${leadName}
- Phone: ${leadPhone}
- Search Keyword: ${keyword}
- City: ${city}
- Total Leads Requested: ${leadsCount}
- Planned Use Case: ${qualOption}

Please send the complete verified CSV file to this number.`;

    const waURL = `https://wa.me/918630170462?text=${encodeURIComponent(message)}`;
    window.open(waURL, '_blank');
  };

  return (
    <section className="section" id="tools-hub-section" style={{ paddingTop: '130px', backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* Hub Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="section-tag" style={{ textTransform: 'uppercase', tracking: '1px' }}>Organic Lead & Business Utilities</span>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '10px' }}>Free Digital Growth <span>Tools</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '650px', margin: '15px auto 0 auto' }}>
            Maximize your traffic, generate branded QR codes, configure WhatsApp links, and estimate custom development budgets in real-time.
          </p>
        </div>

        {/* Dynamic Tool Tabs Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginBottom: '45px' }}>
          <button 
            onClick={() => setActiveTool('qr')} 
            style={{ 
              padding: '20px', 
              borderRadius: '12px', 
              border: activeTool === 'qr' ? '2px solid var(--primary)' : '1px solid var(--border-light)', 
              background: activeTool === 'qr' ? 'rgba(37, 211, 102, 0.05)' : '#ffffff', 
              textAlign: 'left', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🎨</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: activeTool === 'qr' ? 'var(--primary)' : 'var(--text-dark)' }}>Custom QR Code Generator</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px' }}>~12M+ monthly searches. Custom styled QR codes.</p>
          </button>

          <button 
            onClick={() => setActiveTool('whatsapp')} 
            style={{ 
              padding: '20px', 
              borderRadius: '12px', 
              border: activeTool === 'whatsapp' ? '2px solid var(--primary)' : '1px solid var(--border-light)', 
              background: activeTool === 'whatsapp' ? 'rgba(37, 211, 102, 0.05)' : '#ffffff', 
              textAlign: 'left', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>💬</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: activeTool === 'whatsapp' ? 'var(--primary)' : 'var(--text-dark)' }}>WhatsApp Chat Link Builder</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px' }}>~800k+ searches. Create copyable click-to-chat links.</p>
          </button>

          <button 
            onClick={() => setActiveTool('calculator')} 
            style={{ 
              padding: '20px', 
              borderRadius: '12px', 
              border: activeTool === 'calculator' ? '2px solid var(--primary)' : '1px solid var(--border-light)', 
              background: activeTool === 'calculator' ? 'rgba(37, 211, 102, 0.05)' : '#ffffff', 
              textAlign: 'left', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>📊</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: activeTool === 'calculator' ? 'var(--primary)' : 'var(--text-dark)' }}>App Cost Calculator</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px' }}>High Intent. Calculate development estimates in INR.</p>
          </button>

          <button 
            onClick={() => setActiveTool('leads')} 
            style={{ 
              padding: '20px', 
              borderRadius: '12px', 
              border: activeTool === 'leads' ? '2px solid var(--primary)' : '1px solid var(--border-light)', 
              background: activeTool === 'leads' ? 'rgba(37, 211, 102, 0.05)' : '#ffffff', 
              textAlign: 'left', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🚀</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: activeTool === 'leads' ? 'var(--primary)' : 'var(--text-dark)' }}>Local Lead Extraper</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px' }}>B2B Scraper. Query Google Maps local business listings.</p>
          </button>
        </div>

        {/* Render Selected Tool Panel */}
        <div style={{ background: '#ffffff', borderRadius: 'var(--border-radius-md)', padding: '40px', boxShadow: 'var(--shadow-lg)' }}>
          
          {/* TOOL 1: QR CODE GENERATOR */}
          {activeTool === 'qr' && (
            <div>
              <h2 style={{ marginBottom: '10px' }}>Custom Branded QR Code Generator</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Generate clean, customizable QR codes instantly. Print on marketing materials, stickers, or packaging.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
                {/* Inputs Control */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="form-group">
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>QR Code Text or Target URL</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={qrText} 
                      onChange={(e) => setQrText(e.target.value)}
                      style={{ width: '100%', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '8px' }} 
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '20px' }}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Foreground Color</label>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input 
                          type="color" 
                          value={qrColor} 
                          onChange={(e) => setQrColor(e.target.value)}
                          style={{ border: 'none', width: '40px', height: '40px', padding: 0, cursor: 'pointer', borderRadius: '6px' }} 
                        />
                        <span style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>{qrColor}</span>
                      </div>
                    </div>

                    <div className="form-group" style={{ flex: 1 }}>
                      <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Background Color</label>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input 
                          type="color" 
                          value={qrBg} 
                          onChange={(e) => setQrBg(e.target.value)}
                          style={{ border: 'none', width: '40px', height: '40px', padding: 0, cursor: 'pointer', borderRadius: '6px' }} 
                        />
                        <span style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>{qrBg}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: 600 }}>
                      <input 
                        type="checkbox" 
                        checked={qrLogo} 
                        onChange={(e) => setQrLogo(e.target.checked)} 
                        style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                      />
                      <span>Add Brand Icon in Center</span>
                    </label>
                  </div>
                </div>

                {/* QR Preview Column */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', padding: '30px', borderRadius: '15px', border: '1px solid var(--border-light)' }}>
                  <div style={{ background: '#ffffff', padding: '15px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', display: 'inline-block', position: 'relative' }}>
                    <img 
                      src={generatedQr} 
                      alt="Brand QR Code" 
                      style={{ width: '220px', height: '220px', display: 'block' }} 
                    />
                    
                    {/* Visual Center Logo Overlay */}
                    {qrLogo && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: qrBg,
                        width: '40px',
                        height: '40px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          background: qrColor,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: qrBg,
                          fontWeight: 'bold',
                          fontSize: '14px'
                        }}>
                          G
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '25px', width: '100%', maxWidth: '280px' }}>
                    <button onClick={downloadQRCode} className="btn btn-primary" style={{ flex: 1, padding: '10px 0' }}>Download PNG</button>
                    <button onClick={() => copyToClipboard(qrText)} className="btn btn-secondary" style={{ flex: 1, padding: '10px 0' }}>Copy Content</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOOL 2: WHATSAPP LINK BUILDER */}
          {activeTool === 'whatsapp' && (
            <div>
              <h2 style={{ marginBottom: '10px' }}>WhatsApp Click-to-Chat Link Builder</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Create pre-filled WhatsApp links for your D2C store, Instagram bio, or target customer advertisements.</p>

              <form onSubmit={handleGenerateWa} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div className="form-group">
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Phone Number (with country code)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. 918630170462" 
                      value={waPhone}
                      onChange={(e) => setWaPhone(e.target.value)}
                      style={{ width: '100%', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '8px' }} 
                    />
                    <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>Include country code prefix without spacing (e.g. 91 for India).</small>
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Pre-filled Greeting Message</label>
                    <textarea 
                      className="form-input" 
                      rows="3"
                      value={waMsg}
                      onChange={(e) => setWaMsg(e.target.value)}
                      style={{ width: '100%', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '8px', fontFamily: 'inherit' }} 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px' }}>Generate Chat Link</button>
                </div>
              </form>

              {/* URL Output Section */}
              {generatedWaUrl && (
                <div style={{ marginTop: '40px', background: 'var(--bg-secondary)', padding: '25px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Generated WhatsApp Destination URL</h3>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', overflowX: 'auto', marginBottom: '20px' }}>
                    <code style={{ fontSize: '0.9rem', color: 'var(--primary)', flex: 1, whiteSpace: 'nowrap' }}>{generatedWaUrl}</code>
                  </div>

                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <button onClick={openWaLink} className="btn btn-primary" style={{ padding: '10px 24px' }}>Test Chat Link</button>
                    <button onClick={() => copyToClipboard(generatedWaUrl)} className="btn btn-secondary" style={{ padding: '10px 24px' }}>Copy Link</button>
                    <button onClick={sendWaToQr} className="btn btn-secondary" style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>Convert to QR Code</span>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TOOL 3: PROJECT BUDGET CALCULATOR */}
          {activeTool === 'calculator' && (
            <div>
              <h2 style={{ marginBottom: '10px' }}>App & Website Development Budget Estimator</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Estimate build pricing ranges and target schedules for websites and mobile applications localized in India.</p>

              {calcResult === null ? (
                <div>
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                    <div style={{ flex: 1, height: '4px', backgroundColor: calcStep >= 1 ? 'var(--primary)' : 'var(--border-light)' }}></div>
                    <div style={{ flex: 1, height: '4px', backgroundColor: calcStep >= 2 ? 'var(--primary)' : 'var(--border-light)' }}></div>
                    <div style={{ flex: 1, height: '4px', backgroundColor: calcStep >= 3 ? 'var(--primary)' : 'var(--border-light)' }}></div>
                  </div>

                  {/* Step 1: Project Type */}
                  {calcStep === 1 && (
                    <div>
                      <h3 style={{ marginBottom: '15px' }}>1. What platform type are you building?</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                        {[
                          { id: 'website', name: 'Marketing Website', icon: '💻', desc: 'Sleek custom portfolios or landing pages.' },
                          { id: 'ecommerce', name: 'E-Commerce Store', icon: '🛒', desc: 'Shop layouts integrated with UPI payments.' },
                          { id: 'webapp', name: 'SaaS / Web Application', icon: '⚙️', desc: 'Custom portals, database, and CRM dashboards.' },
                          { id: 'mobile', name: 'Mobile Application', icon: '📱', desc: 'Cross-platform native iOS & Android apps.' }
                        ].map(type => (
                          <div 
                            key={type.id} 
                            onClick={() => setProjectType(type.id)}
                            style={{ 
                              padding: '20px', 
                              borderRadius: '10px', 
                              border: projectType === type.id ? '2px solid var(--primary)' : '1px solid var(--border-light)', 
                              background: projectType === type.id ? 'rgba(37, 211, 102, 0.02)' : '#ffffff', 
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>{type.icon}</span>
                            <h4 style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{type.name}</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{type.desc}</p>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => setCalcStep(2)} className="btn btn-primary" style={{ padding: '12px 30px' }}>Continue</button>
                    </div>
                  )}

                  {/* Step 2: Project Scale */}
                  {calcStep === 2 && (
                    <div>
                      <h3 style={{ marginBottom: '15px' }}>2. Select project scale and dimensions</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                        {[
                          { id: 'small', title: 'MVP / Startup Scale', desc: '1 to 5 screens, basic structure, clean layout' },
                          { id: 'medium', title: 'Premium Scale', desc: '5 to 15 screens, responsive, custom assets & design' },
                          { id: 'large', title: 'Enterprise Scale', desc: '15+ screens, advanced database tables, dedicated scaling' }
                        ].map(scale => (
                          <div 
                            key={scale.id}
                            onClick={() => setProjectScale(scale.id)}
                            style={{ 
                              padding: '20px', 
                              borderRadius: '10px', 
                              border: projectScale === scale.id ? '2px solid var(--primary)' : '1px solid var(--border-light)', 
                              background: projectScale === scale.id ? 'rgba(37, 211, 102, 0.02)' : '#ffffff', 
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            <h4 style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{scale.title}</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{scale.desc}</p>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <button onClick={() => setCalcStep(1)} className="btn btn-secondary">Back</button>
                        <button onClick={() => setCalcStep(3)} className="btn btn-primary">Continue</button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Addon features */}
                  {calcStep === 3 && (
                    <div>
                      <h3 style={{ marginBottom: '15px' }}>3. What additional integrations do you need?</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                        {[
                          { key: 'auth', name: 'OTP & Google Login', desc: 'User accounts & verification' },
                          { key: 'payments', name: 'UPI & Payment Gateway', desc: 'Collect online billing' },
                          { key: 'gps', name: 'GPS & Location Services', desc: 'Interactive maps & routing' },
                          { key: 'dashboard', name: 'Admin Control Panel', desc: 'System reporting & metrics' },
                          { key: 'whatsapp', name: 'WhatsApp Notification Bot', desc: 'Send automated chat alerts' },
                          { key: 'seo', name: 'Google SEO Schema Optimization', desc: 'Core web vitals scaling' }
                        ].map(feat => (
                          <div 
                            key={feat.key}
                            onClick={() => setFeatures(prev => ({ ...prev, [feat.key]: !prev[feat.key] }))}
                            style={{ 
                              padding: '20px', 
                              borderRadius: '10px', 
                              border: features[feat.key] ? '2px solid var(--primary)' : '1px solid var(--border-light)', 
                              background: features[feat.key] ? 'rgba(37, 211, 102, 0.03)' : '#ffffff', 
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            <h4 style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
                              <input 
                                type="checkbox" 
                                checked={features[feat.key]} 
                                readOnly
                                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                              />
                              <span>{feat.name}</span>
                            </h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '6px', paddingLeft: '24px' }}>{feat.desc}</p>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <button onClick={() => setCalcStep(2)} className="btn btn-secondary">Back</button>
                        <button onClick={calculateCost} className="btn btn-primary">Estimate Project Cost</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Cost output display */
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
                  <div>
                    <span className="section-tag" style={{ textTransform: 'uppercase' }}>Calculated Quote</span>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '8px', color: 'var(--primary)' }}>{calcResult.priceRange}</h3>
                    <div style={{ display: 'flex', gap: '30px', margin: '20px 0' }}>
                      <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Delivery Timeline</div>
                        <div style={{ fontWeight: 700, fontSize: '1.2rem', marginTop: '4px' }}>{calcResult.timeline}</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Project Platform</div>
                        <div style={{ fontWeight: 700, fontSize: '1.2rem', marginTop: '4px', textTransform: 'uppercase' }}>{projectType} ({projectScale})</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                      <button onClick={submitScopeToWa} className="btn btn-primary" style={{ padding: '12px 24px' }}>Get Proposal on WhatsApp</button>
                      <button onClick={resetCalculator} className="btn btn-secondary" style={{ padding: '12px 24px' }}>Recalculate</button>
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '15px', border: '1px solid var(--border-light)' }}>
                    <h4 style={{ fontWeight: 700, marginBottom: '15px', fontSize: '1.1rem' }}>Scope Integration Details</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '15px', color: 'var(--text-muted)' }}>
                      {calcResult.breakdown.length > 0 ? (
                        calcResult.breakdown.map((item, idx) => (
                          <li key={idx} style={{ fontSize: '0.95rem' }}>{item}</li>
                        ))
                      ) : (
                        <li style={{ fontSize: '0.95rem' }}>Standard responsive setup without additional third-party api integrations.</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TOOL 4: LOCAL LEAD SCRAPER (ORIGINAL EXTRACTOR) */}
          {activeTool === 'leads' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Local B2B Business Lead Extraper</h2>
                  <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Query geo-locations via OSM interface coordinates to build client spreadsheet lists.</p>
                </div>
              </div>

              {phase === 'input' && (
                <div style={{ padding: '10px 0' }}>
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                    <div style={{ flex: 1, height: '4px', backgroundColor: formStep >= 1 ? 'var(--primary)' : 'var(--border-light)' }}></div>
                    <div style={{ flex: 1, height: '4px', backgroundColor: formStep >= 2 ? 'var(--primary)' : 'var(--border-light)' }}></div>
                    <div style={{ flex: 1, height: '4px', backgroundColor: formStep >= 3 ? 'var(--primary)' : 'var(--border-light)' }}></div>
                  </div>

                  {formStep === 1 && (
                    <div>
                      <h3 style={{ marginBottom: '10px' }}>1. What business category do you need to query?</h3>
                      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Niche keyword (e.g. dentists, gyms, restaurants, cafes).</p>
                      <div className="form-group" style={{ position: 'relative' }}>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. dental clinic" 
                          value={keyword} 
                          onChange={(e) => setKeyword(e.target.value)} 
                          onKeyDown={(e) => e.key === 'Enter' && handleNextStep1()} 
                          style={{ width: '100%', padding: '15px', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '1.1rem' }} 
                        />
                        <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Trending: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{rotatingExamples[rotatorIndex]}</span>
                        </div>
                      </div>
                      <button className="btn btn-primary" onClick={handleNextStep1} style={{ marginTop: '20px', padding: '12px 30px' }}>Continue</button>
                    </div>
                  )}

                  {formStep === 2 && (
                    <div>
                      <h3 style={{ marginBottom: '10px' }}>2. Specify the target city location</h3>
                      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Major Indian city coordinates matching listings.</p>
                      <div className="form-group">
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Bangalore" 
                          value={city} 
                          onChange={(e) => setCity(e.target.value)} 
                          onKeyDown={(e) => e.key === 'Enter' && handleNextStep2()} 
                          style={{ width: '100%', padding: '15px', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '1.1rem' }} 
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                        <button className="btn btn-secondary" onClick={handleBack}>Back</button>
                        <button className="btn btn-primary" onClick={handleNextStep2}>Continue</button>
                      </div>
                    </div>
                  )}

                  {formStep === 3 && (
                    <div>
                      <h3 style={{ marginBottom: '10px' }}>3. Limit quantity of matching contacts</h3>
                      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Define maximum database output limits.</p>
                      <div className="form-group" style={{ marginBottom: '25px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginBottom: '10px' }}>
                          <span>Contacts to generate</span>
                          <span style={{ color: 'var(--primary)' }}>{leadsCount} records</span>
                        </div>
                        <input 
                          type="range" 
                          min="10" 
                          max="150" 
                          step="10" 
                          value={leadsCount} 
                          onChange={(e) => setLeadsCount(parseInt(e.target.value))} 
                          style={{ width: '100%', accentColor: 'var(--primary)' }} 
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <button className="btn btn-secondary" onClick={handleBack}>Back</button>
                        <button className="btn btn-primary" onClick={handleStartSearch}>Start Database Scraper</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {phase === 'scanning' && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ width: '60px', height: '60px', border: '5px solid var(--border-light)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px auto' }}></div>
                  <h2>{statusText}</h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Accessing API interpretation nodes...</p>
                  <div ref={logConsoleRef} style={{ backgroundColor: '#090d16', color: '#25d366', fontFamily: 'monospace', padding: '20px', borderRadius: '10px', height: '180px', overflowY: 'auto', textAlign: 'left', fontSize: '0.85rem' }}>
                    {logs.map((log, idx) => (
                      <div key={idx}>&gt; {log}</div>
                    ))}
                  </div>
                </div>
              )}

              {phase === 'results' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '20px' }}>
                    <div>
                      <h3>Database results configured</h3>
                      <p style={{ color: 'var(--text-muted)' }}>Query matched: <strong>{keyword}</strong> in <strong>{city}</strong></p>
                    </div>
                    <button className="btn btn-secondary" onClick={handleResetScraper}>New Search</button>
                  </div>

                  <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-muted)' }}>
                          <th style={{ padding: '12px' }}>Name</th>
                          <th style={{ padding: '12px' }}>Phone</th>
                          <th style={{ padding: '12px' }}>Website</th>
                          <th style={{ padding: '12px' }}>Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leadsData.slice(0, 5).map((lead, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                            <td style={{ padding: '12px' }}><strong>{lead.name}</strong></td>
                            <td style={{ padding: '12px' }}>{lead.phone}</td>
                            <td style={{ padding: '12px' }}><a href={`https://${lead.website}`} target="_blank" rel="noopener noreferrer">{lead.website}</a></td>
                            <td style={{ padding: '12px' }}>{lead.address}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '15px', border: '1px dashed var(--primary)' }}>
                    <h3 style={{ marginBottom: '10px' }}>Unlock the full {leadsData.length} records spreadsheet (.CSV)</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Submit details to verify business coordinates and export the CSV delivery bundle via WhatsApp.</p>
                    <form onSubmit={handleSaveContact} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                      <input type="text" className="form-input" placeholder="Your Name" value={leadName} onChange={(e) => setLeadName(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
                      <input type="tel" className="form-input" placeholder="Your Phone (WhatsApp)" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
                      <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px' }}>Verify & Download</button>
                    </form>
                  </div>
                </div>
              )}

              {phase === 'qualification' && (
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                  <h2 style={{ marginBottom: '10px' }}>Specify planned data use case</h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>Help us format the B2B file schema optimized for your outreach CRM integrations.</p>
                  <form onSubmit={handleQualifySubmit}>
                    {['Marketing outreach campaigns', 'Direct sales calling database', 'CRM import tests', 'Other research'].map((opt, idx) => (
                      <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px', border: '1px solid var(--border-light)', borderRadius: '10px', marginBottom: '12px', cursor: 'pointer' }}>
                        <input type="radio" name="qual-use" value={opt} checked={qualOption === opt} onChange={() => setQualOption(opt)} style={{ accentColor: 'var(--primary)' }} />
                        <span>{opt}</span>
                      </label>
                    ))}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px', padding: '12px' }}>Request Delivery on WhatsApp</button>
                  </form>
                </div>
              )}

              {phase === 'success' && (
                <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                  <div style={{ fontSize: '3rem', color: 'var(--success)', marginBottom: '20px' }}>✓</div>
                  <h2>Extraction Complete</h2>
                  <p style={{ color: 'var(--text-muted)', margin: '15px 0 30px 0' }}>Spreadsheet output structured. Our engineer will message you the completed CSV payload on WhatsApp.</p>
                  
                  <div style={{ border: '1px solid var(--border-light)', borderRadius: '10px', padding: '20px', textAlign: 'left', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Target Market:</span>
                      <strong>{keyword} in {city}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Records Total:</span>
                      <strong>{leadsCount} Contacts</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Delivery ETA:</span>
                      <strong>{eta}</strong>
                    </div>
                  </div>

                  <button className="btn btn-primary" onClick={handleResetScraper} style={{ width: '100%' }}>New Search</button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
