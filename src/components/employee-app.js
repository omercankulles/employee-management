import { LitElement, html, css } from 'lit';
import './nav-menu.js';

export class EmployeeApp extends LitElement {
    static styles = css`
        :host {
            display: block;
            min-height: 100vh;
            --primary-color: #3498db;
            --secondary-color: #2ecc71;
            --background-color: #f5f5f5;
            --text-color: #333;
        }

        .app-container {
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            background-color: var(--background-color);
        }

        main {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
            .app-container {
                padding: 10px;
            }

            main {
                padding: 1rem;
            }
        }
    `;

    static properties = {
        currentPage: { type: String }
    };

    constructor() {
        super();
        this.currentPage = 'home';
    }

    _handlePageChange(e) {
        this.currentPage = e.detail.page;
    }

    _renderPage() {
        switch(this.currentPage) {
            case 'list':
                return html`<employee-list></employee-list>`;
            case 'create':
                return html`<h2>Yeni Çalışan Ekle</h2>`;
            default:
                return html`
                    <h2>Hoş Geldiniz</h2>
                    <p>Çalışan yönetim sistemine hoş geldiniz. Lütfen üst menüden bir işlem seçin.</p>
                `;
        }
    }

    render() {
        return html`
      <nav-menu 
        .currentPage=${this.currentPage}
        @page-change=${this._handlePageChange}
      ></nav-menu>
      <div class="app-container">
        <main>
          ${this._renderPage()}
        </main>
      </div>
    `;
    }
}

customElements.define('employee-app', EmployeeApp);