import type { FC } from 'react';
import { useCurrentFrame } from 'remotion';
import { at, type SceneProps } from '../timing';
import { Headline, ItemRow, Phase, PhotoCard, Tag, photoById } from '../components/UI';

export const StrategyScene: FC<SceneProps> = ({ scene, theme, copy, assets, images }) => {
  const frame = useCurrentFrame();
  const benefits = at(scene, 'Về quyền lực');
  const starts = [benefits, at(scene, 'Về dầu mỏ'), at(scene, 'Và quan trọng nhất')];
  const active = starts.reduce((selected, from, index) => (frame >= from ? index : selected), 0);
  return (
    <>
      <Tag theme={theme}>{copy.strategy.tag}</Tag>
      <Headline size={70}>{copy.strategy.title}</Headline>
      <Phase from={0} to={benefits}>
        <PhotoCard theme={theme} photo={photoById(assets, images.navy)} height={600} />
        <div style={{ fontSize: 29, letterSpacing: 2, color: theme.accent, fontWeight: 800 }}>
          {copy.strategy.note}
        </div>
      </Phase>
      <Phase from={benefits}>
        <PhotoCard
          theme={theme}
          photo={photoById(assets, images.navyWide)}
          height={285}
          from={benefits}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 17 }}>
          {copy.strategy.benefits.map((item, index) => (
            <ItemRow
              key={item.title}
              theme={theme}
              {...item}
              index={index}
              active={active === index}
            />
          ))}
        </div>
      </Phase>
    </>
  );
};
