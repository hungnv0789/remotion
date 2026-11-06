import type { FC } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import type { CaptionCue } from '../timing';
import { CLAMP, type Theme } from './UI';

export const Captions: FC<{ cues: CaptionCue[]; theme: Theme }> = ({ cues, theme }) => {
  const frame = useCurrentFrame();
  const cue = cues.find((item) => frame >= item.start && frame < item.end);
  if (!cue) return null;
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 242,
        left: 76,
        right: 124,
        height: 192,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: '25px 30px',
        background: theme.panel,
        border: `1px solid ${theme.border}`,
        borderRadius: 24,
        boxShadow: `0 10px 30px ${theme.shadow}`,
        textAlign: 'center',
        color: theme.text,
        fontSize: 32,
        lineHeight: 1.5,
        fontWeight: 500,
        opacity: interpolate(frame - cue.start, [0, 3], [0, 1], CLAMP),
      }}
    >
      {cue.text}
    </div>
  );
};
