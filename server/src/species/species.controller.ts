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
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { ImageFileDto } from 'src/images/dto/ImageFile.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { validatorConfig } from 'src/common/configs/image.validator';
import { UpdateSpeciesDto } from './dto/update-species.dto';

@ApiTags('species')
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @ApiOperation({
    summary: 'Return array of species',
    description:
      'Return array of species and skips the specified number of entries',
  })
  @ApiOkResponse({ type: CreateSpeciesDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Get()
  @ApiQuery({ name: 'skip' })
  getSpeciesList(@Query('skip') skip: number) {
    return this.speciesService.getArrayOfEntities(skip);
  }

  @ApiOperation({
    summary: 'Returns a single species record',
    description: 'Returns a single species record by the id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Species ID',
  })
  @ApiOkResponse({ type: CreateSpeciesDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Get(':id')
  getPlanetById(@Param('id') id: string) {
    return this.speciesService.findById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create new record for this entity',
  })
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully added to the database',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({
    description: 'Add new species to DB',
    type: CreateSpeciesDto,
  })
  createSpecies(@Body() dto: CreateSpeciesDto) {
    return this.speciesService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/images')
  @ApiOperation({
    summary: 'Add images to planet by id',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully added to the database',
  })
  @ApiBody({
    description: 'Add images to planet by id',
    type: ImageFileDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseInterceptors(FilesInterceptor('img'))
  @ApiConsumes('multipart/form-data')
  addImagesToSpeciesById(
    @Param('id') id: string,
    @UploadedFiles(new ParseFilePipe(validatorConfig))
    img: Express.Multer.File[],
  ) {
    return this.speciesService.addImages(id, img);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Updating species record',
    description: 'Updating species record by id',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully update to the database',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  updateSpecies(@Body() dto: UpdateSpeciesDto, @Param('id') id: string) {
    return this.speciesService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Deleting species record',
    description: 'Deleting species record by id',
  })
  @ApiOkResponse({
    description: 'The record has been deleting.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  deleteSpecies(@Param('id') id: string) {
    return this.speciesService.deleteById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('restore/:id')
  @ApiOperation({
    summary: 'Restoring deleted species record',
    description: 'Restoring deleted species record by id',
  })
  @ApiOkResponse({
    description: 'The record has been restored.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  restoreSpecies(@Param('id') id: string) {
    return this.speciesService.restoreById(id);
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
    return this.speciesService.deleteImg(id, imgId);
  }
}
