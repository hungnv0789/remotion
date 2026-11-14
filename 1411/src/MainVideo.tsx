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
import { InspectionScene } from './scenes/InspectionScene';
import { SanctionsScene } from './scenes/SanctionsScene';
import { SafetyScene } from './scenes/SafetyScene';
import { DepositsScene } from './scenes/DepositsScene';
import { BorrowersScene } from './scenes/BorrowersScene';
import { BalanceScene } from './scenes/BalanceScene';
import { ClosingScene } from './scenes/ClosingScene';

const SCENES = [HookScene, InspectionScene, SanctionsScene, SafetyScene, DepositsScene, BorrowersScene, BalanceScene, ClosingScene] as const;
const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export const MainVideo: FC<VideoProps> = (props) => {
  const { theme, brand, copy, audio, timing, showCaptions } = props;
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const timeline = useMemo(() => buildTimeline(props, fps), [props, fps]);
  const cues = useMemo(() => buildCaptionCues(timeline), [timeline]);
  const [fontHandle] = useState(() => delayRender('Đang tải phông tiếng Việt'));
  useEffect(() => {
    Promise.all(
      [400, 500, 600, 700, 800].map((weight) =>
        document.fonts.load(`${weight} 32px "Be Vietnam Pro"`, 'Ngân hàng Nhà nước lãi suất thanh tra tín dụng'),
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
            background: `radial-gradient(ellipse at top right, ${theme.teal}0C, transparent 60%)`,
          }}
        />
        <AbsoluteFill
          style={{
            backgroundImage:
              'linear-gradient(#8229e306 1px, transparent 1px),linear-gradient(90deg,#8229e306 1px,transparent 1px)',
            backgroundSize: '108px 108px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 93,
            left: 76,
            right: 124,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ padding: '13px 16px', borderLeft: `4px solid ${theme.accent}`, fontSize: 23, fontWeight: 800, letterSpacing: 2, color: theme.accent }}>{brand}</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: theme.muted }}>{props.issue}</div>
        </div>
        <AbsoluteFill style={{ pointerEvents: 'none', background: '#FFFFFF', opacity: interpolate(frame, [0, 2, 7, 12], [1, .9, .08, 0], CLAMP), zIndex: 10 }} />
        {timeline.map((scene, index) => {
          const Scene = SCENES[index];
          const opacity = interpolate(frame, [scene.from, scene.from + 6], [0, 1], CLAMP);
          return (
            <Sequence
              key={scene.id}
              name={copy.sections[index]}
              from={scene.from}
              durationInFrames={scene.durationInFrames}
            >
              <AbsoluteFill style={{ opacity, transform: `scale(${interpolate(frame - scene.from, [0, 9], [1.07, 1], CLAMP)})`, filter: `blur(${interpolate(frame - scene.from, [0, 6], [6, 0], CLAMP)}px)` }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 221,
                    left: 76,
                    right: 124,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 17,
                    color: theme.accent,
                    fontSize: 21,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                  }}
                >
                  <span
                    style={{
                      padding: '8px 12px',
                      border: `1px solid ${theme.accent}55`,
                      borderRadius: 9,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {copy.sections[index]}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: 340,
                    bottom: 500,
                    left: 76,
                    right: 124,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Scene {...props} scene={scene} />
                </div>
              </AbsoluteFill>
            </Sequence>
          );
        })}
        {showCaptions ? <Captions cues={cues} keywords={copy.keywords} theme={theme} /> : null}
        <div
          style={{
            position: 'absolute',
            left: 76,
            right: 124,
            bottom: 191,
            height: 4,
            background: theme.border,
            borderRadius: 5,
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
            gap: 20,
            color: theme.muted,
            fontSize: 17,
            letterSpacing: 0.5,
          }}
        >
          <span>{copy.footer}</span>
          <span style={{ fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>
            {clock((frame + 1) / fps)} / {clock(durationInFrames / fps)}
          </span>
        </div>
      </div>
      <Html5Audio src={mediaSource(audio.music)} volume={(f) => {
        const fade = interpolate(f, [0, fps * .7, durationInFrames - fps * 1.2, durationInFrames], [0, 1, 1, 0], CLAMP);
        const speaking = cues.some((cue) => f >= cue.start - 4 && f <= cue.end + 4);
        return audio.musicVolume * fade * (speaking ? audio.musicDuck : 1);
      }} />
      <Sequence from={0} durationInFrames={Math.ceil(fps * .7)} name="News sting">
        <Html5Audio src={mediaSource(audio.sting)} volume={audio.stingVolume} />
      </Sequence>
      <Sequence from={Math.round(timing.voiceoverStartSeconds * fps)} name="female_north — Voice-over">
        <Html5Audio
          src={mediaSource(audio.voiceover)}
          playbackRate={audio.playbackRate}
          volume={Math.max(0, Math.min(1, audio.volume))}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
