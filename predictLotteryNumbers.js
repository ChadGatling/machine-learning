const fs = require("fs");

// read data from file
let input = fs.readFileSync("./assets/lottotexas.csv", "utf8").split("\r\n");
let numbersArray = [];

// objects of each number in a position. With counts of times that number has been drawn in that position.
let numberObjects = [
	{},
	{},
	{},
	{},
	{},
	{}
];

let sortedNumberObject = [
	{},
	{},
	{},
	{},
	{},
	{}
];

// function to print out some shit (this function is a waste of time)
let print = (item) => {
	console.log(item);
};

// split up the data entries, pull out the bits I want, turn them to integers, and send it to numbersArray
input.forEach((entry) => {
	let numbers = entry.split(",").slice(4);

	numbers.forEach((number, index) => {
		numbers[index] = parseInt(number);
	});

	numbersArray.push(numbers)
});

// functions to insert numbers into its designated object
let tally = (item, index) => {

	if (numberObjects[index][item + " "]) {
		numberObjects[index][item + " "]++
	}else {
		numberObjects[index][item + " "] = 1
	}
};

// Sort the enteries by the number of times drawn
let sortDraws = () => {
	numberObjects.forEach((position, index) => {
		let sortable = [];

		for (var number in position) {
			sortable.push([number, position[number]])
		};

		sortable.sort((a, b) => {
			return b[1] - a[1];
		});

		sortable.forEach((item) => {
			sortedNumberObject[index][item[0]] = item[1];
		})
	});
};

// Tally up the times a number has been drawn.
numbersArray.forEach((item) => {
	tally(item[0], 0);
	tally(item[1], 1);
	tally(item[2], 2);
	tally(item[3], 3);
	tally(item[4], 4);
	tally(item[5], 5)
});

sortDraws();

// console.log(JSON.stringify(sortedNumberObject, null, 1))
console.log("\nLotto Texas Number Meta-data.\n");
console.log(`The numbers drawn the most by position are;\n\t${Object.keys(sortedNumberObject[0])[0]}, ${Object.keys(sortedNumberObject[1])[1]}, ${Object.keys(sortedNumberObject[2])[2]}, ${Object.keys(sortedNumberObject[3])[3]}, ${Object.keys(sortedNumberObject[4])[4]}, ${Object.keys(sortedNumberObject[5])[5]}`);