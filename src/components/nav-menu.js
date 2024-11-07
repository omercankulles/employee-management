import { LitElement, html, css } from 'lit';

export class NavMenu extends LitElement {
    static styles = css`
    :host {
      display: block;
    }

    nav {
      background-color: #2c3e50;
      padding: 1rem;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .nav-link:hover {
      background-color: #34495e;
    }

    .nav-link.active {
      background-color: #3498db;
    }

    @media (max-width: 768px) {
      .nav-container {
        flex-direction: column;
        gap: 1rem;
      }

      .nav-links {
        width: 100%;
        flex-direction: column;
        text-align: center;
      }

      .nav-link {
        display: block;
        padding: 0.8rem;
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

    _handleNavClick(page, event) {
        event.preventDefault();
        this.currentPage = page;
        this.dispatchEvent(new CustomEvent('page-change', {
            detail: { page },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
      <nav>
        <div class="nav-container">
          <a href="/" class="logo" @click=${(e) => this._handleNavClick('home', e)}>
            Employee Management
          </a>
          <div class="nav-links">
            <a 
              href="/list" 
              class="nav-link ${this.currentPage === 'list' ? 'active' : ''}"
              @click=${(e) => this._handleNavClick('list', e)}
            >
              Çalışan Listesi
            </a>
            <a 
              href="/create" 
              class="nav-link ${this.currentPage === 'create' ? 'active' : ''}"
              @click=${(e) => this._handleNavClick('create', e)}
            >
              Yeni Çalışan Ekle
            </a>
          </div>
        </div>
      </nav>
    `;
    }
}

customElements.define('nav-menu', NavMenu);