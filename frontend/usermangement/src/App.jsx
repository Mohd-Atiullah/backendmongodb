import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
    this.setState({ info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h2>Something went wrong</h2>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#c00' }}>
            {String(this.state.error)}
            {this.state.info ? '\n' + JSON.stringify(this.state.info, null, 2) : ''}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div>
          <nav style={{ padding: '10px', background: '#f5f6fa' }}>
            <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/">Home</Link>
          </nav>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
