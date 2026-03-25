import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipe,
  Post,  
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleDto } from './dto/people.dto';
import {  
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';;
import { validatorConfig } from 'src/common/configs/image.validator';

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get(':id')
  getPersonById(@Param('id') id: string) {
    return this.peopleService.findOne(id);
  }

  // тут має бути аутентифікація
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully added to the database',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseInterceptors(FilesInterceptor('img'))
  @ApiConsumes('multipart/form-data')  
  createPerson( 
    @Body() peopleDto: PeopleDto,
    @UploadedFiles(new ParseFilePipe(validatorConfig)) img: Express.Multer.File[],
  ) {
    console.log("DTO - ", peopleDto);
    return this.peopleService.create(peopleDto, img); 
  }
}
