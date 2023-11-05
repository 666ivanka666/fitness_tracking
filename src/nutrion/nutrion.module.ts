import { Module } from '@nestjs/common';
import { NutritionService } from './nutrion.service';
import { NutrionController } from './nutrion.controller';
import { UserModule } from 'src/user/user.module';
import { TrainingModule } from 'src/training/training.module';

@Module({
  imports: [UserModule, TrainingModule],
  controllers: [NutrionController],
  providers: [NutritionService],
})
export class NutrionModule {}
