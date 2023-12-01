import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import Toast from 'react-native-toast-message';
import WebView from 'react-native-webview'

const VnPayScreen = ({ route, navigation }) => {
    const payment_url = route.params;

    const onUrlChange = (webViewState) => {
        console.log("webviewStatewebviewState", webViewState)
        console.log("duong link")
        console.log(webViewState.url)
        console.log("the loai")
        console.log(typeof webViewState.url)
        paymentResponse(webViewState.url)
        //   navigation.navigate('Ticket');
    };

    const paymentResponse = async (url) => {
        try {
          const response = await axios.get(url);
          console.log("===========================")
          console.log(typeof response.data.resultCode)
          console.log(response.data.resultCode);
          console.log(response.data.message);
          console.log(response.data.resultCode === "200")
          if(response.data.resultCode === "200"){
            console.log("thanh cong moi nguoi oi")
            // Toast.show({
            //     type: 'success',
            //     text1: 'ParkingHT',
            //     text2: `${response.data.message}`
            //   });
            // navigation.navigate('Ticket');
          }else{
            // Toast.show({
            //     type: 'error',
            //     text1: 'ParkingHT',
            //     text2: `${response.data.message}`
            //   });
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