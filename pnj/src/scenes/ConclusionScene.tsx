import type { FC } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { at, type SceneProps } from '../timing';
import { Card, CLAMP, Headline, Icon, Reveal } from '../components/UI';

export const ConclusionScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const frame = useCurrentFrame();
  const contrast = at(scene, 'contrast');
  const quote = at(scene, 'quote');
  const cta = at(scene, 'cta');
  const checklistOpacity = interpolate(frame, [contrast - 8, contrast], [1, 0], CLAMP);
  const contrastOpacity = interpolate(frame, [quote - 8, quote], [1, 0], CLAMP);
  const quoteOpacity = interpolate(frame, [cta - 8, cta], [1, 0], CLAMP);
  const starts = ['cashflow', 'inventory', 'commitments'].map((id) => at(scene, id));
  const active = starts.reduce((selected, start, index) => (frame >= start ? index : selected), -1);
  return (
    <div style={{ position: 'relative', height: 950 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: checklistOpacity }}>
        <Headline size={68}>{copy.conclusion.title}</Headline>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 30 }}>
          {copy.conclusion.checklist.map((item, index) => (
            <Reveal key={item.title} from={starts[index]}>
              <Card
                theme={theme}
                style={{
                  display: 'flex',
                  gap: 23,
                  borderColor: active === index ? theme.primary : theme.border,
                }}
              >
                <div
                  style={{
                    width: 58,
                    height: 58,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    background: active === index ? theme.primary : theme.soft,
                    color: active === index ? theme.onPrimary : theme.primary,
                    fontSize: 30,
                    borderRadius: 16,
                    fontWeight: 800,
                  }}
                >
                  {index + 1}
                </div>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.35 }}>
                    {item.title}
                  </div>
                  <div
                    style={{ fontSize: 26, color: theme.muted, marginTop: 10, lineHeight: 1.45 }}
                  >
                    {item.detail}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: contrastOpacity,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Reveal from={contrast}>
          {copy.conclusion.contrasts.map((item, index) => (
            <Card
              key={item.title}
              theme={theme}
              style={{
                padding: 40,
                marginBottom: 26,
                background: index === 0 ? theme.dangerSoft : theme.soft,
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  color: index === 0 ? theme.danger : theme.primary,
                  fontWeight: 800,
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.4, marginTop: 16 }}>
                {item.detail}
              </div>
            </Card>
          ))}
        </Reveal>
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: quoteOpacity,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Reveal from={quote}>
          <Card
            theme={theme}
            style={{
              padding: 50,
              background: theme.primary,
              borderColor: theme.primary,
              color: theme.onPrimary,
            }}
          >
            <Icon kind="diamond" color={theme.onPrimary} size={86} />
            <div
              style={{
                fontSize: 58,
                lineHeight: 1.35,
                fontWeight: 800,
                whiteSpace: 'pre-line',
                letterSpacing: -2,
                marginTop: 33,
              }}
            >
              {copy.conclusion.quote}
            </div>
          </Card>
        </Reveal>
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Reveal from={cta}>
          <Headline size={76}>{copy.conclusion.question}</Headline>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 30 }}>
            {copy.conclusion.choices.map((choice, index) => (
              <Card
                key={choice}
                theme={theme}
                style={{ display: 'flex', alignItems: 'center', gap: 24 }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    background: theme.soft,
                    color: theme.primary,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: '50%',
                    fontSize: 30,
                    fontWeight: 800,
                  }}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <div style={{ fontSize: 38, fontWeight: 700 }}>{choice}</div>
              </Card>
            ))}
          </div>
          <div
            style={{
              marginTop: 35,
              padding: '28px 18px',
              background: theme.primary,
              color: theme.onPrimary,
              borderRadius: 20,
              fontSize: 27,
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            {copy.conclusion.action}
          </div>
          <div
            style={{
              marginTop: 25,
              fontSize: 25,
              lineHeight: 1.5,
              textAlign: 'center',
              whiteSpace: 'pre-line',
              color: theme.primary,
              fontWeight: 700,
            }}
          >
            {copy.conclusion.quote}
          </div>
        </Reveal>
      </div>
    </div>
  );
};
