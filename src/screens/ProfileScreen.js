import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native'
import { Colors } from '../contants';
import { Separator } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons'
import StorageService from '../services/StorageService';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        StorageService.setToken('');
        dispatch(logout())
        navigation.navigate('Signin');
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.DEFAULT_GREEN}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.backgroundCurvedContainer} />
            <View >
                <Ionicons
                />
                <Text></Text>
                <View>
                    <Feather />
                    <View>
                        <Text></Text>
                    </View>
                </View>
            </View>
            <View>
                <View>
                    <Image />
                </View>
                <View>
                    <Text></Text>
                    <Text></Text>
                </View>
            </View>
            <View>
                <TouchableOpacity>
                    <View>
                        <MaterialCommunityIcons />
                    </View>
                    <Text></Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <Text style={styles.sectionHeaderText}>Tài khoản của tôi</Text>
                <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
                    <View style={styles.sectionTextContainer}>
                        <FontAwesome5
                            name="address-card"
                            size={18}
                            color={Colors.DEFAULT_GREEN}
                        />
                        <Text style={styles.sectionText}>
                            Quản lý hồ sơ
                        </Text>
                    </View>
                    <Feather
                        name="chevron-right"
                        color={Colors.INACTIVE_GREY}
                        size={20}
                        onPress={() => navigation.navigate("EditProfile")}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
                    <View style={styles.sectionTextContainer}>
                        <FontAwesome5
                            name="history"
                            size={18}
                            color={Colors.DEFAULT_GREEN}
                        />
                        <Text style={styles.sectionText}>
                            lịch sử đặt chỗ
                        </Text>
                    </View>
                    <Feather
                        name="chevron-right"
                        color={Colors.INACTIVE_GREY}
                        size={20}
                        onPress={() => navigation.navigate("History")}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
                    <View style={styles.sectionTextContainer}>
                        <FontAwesome5
                            name="paper-plane"
                            size={18}
                            color={Colors.DEFAULT_GREEN}
                        />
                        <Text style={styles.sectionText}>
                             Ý kiến đánh giá
                        </Text>
                    </View>
                    <Feather
                        name="chevron-right"
                        color={Colors.INACTIVE_GREY}
                        size={20}
                        onPress={() => navigation.navigate("Report")}
                    />
                </TouchableOpacity>
                <View style={styles.sectionContainer}>
                    <TouchableOpacity
                        style={styles.sectionTextContainer}
                        activeOpacity={0.8}>
                        <FontAwesome5
                            name="sign-out-alt"
                            size={18}
                            color={Colors.DEFAULT_GREEN}
                        />
                        <Text
                            style={styles.sectionText}
                            onPress={handleLogout}
                        >
                            Đăng xuất
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 3,
    },
    headerText: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        color: Colors.DEFAULT_WHITE,
    },
    mainContainer: {
        marginHorizontal: 20,
        marginTop: 10,
        backgroundColor: Colors.DEFAULT_WHITE,
        elevation: 3,
        paddingHorizontal: 20,
        borderRadius: 10,
        paddingBottom: 20,
    },
    sectionHeaderText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_BLACK,
        marginTop: 25,
    },
    sectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    sectionTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        color: Colors.INACTIVE_GREY,
        marginLeft: 10,
    },
    sectionHeaderText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_BLACK,
        marginTop: 25,
    },
    sectionTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionText: {
        fontSize: 13,
        lineHeight: 13 * 1.4,
        color: Colors.INACTIVE_GREY,
        marginLeft: 10,
    },
});

export default ProfileScreen;