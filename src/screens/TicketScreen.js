import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import QRCode from 'react-native-qrcode-svg';
import Ionicons from "react-native-vector-icons/Ionicons"


const TicketScreen = ({navigation}) => {
  const dataToEncode = 'Your Data Here';
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ position: 'absolute', paddingTop: 55, flexDirection: 'row', alignItems: 'center', zIndex: 999 }}>
        <Ionicons
          name='arrow-back-outline'
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 700 }}>
          Quay lại
        </Text>
      </View>
      <View
        style={{
          alignSelf: 'center',
          height: height(80),
          width: width(90),
          marginTop: width(20),
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'silver',
          }}>
          <View
            style={{
              alignSelf: 'center',
              height: height(65),
              width: width(80),
              borderRadius: width(4),
              marginTop: width(20),
              backgroundColor: 'white',
            }}>
            <View
              style={{
                justifyContent: 'space-between', flexDirection:
                  'row'
              }}>
              <View>
                <Text style={{ fontWeight: 'bold', padding: 10 }}>Họ Tên : Trần Quang Huy</Text>
                <Text style={{ fontWeight: 'bold', padding: 10 }}>Bãi đỗ : Bến Xe Trung Tâm Đà Nẵng</Text>
                <Text style={{ fontWeight: 'bold', padding: 10 }}>Ngày giờ : Thứ 2, 14, 2023 : 8:00 am - Thứ 3, 25,2023 : 13:00 pm</Text>
                <Text style={{ fontWeight: 'bold', padding: 10 }}>SĐT : 0906037470</Text>
                <Text style={{ fontWeight: 'bold', padding: 10 }}>Vị trí : A05</Text>
                <Text style={{ fontWeight: 'bold', padding: 10 }}>hotline : 02363767428</Text>
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginTop: height(7),
                  padding: 10,
                }}>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: height(4),
                  width: width(8),
                  borderRadius: width(10),
                  backgroundColor: 'silver',
                }}
              />
              <Text style={{ color: 'silver' }}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              </Text>
              <View
                style={{
                  height: height(4),
                  width: width(8),
                  borderRadius: width(10),
                  backgroundColor: 'silver',
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <View style={styles.container} >
                <View>
                  <Text style={styles.fontma}> Quét mã này khi tới cổng </Text>
                </View>
                <View style={styles.Maqr}>
                  <QRCode
                    value={dataToEncode}
                    size={200} // Adjust the size of the QR code as needed
                  />
                </View>
                <View style={styles.Luuy}>
                  <Text> Lưu ý : Chụp màn hình nếu không có mạng </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Maqr:{
   paddingTop:10
  },
  Luuy:{
    paddingTop:10
  }
})

export default TicketScreen

