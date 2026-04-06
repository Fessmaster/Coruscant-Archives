import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesEntity } from './entity/vehicles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehiclesEntity])],
  exports: [TypeOrmModule],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
