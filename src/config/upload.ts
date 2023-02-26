import multer from "multer";
import crypto from "crypto";
import { resolve } from "path";

export default {
    upload(folder: string = './tmp') {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder),
                filename: (req, file, callback) => {

                    const filehash = crypto.randomBytes(16).toString('hex');
                    const filename = `${filehash}-${file.originalname}`;

                    return callback(null, filename);
                }
            })
        }
    }
}
