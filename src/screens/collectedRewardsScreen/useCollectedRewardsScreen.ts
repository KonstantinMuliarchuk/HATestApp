import {useSelector} from 'react-redux';
import {selectCollectedRewards} from '../../store';

export const useCollectedRewardsScreen = () => {
  const collectedRewards = useSelector(selectCollectedRewards);

  return collectedRewards;
};
