import {AuthUtil} from "../utils/auth-util";
import {HttpUtils} from "../utils/http-utils";

export class SignUp{

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if(AuthUtil.getAuthInfo(AuthUtil.accessTokenKey)){
            window.location.href = "#/";
        }

        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.repeatPassworElement = document.getElementById('repeat-password');
        this.fullNamelement = document.getElementById('fullName');


        this.commonErrorElement = document.getElementById('common-error');

        document.getElementById('button-login').addEventListener('click',
            this.signUp.bind(this));
    }

    async signUp() {
        this.commonErrorElement.style.display = 'none';
        if (this.validateForm()) {
            const fullNameSplit = this.fullNamelement.value.split(' ');
            let userName = 'unknown';
            let userLastName = 'unknown';

            if(fullNameSplit.length > 1) {
                userLastName = fullNameSplit[0];
                userName = fullNameSplit[1];
            }else{

            }
            const result = await HttpUtils.request('/signup', 'POST', false,
                {
                    name: userName,
                    lastName: userLastName,
                    email: this.emailElement.value,
                    password: this.passwordElement.value,
                    passwordRepeat: this.repeatPassworElement.value,
                })



            if (result.error ||!result.response ||(result.response && !result.response.user.id
                || !result.response.user.email || !result.response.user.name || !result.response.user.lastName)) {
                this.commonErrorElement.style.display = 'block';
                return
            }


            window.location.href = "#/login";
        }
    }

    validateForm() {
        let isValid = true;

        if (this.fullNamelement.value.trim()) {
            this.fullNamelement.classList.remove('is-invalid');
        } else {
            this.fullNamelement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.emailElement.value.trim() && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.emailElement.value)) {
            this.emailElement.classList.remove('is-invalid');
        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.passwordElement.value.trim() &&  /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(this.passwordElement.value)) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }
        if (this.passwordElement.value.trim() === this.repeatPassworElement.value.trim()) {
            this.repeatPassworElement.classList.remove('is-invalid');
        } else {
            this.repeatPassworElement.classList.add('is-invalid');
            isValid = false;
        }

        return isValid;
    }
}