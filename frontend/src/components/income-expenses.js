export class IncomeAndExpenses {

    mainTitle = 'Доходы и расходы'

    constructor() {
        this.mainTitleElement = document.getElementById('main-title');
        this.mainTitleElement.innerText = this.mainTitle;
        this.tbodyElement = document.getElementById('tbody');
        this.allertElement = document.getElementById('alert-popup-block');
        this.buttonAlertYes = document.getElementById('yes-alert');
        this.buttonAlertNo = document.getElementById('no-alert');
        this.popupTextElement = document.getElementById('text-popup-income');
        this.popupTextElement.style.color = 'white';
        this.asideElement = document.getElementById('aside');
        this.burger = document.getElementById('burger-menu');
        this.close = document.getElementById('close-menu');
        this.layoutOperationButton = document.getElementById('layout-operation');
        this.layoutOperationButton.classList.add('active')


        //this.createContent();
        this.buttonsEdit = document.querySelectorAll('.pencil');

        this.buttonsEdit.forEach(item => {
            item.addEventListener('click', this.editOperation.bind(this));
        })
        this.buttonsDelete = document.querySelectorAll('.union');

        this.buttonsDelete.forEach(item => {
            item.addEventListener('click', this.deleteOperation.bind(this));
        })

         window.onload = this.sidebarBehaviour.bind(this);
         window.onresize = this.sidebarBehaviour.bind(this);

    }

    sidebarBehaviour(){
        const width = window.innerWidth;
        if(width > 849){
            this.asideElement.classList.remove('for-table');
            this.asideElement.classList.remove('hidden-for-table');
            this.burger.style.display = 'none';
            this.close.style.display = 'none';
        } else {
            this.asideElement.classList.add('for-table');
            this.asideElement.classList.add('hidden-for-table');
            this.burger.style.display = 'block';
            this.close.style.display = 'block';
        }

    }

    editOperation(event) {
        console.log(event.target);
    }

    deleteOperation(event) {
        this.allertElement.style.display = 'flex';
        this.buttonAlertNo.addEventListener('click', () => {
            this.allertElement.style.display = 'none';
        });
        console.log(event.target);
    }

}