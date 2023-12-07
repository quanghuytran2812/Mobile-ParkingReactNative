import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons"
import { Images } from "../contants";
import { AnimatedIcon } from '../components';
import { ApiContans } from '../contants'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingByStatus } from '../store/bookingSlice';

const HistoryScreen = ({ navigation }) => {
  const listBookingStatus = useSelector((state) => state.booking.list);
  const dispatch = useDispatch();

  const handleStatus = (dataStatus) => {
    dispatch(fetchBookingByStatus(dataStatus));
  }

  useEffect(() => {
    if (listBookingStatus.length === 0) {
      dispatch(fetchBookingByStatus("Completed"));
    }
  }, [])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerTopHearder}>
          <View style={styles.headerContainer}>
            <Ionicons
              name="arrow-back-outline" size={22}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerContainerText}>Bãi đậu xe của tôi</Text>
          </View>
          <AnimatedIcon />
        </View>
        <View style={styles.containerWrapperStatus}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.wrapperStatusB}>
              {ApiContans.statusBookingData.map((item) => (
                <TouchableOpacity
                  key={item.code}
                  onPress={() => handleStatus(item.code)}
                  style={styles.nameStatusB}
                >
                  <Text style={styles.textStatusB}>{item.value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <FlatList
          data={[...listBookingStatus].sort(
            (a, b) => new Date(b.createDate) - new Date(a.createDate)
          )}
          style={styles.containerListCar}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.containerMyParking}>
              <View style={styles.containerInfoB}>

                <View style={styles.imageMyParking}>
                  <Image
                    style={styles.imageParking}
                    source={Images.BENXE}
                  />
                </View>

                <View style={styles.detailMyParking}>
                  <Text style={styles.detailTitle}>Trung tâm bến xe Đà Nẵng</Text>
                  <Text style={styles.detaildes}>{item.area} ({item.areaName})</Text>
                  <View style={styles.desparking}>
                    <View style={styles.moneyParking}>
                      <Text style={{ color: '#02aab0', fontWeight: '700', fontSize: 14 }}>{item.amount}₫</Text>
                      <Text style={{ color: '#6e6e6e', fontSize: 12 }}> / {item.duration_hours} hour</Text>
                    </View>
                    {item.status === "ONGOING" ? (<Text style={styles.statusBooking}>ĐANG ĐẶT CHỖ</Text>) :
                      item.status === "COMPLETED" ? (<Text style={styles.statusBookingCompleted}>HOÀN THÀNH</Text>) :
                        item.status === "CANCELED" ? (<Text style={styles.statusBookingCanceled}>ĐÃ HỦY</Text>) : ''
                    }
                  </View>
                </View>
              </View>

              {item.status !== "CANCELED" || item.duration_hours >= 1 ?
                (
                  <View style={styles.containerButton}>
                    <TouchableOpacity
                      style={styles.btnCommon1}
                    >
                      <Text style={styles.btnTextCommon1}>
                        {item.status === "ONGOING" ? 'Tiếp tục đặt chỗ' : 'Xem Vé'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : ''}

            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
};

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
  containerWrapperStatus: {
    paddingVertical: 20,
  },
  wrapperStatusB: {
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameStatusB: {
    borderWidth: 1.5,
    borderColor: '#02aab0',
    borderRadius: 15,
    padding: 8,
  },
  textStatusB: {
    color: '#02aab0'
  },
  containerMyParking: {
    borderRadius: 15,
    padding: 15,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    alignItems: 'center',
    position: 'relative',
    marginRight: 1,
    marginLeft: 1,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  containerInfoB: {
    flexDirection: 'row',
    width: '100%',
  },
  imageMyParking: {
    marginRight: 20
  },
  imageParking: {
    width: 85,
    height: 85,
    borderRadius: 20
  },
  detailMyParking: {
    justifyContent: 'center',
    width: 210,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4
  },
  detaildes: {
    color: '#6e6e6e',
    marginBottom: 4,
    fontSize: 14,
  },
  desparking: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  moneyParking: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBooking: {
    fontSize: 12,
    padding: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#02aab0',
    backgroundColor: '#02aab0',
    color: '#fff',
    fontWeight: '600',
    overflow: 'hidden'
  },
  statusBookingCompleted: {
    fontSize: 12,
    padding: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2dce89',
    color: '#2dce89',
  },
  statusBookingCanceled: {
    fontSize: 12,
    padding: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DB3445',
    color: '#DB3445',
  },
  containerButton: {
    marginTop: 20,
    width: '100%'
  },
  btnCommon1: {
    height: 40,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#02aab0',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.27,
    elevation: 4,
    borderColor: '#02aab0',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTextCommon1: {
    color: '#02aab0',
    fontWeight: 'bold',
    fontSize: 17,
  }
});

export default HistoryScreen;
