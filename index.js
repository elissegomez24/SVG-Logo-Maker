const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
{
    type: "input",
    name: "text",
    message: "Enter up to three characters:",
    validate: (input) =>
    input.length <= 3 || "Please enter up to three characters only.",
},
{
    type: "input",
    name: "textColor",
    message: "Enter the text color (color keyword or hexadecimal):",
},
{
    type: "list",
    name: "shape",
    message: "Choose a shape:",
    choices: ["circle", "triangle", "square"],
},
{
    type: "input",
    name: "shapeColor",
    message: "Enter the shape color (color keyword or hexadecimal):",
},
];

inquirer.prompt(questions).then((answers) => {
const { text, textColor, shape, shapeColor } = answers;

let shapeElement = "";
switch (shape) {
    case "circle":
    shapeElement = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
    break;
    case "triangle":
    shapeElement = `<polygon points="150,18 244,182 56,182" fill="${shapeColor}" />`;
    break;
    case "square":
    shapeElement = `<rect x="70" y="20" width="160" height="160" fill="${shapeColor}" />`;
    break;
}

const svgContent = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
${shapeElement}
<text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>`;

fs.writeFileSync("logo.svg", svgContent);
console.log("Generated logo.svg");
});
