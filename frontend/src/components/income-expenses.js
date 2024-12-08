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

        //this.createContent();
        this.buttonsEdit = document.querySelectorAll('.pencil');

        this.buttonsEdit.forEach(item => {
            item.addEventListener('click', this.editOperation.bind(this));
        })
        this.buttonsDelete = document.querySelectorAll('.union');

        this.buttonsDelete.forEach(item => {
            item.addEventListener('click', this.deleteOperation.bind(this));
        })


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