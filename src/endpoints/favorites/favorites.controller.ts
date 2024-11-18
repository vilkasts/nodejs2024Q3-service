import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';

@Controller('favs')
class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  getAllFavorites() {
    return this.favoritesService.get();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrackToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.postTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbumToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.postAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtistToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.postArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.deleteArtist(id);
  }
}

export { FavoritesController };
