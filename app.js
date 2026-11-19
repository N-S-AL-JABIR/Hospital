const loadServices = () => {
  fetch("https://testing-8az5.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => DisplayServices(data))
    .catch((err) => console.log(err));
};
const DisplayServices = (services) => {
  services.forEach((service) => {
    const parent = document.getElementById("slider-container");
    const li = document.createElement("li");
    li.classList.add("slide-visible");
    li.innerHTML = `
    <div class="card shadow h-100">
        <div class="ratio ratio-16x9">
            <img class="card-img-top" loading="lazy" alt="..." src=${
              service.image
            }>
        </div>
        <div class="card-body  p-3 p-xl-5">
            <h3 class="card-title h5">${service.name}</h3>
            <p class="card-text">${service.description.slice(0, 140)}...</p>
            <a href="#" class="btn btn-primary">Details</a>
        </div>
    </div>
    `;
    parent.appendChild(li);
  });
};

const loadDoctors = (
  url = "https://testing-8az5.onrender.com/doctor/list/"
) => {
  document.getElementById("loading").style.display = "block";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length > 0) {
        document.getElementById("loading").style.display = "none";
        DisplayDoctors(data);
      } else {
        document.getElementById("doctors").innerHTML = "";
        document.getElementById("loading").style.display = "none";
        document.getElementById("no-data").style.display = "block";
      }
    });
};

const DisplayDoctors = (doctors) => {
  const parent = document.getElementById("doctors");
  doctors.results.forEach((doctor) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="doc-card text-center mb-2">
              <img class="doctors-img" src="${doctor.image}" alt="" />
              <h4>${doctor.full_name}</h4>
              <h6>${doctor.designation}</h6>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Delectus, incidunt?
              </p>
              <p>${doctor.specialization?.map((item) => {
                return `<button class="btn btn-outline-secondary btn-sm">${item}</button>`;
              })} </p>
              <button class="btn btn-outline-info">
              <a target="_blank" class="text-decoration-none" href='docDetails.html?doctorId=${
                doctor.id
              }'>Details</a>
              </button>
            </div>
    `;
    parent.appendChild(div);
    if (doctors.next) {
      const url = `https://testing-8az5.onrender.com/doctor/list/?page=${
        doctors.next.split("=")[1]
      }`;
      loadDoctors(url);
    }
  });
};

const loadDesignations = () => {
  fetch("https://testing-8az5.onrender.com/doctor/designation/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((designation) => {
        const parent = document.getElementById("designations");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerHTML = `
        <li onclick="filterSearch('${designation.name}')">${designation.name}</li>
        `;
        parent.appendChild(li);
      });
    });
};
const loadSpecializations = () => {
  fetch("https://testing-8az5.onrender.com/doctor/specialization/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((specialization) => {
        const parent = document.getElementById("specializations");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerHTML = `
        <li onclick="filterSearch('${specialization.name}')">${specialization.name}</li>
        `;
        parent.appendChild(li);
      });
    });
};
const filterSearch = (value) => {
  document.getElementById("doctors").innerHTML = "";
  const url = `https://testing-8az5.onrender.com/doctor/list/?search=${
    value ? value : ""
  }`;
  loadDoctors(url);
};

const handleSearch = () => {
  const searchInput = document.getElementById("search-input").value;
  if (searchInput) {
    filterSearch(searchInput);
  } else {
    filterSearch();
  }
};

const loadReviews = () => {
  fetch("https://testing-8az5.onrender.com/doctor/review/")
    .then((res) => res.json())
    .then((data) => {
      const parent = document.getElementById("review-container");
      data.forEach((review) => {
        const div = document.createElement("div");
        div.classList.add("review-card", "slide-visible");
        div.innerHTML = `
              <div class="review-card">
                <img class="card-img rounded-circle w-50" src="./Images/629.jpg" alt="client1" />
                <h4 class="card-title">${review.reviewer}</h4>
                <p class="card-text">
                 ${review.body.slice(0, 140)}..
                </p>
                <p>${review.rating}</p>
              </div>
              `;
        parent.appendChild(div);
      });
    });
};
loadReviews();
loadDoctors();
loadServices();
loadDesignations();
loadSpecializations();
