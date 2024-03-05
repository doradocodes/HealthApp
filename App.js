import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import * as React from "react";
import { useFonts, KosugiMaru_400Regular } from '@expo-google-fonts/kosugi-maru';
import MealsModule from "./components/modules/MealsModule";
import WaterIntakeModule from "./components/modules/WaterIntakeModule";
import StepCountModule from "./components/modules/StepCountModule";
import StatsView from "./components/modules/StatsView";
import {Button, Icon} from "@rneui/base";
import {getData, storeData} from "./storage";
import {getCurrentDate} from "./utils/dateUtils";
import {useEffect, useState} from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import OverviewScreen from "./screens/OverviewScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Haptics from "expo-haptics";
import SettingsScreen from "./screens/SettingsScreen";
import {COLORS} from "./components/styles/globalStyles";
import {Nunito_800ExtraBold, Nunito_600SemiBold} from "@expo-google-fonts/nunito";
import HabitsScreen from "./screens/HabitsScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
    let [fontsLoaded] = useFonts({
        Nunito_800ExtraBold,
        Nunito_600SemiBold
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        [
            <NavigationContainer>
                {/*<Stack.Navigator*/}
                {/*    screenOptions={{*/}
                {/*        headerShown: false*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Stack.Screen*/}
                {/*        name="Home"*/}
                {/*        component={HomeScreen}*/}
                {/*        // options={{title: 'Welcome'}}*/}
                {/*    />*/}
                {/*    <Stack.Screen*/}
                {/*        name="Overview"*/}
                {/*        component={OverviewScreen}*/}
                {/*        options={{*/}
                {/*            // gestureDirection: 'vertical',*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Stack.Navigator>*/}
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: COLORS.navColor,
                            paddingTop: 10,
                        }
                    }}

                >
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            ...tabOptions,
                            tabBarIcon: ({ color, size }) => (
                                <Icon name={'home'} color={COLORS.black} size={25} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Habits"
                        component={HabitsScreen}
                        options={{
                            ...tabOptions,
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="layers" color={COLORS.black} size={25} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{
                            ...tabOptions,
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="settings" color={COLORS.black} size={25} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>,

        ]
    );
}

const tabOptions = {
    tabBarLabelStyle: {
        color: COLORS.black,
        fontSize: 10,
        marginBottom: 5,

    },
    tabBarIconStyle: {
        size: 15,
    }
}
