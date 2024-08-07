const countdownElement = document.getElementById('countdown');

// Check if end date is already in localStorage
let endDate = localStorage.getItem('endDate');

if (!endDate) {
  // If not, set end date to 7 days from now and store it in localStorage
  endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  localStorage.setItem('endDate', endDate.toISOString());
} else {
  // If end date exists in localStorage, parse it
  endDate = new Date(endDate);
}

function updateCountdown() {
  const now = new Date();
  const timeLeft = endDate - now;
  
  if (timeLeft < 0) {
    // Countdown has ended
    countdownElement.innerHTML = "Countdown ended!";
    localStorage.removeItem('endDate'); // Remove endDate from localStorage
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);

// Initial call to display the countdown immediately
updateCountdown();
