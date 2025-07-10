document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!name || !email || !password) {
    alert('All fields are required!');
    return;
  }

  const user = { name, email, password };
  localStorage.setItem('skillexa-user', JSON.stringify(user));
  alert('Signup successful! Please login.');
  window.location.href = 'login.html';
});
