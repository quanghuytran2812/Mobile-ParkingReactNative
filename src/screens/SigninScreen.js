import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image } from "react-native";
import Separator from "../components/Separator";
import { ToggleButton } from "../components";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "../contants";
import { Display } from "../utils";

const SigninScreen = ({ navigation }) => {
    const [isPasswordShow, setPasswordShow] = useState(false)
    return (
        <View style={styles.container}>
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
                Vui lòng nhập tên người dùng và mật khẩu của bạn.
            </Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name="user"
                        size={22}
                        color={Colors.DEFAULT_GREY}
                        style={{ marginRight: 10 }}
                    />
                    <TextInput placeholder="Tên đăng nhập"
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                    />
                </View>
            </View>
            <Separator height={15} />
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather
                        name="lock"
                        size={22}
                        color={Colors.DEFAULT_GREY}
                        style={{ marginRight: 10 }}
                    />
                    <TextInput
                        secureTextEntry={isPasswordShow ? false : true}
                        placeholder="Mật khẩu"
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                    />
                    <Feather
                        name={isPasswordShow ? "eye" : 'eye-off'}
                        size={22}
                        color={Colors.DEFAULT_GREY}
                        style={{ marginRight: 10 }}
                        onPress={() => setPasswordShow(!isPasswordShow)}
                    />
                </View>
            </View>
            <Text></Text>
            <View style={styles.forgotPasswordContainer}>
                <View style={styles.toggleContainer}>
                    <ToggleButton size={0.6} />
                    <Text
                        style={styles.rememberMeText} >
                        Nhớ Tài Khoản
                    </Text>
                </View>
                <Text
                    style={styles.forgotPasswordText}
                    onPress={() => navigation.navigate('ForgotPassword')} >
                    Quên mật khẩu
                </Text>
            </View>
            <TouchableOpacity
                style={styles.siginButton}
                onPress={() => navigation.navigate('GoogleMap')}>
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
        </View>
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
        backgroundColor: Colors.DEFAULT_GREEN,
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