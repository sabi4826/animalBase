"use strict";

window.addEventListener("DOMContentLoaded", start);

const allAnimals = [];

// Make prototype:
const Animal = {
  name: "",
  type: "",
  desc: "",
  age: "",
};

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array

    // create object from prototype:
    const animal = Object.create(Animal);

    // make lets for the desired categories: (?)
    let name = jsonObject.fullname.substring(0, jsonObject.fullname.indexOf(" ")); // finds first word from [0] to first " ".
    let type = jsonObject.fullname.substring(jsonObject.fullname.lastIndexOf(" "));
    let description = jsonObject.fullname.substring(jsonObject.fullname.indexOf(" ") + 4, jsonObject.fullname.lastIndexOf(" "));
    console.log("description is:", description);
    let age = jsonObject.age;

    // set new properties to object values (the new object (animal) created from prototype) - kan også gøres direkte uden lets først:
    animal.name = name;
    animal.type = type;
    animal.desc = description;
    animal.age = age;

    // push to empty array allAnimals:
    allAnimals.push(animal);
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
