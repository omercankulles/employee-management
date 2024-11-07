import { LitElement, html, css } from 'lit';
import { languageManager } from '../../utils/languages.js';

export class LanguageSwitcher extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
            position: relative;
        }

        .language-selector {
            position: relative;
            z-index: 1000;
        }

        .selected-flag {
            padding: 8px;
            cursor: pointer;
            background: none;
            border: none;
            font-size: 20px;
            display: flex;
            align-items: center;
            transition: transform 0.3s ease;
            opacity: 0.8;
        }

        .selected-flag:hover {
            opacity: 1;
            transform: scale(1.1);
        }

        .dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            margin-top: 8px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 4px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px) scale(0.95);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1001;
            min-width: 44px;
        }

        .dropdown.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
        }

        .flag-option {
            padding: 8px;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: all 0.2s ease;
            opacity: 0.7;
            width: 100%;
            min-width: 40px;
        }

        .flag-option:hover {
            background: #f5f5f5;
            opacity: 1;
            transform: scale(1.1);
        }

        .flag-option.active {
            opacity: 1;
            background: #f0f0f0;
        }

        .dropdown-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: none;
            z-index: 999;
        }

        .dropdown-overlay.open {
            display: block;
        }

        /* Mobil için optimizasyon */
        @media (max-width: 768px) {
            .selected-flag, .flag-option {
                padding: 12px;
            }

            .dropdown {
                min-width: 50px;
            }
        }
    `;

    static properties = {
        currentLang: { type: String },
        isOpen: { type: Boolean },
        languages: { type: Array }
    };

    constructor() {
        super();
        this.currentLang = languageManager.currentLang;
        this.isOpen = false;
        this.languages = [
            { code: 'tr', flag: '🇹🇷' },
            { code: 'en', flag: '🇬🇧' }
        ];

        languageManager.subscribe(lang => {
            this.currentLang = lang;
        });

        this._handleClickOutside = this._handleClickOutside.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('click', this._handleClickOutside);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('click', this._handleClickOutside);
    }

    _handleClickOutside(event) {
        if (this.isOpen && !this.renderRoot.contains(event.target)) {
            this.isOpen = false;
        }
    }

    _toggleDropdown(e) {
        e.stopPropagation();
        this.isOpen = !this.isOpen;
    }

    _selectLanguage(langCode) {
        if (this.currentLang !== langCode) {
            languageManager.setLanguage(langCode);
        }
        this.isOpen = false;
    }

    get selectedLanguage() {
        return this.languages.find(lang => lang.code === this.currentLang);
    }

    render() {
        return html`
            <div class="language-selector">
                <button
                    class="selected-flag"
                    @click=${this._toggleDropdown}
                    aria-label="Change language"
                    aria-expanded=${this.isOpen}
                >
                    ${this.selectedLanguage.flag}
                </button>

                <div class="dropdown ${this.isOpen ? 'open' : ''}" role="listbox">
                    ${this.languages.map(lang => html`
                        <button
                            class="flag-option ${lang.code === this.currentLang ? 'active' : ''}"
                            @click=${() => this._selectLanguage(lang.code)}
                            aria-label=${`Select ${lang.code}`}
                            role="option"
                            aria-selected=${lang.code === this.currentLang}
                        >
                            ${lang.flag}
                        </button>
                    `)}
                </div>
            </div>

            <div 
                class="dropdown-overlay ${this.isOpen ? 'open' : ''}"
                @click=${() => this.isOpen = false}
            ></div>
        `;
    }
}

customElements.define('language-switcher', LanguageSwitcher);