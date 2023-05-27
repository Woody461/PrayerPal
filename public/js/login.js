const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#emailLogin').value.trim();
  const password = document.querySelector('#passwordLogin').value.trim();
//post routes are working but the login page can't read the data submitted fml
  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Wrong username and/or password');
    }
  }
};
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
