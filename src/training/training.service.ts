import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Training } from './type';

@Injectable()
export class TrainingService {
  private training: Training[] = [];
  trainingIndex: number;

  insertTraining(description: string, userId: string): string {
    const trainingId = uuidv4();
    this.training.push(new Training(trainingId, description, userId));
    return trainingId;
  }

  getTraining(): Training[] {
    return this.training;
  }

  getSingleTraining(trainingId: string): Training {
    const [training] = this.findTraining(trainingId);
    return training;
  }

  updateTraining(
    trainingId: string,
    description: string,
    userId: string,
  ): Training {
    const [training, index] = this.findTraining(trainingId);

    if (description) {
      training.description = description;
    }
    if (userId) {
      training.userId = userId;
    }

    return training;
  }

  deleteTraining(trainingId: string) {
    const [training, index] = this.findTraining(trainingId);
    this.training.splice(index, 1);
    return { message: 'Uspjesno obrisano' };
  }

  findTraining(id: string): [Training, number] {
    const trainingIndex = this.training.findIndex(
      (training) => training.id === id,
    );
    if (trainingIndex === -1) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return [this.training[this.trainingIndex], this.trainingIndex];
  }
}
