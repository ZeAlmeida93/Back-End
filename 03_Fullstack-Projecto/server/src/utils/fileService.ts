import path from 'path';
import fs from 'fs';
import {v4 as uuidv4 } from 'uuid';

class FileService {

save(file: any):string {
console.log(file);
    const fileExtension = file.mimetype.split("/")[1]; // Obtains the jpeg extension
    const fileName = uuidv4() + "." + fileExtension; //gets the file extension on the file
    const filePath = path.resolve("static", fileName);
    file.mv(filePath);

    return fileName;
}
delete(fileName: string) {}

}


export default new FileService();