export class CreateCategoryIncomes {

    mainTitle = "Создание категории доходов"

    constructor() {
        this.mainTitleElement = document.getElementById("main-title");
        this.mainTitleElement.innerText = this.mainTitle;
        this.inputCategory = document.getElementById("input-category");
        this.buttonCreate = document.getElementById("button-create");
        this.buttonCancel = document.getElementById("button-cancel");
        this.buttonCancel.setAttribute('href', '#/income')
        this.buttonCreate.addEventListener('click', this.createCategory.bind(this));

    }

    validateInput(){
        let isValid = true;

        if (this.inputCategory.value.trim()) {
            this.inputCategory.classList.remove('is-invalid');
        } else {
            this.inputCategory.classList.add('is-invalid');
            isValid = false;
        }
            return isValid;
    }

    createCategory(){
        if(this.validateInput()){
            console.log('create category');
        }
    }
}