export class SecondLayout{
    constructor(){
        this.buttonsBlockElement = document.querySelectorAll('.btn-outline-secondary');
        this.buttonsBlockElement.forEach(button => {
            button.addEventListener('click', () => {

                this.buttonsBlockElement.forEach(btn => btn.classList.remove('active'));

                button.classList.add('active');
            });
        });

    }
}