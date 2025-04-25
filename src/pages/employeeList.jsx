import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Pour lire les données du store
import { Link } from 'react-router';
import DataTable from 'react-data-table-component';
import '../styles/employeeList.scss';
import { deleteEmployee } from '../store/employeeSlice';
import { StyleSheetManager } from 'styled-components';

function EmployeeList() {
  const dispatch = useDispatch(); // Ajout du dispatch
  // useSelector nous donne accès aux données
  const employees = useSelector((state) => state.employees.employees);
  const [filterText, setFilterText] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // fonction pour filtrer les données
  const filteredData = employees.filter((item) => {
    return Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(filterText.toLowerCase())
    );
  });

  // Fonction pour gérer la suppression
  const handleDelete = (row) => {
    console.log('ID à supprimer:', row.id);
    setEmployeeToDelete(row);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      console.log('Confirmation de suppression ID:', employeeToDelete.id);
      dispatch(deleteEmployee(employeeToDelete.id));
      setShowConfirmation(false);
      setEmployeeToDelete(null);
    }
  };

  // Fonction pour formater les dates
  const formatDate = (date) => {
    if (!date) return '-';
    // Si la date est une chaîne, on la parse d'abord
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const columns = [
    {
      name: 'Prénom',
      selector: (row) => row.firstName || '-',
      sortable: true,
    },
    {
      name: 'Nom',
      selector: (row) => row.lastName || '-',
      sortable: true,
    },
    {
      name: 'Date de début',
      selector: (row) => formatDate(row.startDate),
      sortable: true,
      sortFunction: (a, b) => {
        if (!a.startDate || !b.startDate) return 0;
        return new Date(a.startDate) - new Date(b.startDate);
      },
    },
    {
      name: 'Département',
      selector: (row) => row.department || '-',
      sortable: true,
    },
    {
      name: 'Date de naissance',
      selector: (row) => formatDate(row.dateOfBirth),
      sortable: true,
      sortFunction: (a, b) => {
        if (!a.dateOfBirth || !b.dateOfBirth) return 0;
        return new Date(a.dateOfBirth) - new Date(b.dateOfBirth);
      },
    },
    {
      name: 'Rue',
      selector: (row) => row.street || '-',
    },
    {
      name: 'Ville',
      selector: (row) => row.city || '-',
      sortable: true,
    },
    {
      name: 'État',
      selector: (row) => row.state || '-',
      sortable: true,
    },
    {
      name: 'Code postal',
      selector: (row) => row.zipCode || '-',
    },

    {
      name: 'Actions',
      cell: (row) => (
        <button
          onClick={() => handleDelete(row)}
          className="delete-btn"
          aria-label="Supprimer"
        >
          ✕
        </button>
      ),
    },
  ];

  return (
    <div className="employee-list-container">
      <h1>Liste des employés actuels</h1>
      <StyleSheetManager
        shouldForwardProp={(prop) => !['align'].includes(prop)}
      >
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          responsive
          striped
          highlightOnHover
          noDataComponent="Aucun employé trouvé"
          paginationComponentOptions={{
            rowsPerPageText: 'Lignes par page:',
            rangeSeparatorText: 'sur',
            selectAllRowsItem: true,
            selectAllRowsItemText: 'Tous',
          }}
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Rechercher..."
              className="search-input"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          }
          fixedHeader
          fixedHeaderScrollHeight="400px"
        />
      </StyleSheetManager>
      <Link to="/" className="home-link">
        Retour à l'accueil
      </Link>
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="confirmation-dialog">
            <p>Êtes-vous sûr de vouloir supprimer cet employé ?</p>
            <div className="dialog-buttons">
              <button
                className="cancel"
                onClick={() => setShowConfirmation(false)}
              >
                Annuler
              </button>
              <button className="confirm" onClick={confirmDelete}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
