document.addEventListener('DOMContentLoaded', ()=>{
    let password_input = document.getElementById('password')
    let submit = document.querySelector('.save_btn')
    let panel = document.querySelector('.panel')
    let login_title = document.querySelector('.title')
    let isValide = null
    function handleSubmit(e){
        e.preventDefault()
        const currentPassword = password_input.value
        const storedPassword = localStorage.getItem('user_password')
        if (localStorage.getItem('user_password')){
            isValide = true
        }
        else{
            isValide = false
        }
        if(isValide && localStorage.getItem('visited_before')){
            if(currentPassword == storedPassword){
                password_input.value = ''
                window.location.href = './schedule.html'
            }
            else{
                alert('Неверный пароль! Повторите еще раз')
                password_input.value = ''
            }
        }
    }
    submit.addEventListener('click', (e)=>{
        handleSubmit(e)
    })
    panel.addEventListener('keydown', (e)=>{
        if(e.key == 'Enter'){
            handleSubmit(e)
        }
    })
})