import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CollectedRewardsButtonProps} from './types';
import {memo} from 'react';

function CollectedRewardsButton({
  navigateToCollectedRewardsScreen,
}: CollectedRewardsButtonProps) {
  return (
    <TouchableOpacity
      style={styles.navButton}
      onPress={navigateToCollectedRewardsScreen}>
      <Text style={styles.buttonText}>View Collected Rewards</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {color: '#fff', fontWeight: 'bold'},
  navButton: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default memo(CollectedRewardsButton);
