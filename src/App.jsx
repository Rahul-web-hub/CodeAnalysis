import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Api from './components/api';
import Navbar from './components/navbar';
import WelcomePage from './components/WelcomePage';
import LoaderHome from "./Loader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("App mounted, isLoading:", isLoading);
    const timer = setTimeout(() => {
      console.log("Timer finished, setting isLoading to false");
      setIsLoading(false);
    }, 6000);

    return () => {
      console.log("Cleaning up timer");
      clearTimeout(timer);
    };
  }, []);

  console.log("Rendering App, isLoading:", isLoading);

  if (isLoading) {
    return <LoaderHome />;
  }

  return (
      <Api />
  );
}

export default App;