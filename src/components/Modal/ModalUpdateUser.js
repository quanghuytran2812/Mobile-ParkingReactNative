import React, { memo, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Modal } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUserById, updateUser } from '../../store/userSlice';
import DatePicker from "react-native-modern-datepicker"
import moment from 'moment';
import { validate } from '../../utils/helpers';
import InputForm from '../input/InputForm';

const ModalUpdateUser = ({ onClose, handleUpdateData }) => {
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);
    const handleOnPressStartDate = () => {
        setOpenDatePicker(!openDatePicker);
    };

    const dispatch = useDispatch();
    const { current } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchGetUserById())
    }, [dispatch])

    const handleClick = (e) => {
        e.stopPropagation();
    };

    const [payload, setPayload] = useState({
        fullName: current?.fullName,
        birthday: current?.birthday,
        email: current?.email
    })

    const [selectedStartDate, setSelectedStartDate] = useState(moment(payload.birthday).format("YYYY/MM/DD") || "");
    const [startedDate, setStartedDate] = useState(moment(payload.birthday).format("YYYY/MM/DD") || "");

    function handleChangeStartDate(propDate) {
        setStartedDate(propDate);
        setPayload((prev) => ({ ...prev, birthday: propDate }));
    }

    const handleUpdateUser = () => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            const formattedBirthday = moment(selectedStartDate, "YYYY/MM/DD").format("YYYY-MM-DD");

            if (!moment(formattedBirthday, "YYYY-MM-DD", true).isValid()) {
                toast.error("Định dạng ngày sinh nhật không hợp lệ");
                return;
            }

            const updatedUser = {
                userId: current.userId,
                fullName: payload.fullName,
                birthday: formattedBirthday,
                email: payload.email,
            };

            dispatch(updateUser(updatedUser))
                .then((result) => {
                    onClose();
                    handleUpdateData();
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    return (
        <SafeAreaView style={styles.ModalCommonoverlay}>
            <View onTouchStart={handleClick} style={styles.ModalCommonmodalContainer}>
                <View style={styles.ModalCommonForm}>
                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Ionicons
                            name="close-outline" size={22}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.modalformHeading}>Cập nhập người dùng</Text>
                        <View style={styles.inputFieldDiv}>
                            <InputForm
                                className={styles.inputGroup}
                                nameKey="fullName"
                                classNameInput={styles.modalGroupinput}
                                value={payload.fullName}
                                onChangeText={(value) =>
                                    setPayload((prev) => ({ ...prev, fullName: value }))
                                }
                                placeholder="Tên"
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                        </View>

                        <View style={styles.inputFieldDiv}>
                            <View style={styles.inputGroup}>
                                <TouchableOpacity
                                    style={styles.modalGroupinput}
                                    onPress={handleOnPressStartDate}
                                >
                                    <Text style={styles.textDate}>{selectedStartDate}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputFieldDiv}>
                            <InputForm
                                className={styles.inputGroup}
                                nameKey="email"
                                classNameInput={styles.modalGroupinput}
                                value={payload.email}
                                onChangeText={(value) =>
                                    setPayload((prev) => ({ ...prev, email: value }))
                                }
                                placeholder="E-mail"
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                        </View>
                        <TouchableOpacity style={styles.btnCommon1} onPress={handleUpdateUser}>
                            <Text style={styles.btnTextCommon1}>Lưu thay đổi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={openDatePicker}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <DatePicker
                            mode="calendar"
                            selected={startedDate}
                            onDateChanged={handleChangeStartDate}
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
        marginBottom: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
    },
    modalGroupinput: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 10,
        fontSize: 15,
        fontWeight: '600',
        color: '#323232',
    },
    textDate: {
        fontSize: 15,
        fontWeight: '600',
        color: '#323232',
    },
    inputFieldDiv: {
        marginBottom: 20,
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
})

export default memo(ModalUpdateUser)
