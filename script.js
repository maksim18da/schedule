document.addEventListener("DOMContentLoaded", function(){
    function get_week_number (date){
        const firstdayOfmonth = new Date(date.getFullYear(), date.getMonth(), 1)
        let firstWeekday = firstdayOfmonth.getDay()
        firstWeekday = firstWeekday === 0 ? 7 : firstWeekday
        const dayofMonth = date.getDate()
        const weekNumber = Math.ceil((dayofMonth + (firstWeekday-1))/7)
        return weekNumber == 1 ? "first" : weekNumber == 2 ? "second" : 
        weekNumber == 3 ? "third" : weekNumber == 4 ? "fourth" : weekNumber == 5 ? "fifth" : null
    }
    function get_month_name(date){
        const month = ["January", "February", "March", "April", 
                "May", "June", "July", "August", "September", "October", "November", "December"];
        return month[date.getMonth()]
    }
    date = new Date()
    let week_name = document.querySelector(".week_name").textContent = `week: ${get_week_number(date)} - ${date.getDate()}`
    let month_name = document.querySelector(".month_name").textContent = `month:${get_month_name(date)}`
    let days = document.querySelectorAll(".day")
    let schedule = document.querySelector(".schedule")
    let currentDay = 'monday'
    days.forEach(element => {
        element.addEventListener("click", () =>{
            currentDay = element.querySelector('.title_day span').textContent.toLowerCase()
            loadTasksForDay(currentDay)
            element.parentElement.classList.toggle("active")
            schedule.classList.toggle("active")
        })
    });

    let task = document.getElementById('task')
    let submit = document.getElementById('submit')
    let tasks_containier = document.querySelector('.tasks')
    let task_add = document.querySelector('.task_add')
    let search_box = document.querySelector('.search')
    let search_task = document.querySelector('.search_task')
    let search_btn = document.querySelector('.search_btn')
    let task_time = document.querySelector('.task_time')
    let time_btn = document.querySelector('.time_btn')
    let close_btn = document.querySelector('.close_btn')
    let tasksByDay = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    }
    function saveTasks(){
        localStorage.setItem('tasksByDay', JSON.stringify(tasksByDay))
    }
    function loadTasks(){
        const savedTasks = localStorage.getItem('tasksByDay')
        if(savedTasks){
            tasksByDay = JSON.parse(savedTasks)
        }
    }
    function timeToNumber(time){
        const [hours, minutes] = time.split(':')
        return +hours + +minutes/60
    }
    function addTask(){
        const time = document.getElementById('time_task')
        tasksByDay[currentDay].push({time: time.value, text:task.value})
        tasksByDay[currentDay].sort((a,b)=>{
            return timeToNumber(a.time) - timeToNumber(b.time)
        })
        displayTasks(tasksByDay[currentDay])
        saveTasks()
        task.value = ''
        task_time.classList.remove('active')
        time.value = ''
    }
    function displayTasks(tasksArray){
        tasks_containier.innerHTML = ''
        if (tasksArray.length == 0){
            tasks_containier.innerHTML = `<div class = 'no_tasks'>Нет задач на сегодня</div>`
        }
        tasksArray.forEach(element =>{
            let html = `
            <span>${element.time}</span>
            <div class = 'task'>
                <ul>
                    <li>${element.text}</li>
                </ul>
                <button class="completed">Выполнено</button>
            </div>`
            tasks_containier.innerHTML+=html
        })
    }
    function loadTasksForDay(day) {
        const tasks = tasksByDay[day] || []
        displayTasks(tasks)
    }
    function searchTask(){
        const allTasks = document.querySelectorAll('.task')
        const word = search_task.value.toLowerCase().trim()
        if (word == ''){
            allTasks.forEach((e)=>{
                e.style.display = ''
                let timeSpan = e.previousElementSibling
                if (timeSpan && timeSpan.tagName === 'SPAN'){
                    timeSpan.style.display = ''
                }
            })
            return
        }
        allTasks.forEach((e)=>{
            let timeSpan = e.previousElementSibling
            let liElm = e.querySelector('li')
            if (e.classList.contains('task')){
                if (liElm.textContent.toLowerCase().includes(word)){
                    e.style.display = ''
                    if (timeSpan && timeSpan.tagName === 'SPAN'){
                        timeSpan.style.display = ''
                    }
                    console.log(`Найдена задача по слову ${word}`)
                }
                else{
                    e.style.display = 'none'
                    if (timeSpan && timeSpan.tagName === 'SPAN'){
                        timeSpan.style.display = 'none'
                    }
                    console.log(`Задача по слову ${word} не найдена`)
                }
            }
        })
    }
    submit.addEventListener('click', function(){
        if(task.value.trim() == ''){
            task.classList.add('error')
            return
        }
        task.classList.remove('error')
        task_time.classList.add('active')
    })
    task_add.addEventListener('keydown', (e)=>{
        if (e.key === 'Enter'){
        if(task.value.trim() == ''){
            task.classList.add('error')
            return
        }
        task.classList.remove('error')
        task_time.classList.add('active')
        }
    })
    tasks_containier.addEventListener('click', function(e){
        if(e.target.classList.contains('completed')){
            let taskDiv = e.target.closest('.task')
            let timeSpan = taskDiv.previousElementSibling
            let taskText = taskDiv.querySelector('li').textContent
            let taskTime = timeSpan.textContent
            setTimeout(()=>{
                tasksByDay[currentDay] = tasksByDay[currentDay].filter(task =>{
                    return !(task.time == taskTime && task.text == taskText)
                })
                displayTasks(tasksByDay[currentDay])
                saveTasks()
            },10)
        }
    })
    time_btn.addEventListener('click', ()=>{
        addTask()
    })
    task_time.addEventListener('keydown', (e)=>{
        if(e.key == 'Enter'){
            e.preventDefault()
            addTask()
        }
    })
    search_btn.addEventListener('click', ()=>{
        searchTask()
    })
    search_box.addEventListener('keydown', (e)=>{
        if(e.key =='Enter'){
              e.preventDefault()
              searchTask()
        }
    })
    loadTasks()
    close_btn.addEventListener('click', ()=>{
        const days = document.querySelector('.days')
        days.classList.toggle('active')
        schedule.classList.toggle('active')
    })
})

