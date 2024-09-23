import { CreateTable } from "../domain/use-cases/create-table-use.case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number 
    limit: number 
    showTable: boolean
    name: string 
    destination: string 
}

export class ServerApp {

    static run(options: RunOptions) {
        const { base, limit, showTable, name, destination } = options;
        console.log("Server running...");
        
        const table = new CreateTable().execute({base, limit});
        const wasSaved = new SaveFile().execute({fileContent: table, fileName: name, destination: destination});

        if(showTable) console.log(table);

    }
};