import type { FC } from 'react';
import { AbsoluteFill } from 'remotion';
import { at, type SceneProps } from '../timing';
import { Icon, PhotoMontage, Reveal, SceneLabel } from '../components/UI';

export const MessageScene: FC<SceneProps> = ({ scene, theme, copy, images }) => (
  <AbsoluteFill>
    <PhotoMontage
      images={[images.family, images.home, images.medical, images.bag]}
      duration={scene.durationInFrames}
      cutEvery={2.8}
      dim={0.38}
    />
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(180deg, #041020FB 0%, #041020D9 35%, #04102066 53%, #041020F9 80%)',
      }}
    />
    <SceneLabel index={3} text={copy.labels[3]} theme={theme} />
    <div style={{ position: 'absolute', top: 356, left: 76, right: 124 }}>
      <Reveal>
        <h1
          style={{
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.16,
            letterSpacing: -2,
            whiteSpace: 'pre-line',
            margin: 0,
            color: theme.accent,
          }}
        >
          {copy.message.title}
        </h1>
      </Reveal>
    </div>
    <div
      style={{
        position: 'absolute',
        top: 867,
        left: 76,
        right: 124,
        display: 'flex',
        flexDirection: 'column',
        gap: 21,
      }}
    >
      <Reveal from={at(scene, 'biện pháp phòng ngừa')}>
        <div
          style={{
            display: 'flex',
            gap: 20,
            alignItems: 'center',
            padding: '24px 28px',
            borderRadius: 17,
            background: '#0B2439F5',
            borderLeft: `5px solid ${theme.accent}`,
          }}
        >
          <Icon kind="shield" color={theme.accent} size={55} />
          <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.4 }}>{copy.message.first}</div>
        </div>
      </Reveal>
      <Reveal from={at(scene, 'không phải dấu hiệu')}>
        <div
          style={{
            padding: '24px 28px',
            borderRadius: 17,
            background: '#0B2439F5',
            border: `1px solid ${theme.border}`,
            fontSize: 32,
            fontWeight: 600,
            lineHeight: 1.45,
          }}
        >
          {copy.message.second}
        </div>
      </Reveal>
      <Reveal from={at(scene, 'thảm họa')}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: theme.accent,
            lineHeight: 1.5,
            letterSpacing: 1,
            marginTop: 10,
          }}
        >
          {copy.message.positive}
        </div>
      </Reveal>
    </div>
  </AbsoluteFill>
);
