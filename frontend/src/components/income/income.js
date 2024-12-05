import {CardCreate} from "../../utils/card-create";


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

        this.createContent();
        this.buttonsEdit = document.querySelectorAll('.edit');

        this.buttonsEdit.forEach(item => {
            item.addEventListener('click', this.editIncome.bind(this));
        })
        this.buttonsEdit = document.querySelectorAll('.delete');

        this.buttonsEdit.forEach(item => {
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
        console.log('Редактирование дохода:', event.target);
    }

    deleteIncome(event) {
        this.allertElement.style.display = 'flex';
        this.buttonAlertNo.addEventListener('click', () => {
            this.allertElement.style.display = 'none';
        });
        console.log('delete дохода:', event.target);
    }

    addIncome(event) {
        console.log('add', event.target);
    }
}