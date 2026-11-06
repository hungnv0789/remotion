import type { FC } from 'react';
import { Composition, staticFile } from 'remotion';
import { getAudioDurationInSeconds } from '@remotion/media-utils';
import { MainVideo } from './MainVideo';
import { defaultProps, VIDEO } from './config';
import { buildTimeline, getDurationInFrames } from './timing';

export const RemotionRoot: FC = () => (
  <Composition
    id="PNJFinancialStory"
    component={MainVideo}
    fps={VIDEO.fps}
    width={VIDEO.width}
    height={VIDEO.height}
    durationInFrames={getDurationInFrames(buildTimeline(defaultProps, VIDEO.fps))}
    defaultProps={defaultProps}
    calculateMetadata={async ({ props }) => {
      const voiceovers = props.audio.sceneVoiceovers;
      if (voiceovers.length !== 0 && voiceovers.length !== props.script.length)
        throw new Error('Cần để trống sceneVoiceovers hoặc nhập đủ 6 bản thu theo phân cảnh.');
      if (voiceovers.some((src) => !src.trim()))
        throw new Error('Đường dẫn bản thu không được trống.');
      const durations = voiceovers.length
        ? await Promise.all(
            voiceovers.map((src) =>
              getAudioDurationInSeconds(/^https?:\/\//i.test(src) ? src : staticFile(src)),
            ),
          )
        : props.timing.sceneDurationsSeconds;
      const resolved = { ...props, timing: { ...props.timing, sceneDurationsSeconds: durations } };
      return {
        props: resolved,
        durationInFrames: getDurationInFrames(buildTimeline(resolved, VIDEO.fps)),
      };
    }}
  />
);
