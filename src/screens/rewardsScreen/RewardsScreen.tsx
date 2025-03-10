import React, {useCallback} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {CollectedRewardsButton} from './components';
import {useRewardsScreen} from './useRewardsScreen';
import {RenderItemProps} from './types';
import {ITEM_HEIGHT, ITEMS_SEPARATOR_HEIGHT} from '../constants';
import {RewardsItem} from '../components';

const keyExtractor = (item: RenderItemProps) => item.id.toString();

const getItemLayout = (_: unknown, index: number) => {
  const itemHeight = ITEM_HEIGHT + ITEMS_SEPARATOR_HEIGHT;
  return {
    length: itemHeight,
    offset: itemHeight * index,
    index,
  };
};

const RewardsScreen = ({navigation}: {navigation: any}) => {
  const {
    handleCollect,
    loading,
    navigateToCollectedRewardsScreen,
    error,
    rewards,
    fetchNextPage,
  } = useRewardsScreen(navigation);

  const renderItem = useCallback(
    ({item}: {item: RenderItemProps}) => {
      return (
        <RewardsItem
          id={item.id}
          name={item.name}
          needed_points={item.needed_points}
          image={item.image}
          isCollected={item.isCollected}
          handleCollect={handleCollect}
        />
      );
    },
    [handleCollect],
  );

  const renderFooter = useCallback(() => {
    if (!loading) {
      return null;
    }
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
    );
  }, [loading]);

  return (
    <SafeAreaView style={styles.container}>
      <CollectedRewardsButton
        navigateToCollectedRewardsScreen={navigateToCollectedRewardsScreen}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={rewards}
        getItemLayout={getItemLayout}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  error: {color: 'red', textAlign: 'center', marginBottom: 10},
  spinner: {paddingVertical: 10, alignItems: 'center'},
});

export default RewardsScreen;
