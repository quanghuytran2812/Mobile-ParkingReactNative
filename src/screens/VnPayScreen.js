import { StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'

const VnPayScreen = () => {
    const onUrlChange = (webviewState) => {
        console.log("webviewStatewebviewState", webviewState)
    }

    return (
        <View style={styles.wrap}>
            <WebView
                style={styles.wrap}
                source={{ uri: 'https://www.instagram.com/minju_izone/' }}
                onNavigationStateChange={onUrlChange}
            />
        </View>
    )
}

export default VnPayScreen

const styles = StyleSheet.create({
    wrap: {
      flex: 1,
      backgroundColor: "#fff",
    },
  });