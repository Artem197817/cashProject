export class Dashboard {
    mainTitle = 'Главная'
    colors = [
        "#FF5733",
        "#33FF57",
        "#3357FF",
        "#FF33A1",
        "#F0FF33",
        "#33FFF5",
        "#FF8C33",
        "#B833FF",
        "#581845",
        "#338CFF",
        "#FFC300",
        "#DAF7A6",
        "#C70039",
        "#900C3F",
        "#FFC0CB",
        "#A52A2A",
        "#D2691E",
        "#20B2AA",
        "#FF4500",
        "#2E8B57",
        "#6A5ACD",
        "#FFD700",
        "#ADFF2F",
        "#FF6347",
        "#00FA9A",
        "#7B68EE",
        "#DDA0DD",
        "#F08080",
        "#33FF8C",
    ];
    tempIncomes = [{
        "id": 5,
        "title": "Зарплата",
        "amount": 600
    },
        {
            "id": 6,
            "title": "Подработка",
            "amount": 1200
        },
        {
            "id": 7,
            "title": "Дивиденты",
            "amount": 200
        },
        {
            "id": 8,
            "title": "Проценты",
            "amount": 300
        },
    ];
    tempExpenses = [{
        "id": 5,
        "title": "Еда",
        "amount": 400
    },
        {
           "id": 6,
            "title": "Комуналка",
            "amount": 100
        },
        {
            "id": 7,
            "title": "Обучение",
            "amount": 500
        },
        {
            "id": 8,
            "title": "Платежи",
           "amount": 300
        },
    ];


    constructor() {
        this.mainTitleElement = document.getElementById('main-title');
        this.mainTitleElement.innerText = this.mainTitle;
        this.canvasIncome = document.getElementById('canvas-income');
        this.canvasExpenses = document.getElementById('canvas-expenses');
        this.buttonsFin = document.getElementById('btn-block-fin');
        this.buttonsFin.style.display = 'none';
        this.colorDiagIncomeElement = document.getElementById('color-diag-income')
        this.colorDiagExpensesElement = document.getElementById('color-diag-expenses')

        this.createColorDiag(this.tempIncomes, this.colorDiagIncomeElement);
        this.createColorDiag(this.tempExpenses, this.colorDiagExpensesElement);

        this.createCircleDiag(this.canvasIncome, this.tempIncomes);
        this.createCircleDiag(this.canvasExpenses, this.tempExpenses);

        window.addEventListener('resize', this.updateContainerWidth.bind(this));
    }

    createCircleDiag(canvas, data) {
        const width = canvas.clientWidth / 2;
        canvas.width = width * 2;
        canvas.height = width * 2;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const total = data.reduce((sum, item) => sum + item.amount, 0);

        let startAngle = 0;

        data.forEach((value, index) => {
            const sliceAngle = (value.amount / total) * 2 * Math.PI; // Угол среза
            ctx.beginPath();
            ctx.moveTo(width, width); // Центр круга
            ctx.arc(width, width, width, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            if (index > this.colors.length - 1) {
                index = 0;
            }
            ctx.fillStyle = this.colors[index];
            ctx.fill();
            startAngle += sliceAngle;
        });

    }

    updateContainerWidth() {
        this.createCircleDiag(this.canvasIncome, this.tempIncomes);
        this.createCircleDiag(this.canvasExpenses, this.tempExpenses);
    }

    createColorDiag(listData, colorDiagElement) {
        listData.forEach((element, index) => {
            const colorBlockElement = document.createElement('div');
            colorBlockElement.classList.add('color-block-info');
            const spanElement = document.createElement('span');
            spanElement.innerText = element.title;
            const colorElement = document.createElement('div');
            colorElement.classList.add('color-block');
            if (index > this.colors.length - 1) {
                index = 0;
            }
            colorElement.style.backgroundColor = this.colors[index];

            colorBlockElement.appendChild(colorElement);
            colorBlockElement.appendChild(spanElement);

            colorDiagElement.appendChild(colorBlockElement);
        })
    }

}
