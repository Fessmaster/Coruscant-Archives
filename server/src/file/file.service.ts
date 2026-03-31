import { Injectable, OnModuleInit } from '@nestjs/common';
import { existsSync, mkdirSync, rm, rmSync,} from 'fs';
import { writeFile,  } from 'fs/promises';
import { extname, join,  } from 'path';

@Injectable()
export class FileService implements OnModuleInit {
  
  private readonly UPLOAD_PATH = join(process.cwd(), 'upload')

  onModuleInit() {    
    if (!existsSync(this.UPLOAD_PATH)){
      mkdirSync(this.UPLOAD_PATH, { recursive: true })
    }
  }

  saveFile(img: Express.Multer.File) {   
    const fileName = `${Date.now() + Math.round(Math.random() * 1e9)}${extname(img.originalname)}`;
    const filePath = join(process.cwd(), 'upload', fileName);
    writeFile(filePath, img.buffer);

    return fileName
  }

  deleteFile(fileName: string){
    try {
      rmSync(join(this.UPLOAD_PATH, fileName))
    } catch (error) {
      console.error(`An error occurred while try to delete file ${fileName}`);      
    }
  }

  deleteFiles(imgList: string[]){
    for (const fileName of imgList){
      try {
        rmSync(join(this.UPLOAD_PATH, fileName))
      } catch (error) {
        console.error(`An error occurred while try to delete file ${fileName}`);
      }
    }
  }
}

