import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Colors } from '../contants'
import { AnimatedIcon, ModalChangePass, ModalUpdateUser } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetUserById } from '../store/userSlice'
import moment from 'moment'
import { useState } from 'react'


export default function EditProfileScreen() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { current } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchGetUserById())
    }, [dispatch])

    const handleUpdateData = () => {
        dispatch(fetchGetUserById())
    }
    
    return (
        <>
            <View style={styles.container} >
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={Colors.DEFAULT_GREEN}
                    translucent
                />
                <View style={styles.containerTopHearder}>
                    <View style={styles.headerContainer}>
                        <Ionicons
                            name="arrow-back-outline" size={22}
                            color="#fff"
                            onPress={() => navigation.goBack()}
                        />
                        <Text style={styles.headerContainerText}>Hồ sơ</Text>
                    </View>
                    <AnimatedIcon />
                </View>
                <View style={styles.backgroundCurvedContainer} />
                <View style={styles.boxContanier}>
                    <View style={styles.mainContainer}>
                        <View style={styles.box}>
                            <Ionicons name="person-outline" color='grey' size={29} marginLeft={25} marginRight={25} marginTop={16} />
                            <View>
                                <View>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 5 }}>Name</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>{current?.fullName}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.box}>
                            <Ionicons name="calendar-outline" color='grey' size={29} marginLeft={25} marginRight={25} marginTop={16} />
                            <View>
                                <View>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 5 }}>Birthday</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>{moment(current?.birthday).format("DD/MM/YYYY")}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.box}>
                            <Ionicons name="mail-outline" color='grey' size={29} marginLeft={25} marginRight={25} marginTop={16} />
                            <View>
                                <View>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 5 }}>Email</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>{current?.email}</Text>
                                </View>
                            </View>
                        </View>

                        <View className=" flex-row m-3 w-100" style={styles.box}>
                            <Ionicons name="call-outline" color='grey' size={29} marginLeft={25} marginRight={25} marginTop={16} />
                            <View>
                                <View>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 5 }}>Phone</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text>{current?.phoneNumber}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={styles.containerBtn}
                    >
                        <TouchableOpacity
                            style={styles.btnCommon1}
                            onPress={() => setOpenModalUpdate(true)}
                        >
                            <Text style={styles.btnTextCommon1}>
                                Cập nhập
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btnCommon}
                            onPress={() => setOpenModal(true)}
                        >
                            <Text style={styles.btnTextCommon}>
                                Đổi mật khẩu
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal
                transparent={true}
                animationType='fade'
                visible={openModal}
            >
                <ModalChangePass
                    onClose={() => setOpenModal(false)}
                />
            </Modal>
            <Modal
                transparent={true}
                animationType='fade'
                visible={openModalUpdate}
            >
                <ModalUpdateUser
                    onClose={() => setOpenModalUpdate(false)}
                    handleUpdateData={handleUpdateData}
                />
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    containerTopHearder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 50,
        paddingRight: 20,
        paddingLeft: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerContainerText: {
        fontSize: 21,
        marginLeft: 10,
        fontWeight: '700',
        color: '#fff'
    },
    container: {
        backgroundColor: Colors.SECONDARY_WHITE,
        position: 'relative',
        height: '100%',
        paddingBottom: 20,
    },
    backgroundCurvedContainer: {
        backgroundColor: Colors.DEFAULT_GREEN,
        height: 2000,
        position: 'absolute',
        top: -1 * (2000 - 230),
        width: 2000,
        borderRadius: 2000,
        alignSelf: 'center',
        zIndex: -1,
    },
    boxContanier: {
        height: '80%',
        justifyContent: 'space-between'
    },
    box: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    mainContainer: {
        marginHorizontal: 20,
        backgroundColor: Colors.DEFAULT_WHITE,
        elevation: 3,
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingBottom: 20,
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    btnCommon: {
        flex: 1,
        borderRadius: 15,
        backgroundColor: '#fcfcfc',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.27,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTextCommon: {
        color: '#212121',
        fontWeight: 'bold',
        fontSize: 17,
    },
    btnCommon1: {
        flex: 1,
        height: 50,
        borderRadius: 15,
        marginRight: 10,
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.27,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTextCommon1: {
        color: '#fcfcfc',
        fontWeight: 'bold',
        fontSize: 17,
    }
});
