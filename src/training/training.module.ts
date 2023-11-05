import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [UserService],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}
