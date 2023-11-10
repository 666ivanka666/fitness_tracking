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
    description: string,
    userId: string,
    trainingId: string,
  ): string {
    const nutritionId = uuidv4();

    this.userService.findUser(userId);
    this.trainingService.findTraining(trainingId);

    this.nutrition.push(
      new Nutrition(nutritionId, description, userId, trainingId),
    );
    return nutritionId;
  }

  getNutrition(): Nutrition[] {
    return this.nutrition;
  }

  getSingleNutrition(nutritionId: string): Nutrition {
    const [nutrition] = this.findNutrition(nutritionId);
    return nutrition;
  }

  updateNutrition(
    nutritionId: string,
    description: string,
    userId: string,
    trainingId: string,
  ): Nutrition {
    this.userService.findUser(userId);
    this.trainingService.findTraining(trainingId);

    const [nutrition] = this.findNutrition(nutritionId);

    if (description) {
      nutrition.description = description;
    }
    if (userId) {
      nutrition.userId = userId;
    }
    if (trainingId) {
      nutrition.trainingId = trainingId;
    }
    return nutrition;
  }

  deleteNutrition(nutritionId: string) {
    const [, index] = this.findNutrition(nutritionId);
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
