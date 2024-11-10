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

import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './artist.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(200)
  get() {
    return this.artistService.get();
  }

  @Get(':id')
  @HttpCode(200)
  getById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ) {
    return this.artistService.getById(id);
  }

  @Post()
  @HttpCode(201)
  post(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.post(createArtistDto);
  }

  @Put(':id')
  @HttpCode(200)
  put(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.put(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ) {
    return this.artistService.delete(id);
  }
}

export { ArtistController };
