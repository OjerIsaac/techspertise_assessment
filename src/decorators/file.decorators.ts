import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { fileMimetypeFilter } from '../filters';

export function ApiFile(
  fieldName = 'file',
  config: { localOptions?: number | MulterOptions; isMultiple?: boolean } = {
    localOptions: {},
    isMultiple: false,
  }
) {
  const { localOptions, isMultiple } = config;

  const interceptor = isMultiple
    ? FilesInterceptor(fieldName, localOptions as number)
    : FileInterceptor(fieldName, localOptions as MulterOptions);

  return applyDecorators(UseInterceptors(interceptor));
}

export function ApiImageFile(fileName = 'image') {
  return ApiFile(fileName, {
    localOptions: {
      fileFilter: fileMimetypeFilter('image'),
    },
  });
}

export function ApiPdfFile(fileName = 'document') {
  return ApiFile(fileName, {
    localOptions: {
      fileFilter: fileMimetypeFilter('pdf'),
    },
  });
}
