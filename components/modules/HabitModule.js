import {Pressable, StyleSheet, Text, View} from "react-native";
import {Icon} from "@rneui/base";
import {COLORS} from "../styles/globalStyles";
import * as React from "react";
import {useState} from "react";
import * as Haptic from "expo-haptics";
import {ImpactFeedbackStyle} from "expo-haptics";

export default function HabitModule({title}) {
    const [count, setCount] = useState(0);

    return <View style={styles.habitContainer}>
        <View style={styles.habitTitleContainer}>
            <Text style={styles.habitTitle}>{title}</Text>
            <Pressable>
                <Icon name={'dots-horizontal'} type="material-community" size={25} />
            </Pressable>
        </View>

        <View style={styles.tracker}>
            <Marker onPress={(isChecked) => setCount(count + (isChecked ? 1 : -1))}/>
            <Marker onPress={(isChecked) => setCount(count + (isChecked ? 1 : -1))}/>
            <Marker onPress={(isChecked) => setCount(count + (isChecked ? 1 : -1))}/>
            <Marker onPress={(isChecked) => setCount(count + (isChecked ? 1 : -1))}/>
            <Marker onPress={(isChecked) => setCount(count + (isChecked ? 1 : -1))}/>
            <Marker onPress={(isChecked) => setCount(count + (isChecked ? 1 : -1))}/>
            <Marker onPress={(isChecked) => setCount(count + (isChecked ? 1 : -1))}/>
        </View>
        <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
                <View style={styles.progress(Math.floor((count / 7) * 100))}></View>
            </View>
            <Text style={styles.progressText}>{Math.floor((count / 7) * 100)}%</Text>
        </View>
    </View>
}

const Marker = ({onPress}) => {
    const [checked, setChecked] = useState(false);
    const onMarkerPress = () => {
        Haptic.selectionAsync(ImpactFeedbackStyle.Heavy);
        setChecked(!checked);
        onPress(!checked);
    }
    return <Pressable
        onPress={onMarkerPress}
    >
        {!checked ?
            <View style={styles.marker}></View>
            :
            <View style={styles.markerChecked}>
                <Icon name={'check'} type="material-community" size={20} color={COLORS.white}/>
            </View>
        }
    </Pressable>
}

const styles = StyleSheet.create({
    habitContainer: {
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 20,
        backgroundColor: COLORS.moduleBackground,
        marginBottom: 20,
    },
    habitTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    habitTitle: {
        fontSize: 18,
    },
    tracker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    marker: {
        width: 25,
        height: 25,
        borderRadius: 25,
        backgroundColor: COLORS.lightGrey,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    markerChecked: {
        width: 25,
        height: 25,
        borderRadius: 25,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: COLORS.black,
    },
    progressBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    progressBar: {
        backgroundColor: COLORS.lightGrey,
        height: 10,
        borderRadius: 10,
        width: '88%',
    },
    progress: (progress) => ({
        backgroundColor: COLORS.black,
        height: 10,
        borderRadius: 10,
        width: `${progress}%`,
    }),
    progressText: {
        color: COLORS.grey,
    }
});
