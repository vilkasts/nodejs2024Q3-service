import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './user.entity';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  get() {
    return this.userService.get();
  }

  @Get(':id')
  @HttpCode(200)
  getById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ) {
    return this.userService.getById(id);
  }

  @Post()
  @HttpCode(201)
  post(@Body() createUserDto: CreateUserDto) {
    return this.userService.post(createUserDto);
  }

  @Put(':id')
  @HttpCode(200)
  put(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.put(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ) {
    this.userService.delete(id);
  }
}

export { UserController };
