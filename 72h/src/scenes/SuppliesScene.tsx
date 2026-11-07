import type { FC } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { at, type SceneProps } from '../timing';
import { CLAMP, Photo, Reveal, SceneLabel } from '../components/UI';

export const SuppliesScene: FC<SceneProps> = ({ scene, theme, copy }) => {
  const frame = useCurrentFrame();
  const rawStarts = [0, at(scene, 'nước uống'), at(scene, 'thuốc men'), at(scene, 'vật dụng')];
  const starts = rawStarts.reduce<number[]>(
    (result, start, index) => [
      ...result,
      index === 0 ? 0 : Math.max(start, result[index - 1] + 45),
    ],
    [],
  );
  // Các mốc theo lời đọc, giữ mỗi ảnh ít nhất 1,5 giây để không chuyển quá gấp.
  return (
    <AbsoluteFill style={{ background: theme.background }}>
      <SceneLabel index={2} text={copy.labels[2]} theme={theme} />
      <div style={{ position: 'absolute', top: 323, left: 76, right: 124 }}>
        <Reveal>
          <h1
            style={{
              margin: 0,
              fontSize: 73,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.2,
              whiteSpace: 'pre-line',
            }}
          >
            {copy.supplies.title}
          </h1>
        </Reveal>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 537,
          left: 76,
          right: 124,
          height: 510,
          borderRadius: 24,
          overflow: 'hidden',
          border: `1px solid ${theme.border}`,
        }}
      >
        {copy.supplies.items.map((item, index) => {
          const opacity =
            index === 0 ? 1 : interpolate(frame, [starts[index], starts[index] + 6], [0, 1], CLAMP);
          return (
            <AbsoluteFill key={item.image} style={{ opacity }}>
              <Photo
                src={item.image}
                from={starts[index]}
                duration={scene.durationInFrames}
                position={item.position}
              />
              <AbsoluteFill
                style={{ background: 'linear-gradient(180deg, transparent 40%, #031020E8)' }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 28,
                  right: 28,
                  bottom: 25,
                  fontSize: 29,
                  fontWeight: 700,
                }}
              >
                {item.detail}
              </div>
            </AbsoluteFill>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 76,
          right: 124,
          top: 1081,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
      >
        {copy.supplies.items.map((item, index) => {
          const selected =
            frame >= starts[index] && (index === starts.length - 1 || frame < starts[index + 1]);
          return (
            <div
              key={item.title}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '19px 19px',
                minHeight: 56,
                background: selected ? `${theme.accent}18` : theme.panel,
                border: `1px solid ${selected ? theme.accent : theme.border}`,
                borderRadius: 14,
                fontSize: 23,
                fontWeight: 700,
                lineHeight: 1.35,
                color: selected ? theme.accent : theme.text,
              }}
            >
              <span style={{ color: theme.accent, fontSize: 18 }}>
                {String(index + 1).padStart(2, '0')}
              </span>
              {item.title}
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 76,
          right: 124,
          top: 1350,
          fontSize: 21,
          fontWeight: 700,
          letterSpacing: 1.5,
          color: theme.muted,
        }}
      >
        {copy.supplies.footer}
      </div>
    </AbsoluteFill>
  );
};
