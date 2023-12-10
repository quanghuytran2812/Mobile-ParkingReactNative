import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Pressable, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { cancelBooking } from '../../store/bookingSlice';
import Toast from 'react-native-toast-message';



const ModalCancelBooking = ({ onClose, dataB, updateData }) => {
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.stopPropagation();
    };

    const handleCancelB = () => {
        dispatch(cancelBooking(dataB))
            .then((result) => {
                if (result.payload.statusCode === 200) {
                    onClose();
                    updateData()
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'ParkingHT',
                        text2: `${result.payload.message}`
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <SafeAreaView style={styles.ModalCommonoverlay}>
            <Pressable
                style={{ height: '100%' }}
                onPress={Keyboard.dismiss}
            >
                <View onTouchStart={handleClick} style={styles.ModalCommonmodalContainer}>
                    <View style={styles.ModalCommonForm}>
                        <Text style={styles.modalformHeading}>Hủy đậu xe</Text>
                        <Text style={styles.modalformTitle}>Bạn có chắc chắn muốn hủy đặt chỗ đậu xe của mình không?</Text>
                        <View style={styles.containerButton}>
                            <TouchableOpacity style={styles.btnCommon1} onPress={onClose}>
                                <Text style={styles.btnTextCommon1}>Hủy bỏ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnCommon2} onPress={handleCancelB}>
                                <Text style={styles.btnTextCommon2}>Vâng</Text>
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
    modalformHeading: {
        textTransform: 'uppercase',
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: '700',
        lineHeight: 20,
        color: 'red',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderStyle: 'solid',
        marginBottom: 10,
        textAlign: 'center'
    },
    modalformTitle: {
        fontWeight: '600',
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnCommon1: {
        flex: 1,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.27,
        shadowRadius: -3,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTextCommon1: {
        color: '#02aab0',
        fontWeight: '600',
        fontSize: 17,
    },
    btnCommon2: {
        flex: 1,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#02aab0',
        shadowColor: '#02aab0',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.27,
        shadowRadius: -3,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    btnTextCommon2: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 17,
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default memo(ModalCancelBooking)
