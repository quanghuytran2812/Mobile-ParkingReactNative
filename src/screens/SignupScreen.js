import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, SafeAreaView, Pressable, Keyboard, Modal, ScrollView } from "react-native";
import { Colors } from "../contants";
import Ionicons from "react-native-vector-icons/Ionicons"
import Separator from "../components/Separator";
import { Display } from "../utils";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker"
import InputField from "../components/input/InputField";
import InputFieldPass from "../components/input/InputFieldPass";
import { validate } from "../utils/helpers";

const SignupScreen = ({ navigation }) => {
    const [isPasswordShow, setPasswordShow] = useState(false)
    const [isPasswordShow1, setPasswordShow1] = useState(false)
    const [invalidFields, setInvalidFields] = useState([]);

    const [openDatePicker, setOpenDatePicker] = useState(false);

    const [payload, setPayload] = useState({
        phoneNumber: '',
        password: '',
        email: '',
        fullName: '',
        confirmPassword: '',
        birthday: ''
    })

    const resetFormRegister = () => {
        setPayload({
            phoneNumber: '',
            password: '',
            email: '',
            fullName: '',
            confirmPassword: '',
            birthday: ''
        })
    }

    const today = new Date()
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')
    const [selectedStartDate, setSelectedStartDate] = useState("");

    const handleOnPressStartDate = () => {
        setOpenDatePicker(!openDatePicker);
        setPayload(prev => ({ ...prev, birthday: selectedStartDate }))
    };

    const handleRegister = () => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            const registerU = {
                fullName: payload.fullName,
                birthday: payload.birthday,
                phoneNumber: payload.phoneNumber,
                email: payload.email,
                password: payload.confirmPassword
            }
            // dispatch(registerUser(registerU))
            //     .then((result) => {
            //         if (result.payload?.statusCode === 200) {
            //             resetFormRegister()
            //             navigation.navigate('VerificationRegister');
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
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
                        name="arrow-back-outline" size={22}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.headerTitle}>Đăng Ký</Text>
                </View>
                <ScrollView>
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
                    <InputField
                        nameKey='fullName'
                        classNameContainer={styles.inputContainer}
                        className={styles.inputSubContainer}
                        nameFeather="user"
                        placeholder="Tên người dùng"
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        classNameInput={styles.inputText}
                        value={payload.fullName}
                        onChangeText={(text) => setPayload(prev => ({ ...prev, fullName: text }))}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <Separator height={15} />
                    <InputField
                        nameKey='email'
                        classNameContainer={styles.inputContainer}
                        className={styles.inputSubContainer}
                        nameFeather="mail"
                        placeholder="E-mail"
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        classNameInput={styles.inputText}
                        value={payload.email}
                        onChangeText={(text) => setPayload(prev => ({ ...prev, email: text }))}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <Separator height={15} />
                    <TouchableOpacity
                        style={styles.modalGroupinput}
                        onPress={handleOnPressStartDate}
                    >
                        <InputField
                            nameKey='birthday'
                            classNameContainer={styles.inputContainer}
                            className={styles.inputSubContainer}
                            nameFeather="user"
                            placeholder="Ngày sinh"
                            placeholderTextColor={Colors.DEFAULT_GREY}
                            selectionColor={Colors.DEFAULT_GREY}
                            classNameInput={styles.inputText}
                            value={payload.birthday}
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                            editable={false}
                        />
                    </TouchableOpacity>

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
                    <Separator height={15} />
                    <InputFieldPass
                        nameKey='confirmPassword'
                        classNameContainer={styles.inputContainer}
                        className={styles.inputSubContainer}
                        nameFeather="lock"
                        placeholder="Xác nhận mật khẩu"
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
                        onPress={handleRegister}>
                        <Text
                            style={styles.signinButtonText}>
                            Đăng Kí
                        </Text>
                    </TouchableOpacity>
                    <Separator height={15} />
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={openDatePicker}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <DatePicker
                                mode="calendar"
                                selected={startDate}
                                onSelectedChange={(date) => setSelectedStartDate(date)}
                                options={{
                                    backgroundColor: "#080516",
                                    textHeaderColor: "#469ab6",
                                    textDefaultColor: "#FFFFFF",
                                    selectedTextColor: "#FFF",
                                    mainColor: "#469ab6",
                                    textSecondaryColor: "#FFFFFF",
                                    borderColor: "rgba(122, 146, 165, 0.1)",
                                }}
                            />

                            <TouchableOpacity onPress={handleOnPressStartDate}>
                                <Text style={{ color: "white" }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
        fontWeight: '600',
        letterSpacing: 2,
    },
    confirmpassword: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalView: {
        margin: 20,
        backgroundColor: '#080516',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 35,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

export default SignupScreen;