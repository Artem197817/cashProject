import {Calendar} from 'vanilla-calendar-pro';
import {IncomeAndExpenses} from "./income-expenses";
import {Dashboard} from "./dashboard";


export class SecondLayout {

    static dateFilterFrom;
    static dateFilterTo;

    constructor() {
        this.buttonsBlockElement = document.querySelectorAll('.btn-outline-secondary');
        this.buttonsBlockElement.forEach(button => {
            button.addEventListener('click', () => {

                this.buttonsBlockElement.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });

        this.buttonInterval = document.getElementById('interval');
        this.buttonToday = document.getElementById('btn-today');
        this.buttonToday.addEventListener('click', () => {
            this.updateTo('')
        });
        this.buttonWeek = document.getElementById('btn-week');
        this.buttonWeek.addEventListener('click', () => {
            this.updateTo('week')
        });
        this.buttonMonth = document.getElementById('btn-month');
        this.buttonMonth.addEventListener('click', () => {
            this.updateTo('month')
        });
        this.buttonYear = document.getElementById('btn-year');
        this.buttonYear.addEventListener('click', () => {
            this.updateTo('year')
        });


        const calendar = new Calendar('#calendar', {
            inputMode: true,
            selectionDatesMode: 'multiple-ranged',
            locale: 'ru-RU',
            onClickDate(self) {
                const arrDate = self.context.selectedDates;
                if (arrDate && arrDate.length === 2) {
                    if (arrDate[1] && arrDate[0]) {
                        if (arrDate[0] > arrDate[1]) {
                            let tempDate = arrDate[0];
                            arrDate[0] = arrDate[1];
                            arrDate[1] = tempDate;
                        }
                        const dateFilterFromElement = document.getElementById('link-interval-start');
                        dateFilterFromElement.innerText = arrDate[0];
                        const dateFilterToElement = document.getElementById('link-interval-end');
                        dateFilterToElement.innerText = arrDate[1];
                        const pathname = window.location.href.split('/');
                        const page = pathname[pathname.length - 1];
                        if (page === 'income-and-expenses') {
                            IncomeAndExpenses.updateTable('interval', arrDate[0], arrDate[1]).then();
                        } else {
                            Dashboard.updateDiag('interval', arrDate[0], arrDate[1]);
                        }
                    }
                }
            },

        });

        calendar.init();

    }

    updateTo(period = 'all', dateFilterFrom = null, dateFilterTo = null) {
        const pathname = window.location.href.split('/');
        const page = pathname[pathname.length - 1];
        if (page === 'income-and-expenses') {
            IncomeAndExpenses.updateTable(period, dateFilterFrom, dateFilterTo).then();
        } else {
            Dashboard.updateDiag(period, dateFilterFrom, dateFilterTo);
        }
    }
}

