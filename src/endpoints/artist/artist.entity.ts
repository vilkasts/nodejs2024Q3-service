import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { v4 } from 'uuid';

import { ArtistInterface } from '../../helpers/models';

class ArtistEntity implements ArtistInterface {
  constructor(name: string, grammy: boolean) {
    this.id = v4();
    this.name = name;
    this.grammy = grammy;
  }

  @IsUUID(4)
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

class UpdateArtistDto extends PartialType(CreateArtistDto) {}

export { CreateArtistDto, ArtistEntity, UpdateArtistDto };
