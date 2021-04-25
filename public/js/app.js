console.log('Hello from frontend');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  const url = `http://localhost:3000/weather?address=${location}`;
  fetch(url).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    })
  );
});

search.addEventListener('keyup', () => {
  if (search.value == '') {
    messageOne.textContent = '';
    messageTwo.textContent = '';
  }
});
