import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';

@Controller('/files')
export class FileController {
  constructor(private filesService: FileService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @UploadedFile() file,
    @Headers() headers: Record<string, string>,
  ): Promise<Record<string, string>> {
    return {
      id: file.id,
      filename: file.filename,
      uploadDate: file.uploadDate,
      contentType: file.contentType,
    };
  }

  @Get('/:id')
  async getFile(
    @Headers() headers: Record<string, string>,
    @Param('id') id: string,
    @Res() res,
  ) {
    const [file, fileStream] = await Promise.all([
      this.filesService.findInfo(id),
      this.filesService.readStream(id),
    ]);
    if (!fileStream) {
      throw new BadRequestException({
        message: 'An error occured while retrieving file',
      });
    }
    res.header('Content-type', file.contentType);
    res.header('Content-Disposition', 'attachment; filename=' + file.filename);
    return fileStream.pipe(res);
  }

  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res) {
    const [file, fileStream] = await Promise.all([
      this.filesService.findInfo(id),
      this.filesService.readStream(id),
    ]);
    if (!fileStream) {
      throw new BadRequestException({
        message: 'An error occured while retrieving file',
      });
    }
    res.header('Content-Type', file.contentType);
    res.header('Content-Disposition', 'attachment; filename=' + file.filename);
    return fileStream.pipe(res);
  }

  @Delete('/:id')
  async deleteFile(@Param('id') id: string): Promise<Record<string, string>> {
    const fileStream = await this.filesService.deleteFile(id);
    if (!fileStream) {
      throw new BadRequestException({
        message: 'An error occured while retrieving file',
      });
    }
    return {
      message: 'File has been deleted',
    };
  }
}
