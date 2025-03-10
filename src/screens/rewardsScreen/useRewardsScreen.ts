import {useDispatch, useSelector} from 'react-redux';
import {
  AppDispatch,
  collectReward,
  fetchNextRewards,
  fetchRewards,
  selectError,
  selectLoading,
  selectProcessedRewards,
} from '../../store';
import {useCallback, useEffect} from 'react';

export const useRewardsScreen = (navigation: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const rewards = useSelector(selectProcessedRewards);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchRewards());
  }, [dispatch]);

  const handleCollect = useCallback(
    (rewardId: number) => {
      dispatch(collectReward(rewardId));
    },
    [dispatch],
  );

  const fetchNextPage = useCallback(() => {
    if (loading) {
      return;
    }
    dispatch(fetchNextRewards());
  }, [dispatch, loading]);

  const navigateToCollectedRewardsScreen = useCallback(() => {
    navigation.navigate('CollectedRewardsScreen');
  }, [navigation]);

  return {
    rewards,
    loading,
    error,
    handleCollect,
    fetchNextPage,
    navigateToCollectedRewardsScreen,
  };
};
