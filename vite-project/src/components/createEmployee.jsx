import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateEmployee() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: 'Sales',
  });

  const departments = [
    'Sales',
    'Marketing',
    'Engineering',
    'Human Resources',
    'Legal',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour sauvegarder l'employé
    console.log('Employee data:', formData);
    // Afficher une modal de confirmation
  };

  return (
    <form className="create-employee-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">Prénom</label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">Date de naissance</label>
        <DatePicker
          selected={formData.dateOfBirth}
          onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Date de début</label>
        <DatePicker
          selected={formData.startDate}
          onChange={(date) => setFormData({ ...formData, startDate: date })}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <fieldset className="address">
        <legend>Adresse</legend>

        <div className="form-group">
          <label htmlFor="street">Rue</label>
          <input
            type="text"
            id="street"
            value={formData.street}
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">Ville</label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">État</label>
          <select
            id="state"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
          >
            {/* Liste des états à ajouter */}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">Code postal</label>
          <input
            type="number"
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
          />
        </div>
      </fieldset>

      <div className="form-group">
        <label htmlFor="department">Département</label>
        <select
          id="department"
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Enregistrer</button>
    </form>
  );
}

export default CreateEmployee;
