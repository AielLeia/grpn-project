import React from 'react';
import '../../App.css';
import RecherchePseudo from '../RecherchePseudo';

export default function Home() {
  return (
    <div className='home'>
      <h1 >Formation DB</h1>
      <RecherchePseudo></RecherchePseudo>
    </div>
  );
}