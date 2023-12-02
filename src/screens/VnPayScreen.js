import axios from 'axios';
import { StyleSheet, View } from 'react-native'
import Toast from 'react-native-toast-message';
import WebView from 'react-native-webview'

const VnPayScreen = ({ route, navigation }) => {
    const payment_url = route.params;

    const onUrlChange = (webViewState) => {
        if(webViewState.url.includes("http://192.168.1.108:8090/parkinght/api/create-payment")){
          paymentResponse(webViewState.url)
        }  
        //   navigation.navigate('Ticket');
    };

    const paymentResponse = async (url) => {
        try {
          const response = await axios.get(url);
          if(response.data.resultCode === "200"){
            Toast.show({
                type: 'success',
                text1: 'ParkingHT',
                text2: `${response.data.message}`
              });
            navigation.navigate('Ticket');
          }else{
            Toast.show({
                type: 'error',
                text1: 'ParkingHT',
                text2: `${response.data.message}`
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
    )
}

export default VnPayScreen

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingTop: 50,
    },
});