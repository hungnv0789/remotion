import type { FC } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import type { VideoProps } from '../config';
import { CLAMP, Panel, Reveal, Title } from '../components/UI';

export const SolutionScene: FC<VideoProps> = ({ theme, copy }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = Math.min(2, Math.floor(frame / (5 * fps)));
  return (
    <>
      <Reveal>
        <Title>{copy.solution.title}</Title>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {copy.solution.steps.map((step, index) => {
          const selected = active === index;
          const progress = interpolate(
            frame,
            [index * 5 * fps, (index + 1) * 5 * fps - 1],
            [0, 100],
            CLAMP,
          );
          return (
            <Reveal key={step.title} delay={index * 0.18}>
              <Panel
                theme={theme}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderColor: selected ? theme.accent : '#ffffff18',
                  padding: '27px 28px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 23 }}>
                  <div
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                      width: 58,
                      height: 58,
                      borderRadius: 16,
                      background: selected ? theme.accent : '#ffffff0e',
                      color: selected ? theme.background : theme.muted,
                      fontSize: 31,
                      fontWeight: 800,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.3 }}>
                      {step.title}
                    </div>
                    <div
                      style={{ fontSize: 26, color: theme.muted, lineHeight: 1.45, marginTop: 12 }}
                    >
                      {step.detail}
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '8px 12px',
                        borderRadius: 7,
                        color: theme.accent,
                        background: `${theme.accent}0e`,
                        marginTop: 16,
                        fontSize: 20,
                        fontWeight: 700,
                        letterSpacing: 1,
                      }}
                    >
                      {step.badge}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: `${progress}%`,
                    height: 3,
                    background: theme.accent,
                  }}
                />
              </Panel>
            </Reveal>
          );
        })}
      </div>
    </>
  );
};
