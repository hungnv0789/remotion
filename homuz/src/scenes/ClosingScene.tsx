import type { FC } from 'react';
import { Headline, PhotoCard, Reveal, photoById } from '../components/UI';
import type { SceneProps } from '../timing';

export const ClosingScene: FC<SceneProps> = ({ theme, copy, assets, images }) => (
  <>
    <Reveal>
      <Headline>{copy.closing.title}</Headline>
    </Reveal>
    <PhotoCard theme={theme} photo={photoById(assets, images.port)} height={300} />
    <div style={{ display: 'flex', gap: 12, marginBottom: 29 }}>
      {copy.closing.subjects.map((label) => (
        <div
          key={label}
          style={{
            padding: '12px 17px',
            border: `1px solid ${theme.border}`,
            borderRadius: 12,
            color: theme.teal,
            fontSize: 25,
            fontWeight: 700,
          }}
        >
          {label}
        </div>
      ))}
    </div>
    <div
      style={{
        fontSize: 57,
        fontWeight: 800,
        lineHeight: 1.25,
        letterSpacing: -1.5,
        whiteSpace: 'pre-line',
      }}
    >
      {copy.closing.question}
    </div>
    <div
      style={{
        marginTop: 29,
        padding: '24px 16px',
        background: theme.accent,
        color: theme.background,
        fontSize: 28,
        fontWeight: 800,
        borderRadius: 17,
        textAlign: 'center',
      }}
    >
      {copy.closing.action}
    </div>
    <div
      style={{ fontSize: 21, fontWeight: 600, color: theme.muted, letterSpacing: 1, marginTop: 23 }}
    >
      {copy.closing.endLine}
    </div>
  </>
);
