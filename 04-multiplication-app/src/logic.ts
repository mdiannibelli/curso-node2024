import fs from "fs";
import { yarg } from "./config/plugins/yargs-plugin";

let outputMessage = '';
const base = yarg.b
const headerMessage = `
==========================
        Tabla del ${base}
==========================
`;

for(let i = 1; i <= yarg.l; i++) {
    outputMessage += `${base} x ${i} = ${base * i}\n`; 
}

outputMessage = headerMessage + outputMessage;

const outputPath = 'outputs'
fs.mkdirSync(outputPath, {recursive: true});
fs.writeFileSync(`${outputPath}/table-${base}.txt`, outputMessage);


if(yarg.s) console.log(outputMessage);