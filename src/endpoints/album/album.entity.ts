import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { v4 } from 'uuid';

import { AlbumInterface } from '../../helpers/models';

class AlbumEntity implements AlbumInterface {
  constructor(name: string, year: number, artistId: string | null) {
    this.id = v4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsUUID(4)
  @IsOptional()
  artistId: string | null;
}

class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsUUID(4)
  @IsOptional()
  artistId: string | null;
}

class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}

export { CreateAlbumDto, AlbumEntity, UpdateAlbumDto };
