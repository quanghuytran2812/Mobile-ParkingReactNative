import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Images } from '../contants';
import { AnimatedIcon } from '../components';
import { ApiContans } from '../contants';
import { createPayment } from '../store/paymentSlice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function PaymentScreen({ route, navigation }) {
    const bookingData = route.params
    const dispatch = useDispatch();

    const handleOnPayment = useCallback(async () => {
        const paymentDetailData = {
            amount: bookingData.booking_Total,
            bookingId: bookingData.booking_Id
        };
        dispatch(createPayment(paymentDetailData))
            .then((result) => {
                navigation.navigate('VnPay', result.payload);
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);
    return (
        <>
            <View style={styles.container}>
                <View style={styles.containerTopHearder}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerContainerText}>Tóm tắt thông tin</Text>
                    </View>
                    <AnimatedIcon />
                </View>
                <View style={styles.MainCont}>
                    <View style={styles.MainContCard}>
                        <Text style={styles.MainContTextL}>Khu vực đậu xe</Text>
                        <Text style={styles.MainContTextR}>Trung tâm bến xe Thành phố Đà Nẵng</Text>
                    </View>
                    <View style={styles.MainContCard}>
                        <Text style={styles.MainContTextL}>Địa chỉ</Text>
                        <Text style={styles.MainContTextR}>Tôn Đức Thắng, Hoà Minh, Liên Chiểu, Đà Nẵng</Text>
                    </View>
                    <View style={styles.MainContCard}>
                        <Text style={styles.MainContTextL}>Phương tiện cá nhân</Text>
                        <Text style={styles.MainContTextR}>{bookingData?.vehicle?.vehicleName}</Text>
                    </View>
                    <View style={styles.MainContCard}>
                        <Text style={styles.MainContTextL}>Chỗ đậu xe</Text>
                        <Text style={styles.MainContTextR}>
                            {`${bookingData?.parkingSlot?.area} (${bookingData?.parkingSlot?.name})`}
                        </Text>
                    </View>
                    <View style={styles.MainContCard}>
                        <Text style={styles.MainContTextL}>Ngày</Text>
                        <Text style={styles.MainContTextR}>{`${ApiContans?.splitAndFormatDate(bookingData?.start_Date)} - ${ApiContans?.splitAndFormatDate(bookingData?.end_Date)}`}</Text>
                    </View>
                    <View style={styles.MainContCard}>
                        <Text style={styles.MainContTextL}>Thời hạn</Text>
                        <Text style={styles.MainContTextR}>{`${ApiContans?.calculateDuration(bookingData?.start_Date, bookingData?.end_Date)} giờ`}</Text>
                    </View>
                    <View style={styles.MainContCard}>
                        <Text style={styles.MainContTextL}>Thời gian</Text>
                        <Text style={styles.MainContTextR}>{`${ApiContans?.splitAndFormatTime(bookingData?.start_Date)} - ${ApiContans?.splitAndFormatTime(bookingData?.end_Date)}`}</Text>
                    </View>
                </View>
                <View style={styles.MainCont}>
                    <View style={styles.MainContCard}>
                        <Text style={styles.MainContTextL}>Giá tiền</Text>
                        <Text style={styles.MainContTextR}>{`${ApiContans.CurrencyFormat(bookingData?.booking_Total)}`}</Text>
                    </View>
                    <View style={styles.MainContHr}></View>
                    <View style={styles.MainContCard}>
                        <Text style={styles.MainContTextL}>Tổng cộng</Text>
                        <Text style={styles.MainContTextR}>{`${ApiContans.CurrencyFormat(bookingData?.booking_Total)}`}</Text>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.MainCont}>
                        <View style={styles.MainContMethodPay}>
                            <Image
                                style={{ width: 100, height: 50 }}
                                source={Images.VNPAY}
                            />
                            <Text style={styles.MainContMethodPayText}>
                                VNPAY
                            </Text>
                        </View>
                    </View>
                    <View style={styles.viewCommonButton}>
                        <TouchableOpacity
                            style={styles.btnCommon1}
                            onPress={() => handleOnPayment()}
                        >
                            <Text style={styles.btnTextCommon1}>
                                Xác nhận thanh toán
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
                shadowRadius: 2,
            },
            android: {
                elevation: 4,
            },
        }),
        marginLeft: 1,
        marginRight: 1
    },
    MainContHr: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderStyle: 'solid',
        marginBottom: 10
    },
    MainContCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    MainContTextL: {
        flex: 1,
        color: '#6e6e6e'
    },
    MainContTextR: {
        flex: 1,
        fontWeight: '600',
    },
    MainContMethodPay: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    MainContMethodPayText: {
        fontWeight: '600',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between'
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
    }
})