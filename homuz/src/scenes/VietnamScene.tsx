import type { FC } from 'react';
import { useCurrentFrame } from 'remotion';
import { at, type SceneProps } from '../timing';
import { Card, Headline, ItemRow, Phase, PhotoCard, Tag, photoById } from '../components/UI';

export const VietnamScene: FC<SceneProps> = ({ scene, theme, copy, assets, images }) => {
  const frame = useCurrentFrame();
  const cascade = at(scene, 'Và tất nhiên');
  return (
    <>
      <Phase from={0} to={cascade}>
        <Headline size={72}>{copy.vietnam.title}</Headline>
        <PhotoCard theme={theme} photo={photoById(assets, images.fuel)} height={400} />
        <Card theme={theme}>
          <Tag theme={theme}>{copy.vietnam.scenarioLabel}</Tag>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              justifyContent: 'space-between',
              fontWeight: 800,
              letterSpacing: -3,
            }}
          >
            <span style={{ fontSize: 78, color: theme.accent }}>{copy.vietnam.from}</span>
            <span style={{ fontSize: 48, color: theme.muted }}>→</span>
            <span style={{ fontSize: 79, color: theme.danger }}>{copy.vietnam.to}</span>
          </div>
          <div style={{ fontSize: 22, color: theme.muted, letterSpacing: 2, marginTop: 16 }}>
            {copy.vietnam.unit}
          </div>
        </Card>
      </Phase>
      <Phase from={cascade}>
        <Headline size={68}>{copy.vietnam.title}</Headline>
        <PhotoCard
          theme={theme}
          photo={photoById(assets, images.port)}
          height={320}
          from={cascade}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {copy.vietnam.steps.map((item, index) => (
            <ItemRow
              key={item.title}
              theme={theme}
              {...item}
              index={index}
              active={frame >= cascade + index * 30}
            />
          ))}
        </div>
        <div style={{ fontSize: 25, color: theme.teal, fontWeight: 800, marginTop: 25 }}>
          {copy.vietnam.takeaway}
        </div>
      </Phase>
    </>
  );
};
