import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppBubble from './components/WhatsAppBubble';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Contact from './pages/Contact';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // 1. Handle scroll (either hash scrolling or top scrolling)
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }

    // 2. Initialize scroll reveals (deferred to prevent blocking UI thread and INP issues)
    let revealObserver;
    const observerTimeout = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal');
      revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(element => {
        revealObserver.observe(element);
      });
    }, 100);

    // 3. Sticky header listener
    const header = document.getElementById('header');
    let scrollTimeout;
    const handleScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = requestAnimationFrame(() => {
          if (header) {
            if (window.scrollY > 20) {
              header.classList.add('header-scrolled');
            } else {
              header.classList.remove('header-scrolled');
            }
          }
          scrollTimeout = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial state

    return () => {
      clearTimeout(observerTimeout);
      if (revealObserver) {
        revealObserver.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, location.hash]);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:toolId" element={<Tools />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppBubble />
    </>
  );
}
