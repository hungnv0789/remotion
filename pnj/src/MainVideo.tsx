import { useEffect, useMemo, useState, type FC } from 'react';
import {
  AbsoluteFill,
  Html5Audio,
  Sequence,
  cancelRender,
  continueRender,
  delayRender,
  interpolate,
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
import { buildCaptionCues, buildTimeline } from './timing';
import { CLAMP, Icon, SceneShell } from './components/UI';
import { Captions } from './components/Captions';
import { HookScene } from './scenes/HookScene';
import { QuestionScene } from './scenes/QuestionScene';
import { ProvisionScene } from './scenes/ProvisionScene';
import { AccountingScene } from './scenes/AccountingScene';
import { CoreBusinessScene } from './scenes/CoreBusinessScene';
import { ConclusionScene } from './scenes/ConclusionScene';

const SCENES = [
  HookScene,
  QuestionScene,
  ProvisionScene,
  AccountingScene,
  CoreBusinessScene,
  ConclusionScene,
] as const;
const mediaSource = (src: string) => (/^https?:\/\//i.test(src) ? src : staticFile(src));
const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export const MainVideo: FC<VideoProps> = (props) => {
  const { theme, brand, subject, series, status, showCaptions, audio, script } = props;
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const timeline = useMemo(() => buildTimeline(props, fps), [props, fps]);
  const captions = useMemo(() => buildCaptionCues(timeline), [timeline]);
  const [fontHandle] = useState(() => delayRender('Loading Vietnamese typography'));
  useEffect(() => {
    Promise.all(
      [400, 500, 600, 700, 800].map((weight) =>
        document.fonts.load(`${weight} 32px "Be Vietnam Pro"`, 'Lợi nhuận dòng tiền'),
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
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at 100% 0%, ${theme.soft}, transparent 55%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 156,
            right: -55,
            fontSize: 310,
            fontWeight: 800,
            letterSpacing: -18,
            color: theme.primary,
            opacity: 0.035,
          }}
        >
          {subject}
        </div>
        <div
          style={{
            position: 'absolute',
            top: 94,
            left: 76,
            right: 124,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 15,
              alignItems: 'center',
              color: theme.primary,
              fontSize: 23,
              fontWeight: 800,
            }}
          >
            <Icon kind="diamond" color={theme.primary} size={38} />
            {brand}
          </div>
          <div
            style={{
              border: `1px solid ${theme.border}`,
              background: theme.panel,
              borderRadius: 12,
              padding: '10px 17px',
              fontSize: 23,
              fontWeight: 800,
              color: theme.primary,
            }}
          >
            {subject}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 169,
            left: 76,
            color: theme.muted,
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 2.4,
          }}
        >
          {status}
        </div>
        {timeline.map((scene, index) => {
          const Scene = SCENES[index];
          return (
            <Sequence
              key={scene.id}
              name={script[index].label}
              from={scene.from}
              durationInFrames={scene.durationInFrames}
            >
              <SceneShell scene={scene} label={script[index].label} index={index} theme={theme}>
                <Scene {...props} scene={scene} />
              </SceneShell>
              {audio.sceneVoiceovers[index] ? (
                <Html5Audio src={mediaSource(audio.sceneVoiceovers[index])} volume={1} />
              ) : null}
            </Sequence>
          );
        })}
        {showCaptions ? <Captions cues={captions} theme={theme} /> : null}
        <div
          style={{
            position: 'absolute',
            left: 76,
            right: 124,
            bottom: 203,
            height: 5,
            background: theme.border,
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${(frame / Math.max(1, durationInFrames - 1)) * 100}%`,
              background: theme.primary,
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 76,
            right: 124,
            bottom: 151,
            display: 'flex',
            justifyContent: 'space-between',
            color: theme.muted,
            fontSize: 18,
            letterSpacing: 1.5,
          }}
        >
          <span>{series}</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>
            {clock(frame / fps)} / {clock(durationInFrames / fps)}
          </span>
        </div>
      </div>
      {audio.music ? (
        <Html5Audio
          src={mediaSource(audio.music)}
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
