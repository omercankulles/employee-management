import { LitElement, html, css } from 'lit';

export class AppFooter extends LitElement {
    static styles = css`
    :host {
      display: block;
      background-color: #2c3e50;
      color: white;
      padding: 20px 0;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .copyright {
      font-size: 14px;
    }

    .footer-links {
      display: flex;
      gap: 20px;
    }

    .footer-link {
      color: white;
      text-decoration: none;
      font-size: 14px;
    }

    .footer-link:hover {
      color: #FF4F00;
    }

    @media (max-width: 768px) {
      .footer-container {
        flex-direction: column;
        gap: 20px;
        text-align: center;
      }
    }
  `;

    render() {
        return html`
      <footer>
        <div class="footer-container">
          <div class="copyright">
            © ${new Date().getFullYear()} Employee Management System. All rights reserved.
          </div>
          <div class="footer-links">
            <a href="/privacy" class="footer-link">Privacy Policy</a>
            <a href="/terms" class="footer-link">Terms of Service</a>
            <a href="/contact" class="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    `;
    }
}

customElements.define('app-footer', AppFooter);