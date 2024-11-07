import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../../src/components/employee/employee-list.js';
import { store } from '../../src/store/simple-store.js';

describe('EmployeeList', () => {
    let element;
    const mockEmployees = [
        {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            dateOfEmployment: '2024-01-01',
            dateOfBirth: '1990-01-01',
            phone: '+(90) 532 123 45 67',
            email: 'john@example.com',
            department: 'Tech',
            position: 'Senior'
        }
    ];

    beforeEach(async () => {
        stub(store, 'getState').returns({ employees: mockEmployees });
        element = await fixture(html`<employee-list></employee-list>`);
    });

    afterEach(() => {
        store.getState.restore();
    });

    it('renders employee list correctly', () => {
        const rows = element.shadowRoot.querySelectorAll('tbody tr');
        expect(rows.length).to.equal(1);
        expect(rows[0].cells[0].textContent).to.equal('John');
    });

    it('filters employees based on search term', async () => {
        element.searchTerm = 'john';
        await element.updateComplete;
        const rows = element.shadowRoot.querySelectorAll('tbody tr');
        expect(rows.length).to.equal(1);

        element.searchTerm = 'xyz';
        await element.updateComplete;
        const filteredRows = element.shadowRoot.querySelectorAll('tbody tr');
        expect(filteredRows.length).to.equal(0);
    });

    it('toggles view between table and grid', async () => {
        const gridButton = element.shadowRoot.querySelector('.view-btn:last-child');
        gridButton.click();
        await element.updateComplete;
        expect(element.viewType).to.equal('grid');

        const cards = element.shadowRoot.querySelectorAll('.employee-card');
        expect(cards.length).to.equal(1);
    });

    it('handles delete confirmation', async () => {
        const deleteStub = stub(store, 'deleteEmployee');
        const deleteButton = element.shadowRoot.querySelector('.action-btn:last-child');

        deleteButton.click();
        await element.updateComplete;

        expect(element.showDeleteModal).to.be.true;

        const confirmButton = element.shadowRoot.querySelector('.proceed-btn');
        confirmButton.click();

        expect(deleteStub.calledOnce).to.be.true;
        deleteStub.restore();
    });

    it('handles pagination correctly', async () => {
        const manyEmployees = Array(15).fill(mockEmployees[0]);
        store.getState.returns({ employees: manyEmployees });

        element = await fixture(html`<employee-list></employee-list>`);
        const pageButtons = element.shadowRoot.querySelectorAll('.page-btn');

        expect(pageButtons.length).to.be.greaterThan(1);

        const nextPage = pageButtons[pageButtons.length - 1];
        nextPage.click();
        await element.updateComplete;

        expect(element.currentPage).to.equal(2);
    });
});