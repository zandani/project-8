// Fetches 12 random user objects from randomuser.me and passes them to directory()
fetch('https://fsjs-public-api-backup.herokuapp.com/api/')
  .then(response => response.json())
  .then(data => directory(data.results))
  .catch(error => console.error('Error fetching data:', error)
);



const directory = employees => {
  const gallery = document.querySelector('.grid-container');

  employees.forEach( employee => {
    gallery.innerHTML += `
    <div class="card">
      <div class="card-img-container">
        <img class="card-img" src="${employee.picture.large}" alt="${employee.name.first}'s profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="card-text">${employee.email}</p>
        <p class="card-text cap">${employee.location.city}</p>
      </div>
    </div>
  `;
  });

  gallery.querySelectorAll('.card').forEach((card, index) => {
    card.addEventListener('click', () => {
      modal(employees[index]);
    });
  });

};



const modal = employee => {
  const modalContainer = document.querySelector('.modal-container');
  const dob = new Date(Date.parse(employee.dob.date)).toLocaleDateString(navigator.language); // Formats date depending on users locale.

  modalContainer.innerHTML = `
    <div class="modal">
    <p class="close">x</p>
      <div class="modal-info-container">
        <img class="modal-img" src="${employee.picture.large}" alt="${employee.name.first}'s profile picture">
        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="modal-text">${employee.email}</p>
        <p class="modal-text cap">${employee.location.city}</p><hr>
        <p class="modal-text">${employee.phone}</p>
        <p class="modal-text cap">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state} ${employee.location.postcode}</p>
        <p class="modal-text">Birthday: ${dob}</p>
      </div>
    </div>
  `;

//closing the overlay

  modalContainer.style.display = 'block';

  const close = document.querySelector('.close');

  close.addEventListener('click', () => {
    modalContainer.style.display = 'none';
  });
};
