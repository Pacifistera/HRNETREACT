import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import './EmployeeList.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(
      localStorage.getItem('employees') || '[]'
    );
    setEmployees(storedEmployees);
  }, []);

  const columns = [
    { name: 'Prénom', selector: (row) => row.firstName, sortable: true },
    { name: 'Nom', selector: (row) => row.lastName, sortable: true },
    { name: 'Date de début', selector: (row) => row.startDate, sortable: true },
    { name: 'Département', selector: (row) => row.department, sortable: true },
    {
      name: 'Date de naissance',
      selector: (row) => row.dateOfBirth,
      sortable: true,
    },
    { name: 'Rue', selector: (row) => row.street },
    { name: 'Ville', selector: (row) => row.city, sortable: true },
    { name: 'État', selector: (row) => row.state, sortable: true },
    { name: 'Code postal', selector: (row) => row.zipCode },
  ];

  return (
    <div className="employee-list-container">
      <h1>Liste des employés actuels</h1>
      <DataTable
        columns={columns}
        data={employees}
        pagination
        responsive
        striped
        highlightOnHover
      />
      <Link to="/" className="home-link">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default EmployeeList;
