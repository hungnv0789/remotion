import type { FC } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import type { CaptionCue } from '../timing';
import { CLAMP, type Theme } from './UI';

export const Captions: FC<{ cues: CaptionCue[]; keywords: string[]; theme: Theme }> = ({
  cues,
  keywords,
  theme,
}) => {
  const frame = useCurrentFrame();
  const cue = cues.find((item) => frame >= item.start && frame < item.end);
  if (!cue) return null;
  const normalized = new Set(keywords.map((word) => word.toLocaleLowerCase('vi')));
  return (
    <div
      style={{
        position: 'absolute',
        left: 76,
        right: 124,
        bottom: 225,
        height: 224,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 28px',
        border: `1px solid ${theme.border}`,
        borderRadius: 18,
        background: '#031021EB',
        color: theme.text,
        textAlign: 'center',
        fontSize: 39,
        fontWeight: 600,
        lineHeight: 1.4,
        opacity: interpolate(frame - cue.start, [0, 3], [0, 1], CLAMP),
      }}
    >
      <div>
        {cue.words.map((word, index) => {
          const key = word.text.toLocaleLowerCase('vi').replace(/[.,!?;:]/g, '');
          return (
            <span
              key={`${word.from}-${index}`}
              style={{ color: normalized.has(key) ? theme.accent : theme.text }}
            >
              {index ? ' ' : ''}
              {word.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
