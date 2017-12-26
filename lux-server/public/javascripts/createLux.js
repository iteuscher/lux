const CreateLuxForm = document.querySelector('.CreateLuxForm');
CreateLuxForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let adminname = CreateLuxForm.querySelector('.adminname').value
  let adminemail = CreateLuxForm.querySelector('.adminemail').value
  let luxname = CreateLuxForm.querySelector('.luxname').value
  let luxdescription = CreateLuxForm.querySelector('.luxdescription').value
  let q1 = CreateLuxForm.querySelector('.q1').value
  let q2 = CreateLuxForm.querySelector('.q2').value
  
  post('/createLux', { adminname, adminemail, luxname, luxdescription, q1, q2 })
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
