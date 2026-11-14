import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle } from '@remotion/bundler';
import { selectComposition, renderStill, renderMedia } from '@remotion/renderer';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
fs.mkdirSync('out', { recursive: true });
const installedBrowser = path.resolve(root, '../node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell');
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE || (fs.existsSync(installedBrowser) ? installedBrowser : undefined);
const serveUrl = await bundle({ entryPoint: path.join(root, 'src/index.ts'), publicDir: path.join(root, 'public') });
const composition = await selectComposition({ serveUrl, id: 'BankRatePressure1411', browserExecutable });
const timeline = JSON.parse(fs.readFileSync('out/timing-report.json', 'utf8'));
console.log(JSON.stringify({ frames: composition.durationInFrames, seconds: composition.durationInFrames / composition.fps, width: composition.width, height: composition.height }));
if (process.argv.includes('--stills')) {
  const frames = [55, ...timeline.scenes.flatMap(s => [Math.min(s.to - 1, s.from + 60), Math.max(s.from, s.to - 12)]), composition.durationInFrames - 1];
  for (const frame of [...new Set(frames)]) {
    await renderStill({ serveUrl, composition, browserExecutable, frame, scale: .5, imageFormat: 'png', output: `out/frame-${frame}.png` });
    console.log('Preview', frame);
  }
} else {
  let prior = -1;
  await renderMedia({ serveUrl, composition, browserExecutable, codec: 'h264', pixelFormat: 'yuv420p', x264Preset: 'veryfast', outputLocation: 'out/1411.mp4', concurrency: 3, onProgress: ({ progress }) => {
    const p = Math.floor(progress * 10);
    if (p !== prior) { prior = p; console.log(`${p * 10}%`); }
  } });
  console.log('Video complete: out/1411.mp4');
}
