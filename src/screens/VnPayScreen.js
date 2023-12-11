import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import WebView from 'react-native-webview';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { fetchBookingById } from '../store/bookingSlice';

const VnPayScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const payment_url = route.params;

  const onUrlChange = (webViewState) => {
    if (webViewState.url.includes("https://parkinght-production.up.railway.app/parkinght/api/create-payment")) {
      paymentResponse(webViewState.url);
    }
  };

  const paymentResponse = async (url) => {
    try {
      const urlParams = queryString.parseUrl(url);
      const bookingId = urlParams.query.bookingId;
      const responseCode = urlParams.query.vnp_ResponseCode;
      if (responseCode === "00") {
        if (bookingId) {
          dispatch(fetchBookingById(bookingId))
            .then((result) => {
              if (result.payload.statusCode === 200) {
                navigation.navigate('Ticket', result.payload.data);
                Toast.show({
                  type: 'success',
                  text1: 'ParkingHT',
                  text2: `Thanh toán thành công!`
                });
              }else{
                Toast.show({
                  type: 'error',
                  text1: 'ParkingHT',
                  text2: `${result.payload.message}`
                });
              }
            })
            .catch((error) => {
              console.log(error)
            });
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'ParkingHT',
          text2: `Thanh toán thất bại`
        });
      }
      // You can perform further actions based on the resultCode and message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.wrap}>
      <WebView
        style={styles.wrap}
        source={{ uri: payment_url }}
        onNavigationStateChange={onUrlChange}
      />
    </View>
  );
};

export default VnPayScreen;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    paddingTop: 50,
  },
});