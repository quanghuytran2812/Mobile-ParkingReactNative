import React, { useEffect, useRef } from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { Animated, Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnimatedIcon = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  function makePhoneCall() {
    const url = 'tel://0906037470';
    Linking.openURL(url);
  }

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(spinValue, {
            toValue: 30,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(spinValue, {
            toValue: -30,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 }
      ).start();
    };

    animate();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [-30, 30],
    outputRange: ['-30deg', '30deg'],
  });

  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#02aab0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 30,
      }}
      onPress={() => makePhoneCall()}
    >
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
        }}
      >
        <Ionicons name="call-outline" color="#fff" size={25} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedIcon;