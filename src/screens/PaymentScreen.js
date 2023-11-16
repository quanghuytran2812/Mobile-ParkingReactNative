import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useMemo, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Colors, Images } from '../contants';
import RadioGroup from 'react-native-radio-buttons-group';
import { Display } from '../utils';
import Ionicons from "react-native-vector-icons/Ionicons"

export default function PaymentScreen({ navigation }) {
    const radioButtons = useMemo(() => ([
        {
            id: '1',
        },
    ]), []);
    const [selectedId, setSelectedId] = useState();
    return (
        <View style={{ flex: 1 }}>
            <View>
                <View style={styles.headerContainer}>
                    <Ionicons
                        name="arrow-back-outline" size={30}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 700 }}>Thông tin Thanh Toán</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerInfo}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                    }}>Tóm tắt thông tin</Text>
                </View>
                <View style={styles.MainCont}>
                    <View style={styles.durationBox}>
                        <View style={styles.durationTextContainer}>
                            <Text style={styles.durationText}>Thông Tin</Text>
                            <Text style={styles.selectedDateTime}>
                                Ngày giờ : Thứ 2, 14, 2023 : 8:00 am - Thứ 3, 25,2023 : 13:00 pm
                            </Text>
                            <Text style={styles.selectedDateTime}>
                                Bãi đổ : Trung tâm bến xe Thành phố Đà Nẵng
                            </Text>
                            <Text style={styles.selectedDateTime}>
                                Vị trí đổ : A05
                            </Text>
                            <Text style={styles.selectedDateTime}>
                                Sđt : 0906037470
                            </Text>
                            <Text style={styles.selectedDateTime}>
                                hotline : 02363767428
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.MainCont}>
                    <View style={styles.durationBox}>
                        <View style={styles.durationTextContainer}>
                            <Text style={styles.durationText}>Thanh Toán</Text>
                            <Text style={styles.selectedDateTime}>
                                Gía Tiền : 17.000 VND
                            </Text>
                            <View style={styles.borderLine}></View>
                            <Text style={styles.selectedDateTime}>
                                Tổng cộng : 17.000 VND
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.MainCont}>
                    <View style={styles.durationBox1} >
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={{ width: 90, height: 60 }}
                                source={Images.VNPAY}
                            />
                            <Text style={styles.selectedDateTime1}>
                                VNPAY
                            </Text>
                            <View style={{ paddingLeft: 185, paddingTop: 13 }}>
                                <RadioGroup
                                    radioButtons={radioButtons}
                                    onPress={setSelectedId}
                                    selectedId={selectedId}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.siginButton}>
                    <Text
                        style={styles.signinButtonText}>
                        Thanh Toán
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    headerInfo: {
        backgroundColor: 'white',
        flex: 1,
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 3,
    },
    durationBox: {
        flexDirection: 'row',
        backgroundColor: Colors.DEFAULT_GREY,
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 16,
        marginBottom: 25,
        elevation: 5,

    },
    paymentBox: {
        backgroundColor: '#FFE5B4',
        borderRadius: 10,
        padding: 16,
        marginBottom: 25,
        elevation: 5,

    },
    paymentHead: {
        fontSize: 19,
        marginLeft: 8,
        fontWeight: 'bold',
        color: 'black',
    },
    MainCont: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,

    },
    durationTextContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    optionsBox: {
        backgroundColor: '#FFE5B4',
        borderRadius: 10,
        padding: 16,
        marginBottom: 25,
        elevation: 5,
    },
    durationText: {
        fontSize: 19,
        marginLeft: 8,
        fontWeight: 'bold',
        color: 'green',
    },
    selectedDateTime: {
        fontSize: 14,
        marginLeft: 8,
        marginTop: 12,
        fontWeight: 'bold',
    },
    borderLine: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 8,
    },
    durationBox1: {
        backgroundColor: Colors.DEFAULT_GREY,
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 5,
        marginBottom: 25,
        elevation: 5,
    },
    selectedDateTime1: {
        fontSize: 14,
        marginLeft: 8,
        marginTop: 12,
        fontWeight: 'bold',
        paddingTop: 10
    },
    siginButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        marginHorizontal: 20,
        borderRadius: 8,
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