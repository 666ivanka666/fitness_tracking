import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TrainingDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
