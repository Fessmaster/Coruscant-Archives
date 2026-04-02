import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePeopleDto } from './dto/create-people.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { validatorConfig } from 'src/common/configs/image.validator';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { ImageFileDto } from '../images/ImageFile.dto';

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  @ApiQuery({name: 'skip'})
  getPersonList(@Query('skip') skip: number){
    return this.peopleService.getArrayOfEntities(skip)
  }
  
  @Get(':id')
  getPersonById(@Param('id') id: string) {
    return this.peopleService.findById(id);
  }

  // тут має бути аутентифікація
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully added to the database',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({
    description: 'Add new person to DB',
    type: CreatePeopleDto,
  })
  createPerson(@Body() peopleDto: CreatePeopleDto) {
    return this.peopleService.create(peopleDto);
  }

  // тут має бути аутентифікація
  @Post(':id/images')
  @ApiOperation({
    summary: 'Add images to person by id',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully added to the database',
  })
  @ApiBody({
    description: 'Add images to person by id',
    type: ImageFileDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseInterceptors(FilesInterceptor('img'))
  @ApiConsumes('multipart/form-data')
  addImagesToPersonById(
    @Param('id') id: string,
    @UploadedFiles(new ParseFilePipe(validatorConfig))
    img: Express.Multer.File[],
  ) {
    return this.peopleService.addImages(id, img);
  }

  // тут має бути аутентифікація
  @Patch(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully update to the database',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  updatePerson(@Body() peopleDto: UpdatePeopleDto, @Param('id') id: string) {
    return this.peopleService.update(id, peopleDto);
  }

  // тут має бути аутентифікація
  @Delete(':id')
  deletePerson(@Param('id') id: string) {    
    return this.peopleService.deleteById(id)
  }

  @Get('restore/:id')
  restorePerson(@Param('id') id: string) {    
  return this.peopleService.restoreById(id)
  }

  // тут має бути аутентифікація
  @Delete(':id/delete-img/:imgId')
  deleteImg(@Param('id') id: string, @Param('imgId') imgId: string){    
    return this.peopleService.deleteImg(id, imgId)
  }
}
