function updateUserUI(username) {
    const userLink = document.getElementById('userLink');
    const dropdownLinks = document.getElementById('dropdownLinks');

    if (username) {
        userLink.textContent = username + ' ';
        userLink.href = '#';
        userLink.innerHTML += '<i class="ion-chevron-down"></i>';
        userLink.addEventListener('click', function (event) {
            event.preventDefault();
        })
        dropdownLinks.style.display = 'block';
    } else {
        userLink.textContent = 'đăng nhập ';
        userLink.href = 'http://127.0.0.1:8000/login';
        userLink.innerHTML += '<i class="ion-chevron-down"></i>';
        dropdownLinks.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    if (username) {
        updateUserUI(username);
    }
});

document.getElementById('logoutLink')?.addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    updateUserUI(null); 
    window.location.href = '/';
});