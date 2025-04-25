import React from 'react';
import { Link } from 'react-router';
import '../styles/header.scss';

function Header() {
  return (
    <header className="header">
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/employee-list">Liste des employés</Link>
      </nav>
    </header>
  );
}

export default Header;
