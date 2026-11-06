import type { FC } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import type { VideoProps } from '../config';
import { CLAMP, Icon, Reveal } from '../components/UI';

export const HookScene: FC<VideoProps> = ({ theme, copy }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const data = copy.hook;
  const lineWidth = interpolate(frame, [0.8 * fps, 1.6 * fps], [0, 100], CLAMP);
  return (
    <>
      <Reveal>
        <div style={{ fontSize: 24, letterSpacing: 3, color: theme.muted }}>{data.eyebrow}</div>
        <div
          style={{
            fontSize: 220,
            lineHeight: 1.16,
            fontWeight: 800,
            letterSpacing: -12,
            color: theme.accent,
          }}
        >
          {data.wealth}
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 37, fontWeight: 600 }}
        >
          <span>{data.wealthLabel}</span>
          <div style={{ height: 2, flex: 1, background: '#ffffff22' }} />
          <Icon kind="home" color={theme.muted} size={48} />
        </div>
      </Reveal>
      <Reveal delay={0.65}>
        <div
          style={{
            maxWidth: 680,
            fontSize: 28,
            color: theme.muted,
            lineHeight: 1.6,
            margin: '42px 0 25px',
          }}
        >
          {data.bridge}
        </div>
      </Reveal>
      <Reveal delay={1.1}>
        <div style={{ position: 'relative', display: 'inline-block', paddingBottom: 14 }}>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1.3,
              fontWeight: 800,
              letterSpacing: -5,
              color: theme.danger,
            }}
          >
            {data.urgent}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              height: 4,
              left: 0,
              width: `${lineWidth}%`,
              background: theme.danger,
            }}
          />
        </div>
        <div style={{ fontSize: 22, letterSpacing: 3, color: theme.danger, marginTop: 17 }}>
          {data.urgentLabel}
        </div>
      </Reveal>
      <Reveal delay={2.35}>
        <div style={{ display: 'flex', gap: 22, alignItems: 'center', marginTop: 46 }}>
          <Icon kind="wallet" color={theme.accent} />
          <div style={{ fontSize: 39, fontWeight: 600, lineHeight: 1.4, whiteSpace: 'pre-line' }}>
            {data.question}
          </div>
        </div>
      </Reveal>
    </>
  );
};
