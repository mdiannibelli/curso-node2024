//const template = require('./js-foundations/01-template');
//require('./js-foundations/02-desctructuring');
//const { getUserById }  = require('./js-foundations/03-callbacks');
//const { getUserById }  = require('./js-foundations/04-arrows');

/* const id = 1
getUserById(id, (error, user) => {
    if(error) throw new Error(error);
    console.log({user})
}) */

const { buildMakePerson } = require('./js-foundations/05-factoryFunction');
const { getUuid, getAge } = require('./plugins')

const makePerson = buildMakePerson({getUuid, getAge})

const obj = { name: 'John', birthdate: '2004-04-18'};
const john = makePerson(obj);
console.log(john)

const getPokemonsById = require('./js-foundations/06-promises');
getPokemonsById(1)
    .then(name => console.log(name))
    .catch(err => console.log('Por favor intente de nuevo', err))