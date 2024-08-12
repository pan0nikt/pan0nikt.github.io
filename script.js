document.getElementById("spinButton").addEventListener("click", function() {
    const symbols = ["🍒", "🍋", "🍉", "⭐", "🔔", "🍇", "💎"];
    const winMessage = document.getElementById("winMessage");

    let reel1 = document.getElementById("reel1");
    let reel2 = document.getElementById("reel2");
    let reel3 = document.getElementById("reel3");

    function createSymbolElement(symbol) {
        const symbolElement = document.createElement("div");
        symbolElement.className = "symbol";
        symbolElement.textContent = symbol;
        return symbolElement;
    }

    function spinReel(reel, duration, stopSymbol) {
        return new Promise((resolve) => {
            const symbolContainer = document.createElement("div");
            symbolContainer.className = "symbol-container";

            for (let i = 0; i < 3; i++) {
                symbols.forEach(symbol => {
                    symbolContainer.appendChild(createSymbolElement(symbol));
                });
            }

            symbolContainer.appendChild(createSymbolElement(stopSymbol));

            reel.innerHTML = ''; 
            reel.appendChild(symbolContainer);

            const symbolHeight = 150;
            const stopPosition = -(symbolHeight * (symbols.length * 2 + symbols.indexOf(stopSymbol)));

            setTimeout(() => {
                symbolContainer.style.transform = `translateY(${stopPosition}px)`;
            }, 10);

            setTimeout(() => {
                resolve(stopSymbol);
            }, duration * 1000);
        });
    }

    const duration1 = Math.random() * 1.5 + 2;
    const duration2 = Math.random() * 1.5 + 2.5;
    const duration3 = Math.random() * 1.5 + 3;

    const stopSymbol1 = symbols[Math.floor(Math.random() * symbols.length)];
    const stopSymbol2 = symbols[Math.floor(Math.random() * symbols.length)];
    const stopSymbol3 = symbols[Math.floor(Math.random() * symbols.length)];

    winMessage.className = '';  

    Promise.all([
        spinReel(reel1, duration1, stopSymbol1),
        spinReel(reel2, duration2, stopSymbol2),
        spinReel(reel3, duration3, stopSymbol3)
    ]).then(results => {
        const [result1, result2, result3] = results;

        if (result1 === result2 && result2 === result3) {
            if (result1 === '⭐') {
                winMessage.textContent = 'JACKPOT!!!';
                winMessage.classList.add('jackpot');
            } else {
                winMessage.textContent = 'MEGA BIG WIN!!!';
                winMessage.classList.add('show');
            }
        }
    });
});
