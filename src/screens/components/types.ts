import {Reward} from '../../types';

export type RewardsItemProps = Reward & {
  isCollected: boolean;
  handleCollect?: (id: number) => void;
};
