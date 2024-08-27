import React from 'react';
import './Home.module.css';
import About from '../About/About';
import Problems from '../Problems/Problems';
import Contact from '../Contact/Contact';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to CoderArena!</h1>
        <h1> UNDERWORK </h1>
        <p className="home-text">
          Start your coding journey with us. Solve problems, compete with peers, and enhance your skills. 
        </p>
        <button className="cta-button">Get Started</button>
      </div>
      <About />
      <Problems />
      <Contact />
    </div>
    
  );
};

export default Home;
