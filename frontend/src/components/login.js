import {AuthUtil} from "../utils/auth-util";
import {HttpUtils} from "../utils/http-utils";

export class Login {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if(AuthUtil.getAuthInfo(AuthUtil.accessTokenKey)){
            window.location.href = "#/";
        }

        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.rememberMeElement = document.getElementById('remember');
        this.commonErrorElement = document.getElementById('common-error');

        document.getElementById('button-login').addEventListener('click',
            this.login.bind(this));
    }

    validateForm() {
        let isValid = true;
        if (this.emailElement.value.trim()) {
            this.emailElement.classList.remove('is-invalid');

        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false;
        }
        if (this.passwordElement.value.trim()) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }
        return isValid;
    }

    async login() {

        this.commonErrorElement.style.display = 'none';
        if (this.validateForm()) {
            const result = await HttpUtils.request('/login', 'POST', false,
                {
                    email: this.emailElement.value,
                    password: this.passwordElement.value,
                    rememberMe: this.rememberMeElement.checked
                })



            if (result.error ||!result.response ||(result.response && !result.response.tokens.accessToken
                || !result.response.tokens.refreshToken || !result.response.user)) {
                this.commonErrorElement.style.display = 'block';
                return
            }

            AuthUtil.setAuthInfo(result.response.tokens.accessToken, result.response.tokens.refreshToken, result.response.user);


            window.location.href = "#/";
        }
    }
}