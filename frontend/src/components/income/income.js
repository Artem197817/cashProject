import {CardCreate} from "../../utils/card-create";
import {LocalStorageUtil} from "../../utils/localStorageUtil";


export class Income {

    tempIncomes = [ {
        "id": 5,
        "title": "Зарплата"
    },
        {
        "id": 6,
        "title": "Подработка"
    },
        {
            "id": 7,
            "title": "Дивиденты"
        },
        {
            "id": 8,
            "title": "Проценты"
        },
    ];
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

        this.createContent();
        this.buttonsEdit = document.querySelectorAll('.edit');

        this.buttonsEdit.forEach(item => {
            item.addEventListener('click', this.editIncome.bind(this));
        })
        this.buttonsDelete = document.querySelectorAll('.delete');

        this.buttonsDelete.forEach(item => {
            item.addEventListener('click', this.deleteIncome.bind(this));
        })
        this.addIncomeElement = document.getElementById('add');
        this.addIncomeElement.addEventListener('click', this.addIncome.bind(this));

    }

    createContent() {
        this.mainTitleElement.innerText = this.mainTitle;

        this.tempIncomes.forEach(element => {

            this.cardsElement.appendChild(CardCreate.cardCreateIncomesOrExpenses(element.title));
        });

        this.cardAdd.innerHTML =
            '            <div class="mx-auto my-auto">\n' +
            '                <img src="../../images/plus.png" alt="+" class="plus">\n' +
            '            </div>';
        this.cardsElement.appendChild(this.cardAdd);

    }

    editIncome(event) {
        const cardBody = event.target.closest('.card-body');
        const title = cardBody.querySelector('.card-title').innerText;
        if(LocalStorageUtil.getCategory()){
            LocalStorageUtil.removeCategory()
        }
        LocalStorageUtil.setCategory(title);
        console.log('Редактирование дохода:', title);
        window.location.href = '#/edit-category-income'
    }

    deleteIncome(event) {
        this.allertElement.style.display = 'flex';
        this.buttonAlertNo.addEventListener('click', () => {
            this.allertElement.style.display = 'none';
        });
        console.log('delete дохода:', event.target);
    }

    addIncome(event) {
        window.location.href = '#/create-category-income';
        console.log('add', event.target);
    }
}