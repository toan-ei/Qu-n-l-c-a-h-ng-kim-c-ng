
function start(){
    getFormSignUp(); 
    formLogin();
}
start(); 

function getFormSignUp(){
    let signUpBtn = document.querySelector('.dang_ki')
    signUpBtn.addEventListener('click', function(event){
        event.preventDefault();
        let userName = document.querySelector(".user_name_dk").value;
        let email = document.querySelector(".email_dk").value;
        let password = document.querySelector(".password_dk").value;
        if(userName === '' || email === '' || password === ''){
            alert('vui Lòng nhập đầy đủ dữ liệu');
            return
        }
        if(!email.endsWith("@gmail.com")){
            alert('Email không hợp lệ. vui lòng sử dụng email với đuôi @gmail.com');
            return
        }
        const data = {
            username: userName,
            email: email,
            password: password
        }
        console.log(data);
        createUser(data);
    })
}

function createUser(data){
    const apiregister = 'http://127.0.0.1:8000/api/users/user';
    fetch(apiregister, {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    .then(function(response){
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || "Đăng ký thất bại");
            });
        }
        return response.json();
    })
    .then(function(data){
        alert('đăng kí thành công');
        console.log("User:", data);
    })
    .catch(function(error){
        alert(`Đăng ký thất bại: ${error.message}`);
        console.log('Error:',  error)
    })
}

function formLogin() {
    let loginBtn = document.querySelector('.dang_nhap');
    loginBtn.addEventListener('click', function(event) {
        event.preventDefault(); 
        let username = document.querySelector('.username_dn').value;
        let password = document.querySelector('.password_dn').value;
        if (username === '' || password === '') {
            alert('vui Lòng nhập đầy đủ dữ liệu');
            return;
        }
        const data = {
            username: username,
            password: password
        }
        console.log(data);
        loginUser(data);
    });
}


function loginUser(data){
    const apiLogin = 'http://127.0.0.1:8000/api/users/login';
    fetch(apiLogin, {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    .then(function(response){
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Đăng nhập thất bại');
        }
    })
    .then(function(responseData){
        console.log('Response:', responseData);
        window.location.href = '/sanpham';
    })
    .catch(function(error){
        console.error('Error:', error);
    });
}


  