import { FileValidator } from '@nestjs/common';

export class ValidFileValidator extends FileValidator {
  isValid(file?: any): boolean | Promise<boolean> {
    if (!(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg')) {
      return false;
    }
    if (file.size > 1124000) {
      return false;
    }
    return true;
  }
  buildErrorMessage(file: any): string {
    if (!(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg')) {
      return 'Image type must be png or jpeg';
    }
    if (file.size > 1124000) {
      return 'Image size must be less than 1 MB';
    }
  }
}
