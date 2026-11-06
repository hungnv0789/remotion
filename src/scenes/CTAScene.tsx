import type { FC } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { cue, type SceneProps } from '../timing';
import { Icon, Panel, Reveal, Title } from '../components/UI';

export const CTAScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = 1 + Math.sin((frame / fps) * Math.PI * 2) * 0.012;
  return (
    <>
      <Reveal>
        <Title>{copy.cta.title}</Title>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {copy.cta.choices.map((choice, index) => (
          <Reveal
            key={choice.label}
            delayFrames={cue(scene, index === 0 ? 'choiceA' : 'choiceB', 0.15 + index * 0.35)}
          >
            <Panel
              theme={theme}
              style={{
                borderColor: index === 0 ? `${theme.danger}66` : `${theme.accent}99`,
                padding: '26px 32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
                <div
                  style={{
                    width: 66,
                    height: 66,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    color: index === 0 ? theme.background : theme.onAccent,
                    background: index === 0 ? theme.danger : theme.accent,
                    fontSize: 33,
                    fontWeight: 800,
                  }}
                >
                  {choice.label}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 86,
                      lineHeight: 1.25,
                      fontWeight: 800,
                      letterSpacing: -4,
                      color: index === 0 ? theme.text : theme.highlight,
                    }}
                  >
                    {choice.amount}
                  </div>
                  <div style={{ fontSize: 28, color: theme.muted, lineHeight: 1.4, marginTop: 8 }}>
                    {choice.detail}
                  </div>
                </div>
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
      <Reveal delayFrames={cue(scene, 'action', 0.75)}>
        <div
          style={{
            transform: `scale(${pulse})`,
            display: 'flex',
            gap: 18,
            justifyContent: 'center',
            alignItems: 'center',
            background: theme.accent,
            color: theme.onAccent,
            borderRadius: 20,
            padding: '23px 15px',
            marginTop: 36,
            fontSize: 30,
            fontWeight: 800,
          }}
        >
          {copy.cta.action}
          <Icon kind="arrow" color={theme.onAccent} size={37} />
        </div>
        <div style={{ fontSize: 25, color: theme.muted, textAlign: 'center', marginTop: 22 }}>
          {copy.cta.footer}
        </div>
      </Reveal>
    </>
  );
};
