import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal, Platform } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Images } from '../contants';
import { verticalScale } from 'react-native-size-matters';
import { AnimatedIcon, ModalAddVehicle } from '../components';
import ModalUpdateVehicle from '../components/Modal/ModalUpdateVehicle';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native';
import { vehicleData } from '../utils/database';

const VehicleScreen = ({ navigation }) => {
    const [selectedRadio, setSelectedRadio] = useState({ vehicleId: '' })
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [dataEdit, setDataEdit] = useState({});

    const handleGetData = (data) => {
        setSelectedRadio({
            vehicleId: data.vehicleId
        })
        setDataEdit(data)
    }

    const handleUpdateData = () => {
        fetchData();
    };

    const handleOnBook = useCallback(async () => {
        navigation.navigate('DateTime');
    }, [selectedRadio]);

    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.containerTopHearder}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerContainerText}>Chọn xe</Text>
                    </View>
                    <AnimatedIcon />
                </View>
                <FlatList
                    data={vehicleData}
                    style={styles.containerListCar}
                    keyExtractor={item => item.vehicleId}
                    renderItem={({ item }) => (
                        <View style={styles.containerCar}>
                            <TouchableOpacity
                                style={styles.vehicleCard}
                                onPress={() => handleGetData(item)}>
                                <View style={styles.vehicleAvatarContainer}>
                                    <Image source={Images.CARAVATAR}
                                        style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
                                </View>
                                <View style={styles.vehicleContent}>
                                    <View style={styles.vehicleRadioButton}>
                                        {selectedRadio.vehicleId === item.vehicleId ? <View style={styles.radioBg}></View> : null}
                                    </View>
                                    <Text style={styles.vehicleName}>{item.vehicleCategory.vehicleCategoryName}</Text>
                                    <Text style={styles.vehicleLicensePlate}>{item.plateNumber}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <View
                    style={styles.containerBtn}
                >
                    <TouchableOpacity
                        style={styles.btnCommon1}
                        onPress={() => setOpenModal(true)}
                    >
                        <Text style={styles.btnTextCommon1}>
                            Thêm xe
                        </Text>
                    </TouchableOpacity>

                    {Object.keys(dataEdit).length === 0 ? null : (
                        <TouchableOpacity
                            style={styles.btnCommon1}
                            onPress={() => setOpenUpdateModal(true)}
                        >
                            <Text style={styles.btnTextCommon1}>Cập nhật</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.btnCommon}
                        // onPress={() => navigation.navigate('DateTime')}
                        onPress={() => handleOnBook()}
                    >
                        <Text style={styles.btnTextCommon}>
                            Tiếp tục
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <Modal
                transparent={true}
                animationType='fade'
                visible={openModal}
            >
                <ModalAddVehicle
                    onClose={() => setOpenModal(false)}
                    handleUpdateData={handleUpdateData}
                />
            </Modal>
            <Modal
                transparent={true}
                animationType='fade'
                visible={openUpdateModal}
            >
                <ModalUpdateVehicle
                    open={openUpdateModal}
                    onClose={() => setOpenUpdateModal(false)}
                    dataUpdate={dataEdit}
                    handleUpdateData={handleUpdateData}
                />
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingTop: 60,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
    },
    containerTopHearder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerContainerText: {
        fontSize: 21,
        marginLeft: 10,
        fontWeight: '700'
    },
    containerListCar: {
        flexGrow: 1,
        width: '100%',
        marginTop: verticalScale(15)
    },
    containerCar: {
        paddingTop: 2,
        paddingLeft: 2,
        paddingRight: 2
    },
    vehicleCard: {
        width: '100%',
        height: 85,
        borderRadius: 15,
        padding: 15,
        backgroundColor: '#ffffff',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.4)',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 2,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    vehicleAvatarContainer: {
        width: 70,
        height: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    vehicleContent: {
        height: '100%',
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    radioBg: {
        backgroundColor: 'black',
        width: 12,
        height: 12,
        borderRadius: 20,
    },
    vehicleRadioButton: {
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 2
    },
    vehicleName: {
        fontSize: 16,
        color: 'black',
        fontWeight: '600',
    },
    vehicleLicensePlate: {
        fontSize: 14,
        color: '#7d7d7d'
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
})


export default VehicleScreen

