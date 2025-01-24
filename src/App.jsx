import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Api from './components/api';
import LoaderHome from './Loader';
// import CodeReviewAssistant from './components/CodeAssistant';
import Navbar from './components/navbar';
import ExplorePage from './components/Explore';
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/" />;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };

  if (isLoading) return <LoaderHome />;

  return (
    <Router>
      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
                <Api />
            }
          />
          {/* <Route
            path="/submit-code"
            element={
                <CodeReviewAssistant />  
            }
          /> */}
          <Route
            path="/explore"
            element={<ExplorePage/>

            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
