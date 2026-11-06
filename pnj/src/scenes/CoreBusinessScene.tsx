import type { FC } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { at, type SceneProps } from '../timing';
import { Card, CLAMP, Headline, Reveal } from '../components/UI';

export const CoreBusinessScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const prior = Number(copy.previousProfit.replace(/\./g, ''));
  const current = Number(copy.profit.replace(/\./g, ''));
  const endWidth =
    Number.isFinite(prior) && prior > 0 && Number.isFinite(current)
      ? Math.max(0, Math.min(100, (current / prior) * 100))
      : 24;
  const width = interpolate(
    frame,
    [at(scene, 'previous') + fps, at(scene, 'previous') + 3 * fps],
    [100, endWidth],
    CLAMP,
  );
  return (
    <>
      <Reveal>
        <Headline size={68}>{copy.core.title}</Headline>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {[
          { label: copy.core.currentLabel, value: copy.profit, color: theme.primary },
          { label: copy.core.previousLabel, value: copy.previousProfit, color: theme.muted },
        ].map((stat, index) => (
          <Reveal key={stat.label} from={at(scene, index === 0 ? 'current' : 'previous')} zoom>
            <Card
              theme={theme}
              style={{ height: 300, boxSizing: 'border-box', borderTop: `4px solid ${stat.color}` }}
            >
              <div
                style={{
                  fontSize: 21,
                  fontWeight: 700,
                  lineHeight: 1.4,
                  color: theme.muted,
                  height: 87,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: index === 0 ? 96 : 79,
                  lineHeight: 1.3,
                  fontWeight: 800,
                  letterSpacing: -4,
                  color: stat.color,
                }}
              >
                ~{stat.value}
              </div>
              <div style={{ fontSize: 21, letterSpacing: 2, color: theme.muted }}>{copy.unit}</div>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal from={at(scene, 'previous')}>
        <Card theme={theme} style={{ marginTop: 24, background: theme.soft }}>
          <div style={{ height: 24, borderRadius: 15, background: `${theme.primary}20` }}>
            <div
              style={{
                width: `${width}%`,
                height: '100%',
                borderRadius: 15,
                background: theme.primary,
              }}
            />
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: theme.primary, marginTop: 22 }}>
            {copy.core.comparison}
          </div>
        </Card>
      </Reveal>
      <Reveal from={at(scene, 'pressure')}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            lineHeight: 1.5,
            color: theme.danger,
            marginTop: 38,
          }}
        >
          {copy.core.pressureTitle}
        </div>
        <div style={{ display: 'flex', gap: 11, marginTop: 20 }}>
          {copy.core.pressures.map((pressure) => (
            <div
              key={pressure}
              style={{
                padding: '17px 14px',
                fontSize: 23,
                fontWeight: 600,
                background: theme.dangerSoft,
                color: theme.danger,
                borderRadius: 13,
              }}
            >
              {pressure}
            </div>
          ))}
        </div>
      </Reveal>
    </>
  );
};
