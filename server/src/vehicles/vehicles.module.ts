import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicles } from './vehicles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicles])],
  exports: [TypeOrmModule],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
