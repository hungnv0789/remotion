import type { FC } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { at, type SceneProps } from '../timing';
import { Card, CLAMP, Headline, Icon, Reveal } from '../components/UI';

export const AccountingScene: FC<SceneProps> = ({ theme, copy, scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = interpolate(
    frame,
    [at(scene, 'profit'), at(scene, 'profit') + fps],
    [100, 26],
    CLAMP,
  );
  return (
    <>
      <Reveal>
        <Headline>{copy.accounting.title}</Headline>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Reveal from={at(scene, 'split')}>
          <Card
            theme={theme}
            style={{
              height: 390,
              boxSizing: 'border-box',
              background: theme.dangerSoft,
              borderColor: `${theme.danger}30`,
            }}
          >
            <Icon kind="report" color={theme.danger} />
            <div
              style={{
                fontSize: 31,
                fontWeight: 800,
                whiteSpace: 'pre-line',
                color: theme.danger,
                marginTop: 15,
                lineHeight: 1.35,
              }}
            >
              {copy.accounting.left}
            </div>
            <div
              style={{
                height: 12,
                borderRadius: 10,
                background: `${theme.danger}20`,
                marginTop: 24,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${drop}%`,
                  background: theme.danger,
                  borderRadius: 10,
                }}
              />
            </div>
            <div
              style={{
                fontSize: 25,
                color: theme.muted,
                lineHeight: 1.5,
                whiteSpace: 'pre-line',
                marginTop: 20,
              }}
            >
              {copy.accounting.leftDetail}
            </div>
          </Card>
        </Reveal>
        <Reveal from={at(scene, 'split') + 6}>
          <Card
            theme={theme}
            style={{
              height: 390,
              boxSizing: 'border-box',
              background: theme.soft,
              borderColor: `${theme.primary}30`,
            }}
          >
            <Icon kind="cash" color={theme.primary} />
            <div
              style={{
                fontSize: 31,
                fontWeight: 800,
                whiteSpace: 'pre-line',
                color: theme.primary,
                marginTop: 15,
                lineHeight: 1.35,
              }}
            >
              {copy.accounting.right}
            </div>
            <div
              style={{
                height: 12,
                borderRadius: 10,
                background: theme.primary,
                opacity: 0.5,
                marginTop: 24,
              }}
            />
            <div
              style={{
                fontSize: 25,
                color: theme.muted,
                lineHeight: 1.5,
                whiteSpace: 'pre-line',
                marginTop: 20,
              }}
            >
              {copy.accounting.rightDetail}
            </div>
          </Card>
        </Reveal>
      </div>
      <Reveal from={at(scene, 'cash')}>
        <div
          style={{
            fontSize: 47,
            fontWeight: 800,
            textAlign: 'center',
            whiteSpace: 'pre-line',
            lineHeight: 1.4,
            color: theme.primary,
            padding: '28px 5px',
            marginTop: 26,
            borderTop: `2px solid ${theme.border}`,
            borderBottom: `2px solid ${theme.border}`,
          }}
        >
          {copy.accounting.equation}
        </div>
      </Reveal>
      <Reveal from={at(scene, 'takeaway')}>
        <div style={{ fontSize: 30, lineHeight: 1.5, color: theme.muted, marginTop: 24 }}>
          {copy.accounting.takeaway}
        </div>
      </Reveal>
    </>
  );
};
