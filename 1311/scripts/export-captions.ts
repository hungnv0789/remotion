import { mkdirSync, writeFileSync } from 'node:fs';
import { defaultProps, VIDEO } from '../src/config';
import { buildCaptionCues, buildTimeline, totalFrames } from '../src/timing';

const timeline = buildTimeline(defaultProps, VIDEO.fps);
const cues = buildCaptionCues(timeline);
const stamp = (frame: number) => {
  const milliseconds = Math.round(frame / VIDEO.fps * 1000);
  const seconds = Math.floor(milliseconds / 1000);
  return `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor(seconds / 60) % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')},${String(milliseconds % 1000).padStart(3, '0')}`;
};
mkdirSync('out', { recursive: true });
writeFileSync('out/1311.srt', cues.map((cue, i) => `${i + 1}\n${stamp(cue.start)} --> ${stamp(cue.end)}\n${cue.words.map((word) => word.text).join(' ')}\n`).join('\n'));
writeFileSync('out/timing-report.json', JSON.stringify({ ...VIDEO, durationInFrames: totalFrames(defaultProps, VIDEO.fps), audioDurationSeconds: defaultProps.timing.audioDurationSeconds, scenes: timeline.map((scene) => ({ id: scene.id, from: scene.from, to: scene.from + scene.durationInFrames, speechFrom: scene.from + scene.words[0].from, speechTo: scene.from + scene.speechTo })) }, null, 2));
console.log(`Exported ${cues.length} caption cues.`);
