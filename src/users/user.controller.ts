import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | null> {
    return this.usersService.findOneById(id);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    await this.usersService.deleteUser(id);
    return "User deleted Successfully";
  }
}