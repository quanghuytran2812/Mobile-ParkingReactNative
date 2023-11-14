import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Colors } from '../contants'
import { Separator } from '../components'
import Feather from 'react-native-vector-icons/Feather';
import { Display } from '../utils'


export default function EditProfileScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container} >
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.DEFAULT_GREEN}
                translucent
            />
            <View style={styles.headerContainer}>
                <Ionicons
                    name="arrow-back-outline" size={30}
                    onPress={() => navigation.goBack()}
                />
                <Text style={{ paddingLeft: 10, fontSize: 20, fontWeight: 700  }}>Hồ sơ</Text>
            </View>
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.backgroundCurvedContainer} />
            <View style={styles.mainContainer}>
                <View style={styles.box}>
                    <Ionicons name="person-outline" color='grey' size={29} marginLeft={25} marginRight={25} marginTop={16} />
                    <View>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 5 }}>Name</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Trần Quang Huy</Text>
                            <Feather
                                style={{ paddingLeft: 150 }}
                                name="chevron-right"
                                color={Colors.INACTIVE_GREY}
                                size={20} />
                        </View>
                    </View>
                </View>

                <View style={styles.box}>
                    <Ionicons name="calendar-outline" color='grey' size={29} marginLeft={25} marginRight={25} marginTop={16} />
                    <View>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 5 }}>Birthday</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>28/03/2001</Text>
                            <Feather
                                style={{ paddingLeft: 180 }}
                                name="chevron-right"
                                color={Colors.INACTIVE_GREY}
                                size={20} />
                        </View>
                    </View>
                </View>

                <View style={styles.box}>
                    <Ionicons name="mail-outline" color='grey' size={29} marginLeft={25} marginRight={25} marginTop={16} />
                    <View>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 5 }}>Email</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Huybuedue@gmail.com</Text>
                            <Feather
                                style={{ paddingLeft: 100 }}
                                name="chevron-right"
                                color={Colors.INACTIVE_GREY}
                                size={20} />
                        </View>
                    </View>
                </View>

                <View className=" flex-row m-3 w-100" style={styles.box}>
                    <Ionicons name="call-outline" color='grey' size={29} marginLeft={25} marginRight={25} marginTop={16} />
                    <View>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 5 }}>Phone</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>1234567</Text>
                            <Feather
                                style={{ paddingLeft: 200 }}
                                name="chevron-right"
                                color={Colors.INACTIVE_GREY}
                                size={20} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 3,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.SECONDARY_WHITE,
    },
    backgroundCurvedContainer: {
        backgroundColor: Colors.DEFAULT_GREEN,
        height: 2000,
        position: 'absolute',
        top: -1 * (2000 - 230),
        width: 2000,
        borderRadius: 2000,
        alignSelf: 'center',
        zIndex: -1,
    },
    box: {
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    boxInfo: {
        marginTop: 55,
    },
    mainContainer: {
        marginHorizontal: 20,
        marginTop: 40,
        backgroundColor: Colors.DEFAULT_WHITE,
        elevation: 3,
        paddingHorizontal: 20,
        borderRadius: 10,
        paddingBottom: 20,
    },
});
