import type { FC } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { cue, type SceneProps } from '../timing';
import { CLAMP, Icon, Panel, Reveal, Title } from '../components/UI';

export const SituationScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const data = copy.situation;
  const colors = [theme.highlight, theme.gold, theme.danger];
  const total = data.assets.reduce((sum, asset) => sum + asset.amount, 0);
  return (
    <>
      <Reveal>
        <Title>{data.title}</Title>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.assets.map((asset, index) => (
          <Reveal key={asset.kind} delayFrames={cue(scene, asset.kind, index * 0.12)}>
            <Panel theme={theme} style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
                <Icon kind={asset.kind} color={colors[index % colors.length]} size={62} />
                <div style={{ flex: 1, fontSize: 23, fontWeight: 600, letterSpacing: 1 }}>
                  {asset.label}
                </div>
                <div style={{ fontSize: 41, fontWeight: 700, letterSpacing: -1 }}>
                  {asset.value}
                </div>
              </div>
              <div
                style={{
                  fontSize: 25,
                  color: theme.danger,
                  margin: '12px 0 0 84px',
                  opacity: interpolate(
                    frame,
                    [
                      cue(scene, `${asset.kind}Risk`, 0.65 + index * 0.1),
                      cue(scene, `${asset.kind}Risk`, 0.65 + index * 0.1) + 0.4 * fps,
                    ],
                    [0, 1],
                    CLAMP,
                  ),
                }}
              >
                {asset.risk}
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
      <Reveal delayFrames={cue(scene, 'total', 0.35)} style={{ marginTop: 27 }}>
        <div style={{ display: 'flex', gap: 5, height: 11, borderRadius: 8, overflow: 'hidden' }}>
          {data.assets.map((asset, index) => (
            <div
              key={asset.kind}
              style={{
                width: `${(asset.amount / Math.max(total, 1)) * 100}%`,
                background: colors[index % colors.length],
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 16,
          }}
        >
          <div style={{ fontSize: 24, letterSpacing: 2, color: theme.muted }}>
            {data.totalLabel}
          </div>
          <div style={{ fontSize: 59, fontWeight: 800, color: theme.highlight }}>
            {data.totalValue}
          </div>
        </div>
      </Reveal>
      <Reveal delayFrames={cue(scene, 'emergency', 0.45)}>
        <div
          style={{
            display: 'flex',
            gap: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid ${theme.danger}55`,
            borderBottom: `1px solid ${theme.danger}55`,
            padding: '20px 0',
            marginTop: 23,
          }}
        >
          <div style={{ color: theme.danger, fontSize: 23, fontWeight: 700 }}>
            {data.emergencyLabel}
          </div>
          <div style={{ fontSize: 43, color: theme.danger, fontWeight: 800 }}>
            {data.emergencyValue}
          </div>
        </div>
      </Reveal>
      <Reveal delayFrames={cue(scene, 'question', 0.9)}>
        <div style={{ fontSize: 36, fontWeight: 700, marginTop: 24 }}>{data.question}</div>
      </Reveal>
    </>
  );
};
