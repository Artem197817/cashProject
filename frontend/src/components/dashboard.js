export class Dashboard {
    data = [10, 14, 2, 12, 15, 16, 17, 4, 23];
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

    constructor() {
        this.canvasIncome = document.getElementById('canvas-income');
        this.canvasExpenses = document.getElementById('canvas-expenses');
        this.buttonsFin = document.getElementById('btn-block-fin');
        this.buttonsFin.style.display = 'none';


        this.createCircleDiag(this.canvasIncome, this.data);
        this.createCircleDiag(this.canvasExpenses, this.data);

        window.addEventListener('resize', this.updateContainerWidth.bind(this));
    }

    createCircleDiag(canvas, data) {
        const width = canvas.clientWidth / 2;
        canvas.width = width * 2;
        canvas.height = width * 2;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const total = data.reduce((sum, value) => sum + value, 0);

        let startAngle = 0;

        data.forEach((value, index) => {
            const sliceAngle = (value / total) * 2 * Math.PI; // Угол среза
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
        this.createCircleDiag(this.canvasIncome, this.data);
        this.createCircleDiag(this.canvasExpenses, this.data);
    }


}
