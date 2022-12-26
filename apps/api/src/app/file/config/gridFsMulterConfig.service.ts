import { Injectable } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';

@Injectable()
export class GridFsMulterConfigService {
  gridFsStorage = new GridFsStorage({
    url: 'mongodb://root:root@localhost:27017/wikidata?authSource=admin',
    file: (req, file) => {
      return new Promise((resolve) => {
        const filename = file.originalname.trim();
        const fileInfo = {
          filename,
        };
        resolve(fileInfo);
      });
    },
  });

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
