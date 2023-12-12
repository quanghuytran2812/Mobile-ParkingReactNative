import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, Pressable, Keyboard } from "react-native";
import { Colors } from "../contants";
import { InputField, Separator } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons"
import { Display } from "../utils";
import { validate } from "../utils/helpers";
import { useDispatch } from "react-redux";
import { apiSendOtpByPh } from "../store/otpSlice";


const ForgotPasswordScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [invalidFields, setInvalidFields] = useState([]);
    const [payload, setPayload] = useState({
        phoneNumber: ''
    })


    const sendOTPSMS = async () => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            const destPhoneNumber = payload.phoneNumber
            dispatch(apiSendOtpByPh(destPhoneNumber))
                .then((result) => {
                    if (result.payload?.status === "DELIVERED") {
                        navigation.navigate('Verification');
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

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
                <Text style={styles.headerTitle}>Quên mật khẩu</Text>
            </View>
            <Text style={styles.title}>Chào Bạn.</Text>
            <Text style={styles.content}>
                Nhập số điện thoại của bạn để chúng tôi có thể giúp bạn khôi phục mật khẩu.
            </Text>
            <InputField
                nameKey='phoneNumber'
                classNameContainer={styles.inputContainer}
                className={styles.inputSubContainer}
                nameFeather="phone"
                placeholder="Số điện thoại"
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                classNameInput={styles.inputText}
                keyboardType="number-pad"
                value={payload.phoneNumber}
                onChangeText={(text) => setPayload(prev => ({ ...prev, phoneNumber: text }))}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
            />
            <TouchableOpacity style={styles.siginButton}
                onPress={sendOTPSMS}>
                <Text style={styles.signinButtonText}>Gửi mã qua SMS</Text>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 60
    },
    headerTitle: {
        fontSize: 21,
        marginLeft: 10,
        fontWeight: '700'
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
    inputContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        justifyContent: 'center',
    },
    inputSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputText: {
        fontSize: 18,
        textAlignVertical: 'center',
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_GREY,
        flex: 1,
    },
    siginButton: {
        backgroundColor: "#000",
        marginHorizontal: 20,
        borderRadius: 8,
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

export default ForgotPasswordScreen;