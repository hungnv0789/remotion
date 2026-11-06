import type { FC } from 'react';
import type { VideoProps } from '../config';
import { Panel, Reveal, Title } from '../components/UI';

export const AnalysisScene: FC<VideoProps> = ({ theme, copy }) => {
  const data = copy.analysis;
  return (
    <>
      <Reveal>
        <Title size={65}>{data.title}</Title>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {[
          { title: data.wealthTitle, detail: data.wealthDetail, color: theme.gold },
          { title: data.liquidityTitle, detail: data.liquidityDetail, color: theme.accent },
        ].map((item, index) => (
          <Reveal key={item.title} delay={0.4 + index * 0.5}>
            <Panel
              theme={theme}
              style={{ height: 268, boxSizing: 'border-box', borderTop: `3px solid ${item.color}` }}
            >
              <div
                style={{
                  height: 105,
                  fontSize: 31,
                  fontWeight: 800,
                  whiteSpace: 'pre-line',
                  color: item.color,
                  lineHeight: 1.4,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 27,
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                  color: theme.muted,
                }}
              >
                {item.detail}
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
      <Reveal delay={4}>
        <div
          style={{
            margin: '28px 0',
            padding: '25px 0',
            textAlign: 'center',
            borderTop: `1px solid ${theme.accent}55`,
            borderBottom: `1px solid ${theme.accent}55`,
            fontSize: 34,
            fontWeight: 800,
            color: theme.accent,
            letterSpacing: -1,
          }}
        >
          {data.equation}
        </div>
      </Reveal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {data.cards.map((card, index) => (
          <Reveal key={card.title} delay={8 + index * 4}>
            <div
              style={{
                borderLeft: `3px solid ${index === 0 ? theme.danger : theme.accent}`,
                paddingLeft: 24,
              }}
            >
              <div
                style={{
                  fontSize: 29,
                  fontWeight: 700,
                  color: index === 0 ? theme.danger : theme.accent,
                }}
              >
                {card.title}
              </div>
              <div style={{ fontSize: 26, lineHeight: 1.45, color: theme.muted, marginTop: 9 }}>
                {card.detail}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={16}>
        <div style={{ display: 'flex', gap: 10, marginTop: 35 }}>
          {data.pillars.map((pillar) => (
            <div
              key={pillar}
              style={{
                flex: 1,
                padding: '19px 8px',
                borderRadius: 14,
                background: theme.accent,
                color: theme.background,
                fontSize: 21,
                textAlign: 'center',
                fontWeight: 800,
              }}
            >
              {pillar}
            </div>
          ))}
        </div>
      </Reveal>
    </>
  );
};
