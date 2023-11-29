import { StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'

const VnPayScreen = ({ route, navigation }) => {
    const payment_url = route.params
    const onUrlChange = (webviewState) => {
        console.log("webviewStatewebviewState", webviewState)
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