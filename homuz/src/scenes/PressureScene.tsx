import type { FC } from 'react';
import { at, type SceneProps } from '../timing';
import { Card, Headline, Phase, PhotoCard, Tag, photoById } from '../components/UI';
import { WorldMap } from '../components/WorldMap';

export const PressureScene: FC<SceneProps> = ({ scene, theme, copy, assets, images }) => {
  const foreign = at(scene, 'Trong khi đó');
  const compare = at(scene, 'Nhìn sang');
  return (
    <>
      <Tag theme={theme}>{copy.commentary}</Tag>
      <Headline size={68}>{copy.pressure.title}</Headline>
      <Phase from={0} to={compare}>
        <PhotoCard theme={theme} photo={photoById(assets, images.iran)} height={430} />
        <Card theme={theme}>
          <Tag theme={theme}>{copy.pressure.domestic}</Tag>
          <div style={{ fontSize: 38, fontWeight: 700 }}>{copy.pressure.cards[0].title}</div>
          <div style={{ fontSize: 28, lineHeight: 1.5, color: theme.muted, marginTop: 15 }}>
            {copy.pressure.cards[0].detail}
          </div>
        </Card>
      </Phase>
      <Phase from={compare} to={foreign}>
        <WorldMap theme={theme} labels={copy.map} regional height={460} />
        <Card theme={theme}>
          <div style={{ fontSize: 36, fontWeight: 700, color: theme.accent }}>
            {copy.pressure.cards[0].title}
          </div>
          <div style={{ fontSize: 28, color: theme.muted, marginTop: 17, lineHeight: 1.5 }}>
            {copy.pressure.cards[0].detail}
          </div>
        </Card>
      </Phase>
      <Phase from={foreign}>
        <WorldMap theme={theme} labels={copy.map} partners height={420} />
        <Card theme={theme}>
          <Tag theme={theme}>{copy.pressure.foreign}</Tag>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{copy.pressure.cards[1].title}</div>
          <div style={{ fontSize: 28, lineHeight: 1.5, color: theme.muted, marginTop: 15 }}>
            {copy.pressure.cards[1].detail}
          </div>
        </Card>
      </Phase>
    </>
  );
};
