import { StyleSheet, Text, StatusBar, Image, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { Colors, Images } from '../contants'
import { Display } from '../utils'

const PirstScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 2000);
    }, []);
    return (
        <SafeAreaView style={styles.container} >
            <StatusBar barStyle="light-content" backgroundColor={Colors.DEFAULT_GREEN} translucent />
            <Image
                source={Images.PLATE1}
                resizeMode='contain'
                style={styles.Image}
            />
            <Text>DN Bus Station</Text>
        </SafeAreaView>
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

