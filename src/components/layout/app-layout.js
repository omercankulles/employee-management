import { LitElement, html, css } from 'lit';

export class AppLayout extends LitElement {
    static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    main {
      flex: 1;
      background-color: var(--background-color, #f5f5f5);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    @media (max-width: 1200px) {
      .container {
        padding: 20px;
        margin: 0 20px;
      }
    }
  `;

    render() {
        return html`
      <app-header></app-header>
      <main>
        <div class="container">
          <slot></slot>
        </div>
      </main>
      <app-footer></app-footer>
    `;
    }
}

customElements.define('app-layout', AppLayout);