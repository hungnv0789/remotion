import type { FC } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import type { VideoProps } from '../config';
import type { SceneTiming, SpokenWord } from '../timing';
import { CLAMP } from './UI';

export type CaptionCue = { start: number; end: number; text: string };

// Phụ đề dùng timestamp cùng nguồn với các marker animation.
export const buildCaptionCues = (timeline: SceneTiming[]): CaptionCue[] =>
  timeline.flatMap((scene) => {
    const groups: SpokenWord[][] = [];
    let group: SpokenWord[] = [];
    for (const word of scene.words) {
      if (group.length && [...group, word].map((item) => item.text).join(' ').length > 85) {
        groups.push(group);
        group = [];
      }
      group.push(word);
      if (
        /[.!?…]["”')]*$/.test(word.text) &&
        group.map((item) => item.text).join(' ').length >= 35
      ) {
        groups.push(group);
        group = [];
      }
    }
    if (group.length) groups.push(group);
    return groups.map((chunk, index) => ({
      start: scene.from + chunk[0].from,
      end:
        scene.from +
        (index === groups.length - 1 ? scene.durationInFrames : groups[index + 1][0].from),
      text: chunk.map((word) => word.text).join(' '),
    }));
  });

export const Captions: FC<{ cues: CaptionCue[]; theme: VideoProps['theme'] }> = ({
  cues,
  theme,
}) => {
  const frame = useCurrentFrame();
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
        background: `${theme.background}f0`,
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
