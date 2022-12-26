import { Module } from '@nestjs/common';
import { MulterModule } from "@nestjs/platform-express";
import { GridFsMulterConfigService } from "./config/gridFsMulterConfig.service";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [FileController],
  providers: [
    GridFsMulterConfigService,
    FileService,
  ],
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/wikidata?authSource=admin'
    ),
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService
    }),
  ],
  exports: []
})

export class FileModule { }
