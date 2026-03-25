import { Injectable, OnModuleInit } from '@nestjs/common';
import { existsSync, mkdir } from 'fs';
import { writeFile,  } from 'fs/promises';
import { extname, join,  } from 'path';

@Injectable()
export class FileService implements OnModuleInit {
  onModuleInit() {
    if (!existsSync(join(process.cwd(), 'upload'))){
      mkdir(join(process.cwd(), 'upload'), { recursive: true }, (err) =>{
        throw new Error('Error while creating directory')
      })
    }
  }

  saveFile(img: Express.Multer.File) {   
    const fileName = `${Date.now() + Math.round(Math.random() * 1e9)}${extname(img.originalname)}`;
    const filePath = join(process.cwd(), 'upload', fileName);
    writeFile(filePath, img.buffer);

    return fileName
  }
}
