const fs = require("fs");
const inquirer = require("inquirer");

const animalCount = parseInt(process.argv[2]); // first argument from program CLI
let animalArray = [];
let animalNames = fs.readFileSync("./assets/animalNames.txt", "utf8").split("\r\n"); // get the data from the text file.

let nameBias = 1;
let heightBias = 1;
let weightBias = 1;
let speedBias = 1;
let strengthBias = 1;
let dexterityBias = 1;
let agressionBias = 1;
let intelligenceBias = 1;

let target = {

	name: "Prototype of perfect fitness",
	height: Math.random(),
	weight: Math.random(),
	speed: Math.random(),
	strength: Math.random(),
	dexterity: Math.random(),
	agression: Math.random(),
	intelligence: Math.random()
};

console.log(printJson(target));

function printJson(json) {
	return JSON.stringify(json, null, 2);
};

function getRandomInt(maximum) {
	return Math.floor(Math.random() * Math.floor(maximum));
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

function Animal() {

	this.name = animalNames[getRandomInt(animalNames.length - 1)];
	this.height = Math.random();
	this.weight = Math.random();
	this.speed = Math.random();
	this.strength = Math.random();
	this.dexterity = Math.random();
	this.agression = Math.random();
	this.intelligence = Math.random();
	this.age = 0;

	this.differanceCoefficient = (
		Math.abs(this.height - target.height) +
		Math.abs(this.weight - target.weight) +
		Math.abs(this.speed - target.speed) +
		Math.abs(this.strength - target.strength) +
		Math.abs(this.dexterity - target.dexterity) +
		Math.abs(this.agression - target.agression) +
		Math.abs(this.intelligence - target.intelligence)
	) / 7
};

function nextGeneration() {

	let animalArrayLength = animalArray.length;

	for (var i = 0; i < animalArrayLength; i++) {
		if (animalArray[i].age >= 10 || animalArray[i].differanceCoefficient > 0.5) {
			animalArray.splice(i, 1)

		}else if (animalArray[i + 1]) {
			let childAnimal = {

				name: animalNames[getRandomInt(animalNames.length - 1)],
				height: (animalArray[i].height + animalArray[i + 1].height / 2) * getRandomArbitrary(-0.5, 0.5),
				weight: (animalArray[i].weight + animalArray[i + 1].weight / 2) * getRandomArbitrary(-0.5, 0.5),
				speed: (animalArray[i].speed + animalArray[i + 1].speed / 2) * getRandomArbitrary(-0.5, 0.5),
				strength: (animalArray[i].strength + animalArray[i + 1].strength / 2) * getRandomArbitrary(-0.5, 0.5),
				dexterity: (animalArray[i].dexterity + animalArray[i + 1].dexterity / 2) * getRandomArbitrary(-0.5, 0.5),
				agression: (animalArray[i].agression + animalArray[i + 1].agression / 2) * getRandomArbitrary(-0.5, 0.5),
				intelligence: (animalArray[i].intelligence + animalArray[i + 1].intelligence / 2) * getRandomArbitrary(-0.5, 0.5),
				age: 0
			};

			childAnimal.differanceCoefficient = (
					Math.abs(childAnimal.height - target.height) +
					Math.abs(childAnimal.weight - target.weight) +
					Math.abs(childAnimal.speed - target.speed) +
					Math.abs(childAnimal.strength - target.strength) +
					Math.abs(childAnimal.dexterity - target.dexterity) +
					Math.abs(childAnimal.agression - target.agression) +
					Math.abs(childAnimal.intelligence - target.intelligence)
				) / 7;

			animalArray.push(childAnimal);
		};

		animalArray[i].age++;
	};

	loop();
};

// Create animals from animal constructor and amount input
for (var i = 0; i < animalCount; i++) {
	animalArray[i] = new Animal();
};

function loop() {

	// Find the fittest (lowest differance coefficient) animals and mate them.
	animalArray.sort((a, b) => {
		return a.differanceCoefficient - b.differanceCoefficient;
	});

	console.log(printJson(animalArray[0]));
	console.log(printJson(animalArray[1]));
	console.log(printJson(animalArray[2]));
	console.log("Number of animals:", animalArray.length);


	inquirer.prompt([
		{
			type: "confirm",
			name: "continue",
			message: "Fittest animals found. Proceed with mating?"
		}
	]).then(input => {
		if (input.continue) {
			nextGeneration()
		}
	})
};

loop()