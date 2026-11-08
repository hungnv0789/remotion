import type { FC } from 'react';
import { useCurrentFrame } from 'remotion';
import countries from '../data/world.json';
import type { VideoProps } from '../config';

export const WorldMap: FC<{
  theme: VideoProps['theme'];
  labels: VideoProps['copy']['map'];
  regional?: boolean;
  partners?: boolean;
  height?: number;
}> = ({ theme, labels, regional = false, partners = false, height = 420 }) => {
  const frame = useCurrentFrame();
  const points = regional
    ? [
        { x: 648, y: 159, label: labels.iran, color: theme.accent },
        { x: 657, y: 176, label: labels.hormuz, color: theme.teal },
      ]
    : partners
      ? [
          { x: 778, y: 83, label: labels.russia, color: theme.accent },
          { x: 587, y: 114, label: labels.ukraine, color: theme.teal },
          { x: 648, y: 159, label: labels.iran, color: theme.accent },
        ]
      : [
          { x: 235, y: 141, label: labels.us, color: theme.accent },
          { x: 648, y: 159, label: labels.iran, color: theme.accent },
          { x: 795, y: 205, label: labels.vietnam, color: theme.teal },
        ];
  const font = regional ? 7 : 25;
  const radius = regional ? 1.8 : 6;
  return (
    <div
      style={{
        background: '#0B2033',
        border: `1px solid ${theme.border}`,
        borderRadius: 24,
        padding: '16px 15px 20px',
        marginBottom: 26,
      }}
    >
      <svg
        viewBox={regional ? '595 115 120 100' : '0 30 1000 430'}
        width="100%"
        height={height}
        style={{ display: 'block' }}
      >
        {countries.map((country) => (
          <path
            key={country.id}
            d={country.d}
            fill={
              country.id === (partners ? 'UKR' : 'VNM')
                ? `${theme.teal}A0`
                : country.id === 'IRN' || country.id === (partners ? 'RUS' : 'USA')
                  ? `${theme.accent}90`
                  : theme.mapLand
            }
            stroke="#31516A"
            strokeWidth={regional ? 0.25 : 0.5}
            fillRule="evenodd"
          />
        ))}
        {!regional ? (
          <path
            d={partners ? 'M778 83 Q690 58 648 159' : 'M235 141 Q440 25 648 159 Q730 310 795 205'}
            fill="none"
            stroke={theme.teal}
            strokeWidth="3"
            strokeDasharray="9 10"
            strokeDashoffset={-frame * 0.55}
            opacity="0.85"
          />
        ) : (
          <path
            d="M635 175 Q647 183 657 176 T680 188"
            fill="none"
            stroke={theme.teal}
            strokeWidth="1"
            strokeDasharray="2 2"
            strokeDashoffset={-frame * 0.12}
          />
        )}
        {points.map((point, index) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r={radius * (1.6 + (Math.sin(frame / 18) + 1) * 0.35)}
              fill="none"
              stroke={point.color}
              strokeWidth={regional ? 0.5 : 2}
              opacity=".4"
            />
            <circle cx={point.x} cy={point.y} r={radius} fill={point.color} />
            <text
              x={point.x}
              y={point.y + (regional ? (index === 0 ? -6 : 11) : index === 1 ? -22 : 34)}
              textAnchor="middle"
              fill={point.color}
              fontSize={font}
              fontWeight="800"
              stroke="#081524"
              strokeWidth={regional ? 0.6 : 2}
              paintOrder="stroke"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
      <div style={{ fontSize: 17, color: theme.muted, textAlign: 'center', letterSpacing: 1 }}>
        {labels.note}
      </div>
    </div>
  );
};
