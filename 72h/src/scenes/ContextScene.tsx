import type { FC } from 'react';
import { AbsoluteFill } from 'remotion';
import { at, type SceneProps } from '../timing';
import { PhotoMontage, Reveal, SceneLabel } from '../components/UI';

export const ContextScene: FC<SceneProps> = ({ scene, theme, images, copy }) => (
  <AbsoluteFill>
    <PhotoMontage
      images={[images.relief, images.food]}
      duration={scene.durationInFrames}
      cutEvery={2.3}
      dim={0.1}
    />
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(180deg, #041020EE 0%, #04102070 30%, #04102030 53%, #041020FF 83%)',
      }}
    />
    <SceneLabel index={1} text={copy.labels[1]} theme={theme} />
    <div style={{ position: 'absolute', top: 352, left: 76, right: 124 }}>
      <Reveal>
        <h1
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: -3,
            whiteSpace: 'pre-line',
            margin: 0,
          }}
        >
          {copy.context.title}
        </h1>
      </Reveal>
    </div>
    <div style={{ position: 'absolute', top: 1010, left: 76, right: 124 }}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {copy.context.regions.map((region, index) => (
          <Reveal key={region} from={index === 0 ? at(scene, 'Liên minh') : at(scene, 'Canada')}>
            <div
              style={{
                padding: '17px 20px',
                borderRadius: 10,
                background: theme.accent,
                color: theme.background,
                fontSize: 25,
                fontWeight: 800,
              }}
            >
              {region}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal from={at(scene, 'khuyến nghị')}>
        <div
          style={{ fontSize: 38, lineHeight: 1.45, fontWeight: 600, marginTop: 29, maxWidth: 820 }}
        >
          {copy.context.detail}
        </div>
      </Reveal>
    </div>
  </AbsoluteFill>
);
