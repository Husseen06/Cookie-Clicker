class Clicker {
    constructor(start) {
        this.count = start;
        this.cookiesPerClick = 1;
        this.displayCount();
    }

    click() {
        this.count += this.cookiesPerClick;
        this.displayCount();
    }

    displayCount() {
        const cookieCountElement = document.getElementById('cookie-count');
        cookieCountElement.textContent = this.count;
    }

    purchaseUpgrade(cost, multiplier, buttonElement) {
        if (this.count >= cost) {
            this.count -= cost;
            this.cookiesPerClick *= multiplier;
            buttonElement.style.display = 'none';
            this.displayCount();
        } else {    
                alert("Not enough cookies!");
        }
    }
}

let clicker1 = new Clicker(0);

const cookie = document.getElementById('cookie');
cookie.addEventListener('click', () => {
    clicker1.click();
});

const doubleClickerButton = document.querySelector('.upgrade-item:nth-child(1)');
bleClickerButton = document.querySelector('.upgrade-item:nth-child(2)');
const tripleClickerButton = document.querySelector('.upgrade-item:nth-child(3)');
const quadrupleClickerButton = document.querySelector('.upgrade-item:nth-child(4)');

doubleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(50, 2, doubleClickerButton);
});

tripleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(250, 3, tripleClickerButton);
});

quadrupleClickerButton.addEventListener('click', () => {
    clicker1.purchaseUpgrade(750, 4, quadrupleClickerButton);
});
