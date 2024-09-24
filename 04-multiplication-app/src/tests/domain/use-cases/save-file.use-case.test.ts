import { SaveFile } from '../../../domain/use-cases/save-file.use-case';
import fs from 'fs';

describe('SaveFileUseCase', () => {

    afterEach(() => {
        // delete outputs/ folder after each test
        const outputsFolderexist = fs.existsSync('outputs');
        if(outputsFolderexist) fs.rmSync('outputs', {recursive: true})
        
        const customOutputsFolderExist = fs.existsSync('custom-outputs');
        if(customOutputsFolderExist) fs.rmSync('custom-outputs', {recursive: true});
    })


    test('should save fiile with default values', () => {
        const saveFile = new SaveFile();

        const options = {
            fileContent: 'testing content'
        }

        const wasSaved = saveFile.execute(options);
        expect(wasSaved).toBe(true);

        const checkfileExist = fs.existsSync('outputs/table.txt');
        const fileContent = fs.readFileSync('outputs/table.txt', {encoding: 'utf-8'});
        
        expect(checkfileExist).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    })  

    test('should save file with custom values', () => {
        const options = {
            fileContent: 'custom content',
            destination: 'custom-outputs',
            fileName: 'custom-table-name'
        }

        const pathFiile = `${options.destination}/${options.fileName}.txt`;

        const saveFile = new SaveFile();
        const wasSaved = saveFile.execute(options);
        expect(wasSaved).toBe(true);

        const checkfileExist = fs.existsSync(pathFiile);
        expect(checkfileExist).toBe(true);

        const fileContent = fs.readFileSync(pathFiile, {encoding: 'utf-8'});
        expect(fileContent).toBe(options.fileContent);
    })

    test('should return false if directory could not be created', () => {
        const options = {
            fileContent: 'custom content',
            destination: 'custom-outputs',
            fileName: 'custom-table-name'
        }
        const saveFile = new SaveFile();
        // Creamos un SPY en mkdirSync y le pasamos un error para que esta función falle al ser ejecutada
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {throw new Error('error')});
        const result = saveFile.execute(options);
        expect(result).toBe(false);

        mkdirSpy.mockRestore();
    })

    test('should return false if file could not be created', () => {
        const options = {
            fileContent: 'custom content',
            destination: 'custom-outputs',
            fileName: 'custom-table-name'
        }
        const saveFile = new SaveFile();
        // Creamos un SPY en fileSync y le pasamos un error para que esta función falle al ser ejecutada
        const mkdirSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {throw new Error('error')});
        const result = saveFile.execute(options);
        expect(result).toBe(false);

        mkdirSpy.mockRestore();
    })
})