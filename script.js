document.getElementById("spinButton").addEventListener("click", function() {
    const symbols = ["🍒", "🍋", "🍉", "⭐", "🔔", "🍇", "💎"];
    
    let reel1 = document.getElementById("reel1");
    let reel2 = document.getElementById("reel2");
    let reel3 = document.getElementById("reel3");

    function createSymbolElement(symbol) {
        const symbolElement = document.createElement("div");
        symbolElement.className = "symbol";
        symbolElement.textContent = symbol;
        return symbolElement;
    }

    function spinReel(reel, duration) {
        return new Promise((resolve) => {
            // Clear previous symbols
            while (reel.firstChild) {
                reel.removeChild(reel.firstChild);
            }

            // Add symbols
            symbols.forEach(symbol => {
                reel.appendChild(createSymbolElement(symbol));
            });

            // Duplicate the symbols to loop back
            symbols.forEach(symbol => {
                reel.appendChild(createSymbolElement(symbol));
            });

            // Trigger animation
            reel.style.animation = `spin ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`;

            setTimeout(() => {
                reel.style.animation = "";
                resolve();
            }, duration * 1000);
        });
    }

    // Randomize spin duration
    const duration1 = Math.random() * 1.5 + 1.5;
    const duration2 = Math.random() * 1.5 + 1.5;
    const duration3 = Math.random() * 1.5 + 1.5;

    spinReel(reel1, duration1).then(() => {
        return spinReel(reel2, duration2);
    }).then(() => {
        return spinReel(reel3, duration3);
    }).then(() => {
        // Check if all symbols match after the reels stop
        const result1 = reel1.children[symbols.length].textContent;
        const result2 = reel2.children[symbols.length].textContent;
        const result3 = reel3.children[symbols.length].textContent;
        if (result1 === result2 && result2 === result3) {
            alert("skibidibi win esz!");
        }
    });
});
