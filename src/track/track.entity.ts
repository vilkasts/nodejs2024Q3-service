import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { v4 } from 'uuid';

import { TrackInterface } from './track.model';
import { PartialType } from '@nestjs/mapped-types';

class TrackEntity implements TrackInterface {
  constructor(
    name: string,
    duration: number,
    artistId: string | null = null,
    albumId: string | null = null,
  ) {
    this.id = v4();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }

  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID(4)
  @IsOptional()
  artistId: string | null;

  @IsUUID(4)
  @IsOptional()
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}

class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID(4)
  @IsOptional()
  artistId: string | null;

  @IsUUID(4)
  @IsOptional()
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}

class UpdateTrackDto extends PartialType(CreateTrackDto) {}

export { CreateTrackDto, TrackEntity, UpdateTrackDto };
