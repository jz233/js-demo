const remember = document.querySelector('.remember');
const forget = document.querySelector('.forget');
const form = document.querySelector('form');

const entername = document.querySelector('#entername');
const submitname = document.querySelector('#submitname');
const forgetname = document.querySelector('#forgetname');

const h1 = document.querySelector('h1');
const greeting = document.querySelector('.personal-greeting');

form.addEventListener('submit', function(e){
  e.preventDefault()
})

submitname.addEventListener('click', function(){
  localStorage.setItem('name', entername.value)

  nameDisplayCheck()
})

forgetname.addEventListener('click', function(){
  localStorage.removeItem('name')
  nameDisplayCheck()
})

function nameDisplayCheck(){
  if(localStorage.getItem('name')){
    let name = entername.value
    h1.textContent = 'Welcome, ' + name
    greeting.textContent = 'Welcome to our website, ' + name + '! We hope you have fun while you are here.'

    forget.style.display = 'block'
    remember.style.display = 'none'
  }else{
    h1.textContent = 'Welcome to our website ';
    personalGreeting.textContent = 'Welcome to our website. We hope you have fun while you are here.';

    forgetDiv.style.display = 'none';
    rememberDiv.style.display = 'block';
  }
}

// window.onload = nameDisplayCheck
document.body.onload = nameDisplayCheck
