import { Injectable, NotAcceptableException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Nutrition } from './type';
import { TrainingService } from 'src/training/training.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NutritionService {
  private nutrition: Nutrition[] = [];
  constructor(
    private readonly trainingService: TrainingService,
    private readonly userService: UserService,
  ) {}

  insertNutrition(
    descritpion: string,
    userId: string,
    trainingId: string,
  ): string {
    const nutritonId = uuidv4();

    this.userService.findUser(userId);
    this.trainingService.findTraining(trainingId);

    this.nutrition.push(
      new Nutrition(nutritonId, descritpion, userId, trainingId),
    );
    return nutritonId;
  }

  getNutrition(): Nutrition[] {
    return this.nutrition;
  }

  getSingleNutrition(nutritionId: string): Nutrition {
    const [nutrition] = this.findNutrition(nutritionId);
    return nutrition;
  }

  updateNutrition(
    nutritonId: string,
    description: string,
    userId: string,
    trainingId: string,
  ): Nutrition {
    this.userService.findUser(userId);
    this.trainingService.findTraining(trainingId);

    const [nutriton] = this.findNutrition(nutritonId);

    if (description) {
      nutriton.description = description;
    }
    if (userId) {
      nutriton.userId = userId;
    }
    if (trainingId) {
      nutriton.trainingId = trainingId;
    }
    return nutriton;
  }

  deleteNutrition(nutrionId: string) {
    const [, index] = this.findNutrition(nutrionId);
    this.nutrition.splice(index, 1);
    return { message: 'Uspiješno obrisano' };
  }

  findNutrition(id: string): [Nutrition, number] {
    const nutritionIndex = this.nutrition.findIndex(
      (nutrition) => nutrition.id === id,
    );
    if (nutritionIndex === -1) {
      throw new NotAcceptableException(`Nutrition with ID ${id} not found`);
    }

    return [this.nutrition[nutritionIndex], nutritionIndex];
  }
}
