import { mkdir, stat } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';

const run = promisify(execFile);
const output = 'public/media/website-hero/v1';
await mkdir(output, { recursive: true });
for (const [tier, input, width] of [
  ['desktop', '/Users/nicholasmolina/Downloads/video (3).mp4', 1920],
  ['mobile', '/Users/nicholasmolina/Downloads/video (4).mp4', 1080],
]) {
  const film = `${output}/${tier}.mp4`;
  // The 4K source files stay untouched. These silent full-HD copies are for playback,
  // not scrubbing: a normal GOP keeps the looping hero light on mobile bandwidth.
  await run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', input,
    '-an', '-vf', `scale=${width}:-2`, '-c:v', 'libx264', '-preset', 'medium',
    '-crf', '22', '-maxrate', '3000k', '-bufsize', '6000k', '-pix_fmt', 'yuv420p',
    '-threads', '4', '-movflags', '+faststart', film]);
  const { stdout } = await run('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-i', film,
    '-frames:v', '1', '-f', 'image2pipe', '-c:v', 'png', '-'], { encoding: 'buffer', maxBuffer: 20 * 1024 * 1024 });
  for (const size of tier === 'desktop' ? [960, 1920] : [540, 1080]) {
    await sharp(stdout).resize({ width: size }).webp({ quality: 85 }).toFile(`${output}/${tier}-${size}.webp`);
  }
  const bytes = (await stat(film)).size;
  if (bytes > 10 * 1024 * 1024) throw new Error(`${tier} hero exceeds the range handler's intended media budget`);
  console.log(`${tier}: ${(bytes / 1024 / 1024).toFixed(2)} MiB`);
}
