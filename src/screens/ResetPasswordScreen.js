import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Pressable, Keyboard } from "react-native";
import { Colors } from "../contants";
import Ionicons from "react-native-vector-icons/Ionicons"
import Separator from "../components/Separator";
import { Display } from "../utils";
import { InputFieldPass } from "../components";
import { validate } from "../utils/helpers";
import { SafeAreaView } from "react-native";

const ResetPasswordScreen = ({ navigation }) => {
    const [isPasswordShow, setPasswordShow] = useState(false)
    const [isPasswordShow1, setPasswordShow1] = useState(false)
    const [invalidFields, setInvalidFields] = useState([]);

    const [payload, setPayload] = useState({
        password: '',
        confirmPassword: ''
    })

    function resetPass() {
        const invalids = validate(payload, setInvalidFields);
        if (invalids === 0) {
            navigation.navigate('Signin');
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
                    <Text style={styles.headerTitle}>Đặt lại mật khẩu</Text>
                </View>
                <Text style={styles.title}>Tạo mật khẩu mới.</Text>
                <Text style={styles.content}>
                    Vui lòng nhập mật khẩu của bạn.
                </Text>
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
                <Separator height={15} />
                <InputFieldPass
                    nameKey='confirmPassword'
                    classNameContainer={styles.inputContainer}
                    className={styles.inputSubContainer}
                    nameFeather="lock"
                    placeholder="Mật khẩu"
                    placeholderTextColor={Colors.DEFAULT_GREY}
                    selectionColor={Colors.DEFAULT_GREY}
                    classNameInput={styles.inputText}
                    value={payload.confirmPassword}
                    onChangeText={(text) => setPayload(prev => ({ ...prev, confirmPassword: text }))}
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                    secureTextEntry={isPasswordShow1 ? false : true}
                    nameFeatherPass={isPasswordShow1 ? "eye" : 'eye-off'}
                    onPress={() => setPasswordShow1(!isPasswordShow1)}
                />
                <TouchableOpacity style={styles.siginButton}
                    onPress={resetPass}>
                    <Text
                        style={styles.signinButtonText}>
                        Xác nhận mật khẩu
                    </Text>
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
    confirmpassword: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default ResetPasswordScreen;