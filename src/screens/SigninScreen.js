import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, SafeAreaView } from "react-native";
import Separator from "../components/Separator";
import { Colors } from "../contants";
import { Display } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import InputField from "../components/input/InputField";
import { validate } from "../utils/helpers";
import InputFieldPass from "../components/input/InputFieldPass";

const SigninScreen = ({ navigation }) => {
    const [isPasswordShow, setPasswordShow] = useState(false)
    const [invalidFields, setInvalidFields] = useState([]);
    const dispatch = useDispatch();
    const { isAuthenticate, currentData } = useSelector(
        (state) => state.auth
    )
    const [payload, setPayload] = useState({
        phoneNumber: '',
        password: ''
    })
    const handleLogin = () => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            dispatch(login(payload));
        }
    };

    useEffect(() => {
        if (isAuthenticate || currentData) {
            if (currentData.role === "DRIVER") {
                navigation.navigate('Vehicle');
            }
        }
    }, [isAuthenticate, currentData]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>
                    ĐĂNG NHẬP
                </Text>
            </View>
            <Text style={styles.title}>Chào Bạn.</Text>
            <Text style={styles.content}>
                Vui lòng nhập số điện thoại và mật khẩu của bạn.
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
            <Separator height={15} />
            <InputFieldPass
                nameKey='password'
                classNameContainer={styles.inputContainer}
                className={styles.inputSubContainer}
                nameFeather="lock"
                placeholder="Mật khẩu"
                placeholderTextColor={Colors.DEFAULT_GREY}
                selectionColor={Colors.DEFAULT_GREY}
                classNameInput={styles.inputText}
                value={payload.password}
                onChangeText={(text) => setPayload(prev => ({ ...prev, password: text }))}
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                secureTextEntry={isPasswordShow ? false : true}
                nameFeatherPass={isPasswordShow ? "eye" : 'eye-off'}
                onPress={() => setPasswordShow(!isPasswordShow)}
            />
            <View style={styles.forgotPasswordContainer}>
                <View style={styles.toggleContainer}>
                </View>
                <Text
                    style={styles.forgotPasswordText}
                    onPress={() => navigation.navigate('ForgotPassword')} >
                    Quên mật khẩu
                </Text>
            </View>
            <TouchableOpacity
                style={styles.siginButton}
                onPress={handleLogin}
            >
                <Text
                    style={styles.signinButtonText}>
                    Đăng Nhập
                </Text>
            </TouchableOpacity>
            <View
                style={styles.signupContainer}>
                <Text
                    style={styles.accountText}>
                    Bạn không có tài khoản ?
                </Text>
                <Text
                    style={styles.signupText}
                    onPress={() => navigation.navigate('Signup')}>
                    Đăng Kí
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE
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
        paddingLeft: 70,
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
    forgotPasswordContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rememberMeText: {
        marginLeft: 10,
        fontSize: 12,
        lineHeight: 12 * 1.4,
        color: Colors.DEFAULT_BLACK,
    },
    forgotPasswordText: {
        marginRight: 10,
        fontSize: 12,
        lineHeight: 12 * 1.4,
        color: Colors.DEFAULT_BLACK,
    },
    siginButton: {
        backgroundColor: '#000',
        marginHorizontal: 20,
        borderRadius: 8,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 8 },
        shadowOpacity: 0.27,
        elevation: 4,
    },
    signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
    },
    signupContainer: {
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    accountText: {
        fontSize: 16,
        lineHeight: 16 * 1.4,
        color: Colors.DEFAULT_BLACK,
    },
    signupText: {
        fontSize: 16,
        lineHeight: 16 * 1.4,
        color: Colors.DEFAULT_GREEN,
        marginLeft: 5,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default SigninScreen;