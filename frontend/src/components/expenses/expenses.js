import {CardCreate} from "../../utils/card-create";
import {LocalStorageUtil} from "../../utils/localStorageUtil";
import {HttpUtils} from "../../utils/http-utils";

export class Expenses{
    url = '/categories/expense';

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
        this.layoutCategoryButton = document.getElementById('layout-category');
        this.layoutCategoryButton .classList.add('active')
        this.layoutExpensesButton = document.getElementById('layout-expenses');
        this.layoutExpensesButton .classList.add('active')

        this.createContent().then();
    }

    async  createContent() {
        this.expenses = await this.getExpenses();
        this.mainTitleElement.innerText = this.mainTitle;
        this.expenses.forEach(element => {
            this.cardsElement.appendChild(CardCreate.cardCreateIncomesOrExpenses(element.title));
        });

        this.cardAdd.innerHTML =
            '            <div class="mx-auto my-auto">\n' +
            '                <img src="../../images/plus.png" alt="+" class="plus">\n' +
            '            </div>';
        this.cardsElement.appendChild(this.cardAdd);
        this.addExpensesElement = document.getElementById('add');
        this.addExpensesElement.addEventListener('click', this.addExpenses.bind(this));
        this.buttonsEdit = document.querySelectorAll('.edit');

        this.buttonsEdit.forEach(item => {
            item.addEventListener('click', this.editExpenses.bind(this));
        })
        this.buttonsDelete = document.querySelectorAll('.delete');

        this.buttonsDelete.forEach(item => {
            item.addEventListener('click', this.deleteExpenses.bind(this));
        })
    }

   async getExpenses() {
            const result = await HttpUtils.request(this.url);
            if(result.error) {
                console.log(result.message)
                return [];
                           }
            return result.response;

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