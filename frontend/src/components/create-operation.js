export class CreateOperation{

    mainTitle = 'Создать доход/расход'

tempCategoryList = ['Зарплата', 'Подработка', 'Дивиденты', 'Заказы' ]

    constructor() {

        this.mainTitleElement = document.getElementById('main-title');
        this.mainTitleElement.innerText = this.mainTitle;
        this.categorySelectElement = document.getElementById('category-select');
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
}