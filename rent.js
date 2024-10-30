// Search functionality
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', () => {
    const searchQuery = document.querySelector('input').value;
    alert(`You searched for: ${searchQuery}`);
});

// Dropdown categories functionality can be expanded if needed
