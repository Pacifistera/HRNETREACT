export const validateField = (name, value) => {
  switch (name) {
    case 'firstName':
      if (!value.trim()) return 'Le prénom est requis';
      if (value.trim().length < 2)
        return 'Le prénom doit contenir au moins 2 caractères';
      if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(value.trim()))
        return 'Le prénom ne doit contenir que des lettres';
      return '';

    case 'lastName':
      if (!value.trim()) return 'Le nom est requis';
      if (value.trim().length < 2)
        return 'Le nom doit contenir au moins 2 caractères';
      if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(value))
        return 'Le nom ne doit contenir que des lettres';
      return '';

    case 'dateOfBirth':
      if (!value) return 'La date de naissance est requise';
      return '';

    case 'startDate':
      if (!value) return 'La date de début est requise';
      return '';

    case 'street':
      if (!value.trim()) return 'La rue est requise';
      if (value.trim().length < 5)
        return "L'adresse doit contenir au moins 5 caractères";
      return '';

    case 'city':
      if (!value.trim()) return 'La ville est requise';
      if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(value))
        return 'La ville ne doit contenir que des lettres';
      return '';

    case 'state':
      if (!value) return "L'état est requis";
      return '';

    case 'zipCode':
      if (!value) return 'Le code postal est requis';
      if (!/^\d{5}$/.test(value))
        return 'Le code postal doit contenir exactement 5 chiffres';
      return '';

    case 'department':
      if (!value) return 'Le département est requis';
      return '';

    default:
      return '';
  }
};

export const validateForm = (
  formData,
  dispatch,
  addEmployee,
  setEmployeeName,
  setIsModalOpen,
  setErrors,
  resetForm
) => {
  const errors = {};

  // Vérifie chaque champ
  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key]);
    if (error) {
      errors[key] = error;
    }
  });

  // Si erreurs, retourne false
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return false;
  }

  // Convertir les dates en string avant le dispatch
  const serializedData = {
    ...formData,
    id: Date.now().toString(), // On garde uniquement cette génération d'ID
    dateOfBirth: formData.dateOfBirth
      ? formData.dateOfBirth.toISOString()
      : null,
    startDate: formData.startDate ? formData.startDate.toISOString() : null,
  };

  // Si tout est valide, soumet le formulaire
  dispatch(addEmployee(serializedData)); // On utilise directement serializedData
  setEmployeeName(`${formData.firstName} ${formData.lastName}`);
  setIsModalOpen(true);
  resetForm();
  return true;
};
