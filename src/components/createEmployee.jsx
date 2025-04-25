import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../store/employeeSlice';
import DatePicker from 'react-datepicker';
import { states } from '../data/states'; // Import de notre liste d'états
import Modal from '@pacifister/react-modal-hrnet';
import '@pacifister/react-modal-hrnet/dist/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/createEmployee.scss';
import { validateForm } from '../utils/formValidation';

function CreateEmployee() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState('');

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

  const [errors, setFormErrors] = useState({});

  const departments = [
    'Sales',
    'Marketing',
    'Engineering',
    'Human Resources',
    'Legal',
  ];

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormErrors({});
    setFormData({
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm(
      formData,
      dispatch,
      addEmployee,
      setEmployeeName,
      setIsModalOpen,
      setFormErrors,
      () =>
        setFormData({
          firstName: '',
          lastName: '',
          dateOfBirth: null,
          startDate: null,
          street: '',
          city: '',
          state: '',
          zipCode: '',
          department: 'Sales',
        })
    );
  };

  return (
    <>
      <form className="create-employee-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            id="firstName"
            className={errors.firstName ? 'error' : ''}
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          {errors.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Nom</label>
          <input
            type="text"
            id="lastName"
            className={errors.lastName ? 'error' : ''}
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          {errors.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date de naissance</label>
          <DatePicker
            id="dateOfBirth"
            selected={formData.dateOfBirth}
            onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
            dateFormat="dd/MM/yyyy"
          />
          {errors.dateOfBirth && (
            <span className="error-message">{errors.dateOfBirth}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Date de début</label>
          <DatePicker
            id="startDate"
            selected={formData.startDate}
            onChange={(date) => setFormData({ ...formData, startDate: date })}
            dateFormat="dd/MM/yyyy"
          />
          {errors.startDate && (
            <span className="error-message">{errors.startDate}</span>
          )}
        </div>

        <fieldset className="address">
          <legend>Adresse</legend>

          <div className="form-group">
            <label htmlFor="street">Rue</label>
            <input
              type="text"
              id="street"
              className={errors.street ? 'error' : ''}
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
            />
            {errors.street && (
              <span className="error-message">{errors.street}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="city">Ville</label>
            <input
              type="text"
              id="city"
              className={errors.city ? 'error' : ''}
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
            {errors.city && (
              <span className="error-message">{errors.city}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="state">État</label>
            <select
              id="state"
              className={errors.state ? 'error' : ''}
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
            >
              <option value="">Sélectionnez un état</option>
              {states.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && (
              <span className="error-message">{errors.state}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">Code postal</label>
            <input
              type="number"
              id="zipCode"
              className={errors.zipCode ? 'error' : ''}
              value={formData.zipCode}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
            />
            {errors.zipCode && (
              <span className="error-message">{errors.zipCode}</span>
            )}
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={
          <span>
            L'employé <span className="bold">{employeeName}</span> a été créé
            avec succès !
          </span>
        }
      />
    </>
  );
}

export default CreateEmployee;
