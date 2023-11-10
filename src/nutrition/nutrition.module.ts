import { Module } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { NutritionController } from './nutrition.controller';
import { TrainingModule } from 'src/training/training.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TrainingModule, UserModule],
  controllers: [NutritionController],
  providers: [NutritionService],
})
export class NutritionModule {}
