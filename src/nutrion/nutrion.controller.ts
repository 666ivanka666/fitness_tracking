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
import { IdDto, NameDto } from 'src/common/decorators';

@Controller('nutrion')
export class NutrionController {
  nutrition: any;
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
    return this.nutritionService
      .getNutrition()
      .filter((nutrition) => this.nutrition.acitve);
  }

  @Get(':id')
  getNutritionById(@Param() params: IdDto): Nutrition {
    const { id } = params;
    return this.nutritionService.getSingleNutrition(params.id);
  }

  @Get('name/name')
  getNutritionByName(@Param() params: NameDto): Nutrition[] {
    const { name } = params;
    return this.nutritionService
      .getNutrition()
      .filter((nutrition) => this.nutrition.name === name);
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
