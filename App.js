import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import * as React from "react";
import { useFonts, KosugiMaru_400Regular } from '@expo-google-fonts/kosugi-maru';
import MealsModule from "./components/modules/MealsModule";
import WaterIntakeModule from "./components/modules/WaterIntakeModule";
import StepCountModule from "./components/modules/StepCountModule";
import StatsView from "./components/modules/StatsView";
import {Button} from "@rneui/base";
import {getData, storeData} from "./storage";
import {getCurrentDate} from "./utils/dateUtils";
import {useEffect, useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import OverviewScreen from "./screens/OverviewScreen";

const Stack = createNativeStackNavigator();



export default function App() {
    let [fontsLoaded] = useFonts({
        KosugiMaru_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    // options={{title: 'Welcome'}}
                />
                <Stack.Screen
                    name="Overview"
                    component={OverviewScreen}
                    options={{
                        // gestureDirection: 'vertical',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

