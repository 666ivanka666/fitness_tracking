import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './type';

@Injectable()
export class UserService {
  private user: User[] = [];

  insertUser(firstName: string, lastName: string): string {
    const userId = uuidv4();
    this.user.push(new User(userId, firstName, lastName));
    return userId;
  }
  getUser(): User[] {
    return this.user;
  }

  getSingleUser(userId: string): User {
    const [user] = this.findUser(userId);
    return user;
  }

  updateUser(userId: string, firstName: string, lastName: string): User {
    const [user] = this.findUser(userId);
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }

    return user;
  }
  deleteUser(userId: string) {
    const [, index] = this.findUser(userId);
    this.user.splice(index, 1);
    return { message: 'Uspijesno obrisano' };
  }

  findUser(id: string): [User, number] {
    const userIndex = this.user.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return [this.user[userIndex], userIndex];
  }
}
