import { LitElement, html, css } from 'lit';
import { BaseComponent } from '../base-component.js';
import { store } from '../../store/simple-store.js';

export class EmployeeForm extends BaseComponent {
    static styles = css`
        :host {
            display: block;
            background: #f8f9fa;
            padding: 24px;
        }

        .form-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
            overflow: hidden;
        }

        .form-header {
            padding: 20px 24px;
            border-bottom: 1px solid #eee;
        }

        .header-title {
            color: #FF4F00;
            font-size: 24px;
            margin: 0;
            font-weight: normal;
        }

        .form-content {
            padding: 24px;
        }

        .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        label {
            font-size: 14px;
            color: #444;
            font-weight: 500;
        }

        .required::after {
            content: "*";
            color: #FF4F00;
            margin-left: 4px;
        }

        input, select {
            padding: 10px 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            color: #333;
            background: white;
        }

        input:focus, select:focus {
            outline: none;
            border-color: #FF4F00;
            box-shadow: 0 0 0 3px rgba(255, 79, 0, 0.1);
        }

        .error-message {
            color: #dc3545;
            font-size: 12px;
            margin-top: 4px;
        }

        .form-actions {
            padding: 24px;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            background: #f8f9fa;
        }

        .cancel-btn {
            padding: 10px 24px;
            border: 1px solid #ddd;
            background: white;
            color: #666;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }

        .cancel-btn:hover {
            background: #f5f5f5;
        }

        .save-btn {
            padding: 10px 24px;
            background: #FF4F00;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }

        .save-btn:hover {
            background: #e64500;
        }

        .save-btn:disabled {
            background: #ffd1c1;
            cursor: not-allowed;
        }

        @media (max-width: 768px) {
            :host {
                padding: 16px;
                height: 550px;
            }

            .form-grid {
                grid-template-columns: 1fr;
            }

            .form-actions {
                flex-direction: column;
            }

            .form-actions button {
                width: 100%;
            }
        }
    `;

    static properties = {
        mode: { type: String },
        employee: { type: Object },
        errors: { type: Object },
        formData: { type: Object }
    };

    constructor() {
        super();
        this.mode = 'create';
        this.employee = null;
        this.errors = {};
        this.formData = this._getInitialFormData();
    }

    firstUpdated() {
        if (this.mode === 'edit' && this.employee) {
            this.formData = { ...this.employee };
        }
    }

    updated(changedProperties) {
        if (changedProperties.has('employee') && this.employee) {
            this.formData = { ...this.employee };
        }
    }

    _getInitialFormData() {
        return {
            firstName: '',
            lastName: '',
            dateOfEmployment: '',
            dateOfBirth: '',
            phone: '',
            email: '',
            department: 'Analytics',
            position: 'Junior'
        };
    }

    connectedCallback() {
        super.connectedCallback();
        if (this.mode === 'edit' && this.employeeId) {
            this._loadEmployee();
        }
    }

    async _loadEmployee() {
        const employee = store.getState().employees.find(emp => emp.id === this.employeeId);
        if (employee) {
            this.formData = { ...employee };
        }
    }

    _handleInput(e) {
        const { name, value } = e.target;
        this.formData = {
            ...this.formData,
            [name]: value
        };
        // Clear error when user starts typing
        if (this.errors[name]) {
            this.errors = {
                ...this.errors,
                [name]: ''
            };
        }
    }

    _validateForm() {
        const errors = {};

        // Required field validations
        const requiredFields = [
            'firstName', 'lastName', 'dateOfEmployment',
            'dateOfBirth', 'phone', 'email'
        ];

        requiredFields.forEach(field => {
            if (!this.formData[field]) {
                errors[field] = this.t('required');
            }
        });

        // Email validation
        if (this.formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
            errors.email = this.t('invalidEmail');
        }

        // Phone validation
        if (this.formData.phone && !/^\+\(\d{2}\)\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(this.formData.phone)) {
            errors.phone = this.t('invalidPhone');
        }

        return errors;
    }

    async _handleSubmit(e) {
        e.preventDefault();

        const errors = this._validateForm();
        if (Object.keys(errors).length > 0) {
            this.errors = errors;
            return;
        }

        try {
            const eventDetail = {
                employee: {
                    ...this.formData,
                    id: this.mode === 'edit' ? this.employee.id : Date.now().toString()
                },
                mode: this.mode
            };

            this.dispatchEvent(new CustomEvent('employee-saved', {
                detail: eventDetail,
                bubbles: true,
                composed: true
            }));
        } catch (error) {
            console.error('Form submit error:', error);
            this.errors = { submit: error.message };
        }
    }

    render() {
        return html`
            <div class="form-container">
                <form @submit=${this._handleSubmit}>
                    <div class="form-content">
                        <div class="form-grid">
                            <!-- First Name -->
                            <div class="form-group">
                                <label class="required" for="firstName">
                                    ${this.t('firstName')}
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    .value=${this.formData.firstName}
                                    @input=${this._handleInput}
                                    ?disabled=${this.loading}
                                >
                                ${this.errors.firstName
            ? html`<span class="error-message">${this.errors.firstName}</span>`
            : ''}
                            </div>

                            <!-- Last Name -->
                            <div class="form-group">
                                <label class="required" for="lastName">
                                    ${this.t('lastName')}
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    .value=${this.formData.lastName}
                                    @input=${this._handleInput}
                                    ?disabled=${this.loading}
                                >
                                ${this.errors.lastName
            ? html`<span class="error-message">${this.errors.lastName}</span>`
            : ''}
                            </div>

                            <!-- Date of Employment -->
                            <div class="form-group">
                                <label class="required" for="dateOfEmployment">
                                    ${this.t('dateOfEmployment')}
                                </label>
                                <input
                                    type="date"
                                    id="dateOfEmployment"
                                    name="dateOfEmployment"
                                    .value=${this.formData.dateOfEmployment}
                                    @input=${this._handleInput}
                                    ?disabled=${this.loading}
                                >
                                ${this.errors.dateOfEmployment
            ? html`<span class="error-message">${this.errors.dateOfEmployment}</span>`
            : ''}
                            </div>

                            <!-- Date of Birth -->
                            <div class="form-group">
                                <label class="required" for="dateOfBirth">
                                    ${this.t('dateOfBirth')}
                                </label>
                                <input
                                    type="date"
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    .value=${this.formData.dateOfBirth}
                                    @input=${this._handleInput}
                                    ?disabled=${this.loading}
                                >
                                ${this.errors.dateOfBirth
            ? html`<span class="error-message">${this.errors.dateOfBirth}</span>`
            : ''}
                            </div>

                            <!-- Phone -->
                            <div class="form-group">
                                <label class="required" for="phone">
                                    ${this.t('phone')}
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    .value=${this.formData.phone}
                                    @input=${this._handleInput}
                                    placeholder="+(90) 532 123 45 67"
                                    ?disabled=${this.loading}
                                >
                                ${this.errors.phone
            ? html`<span class="error-message">${this.errors.phone}</span>`
            : ''}
                            </div>

                            <!-- Email -->
                            <div class="form-group">
                                <label class="required" for="email">
                                    ${this.t('email')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    .value=${this.formData.email}
                                    @input=${this._handleInput}
                                    ?disabled=${this.loading}
                                >
                                ${this.errors.email
            ? html`<span class="error-message">${this.errors.email}</span>`
            : ''}
                            </div>

                            <!-- Department -->
                            <div class="form-group">
                                <label class="required" for="department">
                                    ${this.t('department')}
                                </label>
                                <select
                                    id="department"
                                    name="department"
                                    .value=${this.formData.department}
                                    @change=${this._handleInput}
                                    ?disabled=${this.loading}
                                >
                                    <option value="Analytics">Analytics</option>
                                    <option value="Tech">Tech</option>
                                </select>
                            </div>

                            <!-- Position -->
                            <div class="form-group">
                                <label class="required" for="position">
                                    ${this.t('position')}
                                </label>
                                <select
                                    id="position"
                                    name="position"
                                    .value=${this.formData.position}
                                    @change=${this._handleInput}
                                    ?disabled=${this.loading}
                                >
                                    <option value="Junior">Junior</option>
                                    <option value="Medior">Medior</option>
                                    <option value="Senior">Senior</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button 
                            type="button" 
                            class="cancel-btn"
                            @click=${() => this.dispatchEvent(new CustomEvent('cancel', {
            bubbles: true,
            composed: true
        }))}
                            ?disabled=${this.loading}
                        >
                            ${this.t('cancel')}
                        </button>
                        <button 
                            type="submit" 
                            class="save-btn"
                            ?disabled=${this.loading}
                        >
                            ${this.loading
            ? this.t('saving')
            : this.mode === 'create'
                ? this.t('create')
                : this.t('edit')}
                        </button>
                    </div>
                </form>
            </div>
        `;
    }
}

customElements.define('employee-form', EmployeeForm);