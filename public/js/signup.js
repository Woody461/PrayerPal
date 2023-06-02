const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#emailSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();
  //post routes work but the user submitted data isn't making it to the db ahhhhhhhhhh
    if (email && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
        alert('Sign up successful!');
      } else {
        alert('Sign up failed');
      }
    }
  };
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
