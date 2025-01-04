import { Request, Response } from "express"
import { CustomError } from "../../domain/errors/custom.error"
import { FileUploadService } from "../../services/file-upload.service";
import { error } from "console";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {
    constructor(
        private readonly fileUploadService: FileUploadService
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.log(`${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }

    uploadFile = async (req: Request, res: Response) => {
        // console.log({ files: req.files })
        const folder = req.params.folder;
        const validFolders = ['users', 'products', 'categories'];
        if (!validFolders.includes(folder)) return res.status(400).json({ error: `Folder not supported: ${folder}, valid ones ${validFolders}` });

        const file = req.body.files.at(0) as UploadedFile;

        if (!file || Object.keys(file).length === 0) return res.status(400).json({ error: 'No files were selected' });


        this.fileUploadService.uploadSingleFile(file, `uploads/${folder}`)
            .then(uploaded => res.json({ uploaded }))
            .catch(err => this.handleError(err, res));
    };

    uploadMultipleFiles = async (req: Request, res: Response) => {
        const folder = req.params.folder;
        const validFolders = ['users', 'products', 'categories'];
        if (!validFolders.includes(folder)) return res.status(400).json({ error: `Folder not supported: ${folder}, valid ones ${validFolders}` });

        const files = req.body.files as UploadedFile[];
        if (!files || files.length <= 1) return res.status(400).json({ error: 'No multiple files were selected' });

        this.fileUploadService.uploadMultipleFiles(files, `uploads/${folder}`)
            .then(uploaded => res.json({ uploaded }))
            .catch(err => this.handleError(err, res));
    };
}