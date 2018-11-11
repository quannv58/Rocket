import {AsyncStorage} from 'react-native';

export const getItem = async (key) => {
  try {
    return await AsyncStorage.getItem(`@MySuperStore:${key}`);
  } catch (error) {
    console.log(`Error retrieving data ${error}`);
  }
  return null;
};

export const saveItem = async (key, data) => {
  try {
    await AsyncStorage.setItem(`@MySuperStore:${key}`, data);
  } catch (error) {
    console.log(`Error retrieving data ${error}`);
  }
};

export const resetItem = async (key) => {
  try {
    await AsyncStorage.removeItem(`@MySuperStore:${key}`);
  } catch (error) {
    console.log(`Error retrieving data ${error}`);
  }
};