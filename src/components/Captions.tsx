import { useMemo, type FC } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { TIMELINE, type VideoProps } from '../config';
import { CLAMP } from './UI';

export type CaptionCue = { start: number; end: number; text: string };

// Chia nguyên văn lời dẫn thành các cụm dễ đọc, không làm mất từ.
// Timeline ước lượng theo số từ; căn lại nếu thêm bản thu thật.
export const buildCaptionCues = (narration: string[], fps: number): CaptionCue[] =>
  TIMELINE.flatMap((scene, index) => {
    const words = (narration[index] ?? '').trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];
    const groups: string[][] = [];
    let group: string[] = [];
    for (const word of words) {
      if (group.length && [...group, word].join(' ').length > 85) {
        groups.push(group);
        group = [];
      }
      group.push(word);
    }
    if (group.length) groups.push(group);
    let consumed = 0;
    const start = Math.round(scene.from * fps);
    const duration = Math.round(scene.duration * fps);
    return groups.map((chunk) => {
      const cueStart = start + Math.round((consumed / words.length) * duration);
      consumed += chunk.length;
      return {
        start: cueStart,
        end: start + Math.round((consumed / words.length) * duration),
        text: chunk.join(' '),
      };
    });
  });

export const Captions: FC<{ narration: string[]; theme: VideoProps['theme'] }> = ({
  narration,
  theme,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cues = useMemo(() => buildCaptionCues(narration, fps), [narration, fps]);
  const cue = cues.find(({ start, end }) => frame >= start && frame < end);
  if (!cue) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 76,
        right: 124,
        bottom: 240,
        height: 198,
        padding: '24px 28px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: '#06100ff0',
        border: '1px solid #ffffff18',
        borderRadius: 22,
        fontSize: 33,
        fontWeight: 500,
        lineHeight: 1.5,
        color: theme.text,
        opacity: interpolate(frame - cue.start, [0, 3], [0, 1], CLAMP),
      }}
    >
      {cue.text}
    </div>
  );
};
