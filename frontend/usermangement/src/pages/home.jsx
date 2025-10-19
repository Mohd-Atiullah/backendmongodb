import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  // logout handler
  const handleLogout = () => {
    // optional: clear any auth token or user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // navigate to login page
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="logo">MyApp</h1>
        <nav>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main className="home-content">
        <h2>Welcome to the Home Page 🎉</h2>
        <p>You are successfully logged in.</p>
      </main>
    </div>
  );
};

export default Home;
