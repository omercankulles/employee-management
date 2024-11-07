import { LitElement, html, css } from 'lit';
import './components/layout/app-header.js';
import './components/layout/app-footer.js';
import { initRouter } from './utils/router.js';

export class EmployeeApp extends LitElement {
    static styles = css`
        :host {
            display: block;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        main {
            flex: 1;
            background-color: #f5f5f5;
            padding: 24px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        @media (max-width: 1200px) {
            main {
                padding: 16px;
            }
        }
    `;

    firstUpdated() {
        // Router'ı başlat
        const mainContainer = this.shadowRoot.querySelector('.container');
        initRouter(mainContainer);
    }

    render() {
        return html`
      <app-header></app-header>

      <main>
        <div class="container">
          <!-- Router outlet -->
        </div>
      </main>

      <app-footer></app-footer>
    `;
    }
}

customElements.define('employee-app', EmployeeApp);