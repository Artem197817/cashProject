export class CreateOperation{

    mainTitle = 'Создать доход/расход'

tempCategoryList = ['Зарплата', 'Подработка', 'Дивиденты', 'Заказы' ]

    constructor() {

        this.mainTitleElement = document.getElementById('main-title');
        this.mainTitleElement.innerText = this.mainTitle;
        this.categorySelectElement = document.getElementById('category-select');
        this.inputTypeSelectElement = document.getElementById('type');
        this.sumElement = document.getElementById('summa');
        this.dateElement = document.getElementById('date');
        this.commentElement = document.getElementById('comment');

        this.init();
}


init() {
    this.tempCategoryList.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.setAttribute('value', category);
        optionElement.innerText = category;
        this.categorySelectElement.appendChild(optionElement);
    })
}

    validateForm() {
        let isValid = true;

        if (this.fullNamelement.value.trim()) {
            this.fullNamelement.classList.remove('is-invalid');
        } else {
            this.fullNamelement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.emailElement.value.trim() && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.emailElement.value)) {
            this.emailElement.classList.remove('is-invalid');
        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.passwordElement.value.trim() &&  /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(this.passwordElement.value)) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }
        if (this.passwordElement.value.trim() === this.repeatPassworElement.value.trim()) {
            this.repeatPassworElement.classList.remove('is-invalid');
        } else {
            this.repeatPassworElement.classList.add('is-invalid');
            isValid = false;
        }

        return isValid;
    }
}