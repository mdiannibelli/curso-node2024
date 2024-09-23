import fs from 'fs';

export interface SaveFileUseCase {
    execute: (options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
    fileContent: string 
    destination?: string 
    fileName?: string 
}


export class SaveFile implements SaveFileUseCase {
    constructor() {

    }

    execute({fileContent, fileName = 'table.txt', destination = 'outputs'}:SaveFileOptions): boolean {
        try {
            fs.mkdirSync(destination, {recursive: true});
            fs.writeFileSync(`${destination}/${fileName}.txt`, fileContent);
            console.log('File created!');
            return true;
        } catch (error) { 
            console.log(error);
            return false;
        }
    }
}