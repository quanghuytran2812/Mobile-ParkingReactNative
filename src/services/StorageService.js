import AsyncStorage from '@react-native-async-storage/async-storage';


const setToken = token => {
    return AsyncStorage.setItem('token', token);
};

const getToken = () => {
    return AsyncStorage.getItem('token');
  };

export default { setToken, getToken };