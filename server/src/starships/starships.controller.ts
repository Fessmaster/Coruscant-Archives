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
import { StarshipService } from './starships.service';
import { CreateStarshipsDto } from './dto/create-starships.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { ImageFileDto } from 'src/images/dto/ImageFile.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { validatorConfig } from 'src/common/configs/image.validator';
import { UpdateStarshipsDto } from './dto/update-starships.dto';

@ApiTags('starships')
@Controller('starships')
export class StarshipController {
  constructor(private readonly starshipService: StarshipService) {}

  @ApiOperation({
    summary: 'Return array of starships',
    description:
      'Return array of starships and skips the specified number of entries',
  })
  @ApiOkResponse({ type: CreateStarshipsDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Get()
  @ApiQuery({ name: 'skip' })
  getStarshipsList(@Query('skip') skip: number) {
    return this.starshipService.getArrayOfEntities(skip);
  }

  @ApiOperation({
    summary: 'Returns a single starship record',
    description: 'Returns a single starship record by the id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Starship ID',
  })
  @ApiOkResponse({ type: CreateStarshipsDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Get(':id')
  getStarshipById(@Param('id') id: string) {
    return this.starshipService.findById(id);
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
    description: 'Add new starship to DB',
    type: CreateStarshipsDto,
  })
  createSpecies(@Body() dto: CreateStarshipsDto) {
    return this.starshipService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/images')
  @ApiOperation({
    summary: 'Add images to starship by id',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully added to the database',
  })
  @ApiBody({
    description: 'Add images to starship by id',
    type: ImageFileDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseInterceptors(FilesInterceptor('img'))
  @ApiConsumes('multipart/form-data')
  addImagesToStarshipsById(
    @Param('id') id: string,
    @UploadedFiles(new ParseFilePipe(validatorConfig))
    img: Express.Multer.File[],
  ) {
    return this.starshipService.addImages(id, img);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Updating starship record',
    description: 'Updating starship record by id',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully update to the database',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  updateStarship(@Body() dto: UpdateStarshipsDto, @Param('id') id: string) {
    return this.starshipService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Deleting starship record',
    description: 'Deleting starship record by id',
  })
  @ApiOkResponse({
    description: 'The record has been deleting.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  deleteStarship(@Param('id') id: string) {
    return this.starshipService.deleteById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('restore/:id')
  @ApiOperation({
    summary: 'Restoring deleted starship record',
    description: 'Restoring deleted starship record by id',
  })
  @ApiOkResponse({
    description: 'The record has been restored.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  restoreStarship(@Param('id') id: string) {
    return this.starshipService.restoreById(id);
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
    return this.starshipService.deleteImg(id, imgId);
  }
}
