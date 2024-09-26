import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Optional styling for the landing page

const LandingPage = () => (
  <div className="landing-page">
    <title>Live Audience | proto</title>
    <img src="/Images/trans_l_a_logo.png" alt="LA Logo" name="logo" />
    <p></p>
    <Link to="/test">
      <button className="start-btn">Begin</button>
    </Link>
  </div>
);

export default LandingPage;
