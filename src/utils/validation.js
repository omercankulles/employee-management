export const validators = {
    required: (value) => {
        return value && value.trim() !== '' ? null : 'required';
    },

    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? null : 'invalidEmail';
    },

    phone: (value) => {
        const phoneRegex = /^\+\(\d{2}\)\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/;
        return phoneRegex.test(value) ? null : 'invalidPhone';
    },

    uniqueEmail: (value, employees, currentId = null) => {
        const exists = employees.some(emp =>
            emp.email === value && emp.id !== currentId
        );
        return exists ? 'emailTaken' : null;
    }
};

export const validateEmployee = (employee, employees, isEdit = false) => {
    const errors = {};

    // Required validations
    ['firstName', 'lastName', 'dateOfEmployment', 'dateOfBirth',
        'phone', 'email', 'department', 'position'].forEach(field => {
        const error = validators.required(employee[field]);
        if (error) errors[field] = error;
    });

    // Email validation
    if (!errors.email) {
        const emailError = validators.email(employee.email);
        if (emailError) errors.email = emailError;
        else if (!isEdit) {
            const uniqueError = validators.uniqueEmail(employee.email, employees);
            if (uniqueError) errors.email = uniqueError;
        }
    }

    // Phone validation
    if (!errors.phone) {
        const phoneError = validators.phone(employee.phone);
        if (phoneError) errors.phone = phoneError;
    }

    return errors;
};