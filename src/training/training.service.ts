import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Training } from './type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TrainingService {
  private training: Training[] = [];

  constructor(private readonly userService: UserService) {}

  insertTraining(description: string, userId: string): string {
    const trainingId = uuidv4();
    this.userService.findUser(userId);
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
    this.userService.findUser(userId);
    const [training] = this.findTraining(trainingId);

    if (description) {
      training.description = description;
    }
    if (userId) {
      training.userId = userId;
    }

    return training;
  }

  deleteTraining(trainingId: string) {
    const [, index] = this.findTraining(trainingId);
    this.training.splice(index, 1);
    return { message: 'Uspjesno obrisano' };
  }

  findTraining(id: string): [Training, number] {
    const trainingIndex = this.training.findIndex(
      (training) => training.id === id,
    );
    if (trainingIndex === -1) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
    return [this.training[trainingIndex], trainingIndex];
  }
}
