import {Dashboard} from "./components/dashboard";
import {Login} from "./components/login";
import {SignUp} from "./components/sign-up";
import {Logout} from "./components/logout";
import {AuthUtil} from "./utils/auth-util";
import {Income} from "./components/income/income";
import {Layout} from "./components/layout";
import {Expenses} from "./components/expenses/expenses";
import {CreateCategoryIncomes} from "./components/income/create-category-incomes";
import {CreateCategoryExpenses} from "./components/expenses/create-category-expenses";
import {EditCategoryIncomes} from "./components/income/edit-category-income";
import {EditCategoryExpenses} from "./components/expenses/edit-category-expenses";
import {IncomeAndExpenses} from "./components/income-expenses";
import {CreateOperation} from "./components/create-operation";
import {SecondLayout} from "./components/second-layout";

export class Router {

    constructor() {
        this.pageTitleElement = document.getElementById("page-title");
        this.contentElement = document.getElementById("content");
        this.adminLteStyleElement = document.getElementById("adminlte_style");


        this.routes = [
            {
                route: '#/',
                title: 'Dashboard',
                template: '/templates/pages/dashboard.html',
                useLayout: '/templates/layout.html',
                useSecondLayout: '/templates/second-layout.html',
                requiresAuth: true,
                styles: [
                    'layout.css',
                    'finance.css',
                ],
                load: () => {
                    new Layout();
                    new SecondLayout();
                    new Dashboard();
                }

            },
            {
                route: '#/404',
                title: 'Page Not Found',
                useLayout: false,
                useSecondLayout:false,
                template: '/templates/pages/404.html',
            },
            {
                route: '#/login',
                title: 'Login',
                useLayout: false,
                useSecondLayout: false,
                template: '/templates/pages/login.html',
                load: () => {

                    new Login(this.openNewRoute.bind(this));
                },
                unload: () => {
                    document.body.classList.remove('login-page');
                    document.body.style.height = 'auto';
                },
                styles: [
                    // 'icheck-bootstrap.min.css'
                ]
            },
            {
                route: '#/sign-up',
                title: 'Sign Up',
                template: '/templates/pages/sign-up.html',
                useLayout: false,
                useSecondLayout: false,
                load: () => {

                    new SignUp();
                },
                unload: () => {
                    document.body.classList.remove('register-page');
                    document.body.style.height = 'auto';
                },
                styles: [
                    // 'icheck-bootstrap.min.css'
                ]
            },
            {
            route: '#/logout',
                load: () => {
                new Logout();
                }
            },
            {
                route: '#/income',
                title: 'Доходы',
                template: '/templates/pages/finance.html',
                useLayout: '/templates/layout.html',
                useSecondLayout: false,
                requiresAuth: true,
                load: () => {
                    new Layout();
                    new Income();
                },
                unload: () => {

                },
                styles: [
                    'finance.css'
                ]
            },
            {
                route: '#/expenses',
                title: 'Расходы',
                template: '/templates/pages/finance.html',
                useLayout: '/templates/layout.html',
                useSecondLayout: false,
                requiresAuth: true,
                load: () => {
                    new Layout();
                    new Expenses();
                },
                unload: () => {

                },
                styles: [
                    'finance.css'
                ]
            },
            {
                route: '#/create-category-income',
                title: 'Создание категории доходов',
                template: '/templates/pages/card-create.html',
                useLayout: '/templates/layout.html',
                useSecondLayout: false,
                requiresAuth: true,
                load: () => {
                    new Layout();
                    new CreateCategoryIncomes();
                },
                unload: () => {

                },
                styles: [
                    'finance.css'
                ]
            },
            {
                route: '#/create-category-expenses',
                title: 'Создание категории доходов',
                template: '/templates/pages/card-create.html',
                useLayout: '/templates/layout.html',
                useSecondLayout: false,
                requiresAuth: true,
                load: () => {
                    new Layout();
                    new CreateCategoryExpenses();
                },
                unload: () => {

                },
                styles: [
                    'finance.css'
                ]
            },
            {
                route: '#/edit-category-income',
                title: 'Редактирование категории доходов',
                template: '/templates/pages/card-create.html',
                useLayout: '/templates/layout.html',
                useSecondLayout: false,
                requiresAuth: true,
                load: () => {
                    new Layout();
                    new EditCategoryIncomes();
                },
                unload: () => {

                },
                styles: [
                    'finance.css'
                ]
            },
            {
                route: '#/edit-category-expenses',
                title: 'Редактирование категории расходов',
                template: '/templates/pages/card-create.html',
                useLayout: '/templates/layout.html',
                useSecondLayout: false,
                requiresAuth: true,
                load: () => {
                    new Layout();
                    new EditCategoryExpenses();
                },
                unload: () => {

                },
                styles: [
                    'finance.css'
                ]
            },
            {
                route: '#/income-and-expenses',
                title: 'Расходы и доходы',
                template: '/templates/pages/income-expenses.html',
                useLayout: '/templates/layout.html',
                useSecondLayout: '/templates/second-layout.html',
                requiresAuth: true,
                styles: [
                    'layout.css',
                    'finance.css',
                ],
                load: () => {
                    new Layout();
                    new SecondLayout();
                    new IncomeAndExpenses();
                }
            },
            {
                route: '#/operation',
                title: 'Создать доход/расход',
                template: '/templates/pages/operation.html',
                useLayout: '/templates/layout.html',
                useSecondLayout: false,
                requiresAuth: true,
                load: () => {
                    new Layout();
                    new CreateOperation();
                },
                unload: () => {

                },
                styles: [
                    'finance.css'
                ]
            },
        ];
    }
    async openRoute() {
        const urlRoute = window.location.hash.split('?')[0];
        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (!newRoute) {
            window.location.href = "#/";
            return;
        }
        if (newRoute.requiresAuth && !AuthUtil.getAuthInfo(AuthUtil.accessTokenKey)) {
            window.location.href = '#/login'; // Перенаправляем на страницу логина
            return;
        }

        try {
            await this.loadTemplate(newRoute);
            this.applyStyles(newRoute.styles);
            this.pageTitleElement.innerText = newRoute.title;

            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }
        } catch (error) {
            console.error('Error opening route:', error);
            location.href = '#/404';
        }
    }

    async loadTemplate(route) {
        let contentBlock = this.contentElement;

        if (route.useLayout) {
            try {
                const layoutResponse = await fetch(route.useLayout);
                if (!layoutResponse.ok) throw new Error('Failed to load layout');

                contentBlock.innerHTML = await layoutResponse.text();
                contentBlock = document.getElementById('content-layout');
                if(route.useSecondLayout) {
                    const layoutResponse = await fetch(route.useSecondLayout);
                    if (!layoutResponse.ok) throw new Error('Failed to load layout');

                    contentBlock.innerHTML = await layoutResponse.text();
                    contentBlock = document.getElementById('main-content');
                }
            } catch (error) {
                console.error('Error loading layout:', error);
                throw error; // Пробрасываем ошибку дальше
            }
        }

        try {
            const templateResponse = await fetch(route.template);
            if (!templateResponse.ok) throw new Error('Failed to load template');

            contentBlock.innerHTML = await templateResponse.text();
        } catch (error) {
            console.error('Error loading template:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }

    async activateRoute(e, oldRoute = null) {
        // Удаление стилей текущего маршрута, если он существует
        if (oldRoute) {
            const currentRoute = this.routes.find(item => item.route === oldRoute);

            if (currentRoute && currentRoute.styles && currentRoute.styles.length > 0) {
                currentRoute.styles.forEach(style => {
                    const styleLink = document.querySelector(`link[href='/css/${style}']`);
                    if (styleLink) {
                        styleLink.remove(); // Удаляем стиль, если он существует
                    }
                });

                // Вызываем функцию unload, если она определена
                if (currentRoute.unload && typeof currentRoute.unload === 'function') {
                    currentRoute.unload();
                }
            }
        }

        // Получаем новый маршрут из URL
        const urlRoute = window.location.hash.split('?')[0];
        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (newRoute) {
            // Добавляем новые стили
            this.applyStyles(newRoute.styles);

            // Обновляем заголовок страницы
            if (newRoute.title) {
                this.pageTitleElement.innerText = newRoute.title;
            }

            // Загружаем шаблон
            await this.loadTemplate(newRoute);

            // Вызываем функцию load, если она определена
            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }
        } else {
            console.log('No route found');
            location.href = '#/404';
        }
    }

    applyStyles(styles) {
        if (styles && styles.length > 0) {
            styles.forEach(style => {
                const existingStyleLink = document.querySelector(`link[href='/css/${style}']`);

                if (!existingStyleLink) { // Проверяем, существует ли стиль
                    const link = document.createElement("link");
                    link.rel = "stylesheet";
                    link.href = '/css/' + style;

                    // Обработка ошибок при загрузке стиля
                    link.onerror = () => {
                        console.error(`Failed to load stylesheet: ${link.href}`);
                    };

                    document.head.insertBefore(link, this.adminLteStyleElement);
                }
            });
        }
    }

    async openNewRoute(url) {
        const currentRoute = window.location.pathname;
        await this.activateRoute(null, currentRoute);
    }
}