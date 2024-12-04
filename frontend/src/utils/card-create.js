export class CardCreate {

    static cardCreateIncomesOrExpenses(element){

            const cardElement = document.createElement('div');
            cardElement.classList.add('card');

            const cardBodyElement = document.createElement('div');
            cardBodyElement.classList.add('card-body');

            const cardTitleElement = document.createElement('h2');
            cardTitleElement.classList.add('card-title');
            cardTitleElement.classList.add('mb-3');
            cardTitleElement.innerText = element;

            const buttonsElement = document.createElement('div');
            buttonsElement.classList.add('buttons');

            const buttonEditElement = document.createElement('button');
            buttonEditElement.classList.add('edit');
            buttonEditElement.classList.add('btn');
            buttonEditElement.classList.add('btn-primary');
            buttonEditElement.style.marginRight = '10px'
            buttonEditElement.innerText = 'Редактировать' ;

            const buttonDeleteElement = document.createElement('button');
            buttonDeleteElement.classList.add('delete');
            buttonDeleteElement.classList.add('btn');
            buttonDeleteElement.classList.add('btn-danger');
            buttonDeleteElement.innerText = 'Удалить' ;

            buttonsElement.appendChild(buttonEditElement);
            buttonsElement.appendChild(buttonDeleteElement);

            cardBodyElement.appendChild(cardTitleElement);
            cardBodyElement.appendChild(buttonsElement);
            cardElement.appendChild(cardBodyElement);
            return cardElement;
}
}