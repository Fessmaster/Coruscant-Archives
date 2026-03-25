import { FileTypeValidator, MaxFileSizeValidator } from "@nestjs/common";

export const validatorConfig = {
  validators: [
    new MaxFileSizeValidator({maxSize: 5000000}),
    new FileTypeValidator({fileType: 'image/.*', skipMagicNumbersValidation:false})
  ]
}