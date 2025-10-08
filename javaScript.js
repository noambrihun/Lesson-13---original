class Trip {
  constructor(Landlords, date, kilometers) {
    this.Landlords = Landlords;
    this.date = date;
    this.kilometers = kilometers;
  }
}

class Car {
  constructor(company, model) {
    this.company = company;
    this.model = model;
    this.isAvailable = true;
    this.trips = [];
  }

  get discountKm() {
    let sum = 0;
    for (let i = 0; i < this.trips.length; i++) {
      sum += this.trips[i].kilometers;
    }
    return sum;
  }

  addTrip(trip) {
    this.trips.push(trip);
  }
}

class AllCompanies {
  constructor(companyName) {
    this.companyName = companyName;
    this.cars = [];
  }

  addCar(car) {
    this.cars.push(car);
  }

  getMaxDiscountCar() {
    let maxCar = this.cars[0];
    for (let i = 1; i < this.cars.length; i++) {
      if (this.cars[i].discountKm > maxCar.discountKm) {
        maxCar = this.cars[i];
      }
    }
    return maxCar;
  }

  printCars() {
    let availableCars = this.cars.filter(car => car.isAvailable);
    console.log(availableCars);
  }

  addCarToTrip(carName, trip) {
    for (let i = 0; i < this.cars.length; i++) {
      if (this.cars[i].company === carName) {
        this.cars[i].addTrip(trip);
      }
    }
  }
}

let trip1 = new Trip("noam","12/6/2024",100);
let trip2 = new Trip("omer","15/3/2024",200);
let trip3 = new Trip("yossi","20/4/2024",300);
console.log(trip1);
console.log(trip1.kilometers);
console.log(trip2);
console.log(trip3);

let car1 = new Car("toyota","corolla");
let car2 = new Car("mazda","3");
let car3 = new Car("undai","i20");
console.log(car1);
car1.addTrip(trip1);
console.log(car2);
console.log(car3);

let company1 = new AllCompanies("noamCars");
console.log(company1);

let tasks = [];

try {
  tasks = JSON.parse(localStorage.getItem("todos")) || [];
} catch (err) {
  tasks = [];
}

function renderTasks() {
  let list = document.getElementById("list");
  list.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");
    li.textContent = tasks[i];
    list.appendChild(li);
  }
}

function addTask() {
  let input = document.getElementById("taskInput");
  if (input.value.trim()) {
    tasks.push(input.value.trim());
    localStorage.setItem("todos", JSON.stringify(tasks));
    input.value = "";
    renderTasks();
  }
}

function clearTasks() {
  tasks = [];
  localStorage.removeItem("todos");
  renderTasks();
}

renderTasks();

saveDraft = () => {
  let formData = {
    name: document.getElementsByName("name")[0].value,
    email: document.getElementsByName("email")[0].value,
  };
  sessionStorage.setItem("formDraft", JSON.stringify(formData));
};

let saved = sessionStorage.getItem("formDraft");
if (saved) {
  let data = JSON.parse(saved);
  document.getElementsByName("name")[0].value = data.name;
  document.getElementsByName("email")[0].value = data.email;
}

clearDraft = () => {
  sessionStorage.removeItem("formDraft");
  document.getElementsByName("name")[0].value = "";
  document.getElementsByName("email")[0].value = "";
};

login = () => {
    let username1 = document.getElementsByName("username")[0].value;
    let password1 = document.getElementsByName("password")[0].value;
    if (username1 === "admin" && password1 === "123456") {
        alert("Login successful!");
        localStorage.setItem("loggedInUser", username1);
    } else {
        alert("Invalid username or password.");
    }
}

logout = () => {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully.");
}


window.onload = () => {
    if (localStorage.getItem("loggedInUser")) {
        alert("Welcome back, " + localStorage.getItem("loggedInUser") + "!");
    }else{
        alert("Please log in.");
    }
};