// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // ✅ Import AOS styles

import EventList from '../components/EventList';
import Feedback from './Feedback'; // ✅ Import Feedback component
import '../styles/Home.css';
import { FaTicketAlt, FaLock, FaCalendarAlt, FaUsers } from 'react-icons/fa';
const Features = () => {
  return (
    <div className="features-section mt-5" data-aos="fade-up">
      <div className="feature-card">
        <FaTicketAlt className="feature-icon yellow" />
        <h3>Easy Booking</h3>
        <p>Book your spot in seconds.</p>
      </div>
      <div className="feature-card">
        <FaLock className="feature-icon green" />
        <h3>Secure Payment</h3>
        <p>Pay safely through QR code.</p>
      </div>
      <div className="feature-card">
        <FaCalendarAlt className="feature-icon blue" />
        <h3>Explore Events</h3>
        <p>Easy to find nearest events.</p>
      </div>
      <div className="feature-card">
        <FaUsers className="feature-icon cyan" />
        <h3>Community Friendly</h3>
        <p>Engage with other attendees.</p>
      </div>
    </div>
  );
};


const Home = () => {
  const [view, setView] = useState('home'); // Options: 'home', 'about', 'events', 'feedback'

  // ✅ Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'about':
        return (
          <section className="about-section container mt-5 text-white text-center" data-aos="fade-up">
            <h2>About Us</h2>
            <p className="lead">
              Welcome to <strong>FUNFUSION</strong>, your ultimate destination for seamless festival and event management.
              We are a modern platform dedicated to bringing together organizers and attendees under one virtual roof.
              Whether it's a cultural fest, music concert, tech fair, or any event — FUNFUSION makes it easy to explore,
              manage, and book your favorite events from anywhere.
              <br /><br />
              Our mission is to simplify event experiences and empower users with a smart, intuitive, and visually rich platform.
              Join us to celebrate, connect, and create memories — because every event deserves a little more FUN and FUSION!
            </p>
            <button className="btn btn-outline-light mt-4" onClick={() => setView('home')}>
              Back to Home
            </button>
          </section>
        );

      case 'events':
        return (
          <section className="event-section container mt-5 text-white" data-aos="fade-up">
            <h2 className="text-center mb-4">Upcoming Festivals & Events</h2>
            <EventList />
            <div className="text-center mt-4">
              <button className="btn btn-outline-light fw-semibold" onClick={() => setView('home')}>
                Back to Home
              </button>
            </div>
          </section>
        );

      case 'feedback':
        return (
          <section className="feedback-section mt-4" data-aos="fade-up">
            <Feedback />
            <div className="text-center mt-4">
              <button className="btn btn-outline-light fw-semibold" onClick={() => setView('home')}>
                Back to Home
              </button>
            </div>
          </section>
        );

      default:
        return (
          <section className="hero-banner d-flex align-items-center justify-content-center flex-column text-white">
            <div className="hero-overlay" />
            <div className="hero-content text-center" data-aos="zoom-in">
              <h1 className="display-4 fw-bold">FUNFUSION</h1>
              <p className="lead fw-bold">Explore and manage all your events in one place.</p>

              <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap" data-aos="fade-up" data-aos-delay="300">
                <button className="admin-style-btn" onClick={() => setView('about')}>
                  About Us
                </button>
                <button className="admin-style-btn" onClick={() => setView('events')}>
                  Get Started
                </button>
                <button className="admin-style-btn" onClick={() => setView('feedback')}>
                  Give Feedback
                </button>
              </div>

              <div className="container text-white mt-5" data-aos="fade-up" data-aos-delay="400">
                <h2 style={{ color: 'white' }}>Why FUNFUSION?</h2>

                <p className="lead text-center">
                  FUNFUSION isn't just a platform, it's an experience! Whether you're planning a cultural fest, 
                  attending a tech summit, or exploring music concerts, our goal is to make your event journey smooth, smart, and spectacular. 
                  From QR-based payments to real-time bookings and community-driven interaction — FUNFUSION brings it all under one digital roof!
                </p>
              </div>

              <section className="features mt-5 d-flex justify-content-center gap-5 flex-wrap text-white">
                <div className="feature-card text-center" data-aos="fade-up" data-aos-delay="100">
                  <h3>🎫 Easy Booking</h3>
                  <p>Book your spot in seconds.</p>
                </div>
                <div className="feature-card text-center" data-aos="fade-up" data-aos-delay="200">
                  <h3>🔒 Secure Payment</h3>
                  <p>Pay safely through UPI/QR.</p>
                </div>
                <div className="feature-card text-center" data-aos="fade-up" data-aos-delay="300">
                  <h3>📅 Explore Events</h3>
                  <p>Find fests near you!</p>
                </div>
              </section>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="home-bg">
      {renderContent()}
      <footer className="footer text-white text-center py-3 mt-5">
        <p className="mb-0">© 2025 EventManager | Powering Festivals Everywhere ✨</p>
        <p className="mb-0">
          📞 Contact us: <a href="tel:+918978689456" className="footer-link">+91 8978689456</a> | 📧
          <a href="mailto:supportfunfusion@gmail.com" className="footer-link ms-1">supportfunfusion@gmail.com</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
 