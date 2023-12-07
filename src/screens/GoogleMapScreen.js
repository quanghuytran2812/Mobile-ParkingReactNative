import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    Linking,
    SafeAreaView,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";
import { COLORS, SIZES, GOOGLE_API_KEY, Images } from "../contants";
import * as Location from 'expo-location';
import { useState } from "react";
import { Colors } from "../contants";

const GoogleMapScreen = ({ navigation }) => {
    const mapView = React.useRef()
    const [streetName, setStreetName] = React.useState("")
    const [fromLocation, setFromLocation] = React.useState(null)
    const [toLocation, setToLocation] = React.useState(null)
    const [region, setRegion] = React.useState(null)

    const [duration, setDuration] = React.useState(7)
    const [isReady, setIsReady] = React.useState(false)
    const [angle, setAngle] = React.useState(0)
    const [isReadB, setIsReadB] = useState(false);
    const [origin, setOrigin] = useState({
        latitude: 15.9684812,
        longitude: 108.2605568
    });
    React.useEffect(() => {
        getLocaltionPermisson();
    }, [origin]);

    async function getLocaltionPermisson() {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            const current = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            };
            setOrigin(current);
        }

    }

    async function getLocationData() {
        let fromLoc = {
            latitude: origin.latitude,
            longitude: origin.longitude,
        };
        let toLoc = {
            latitude: 16.056120388735188,
            longitude: 108.1731154803814,
        };
        let street = "Bến Xe Trung Tâm TP Đà Nẵng";

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
        };

        setStreetName(street);
        setFromLocation(fromLoc);
        setToLocation(toLoc);
        setRegion(mapRegion);
    }

    React.useEffect(() => {
        getLocationData();
    }, [origin]);

    function calculateAngle(coordinates) {
        let startLat = coordinates[0]["latitude"]
        let startLng = coordinates[0]["longitude"]
        let endLat = coordinates[1]["latitude"]
        let endLng = coordinates[1]["longitude"]
        let dx = endLat - startLat
        let dy = endLng - startLng

        return Math.atan2(dy, dx) * 180 / Math.PI
    }

    function makePhoneCall() {
        const url = 'tel://0915879171';
        Linking.openURL(url);
    }

    function zoomIn() {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    function zoomOut() {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }


    function renderMap() {
        const destinationMarker = () => (
            <Marker
                coordinate={toLocation}
                onPress={() => setIsReadB(false)}
            >
                <View
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white'
                    }}
                >
                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#02aab0'
                        }}
                    >
                        <Image
                            source={Images.PIN}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: 'white'
                            }}
                        />
                    </View>
                </View>
            </Marker>
        )

        const carIcon = () => (
            <>
                {fromLocation !== null ?
                    (
                        <Marker
                            coordinate={fromLocation}
                            anchor={{ x: 0.5, y: 0.5 }}
                            flat={true}
                            rotation={angle}
                        >
                            <Image
                                source={Images.CAR}
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                            />
                        </Marker>
                    ) : ''
                }
            </>
        )

        return (
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapView}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                    style={{ flex: 1 }}
                    showsPointsOfInterest={true}
                    showsTraffic={true}
                >
                    <MapViewDirections
                        origin={fromLocation}
                        destination={toLocation}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        strokeColor={Colors.DEFAULT_GREEN}
                        optimizeWaypoints={true}
                        onReady={result => {
                            setDuration(result.duration)

                            if (!isReady) {
                                // Fit route into maps
                                mapView.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (SIZES.width / 20),
                                        bottom: (SIZES.height / 4),
                                        left: (SIZES.width / 20),
                                        top: (SIZES.height / 8)
                                    }
                                })

                                // Reposition the car
                                let nextLoc = {
                                    latitude: result.coordinates[0]["latitude"],
                                    longitude: result.coordinates[0]["longitude"]
                                }

                                if (result.coordinates.length >= 2) {
                                    let angle = calculateAngle(result.coordinates)
                                    setAngle(angle)
                                }

                                setFromLocation(nextLoc)
                                setIsReady(true)
                            }
                        }}
                    />
                    {destinationMarker()}
                    {carIcon()}
                </MapView>
            </View>
        )
    }

    function renderDestinationHeader() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 50,
                    left: 0,
                    right: 0,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: SIZES.width * 0.9,
                        paddingVertical: SIZES.padding,
                        paddingHorizontal: SIZES.padding * 2,
                        borderRadius: SIZES.radius,
                        backgroundColor: 'white'
                    }}
                >
                    <Image
                        source={Images.RED}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: SIZES.padding
                        }}
                    />

                    <View style={{ flex: 1 }}>
                        <Text>{streetName}</Text>
                    </View>

                    <Text>{Math.ceil(duration)} mins</Text>
                </View>
            </View>
        )
    }

    function renderDeliveryInfo() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: isReadB ? 'none' : 'block'
                }}
            >
                <View
                    style={{
                        width: SIZES.width * 0.9,
                        paddingVertical: SIZES.padding * 3,
                        paddingHorizontal: SIZES.padding * 2,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.white
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Avatar */}
                        <Image
                            source={Images.BENXE}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25
                            }}
                        />

                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={{ fontWeight: 600, marginTop: 10 }}>Bến Xe Trung Tâm TP Đà Nẵng</Text>
                            <Text style={{ color: COLORS.darkgray }}>Tôn Đức Thắng, Hoà Minh, Liên Chiểu, Đà Nẵng</Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.padding * 2,
                            justifyContent: 'space-between'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                height: 50,
                                borderRadius: 15,
                                marginRight: 10,
                                backgroundColor: '#02aab0',
                                shadowColor: '#000',
                                shadowOffset: { width: 4, height: 5 },
                                shadowOpacity: 0.27,
                                elevation: 4,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => makePhoneCall()}
                        >
                            <Text style={{
                                color: '#fcfcfc',
                                fontSize: 18,
                                lineHeight: 22
                            }}>Gọi</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flex: 1,
                                height: 50,
                                borderRadius: 15,
                                marginRight: 10,
                                backgroundColor: Colors.DEFAULT_GREY,
                                shadowColor: '#000',
                                shadowOffset: { width: 4, height: 5 },
                                shadowOpacity: 0.27,
                                elevation: 4,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => setIsReadB(true)}
                        >
                            <Text style={{
                                color: '#fcfcfc',
                                fontSize: 18,
                                lineHeight: 22
                            }}>Hủy</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    function renderButtons() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: SIZES.height * 0.35,
                    right: SIZES.padding * 2,
                    width: 60,
                    height: 130,
                    justifyContent: 'space-between'
                }}
            >
                {/* Zoom In */}
                <TouchableOpacity
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => zoomIn()}
                >
                    <Text>+</Text>
                </TouchableOpacity>

                {/* Zoom Out */}
                <TouchableOpacity
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => zoomOut()}
                >
                    <Text>-</Text>
                </TouchableOpacity>
            </View>

        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {renderMap()}
            {renderDestinationHeader()}
            {renderDeliveryInfo()}
            {renderButtons()}
        </SafeAreaView>
    )
}

export default GoogleMapScreen;