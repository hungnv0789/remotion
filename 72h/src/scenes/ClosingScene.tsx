import type { FC } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { at, type SceneProps } from '../timing';
import { CLAMP, Icon, PhotoMontage, Reveal, SceneLabel } from '../components/UI';

export const ClosingScene: FC<SceneProps> = ({ scene, theme, copy, images, brand }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const finish = scene.speechTo + Math.round(0.35 * fps);
  const photoOpacity = interpolate(frame, [finish - 15, finish + 12], [0.42, 0], CLAMP);
  const checklistOpacity = interpolate(frame, [finish - 8, finish], [1, 0], CLAMP);
  const starts = [at(scene, 'Chuẩn bị'), at(scene, 'tìm hiểu'), at(scene, 'giữ bình tĩnh')];
  return (
    <AbsoluteFill style={{ background: theme.background }}>
      <AbsoluteFill style={{ opacity: photoOpacity }}>
        <PhotoMontage
          images={[images.home, images.family]}
          duration={scene.durationInFrames}
          dim={0.15}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{ background: 'linear-gradient(180deg, #041020A0, #04102040 40%, #041020F7 85%)' }}
      />
      <SceneLabel index={4} text={copy.labels[4]} theme={theme} />
      <div
        style={{ position: 'absolute', top: 406, left: 76, right: 124, opacity: checklistOpacity }}
      >
        <h1
          style={{
            margin: '0 0 40px',
            fontSize: 69,
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: -2,
          }}
        >
          {copy.closing.title}
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {copy.closing.steps.map((step, index) => (
            <Reveal key={step} from={starts[index]}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 22,
                  padding: '27px 25px',
                  borderRadius: 18,
                  background: '#0D2841ED',
                  border: `1px solid ${theme.border}`,
                }}
              >
                <Icon kind="check" color={theme.accent} size={50} />
                <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.35 }}>{step}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', top: 402, left: 76, right: 124 }}>
        <Reveal from={finish}>
          <div style={{ width: 84, height: 7, background: theme.accent, marginBottom: 36 }} />
          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: 1, marginBottom: 24 }}>
            {copy.closing.line1}
          </div>
          <div
            style={{
              fontSize: 98,
              lineHeight: 1.17,
              letterSpacing: -3,
              fontWeight: 800,
              color: theme.accent,
              whiteSpace: 'pre-line',
            }}
          >
            {copy.closing.line2}
          </div>
          <div
            style={{
              marginTop: 50,
              display: 'flex',
              gap: 21,
              alignItems: 'center',
              borderTop: `1px solid ${theme.border}`,
              borderBottom: `1px solid ${theme.border}`,
              padding: '28px 0',
            }}
          >
            <Icon kind="share" color={theme.accent} size={57} />
            <div style={{ fontSize: 29, fontWeight: 700, lineHeight: 1.5 }}>
              {copy.closing.share}
            </div>
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 25,
              fontWeight: 700,
              lineHeight: 1.5,
              color: theme.muted,
            }}
          >
            {copy.closing.follow}
          </div>
          <div
            style={{
              marginTop: 43,
              fontSize: 23,
              fontWeight: 800,
              color: theme.text,
              letterSpacing: 3,
            }}
          >
            {brand.name}
          </div>
        </Reveal>
      </div>
    </AbsoluteFill>
  );
};
