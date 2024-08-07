const countdownElement = document.getElementById('countdown');

// Set the end date to 7 days from now
const endDate = new Date();
endDate.setDate(endDate.getDate() + 7);

function updateCountdown() {
  const now = new Date();
  const timeLeft = endDate - now;
  
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  
  if (timeLeft < 0) {
    clearInterval(interval);
    countdownElement.innerHTML = "Countdown ended!";
  }
}

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);
