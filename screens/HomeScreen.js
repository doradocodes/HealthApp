import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {getCurrentDate} from "../utils/dateUtils";
import StatsView from "../components/modules/StatsView";
import WaterIntakeModule from "../components/modules/WaterIntakeModule";
import StepCountModule from "../components/modules/StepCountModule";
import MealsModule from "../components/modules/MealsModule";
import {StatusBar} from "expo-status-bar";
import * as React from "react";
import {useEffect} from "react";
import * as Haptics from "expo-haptics";

export default function HomeScreen({ navigation }) {
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            Haptics.selectionAsync();
        });

        return unsubscribe;
    }, [navigation]);

    return <ScrollView style={styles.container}>
        <View style={styles.dateWrapper}>
            <Pressable onPress={() => navigation.navigate('Overview')}>
                <Text style={styles.dateLabel}>{getCurrentDate()}</Text>
            </Pressable>
        </View>

        {/*<Image*/}
        {/*    style={styles.backgroundImage}*/}
        {/*    source={require('./../assets/fox.png')}*/}
        {/*/>*/}

        <StatsView />

        <View style={styles.chatContainer}>
            <Text style={styles.chatText}>Hi Dora! Have you tracked your meals today yet?</Text>
        </View>

        <WaterIntakeModule />
        <StepCountModule />
        <MealsModule/>
        <StatusBar style="auto"/>
    </ScrollView>
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
        paddingTop: 100,
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
