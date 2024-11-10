import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import database from '../database/database';
import { TrackEntity, UpdateTrackDto, CreateTrackDto } from './track.entity';
import { MessagesEnum } from '../helpers/enums';

@Injectable()
class TrackService {
  get() {
    return database.tracksData;
  }

  getById(id: string) {
    const track = database.tracksData.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  post(createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name || !createTrackDto.duration) {
      throw new BadRequestException(MessagesEnum.NoRequiredFields);
    }

    const isAlreadyExist = database.tracksData.find(
      (track) => track.name === createTrackDto.name,
    );

    if (isAlreadyExist) {
      throw new ForbiddenException(MessagesEnum.AlreadyExists);
    }

    const track = new TrackEntity(
      createTrackDto.name,
      createTrackDto.duration,
      createTrackDto.artistId,
      createTrackDto.albumId,
    );
    database.tracksData.push(track);

    return track;
  }

  put(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.getById(id);

    Object.assign(track, updateTrackDto);

    return track;
  }

  delete(id: string) {
    const index = database.tracksData.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException();
    }

    database.tracksData.splice(index, 1);
  }
}

export { TrackService };