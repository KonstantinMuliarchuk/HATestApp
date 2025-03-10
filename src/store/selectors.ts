import {createSelector} from 'reselect';
import {RootState} from './store';

export const selectRewards = (state: RootState) => state.rewards.rewards;
export const selectCollectedRewardIds = (state: RootState) =>
  state.rewards.collectedRewardsIds;
export const selectLoading = (state: RootState) => state.rewards.loading;
export const selectError = (state: RootState) => state.rewards.error;

// Memoized selectors using Reselect
export const selectProcessedRewards = createSelector(
  [selectRewards, selectCollectedRewardIds],
  (rewards, collectedRewards) =>
    rewards.map(reward => ({
      ...reward,
      isCollected: collectedRewards.includes(reward.id),
    })),
);

export const selectCollectedRewards = createSelector(
  [selectRewards, selectCollectedRewardIds],
  (rewards, selectedRewardsIds) =>
    rewards.filter(reward => selectedRewardsIds.includes(reward.id)),
);
