const inquirer = require('inquirer');
const fs = require('fs');

const generateCircleSvg = (text, textColor, shapeColor) => `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
<circle cx="150" cy="100" r="80" fill="${shapeColor}" />
<text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>`;

const generateSquareSvg = (text, textColor, shapeColor) => `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
<rect x="50" y="50" width="200" height="200" fill="${shapeColor}" />
<text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>`;

const generateTriangleSvg = (text, textColor, shapeColor) => `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
<polygon points="150, 18 244, 182 56, 182" fill="${shapeColor}" />
<text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>`;

inquirer.prompt([
{
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters for the logo:',
    validate: input => input.length <= 3 || 'Text must be three characters or less',
},
{
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (keyword or hexadecimal):',
},
{
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for the logo:',
    choices: ['circle', 'triangle', 'square'],
},
{
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (keyword or hexadecimal):',
},
]).then(answers => {
const { text, textColor, shape, shapeColor } = answers;

let svgContent;
switch (shape) {
    case 'circle':
    svgContent = generateCircleSvg(text, textColor, shapeColor);
    break;
    case 'triangle':
    svgContent = generateTriangleSvg(text, textColor, shapeColor);
    break;
    case 'square':
    svgContent = generateSquareSvg(text, textColor, shapeColor);
    break;
}

fs.writeFileSync('logo.svg', svgContent.trim());
console.log('Generated logo.svg');
});
