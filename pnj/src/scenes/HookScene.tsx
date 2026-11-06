import type { FC } from 'react';
import { at, type SceneProps } from '../timing';
import { Card, Headline, Icon, Reveal, Stat } from '../components/UI';

export const HookScene: FC<SceneProps> = ({ theme, copy, subject, scene }) => (
  <>
    <Reveal>
      <Headline>{copy.hook.title}</Headline>
    </Reveal>
    <Reveal from={at(scene, 'revenue')} zoom>
      <Stat
        theme={theme}
        label={copy.hook.revenueLabel}
        value={copy.revenue}
        unit={copy.unit}
        size={132}
      />
    </Reveal>
    <Reveal from={at(scene, 'loss')} zoom style={{ marginTop: 22 }}>
      <Stat
        theme={theme}
        label={copy.hook.lossLabel}
        value={`${copy.loss}?`}
        unit={copy.unit}
        color={theme.danger}
        size={116}
        style={{ background: theme.dangerSoft, borderColor: `${theme.danger}35` }}
      />
    </Reveal>
    <Reveal from={at(scene, 'reveal')} style={{ marginTop: 28 }}>
      <Card
        theme={theme}
        style={{
          display: 'flex',
          gap: 23,
          alignItems: 'center',
          padding: '24px 26px',
          background: theme.primary,
          color: theme.onPrimary,
          borderColor: theme.primary,
        }}
      >
        <Icon kind="diamond" color={theme.onPrimary} size={58} />
        <div>
          <div style={{ fontSize: 42, lineHeight: 1.2, fontWeight: 800 }}>{subject}</div>
          <div style={{ fontSize: 23, fontWeight: 600, marginTop: 7 }}>{copy.hook.question}</div>
        </div>
      </Card>
    </Reveal>
  </>
);
