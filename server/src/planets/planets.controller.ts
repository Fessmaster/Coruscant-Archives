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
import { PlanetsService } from './planets.service';
import { CreatePlanetsDto } from './dto/create-planets.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { ImageFileDto } from 'src/images/dto/ImageFile.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { validatorConfig } from 'src/common/configs/image.validator';
import { UpdatePlanetsDto } from './dto/update-planets.dto';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}
  @ApiOperation({
    summary: 'Return array of planets',
    description:
      'Return array of planets and skips the specified number of entries',
  })
  @ApiOkResponse({ type: CreatePlanetsDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Get()
  @ApiQuery({ name: 'skip' })
  getPlanetsList(@Query('skip') skip: number) {
    return this.planetsService.getArrayOfEntities(skip);
  }

  @ApiOperation({
    summary: 'Returns a single planet record',
    description: 'Returns a single planet record by the id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Planet ID',
  })
  @ApiOkResponse({ type: CreatePlanetsDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Get(':id')
  getPlanetById(@Param('id') id: string) {
    return this.planetsService.findById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Create new record for this entity',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully added to the database',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBody({
    description: 'Add new planet to DB',
    type: CreatePlanetsDto,
  })
  createPlanet(@Body() planetDto: CreatePlanetsDto) {
    return this.planetsService.create(planetDto);
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
  addImagesToPlanetById(
    @Param('id') id: string,
    @UploadedFiles(new ParseFilePipe(validatorConfig))
    img: Express.Multer.File[],
  ) {
    return this.planetsService.addImages(id, img);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Updating planet record',
    description: 'Updating planet record by id',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully update to the database',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  updatePlanet(@Body() peopleDto: UpdatePlanetsDto, @Param('id') id: string) {
    return this.planetsService.update(id, peopleDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Deleting planet record',
    description: 'Deleting planet record by id',
  })
  @ApiOkResponse({
    description: 'The record has been deleting.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  deletePlanet(@Param('id') id: string) {
    return this.planetsService.deleteById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('restore/:id')
  @ApiOperation({
    summary: 'Restoring deleted planets record',
    description: 'Restoring deleted planets record by id',
  })
  @ApiOkResponse({
    description: 'The record has been restored.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  restorePlanet(@Param('id') id: string) {
    return this.planetsService.restoreById(id);
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
    return this.planetsService.deleteImg(id, imgId);
  }
}
