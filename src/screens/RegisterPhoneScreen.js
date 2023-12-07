import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, TextInput, FlatList, SafeAreaView } from "react-native";
import { Colors, CountryCode, Images } from "../contants";
import Ionicons from "react-native-vector-icons/Ionicons"
import Separator from "../components/Separator";
import { Display } from "../utils";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { StaticImagaService } from "../services";
import { FlagItem } from "../components";

const getDropdownStyle = (y) => ({ ...styles.countryDropdown, top: y + 60 });

const RegisterPhoneScreen = ({ navigation }) => {
    const [selectedCountry, setselectedCountry] = useState(
        CountryCode.find(country => country.name === 'India'),
    );
    const [inputsContainerY, setInputsContainerY] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownLayout, setDropdownLayout] = useState({});
    const [phoneNumber, setPhoneNumber] = useState('');

    const closeDropdown = (pageX, pageY) => {
        if (isDropdownOpen) {
            if (
                pageX < dropdownLayout?.x ||
                pageX > dropdownLayout?.x + dropdownLayout?.width ||
                pageY < dropdownLayout?.y ||
                pageY > dropdownLayout?.y + dropdownLayout?.height
            ) {
                setIsDropdownOpen(false);
            }
        }
    };
    return (
        <SafeAreaView style={styles.container}
            onStartShouldSetResponder={({ nativeEvent: { pageX, pageY } }) => closeDropdown(pageX, pageY)}
        >
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            <View style={styles.headerContainer}>
                <Ionicons
                    name="arrow-back-outline"
                    size={30}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerTitle}>Đăng Kí Số Điện Thoại</Text>
            </View>
            <Text style={styles.title}>Đăng Kí Số Điện Thoại.</Text>
            <Text style={styles.content}>
                Vui lòng nhập số điện thoại của bạn vào đây.
            </Text>
            <View style={styles.inputsContainer}
                onLayout={({
                    nativeEvent: { layout: { y } }
                }) => setInputsContainerY(y)}>
                <TouchableOpacity style={styles.countryListContainer}
                    onPress={() => setIsDropdownOpen(!isDropdownOpen)} >
                    <Image
                        source={{ uri: StaticImagaService.getFlagIcon(selectedCountry.code) }}
                        style={styles.flatIcon}
                    />
                    <Text tyle={styles.countryCodeText}>
                        {selectedCountry.dial_code}</Text>
                    <MaterialIcons name="keyboard-arrow-down" size={18} />
                </TouchableOpacity>
                <View style={styles.phoneInputContainer}>
                    <TextInput
                        placeholder="Số điện thoại"
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        keyboardType="number-pad"
                        style={styles.inputText}
                        onChangeText={(text) => setPhoneNumber(selectedCountry?.dial_code + text)}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.siginButton}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Verification', { phoneNumber })}>
                <Text
                    style={styles.signinButtonText}>
                    Tiếp Tục
                </Text>
            </TouchableOpacity>
            {isDropdownOpen && (
                <View style={getDropdownStyle(inputsContainerY)}
                    onLayout={({
                        nativeEvent: {
                            layout: { x, y, height, width },
                        },
                    }) => setDropdownLayout({ x, y, height, width })}
                >
                    <FlatList
                        data={CountryCode}
                        keyExtractor={(item) => item.code}
                        renderItem={({ item }) => <FlagItem
                            {...item}
                            onPress={(country) => {
                                setselectedCountry(country)
                                setIsDropdownOpen(false)
                            }} />}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 10,
    },
    headerTitle: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        lineHeight: 20 * 1.4,
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    content: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20,
    },
    inputsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 50,
    },
    countryListContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        width: Display.setWidth(22),
        marginRight: 10,
        borderRadius: 8,
        height: Display.setHeight(6),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        flexDirection: 'row',
    },
    phoneInputContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        width: Display.setWidth(22),
        paddingHorizontal: 10,
        marginRight: 10,
        borderRadius: 8,
        height: Display.setHeight(6),
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        flex: 1,
    },
    flatIcon: {
        height: 20,
        width: 20,
    },
    countryCodeText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_BLACK,
    },
    countryDropdown: {
        backgroundColor: Colors.LIGHT_GREY,
        position: 'absolute',
        width: Display.setWidth(80),
        height: Display.setHeight(50),
        marginLeft: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        zIndex: 3,
    },
    siginButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        marginHorizontal: 20,
        borderRadius: 8,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center', siginButton: {
            backgroundColor: Colors.DEFAULT_GREEN,
            marginHorizontal: 20,
            borderRadius: 8,
            height: Display.setHeight(6),
            justifyContent: 'center',
            alignItems: 'center',
        },
        signinButtonText: {
            fontSize: 18,
            lineHeight: 18 * 1.4,
            color: Colors.DEFAULT_WHITE,
        },
    },
    signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
    },
});

export default RegisterPhoneScreen;