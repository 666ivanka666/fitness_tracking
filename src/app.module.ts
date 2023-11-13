import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { NutritionModule } from './nutrition/nutrition.module';
import { TrainingModule } from './training/training.module';

@Module({
  imports: [UserModule, TrainingModule, NutritionModule],
})
export class AppModule {}
