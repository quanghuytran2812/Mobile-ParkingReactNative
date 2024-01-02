import React, { memo, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Pressable, Keyboard } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from 'react-native-select-dropdown';
import InputForm from '../input/InputForm';
import { dataCategory } from '../../utils/database';


const ModalAddVehicle = ({ onClose, handleUpdateData }) => {
    const [invalidFields, setInvalidFields] = useState([]);
    const handleClick = (e) => {
        e.stopPropagation();
    };

    const [payload, setPayload] = useState({
        plateNumber: '',
        categoryId: ''
    })

    const handleReset = () => {
        setPayload({
            plateNumber: '',
            categoryId: ''
        })
    }

    const handleAddVehicle = () => {
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
                            <Text style={styles.modalformHeading}>Thêm xe</Text>                        
                            <View style={styles.inputFieldDiv}>
                                <InputForm
                                    className={styles.inputGroup}
                                    nameKey="plateNumber"
                                    classNameInput={styles.modalGroupinput}
                                    value={payload.plateNumber}
                                    onChangeText={(value) =>
                                        setPayload((prev) => ({ ...prev, plateNumber: value }))
                                    }
                                    placeholder="Biển số xe"
                                    invalidFields={invalidFields}
                                    setInvalidFields={setInvalidFields}
                                />
                            </View>
                            <SelectDropdown
                                data={dataCategory}
                                onSelect={(selectedItem, index) => {
                                    setPayload((prev) => ({ ...prev, categoryId: selectedItem.vehicleCategoryId }));
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem.vehicleCategoryName
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item.vehicleCategoryName
                                }}
                                defaultButtonText={'Chọn loại xe'}
                                renderDropdownIcon={isOpened => {
                                    return <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} size={18} />;
                                }}
                                dropdownIconPosition={'right'}
                                buttonStyle={styles.dropdownStyle}
                                buttonTextStyle={styles.dropdownStyleText}
                            />
                            <TouchableOpacity style={styles.btnCommon1} onPress={handleAddVehicle}>
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
        marginBottom: 5,
        height: 40,
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
    dropdownStyle: {
        width: '100%',
        height: 40,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: 'transparent',
        marginBottom: 20
    },
    dropdownStyleText: {
        textAlign: 'left',
        fontSize: 15,
        fontWeight: '600',
        color: '#323232'
    },
    inputFieldDiv: {
        marginBottom: 20,
    },
})

export default memo(ModalAddVehicle)
