import { Module } from '@nestjs/common';
import { NutritionService } from './nutrion.service';
import { NutrionController } from './nutrion.controller';
import { TrainingModule } from 'src/training/training.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TrainingModule, UserModule],
  controllers: [NutrionController],
  providers: [NutritionService],
})
export class NutrionModule {}
