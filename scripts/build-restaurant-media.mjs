import sharp from 'sharp';
import { mkdir, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import path from 'node:path';

// Source masters remain untouched in Assets. Only these web derivatives ship.
const output = path.resolve('public/media/restaurant-home');
const temporary = await mkdtemp(path.join(tmpdir(), 'restaurant-posters-'));
await mkdir(output, { recursive: true });
const photos = {
  tacos: 'IMG_3861_frame_4K.jpg',
  shrimp: 'IMG_8374_2_4K.jpg',
  burger: 'IMG_3068_2_4K.jpg',
  signature: 'IMG_7030_4K.jpg',
  spread: 'IMG_6967_3_4K.jpg',
  steak: 'IMG_6544_2_frame_4K.jpg',
  dessert: 'IMG_6642_frame_4K.jpg',
};
for (const [name, file] of Object.entries(photos)) {
  for (const width of [640, 1280, 1920]) {
    await sharp(path.join('Assets/Food photos', file)).rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 86, effort: 5 })
      .toFile(path.join(output, `${name}-${width}.webp`));
  }
}
await sharp('public/media/nicholas.png').resize({ width: 900 }).webp({ quality: 86 }).toFile(path.join(output, 'nick.webp'));
await sharp('Assets/Food photos/IMG_6967_3_4K.jpg').rotate().resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 88 }).toFile(path.join(output, 'social.jpg'));

function ffmpeg(args) {
  return new Promise((resolve, reject) => {
    const child = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', code => code === 0 ? resolve() : reject(new Error(`ffmpeg: ${code}`)));
  });
}
await Promise.all([
  ['desktop', 'food-16-9.mp4', '1920:-2'],
  ['mobile', 'food9-16.mp4', '1080:-2'],
].map(async ([name, source, scale]) => {
  const input = path.join('Assets/Hero videos', source);
  await ffmpeg(['-i', input, '-an', '-vf', `scale=${scale}`, '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-pix_fmt', 'yuv420p', '-threads', '2', '-movflags', '+faststart', path.join(output, `hero-${name}.mp4`)]);
  const poster = path.join(temporary, `${name}.png`);
  await ffmpeg(['-i', input, '-frames:v', '1', '-vf', `scale=${scale}`, poster]);
  await sharp(poster).webp({ quality: 86 }).toFile(path.join(output, `hero-${name}.webp`));
  console.log(`Prepared ${name} video and poster`);
}));
console.log('Restaurant media ready.');
