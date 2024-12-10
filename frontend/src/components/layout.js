import {AuthUtil} from "../utils/auth-util";

export class Layout{

    balance = 4500;
    constructor(){
        this.userInfoElement = document.getElementById('username');
        this.userInfo = JSON.parse(AuthUtil.getAuthInfo(AuthUtil.userinfoKey));
        this.userName = this.userInfo.name + ' ' + this.userInfo.lastName;
        this.userInfoElement.innerText = this.userName;
        this.asideElement = document.getElementById('aside');
        this.balanceElement = document.getElementById('balance');
        if(this.balance) {
            this.balanceElement.innerText = this.balance;
        }
        this.burger = document.getElementById('burger-menu');
        this.burger.addEventListener('click', () => {
            this.asideElement.classList.remove('hidden');
            this.asideElement.classList.remove('hidden-for-table');
        })
        this.close = document.getElementById('close-menu');
        this.close.addEventListener('click', () => {
            this.asideElement.classList.add('hidden');
            this.asideElement.classList.add('hidden-for-table');
        })

            this.linksMain = document.querySelectorAll('.main-link');
            this.linksMain.forEach(button => {
                button.classList.remove('active')
                });


    }

    adjustSidebar(){




    }

}
