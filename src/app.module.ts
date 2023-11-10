import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { NutritionModule } from './nutrition/nutrition.module';
import { TrainingModule } from './training/training.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule, TrainingModule, NutritionModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
