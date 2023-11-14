import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomBtn = ({
    onPress = () => { },
    btnStyle = {},
    btnText
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.btnStyle, ...btnStyle }}
        >
            <Text>{btnText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        height: 48,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderWidth: 1
    }
});

export default CustomBtn

