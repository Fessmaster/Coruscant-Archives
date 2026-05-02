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
import { VehiclesService } from './vehicles.service';
import { CreateVehiclesDto } from './dto/create-vehicles.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { ImageFileDto } from 'src/images/dto/ImageFile.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { validatorConfig } from 'src/common/configs/image.validator';
import { UpdateVehiclesDto } from './dto/update-vehicles.dto';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @ApiOperation({
    summary: 'Return array of vehicles',
    description:
      'Return array of vehicles and skips the specified number of entries',
  })
  @ApiOkResponse({ type: CreateVehiclesDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Get()
  @ApiQuery({ name: 'skip' })
  getVehiclesList(@Query('skip') skip: number) {
    return this.vehiclesService.getArrayOfEntities(skip);
  }

  @ApiOperation({
    summary: 'Returns a single vehicle record',
    description: 'Returns a single vehicle record by the id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'vehicle ID',
  })
  @ApiOkResponse({ type: CreateVehiclesDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @Get(':id')
  getvehicleById(@Param('id') id: string) {
    return this.vehiclesService.findById(id);
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
    description: 'Add new vehicle to DB',
    type: CreateVehiclesDto,
  })
  createVehicle(@Body() dto: CreateVehiclesDto) {
    return this.vehiclesService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/images')
  @ApiOperation({
    summary: 'Add images to vehicle by id',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully added to the database',
  })
  @ApiBody({
    description: 'Add images to vehicle by id',
    type: ImageFileDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseInterceptors(FilesInterceptor('img'))
  @ApiConsumes('multipart/form-data')
  addImagesToVehiclesById(
    @Param('id') id: string,
    @UploadedFiles(new ParseFilePipe(validatorConfig))
    img: Express.Multer.File[],
  ) {
    return this.vehiclesService.addImages(id, img);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Updating vehicle record',
    description: 'Updating vehicle record by id',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully update to the database',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  updateVehicle(@Body() dto: UpdateVehiclesDto, @Param('id') id: string) {
    return this.vehiclesService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Deleting vehicle record',
    description: 'Deleting vehicle record by id',
  })
  @ApiOkResponse({
    description: 'The record has been deleting.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  deleteVehicle(@Param('id') id: string) {
    return this.vehiclesService.deleteById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('restore/:id')
  @ApiOperation({
    summary: 'Restoring deleted vehicle record',
    description: 'Restoring deleted vehicle record by id',
  })
  @ApiOkResponse({
    description: 'The record has been restored.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  restorevehicle(@Param('id') id: string) {
    return this.vehiclesService.restoreById(id);
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
    return this.vehiclesService.deleteImg(id, imgId);
  }
}
