import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ModalFail = ({ onClose, transferP }) => {
    const handleClick = (e) => {
        e.stopPropagation();
    };

    const handleFail = () => {
        onClose()
        transferP()
    }

    return (
        <SafeAreaView style={styles.ModalCommonoverlay}>
            <View onTouchStart={handleClick} style={styles.ModalCommonmodalContainer}>
                <View style={styles.ModalCommonForm}>
                    <TouchableOpacity style={styles.closeBtn}>
                        <MaterialCommunityIcons
                            name='alert' size={60} color="#fff"
                        />
                    </TouchableOpacity>
                    <View>
                        <View style={styles.MainCont}>
                            <View style={{ ...styles.MainContCard, justifyContent: 'center' }}>
                                <Text style={styles.modalformHeading}>Thất bại!</Text>
                                <Text style={{
                                    letterSpacing: 1,
                                    fontSize: 14,
                                    textAlign: 'center'
                                }}>Đã thanh toán thất bại</Text>
                            </View>
                            <TouchableOpacity style={styles.btnCommon1} onPress={() => handleFail()}>
                                <Text style={styles.btnTextCommon1}>Quay lại</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ModalCommonoverlay: {
        backgroundColor: 'rgba(49, 49, 49, 1)',
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
        position: 'relative',
        alignItems: 'center'
    },
    closeBtn: {
        backgroundColor: 'red',
        borderRadius: 100,
        justifyContent: 'center',
        zIndex: 1,
        height: 90,
        width: 90,
        alignItems: 'center',
    },
    modalformHeading: {
        textTransform: 'uppercase',
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: '700',
        lineHeight: 20,
        color: 'red',
        marginBottom: 20,
        textAlign: 'center'
    },
    MainCont: {
        marginTop: 10,
    },
    MainContCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 25,
        marginBottom: 20
    },
    MainContTextL: {
        flex: 1,
        color: '#6e6e6e'
    },
    MainContTextR: {
        flex: 1,
        fontWeight: '600',
    },
    btnCommon1: {
        height: 40,
        borderRadius: 5,
        backgroundColor: 'red',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.27,
        shadowRadius: 0,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTextCommon1: {
        color: '#fcfcfc',
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 1
    },
})

export default memo(ModalFail)
