import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';

class FileService {
  save(file: UploadedFile): string {
    const fileExtension = file.mimetype.split('/')[1];
    const fileName = uuidv4() + '.' + fileExtension;
    const filePath = path.resolve('static', fileName);
    file.mv(filePath);
    return fileName;
  }

  delete(fileName: string): void {
    const filePath = path.resolve('static', fileName);
    fs.unlinkSync(filePath);
  }
}
export default new FileService();
