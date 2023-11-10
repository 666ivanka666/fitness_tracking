import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { NutrionModule } from './nutrion/nutrion.module';
import { TrainingModule } from './training/training.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule, TrainingModule, NutrionModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
