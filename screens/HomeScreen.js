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
import {Icon} from "@rneui/base";
import globalStyles, {COLORS} from "../components/styles/globalStyles";

export default function HomeScreen({ navigation }) {
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            Haptics.selectionAsync();
        });

        return unsubscribe;
    }, [navigation]);

    return <View>
        <ScrollView style={styles.container}>

            <View style={globalStyles.dateWrapper}>
                <Text style={globalStyles.dateLabel}>{formatDate(getCurrentDate())}</Text>
            </View>

            <StatsView />

            <View style={styles.chatContainer}>
                <Text style={styles.chatText}>Hi Dora! Have you tracked your meals today yet?</Text>
            </View>

            <WaterIntakeModule />
            <StepCountModule />
            <MealsModule/>
            {/*<StatusBar style="auto"/>*/}
        </ScrollView>
        <ImageBackground source={require('./../assets/2d351f0091d46a9d6440ad3b34760350.jpg')} resizeMode="stretch" style={globalStyles.backgroundImage} />
    </View>
}

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 16,
    },

    container: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        paddingTop: 50,
        paddingBottom: 200,
        gap: 20,
    },
    chatContainer: {
        backgroundColor: COLORS.black,
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
