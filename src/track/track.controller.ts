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

import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './track.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('track')
class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(200)
  get() {
    return this.trackService.get();
  }

  @Get(':id')
  @HttpCode(200)
  getById(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ) {
    return this.trackService.getById(id);
  }

  @Post()
  @HttpCode(201)
  post(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.post(createTrackDto);
  }

  @Put(':id')
  @HttpCode(200)
  put(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.put(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 400 })) id: string,
  ) {
    return this.trackService.delete(id);
  }
}

export { TrackController };
