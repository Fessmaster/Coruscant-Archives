import { Body, Controller, Delete, Get, Param, ParseFilePipe, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilmsService } from './films.service';
import { CreateFilmsDto } from './dto/create-films.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { ImageFileDto } from 'src/images/dto/ImageFile.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { validatorConfig } from 'src/common/configs/image.validator';
import { UpdateFilmsDto } from './dto/update-films.dto';

@ApiTags('films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService){}
@ApiOperation({
    summary: 'Return array of films',
    description:
      'Return array of films and skips the specified number of entries',
  })
  @ApiOkResponse({ type: CreateFilmsDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Get()
  @ApiQuery({ name: 'skip' })
  getPersonList(@Query('skip') skip: number) {
    return this.filmsService.getArrayOfEntities(skip);
  }

  @ApiOperation({
    summary: 'Returns a single film record',
    description: 'Returns a single film record by the id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'User ID',
  })
  @ApiOkResponse({ type: CreateFilmsDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Get(':id')
  getFilmById(@Param('id') id: string) {
    return this.filmsService.findById(id, ['images','planets']);
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
    type: CreateFilmsDto,
  })
  createFilm(@Body() filmDto: CreateFilmsDto) {
    return this.filmsService.create(filmDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/images')
  @ApiOperation({
    summary: 'Add images to film by id',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully added to the database',
  })
  @ApiBody({
    description: 'Add images to film by id',
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
    return this.filmsService.addImages(id, img);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Updating films record',
    description: 'Updating person record by id',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully update to the database',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  updatePerson(@Body() peopleDto: UpdateFilmsDto, @Param('id') id: string) {
    return this.filmsService.update(id, peopleDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Deleting film record',
    description: 'Deleting film record by id',
  })
  @ApiOkResponse({
    description: 'The record has been deleting.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  deletePerson(@Param('id') id: string) {
    return this.filmsService.deleteById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('restore/:id')
  @ApiOperation({
    summary: 'Restoring deleted films record',
    description: 'Restoring deleted films record by id',
  })
  @ApiOkResponse({
    description: 'The record has been restored.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  restorePerson(@Param('id') id: string) {
    return this.filmsService.restoreById(id);
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
    return this.filmsService.deleteImg(id, imgId);
  }
}
