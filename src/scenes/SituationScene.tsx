import type { FC } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import type { VideoProps } from '../config';
import { CLAMP, Icon, Panel, Reveal, Title } from '../components/UI';

export const SituationScene: FC<VideoProps> = ({ theme, copy }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const data = copy.situation;
  const colors = [theme.accent, theme.gold, theme.danger];
  const total = data.assets.reduce((sum, asset) => sum + asset.amount, 0);
  return (
    <>
      <Reveal>
        <Title>{data.title}</Title>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.assets.map((asset, index) => (
          <Reveal key={asset.kind} delay={index * 1.1}>
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
                    [(8 + index * 1.3) * fps, (8.5 + index * 1.3) * fps],
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
      <Reveal delay={3.2} style={{ marginTop: 27 }}>
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
          <div style={{ fontSize: 59, fontWeight: 800, color: theme.accent }}>
            {data.totalValue}
          </div>
        </div>
      </Reveal>
      <Reveal delay={6}>
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
      <Reveal delay={12.2}>
        <div style={{ fontSize: 36, fontWeight: 700, marginTop: 24 }}>{data.question}</div>
      </Reveal>
    </>
  );
};
