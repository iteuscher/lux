const CreateUserForm = document.querySelector('.CreateUserForm');
CreateUserForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let firstname = CreateUserForm.querySelector('.firstname').value
  let lastname = CreateUserForm.querySelector('.lastname').value
  let email = CreateUserForm.querySelector('.email').value
  let password = CreateUserForm.querySelector('.password').value

  post('/createUser', { firstname, lastname, email, password })
});

const LoginForm = document.querySelector('.LoginForm');
LoginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = LoginForm.querySelector('.email').value
  const password = LoginForm.querySelector('.password').value

  post ('/login', { email, password })
    // .then (({ status }) => {
    //   if (status === 200) {
    //     alert('login of ' + email + ' was successful!')
    //     //need to send the user to the admin page
    //     // post('/adminpage', email);
    //   }
    //
    //   if (status !== 200)  alert('Login Failed. Please try again.') ;
    // })
});

function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
