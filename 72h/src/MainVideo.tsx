import { useEffect, useMemo, useState, type FC } from 'react';
import {
  AbsoluteFill,
  Html5Audio,
  Sequence,
  cancelRender,
  continueRender,
  delayRender,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import '@fontsource/be-vietnam-pro/latin-400.css';
import '@fontsource/be-vietnam-pro/vietnamese-400.css';
import '@fontsource/be-vietnam-pro/latin-500.css';
import '@fontsource/be-vietnam-pro/vietnamese-500.css';
import '@fontsource/be-vietnam-pro/latin-600.css';
import '@fontsource/be-vietnam-pro/vietnamese-600.css';
import '@fontsource/be-vietnam-pro/latin-700.css';
import '@fontsource/be-vietnam-pro/vietnamese-700.css';
import '@fontsource/be-vietnam-pro/latin-800.css';
import '@fontsource/be-vietnam-pro/vietnamese-800.css';
import type { VideoProps } from './config';
import { buildCaptionCues, buildTimeline } from './timing';
import { CLAMP, mediaSource } from './components/UI';
import { Captions } from './components/Captions';
import { HookScene } from './scenes/HookScene';
import { ContextScene } from './scenes/ContextScene';
import { SuppliesScene } from './scenes/SuppliesScene';
import { MessageScene } from './scenes/MessageScene';
import { ClosingScene } from './scenes/ClosingScene';

const SCENES = [HookScene, ContextScene, SuppliesScene, MessageScene, ClosingScene] as const;
const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export const MainVideo: FC<VideoProps> = (props) => {
  const { theme, brand, copy, audio, timing, showCaptions } = props;
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const timeline = useMemo(() => buildTimeline(props, fps), [props, fps]);
  const cues = useMemo(() => buildCaptionCues(timeline), [timeline]);
  const [fontHandle] = useState(() => delayRender('Loading Vietnamese news typography'));
  useEffect(() => {
    Promise.all(
      [400, 500, 600, 700, 800].map((weight) =>
        document.fonts.load(`${weight} 32px "Be Vietnam Pro"`, 'Chủ động dự trữ bình tĩnh'),
      ),
    )
      .then(() => continueRender(fontHandle))
      .catch(cancelRender);
  }, [fontHandle]);
  const scale = Math.min(width / 1080, height / 1920);
  return (
    <AbsoluteFill style={{ background: theme.background }}>
      <div
        style={{
          position: 'absolute',
          width: 1080,
          height: 1920,
          left: (width - 1080 * scale) / 2,
          top: (height - 1920 * scale) / 2,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          overflow: 'hidden',
          background: theme.background,
          color: theme.text,
          fontFamily: '"Be Vietnam Pro", sans-serif',
        }}
      >
        {timeline.map((scene, index) => {
          const Scene = SCENES[index];
          const opacity =
            index === timeline.length - 1
              ? 1
              : interpolate(
                  frame,
                  [
                    scene.from + scene.durationInFrames - 6,
                    scene.from + scene.durationInFrames - 1,
                  ],
                  [1, 0],
                  CLAMP,
                );
          return (
            <Sequence
              key={scene.id}
              name={copy.labels[index]}
              from={scene.from}
              durationInFrames={scene.durationInFrames}
              style={{ opacity }}
            >
              <Scene {...props} scene={scene} />
            </Sequence>
          );
        })}
        <div
          style={{
            position: 'absolute',
            top: 94,
            left: 76,
            right: 124,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              padding: '14px 18px',
              borderLeft: `4px solid ${theme.accent}`,
              background: '#06182BE8',
              fontSize: 21,
              fontWeight: 800,
              letterSpacing: 2.5,
              lineHeight: 1.5,
            }}
          >
            {brand.category}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '12px 18px',
              background: '#06182BE8',
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontSize: 39,
                fontWeight: 800,
                letterSpacing: -1,
                color: theme.accent,
                lineHeight: 1.1,
              }}
            >
              {brand.monogram}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, marginTop: 7, letterSpacing: 1 }}>
              {brand.name}
            </div>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 1388,
            left: 76,
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: 2,
            color: theme.muted,
          }}
        >
          {copy.illustration}
        </div>
        {showCaptions ? <Captions cues={cues} keywords={copy.keywords} theme={theme} /> : null}
        <div
          style={{
            position: 'absolute',
            left: 76,
            right: 124,
            bottom: 190,
            height: 4,
            borderRadius: 6,
            background: theme.border,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${(frame / Math.max(1, durationInFrames - 1)) * 100}%`,
              background: theme.accent,
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 76,
            right: 124,
            bottom: 146,
            display: 'flex',
            justifyContent: 'space-between',
            color: theme.muted,
            fontSize: 18,
            letterSpacing: 1,
          }}
        >
          <span>{brand.series}</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>
            {clock(frame / fps)} / {clock(durationInFrames / fps)}
          </span>
        </div>
      </div>
      <Sequence from={Math.round(timing.voiceoverStartSeconds * fps)} name="Giọng đọc gốc">
        <Html5Audio
          src={mediaSource(audio.voiceover)}
          playbackRate={audio.playbackRate}
          volume={Math.max(0, Math.min(1, audio.voiceoverVolume))}
        />
      </Sequence>
      {audio.music ? (
        <Html5Audio
          src={mediaSource(audio.music)}
          loop
          loopVolumeCurveBehavior="extend"
          volume={(f) =>
            Math.max(0, Math.min(1, audio.musicVolume)) *
            interpolate(
              f,
              [0, fps, durationInFrames - 2 * fps, durationInFrames - 1],
              [0, 1, 1, 0],
              CLAMP,
            )
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};
