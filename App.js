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


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
    let [fontsLoaded] = useFonts({
        KosugiMaru_400Regular,
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
                            backgroundColor: COLORS.moduleBackground,
                            // borderRadius: 30,
                            // margin: 5,
                        }
                    }}

                >
                    <Tab.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            ...tabOptions,
                            tabBarIcon: ({ color, size }) => (
                                <Icon name={'home'} type="font-awesome" color={COLORS.black} size={20} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Overview"
                        component={OverviewScreen}
                        options={{
                            ...tabOptions,
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="bar-chart" type="font-awesome" color={COLORS.black} size={20} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{
                            ...tabOptions,
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="cog" type="font-awesome" color={COLORS.black} size={20} />
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
        fontFamily: 'KosugiMaru_400Regular',
        color: COLORS.black,
        fontSize: 10,
        marginBottom: 5,
    },
    tabBarIconStyle: {
        size: 15,
    }
}