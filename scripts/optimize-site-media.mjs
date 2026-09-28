import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

// Versioned derivatives only: preserve the originals and full-HD dimensions.
const gallery = 'public/media/first-impressions';
const posters = path.join(gallery, 'posters-v1');
await mkdir(posters, { recursive: true });
for (const file of (await readdir(gallery)).filter(file => file.endsWith('.jpg'))) {
  for (const width of [640, 960]) {
    await sharp(path.join(gallery, file)).rotate().resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 }).toFile(path.join(posters, `${file.slice(0, -4)}-${width}.webp`));
  }
}
const hero = 'public/media/restaurant-home';
for (const name of ['mobile', 'desktop']) {
  for (const width of name === 'mobile' ? [540, 1080] : [960, 1920]) {
    await sharp(path.join(hero, `hero-${name}.webp`)).resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 }).toFile(path.join(hero, `hero-${name}-${width}-v2.webp`));
  }
  if (process.argv.includes('--images-only')) continue;
  const output = path.join(hero, `hero-${name}-v2.mp4`);
  await new Promise((resolve, reject) => {
    const child = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
      '-i', `Assets/Hero videos/${name === 'mobile' ? 'food9-16.mp4' : 'food-16-9.mp4'}`,
      '-an', '-vf', `scale=${name === 'mobile' ? 1080 : 1920}:-2`, '-c:v', 'libx264',
      '-preset', 'slow', '-crf', '26', '-maxrate', name === 'mobile' ? '2400k' : '3200k',
      '-bufsize', '6400k', '-pix_fmt', 'yuv420p', '-threads', '2', '-movflags', '+faststart', output], { stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', code => code === 0 ? resolve() : reject(new Error(`ffmpeg: ${code}`)));
  });
  console.log(name, Math.round((await stat(output)).size / 1024), 'KiB');
}
