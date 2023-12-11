import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { VehicleScreen, ProfileScreen } from "../screens";
import { FontAwesome5 } from '@expo/vector-icons'

const BottomTabs = createBottomTabNavigator()

export default () => (
    <BottomTabs.Navigator
        screenOptions={{ headerShown: false }}>
        <BottomTabs.Screen name="Đặt chỗ"
            component={VehicleScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <FontAwesome5 name="parking" size={23} color={focused ? '#02aab0' : '#000'} />
                )
            }}
        />
        <BottomTabs.Screen name="Hồ Sơ"
            component={ProfileScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <FontAwesome5 name="user-alt" size={23} color={focused ? '#02aab0' : '#000'} />
                )
            }}
        />
    </BottomTabs.Navigator>
);