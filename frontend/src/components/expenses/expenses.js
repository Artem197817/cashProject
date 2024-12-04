import {CardCreate} from "../../utils/card-create";

export class Expenses{
    tempExpenses = ['Еда', 'Комуналка', 'Обучение', 'Платежи'];
    mainTitle = 'Расходы'

    constructor() {
        this.mainTitleElement = document.getElementById('main-title');
        this.cardsElement = document.getElementById('cards');
        this.cardAdd = document.createElement('div');
        this.cardAdd.classList.add('card');
        this.cardAdd.setAttribute('id', 'add');
        this.allertElement = document.getElementById('alert-popup-block');
        this.buttonAlertYes = document.getElementById('yes-alert');
        this.buttonAlertNo = document.getElementById('no-alert');
        this.popupTextElement = document.getElementById('text-popup-income');
        this.popupTextElement.style.color = 'white';

        this.createContent();
        this.buttonsEdit = document.querySelectorAll('.edit');

        this.buttonsEdit.forEach(item => {
            item.addEventListener('click', this.editExpenses.bind(this));
        })
        this.buttonsEdit = document.querySelectorAll('.delete');

        this.buttonsEdit.forEach(item => {
            item.addEventListener('click', this.deleteExpenses.bind(this));
        })
        this.addExpensesElement = document.getElementById('add');
        this.addExpensesElement.addEventListener('click', this.addExpenses.bind(this));

    }

    createContent() {
        this.mainTitleElement.innerText = this.mainTitle;
        this.tempExpenses.forEach(element => {
            this.cardsElement.appendChild(CardCreate.cardCreateIncomesOrExpenses(element));
        });

        this.cardAdd.innerHTML =
            '            <div class="mx-auto my-auto">\n' +
            '                <img src="../../images/plus.png" alt="+" class="plus">\n' +
            '            </div>';
        this.cardsElement.appendChild(this.cardAdd);

    }

    editExpenses(event) {
        console.log('Редактирование :', event.target);
    }

    deleteExpenses(event) {
        this.allertElement.style.display = 'flex';
        this.buttonAlertNo.addEventListener('click', () => {
            this.allertElement.style.display = 'none';
        });
        console.log('delete :', event.target);
    }

    addExpenses(event) {
        console.log('add', event.target);
    } 
    
}