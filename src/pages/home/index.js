import React, { useEffect } from 'react';
import './style.css';
import { Covid } from '../../assets';

const Home = () => {
  useEffect(() => {
    document.title = 'Covid-19 - Home';
  });
  return (
    <div className="text-center pageHome-wrapper">
      <div className="centered">Welcome</div>
      <img className="pageHome-img1" alt="background1" src={Covid} />
    </div>
  );
};

export default Home;
