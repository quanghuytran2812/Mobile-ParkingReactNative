import React, { useEffect } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons"
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { Images } from '../contants';
import { AnimatedIcon } from '../components';
import { fetchParkingslotAreaByCategory, fetchParkingslotByArea } from '../store/parkingslotSlice';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';

export default function GoogleMapScreen({ navigation }) {
    const dispatch = useDispatch();
    const [isShow, setIsShow] = React.useState(false);
    const { listAreaByCategory, listPSbyArea } = useSelector((state) => state.parkingslot);
    const [objSelected, setobjSelected] = React.useState(null);

    return (
        <>
            {
                isShow ? (
                    <SafeAreaView style={styles.container}>
                        
                    </SafeAreaView>
                ): (
                    <SafeAreaView style={styles.container}>
                        <Text>dsdsds</Text>
                    </SafeAreaView>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingTop: 60,
        paddingBottom: 20,
    },
    containerTopHearder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerContainerText: {
        fontSize: 21,
        marginLeft: 10,
        fontWeight: '700'
    },
    wrapperParking: {
        flex: 1,
        flexDirection: 'column',
    },
    containerArea: {
        flexDirection: 'row',
    },
    AreaName: {
        justifyContent: "center",
        alignItems: "center",
        height: 80,
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
        display: 'flex',
        flex: 1,
        justifyContent: "center",
        paddingVertical: verticalScale(6)
    },
    viewName: {
        borderRadius: 8,
        alignItems: "center",
        display: 'flex',
        justifyContent: "center",
    },
    viewDirect: {
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    viewCommonButton: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    },
    btnCommon1: {
        height: 50,
        borderRadius: 15,
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.27,
        shadowRadius: -3,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTextCommon1: {
        color: '#fcfcfc',
        fontWeight: 'bold',
        fontSize: 17,
    }
});
