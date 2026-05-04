
document.addEventListener('DOMContentLoaded', ()=>{
    console.log(localStorage.getItem('visited_before'))
    let password_input = document.getElementById('password')
    let submit = document.querySelector('.save_btn')
    let panel = document.querySelector('.panel')
    let login_title = document.querySelector('.title')
    function User(password){
        this.password = password
    }
    function savePassword(){
        if(password_input.value.trim() == ''){
            password_input.classList.add('error')
            return false
        }
        localStorage.setItem('user_password', password_input.value)
        localStorage.setItem('visited_before', 'true')
        password_input.value = ''
        password_input.classList.remove('error')
        window.location.href = './schedule.html'
        return true
    }
    submit.addEventListener('click', (e)=>{
        savePassword()
    })
    panel.addEventListener('keydown', (e)=>{
        if(e.key == 'Enter'){
            savePassword()
        }
    })
    if(localStorage.getItem('user_password')){
        window.location.href = './login.html'
    }
})