import React, { useState } from 'react';
import CreateEmployee from '../../components/CreateEmployee';

function Home() {
  return (
    <div className="home">
      <h2>Créer un employé</h2>
      <CreateEmployee />
    </div>
  );
}

export default Home;
