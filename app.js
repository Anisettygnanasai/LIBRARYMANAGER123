const apiUrl = 'http://localhost:3000';

// Sign Up Function
async function signup() {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  const response = await fetch(`${apiUrl}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.text();
  alert(data);
}

// Sign In Function
async function signin() {
  const email = document.getElementById('signinEmail').value;
  const password = document.getElementById('signinPassword').value;

  const response = await fetch(`${apiUrl}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.text();
  alert(data);
}

// Add Book Function
async function addBook() {
  const name = document.getElementById('bookName').value;
  const price = parseFloat(document.getElementById('bookPrice').value);

  const response = await fetch(`${apiUrl}/addbook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price })
  });
  
  const data = await response.text();
  alert(data);
}

// Take Book Function
async function takeBook() {
  const name = document.getElementById('takeBookName').value;

  const response = await fetch(`${apiUrl}/takebook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  const data = await response.text();
  alert(data);
}

// Return Book Function
async function returnBook() {
  const name = document.getElementById('returnBookName').value;

  const response = await fetch(`${apiUrl}/returnbook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  const data = await response.text();
  alert(data);
}

// Delete Book Function
async function deleteBook() {
  const name = document.getElementById('deleteBookName').value;

  const response = await fetch(`${apiUrl}/deletebook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  const data = await response.text();
  alert(data);
}

async function showAllBooks() {
    const response = await fetch(`${apiUrl}/showallbooks`);
    const books = await response.json();

    const bookListElement = document.getElementById('bookList');
    bookListElement.innerHTML = ''; // Clear previous content

    books.forEach(book => {
        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-item');
        bookInfo.innerHTML = `<strong>Book:</strong> ${book.name}, <strong>Price:</strong> ${book.price}`;
        bookListElement.appendChild(bookInfo);
    });
}
