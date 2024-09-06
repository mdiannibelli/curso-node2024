console.log(process.env);

const { COMPUTERNAME } = process.env;
console.table({COMPUTERNAME})