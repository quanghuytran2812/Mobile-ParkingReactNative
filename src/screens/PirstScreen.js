import { StyleSheet, Text, View, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Images } from '../contants'
import { Display } from '../utils'

const PirstScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Signin');
        }, 2000);
    }, []);
    return (
        <View style={styles.container} >
            <StatusBar barStyle="light-content" backgroundColor={Colors.DEFAULT_GREEN} translucent />
            <Image
                source={Images.PLATE1}
                resizeMode='contain'
                style={styles.Image}
            />
            <Text>DN Bus Station</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT_GREY,
    },
    Image: {
        height: Display.setHeight(20),
        width: Display.setWidth(20),
    },
    titleText: {
        fontSize: 20,
    }
});

export default PirstScreen

