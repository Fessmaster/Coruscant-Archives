import { Injectable, OnModuleInit } from '@nestjs/common';
import { existsSync, mkdirSync,} from 'fs';
import { writeFile,  } from 'fs/promises';
import { extname, join,  } from 'path';

@Injectable()
export class FileService implements OnModuleInit {
  onModuleInit() {
    const uploadPath = join(process.cwd(), 'upload')
    if (!existsSync(uploadPath)){
      mkdirSync(uploadPath, { recursive: true })
    }
  }

  saveFile(img: Express.Multer.File) {   
    const fileName = `${Date.now() + Math.round(Math.random() * 1e9)}${extname(img.originalname)}`;
    const filePath = join(process.cwd(), 'upload', fileName);
    writeFile(filePath, img.buffer);

    return fileName
  }
}

