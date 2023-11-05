import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class NutritionDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  trainingId: string;
}
