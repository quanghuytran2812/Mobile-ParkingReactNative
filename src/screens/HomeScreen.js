import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    FlatList,
    Platform,
    Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryGuest } from '../store/categorySlice';
import { Images } from '../contants';

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const listCategory = useSelector((state) => state.category.listGuest);
    const [selectedCategory, setSelectedCategory] = useState(null);

    function onSelectCategory(category) {
        setSelectedCategory(category);
        navigation.navigate('DiagramParkingHome', category.vehicleCategoryId);
    }

    useEffect(() => {
        dispatch(fetchCategoryGuest());
    }, [dispatch]);

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50, marginTop: Platform.OS == "android" ? 50 : 0 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        height: "100%",
                        paddingLeft: 10 * 2,
                        justifyContent: 'center'
                    }}
                >
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        width: "70%",
                        height: "90%",
                        backgroundColor: "#EFEFF1",
                        alignItems: "center",
                        justifyContent: 'center',
                        borderRadius: 30,
                    }}>
                        <Text style={{
                            fontSize: 14, lineHeight: 22, fontWeight: '400', fontStyle: 'italic'
                        }}>
                            Bến Xe Trung Tâm Đà Nẵng
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={{
                    width: 50,
                    height: "100%",
                    paddingRight: 10 * 2,
                    justifyContent: "center"
                }}>
                    <Image
                        source={{
                            uri: Images.LOCATION,
                        }}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        marginLeft: 10,
                        padding: 10,
                        paddingBottom: 10 * 2,
                        backgroundColor: (selectedCategory?.vehicleCategoryId === item.vehicleCategoryId ? '#02aab0' : "#FFFFFF"),
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View style={{
                        backgroundColor: (selectedCategory?.vehicleCategoryId === item.vehicleCategoryId ? "#FFFFFF" : "#F5F5F6"),
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: "center"
                    }}>
                        <Image
                            source={Images.CARUP}
                            resizeMode="contain"
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                    </View>
                    <Text style={{
                        color: (selectedCategory?.vehicleCategoryId === item.vehicleCategoryId ? '#FFFFFF' : "#000"),
                        marginTop: 10,
                        fontSize: 12,
                        lineHeight: 22,
                        fontWeight: "bold"
                    }}>{item.vehicleCategoryName} chỗ</Text>

                </TouchableOpacity>
            )
        }
        return (
            <View style={{ padding: 10 * 2 }}>
                <Text style={{ fontSize: 25, lineHeight: 36, fontWeight: '700' }}>Tìm loại xe của bạn</Text>
                <FlatList
                    data={listCategory}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.vehicleCategoryId}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: 10 * 2 }}

                />
            </View>
        )
    }

    function renderBusInfo() {

        return (
            <>
                <SafeAreaView style={{
                    paddingHorizontal: 20,
                    paddingBottom: 30,
                }}>
                    <View style={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-between',
                        shadowColor: '#000',
                        shadowOffset: { width: 4, height: 5 },
                        shadowOpacity: 0.27,
                        shadowRadius: -3,
                        elevation: 4,
                        paddingBottom: 30,
                        borderRadius: 30
                    }}>
                        <View>
                            <Image
                                source={Images.BENXE}
                                resizeMode="cover"
                                style={{
                                    width: "100%",
                                    height: 200,
                                    borderRadius: 30
                                }}
                            />

                            <View style={{
                                position: "absolute",
                                bottom: 0,
                                height: 50,
                                width: 80,
                                backgroundColor: '#FFFFFF',
                                borderTopRightRadius: 30,
                                borderBottomLeftRadius: 30,
                                alignItems: "center",
                                justifyContent: 'center',
                            }}>
                                <Image
                                    source={{
                                        uri: Images.NEARBY,
                                    }}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30
                                    }}
                                />
                            </View>
                        </View>

                        {/* BUS Info */}
                        <View style={{
                            marginTop: 10,
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: 20, lineHeight: 30 }}>Bến Xe Trung Tâm Đà Nẵng</Text>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 10,
                            }}>
                                <Image
                                    source={{ uri: Images.STAR }}
                                    resizeMode="contain"
                                    style={{
                                        height: 20,
                                        width: 20,
                                        tintColor: '#02aab0',
                                        marginRight: 10
                                    }}

                                />
                                <Text style={{ fontSize: 16, lineHeight: 22 }}>4.7</Text>
                            </View>
                            <Text style={{
                                fontSize: 12,
                                paddingHorizontal: 20,
                                paddingTop: 10,
                                color: 'grey',
                                textAlign: 'center'
                            }}>
                                Đến Đà Nẵng, ngoài việc đi bằng máy bay, tàu hỏa thì xe khách cũng là phương tiện được rất nhiều du khách lựa chọn,
                                ở các bến xe Đà Nẵng bạn có thể tìm cho mình rất nhiều các nhà xe với những lộ trình đi tới nhiều tỉnh thành trên cả nước,
                                điều đó khiến xe khách trở thành một trong những phương tiện đem lại sự thuận tiện cho những chuyến đi xa.
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
            </>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMainCategories()}
            {renderBusInfo()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F9"
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})
export default HomeScreen;