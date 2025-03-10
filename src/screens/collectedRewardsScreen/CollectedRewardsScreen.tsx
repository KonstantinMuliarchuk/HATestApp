import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {useCollectedRewardsScreen} from './useCollectedRewardsScreen';
import {Reward} from '../../types';
import {RewardsItem} from '../components';

const renderItem = ({item}: {item: Reward}) => (
  <RewardsItem
    id={item.id}
    name={item.name}
    needed_points={item.needed_points}
    isCollected={true}
    image={item.image}
  />
);

const keyExtractor = (item: Reward) => item.id.toString();

function CollectedRewardsScreen() {
  const collectedRewards = useCollectedRewardsScreen();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={collectedRewards}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
});

export default CollectedRewardsScreen;
