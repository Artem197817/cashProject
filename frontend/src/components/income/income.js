import {CardCreate} from "../../utils/card-create";
import {LocalStorageUtil} from "../../utils/localStorageUtil";
import {HttpUtils} from "../../utils/http-utils";



export class Income {
    url = '/categories/income';

    mainTitle = 'Доходы'

    constructor() {
        this.mainTitleElement = document.getElementById('main-title');
        this.cardsElement = document.getElementById('cards');
        this.cardAdd = document.createElement('div');
        this.cardAdd.classList.add('card');
        this.cardAdd.setAttribute('id', 'add');
        this.allertElement = document.getElementById('alert-popup-block');
        this.buttonAlertYes = document.getElementById('yes-alert');
        this.buttonAlertNo = document.getElementById('no-alert');
        this.layoutCategoryButton = document.getElementById('layout-category');
        this.layoutCategoryButton .classList.add('active')
        this.layoutIncomeButton = document.getElementById('layout-income');
        this.layoutIncomeButton .classList.add('active')

        this.createContent().then();
    }

    async createContent() {
        this.incomes = await this.getIncomes();
        this.mainTitleElement.innerText = this.mainTitle;
        this.incomes.forEach(element => {
            const card = CardCreate.cardCreateIncomesOrExpenses(element.title);
            const buttonDelete = card.querySelector('.delete')
            buttonDelete.addEventListener('click', (event) =>{
                event.stopPropagation();
                this.deleteIncome(element.id);
            });
            const buttonEdit = card.querySelector('.edit')
            buttonEdit.addEventListener('click', (event) =>{
                event.stopPropagation();
                this.editIncome(element);
            });

            this.cardsElement.appendChild(card);

        });

        this.cardAdd.innerHTML =
            '            <div class="mx-auto my-auto">\n' +
            '                <img src="../../images/plus.png" alt="+" class="plus">\n' +
            '            </div>';
        this.cardsElement.appendChild(this.cardAdd);
        this.addIncomeElement = document.getElementById('add');
        this.addIncomeElement.addEventListener('click', this.addIncome.bind(this));

    }
   async getIncomes() {
        const result = await HttpUtils.request(this.url);
        if(result.error) {
            console.log(result.message)
            return [];
        }
        return result.response;
    }

    editIncome(element) {

        if(LocalStorageUtil.getCategory()){
            LocalStorageUtil.removeCategory()
        }
        LocalStorageUtil.setCategory(element);
        window.location.href = '#/edit-category-income'
    }

   async deleteIncome(id) {
        const isConfirmed = await this.popupAlertBehaviour();
        if (isConfirmed) {
            const result = await HttpUtils.request(this.url + '/' + id, 'DELETE');
            if (result.error) {
                console.log(result.message)
                return;
            }
            window.location.href = '#/income'
        }
    }

    addIncome() {
        window.location.href = '#/create-category-income';

    }
    popupAlertBehaviour() {
        return new Promise((resolve) => {
            this.allertElement.style.display = 'flex';

            this.buttonAlertNo.addEventListener('click', () => {
                this.allertElement.style.display = 'none';
                resolve(false);
            });

            this.buttonAlertYes.addEventListener('click', () => {
                this.allertElement.style.display = 'none';
                resolve(true);
            });
        });
    }
}