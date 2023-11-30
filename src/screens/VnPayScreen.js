import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'

const VnPayScreen = ({ route, navigation }) => {
    const payment_url = route.params;
    const [urlResponse, seturlResponse] = useState("")

    const onUrlChange = (webViewState) => {
        console.log("webviewStatewebviewState", webViewState)
        console.log(webViewState.url)
        console.log(typeof webViewState.url)
        paymentResponse(webViewState.url)
        //   navigation.navigate('Ticket');
    };

    const paymentResponse = async(url) => {
        const response = axios.get(url);
        console.log(response)
        console.log(response.data)
        console.log(response?.resultCode)
        console.log(response?.message)
    } 

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