import multer from "multer";
import { resolve } from "path";
import crypto from "crypto";

export default {
    upload(folder: string = './tmp') {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder),
                filename: (req, file, callback) => {
                    const filehash = crypto.randomBytes(16).toString('hex');
                    const filename = `${filehash}-${file.originalname}`;
                    callback(null, filename);

                    return callback(null, filename);
                }
            })
        }
    }
}
