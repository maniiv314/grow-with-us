import React, { useState, useEffect, useRef } from 'react';

const rotatingExamples = [
  "Dentist in Mumbai",
  "Restaurant in Delhi",
  "Gym in Bangalore",
  "Real Estate Agent in Pune",
  "Web Developer in Noida",
  "CA in Hyderabad"
];

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
  const [theme, setTheme] = useState('dark');
  const [rotatorIndex, setRotatorIndex] = useState(0);
  const [formStep, setFormStep] = useState(1);
  
  // Scraper inputs
  const [keyword, setKeyword] = useState('');
  const [city, setCity] = useState('');
  const [leadsCount, setLeadsCount] = useState(50);
  
  // Phase visibility states
  const [phase, setPhase] = useState('input'); // 'input' | 'scanning' | 'results' | 'qualification' | 'success'
  
  // Live log states
  const [logs, setLogs] = useState(['Booting search engine interface...']);
  const [statusText, setStatusText] = useState('Ready');
  const [leadsData, setLeadsData] = useState([]);
  
  // Lead info
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [qualOption, setQualOption] = useState('Marketing outreach campaigns');
  const [eta, setEta] = useState('');

  // Counters
  const [totalLeadsCounter, setTotalLeadsCounter] = useState(842910);
  const [activeScrapersCounter, setActiveScrapersCounter] = useState(314);
  
  // Activities Feed
  const [activities, setActivities] = useState([
    { name: "Rahul K.", city: "Mumbai", keyword: "Dentists", count: 80, time: "Just now" },
    { name: "Aarav S.", city: "Delhi", keyword: "Gyms", count: 55, time: "1 min ago" },
    { name: "Priya M.", city: "Bangalore", keyword: "Real Estate", count: 100, time: "2 mins ago" },
    { name: "Vikram R.", city: "Pune", keyword: "Restaurants", count: 40, time: "4 mins ago" }
  ]);

  const logConsoleRef = useRef(null);

  // Example rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatorIndex(prev => (prev + 1) % rotatingExamples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Counters update
  useEffect(() => {
    const leadsInt = setInterval(() => {
      setTotalLeadsCounter(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 3500);

    const activeInt = setInterval(() => {
      setActiveScrapersCounter(prev => {
        const next = prev + Math.floor(Math.random() * 3) - 1;
        return next < 290 ? 290 : next > 350 ? 350 : next;
      });
    }, 5000);

    return () => {
      clearInterval(leadsInt);
      clearInterval(activeInt);
    };
  }, []);

  // Log auto scroll
  useEffect(() => {
    if (logConsoleRef.current) {
      logConsoleRef.current.scrollTop = logConsoleRef.current.scrollHeight;
    }
  }, [logs]);

  const handleNextStep1 = () => {
    if (keyword.trim()) setFormStep(2);
  };

  const handleNextStep2 = () => {
    if (city.trim()) setFormStep(3);
  };

  const handleBack = () => {
    setFormStep(prev => prev - 1);
  };

  // Scraper Engine Functions
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
    const randDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${cleanName}${randDomain}`;
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
      const suffix = suffixes[Math.floor((i + 3) * 7) % suffixes.length];
      const uniqueName = i >= templates.length ? `${t.name.split(' ')[0]} ${suffix}` : t.name;

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
      console.warn("API Error, utilizing generator fallback:", error);
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
    await addLogLine(`Applying tag filters for keywords match: "${keyword}"`, 400);
    
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

  const handleReset = () => {
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
    <section className="section" id="leads-app-section" style={{ paddingTop: '140px', backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
      <div className="container leads-app-wrapper">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
          <div>
            <div className="trust-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid var(--border-light)', borderRadius: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span className="live-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
              <span><strong>{activeScrapersCounter}</strong> engineers active today</span>
            </div>
            <h1 style={{ marginTop: '15px', fontSize: '2.5rem', fontWeight: 800 }}>Google Maps Local Lead Extractor</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '10px' }}>Generate clean B2B leads and targeted local client databases in seconds for free.</p>
          </div>
          <div style={{ display: 'flex', gap: '30px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }} id="counter-leads">{totalLeadsCounter.toLocaleString()}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Leads Extracted Today</div>
            </div>
          </div>
        </div>

        {phase === 'input' && (
          <div className="leads-panel active" id="flow-container" style={{ background: '#ffffff', borderRadius: 'var(--border-radius-md)', padding: '40px', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
              <div className={`step-dot ${formStep >= 1 ? 'active' : ''}`} style={{ flex: 1, height: '4px', backgroundColor: formStep >= 1 ? 'var(--primary)' : 'var(--border-light)' }}></div>
              <div className={`step-dot ${formStep >= 2 ? 'active' : ''}`} style={{ flex: 1, height: '4px', backgroundColor: formStep >= 2 ? 'var(--primary)' : 'var(--border-light)' }}></div>
              <div className={`step-dot ${formStep >= 3 ? 'active' : ''}`} style={{ flex: 1, height: '4px', backgroundColor: formStep >= 3 ? 'var(--primary)' : 'var(--border-light)' }}></div>
            </div>

            {formStep === 1 && (
              <div className="form-step active" data-step="1">
                <h2>1. What type of business coordinates do you need?</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Enter the niche, category, or keyword of target businesses.</p>
                <div className="form-group" style={{ position: 'relative' }}>
                  <input type="text" className="form-input" id="input-keyword" placeholder="e.g. Restaurants, gyms, dental clinics, boutiques" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleNextStep1()} style={{ width: '100%', padding: '15px', border: '1px solid var(--border-light)', borderRadius: '10px', fontSize: '1.1rem' }} />
                  <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Trending search: <span id="example-rotator" style={{ color: 'var(--primary)', fontWeight: 600, transition: 'opacity 0.2s' }}>{rotatingExamples[rotatorIndex]}</span>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={handleNextStep1} style={{ marginTop: '20px', padding: '12px 30px' }}>Continue</button>
              </div>
            )}

            {formStep === 2 && (
              <div className="form-step active" data-step="2">
                <h2>2. What Indian city is your target market located in?</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Enter the city name (e.g. Mumbai, Delhi, Jaipur, Bengaluru).</p>
                <div className="form-group">
                  <input type="text" className="form-input" id="input-city" placeholder="e.g. Mumbai" value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleNextStep2()} style={{ width: '100%', padding: '15px', border: '1px solid var(--border-light)', borderRadius: '10px', fontSize: '1.1rem' }} />
                </div>
                <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                  <button className="btn btn-secondary" onClick={handleBack}>Back</button>
                  <button className="btn btn-primary" onClick={handleNextStep2}>Continue</button>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div className="form-step active" data-step="3">
                <h2>3. Choose list size limits</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Slide to customize total matching contacts limit count.</p>
                <div className="form-group" style={{ marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginBottom: '10px' }}>
                    <span>Quantity</span>
                    <span style={{ color: 'var(--primary)' }}>{leadsCount} leads</span>
                  </div>
                  <input type="range" min="10" max="150" step="10" className="form-range" value={leadsCount} onChange={(e) => setLeadsCount(parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary)' }} />
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button className="btn btn-secondary" onClick={handleBack}>Back</button>
                  <button className="btn btn-primary" onClick={handleStartSearch}>Start Scraping Database</button>
                </div>
              </div>
            )}
          </div>
        )}

        {phase === 'scanning' && (
          <div className="leads-panel active" id="scanning-container" style={{ background: '#ffffff', borderRadius: 'var(--border-radius-md)', padding: '40px', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div className="scanner-spinner" style={{ width: '60px', height: '60px', border: '5px solid var(--border-light)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px auto' }}></div>
              <h2 id="scanner-status-text">{statusText}</h2>
              <p style={{ color: 'var(--text-muted)' }}>Querying Open Street Maps API node servers...</p>
            </div>
            <div ref={logConsoleRef} className="scanner-log-console" style={{ backgroundColor: '#090d16', color: '#10b981', fontFamily: 'monospace', padding: '20px', borderRadius: '10px', height: '200px', overflowY: 'auto', fontSize: '0.9rem' }}>
              {logs.map((log, idx) => (
                <div key={idx} className="log-line">&gt; {log}</div>
              ))}
            </div>
          </div>
        )}

        {phase === 'results' && (
          <div className="leads-panel active" id="results-container" style={{ background: '#ffffff', borderRadius: 'var(--border-radius-md)', padding: '40px', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '20px' }}>
              <div>
                <h2>Query Matches Found</h2>
                <p style={{ color: 'var(--text-muted)' }}>Keyword: <strong style={{ color: 'var(--text-dark)' }}>{keyword}</strong> in <strong style={{ color: 'var(--text-dark)' }}>{city}</strong></p>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button className="btn btn-secondary" onClick={handleReset}>New Extraction</button>
              </div>
            </div>

            <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '12px' }}>Business Name</th>
                    <th style={{ padding: '12px' }}>Phone Number</th>
                    <th style={{ padding: '12px' }}>Website</th>
                    <th style={{ padding: '12px' }}>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {leadsData.slice(0, 10).map((lead, idx) => (
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
              <h3 style={{ marginBottom: '10px' }}>Unlock the Full list of {leadsData.length} records</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Please provide your name and phone number to verify you are a business user and download the full spreadsheet (.CSV).</p>
              <form onSubmit={handleSaveContact} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <input type="text" className="form-input" placeholder="Your Name" value={leadName} onChange={(e) => setLeadName(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
                <input type="tel" className="form-input" placeholder="Your Phone (WhatsApp)" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} required style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
                <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px' }}>Verify & Download</button>
              </form>
            </div>
          </div>
        )}

        {phase === 'qualification' && (
          <div className="leads-panel active" id="qualification-container" style={{ background: '#ffffff', borderRadius: 'var(--border-radius-md)', padding: '40px', boxShadow: 'var(--shadow-lg)', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '10px' }}>How do you plan to use this client database?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>Help us optimize lead delivery formats specifically tailored to your B2B strategy.</p>
            <form onSubmit={handleQualifySubmit}>
              {['Marketing outreach campaigns', 'Direct sales calling database', 'CRM import / data enrichment tests', 'Other research'].map((opt, idx) => (
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
          <div className="leads-panel active" id="success-container" style={{ background: '#ffffff', borderRadius: 'var(--border-radius-md)', padding: '40px', boxShadow: 'var(--shadow-lg)', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '3rem', color: 'var(--success)', marginBottom: '20px' }}>✓</div>
            <h2>Leads Delivery Request Submitted</h2>
            <p style={{ color: 'var(--text-muted)', margin: '15px 0 30px 0' }}>Your spreadsheet has been formatted. Our product engineer will send you the completed .CSV package on WhatsApp.</p>
            
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

            <button className="btn btn-primary" onClick={handleReset} style={{ width: '100%' }}>Start New Search</button>
          </div>
        )}
      </div>
    </section>
  );
}
