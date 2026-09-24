// Full-resolution, dense-keyframe desktop encodes derived from supplied masters.
import { execFileSync } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
await mkdir("public/media/hq-v3", { recursive: true });
for (const name of ["localfirst", "restaurant", "med-spa"]) {
  const output = `public/media/hq-v3/${name}.mp4`;
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", `Assets/Hero videos/Hero-${name}.mp4`, "-c:v", "libx264", "-preset", "slow", "-crf", "21", "-g", "12", "-keyint_min", "12", "-sc_threshold", "0", "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", output]);
  const bytes = (await stat(output)).size;
  if (bytes >= 25 * 1024 * 1024) throw new Error(`${name} exceeds the static asset size limit`);
  console.log(JSON.stringify({ name, bytes, megabytes: +(bytes / 1048576).toFixed(2) }));
}
