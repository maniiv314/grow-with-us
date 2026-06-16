import React, { useState, useEffect } from 'react';

export default function Tools() {
  const [activeTool, setActiveTool] = useState('qr'); // 'qr' | 'gst' | 'wordcounter' | 'whatsapp'
  
  // 1. QR Code States
  const [qrText, setQrText] = useState('https://growwithus.agency');
  const [qrColor, setQrColor] = useState('#25d366'); 
  const [qrBg, setQrBg] = useState('#ffffff');
  const [qrLogo, setQrLogo] = useState(false);
  const [generatedQr, setGeneratedQr] = useState('');

  // 2. GST Calculator States
  const [gstAmount, setGstAmount] = useState('1000');
  const [gstRate, setGstRate] = useState(18);
  const [gstType, setGstType] = useState('exclusive'); // 'exclusive' | 'inclusive'
  const [gstResult, setGstResult] = useState({ cgst: 0, sgst: 0, totalTax: 0, totalAmount: 0 });

  // 3. Word Counter States
  const [counterText, setCounterText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [paragraphs, setParagraphs] = useState(0);

  // 4. WhatsApp Link States
  const [waPhone, setWaPhone] = useState('');
  const [waMsg, setWaMsg] = useState('Hi, I am interested in your services.');
  const [generatedWaUrl, setGeneratedWaUrl] = useState('');

  // QR Code Generation Trigger
  useEffect(() => {
    const cleanText = encodeURIComponent(qrText.trim());
    const fg = qrColor.replace('#', '');
    const bg = qrBg.replace('#', '');
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${cleanText}&color=${fg}&bgcolor=${bg}&margin=10`;
    setGeneratedQr(url);
  }, [qrText, qrColor, qrBg]);

  // QR Download Handler
  const downloadQRCode = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous'; 
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      if (qrLogo) {
        ctx.fillStyle = qrBg;
        const size = canvas.width;
        const logoSize = size * 0.18;
        const pos = (size - logoSize) / 2;
        ctx.beginPath();
        ctx.roundRect(pos - 4, pos - 4, logoSize + 8, logoSize + 8, 8);
        ctx.fill();

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
      link.download = 'custom-qrcode.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = generatedQr;
  };

  // GST Calculation Trigger
  useEffect(() => {
    const amt = parseFloat(gstAmount) || 0;
    const rate = parseFloat(gstRate) || 0;
    let cgst = 0;
    let sgst = 0;
    let totalTax = 0;
    let totalAmount = 0;

    if (gstType === 'exclusive') {
      totalTax = amt * (rate / 100);
      cgst = totalTax / 2;
      sgst = totalTax / 2;
      totalAmount = amt + totalTax;
    } else {
      totalAmount = amt;
      const baseAmount = amt / (1 + rate / 100);
      totalTax = amt - baseAmount;
      cgst = totalTax / 2;
      sgst = totalTax / 2;
    }

    setGstResult({
      cgst: cgst.toFixed(2),
      sgst: sgst.toFixed(2),
      totalTax: totalTax.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      baseAmount: (totalAmount - totalTax).toFixed(2)
    });
  }, [gstAmount, gstRate, gstType]);

  // Word Counter Analysis Trigger
  useEffect(() => {
    const text = counterText.trim();
    if (!text) {
      setWordCount(0);
      setCharCount(0);
      setReadingTime(0);
      setParagraphs(0);
      return;
    }

    const words = text.split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(counterText.length);
    
    // Avg reading speed: 200 words per minute
    setReadingTime(Math.ceil(words.length / 200));

    const para = counterText.split(/\n+/).filter(p => p.trim().length > 0);
    setParagraphs(para.length);
  }, [counterText]);

  // WhatsApp Link Builder Handler
  const handleGenerateWa = (e) => {
    e?.preventDefault();
    if (!waPhone) return;
    const cleanPhone = waPhone.replace(/[^0-9]/g, '');
    const finalPhone = (cleanPhone.length === 10) ? `91${cleanPhone}` : cleanPhone;
    const encodedMsg = encodeURIComponent(waMsg);
    setGeneratedWaUrl(`https://wa.me/${finalPhone}?text=${encodedMsg}`);
  };

  // Utility Copy & Action Handlers
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const clearWordCounter = () => setCounterText('');
  const uppercaseWordCounter = () => setCounterText(counterText.toUpperCase());
  const lowercaseWordCounter = () => setCounterText(counterText.toLowerCase());

  return (
    <section className="section" id="tools-hub-section" style={{ paddingTop: '130px', backgroundColor: 'var(--bg-secondary)', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* Hub Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="section-tag" style={{ textTransform: 'uppercase', tracking: '1px' }}>Quick Utility Tools</span>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '10px' }}>Free Digital <span>Utilities</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '15px auto 0 auto' }}>
            Instant, browser-based utilities to help you build, calculate, analyze, and scale your brand.
          </p>
        </div>

        {/* Dynamic Tool Selector Grid */}
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
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: activeTool === 'qr' ? 'var(--primary)' : 'var(--text-dark)' }}>QR Code Generator</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px' }}>Generate custom styled QR codes client-side.</p>
          </button>

          <button 
            onClick={() => setActiveTool('gst')} 
            style={{ 
              padding: '20px', 
              borderRadius: '12px', 
              border: activeTool === 'gst' ? '2px solid var(--primary)' : '1px solid var(--border-light)', 
              background: activeTool === 'gst' ? 'rgba(37, 211, 102, 0.05)' : '#ffffff', 
              textAlign: 'left', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🧾</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: activeTool === 'gst' ? 'var(--primary)' : 'var(--text-dark)' }}>GST Tax Calculator</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px' }}>Calculate GST inclusive & exclusive receipts.</p>
          </button>

          <button 
            onClick={() => setActiveTool('wordcounter')} 
            style={{ 
              padding: '20px', 
              borderRadius: '12px', 
              border: activeTool === 'wordcounter' ? '2px solid var(--primary)' : '1px solid var(--border-light)', 
              background: activeTool === 'wordcounter' ? 'rgba(37, 211, 102, 0.05)' : '#ffffff', 
              textAlign: 'left', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>📝</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: activeTool === 'wordcounter' ? 'var(--primary)' : 'var(--text-dark)' }}>Word & Character Counter</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px' }}>Analyze text parameters and reading times.</p>
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
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: activeTool === 'whatsapp' ? 'var(--primary)' : 'var(--text-dark)' }}>WhatsApp Link Builder</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '5px' }}>Create pre-filled click-to-chat links.</p>
          </button>
        </div>

        {/* Selected Tool Panel Container */}
        <div style={{ background: '#ffffff', borderRadius: 'var(--border-radius-md)', padding: '40px', boxShadow: 'var(--shadow-lg)' }}>
          
          {/* TOOL 1: QR CODE GENERATOR */}
          {activeTool === 'qr' && (
            <div>
              <h2 style={{ marginBottom: '10px', fontWeight: 800 }}>Custom QR Code Generator</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Generate clean, customizable QR codes instantly. Print on marketing materials, stickers, or packaging.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
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

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', padding: '30px', borderRadius: '15px', border: '1px solid var(--border-light)' }}>
                  <div style={{ background: '#ffffff', padding: '15px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', display: 'inline-block', position: 'relative' }}>
                    <img 
                      src={generatedQr} 
                      alt="Brand QR Code" 
                      style={{ width: '220px', height: '220px', display: 'block' }} 
                    />
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
                    <button onClick={() => copyToClipboard(qrText)} className="btn btn-secondary" style={{ flex: 1, padding: '10px 0' }}>Copy URL</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOOL 2: GST CALCULATOR */}
          {activeTool === 'gst' && (
            <div>
              <h2 style={{ marginBottom: '10px', fontWeight: 800 }}>GST Tax Calculator</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Quickly calculate GST components for invoices and quotes.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="form-group">
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>Amount (₹)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={gstAmount}
                      onChange={(e) => setGstAmount(e.target.value)}
                      style={{ width: '100%', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '8px' }} 
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>GST Rate (%)</label>
                    <select 
                      className="form-input"
                      value={gstRate}
                      onChange={(e) => setGstRate(parseInt(e.target.value))}
                      style={{ width: '100%', padding: '12px', border: '1px solid var(--border-light)', borderRadius: '8px', background: '#fff' }}
                    >
                      <option value="5">5% (Essential Goods)</option>
                      <option value="12">12% (Standard)</option>
                      <option value="18">18% (Services / IT)</option>
                      <option value="28">28% (Luxury)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>GST Application Type</label>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          name="gst_type" 
                          value="exclusive" 
                          checked={gstType === 'exclusive'} 
                          onChange={() => setGstType('exclusive')}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span>GST Exclusive (Add Tax)</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          name="gst_type" 
                          value="inclusive" 
                          checked={gstType === 'inclusive'} 
                          onChange={() => setGstType('inclusive')}
                          style={{ accentColor: 'var(--primary)' }}
                        />
                        <span>GST Inclusive (Extract Tax)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Bill receipt breakdown visual */}
                <div style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '15px', border: '1px solid var(--border-light)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px' }}>Tax Invoice Summary</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Base Price (Net):</span>
                      <strong>₹{gstResult.baseAmount}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>CGST ({gstRate/2}%):</span>
                      <strong>₹{gstResult.cgst}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>SGST ({gstRate/2}%):</span>
                      <strong>₹{gstResult.sgst}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Total GST component:</span>
                      <strong>₹{gstResult.totalTax}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--border-light)', paddingTop: '15px', fontSize: '1.2rem' }}>
                      <span style={{ fontWeight: 700 }}>Total Billing Value:</span>
                      <strong style={{ color: 'var(--primary)' }}>₹{gstResult.totalAmount}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOOL 3: WORD COUNTER */}
          {activeTool === 'wordcounter' && (
            <div>
              <h2 style={{ marginBottom: '10px', fontWeight: 800 }}>Word & Character Counter</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Analyze word density, counts, and estimated reading speeds instantly.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <textarea 
                  className="form-input" 
                  rows="8"
                  placeholder="Paste or type your text content here..."
                  value={counterText}
                  onChange={(e) => setCounterText(e.target.value)}
                  style={{ width: '100%', padding: '15px', border: '1px solid var(--border-light)', borderRadius: '10px', fontSize: '1.05rem', fontFamily: 'inherit' }}
                />

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button onClick={uppercaseWordCounter} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>UPPERCASE</button>
                  <button onClick={lowercaseWordCounter} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>lowercase</button>
                  <button onClick={() => copyToClipboard(counterText)} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Copy Text</button>
                  <button onClick={clearWordCounter} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem', color: 'red' }}>Clear</button>
                </div>

                {/* Dashboard Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginTop: '20px' }}>
                  <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{wordCount}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', marginTop: '5px' }}>Words</div>
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{charCount}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', marginTop: '5px' }}>Characters</div>
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{paragraphs}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', marginTop: '5px' }}>Paragraphs</div>
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{readingTime} min</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', marginTop: '5px' }}>Reading Time</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOOL 4: WHATSAPP LINK BUILDER */}
          {activeTool === 'whatsapp' && (
            <div>
              <h2 style={{ marginBottom: '10px', fontWeight: 800 }}>WhatsApp Click-to-Chat Link Builder</h2>
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
                    <button onClick={() => window.open(generatedWaUrl, '_blank')} className="btn btn-primary" style={{ padding: '10px 24px' }}>Test Chat Link</button>
                    <button onClick={() => copyToClipboard(generatedWaUrl)} className="btn btn-secondary" style={{ padding: '10px 24px' }}>Copy Link</button>
                    <button onClick={() => { setQrText(generatedWaUrl); setActiveTool('qr'); }} className="btn btn-secondary" style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>Convert to QR Code</span>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
