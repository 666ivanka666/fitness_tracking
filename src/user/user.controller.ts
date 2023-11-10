import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { IdDto } from 'src/common/decorators';
import { User } from './type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  addUser(@Body() body: UserDto): { id: string } {
    const generatedId = this.userService.insertUser(
      body.firstName,
      body.lastName,
    );
    return { id: generatedId };
  }

  @Get()
  getAllUsers(): User[] {
    return this.userService.getUser();
  }

  @Get(':id')
  getUserById(@Param() params: IdDto): User {
    const { id } = params;
    return this.userService.getSingleUser(id);
  }

  @Put(':id')
  updateUser(@Param() params: IdDto, @Body() body: UserDto): User {
    const { id } = params;
    return this.userService.updateUser(id, body.firstName, body.firstName);
  }

  @Delete(':id')
  deleteUserById(@Param() params: IdDto): { message: string } {
    return this.userService.deleteUser(params.id);
  }
}
