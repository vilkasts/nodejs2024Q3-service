import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const user = await prisma.user.create({
    data: {
      login: 'Valera',
      password: 'password',
      version: 1,
      createdAt: BigInt(Date.now()),
      updatedAt: BigInt(Date.now()),
    },
  });

  const artist = await prisma.artist.create({
    data: {
      name: 'Linkin Park',
      grammy: true,
    },
  });

  const album = await prisma.album.create({
    data: {
      name: 'Meteora',
      artistId: artist.id,
      year: 2002,
    },
  });

  const track = await prisma.track.create({
    data: {
      name: 'Siniy Tracktor.mp3',
      artistId: artist.id,
      albumId: album.id,
      duration: 128,
    },
  });

  await prisma.favorites.create({
    data: {
      userId: user.id,
      artists: [artist.id],
      tracks: [track.id],
      albums: [album.id],
    },
  });
};

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
