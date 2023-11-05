import { Injectable, NotAcceptableException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Nutrition } from './type';

@Injectable()
export class NutritionService {
  private nutrition: Nutrition[] = [];
  nutritionIndex: number;
  findNutriton: any;

  insertNutrition(
    descritpion: string,
    userId: string,
    trainingId: string,
  ): string {
    const nutritonId = uuidv4();
    this.nutrition.push(
      new Nutrition(nutritonId, descritpion, userId, trainingId),
    );
    return nutritonId;
  }
  getNutrition(): Nutrition[] {
    return this.nutrition;
  }

  getSingleNutrition(nutritionId: string): Nutrition {
    const [nutrition] = this.findNutriton(nutritionId);
    return nutrition;
  }
  updateNutrition(
    nutritonId: string,
    description: string,
    userId: string,
    trainingId: string,
  ): Nutrition {
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
    const [nutrition, index] = this.findNutriton(nutrionId);
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
    return [this.nutrition[this.nutritionIndex], this.nutritionIndex];
  }
}
