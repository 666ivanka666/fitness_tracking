import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingDto } from './dto';
import { Training } from './type';
import { IdDto, NameDto } from 'src/common/decorators';

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  addTraining(@Body() body: TrainingDto): { id: string } {
    const generatedId = this.trainingService.insertTraining(
      body.description,
      body.userId,
    );
    return { id: generatedId };
  }

  @Get()
  getAllTraining(): Training[] {
    return this.trainingService
      .getTraining()
      .filter((training) => training.active);
  }
  @Get(':id')
  getTrainigById(@Param() params: IdDto): Training {
    const { id } = params;
    return this.trainingService.getSingleTraining(params.id);
  }

  @Get(':name/name')
  getTrainingByName(@Param() params: NameDto): Training[] {
    const { name } = params;
    return this.trainingService
      .getTraining()
      .filter((training) => training.name === name);
  }

  @Put(':id')
  updateTraining(@Param() params: IdDto, @Body() body: TrainingDto): Training {
    const { id } = params;
    return this.trainingService.updateTraining(
      id,
      body.description,
      body.userId,
    );
  }

  @Delete(':id')
  deleteTrainingById(@Param() params: IdDto): { message: string } {
    return this.trainingService.deleteTraining(params.id);
  }
}
