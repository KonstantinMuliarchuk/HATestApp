import {memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RewardsItemProps} from './types';
import {useRewardItem} from './useRewardItem';

function RewardsItem({
  id,
  isCollected,
  name,
  image,
  needed_points,
  handleCollect,
}: RewardsItemProps) {
  const {containerStyles, handleItemCollect, buttonStyles, buttonTextStyles} =
    useRewardItem(id, isCollected, handleCollect);

  return (
    <View style={containerStyles}>
      <View style={styles.rowView}>
        {image && <Image source={{uri: image}} style={styles.image} />}
        <View style={styles.textBox}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.points}>{needed_points} Points</Text>
        </View>
      </View>
      {Boolean(handleCollect) && (
        <TouchableOpacity
          disabled={isCollected}
          style={buttonStyles}
          onPress={handleItemCollect}>
          <Text style={buttonTextStyles}>
            {isCollected ? 'Collected' : 'Collect'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textBox: {
    flex: 1,
  },
  rowView: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
    resizeMode: 'contain',
  },
  name: {fontSize: 18, fontWeight: 'bold'},
  points: {fontSize: 14, color: 'gray'},
});

export default memo(RewardsItem);
