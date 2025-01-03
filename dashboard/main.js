// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    fetchTotalEarning();
  });
  
  // Fetch total earning from database
  async function fetchTotalEarning() {
    try {
      const response = await fetch('get_total_earning.php');
      const data = await response.json();
      document.getElementById('totalEarning').textContent = data.amount.toFixed(2);
    } catch (error) {
      console.error('Error fetching total earning:', error);
      document.getElementById('totalEarning').textContent = '94.41';
    }
  }
  
  // Click handlers
  function handleVIPClick() {
    window.location.href = 'vip.html';
  }
  
  function handleServiceClick() {
    window.location.href = './service/index.html';
  }
  
  function handleEventsClick() {
    window.location.href = './events/index.html';
  }
  
  function handleWithdrawalClick() {
    window.location.href = './withdrawal/index.html';
  }
  
  function handleHistoryClick() {
    window.location.href = './history/index.html';
  }
  
  function handleFAQClick() {
    window.location.href = './faq/index.html';
  }
  
  function handleTermsClick() {
    window.location.href = './terms/index.html';
  }
  
  function handleHomeClick() {
    window.location.href = 'index.html';
  }
  
  function handleLaunchClick() {
    window.location.href = '../task/index.html';
  }
  
  function handleMyClick() {
    window.location.href = '../profile/index.html';
  }