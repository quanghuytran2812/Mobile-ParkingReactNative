import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
    PirstScreen,
    SigninScreen,
    SignupScreen,
    ForgotPasswordScreen,
    RegisterPhoneScreen,
    VerificationScreen,
    GoogleMapScreen,
    VehicleScreen,
    ProfileScreen,
    DateTimeScreen,
    BookingScreen,
    PaymentScreen,
    EditProfileScreen,
    HistoryScreen,
    ReportScreen,
    TicketScreen,
    VnPayScreen,
    ResetPasswordScreen
} from "../screens";
import GoogleMap from "./BottomTabs"
// import FlashMessage from "react-native-flash-message";
const Stack = createStackNavigator();
const Navigators = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Pirst" component={PirstScreen} />
                <Stack.Screen name="Signin" component={SigninScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
                <Stack.Screen name="Verification" component={VerificationScreen} />
                <Stack.Screen name="GoogleMap" component={GoogleMap} />
                <Stack.Screen name="Vehicle" component={VehicleScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="DateTime" component={DateTimeScreen} />
                <Stack.Screen name="Booking" component={BookingScreen} />
                <Stack.Screen name="Payment" component={PaymentScreen} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                <Stack.Screen name="History" component={HistoryScreen} />
                <Stack.Screen name="Report" component={ReportScreen} />
                <Stack.Screen name="Ticket" component={TicketScreen} />
                <Stack.Screen name="VnPay" component={VnPayScreen} />
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigators;