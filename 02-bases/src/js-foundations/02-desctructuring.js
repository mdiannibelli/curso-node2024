console.log(process.env);

const { COMPUTERNAME } = process.env;
console.table({COMPUTERNAME})


const characters = ['Flash', 'Superman', 'Green Lantern', 'Batman'];
const [, , , batman] = characters;

module.exports = {
    characters
}