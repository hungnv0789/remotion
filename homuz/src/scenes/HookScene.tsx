import type { FC } from 'react';
import { useCurrentFrame } from 'remotion';
import { at, type SceneProps } from '../timing';
import { Card, Headline, Metric, Phase, PhotoCard, Reveal, Tag, photoById } from '../components/UI';
import { WorldMap } from '../components/WorldMap';

export const HookScene: FC<SceneProps> = (props) => {
  const { scene, theme, copy, images, assets } = props;
  const frame = useCurrentFrame();
  const pivot = at(scene, 'Và thủ phạm');
  const connect = at(scene, 'Đất nước đó');
  return (
    <>
      <Phase from={0} to={pivot}>
        <Reveal>
          <Headline>{copy.hook.title}</Headline>
        </Reveal>
        <PhotoCard theme={theme} photo={photoById(assets, images.fuel)} height={390} />
        <Reveal from={at(scene, '100K')} zoom>
          <Card theme={theme}>
            <Tag theme={theme}>{copy.hook.label}</Tag>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 15,
              }}
            >
              <span
                style={{ fontSize: 112, fontWeight: 800, color: theme.accent, letterSpacing: -4 }}
              >
                {copy.hook.amount}
              </span>
              <span style={{ fontSize: 58, color: theme.muted }}>→</span>
              <span
                style={{ fontSize: 88, fontWeight: 800, color: theme.danger, letterSpacing: -3 }}
              >
                {copy.hook.volume}
              </span>
            </div>
          </Card>
        </Reveal>
      </Phase>
      <Phase from={pivot} to={connect}>
        <Tag theme={theme}>{copy.scenario}</Tag>
        <Headline size={108}>{copy.hook.countries}</Headline>
        <PhotoCard
          theme={theme}
          photo={photoById(assets, frame >= at(scene, 'Còn Trump') ? images.navy : images.gulf)}
          height={520}
          from={pivot}
        />
        <div style={{ fontSize: 39, lineHeight: 1.45, whiteSpace: 'pre-line', color: theme.muted }}>
          {copy.hook.connection}
        </div>
      </Phase>
      <Phase from={connect}>
        <Headline>{copy.hook.question}</Headline>
        <WorldMap theme={theme} labels={copy.map} height={440} />
        <Metric theme={theme} label={copy.scenario} value={copy.hook.countries} size={75} />
      </Phase>
    </>
  );
};
