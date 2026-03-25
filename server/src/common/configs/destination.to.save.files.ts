import { diskStorage } from "multer";
import { extname } from "path";
import { Request } from "express";

export const destinationConfig = {
  storage: diskStorage({
    destination: './uploads/images',
    filename: (req: Request, file, callback ) => {
      const ext = extname(file.originalname);
      const uniqSuffix = Date.now() + Math.round(Math.random()*1e9);

      const newUniqName = `${uniqSuffix}${ext}` 

      callback(null, newUniqName)
    }
  })  
}