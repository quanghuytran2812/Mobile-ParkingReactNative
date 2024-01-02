import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AnimatedIcon } from '../components';
import QRCode from 'react-native-qrcode-svg';

export default function HTParkingTicket({ route, navigation }) {

    const bookingId = "BK00000"

    return (
        <>
            <View style={styles.container}>
                <View style={styles.containerTopHearder}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerContainerText}>Vé đậu xe</Text>
                    </View>
                    <AnimatedIcon />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View style={styles.MainCont}>
                        <View style={styles.mainLeft}></View>
                        <View style={styles.mainright}></View>
                        <View>
                            <View style={{ ...styles.MainContCard, paddingTop: 10 }}>
                                <Text style={styles.MainContTextL}>Tên</Text>
                                <Text style={styles.MainContTextR}>Peter Parker</Text>
                            </View>
                            <View style={styles.MainContCard}>
                                <Text style={styles.MainContTextL}>Điện thoại</Text>
                                <Text style={styles.MainContTextR}>+989 757 757 399</Text>
                            </View>
                            <View style={styles.MainContCard}>
                                <Text style={styles.MainContTextL}>Biển số xe</Text>
                                <Text style={styles.MainContTextR}>54A-4587</Text>
                            </View>
                            <View style={styles.MainContCard}>
                                <Text style={styles.MainContTextL}>Chỗ đậu xe</Text>
                                <Text style={styles.MainContTextR}>
                                    Đường số 1 (101)
                                </Text>
                            </View>
                            <View style={styles.MainContCard}>
                                <Text style={styles.MainContTextL}>Ngày</Text>
                                <Text style={styles.MainContTextR}>December 16, 2024</Text>
                            </View>
                            <View style={styles.MainContCard}>
                                <Text style={styles.MainContTextL}>Thời hạn</Text>
                                <Text style={styles.MainContTextR}>4 hours</Text>
                            </View>
                            <View style={{ ...styles.MainContCard }}>
                                <Text style={styles.MainContTextL}>Thời gian</Text>
                                <Text style={styles.MainContTextR}>09.00 AM - 13.00 PM</Text>
                            </View>
                        </View>
                        <View style={styles.texthr}>
                            <Text style={{ color: 'silver' }}>
                                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            </Text>
                        </View>
                        <View style={styles.containerqr}>
                            <Text>Quét mã này khi tới cổng</Text>
                            <View style={styles.wrapperqr}>
                                <QRCode value={bookingId} size={200} />
                            </View>
                            <Text>Lưu ý : Chụp màn hình nếu không có mạng</Text>
                        </View>
                    </View>
                    <View style={styles.viewCommonButton}>
                        <TouchableOpacity
                            style={styles.btnCommon1}
                            onPress={() => navigation.navigate('Vehicle')}
                        >
                            <Text style={styles.btnTextCommon1}>
                                Chuyển đến đặt chỗ
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </>
    )
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
    MainCont: {
        position: 'relative',
        marginTop: 20,
        marginBottom: 10,
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.4)',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 0,
            },
            android: {
                elevation: 2,
            },
        }),
        marginLeft: 1,
        marginRight: 1,
    },
    MainContCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 15,
    },
    MainContTextL: {
        flex: 1,
        color: '#6e6e6e'
    },
    MainContTextR: {
        flex: 2,
        fontWeight: '600',
        paddingLeft: 30
    },
    viewCommonButton: {
        paddingTop: 20,
    },
    btnCommon1: {
        height: 50,
        borderRadius: 15,
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
    texthr: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    containerqr: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapperqr: {
        paddingVertical: 20
    },
    mainLeft: {
        position: 'absolute',
        top: '42%',
        left: -30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fcfcfc',
        zIndex: 2,
    },
    mainright: {
        position: 'absolute',
        top: '42%',
        right: -30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fcfcfc',
        zIndex: 2,
    }
})