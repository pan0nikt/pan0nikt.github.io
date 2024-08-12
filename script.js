document.getElementById("spinButton").addEventListener("click", function() {
    const symbols = ["🍒", "🍋", "🍉", "⭐", "🔔"];
    
    let reel1 = document.getElementById("reel1");
    let reel2 = document.getElementById("reel2");
    let reel3 = document.getElementById("reel3");
    
    reel1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    reel2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    reel3.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    
    if (reel1.textContent === reel2.textContent && reel2.textContent === reel3.textContent) {
        alert("wskibidibi rizz ohayo win!");
    }
});
