import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from 'fs';
import { CustomError } from "../domain/errors/custom.error";
import { UUIDAdapter } from "../config/uuid.adapter";

export class FileUploadService {
    constructor(
        private readonly uuidAdapter = UUIDAdapter.generateV4
    ) { }

    private checkFolder(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    }

    public async uploadSingleFile(
        file: UploadedFile, folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif', 'pdf']
    ) {
        try {
            const fileExtension = file.mimetype.split('/').at(1) ?? '';
            if (!validExtensions.includes(fileExtension)) throw CustomError.badRequest(`File type not supported: ${fileExtension}, valid ones ${validExtensions}`);

            const fileName = `${this.uuidAdapter()}.${fileExtension}`;
            const destination = path.resolve(__dirname + '../../../', folder); // __dirname => Actual directory
            this.checkFolder(destination);

            file.mv(`${destination}/${fileName}`);

            return { fileName };
        } catch (error) {
            console.log(`${error}`);
            throw CustomError.internalServer("Server Internal Error - check logs");
        }
    }


    public async uploadMultipleFiles(
        files: UploadedFile[], folder: string = 'uploads', validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif', 'pdf']
    ) {
        const allFiles = await Promise.all(
            files.map(file => this.uploadSingleFile(file, folder, validExtensions))
        )

        return allFiles;
    }
}