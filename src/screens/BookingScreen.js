import React, { useState, useEffect } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons"
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { Images, Colors } from '../contants';
import { Display } from '../utils';

const data = [
  { id: 1, isParked: true, slotName: 'A01' },
  { id: 2, isParked: false, slotName: 'A02' },
  { id: 3, isParked: false, slotName: 'A03' },
  { id: 4, isParked: true, slotName: 'A04' },
  { id: 5, isParked: false, slotName: 'A05' },
  { id: 6, isParked: false, slotName: 'A06' },
  { id: 7, isParked: false, slotName: 'A07' },
  { id: 8, isParked: false, slotName: 'A08' },
  { id: 9, isParked: false, slotName: 'A09' },
  { id: 10, isParked: true, slotName: 'A10' },
  { id: 11, isParked: true, slotName: 'A11' },
  { id: 12, isParked: false, slotName: 'A12' },
  { id: 13, isParked: false, slotName: 'A13' },
  { id: 14, isParked: true, slotName: 'A14' },
  { id: 15, isParked: false, slotName: 'A15' },
  { id: 16, isParked: false, slotName: 'A16' },
];

export default function BookingScreen({ navigation }) {
  const dataLeft =
    data !== undefined && data.filter((item) => item.id % 2 !== 0);
  const dataRight =
    data !== undefined && data.filter((item) => item.id % 2 === 0);
  const [objSelected, setobjSelected] = React.useState(null);
  return (
    <>
      <View style={{ position: 'absolute', paddingTop: 55, flexDirection: 'row', alignItems: 'center', zIndex: 999 }}>
        <Ionicons
          name='arrow-back-outline'
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 700 }}>
          Chọn chỗ đỗ xe
        </Text>
      </View>
      <View style={styles.wrapperParking}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.containerArea}>
            <TouchableOpacity style={styles.AreaName}
              >
              <Text style={styles.TextAreaName}>
                đường số 1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.AreaName}>
              <Text style={styles.TextAreaName}>
                đường số 2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.AreaName}>
              <Text style={styles.TextAreaName}>
                đường số 3
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.viewAll}>
            <View style={styles.viewLeft}>
              {dataLeft.map((e, index) => (
                <SlotParking
                  slotName={e.slotName}
                  index={index}
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
              {dataRight.map((e, index) => (
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
        <TouchableOpacity 
        style={styles.siginButton}
        onPress={() => navigation.navigate('Payment')}
        >
          <Text style={styles.signinButtonText}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

function SlotParking({ item, onPress, itemSelect }) {
  return (
    <View style={styles.viewParking}>
      {item.isParked ? (
        <View style={styles.imageAuto}>
          <Image
            source={Images.CARUP}
            resizeMode={"contain"}
            style={{ width: scale(84), height: verticalScale(40) }}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={[
            styles.viewName,
            { backgroundColor: itemSelect === item ? '#02aab0' : 'white' },
          ]}
          activeOpacity={1}
          onPress={onPress}
        >
          <Text
            style={[
              styles.slotName,
              { color: itemSelect === item ? 'white' : 'black' },
            ]}
          >
            {item.slotName}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperParking: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 50
  },
  containerArea: {
    flexDirection: 'row',
  },
  AreaName: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    marginBottom: 12,
    marginTop: 20,
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
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 2
  },
  viewDirect: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  siginButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    marginHorizontal: 20,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },

});
