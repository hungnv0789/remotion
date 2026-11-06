import type { FC } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { cue, type SceneProps } from '../timing';
import { CLAMP, Panel, Reveal, Title } from '../components/UI';

export const SolutionScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const frame = useCurrentFrame();
  const starts = copy.solution.steps.map((_, index) =>
    cue(scene, `step${index + 1}`, index / Math.max(1, copy.solution.steps.length)),
  );
  const active = starts.reduce((selected, start, index) => (frame >= start ? index : selected), -1);
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
            [starts[index], Math.max(starts[index] + 1, (starts[index + 1] ?? scene.speechTo) - 1)],
            [0, 100],
            CLAMP,
          );
          return (
            <Reveal key={step.title} delayFrames={starts[index]}>
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
                      color: selected ? theme.onAccent : theme.muted,
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
                        color: theme.highlight,
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
