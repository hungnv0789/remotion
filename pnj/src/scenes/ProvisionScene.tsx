import type { FC } from 'react';
import { at, type SceneProps } from '../timing';
import { Card, Headline, Reveal, Stat } from '../components/UI';

export const ProvisionScene: FC<SceneProps> = ({ theme, copy, scene }) => (
  <>
    <Reveal>
      <Headline>{copy.provision.title}</Headline>
    </Reveal>
    <Reveal from={at(scene, 'amount')} zoom>
      <Stat
        theme={theme}
        label={copy.provision.amountLabel}
        value={`>${copy.provisionValue}`}
        unit={copy.unit}
        size={119}
        style={{ background: theme.soft, borderColor: `${theme.primary}25` }}
      />
    </Reveal>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 17, marginTop: 30 }}>
      {copy.provision.flow.map((step, index) => (
        <Reveal key={step.title} from={at(scene, ['obligation', 'risk', 'record'][index])}>
          <Card
            theme={theme}
            style={{ display: 'flex', gap: 24, alignItems: 'flex-start', padding: '24px 27px' }}
          >
            <div
              style={{
                width: 55,
                height: 55,
                borderRadius: 16,
                background: theme.soft,
                color: theme.primary,
                display: 'grid',
                placeItems: 'center',
                fontSize: 28,
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {index + 1}
            </div>
            <div>
              <div style={{ fontSize: 33, fontWeight: 700 }}>{step.title}</div>
              <div style={{ fontSize: 26, color: theme.muted, lineHeight: 1.45, marginTop: 8 }}>
                {step.detail}
              </div>
            </div>
          </Card>
        </Reveal>
      ))}
    </div>
  </>
);
