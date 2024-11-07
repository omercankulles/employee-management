import { html, css } from 'lit';
import { BaseComponent } from '../base-component.js';
import './language-switcher.js';

export class AppHeader extends BaseComponent {
    static styles = css`
        :host {
            display: block;
            background: white;
            border-bottom: 1px solid #eee;
        }

        .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 12px 24px;
        }

        .left-section {
            display: flex;
            align-items: center;
        }
        
        .left-section a{
            font-weight: 700;
            text-decoration: none;
            color: #000000;
        }

        .logo {
            display: flex;
            align-items: center;
            text-decoration: none;
        }

        .logo img {
            width: 64px;
            height: 64px;
            object-fit: contain;
        }
        
        

        .right-section {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .employees-link {
            display: flex;
            align-items: center;
            gap: 6px;
            text-decoration: none;
            color: #666;
            font-size: 14px;
            padding: 6px 12px;
            border-radius: 4px;
            transition: background-color 0.2s ease;
        }

        .employees-icon {
            width: 16px;
            height: 16px;
            color: #FF4F00;
        }

        .add-new-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            background: none;
            border: none;
            color: #FF4F00;
            cursor: pointer;
            font-size: 14px;
            padding: 6px 2px;
            border-radius: 4px;
        }

        .add-new-icon {
            font-size: 18px;
            font-weight: 300;
        }

        @media (max-width: 768px) {
            .header-container {
                padding: 12px 16px;
            }
        }
    `;

    _handleAdd() {
        const event = new CustomEvent('add-employee', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    render() {
        return html`
            <header>
                <div class="header-container">
                    <div class="left-section">
                        <a href="/" class="logo">
                            <img src="../../../assets/img/logo.png" alt="ING">
                            ING
                        </a>
                    </div>

                    <div class="right-section">
                        <a href="/employees" class="employees-link">
                            <svg class="employees-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            ${this.t('employees')}
                        </a>

    
                        <button class="add-new-btn" @click=${this._handleAdd}>
                            <span class="add-new-icon">+</span>
                            ${this.t('addNew')}
                        </button>

                        <language-switcher></language-switcher>
                    </div>
                </div>
            </header>
        `;
    }
}

customElements.define('app-header', AppHeader);