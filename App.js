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


export default function App() {
    let [fontsLoaded] = useFonts({
        KosugiMaru_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }


    return (
        <ScrollView style={styles.container}>
            <Button onPress={() => storeData(getCurrentDate(), "{}")}>
                Test store data
            </Button>

            {/*<Button onPress={() => getData('dailyStepCountGoal')}>*/}
            {/*    Test get data*/}
            {/*</Button>*/}

            <View style={styles.dateWrapper}>
                <Text style={styles.dateLabel}>{getCurrentDate()}
                </Text>
            </View>

            <Image
                style={styles.backgroundImage}
                source={require('./assets/fox.png')}
            />

            <StatsView />

            <View style={styles.chatContainer}>
                <Text style={styles.chatText}>Hi Dora! Have you tracked your meals today yet?</Text>
            </View>

            <WaterIntakeModule />
            <StepCountModule />
            <MealsModule/>
            {/*<Module name="Daily step count"/>*/}
            {/*<Module name="Daily step count"/>*/}
            <StatusBar style="auto"/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 16,
    },
    backgroundImage: {
        width: '100%',
        height: 250,
    },
    container: {
        backgroundColor: '#E6CEB5',
        flexDirection: 'column',
        paddingTop: 50,
        paddingBottom: 200,
        gap: 20,
    },
    dateWrapper: {
        backgroundColor: '#FAF7F0',
        borderRadius: 15,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
        // width: '50%',
        marginBottom: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    dateLabel: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 16,
        textAlign: 'center',

    },
    chatContainer: {
        backgroundColor: '#2B2B2B',
        borderRadius: 15,

        padding: 15,
        width: '80%',
        marginBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    chatText: {
        fontFamily: 'KosugiMaru_400Regular',
        color: '#FFFFFF',
    },
});
