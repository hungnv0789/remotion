import { useEffect, useMemo, useState, type FC } from 'react';
import {
  AbsoluteFill,
  Html5Audio,
  cancelRender,
  continueRender,
  delayRender,
  interpolate,
  Sequence,
  staticFile,
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
import { buildTimeline } from './timing';
import { buildCaptionCues, Captions } from './components/Captions';
import { CLAMP, SceneShell } from './components/UI';
import { HookScene } from './scenes/HookScene';
import { SituationScene } from './scenes/SituationScene';
import { AnalysisScene } from './scenes/AnalysisScene';
import { SolutionScene } from './scenes/SolutionScene';
import { CTAScene } from './scenes/CTAScene';

const SCENES = [HookScene, SituationScene, AnalysisScene, SolutionScene, CTAScene] as const;
const assetSource = (path: string) => (/^https?:\/\//i.test(path) ? path : staticFile(path));

const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export const MainVideo: FC<VideoProps> = (props) => {
  const { theme, brand, series, showCaptions, audio, copy } = props;
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const timeline = useMemo(() => buildTimeline(props, fps), [props, fps]);
  const captions = useMemo(() => buildCaptionCues(timeline), [timeline]);
  const [fontHandle] = useState(() => delayRender('Loading Vietnamese typography'));

  useEffect(() => {
    // Font được đóng gói cục bộ; đợi tải xong để tránh thay đổi layout khi render.
    Promise.all(
      [400, 500, 600, 700, 800].map((weight) =>
        document.fonts.load(`${weight} 32px "Be Vietnam Pro"`, 'Tài sản tiền mặt'),
      ),
    )
      .then(() => continueRender(fontHandle))
      .catch(cancelRender);
  }, [fontHandle]);

  const scale = Math.min(width / 1080, height / 1920);
  const progress = frame / Math.max(1, durationInFrames - 1);
  const glowX = Math.sin(frame / fps / 4) * 60;

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
        <AbsoluteFill
          style={{
            backgroundImage:
              'linear-gradient(#ffffff04 1px, transparent 1px), linear-gradient(90deg, #ffffff04 1px, transparent 1px)',
            backgroundSize: '108px 108px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -250,
            left: 350 + glowX,
            width: 1150,
            height: 1150,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.accent}55, transparent 67%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: -600 - glowX,
            width: 1000,
            height: 1000,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.gold}0b, transparent 70%)`,
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 110,
            left: 76,
            right: 124,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: theme.muted,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 13,
              alignItems: 'center',
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            <div style={{ width: 13, height: 13, background: theme.accent, borderRadius: '50%' }} />
            {brand}
          </div>
          <div style={{ width: 34, height: 27, display: 'flex', gap: 5, alignItems: 'flex-end' }}>
            {[12, 20, 27].map((bar) => (
              <div
                key={bar}
                style={{ width: 7, height: bar, background: theme.accent, borderRadius: 3 }}
              />
            ))}
          </div>
        </div>

        {timeline.map((scene, index) => {
          const Scene = SCENES[index];
          return (
            <Sequence
              key={scene.id}
              name={copy.sections[index] ?? scene.id}
              from={scene.from}
              durationInFrames={scene.durationInFrames}
            >
              <SceneShell
                durationInFrames={scene.durationInFrames}
                index={index}
                label={copy.sections[index] ?? scene.id}
                theme={theme}
              >
                <Scene {...props} scene={scene} />
              </SceneShell>
            </Sequence>
          );
        })}

        {showCaptions ? <Captions cues={captions} theme={theme} /> : null}

        <div
          style={{
            position: 'absolute',
            left: 76,
            right: 124,
            bottom: 205,
            height: 4,
            background: '#ffffff18',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <div style={{ width: `${progress * 100}%`, height: '100%', background: theme.accent }} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 76,
            right: 124,
            bottom: 155,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 18,
            letterSpacing: 2,
            color: theme.muted,
          }}
        >
          <div>{series}</div>
          <div>
            {formatTime(frame / fps)} / {formatTime(durationInFrames / fps)}
          </div>
        </div>
      </div>

      {audio.voiceover ? <Html5Audio src={assetSource(audio.voiceover)} volume={1} /> : null}
      {audio.music ? (
        <Html5Audio
          src={assetSource(audio.music)}
          loop
          loopVolumeCurveBehavior="extend"
          volume={(f) =>
            Math.max(0, Math.min(1, audio.musicVolume)) *
            interpolate(
              f,
              [0, fps, durationInFrames - fps, durationInFrames - 1],
              [0, 1, 1, 0],
              CLAMP,
            )
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};
