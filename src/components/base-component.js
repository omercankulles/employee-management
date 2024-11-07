import { LitElement } from 'lit';
import { languageManager } from '../utils/languages.js';

export class BaseComponent extends LitElement {
    static properties = {
        lang: { type: String }
    };

    constructor() {
        super();
        this.lang = languageManager.currentLang;

        // Dil değişikliklerini dinle
        this._unsubscribe = languageManager.subscribe(lang => {
            this.lang = lang;
            this.requestUpdate();
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }

    t(key, params = {}) {
        const translation = languageManager.translate(key);
        if (!params || Object.keys(params).length === 0) {
            return translation;
        }

        return Object.entries(params).reduce((str, [key, value]) => {
            return str.replace(`{${key}}`, value);
        }, translation);
    }
}