import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MongoGridFS } from 'mongo-gridfs';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { GridFSBucketReadStream } from 'mongodb';
import { File } from './file';

@Injectable()
export class FileService {
  private readonly fileModel: MongoGridFS;

  constructor(@InjectConnection() private connection: Connection) {
    this.fileModel = new MongoGridFS(connection.db, 'fs');
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

  async findInfo(id: string): Promise<File> {
    const results =await this.fileModel.find({}).catch((err) => {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    })
    .then((result) => result);
    console.log(results)

    const result = await this.fileModel
      .findById(id)
      .catch((err) => {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      })
      .then((result) => result);
    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType,
    };
  }

  async deleteFile(_id: string): Promise<boolean> {
    return await this.fileModel.delete(_id);
  }
}
