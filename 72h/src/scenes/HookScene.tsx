import type { FC } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { at, type SceneProps } from '../timing';
import { CLAMP, Icon, PhotoMontage, Reveal, SceneLabel } from '../components/UI';

export const HookScene: FC<SceneProps> = ({ scene, theme, images, copy }) => {
  const frame = useCurrentFrame();
  const reveal = at(scene, 'không có nghĩa');
  return (
    <AbsoluteFill>
      <PhotoMontage
        images={[images.box, images.relief]}
        duration={scene.durationInFrames}
        cutEvery={2.6}
        dim={0.1}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, #041020DD 0%, #04102020 35%, #04102085 58%, #041020FF 83%)',
        }}
      />
      <SceneLabel index={0} text={copy.labels[0]} theme={theme} />
      <div style={{ position: 'absolute', left: 76, right: 124, top: 435 }}>
        <Reveal from={6}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 22,
              color: theme.accent,
              textShadow: '0 5px 25px #00000040',
            }}
          >
            <div style={{ fontSize: 276, fontWeight: 800, lineHeight: 1, letterSpacing: -14 }}>
              {copy.hook.number}
            </div>
            <div style={{ fontSize: 92, fontWeight: 800 }}>{copy.hook.unit}</div>
          </div>
        </Reveal>
        <Reveal from={13}>
          <h1
            style={{
              fontSize: 83,
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: -3,
              whiteSpace: 'pre-line',
              margin: '24px 0',
            }}
          >
            {copy.hook.title}
          </h1>
        </Reveal>
        <Reveal from={21}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2.5,
              color: theme.accent,
              marginTop: 28,
            }}
          >
            {copy.hook.eyebrow}
          </div>
        </Reveal>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 1190,
          left: 76,
          right: 124,
          padding: '25px 28px',
          borderRadius: 19,
          borderLeft: `6px solid ${theme.accent}`,
          background: '#0C2137ED',
          display: 'flex',
          gap: 20,
          alignItems: 'center',
          opacity: interpolate(frame, [reveal, reveal + 9], [0, 1], CLAMP),
        }}
      >
        <Icon kind="shield" color={theme.accent} size={54} />
        <div style={{ fontSize: 33, fontWeight: 600, lineHeight: 1.4 }}>{copy.hook.fact}</div>
      </div>
    </AbsoluteFill>
  );
};
