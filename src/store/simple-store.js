class SimpleStore {
    constructor() {
        // Examples Data
        const initialData = [
            {
                id: '1',
                firstName: 'Ahmet',
                lastName: 'Sourtimes',
                dateOfEmployment: '23.08.2024',
                dateOfBirth: '23.09.2024',
                phone: '+(90) 532 123 45 67',
                email: 'ahmet@sourtimes.org',
                department: 'Analytics',
                position: 'Junior'
            },
            {
                id: '2',
                firstName: 'Mehmet',
                lastName: 'Example',
                dateOfEmployment: '2022-10-15',
                dateOfBirth: '1988-05-12',
                phone: '+(90) 533 987 65 43',
                email: 'mehmet@example.com',
                department: 'Tech',
                position: 'Senior'
            }
        ];

        this._state = {
            employees: this._loadFromStorage() || initialData,
            loading: false,
            error: null
        };

        this._listeners = new Set();
        this._saveToStorage(this._state.employees);
    }

    _loadFromStorage() {
        try {
            const saved = localStorage.getItem('employees');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error('Error loading from storage:', e);
            return null;
        }
    }

    _saveToStorage(employees) {
        try {
            localStorage.setItem('employees', JSON.stringify(employees));
        } catch (e) {
            console.error('Error saving to storage:', e);
        }
    }

    setState(newState) {
        this._state = { ...this._state, ...newState };
        if (newState.employees) {
            this._saveToStorage(newState.employees);
        }
        this._notify();
    }

    getState() {
        return this._state;
    }

    subscribe(listener) {
        this._listeners.add(listener);
        return () => this._listeners.delete(listener);
    }

    _notify() {
        this._listeners.forEach(listener => listener(this._state));
    }

    isEmployeeExists(firstName, lastName, excludeId = null) {
        return this._state.employees.some(emp =>
            emp.firstName.toLowerCase() === firstName.toLowerCase() &&
            emp.lastName.toLowerCase() === lastName.toLowerCase() &&
            emp.id !== excludeId
        );
    }

    // Employee Functions
    addEmployee(employee) {
        if (this.isEmployeeExists(employee.firstName, employee.lastName)) {
            throw new Error('employeeAlreadyExists');
        }
        const newEmployee = {
            ...employee,
            id: Date.now().toString()
        };
        const employees = [...this._state.employees, newEmployee];
        this.setState({ employees });
        this._saveToStorage(employees);
        return newEmployee;
    }

    updateEmployee(updatedEmployee) {
        if (this.isEmployeeExists(
            updatedEmployee.firstName,
            updatedEmployee.lastName,
            updatedEmployee.id
        )) {
            throw new Error('employeeAlreadyExists');
        }
        const employees = this._state.employees.map(emp =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
        );
        this.setState({ employees });
        this._saveToStorage(employees);
        return updatedEmployee;
    }

    deleteEmployee(id) {
        const employees = this._state.employees.filter(emp => emp.id !== id);
        this.setState({ employees });
    }

    setError(error) {
        this.setState({ error });
    }

    setLoading(loading) {
        this.setState({ loading });
    }
}

export const store = new SimpleStore();