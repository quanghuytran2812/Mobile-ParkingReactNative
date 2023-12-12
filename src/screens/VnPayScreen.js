import { Modal, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import WebView from 'react-native-webview';
import queryString from 'query-string';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ModalFail, ModalSuccess } from '../components';

const VnPayScreen = ({ route, navigation }) => {
  const payment_url = route.params;
  const [openModalS, setOpenModalS] = useState(false);
  const [openModalF, setOpenModalF] = useState(false);
  const [dataB, setDataB] = useState("");

  const transferP = () => {
    navigation.navigate('Profile');
  }
  const transferTicket = (data) => {
    navigation.navigate('HTParkingTicket', data);
  }

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
          setOpenModalS(true)
          setDataB(bookingId)
        }
      } else {
        setOpenModalF(true)
      }
      // You can perform further actions based on the resultCode and message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.wrap}>
        <WebView
          style={styles.wrap}
          source={{ uri: payment_url }}
          onNavigationStateChange={onUrlChange}
        />
        <Modal
          transparent={true}
          animationType='fade'
          visible={openModalS}
        >
          <ModalSuccess
            onClose={() => setOpenModalS(false)}
            dataS={dataB}
            transferTicket={transferTicket}
          />
        </Modal>
        <Modal
          transparent={true}
          animationType='fade'
          visible={openModalF}
        >
          <ModalFail
            onClose={() => setOpenModalF(false)}
            transferP={transferP}
          />
        </Modal>
      </SafeAreaView>
    </>
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