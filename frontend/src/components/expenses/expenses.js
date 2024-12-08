import {CardCreate} from "../../utils/card-create";
import {LocalStorageUtil} from "../../utils/localStorageUtil";

export class Expenses{
    tempExpenses = [ {
        "id": 5,
        "title": "Еда"
    },
        {
            "id": 6,
            "title": "Комуналка"
        },
        {
            "id": 7,
            "title": "Обучение"
        },
        {
            "id": 8,
            "title": "Платежи"
        },
    ];


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
        this.buttonsDelete = document.querySelectorAll('.delete');

        this.buttonsDelete.forEach(item => {
            item.addEventListener('click', this.deleteExpenses.bind(this));
        })
        this.addExpensesElement = document.getElementById('add');
        this.addExpensesElement.addEventListener('click', this.addExpenses.bind(this));

    }

    createContent() {
        this.mainTitleElement.innerText = this.mainTitle;
        this.tempExpenses.forEach(element => {
            this.cardsElement.appendChild(CardCreate.cardCreateIncomesOrExpenses(element.title));
        });

        this.cardAdd.innerHTML =
            '            <div class="mx-auto my-auto">\n' +
            '                <img src="../../images/plus.png" alt="+" class="plus">\n' +
            '            </div>';
        this.cardsElement.appendChild(this.cardAdd);

    }

    editExpenses(event) {
        const cardBody = event.target.closest('.card-body');
        const title = cardBody.querySelector('.card-title').innerText;
        if(LocalStorageUtil.getCategory()){
            LocalStorageUtil.removeCategory()
        }
        LocalStorageUtil.setCategory(title);
        console.log('Редактирование :', event.target);
        window.location.href = '#/edit-category-expenses'
    }

    deleteExpenses(event) {
        this.allertElement.style.display = 'flex';
        this.buttonAlertNo.addEventListener('click', () => {
            this.allertElement.style.display = 'none';
        });
        console.log('delete :', event.target);
    }

    addExpenses(event) {
        window.location.href = '#/create-category-expenses';
        console.log('add', event.target);
    } 
    
}