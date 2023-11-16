import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Display } from '../utils';
import Ionicons from "react-native-vector-icons/Ionicons"
import { Colors, Images } from "../contants";

const CompletedScreen = ({ navigation }) => {
    return (
        <>
            <View style={{ position: 'absolute', paddingTop: 55, flexDirection: 'row', alignItems: 'center', zIndex: 999 }}>
                <Ionicons
                    name="arrow-back-outline" size={30}
                    onPress={() => navigation.goBack()}
                />
                {/* <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 700 }}>Đang diễn ra</Text> */}
            </View>
            <View style={styles.wrapperParking}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={styles.containerArea}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('History')}
                            style={styles.AreaName}>
                            <Text style={styles.TextAreaName}>
                                đang diễn ra
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.AreaName}>
                            <Text style={styles.TextAreaName}>
                                hoàn thành
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Canceled')}
                            style={styles.AreaName}>
                            <Text style={styles.TextAreaName}>
                                đã hủy bỏ
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <ScrollView>
                <View style={styles.MainCont}>
                    <View style={styles.durationBox}>
                        <View style={styles.durationTextContainer}>
                            <View>
                                <Image
                                    style={{ borderRadius: 10 }}
                                    source={Images.BENXE1}
                                />
                            </View>

                            <View style={{ paddingLeft: 15 }}>
                                <Text style={styles.selectedDateTime}>
                                    Bến xe Trung Tâm Đà Nẵng
                                </Text>

                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.selectedDateTime}>
                                        Vị trí đổ : A05
                                    </Text>
                                </View>

                                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.selectedDateTime}>
                                        51.000 VND / 3 hour
                                    </Text>
                                    <View>
                                        <Text style={{ color: Colors.DEFAULT_YELLOW, paddingLeft: 20 }}>
                                            Đã hoàn thành
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ paddingTop: 30 }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Ticket')}
                                        style={styles.siginButton}>
                                        <Text
                                            style={styles.signinButtonText}>
                                            Xem Vé
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    containerArea: {
        flexDirection: 'row',
    },
    AreaName: {
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        marginBottom: 12,
        paddingLeft: 20,
        paddingRight: 20
    },
    TextAreaName: {
        borderRadius: 8,
        borderWidth: 2,
        padding: 10,
        color: "#000",
        fontWeight: "bold",
    },
    wrapperParking: {
        marginTop: 80
    },
    container: {
        backgroundColor: Colors.DEFAULT_WHITE,
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 40,
    },
    TextAreaName: {
        borderRadius: 8,
        borderWidth: 2,
        padding: 10,
        color: "#000",
        fontWeight: "bold",
    },
    MainCont: {
        flex: 1,
        padding: 8,
    },
    durationBox: {
        flexDirection: 'row',
        backgroundColor: Colors.DEFAULT_GREY,
        justifyContent: 'space-between',
        borderRadius: 20,
        padding: 16,
        marginBottom: 25,
        elevation: 5,
    },
    durationTextContainer: {
        flexDirection: 'row',
    },
    siginButton: {
        backgroundColor: Colors.FABEBOOK_BLUE,
        marginHorizontal: 20,
        borderRadius: 25,
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
})

export default CompletedScreen

