function renderAccount(username){
    let myAccount = document.querySelector('.user_name');
    myAccount.innerHTML = `${username} <i class="ion-chevron-down"></i>`;
}
document.addEventListener("DOMContentLoaded", function () {
    const savedUsername = localStorage.getItem('username');
    console.log('saveUsername', savedUsername);
    if (savedUsername) {
        renderAccount(savedUsername);
    }
});
