const countdownElement = document.getElementById('countdown');
const earthElement = document.getElementById('earth');

let endDate = localStorage.getItem('endDate');

if (!endDate) {
  endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  localStorage.setItem('endDate', endDate.toISOString());
} else {
  
  endDate = new Date(endDate);
}

function updateCountdown() {
  const now = new Date();
  const timeLeft = endDate - now;
  
  if (timeLeft < 0) {
    countdownElement.innerHTML = "Countdown ended!";
    localStorage.removeItem('endDate'); 
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const interval = setInterval(updateCountdown, 1000);

updateCountdown();

