const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");

registerbtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginbtn.addEventListener("click", () => {
  container.classList.remove("active");
});



document.querySelector('.sign-up form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.querySelector('input[placeholder="Name"]').value;
  const email = e.target.querySelector('input[placeholder="Email"]').value;
  const password = e.target.querySelector('input[placeholder="Password"]').value;

  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
    alert('Registration successful!');
  } else {
    alert('Registration failed.');
  }
});

document.querySelector('.sign-in form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[placeholder="Email"]').value;
  const password = e.target.querySelector('input[placeholder="Password"]').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    alert('Login successful!');
  } else {
    alert('Login failed.');
  }
});