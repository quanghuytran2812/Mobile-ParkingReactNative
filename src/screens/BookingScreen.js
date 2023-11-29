import React, { useEffect } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons"
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { Images } from '../contants';
import { AnimatedIcon } from '../components';
import { fetchParkingslotAreaByCategory, fetchParkingslotByArea } from '../store/parkingslotSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { createBooking } from '../store/bookingSlice';
import { useCallback } from 'react';

export default function BookingScreen({ route, navigation }) {
  const { vehicleId, categoryId, arrive_at, leave_at } = route.params;
  const dispatch = useDispatch();
  const { listAreaByCategory, listPSbyArea } = useSelector((state) => state.parkingslot);
  const [objSelected, setobjSelected] = React.useState(null);

  useEffect(() => {
    dispatch(fetchParkingslotAreaByCategory(categoryId));
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (listAreaByCategory.length > 0) {
      dispatch(fetchParkingslotByArea(listAreaByCategory[0].parking_Area));
    }
  }, [listAreaByCategory, dispatch])

  const handleAreaClick = (selectedArea) => {
    dispatch(fetchParkingslotByArea(selectedArea));
  }

  const handleOnBook = useCallback(async () => {
    if (objSelected) {
      const bookingDetailData = {
        vehicle_Id: vehicleId,
        start_Date: arrive_at,
        end_Date: leave_at,
        parking_Slot_Id: objSelected.parkingSlotId,
      };
      dispatch(createBooking(bookingDetailData))
        .then((result) => {
          if(result.payload.statusCode === 200){
            navigation.navigate('Payment', result.payload.data);
          }
        })
        .catch((error) => {
          console.log(error)
        });     
    } else {
      Toast.show({
        type: 'info',
        text1: 'ParkingHT',
        text2: 'Bạn chưa chọn chỗ mà mình sẽ đỗ',
      });
    }
  }, [objSelected]);

  const data = listPSbyArea.map((item, index) => ({ ...item, id: index + 1 })).sort((a, b) => a.name - b.name);
  const dataLeft =
    data !== undefined && data.filter((item) => item.id % 2 !== 0);
  const dataRight =
    data !== undefined && data.filter((item) => item.id % 2 === 0);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerTopHearder}>
          <View style={styles.headerContainer}>
            <Ionicons
              name="arrow-back-outline" size={22}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerContainerText}>Chọn chỗ đỗ xe</Text>
          </View>
          <AnimatedIcon />
        </View>
        <View style={styles.wrapperParking}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.containerArea}>
              {listAreaByCategory.map((area, index) => (
                <TouchableOpacity
                  style={styles.AreaName}
                  key={index}
                  onPress={() => handleAreaClick(area.parking_Area)}>
                  <Text style={styles.TextAreaName}>
                    {area.parking_Area}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.viewAll}>
              <View style={styles.viewLeft}>
                {dataLeft.map((e) => (
                  <SlotParking
                    key={e.id}
                    item={e}
                    itemSelect={objSelected}
                    onPress={() => setobjSelected(e)}
                  />
                ))}
              </View>


              <View style={styles.viewCenter}>
                <View style={styles.viewDirect}>
                  <Image
                    source={Images.ROAD1}
                    style={{ height: '101%', width: 86 }}
                  />
                </View>
              </View>
              <View style={styles.viewRight}>
                {dataRight.map((e) => (
                  <SlotParking
                    key={e.id}
                    item={e}
                    itemSelect={objSelected}
                    onPress={() => setobjSelected(e)}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={styles.viewCommonButton}>
            <TouchableOpacity
              style={styles.btnCommon1}
              onPress={() => handleOnBook()}
            >
              <Text style={styles.btnTextCommon1}>
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

function SlotParking({ item, onPress, itemSelect }) {

  return (
    <View style={styles.viewParking}>
      {item.parking_Slot_Status === 'BUSY' ? (
        <View style={styles.imageAuto}>
          <Image
            source={Images.CARUP}
            resizeMode="contain"
            style={{ width: scale(84), height: verticalScale(40) }}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={[
            styles.viewName,
            isEqual(itemSelect, item) ?
              { backgroundColor: '#02aab0', borderColor: '#02aab0', borderWidth: 2 }
              : { backgroundColor: '#02aab040', borderColor: '#02aab0', borderWidth: 2 },
          ]}
          activeOpacity={1}
          onPress={onPress}
        >
          <Text
            style={[
              styles.slotName,
              isEqual(itemSelect, item) ? { color: 'white' }
                : { color: '#02aab0' },
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    paddingTop: 60,
    paddingBottom: 20,
  },
  containerTopHearder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
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
  wrapperParking: {
    flex: 1,
    flexDirection: 'column',
  },
  containerArea: {
    flexDirection: 'row',
  },
  AreaName: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
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
  viewAll: {
    flex: 1,
    flexDirection: "row",
    marginTop: verticalScale(15),
  },
  viewLeft: { flex: 2, marginBottom: verticalScale(60) },
  viewCenter: {
    backgroundColor: 'gray',
    flex: 1,
    flexDirection: "row",
    marginBottom: verticalScale(60)
  },
  viewRight: { flex: 2, marginBottom: verticalScale(60) },
  viewParking: {
    borderColor: 'gray',
    flex: 1,
    padding: 20,
    borderWidth: 1
  },
  slotName: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    paddingVertical: verticalScale(15),
    textAlign: "center"
  },
  imageAuto: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingVertical: verticalScale(6)
  },
  viewName: {
    borderRadius: 8,
  },
  viewDirect: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  viewCommonButton: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
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
});
