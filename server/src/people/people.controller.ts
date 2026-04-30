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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePeopleDto } from './dto/create-people.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { validatorConfig } from 'src/common/configs/image.validator';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { ImageFileDto } from '../images/dto/ImageFile.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @ApiOperation({
    summary: 'Return array of persons',
    description:
      'Return array of persons and skips the specified number of entries',
  })
  @ApiOkResponse({ type: CreatePeopleDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Get()
  @ApiQuery({ name: 'skip' })
  getPersonList(@Query('skip') skip: number) {
    return this.peopleService.getArrayOfEntities(skip);
  }

  @ApiOperation({
    summary: 'Returns a single character record',
    description: 'Returns a single character record by the id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User ID',
  })
  @ApiOkResponse({ type: CreatePeopleDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Get(':id')
  getPersonById(@Param('id') id: string) {
    return this.peopleService.findById(id, ['homeworld', 'vehicles', 'starships', 'images']);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Updating person record',
    description: 'Updating person record by id',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully update to the database',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  updatePerson(@Body() peopleDto: UpdatePeopleDto, @Param('id') id: string) {
    return this.peopleService.update(id, peopleDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Deleting person record',
    description: 'Deleting person record by id',
  })
  @ApiOkResponse({
    description: 'The record has been deleting.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  deletePerson(@Param('id') id: string) {
    return this.peopleService.deleteById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('restore/:id')
  @ApiOperation({
    summary: 'Restoring deleted person record',
    description: 'Restoring deleted person record by id',
  })
  @ApiOkResponse({
    description: 'The record has been restored.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  restorePerson(@Param('id') id: string) {
    return this.peopleService.restoreById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete-img/:imgId')
  @ApiOperation({
    summary: 'Deleting image record and image file',
    description: 'Deleting image record and image file by id',
  })
  @ApiOkResponse({
    description: 'The record has been deleting.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  deleteImg(@Param('id') id: string, @Param('imgId') imgId: string) {
    return this.peopleService.deleteImg(id, imgId);
  }
}
