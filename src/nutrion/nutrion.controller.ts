import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NutritionService } from './nutrion.service';
import { NutritionDto } from './dto';
import { Nutrition } from './type';
import { IdDto } from 'src/common/decorators';

@Controller('nutrition')
export class NutrionController {
  constructor(private readonly nutritionService: NutritionService) {}

  @Post()
  addNutrition(@Body() body: NutritionDto): { id: string } {
    const generatedId = this.nutritionService.insertNutrition(
      body.description,
      body.userId,
      body.trainingId,
    );
    return { id: generatedId };
  }
  @Get()
  getAllNutrition(): Nutrition[] {
    return this.nutritionService.getNutrition();
  }

  @Get(':id')
  getNutritionById(@Param() params: IdDto): Nutrition {
    return this.nutritionService.getSingleNutrition(params.id);
  }

  @Put(':id')
  updateNutrition(
    @Param() params: IdDto,
    @Body() body: NutritionDto,
  ): Nutrition {
    const { id } = params;
    return this.nutritionService.updateNutrition(
      id,
      body.description,
      body.userId,
      body.trainingId,
    );
  }

  @Delete(':id')
  deleteNutritionById(@Param() params: IdDto): { message: string } {
    return this.nutritionService.deleteNutrition(params.id);
  }
}
