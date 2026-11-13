import type { FC } from 'react';
import { Composition, staticFile } from 'remotion';
import { getAudioDurationInSeconds } from '@remotion/media-utils';
import { MainVideo } from './MainVideo';
import { defaultProps, VIDEO } from './config';
import { buildTimeline, totalFrames } from './timing';

export const RemotionRoot: FC = () => (
  <Composition
    id="NvidiaLeadership1311"
    component={MainVideo}
    fps={VIDEO.fps}
    width={VIDEO.width}
    height={VIDEO.height}
    durationInFrames={totalFrames(defaultProps, VIDEO.fps)}
    defaultProps={defaultProps}
    calculateMetadata={async ({ props }) => {
      const src = /^https?:\/\//i.test(props.audio.voiceover)
        ? props.audio.voiceover
        : staticFile(props.audio.voiceover);
      const duration = await getAudioDurationInSeconds(src);
      const resolvedProps = {
        ...props,
        timing: { ...props.timing, audioDurationSeconds: duration },
      };
      buildTimeline(resolvedProps, VIDEO.fps);
      return { props: resolvedProps, durationInFrames: totalFrames(resolvedProps, VIDEO.fps) };
    }}
  />
);
