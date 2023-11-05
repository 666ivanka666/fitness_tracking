import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrainingService } from './training/training.service';
import { NutrionModule } from './nutrion/nutrion.module';
import { NutrionController } from './nutrion/nutrion.controller';
import { TrainingModule } from './training/training.module';

@Module({
  imports: [UserModule, TrainingModule, NutrionModule],
  controllers: [AppController, NutrionController],
  providers: [AppService, TrainingService],
})
export class AppModule {}
