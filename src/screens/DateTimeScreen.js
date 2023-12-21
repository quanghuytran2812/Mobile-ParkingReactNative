import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useCallback, useState } from 'react'
import CalendarPicker from 'react-native-calendar-picker'
import { SafeAreaProvider } from "react-native-safe-area-context";
import { IconButton } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AnimatedIcon } from '../components';
import moment from 'moment';
import Toast from 'react-native-toast-message';


const DateTimeScreen = ({ route, navigation }) => {
    const [visible, setVisible] = React.useState(false);
    const [visible2, setVisible2] = React.useState(false);
    const [selectedTime, setSelectedTime] = React.useState({ hours: 0, minutes: 0 });
    const [selectedTime2, setSelectedTime2] = React.useState({ hours: 0, minutes: 0 });
    const { vehicleId, categoryId } = route.params;

    const onDismiss = useCallback(() => {
        setVisible(false);
    }, [setVisible]);
    const onConfirm = useCallback(
        ({ hours, minutes }) => {
            setVisible(false);
            setSelectedTime({ hours, minutes });
        },
        [setVisible, setSelectedTime]
    );
    const onDismiss2 = useCallback(() => {
        setVisible2(false);
    }, [setVisible2]);
    const onConfirm2 = useCallback(
        ({ hours, minutes }) => {
            setVisible2(false);
            setSelectedTime2({ hours, minutes });
        },
        [setVisible2, setSelectedTime2]
    );
    const minDate = new Date(); // Today
    const maxDate = new Date(2026, 6, 3);
    const [selectedStartDate, setSelectedStartDate] = useState('')
    const [selectedEndDate, setSelectedEndDate] = useState('')
    const onDateChange = (date, type) => {
        const newDate = JSON.stringify(date);
        const newDate1 = newDate.substring(1, newDate.length - 1)
        const dates = newDate1.split("T")
        const date1 = dates[0].split("-")
        const day = date1[2]
        const month = date1[1]
        const year = date1[0]

        if (type == 'END_DATE') {
            if (day == undefined) {
                setSelectedEndDate('')
            } else {
                setSelectedEndDate(day + "/" + month + "/" + year)
            }
        } else {
            setSelectedStartDate(day + "/" + month + "/" + year)
            setSelectedEndDate('')
        }
    }

    const handleOnBook = useCallback(async () => {
        if (selectedStartDate && selectedEndDate && selectedTime && selectedTime2) {
          const formattedArriveAt = moment(
            `${selectedStartDate}T${selectedTime.hours}:${selectedTime.minutes}`,
            'DD/MM/YYYYTHH:mm'
          ).format('YYYY-MM-DDTHH:mm:ss');
      
          const formattedLeaveAt = moment(
            `${selectedEndDate}T${selectedTime2.hours}:${selectedTime2.minutes}`,
            'DD/MM/YYYYTHH:mm'
          ).format('YYYY-MM-DDTHH:mm:ss');
      
          const startTime = moment(`${selectedStartDate} ${selectedTime.hours}:${selectedTime.minutes}`, 'DD/MM/YYYY HH:mm');
          const endTime = moment(`${selectedEndDate} ${selectedTime2.hours}:${selectedTime2.minutes}`, 'DD/MM/YYYY HH:mm');
          const duration = moment.duration(endTime.diff(startTime));

          if (endTime.isAfter(startTime) && duration.asHours() >= 0.5) {
            navigation.navigate('Booking', {
              vehicleId: vehicleId,
              categoryId: categoryId,
              arrive_at: formattedArriveAt,
              leave_at: formattedLeaveAt,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'ParkingHT',
              text2: 'Thời gian rời đi phải sau và cách thời gian đến ít nhất 30 phút',
            });
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'ParkingHT',
            text2: 'Bạn chưa chọn thời gian mà mình sẽ đỗ',
          });
        }
      }, [selectedStartDate, selectedEndDate, selectedTime, selectedTime2]);
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.containerTopHearder}>
                    <View style={styles.headerContainer}>
                        <Ionicons
                            name="arrow-back-outline" size={22}
                            onPress={() => navigation.goBack()}
                        />
                        <Text style={styles.headerContainerText}>Chọn ngày và thời gian</Text>
                    </View>
                    <AnimatedIcon />
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.selectDayTitle}>Chọn ngày </Text>
                </View>

                <View style={styles.calendarPickerStyle}>
                    <CalendarPicker
                        startFromMonday={true}
                        allowRangeSelection={true}
                        previousTitle="<"
                        nextTitle=">"
                        headerWrapperStyle={{ width: '100%' }}
                        minDate={minDate}
                        maxDate={maxDate}
                        width={370}
                        todayBackgroundColor="#000"
                        selectedDayColor="#000"
                        selectedDayTextColor="#FFFFFF"
                        onDateChange={onDateChange}
                    />
                </View>

                <Text style={styles.selectTimeTitle}>Chọn thời gian</Text>

                <SafeAreaProvider style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                        <Text style={styles.timeSelectTitle}>Thời gian bắt đầu</Text>
                        <View style={styles.selectTimeData}>
                            <IconButton
                                icon={() => <Ionicons name="time-outline" size={25} color="#02aab0" />} // Use the calendar icon
                                onPress={() => setVisible(true)}
                            />
                            <Text style={styles.showTimeSelected}>{selectedTime.hours}:{selectedTime.minutes}</Text>
                        </View>
                        <TimePickerModal
                            visible={visible}
                            onDismiss={onDismiss}
                            onConfirm={onConfirm}
                            hours={selectedTime.hours}
                            minutes={selectedTime.minutes}
                        />
                    </View>
                    <Ionicons
                        style={{ paddingTop: 50 }}
                        name='arrow-forward-outline' size={20}
                    />
                    <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
                        <Text style={styles.timeSelectTitle}>Thời gian kết thúc</Text>
                        <View style={styles.selectTimeData}>
                            <IconButton
                                icon={() => <Ionicons name="time-outline" size={25} color="#02aab0" />} // Use the calendar icon
                                onPress={() => setVisible2(true)}
                            />
                            <Text style={styles.showTimeSelected}>{selectedTime2.hours}:{selectedTime2.minutes}</Text>
                        </View>
                        <TimePickerModal
                            visible={visible2}
                            onDismiss={onDismiss2}
                            onConfirm={onConfirm2}
                            hours={selectedTime2.hours}
                            minutes={selectedTime2.minutes}
                        />
                    </View>
                </SafeAreaProvider>
                <View>
                    <TouchableOpacity
                        style={styles.btnCommon1}
                        onPress={() => handleOnBook()}
                    >
                        <Text style={styles.btnTextCommon1}>
                            Tiếp tục
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
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
    selectDayTitle: {
        fontWeight: '700',
        fontSize: 15,
        marginBottom: 4,
    },
    calendarPickerStyle: {
        marginTop: 20,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        marginBottom: 20,
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
    selectTimeTitle: {
        fontWeight: '700',
        fontSize: 15,
        marginBottom: 20,
    },
    timeSelectTitle: {
        fontWeight: '600',
        fontSize: 14,
    },
    selectTimeData: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
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
    },
    showTimeSelected: {
        fontSize: 15,
        paddingRight: 10,
        fontWeight: '600'
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
export default DateTimeScreen