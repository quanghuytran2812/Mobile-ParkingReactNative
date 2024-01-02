import React, { memo, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Pressable, Keyboard } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import InputFormPass from '../input/InputFormPass';


const ModalChangePass = ({ onClose }) => {
    const [invalidFields, setInvalidFields] = useState([]);
    const [isPasswordShow, setPasswordShow] = useState(false)
    const [isPasswordShow1, setPasswordShow1] = useState(false)
    const [isPasswordShow2, setPasswordShow2] = useState(false)

    const handleClick = (e) => {
        e.stopPropagation();
    };

    const [payload, setPayload] = useState({
        oldPass: '',
        password: '',
        confirmPassword: ''
    })

    const handleReset = () => {
        setPayload({
            oldPass: '',
            password: '',
            confirmPassword: ''
        })
    }

    const handleChangePass = () => {
        handleReset();
        onClose();
    }

    return (
        <SafeAreaView style={styles.ModalCommonoverlay}>
            <Pressable
                style={{ height: '100%' }}
                onPress={Keyboard.dismiss}
            >
                <View onTouchStart={handleClick} style={styles.ModalCommonmodalContainer}>
                    <View style={styles.ModalCommonForm}>
                        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                            <Ionicons
                                name="close-outline" size={22}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.modalformHeading}>Đổi mật khẩu</Text>
                            <InputFormPass
                                nameKey="oldPass"
                                classNameContainer={styles.inputFieldDiv}
                                className={styles.inputGroup}
                                classNameInput={styles.modalGroupinput}
                                secureTextEntry={isPasswordShow ? false : true}
                                placeholder="Mật khẩu cũ"
                                value={payload.oldPass}
                                onChangeText={(value) =>
                                    setPayload((prev) => ({ ...prev, oldPass: value }))
                                }
                                nameFeatherPass={isPasswordShow ? "eye" : 'eye-off'}
                                onPress={() => setPasswordShow(!isPasswordShow)}
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                            <InputFormPass
                                nameKey="password"
                                classNameContainer={styles.inputFieldDiv}
                                className={styles.inputGroup}
                                classNameInput={styles.modalGroupinput}
                                secureTextEntry={isPasswordShow1 ? false : true}
                                placeholder="Mật khẩu mới"
                                value={payload.password}
                                onChangeText={(value) =>
                                    setPayload((prev) => ({ ...prev, password: value }))
                                }
                                nameFeatherPass={isPasswordShow1 ? "eye" : 'eye-off'}
                                onPress={() => setPasswordShow1(!isPasswordShow1)}
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                            <InputFormPass
                                nameKey="confirmPassword"
                                classNameContainer={styles.inputFieldDiv}
                                className={styles.inputGroup}
                                classNameInput={styles.modalGroupinput}
                                secureTextEntry={isPasswordShow2 ? false : true}
                                placeholder="Xác nhận mật khẩu"
                                value={payload.confirmPassword}
                                onChangeText={(value) =>
                                    setPayload((prev) => ({ ...prev, confirmPassword: value }))
                                }
                                nameFeatherPass={isPasswordShow2 ? "eye" : 'eye-off'}
                                onPress={() => setPasswordShow2(!isPasswordShow2)}
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                            <TouchableOpacity style={styles.btnCommon1} onPress={handleChangePass}>
                                <Text style={styles.btnTextCommon1}>Lưu thay đổi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ModalCommonoverlay: {
        backgroundColor: 'rgba(49, 49, 49, 0.8)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    ModalCommonmodalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        margin: 0,
    },
    ModalCommonForm: {
        width: 320,
        paddingVertical: 50,
        paddingHorizontal: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        elevation: 4,
    },
    closeBtn: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
    },
    modalformHeading: {
        textTransform: 'uppercase',
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: '700',
        lineHeight: 20,
        color: '#333',
        marginBottom: 20,
    },
    btnCommon1: {
        height: 40,
        borderRadius: 5,
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.27,
        shadowRadius: -3,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTextCommon1: {
        color: '#fcfcfc',
        fontWeight: 'bold',
        fontSize: 17,
    },
    inputGroup: {
        flexDirection: 'row',
        marginBottom: 5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
    },
    modalGroupinput: {
        width: '90%',
        height: '100%',
        backgroundColor: 'transparent',
        padding: 10,
        fontSize: 15,
        fontWeight: '600',
        color: '#323232',
    },
    inputFieldDiv: {
        marginBottom: 20,
    },
})

export default memo(ModalChangePass)
