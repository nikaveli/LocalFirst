// Derive mobile frames from the already-approved footage. No generated imagery.
import { mkdtemp, mkdir, readdir, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const temp = await mkdtemp(join(tmpdir(), "localfirst-scrub-frames-"));
for (const name of ["localfirst", "restaurant", "med-spa"]) {
  const intermediate = join(temp, name);
  const output = join("public/media/frames/v1", name);
  await mkdir(intermediate, { recursive: true });
  await mkdir(output, { recursive: true });
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-i", `public/media/${name}-mobile.mp4`, "-vf", "fps=24", "-start_number", "0", join(intermediate, "%04d.png")]);
  const files = (await readdir(intermediate)).filter((file) => file.endsWith(".png")).sort();
  let bytes = 0;
  for (let i = 0; i < files.length; i += 6) {
    await Promise.all(files.slice(i, i + 6).map(async (file) => {
      const dest = join(output, file.replace(".png", ".webp"));
      await sharp(join(intermediate, file)).webp({ quality: 68, effort: 4 }).toFile(dest);
      bytes += (await stat(dest)).size;
    }));
  }
  console.log(JSON.stringify({ name, frames: files.length, bytes, megabytes: +(bytes / 1048576).toFixed(2) }));
}
console.log(`Intermediate frames retained for inspection: ${temp}`);
