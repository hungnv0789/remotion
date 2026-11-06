import type { FC } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { at, type SceneProps } from '../timing';
import { Card, CLAMP, Headline, Reveal, Stat } from '../components/UI';

export const QuestionScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const flip = at(scene, 'question');
  const cross = interpolate(frame, [flip, flip + 8], [0, 1], CLAMP);
  const zoom = spring({ frame: frame - flip, fps, config: { damping: 15, stiffness: 160 } });
  return (
    <>
      <Reveal>
        <Headline size={69}>{copy.question.title}</Headline>
      </Reveal>
      <Reveal from={at(scene, 'growth')}>
        <Card
          theme={theme}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: theme.positiveSoft,
            borderColor: `${theme.positive}35`,
            marginBottom: 25,
          }}
        >
          <div>
            <div style={{ color: theme.positive, fontSize: 26, fontWeight: 700 }}>
              {copy.question.growthLabel}
            </div>
            <div
              style={{ fontSize: 102, fontWeight: 800, letterSpacing: -4, color: theme.positive }}
            >
              {copy.growth}
            </div>
          </div>
          <svg width="230" height="130" viewBox="0 0 230 130" fill="none">
            <path d="M5 115h220M5 25v90" stroke={theme.positive} opacity="0.2" strokeWidth="2" />
            <path
              d="m15 100 50-20 50 8 50-40 48-27M186 21h27v27"
              stroke={theme.positive}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Card>
      </Reveal>
      <div style={{ position: 'relative', height: 290 }}>
        <div style={{ opacity: 1 - cross, transform: `scale(${1 + cross * 0.09})` }}>
          <Stat
            theme={theme}
            label={copy.question.revenueLabel}
            value={copy.revenue}
            unit={copy.unit}
            size={128}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: cross,
            transform: `scale(${1.12 - zoom * 0.12})`,
          }}
        >
          <Stat
            theme={theme}
            label={copy.question.lossLabel}
            value={copy.loss}
            unit={copy.unit}
            color={theme.danger}
            size={128}
            style={{ background: theme.dangerSoft, borderColor: `${theme.danger}35` }}
          />
        </div>
      </div>
      <Reveal from={flip + 10}>
        <div
          style={{
            fontSize: 41,
            fontWeight: 700,
            lineHeight: 1.4,
            color: theme.primary,
            marginTop: 30,
          }}
        >
          {copy.question.question}
        </div>
      </Reveal>
    </>
  );
};
