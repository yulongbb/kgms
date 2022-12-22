import { Expose } from 'class-transformer';

export class File {
  @Expose()
  filename: string;

  @Expose()
  length: number;

  @Expose()
  chunkSize: number;

  @Expose()
  md5: string;

  @Expose()
  contentType: string;
}
