import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Pressable, Keyboard } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import { Colors } from "../contants";
import { Display } from "../utils";
import { Separator } from "../components";
import { apivalidateOtpResetP } from "../store/otpSlice";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";

const VerificationScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const fivethInput = useRef();
    const sixthInput = useRef();
    const { phoneN } = useSelector((state) => state.otp);
    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' });

    const onOTPVerify = () => {
        const concatenatedOtp = Object.values(otp).join('');

        // Check if the OTP is not null or empty
        if (concatenatedOtp.trim() !== '') {
            dispatch(apivalidateOtpResetP({otp: concatenatedOtp, phone: phoneN}))
                .then((result) => {
                    if (result.payload?.statusCode === 200) {
                        navigation.navigate('ResetPassword');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            Toast.show({
                type: 'error',
                text1: 'ParkingHT',
                text2: `OTP is empty`
            });
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />
            <Pressable
                style={{ height: '100%' }}
                onPress={Keyboard.dismiss}
            >
                <Separator height={StatusBar.currentHeight} />
                <View style={styles.headerContainer}>
                    <Ionicons
                        name="arrow-back-outline" size={30}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.headerTitle}>Xác minh OTP</Text>
                </View>
                <Text style={styles.title}>Xác minh OTP</Text>
                <View style={styles.otpContainer}>
                    <View style={styles.otpBox}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={firstInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 1: text });
                                text && secondInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.otpBox}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={secondInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 2: text });
                                text ? thirdInput.current.focus() : firstInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.otpBox}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={thirdInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 3: text });
                                text ? fourthInput.current.focus() : secondInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.otpBox}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={fourthInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 4: text });
                                !text && fivethInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.otpBox}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={fivethInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 5: text });
                                !text && sixthInput.current.focus();
                            }}
                        />
                    </View>
                    <View style={styles.otpBox}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={sixthInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 6: text });
                                !text && firstInput.current.focus();
                            }}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.signinButton}
                    onPress={onOTPVerify}>
                    <Text style={styles.signinButtonText}>Xác minh</Text>
                </TouchableOpacity>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 3,
    },
    headerTitle: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    content: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20,
    },
    phoneNumberText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_YELLOW,
    },
    otpContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    otpBox: {
        borderRadius: 5,
        borderColor: Colors.DEFAULT_GREEN,
        borderWidth: 0.5,
    },
    otpText: {
        fontSize: 25,
        color: Colors.DEFAULT_BLACK,
        padding: 0,
        textAlign: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    signinButton: {
        backgroundColor: "#000",
        borderRadius: 8,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
    },
});

export default VerificationScreen;