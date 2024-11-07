import { Router } from '@vaadin/router';
import '../components/employee/employee-list.js';
import '../components/employee/employee-form.js';

export const initRouter = (outlet) => {
    const router = new Router(outlet);

    router.setRoutes([
        {
            path: '/',
            redirect: '/employees',
        },
        {
            path: '/employees',
            component: 'employee-list',
        },
        {
            path: '/employees/create',
            component: 'employee-form',
        },
        {
            path: '/employees/:id/edit',
            component: 'employee-form',
        },
        {
            path: '(.*)',
            component: 'not-found-view'
        }
    ]);

    return router;
};