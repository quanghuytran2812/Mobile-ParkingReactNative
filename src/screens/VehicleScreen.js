import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Colors, Images } from '../contants';
import { Display } from '../utils';
import { Platform } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

const VehicleScreen = ({ navigation }) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Chọn Xe</Text>
                </View>
                <ScrollView style={styles.containerCar}>
                    <TouchableOpacity style={styles.vehicleCard} >
                        <View style={styles.vehicleAvatarContainer} >
                            <Image
                                source={Images.CARAVATAR}
                            />
                        </View>
                        <View style={styles.vehicleContent}>
                            <TouchableOpacity style={styles.vehicleRemoveButton}>
                                <Ionicons name="trash-outline" size={20} color="red" />
                            </TouchableOpacity>
                            <Text style={styles.vehicleName}>Toyota</Text>
                            <Text style={styles.vehicleLicensePlate}>43C-123.45</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.vehicleCard} >
                        <View style={styles.vehicleAvatarContainer} >
                            <Image
                                source={Images.CARAVATAR}
                            />
                        </View>

                        <View style={styles.vehicleContent}>
                            <TouchableOpacity style={styles.vehicleRemoveButton}>
                                <Ionicons name="trash-outline" size={20} color="red" />
                            </TouchableOpacity>
                            <Text style={styles.vehicleName}>Toyota</Text>
                            <Text style={styles.vehicleLicensePlate}>43C-123.45</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.vehicleCard} >
                        <View style={styles.vehicleAvatarContainer} >
                            <Image
                                source={Images.CARAVATAR}
                            />
                        </View>

                        <View style={styles.vehicleContent}>
                            <TouchableOpacity style={styles.vehicleRemoveButton}>
                                <Ionicons name="trash-outline" size={20} color="red" />
                            </TouchableOpacity>
                            <Text style={styles.vehicleName}>Toyota</Text>
                            <Text style={styles.vehicleLicensePlate}>43C-123.45</Text>
                        </View>
                    </TouchableOpacity>

                </ScrollView>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            height: 50,
                            marginRight: 10,
                            backgroundColor: Colors.DEFAULT_GREEN,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10
                        }}
                    >
                        <Text
                        >Thêm xe
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('DateTime')}
                        style={{
                            flex: 1,
                            height: 50,
                            backgroundColor: Colors.DEFAULT_GREEN,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10
                        }}
                    >
                        <Text style={{ color: Colors.DEFAULT_WHITE }}>
                            Tiếp tục
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 3,
        marginTop: 5,
    },
    headerTitle: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: 'center',
        fontWeight: 600,
        paddingLeft: 5
    },
    containerCar: {
        flex: 1,
        width: '100%',
        height: 'auto',
        padding: 10,
        marginTop: verticalScale(15),
    },
    vehicleCard: {
        width: '100%',
        height: 90,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.75)',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 3,
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
    vehicleRemoveButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
    },
    vehicleName: {
        fontSize: 16,
        color: 'black'
    },
    vehicleLicensePlate: {
        fontSize: 15,
        color: '#7d7d7d'
    },
    siginButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        marginHorizontal: 20,
        borderRadius: 8,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 750,
        width: '100%',
        position: 'absolute',

    },
    signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
    },

})


export default VehicleScreen

