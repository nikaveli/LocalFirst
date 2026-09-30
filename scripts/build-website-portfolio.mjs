import { mkdir, stat } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';
import path from 'node:path';

// Versioned, seek-friendly derivatives. Never overwrite the user's source films.
const input = process.argv[2] || '/Users/nicholasmolina/LocalFirst/Portfolio Scroll Videos';
const output = 'public/media/website-portfolio/v1';
const projects = ['denverdryice', 'localfirst', 'petsfavoritehuman', 'praxis', 'summit'];
await mkdir(output, { recursive: true });
const run = args => new Promise((resolve, reject) => {
  const child = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  child.on('error', reject);
  child.on('exit', code => code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`)));
});
for (const project of projects) {
  for (const tier of ['desktop', 'mobile']) {
    const name = `${project}-${tier}`;
    const film = path.join(output, `${name}.mp4`);
    const mobile = tier === 'mobile';
    if (!(await stat(film).catch(() => null))) await run(['-i', path.join(input, `${name}.mp4`), '-an', '-vf',
      `${mobile ? 'scale=720:-2,' : ''}unsharp=5:5:0.5:5:5:0`,
      '-c:v', 'libx264', '-preset', 'slow', '-crf', mobile ? '23' : '20',
      '-pix_fmt', 'yuv420p', '-g', mobile ? '4' : '8', '-keyint_min', mobile ? '4' : '8',
      '-sc_threshold', '0', '-threads', '2', '-movflags', '+faststart', film]);
    // Exact first frame of the encode, preserving its framing on takeover.
    const { stdout } = await promisify(execFile)('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-i', film,
      '-frames:v', '1', '-vf', `scale=${mobile ? 720 : 1280}:-2`, '-f', 'image2pipe', '-c:v', 'png', '-'],
      { encoding: 'buffer', maxBuffer: 10 * 1024 * 1024 });
    await sharp(stdout).webp({ quality: 88 }).toFile(path.join(output, `${name}.webp`));
    const bytes = (await stat(film)).size;
    if (bytes > 25 * 1024 * 1024) throw new Error(`${name} exceeds the static host asset limit`);
    console.log(`${name}: ${(bytes / 1024 / 1024).toFixed(2)} MiB`);
  }
}
