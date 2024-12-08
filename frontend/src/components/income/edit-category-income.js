import {LocalStorageUtil} from "../../utils/localStorageUtil";

export class EditCategoryIncomes {

    mainTitle = "Редактирование категории доходов"

    constructor() {
        this.mainTitleElement = document.getElementById("main-title");
        this.mainTitleElement.innerText = this.mainTitle;
        this.inputCategory = document.getElementById("input-category");
        this.inputCategory.placeholder = LocalStorageUtil.getCategory();
        this.buttonCreate = document.getElementById("button-create");
        this.buttonCreate.innerText = 'Редактировать'
        this.buttonCancel = document.getElementById("button-cancel");
        this.buttonCancel.setAttribute('href', '#/income')
        this.buttonCreate.addEventListener('click', this.editCategory.bind(this));

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

    editCategory(){
        if(this.validateInput()){
            LocalStorageUtil.removeCategory()
            console.log('create category');
        }
    }
}