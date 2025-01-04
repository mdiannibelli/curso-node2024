import { Router } from "express";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../../services/file-upload.service";
import { UUIDAdapter } from "../../config/uuid.adapter";
import { FilesMiddleware } from "../../middlewares/files.middleware";
import { ValidFoldersMiddleware } from "../../middlewares/valid-folders.middleware";

export class FilesUploadRouter {
    static get routes(): Router {
        const router = Router();

        const fileUploadService = new FileUploadService(UUIDAdapter.generateV4);
        const controller = new FileUploadController(fileUploadService);

        // router.use(ValidFoldersMiddleware.validFolders(['users','products', 'categories']))

        // api/upload/single/ <user|category|product>/
        // api/upload/multiple/ <user|category|product>/
        router.post('/single/:folder', [AuthMiddleware.authRequired, FilesMiddleware.containsFiles], controller.uploadFile);
        router.post('/multiple/:folder', [AuthMiddleware.authRequired, FilesMiddleware.containsFiles], controller.uploadMultipleFiles);

        return router;
    }
}