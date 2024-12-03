import {AuthUtil} from "../utils/auth-util";

export class Layout{

    balance = 500;
    constructor(){
        this.userInfoElement = document.getElementById('username');
        this.userInfo = JSON.parse(AuthUtil.getAuthInfo(AuthUtil.userinfoKey));
        this.userName = this.userInfo.name + ' ' + this.userInfo.lastName;
        this.userInfoElement.innerText = this.userName;

        this.balanceElement = document.getElementById('balance');
    }



}
