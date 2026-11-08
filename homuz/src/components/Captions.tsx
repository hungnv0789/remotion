import type { FC } from 'react';
import { useCurrentFrame } from 'remotion';
import type { CaptionCue } from '../timing';
import type { Theme } from './UI';

export const Captions: FC<{ cues: CaptionCue[]; keywords: string[]; theme: Theme }> = ({
  cues,
  keywords,
  theme,
}) => {
  const frame = useCurrentFrame();
  const cue = cues.find((item) => frame >= item.start && frame < item.end);
  if (!cue) return null;
  const highlighted = new Set(keywords.map((word) => word.toLocaleLowerCase('vi')));
  return (
    <div
      style={{
        position: 'absolute',
        left: 76,
        right: 124,
        bottom: 226,
        height: 211,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: '25px 28px',
        borderRadius: 19,
        border: `1px solid ${theme.border}`,
        background: '#04111FF5',
        textAlign: 'center',
        fontSize: 37,
        lineHeight: 1.4,
        fontWeight: 600,
      }}
    >
      <div>
        {cue.words.map((word, index) => (
          <span
            key={`${word.from}-${index}`}
            style={{
              color: highlighted.has(word.text.toLocaleLowerCase('vi').replace(/[.,!?;:]/g, ''))
                ? theme.accent
                : theme.text,
            }}
          >
            {index ? ' ' : ''}
            {word.text}
          </span>
        ))}
      </div>
    </div>
  );
};
