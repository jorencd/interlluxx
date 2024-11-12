  fetch('/order navigation.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('order_navigation').innerHTML = data;
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.product-name').forEach(function(element) {
      const originalText = element.innerText;
      if (originalText.length > 13) {
        element.innerText = originalText.substring(0, 13) + '...';
      }
    });
  });
  
    // Event Listener for tracker buttons
    document.querySelectorAll('.tracker-btn').forEach(button => {
      button.addEventListener('click', function() {
        // Save the target tab to localStorage
        localStorage.setItem('activeTab', this.dataset.target);

        // Redirect to navigation page
        window.location.href = 'tracker.html';
      });
    });