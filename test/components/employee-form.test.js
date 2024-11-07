import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../../src/components/employee/employee-form.js';

describe('EmployeeForm', () => {
    let element;
    const mockEmployee = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2024-01-01',
        dateOfBirth: '1990-01-01',
        phone: '+(90) 532 123 45 67',
        email: 'john@example.com',
        department: 'Tech',
        position: 'Senior'
    };

    beforeEach(async () => {
        element = await fixture(html`<employee-form></employee-form>`);
    });

    it('renders form fields correctly', () => {
        const inputs = element.shadowRoot.querySelectorAll('input, select');
        expect(inputs.length).to.equal(8);
    });

    it('validates required fields', async () => {
        const submitButton = element.shadowRoot.querySelector('button[type="submit"]');
        submitButton.click();
        await element.updateComplete;

        const errors = element.shadowRoot.querySelectorAll('.error-message');
        expect(errors.length).to.be.greaterThan(0);
    });

    it('validates email format', async () => {
        const emailInput = element.shadowRoot.querySelector('input[type="email"]');
        emailInput.value = 'invalid-email';
        emailInput.dispatchEvent(new Event('input'));

        const submitButton = element.shadowRoot.querySelector('button[type="submit"]');
        submitButton.click();
        await element.updateComplete;

        const emailError = element.shadowRoot.querySelector('input[type="email"] + .error-message');
        expect(emailError).to.exist;
    });

    it('handles form submission in create mode', async () => {
        Object.entries(mockEmployee).forEach(([key, value]) => {
            const input = element.shadowRoot.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = value;
                input.dispatchEvent(new Event('input'));
            }
        });

        const submitSpy = stub(element, '_handleSubmit');
        const submitButton = element.shadowRoot.querySelector('button[type="submit"]');
        submitButton.click();

        expect(submitSpy.calledOnce).to.be.true;
        submitSpy.restore();
    });

    it('handles form submission in edit mode', async () => {
        element.mode = 'edit';
        element.employee = mockEmployee;
        await element.updateComplete;

        const submitSpy = stub(element, '_handleSubmit');
        const submitButton = element.shadowRoot.querySelector('button[type="submit"]');
        submitButton.click();

        expect(submitSpy.calledOnce).to.be.true;
        submitSpy.restore();
    });
});