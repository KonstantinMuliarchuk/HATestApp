import {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {ITEM_HEIGHT, ITEMS_SEPARATOR_HEIGHT} from '../constants';

export const useRewardItem = (
  id: number,
  isCollected: boolean,
  handleCollect?: (id: number) => void,
) => {
  const handleItemCollect = useCallback(() => {
    handleCollect?.(id);
  }, [id, handleCollect]);

  const containerStyles = [
    styles.container,
    isCollected && handleCollect && styles.collected,
    !handleCollect && styles.smallItem,
  ];

  const buttonStyles = [styles.button, isCollected && styles.buttonCollected];
  const buttonTextStyles = [
    styles.buttonText,
    isCollected && styles.buttonTextCollected,
  ];

  return {
    containerStyles,
    handleItemCollect,
    buttonStyles,
    buttonTextStyles,
  };
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    padding: 16,
    marginBottom: ITEMS_SEPARATOR_HEIGHT,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  smallItem: {
    height: undefined,
  },
  collected: {opacity: 0.5},
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonCollected: {
    backgroundColor: undefined,
  },
  buttonTextCollected: {
    color: 'green',
  },
  buttonText: {color: '#fff', fontWeight: 'bold'},
});
