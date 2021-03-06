'use strict';

export default class Router {
    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = new Map();

        Router.__instance = this;
    }

    register(path, view) {
        this.routes.set(path, view);
        return this;
    }

    setNotFoundPage(view) {
        this.page404 = view;
    }

    start() {
        window.onpopstate = event => {
            this.go(window.location.pathname);
        };

        document.body.addEventListener('click', event => {
            if (event.target.tagName.toLowerCase() !== 'button') {
                return;
            }
            event.preventDefault();
            const pathname = event.target.value;
            this.go(pathname);
        });

        this.go(window.location.pathname);
    }

    go(path) {
        let view = this.routes.get(path);
        if (!view) {
            view = this.page404;
        }

        if (window.location.pathname !== path) {
            window.history.pushState({}, '', path);
        }

        if (this.current) {
            this.current.destroy();
        }

        view.create();
        this.current = view;
    }
}