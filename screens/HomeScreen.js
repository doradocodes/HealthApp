import {Dimensions, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {formatDate, getCurrentDate} from "../utils/dateUtils";
import StatsView from "../components/modules/StatsView";
import WaterIntakeModule from "../components/modules/WaterIntakeModule";
import StepCountModule from "../components/modules/StepCountModule";
import MealsModule from "../components/modules/MealsModule";
import {StatusBar} from "expo-status-bar";
import * as React from "react";
import {useEffect} from "react";
import * as Haptics from "expo-haptics";
import {Button, Icon, Overlay} from "@rneui/base";
import globalStyles, {COLORS} from "../components/styles/globalStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import moduleStyles from "../components/styles/moduleStyles";
import moment from "moment";
import {getData} from "../storage";
import {avatarImages} from "../utils/imageUtils";
import {getAppleHealthData} from "../utils/appleHealthUtils";
import DrawerModule from "../components/DrawerModule/DrawerModule";


export default function HomeScreen({ navigation }) {
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            Haptics.selectionAsync();
        });

        return unsubscribe;
    }, [navigation]);

    return <View style={styles.screen}>
        <ScrollView style={styles.container}>
            <Text style={styles.h1Text}>Habits</Text>

            <DrawerModule title="Habits">
                <Text>Habits</Text>
            </DrawerModule>

            <DrawerModule title="Stats">
                <Text>Stats</Text>
            </DrawerModule>

            <DrawerModule title="Mood">
                <Text>Mood</Text>
            </DrawerModule>
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: COLORS.backgroundColor,
    },
    baseText: {
        fontSize: 16,
    },
    h1Text: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    container: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        paddingTop: 70,
        paddingBottom: 200,
        paddingRight: 15,
        paddingLeft: 15,
        gap: 20,
    },
});
