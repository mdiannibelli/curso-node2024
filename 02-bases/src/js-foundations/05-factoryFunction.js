//const { getUuid, getAge } = require('../plugins')

const buildMakePerson = ({getUuid, getAge}) => { // Factory function

    return ({name, birthdate}) => {
        return {
            id: getUuid(),
            name: name,
            birthdate: birthdate, 
            age: getAge(birthdate)
        }    
    }
}

/* const buildPerson = ({ name, birthdate }) => {
    
    return {
        id: getUuid(),
        name: name,
        birthdate: birthdate, 
        age: getAge(birthdate)
    }
} */


/* const obj = { name: 'John', birthdate: '2004-04-18'};

const john = buildPerson(obj);
console.log(john); */

module.exports = {
    buildMakePerson
}