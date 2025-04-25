import React, { useState } from 'react';
import CreateEmployee from '../components/createEmployee';

function Home() {
  return (
    <div className="main">
      <div className="home">
        <h2>Créer un employé</h2>
        <CreateEmployee />
      </div>
    </div>
  );
}

export default Home;
