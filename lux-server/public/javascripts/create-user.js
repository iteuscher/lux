const CreateUserForm = document.querySelector('.CreateUserForm');

CreateUserForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let firstname = CreateUserForm.querySelector('.firstname').value
  let lastname = CreateUserForm.querySelector('.lastname').value
  let email = CreateUserForm.querySelector('.email').value
  let password = CreateUserForm.querySelector('.password').value

  post('/createUser', { firstname, lastname, email, password })
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
