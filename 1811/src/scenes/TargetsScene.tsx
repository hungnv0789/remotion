import type { FC } from 'react';
import type { SceneProps } from '../timing';
import { SceneCard } from '../components/SceneCard';

export const TargetsScene: FC<SceneProps> = (props) => <SceneCard {...props} index={5} />;
