import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import moduleStyles from "../styles/moduleStyles";
import {Button, Overlay} from "@rneui/base";
import {getData, storeData} from "../../storage";

export default function StatsView() {
    const [overlayVisible, setOverlayVisible] = useState(false);

    const [currentWeight, setCurrentWeight] = useState('0');
    const [goalWeight, setGoalWeight] = useState('0');


    const getWeight = async () => {
        const resCurrentWeight = await getData('currentWeight');
        if (resCurrentWeight) {
            setCurrentWeight(resCurrentWeight)
        }
        const resGoalWeight = await getData('goalWeight');
        if (resGoalWeight) {
            setGoalWeight(resGoalWeight);
        }
    };

    useEffect( () => {
        getWeight();
    }, []);

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    return <View style={styles.statsContainer}>
        <Overlay
            isVisible={overlayVisible}
            onBackdropPress={toggleOverlay}
            overlayStyle={moduleStyles.overlayStyle}
        >
            <Text style={moduleStyles.overlayTitle}>Update your stats</Text>
            <Text style={moduleStyles.overlaySubtitle}>Current Weight</Text>
            <TextInput
                defaultValue={currentWeight}
                onChangeText={(value) => setCurrentWeight(value)}
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: '100%',
                }}
            />
            <Text style={moduleStyles.overlaySubtitle}>Goal Weight</Text>
            <TextInput
                defaultValue={goalWeight}
                onChangeText={(value) => setGoalWeight(value)}
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: '100%',
                }}
            />
            <Button
                onPress={ () => {
                    toggleOverlay();
                    // store weight in storage
                    storeData('currentWeight', currentWeight.toString());
                    storeData('goalWeight', goalWeight.toString());
                }}
                containerStyle={{
                    width: '50%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 20,
                }}
                buttonStyle={moduleStyles.overlayButton}
                titleStyle={moduleStyles.overlayButtonTitle}
            >Update</Button>
        </Overlay>
        <Pressable onPress={() => toggleOverlay()}>
            <View>
                <Text style={styles.statsValue}>{currentWeight} lbs</Text>
                <Text style={styles.statsLabel}>current weight</Text>
            </View>
        </Pressable>

        <Pressable onPress={() => toggleOverlay()}>
            <View>
                <Text style={styles.statsValue}>{goalWeight} lbs</Text>
                <Text style={styles.statsLabel}>goal weight</Text>
            </View>
        </Pressable>
    </View>
}


const styles = StyleSheet.create({
    statsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -100,
        marginBottom: 10,
        padding: 10,
    },
    statsValue: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'KosugiMaru_400Regular',
    },
    statsLabel: {
        textAlign: 'center',
        fontFamily: 'KosugiMaru_400Regular',
    }
})