import { CreateTable } from '../../domain/use-cases/create-table-use.case';
import { SaveFile } from '../../domain/use-cases/save-file.use-case';
import { ServerApp } from '../../presentations/server-app';
describe('Server app', () => {
    test('should create serverapp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    })

    test('should run ServerApp with options', () => {
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        const options = {
            base: 2,
            limit: 10,
            showTable: false, 
            destination: 'test-destination',
            name: 'test-filename'
        }

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(logSpy).toHaveBeenCalledWith('File created!');
    
        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({base: options.base, limit: options.limit})
    
        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({fileContent: expect.any(String), fileName: options.name, destination: options.destination})
    })
})