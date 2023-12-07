import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import WebView from 'react-native-webview';
import queryString from 'query-string';

const VnPayScreen = ({ route, navigation }) => {
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
        Toast.show({
          type: 'success',
          text1: 'ParkingHT',
          text2: `Thanh toán thành công!`
        });
        navigation.navigate('Ticket', bookingId);
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