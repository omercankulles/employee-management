import { html, css } from 'lit';
import { BaseComponent } from '../base-component.js';
import { store } from '../../store/simple-store.js';

export class EmployeeList extends BaseComponent {
    static styles = css`
        :host {
            display: block;
            background: #f8f9fa;
            padding: 24px;
        }
        
        /* Header Styles */

        .list-header {
            padding: 20px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #eee;
        }

        .title {
            font-size: 24px;
            color: #FF4F00;
            margin: 0;
            font-weight: normal;
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .list-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
            overflow: hidden;
        }

        /* View Toggle Styles */

        .view-toggle {
            display: flex;
            align-items: center;
            background: #f8f8f8;
            padding: 4px;
            border-radius: 6px;
        }

        .view-btn {
            padding: 6px;
            background: none;
            border: none;
            cursor: pointer;
            color: #666;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .view-btn:hover {
            color: #FF4F00;
        }

        .view-btn.active {
            background: white;
            color: #FF4F00;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        /* Search Box Styles */

        .search-box {
            padding: 16px 24px;
            border-bottom: 1px solid #eee;
        }

        .search-input {
            width: 100%;
            max-width: 300px;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
        }

        .search-input:focus {
            outline: none;
            border-color: #FF4F00;
        }

        /* Table Styles */

        .table-container {
            width: 100%;
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            text-align: left;
            padding: 12px 16px;
            color: #FF4F00;
            font-weight: normal;
            border-bottom: 1px solid #eee;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        td {
            padding: 12px 16px;
            border-bottom: 1px solid #eee;
            font-size: 14px;
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        tr:hover {
            background: #fafafa;
        }

        .actions {
            display: flex;
            gap: 8px;
        }

        .action-btn {
            padding: 4px 8px;
            background: none;
            border: none;
            cursor: pointer;
            color: #666;
            border-radius: 4px;
            font-size: 16px;
        }

        .action-btn:hover {
            color: #FF4F00;
            background: #fff5f2;
        }

        /* Grid Styles */

        .grid-container {
            padding: 24px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 24px;
            background: #f8f9fa;
        }

        .employee-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            border: 1px solid #eef0f2;
        }

        .employee-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 20px rgba(0,0,0,0.08);
        }

        .card-header {
            padding: 20px;
            background: white;
            border-bottom: 1px solid #eef0f2;
        }

        .card-header h3 {
            margin: 0;
            font-size: 16px;
            color: #2c3e50;
            font-weight: 500;
        }

        .card-header p {
            margin: 8px 0 0;
            color: #FF4F00;
            font-size: 14px;
        }

        .card-content {
            padding: 20px;
        }

        .info-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            color: #64748b;
        }

        .info-icon {
            width: 16px;
            height: 16px;
            color: #94a3b8;
        }

        .info-text {
            font-size: 14px;
            line-height: 1.5;
        }

        .card-footer {
            padding: 16px 20px;
            background: #f8fafc;
            border-top: 1px solid #eef0f2;
            display: flex;
            justify-content: flex-end;
            gap: 12px;
        }

        .card-btn {
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .edit-btn {
            background: white;
            color: #64748b;
            border: 1px solid #e2e8f0;
        }

        .edit-btn:hover {
            border-color: #FF4F00;
            color: #FF4F00;
        }

        .delete-btn {
            background: #fff1f2;
            color: #ef4444;
            border: 1px solid #fecdd3;
        }

        .delete-btn:hover {
            background: #fee2e2;
            border-color: #ef4444;
        }

        /* Modal styles */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            padding: 20px;
        }

        .modal {
            background: white;
            border-radius: 12px;
            width: 650px;
            max-width: 100%;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            animation: modalEnter 0.3s ease-out;
            overflow-y: auto; 
            position: relative;
        }
        
        @keyframes modalEnter {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .modal-header {
            padding: 16px 24px;
            border-bottom: 1px solid #eef0f2;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-title {
            color: #FF4F00;
            font-size: 18px;
            margin: 0;
            font-weight: 500;
        }

        .modal-close {
            background: none;
            border: none;
            color: #94a3b8;
            font-size: 20px;
            cursor: pointer;
            padding: 4px;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            transition: all 0.2s ease;
        }

        .modal-close:hover {
            background: #f1f5f9;
            color: #64748b;
        }

        .modal-content {
            padding: 24px;
            color: #334155;
            font-size: 14px;
            line-height: 1.5;
        }

        .modal-actions {
            padding: 0 24px 24px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .proceed-btn {
            background: #FF4F00;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            width: 100%;
            font-weight: 500;
            transition: background 0.2s ease;
        }

        .proceed-btn:hover {
            background: #e64500;
        }

        .cancel-btn {
            background: white;
            color: #475569;
            border: 1px solid #e2e8f0;
            padding: 12px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            width: 100%;
            font-weight: 500;
            transition: all 0.2s ease;
        }

        .cancel-btn:hover {
            background: #f8fafc;
            border-color: #cbd5e1;
            color: #334155;
        }

        /* Checkbox Styles */
        input[type="checkbox"] {
            appearance: none;
            -webkit-appearance: none;
            width: 22px;
            height: 22px;
            border: 2px solid #ddd;
            border-radius: 4px;
            background-color: white;
            cursor: pointer;
            position: relative;
            transition: all 0.2s ease;
            margin: 0;
            padding: 0;
        }

        input[type="checkbox"]:hover {
            border-color: #FF4F00;
        }

        input[type="checkbox"]:checked {
            background-color: #FF4F00;
            border-color: #FF4F00;
        }

        input[type="checkbox"]:checked::after {
            content: '';
            position: absolute;
            left: 5px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }

        input[type="checkbox"]:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(255, 79, 0, 0.2);
        }

        input[type="checkbox"]:disabled {
            background-color: #f5f5f5;
            border-color: #ddd;
            cursor: not-allowed;
        }

        .checkbox-wrapper {
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        @keyframes checkmark {
            0% {
                transform: rotate(45deg) scale(0);
                opacity: 0;
            }
            100% {
                transform: rotate(45deg) scale(1);
                opacity: 1;
            }
        }

        input[type="checkbox"]:checked::after {
            animation: checkmark 0.2s ease-in-out forwards;
        }

        @media (max-width: 768px) {
            .modal {
                width: 100%;
                min-height: 200px;
            }

            .modal-actions {
                padding: 0 16px 16px;
            }
        }

        /* Pagination */

        .pagination {
            padding: 16px;
            display: flex;
            justify-content: center;
            gap: 4px;
        }

        .page-btn {
            min-width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #eee;
            background: white;
            cursor: pointer;
            border-radius: 4px;
            color: #666;
            font-size: 14px;
        }

        .page-btn:hover {
            border-color: #FF4F00;
            color: #FF4F00;
        }

        .page-btn.active {
            background: #FF4F00;
            color: white;
            border-color: #FF4F00;
        }

        .page-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* Table Button Styles */

        .btn {
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            border: none;
            font-size: 14px;
        }

        .btn-primary {
            background: #FF4F00;
            color: white;
        }

        .btn-primary:hover {
            background: #e64500;
        }

        .btn-secondary {
            background: #f5f5f5;
            color: #333;
        }

        .btn-secondary:hover {
            background: #eee;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {

            :host {
                padding: 16px;
            }

            .grid-container {
                padding: 16px;
                grid-template-columns: 1fr;
            }

            .employee-card:hover {
                transform: none;
            }
            
            .list-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 16px;
            }

            .header-actions {
                width: 100%;
                justify-content: space-between;
            }

            .search-box {
                padding: 12px;
            }

            .search-input {
                max-width: 100%;
            }

            td, th {
                padding: 12px;
            }
        }

        /* Loading & Error States */

        .loading, .error {
            padding: 24px;
            text-align: center;
            color: #666;
        }

        .error {
            color: #dc3545;
        }
    `;

    static properties = {
        employees: { type: Array },
        viewType: { type: String },
        loading: { type: Boolean },
        error: { type: String },
        searchTerm: { type: String },
        currentPage: { type: Number },
        itemsPerPage: { type: Number },
        showDeleteModal: { type: Boolean },
        selectedEmployee: { type: Object },
        showFormModal: { type: Boolean },
        formMode: { type: String }
    };

    constructor() {
        super();
        this.employees = [];
        this.viewType = 'table';
        this.loading = false;
        this.error = null;
        this.searchTerm = '';
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.showDeleteModal = false;
        this.selectedEmployee = null;
        this.showFormModal = false;
        this.formMode = 'create';

        // Get Data
        const state = store.getState();
        this.employees = state.employees;

        this._unsubscribe = store.subscribe(state => {
            this.employees = state.employees;
            this.loading = state.loading;
            this.error = state.error;
            this.requestUpdate();
        });

        this._handleAddFromHeader = this._handleAddFromHeader.bind(this);
        document.addEventListener('add-employee', this._handleAddFromHeader);
    }

    connectedCallback() {
        super.connectedCallback();
        this._loadEmployees();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._unsubscribe) {
            this._unsubscribe();
        }
        document.removeEventListener('add-employee', this._handleAddFromHeader);
    }

    async _loadEmployees() {
        store.setLoading(true);
        try {
            // Initial load from localStorage is handled by store
            store.setLoading(false);
        } catch (error) {
            store.setError(error.message);
        }
    }

    get filteredEmployees() {
        return this.employees.filter(employee => {
            const searchTermLower = this.searchTerm.toLowerCase();
            return (
                employee.firstName.toLowerCase().includes(searchTermLower) ||
                employee.lastName.toLowerCase().includes(searchTermLower) ||
                employee.email.toLowerCase().includes(searchTermLower) ||
                employee.department.toLowerCase().includes(searchTermLower)
            );
        });
    }

    get paginatedEmployees() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredEmployees.slice(start, end);
    }

    _handleSearch(e) {
        this.searchTerm = e.target.value;
        this.currentPage = 1;
    }

    _handleAddFromHeader() {
        this.formMode = 'create';
        this.selectedEmployee = null;
        this.showFormModal = true;
    }

    async _handleEmployeeSaved(event) {
        const savedEmployee = event.detail.employee;

        try {
            if (this.formMode === 'edit') {
                if (!confirm(this.t('confirmUpdate'))) {
                    return;
                }
            }

            if (this.formMode === 'edit') {
                await store.updateEmployee(savedEmployee);
            } else {
                await store.addEmployee(savedEmployee);
            }

            this._closeFormModal();

        } catch (error) {
            if (error.message === 'employeeAlreadyExists') {
                alert(this.t('employeeAlreadyExists'));
            } else {
                console.error('Error saving employee:', error);
                alert(this.t('savingError'));
            }
        }
    }

    async _handleEdit(employee) {
        try {

            const currentEmployee = store.getState().employees.find(emp => emp.id === employee.id);
            if (!currentEmployee) {
                throw new Error('Employee not found');
            }

            this.formMode = 'edit';
            this.selectedEmployee = { ...currentEmployee };
            this.showFormModal = true;

            await import('./employee-form.js');
        } catch (error) {
            console.error('Error in edit:', error);
        }
    }

    _handleDelete(employee) {
        this.selectedEmployee = employee;
        this.showDeleteModal = true;
    }

    _closeFormModal() {
        this.showFormModal = false;
        this.selectedEmployee = null;
        this.formMode = 'create';
        this.requestUpdate();
    }

    async _confirmDelete() {
        if (this.selectedEmployee) {
            await store.deleteEmployee(this.selectedEmployee.id);
            this.showDeleteModal = false;
            this.selectedEmployee = null;
        }
    }

    _handlePageChange(page) {
        this.currentPage = page;
    }

    render() {
        return html`
      <div class="list-header">
        <h1 class="title">${this.t('employeeList')}</h1>
        <div class="header-actions">
          <div class="view-toggle">
            <button 
              class="view-btn ${this.viewType === 'table' ? 'active' : ''}"
              @click=${() => this.viewType = 'table'}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 10h18M3 14h18M3 18h18M3 6h18"/>
              </svg>
            </button>
            <button 
              class="view-btn ${this.viewType === 'grid' ? 'active' : ''}"
              @click=${() => this.viewType = 'grid'}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="search-box">
        <input 
          type="text"
          class="search-input"
          placeholder="${this.t('search')}..."
          .value=${this.searchTerm}
          @input=${this._handleSearch}
        >
      </div>

      ${this.loading
            ? html`<div class="loading">Loading...</div>`
            : this.error
                ? html`<div class="error">${this.error}</div>`
                : this.viewType === 'table'
                    ? this._renderTable()
                    : this._renderGrid()}

      ${this._renderPagination()}
      ${this._renderFormModal()}
      ${this._renderDeleteModal()}
        `;
    }

    _renderTable() {
        return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
                <th></th>
              <th>${this.t('firstName')}</th>
              <th>${this.t('lastName')}</th>
              <th>${this.t('dateOfEmployment')}</th>
              <th>${this.t('dateOfBirth')}</th>
              <th>${this.t('phone')}</th>
              <th>${this.t('email')}</th>
              <th>${this.t('department')}</th>
              <th>${this.t('position')}</th>
              <th>${this.t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${this.paginatedEmployees.map(employee => html`
              <tr>
                  <td><input type="checkbox"></td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.dateOfEmployment}</td>
                <td>${employee.dateOfBirth}</td>
                <td>${employee.phone}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td>
                  <button class="action-btn" @click=${() => this._handleEdit(employee)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                      </svg>
                  </button>
                  <button class="action-btn" @click=${() => this._handleDelete(employee)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      </svg>
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
    }

    _renderGrid() {
        return html`
            <div class="grid-container">
                ${this.paginatedEmployees.map(employee => html`
                    <div class="employee-card">
                        <div class="card-header">
                            <h3>${employee.firstName} ${employee.lastName}</h3>
                            <p>${this.t(employee.position)} • ${this.t(employee.department)}</p>
                        </div>

                        <div class="card-content">
                            <div class="info-item">
                                <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                                    <path d="M12 11v4M12 7h.01"/>
                                </svg>
                                <span class="info-text">${employee.email}</span>
                            </div>

                            <div class="info-item">
                                <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                <span class="info-text">${employee.phone}</span>
                            </div>

                            <div class="info-item">
                                <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2"/>
                                    <path d="M12 6v6l4 2"/>
                                </svg>
                                <span class="info-text">${this.t('dateOfEmployment')}: ${employee.dateOfEmployment}</span>
                            </div>
                        </div>

                        <div class="card-footer">
                            <button class="card-btn edit-btn" @click=${() => this._handleEdit(employee)}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                                </svg>
                            </button>

                            <button class="card-btn delete-btn" @click=${() => this._handleDelete(employee)}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                `)}
            </div>
        `;
    }

    _renderFormModal() {
        if (!this.showFormModal) return '';

        return html`
        <div class="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">
                        ${this.formMode === 'create'
            ? this.t('addNewEmployee')
            : this.t('editEmployee')}
                    </h3>
                    <button 
                        class="modal-close"
                        @click=${this._closeFormModal}
                    >×</button>
                </div>
                <employee-form
                    .mode=${this.formMode}
                    .employee=${this.selectedEmployee}
                    @employee-saved=${this._handleEmployeeSaved}
                    @cancel=${this._closeFormModal}
                ></employee-form>
            </div>
        </div>
    `;
    }

    _renderDeleteModal() {
        if (!this.showDeleteModal || !this.selectedEmployee) return '';

        const message = this.t('deleteConfirmationMessage', {
            firstName: this.selectedEmployee.firstName,
            lastName: this.selectedEmployee.lastName
        });

        return html`
            <div class="modal-overlay">
                <div class="modal">
                    <div class="modal-header">
                        <h3 class="modal-title">${this.t('areYouSure')}</h3>
                        <button
                                class="close-button"
                                @click=${() => this.showDeleteModal = false}
                        >
                            ×
                        </button>
                    </div>

                    <div class="modal-content">
                        ${message}
                    </div>

                    <div class="modal-actions">
                        <button
                                class="proceed-btn"
                                @click=${this._confirmDelete}
                        >
                            ${this.t('proceed')}
                        </button>

                        <button
                                class="cancel-btn"
                                @click=${() => this.showDeleteModal = false}
                        >
                            ${this.t('cancel')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    _renderPagination() {
        const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
        if (totalPages <= 1) return '';

        return html`
      <div class="pagination">
        <button 
          class="page-btn"
          ?disabled=${this.currentPage === 1}
          @click=${() => this._handlePageChange(this.currentPage - 1)}
        >
          ←
        </button>
        ${Array.from({length: totalPages}, (_, i) => i + 1).map(page => html`
          <button 
            class="page-btn ${page === this.currentPage ? 'active' : ''}"
            @click=${() => this._handlePageChange(page)}
          >
            ${page}
          </button>
        `)}
        <button 
          class="page-btn"
          ?disabled=${this.currentPage === totalPages}
          @click=${() => this._handlePageChange(this.currentPage + 1)}
        >
          →
        </button>
      </div>
    `;
    }

}

customElements.define('employee-list', EmployeeList);