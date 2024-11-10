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

import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './album.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('album')
class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(200)
  get() {
    return this.albumService.get();
  }

  @Get(':id')
  @HttpCode(200)
  getById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ) {
    return this.albumService.getById(id);
  }

  @Post()
  @HttpCode(201)
  post(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.post(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(200)
  put(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.put(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ) {
    return this.albumService.delete(id);
  }
}

export { AlbumController };
