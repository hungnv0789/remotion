import type { FC } from 'react';
import { at, type SceneProps } from '../timing';
import { Card, Headline, Phase, PhotoCard, Reveal, Tag, Metric, photoById } from '../components/UI';
import { WorldMap } from '../components/WorldMap';

export const HormuzScene: FC<SceneProps> = ({ scene, theme, copy, assets, images }) => {
  const blocked = at(scene, 'Nếu chiến tranh');
  const forecast = at(scene, 'Nếu lần này');
  return (
    <>
      <Phase from={0} to={blocked}>
        <Headline size={70}>{copy.hormuz.title}</Headline>
        <PhotoCard theme={theme} photo={photoById(assets, images.gulf)} height={450} />
        <Metric
          theme={theme}
          label={copy.hormuz.shareLabel}
          value={copy.hormuz.share}
          color={theme.teal}
          size={108}
        />
        <div style={{ fontSize: 20, color: theme.muted, marginTop: 16 }}>
          {copy.hormuz.reference}
        </div>
      </Phase>
      <Phase from={blocked} to={forecast}>
        <Headline size={67}>{copy.hormuz.takeaway}</Headline>
        <WorldMap theme={theme} labels={copy.map} regional height={400} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          {copy.hormuz.stages.map((label, index) => (
            <Reveal key={label} from={blocked + index * 18}>
              <Card
                theme={theme}
                style={{
                  padding: '20px 25px',
                  display: 'flex',
                  gap: 20,
                  alignItems: 'center',
                  fontSize: 29,
                  fontWeight: 700,
                }}
              >
                <span style={{ color: theme.teal }}>{String(index + 1).padStart(2, '0')}</span>
                {label}
              </Card>
            </Reveal>
          ))}
        </div>
      </Phase>
      <Phase from={forecast}>
        <Tag theme={theme}>{copy.scenario}</Tag>
        <Headline>{copy.hormuz.takeaway}</Headline>
        <PhotoCard
          theme={theme}
          photo={photoById(assets, images.gulf)}
          height={390}
          from={forecast}
        />
        <Reveal from={forecast} zoom>
          <Metric
            theme={theme}
            label={copy.hormuz.scenarioLabel}
            value={copy.hormuz.oilRange}
            unit={copy.hormuz.oilUnit}
            color={theme.danger}
            size={121}
          />
        </Reveal>
      </Phase>
    </>
  );
};
