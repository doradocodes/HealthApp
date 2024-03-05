import {ScrollView, StyleSheet, Switch, Text, TextInput, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import * as Haptics from "expo-haptics";
import {Button, Icon} from "@rneui/base";
import globalStyles, {COLORS} from "../components/styles/globalStyles";
import HabitModule from "../components/modules/HabitModule";
import BottomSheet from "../components/BottomSheet/BottomSheet";
import {getData, storeData, updateData} from "../storage";
import {setLocalData} from "../utils/dataUtils";


export default function HabitsScreen({navigation}) {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            Haptics.selectionAsync();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getData('habits').then((res) => {
            console.log('habits', res);
            if (res) {
                const habits = JSON.parse(res);
                setHabits(habits);
                // updateData('habits', JSON.stringify([]));
            }
        });
    }, []);

    return <View style={styles.screen}>
        <ScrollView style={styles.container}>
            <Text style={styles.h1Text}>March</Text>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => setIsBottomSheetVisible(true)}
                    buttonStyle={globalStyles.button()}
                    titleStyle={globalStyles.buttonTitle}
                    icon={<Icon name="plus" type="material-community" size={20} color={COLORS.white}
                                style={globalStyles.buttonIcon}/>}
                >New Habit</Button>
            </View>

            <View style={styles.calendar}>
                <View style={styles.weekHeader}>
                    <View style={styles.dayHeader}>
                        <Text style={styles.dayHeaderWeekday}>Mon</Text>
                        <Text style={styles.dayHeaderDate}>30</Text>
                    </View>
                    <View style={styles.dayHeader}>
                        <Text style={styles.dayHeaderWeekday}>Tue</Text>
                        <Text style={styles.dayHeaderDate}>2</Text>
                    </View>
                    <View style={styles.dayHeader}>
                        <Text style={styles.dayHeaderWeekday}>Wed</Text>
                        <Text style={styles.dayHeaderDate}>3</Text>
                    </View>
                    <View style={styles.dayHeader}>
                        <Text style={styles.dayHeaderWeekday}>Thu</Text>
                        <Text style={styles.dayHeaderDate}>4</Text>
                    </View>
                    <View style={styles.dayHeader}>
                        <Text style={styles.dayHeaderWeekday}>Fri</Text>
                        <Text style={styles.dayHeaderDate}>5</Text>
                    </View>
                    <View style={styles.dayHeader}>
                        <Text style={styles.dayHeaderWeekday}>Sat</Text>
                        <Text style={styles.dayHeaderDate}>6</Text>
                    </View>
                    <View style={styles.dayHeader}>
                        <Text style={styles.dayHeaderWeekday}>Sun</Text>
                        <Text style={styles.dayHeaderDate}>7</Text>
                    </View>
                </View>
            </View>

            {habits.map((habit, index) => {
                return <HabitModule key={index} title={habit}/>
            })}
        </ScrollView>
        <BottomSheet isVisible={isBottomSheetVisible} setIsVisible={setIsBottomSheetVisible}>
            <HabitForm
                onClose={() => setIsBottomSheetVisible(false)}
            />
        </BottomSheet>
    </View>
}

const HabitForm = ({onClose}) => {
    const [name, setName] = useState('');
    const [weeklyGoal, setWeeklyGoal] = useState('');
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
    const onSubmit = async () => {
        // get all habits (if it exists)
        // const allHabits = await getData('habits');
        // if (!allHabits) {
        //     await storeData('habits', JSON.stringify([name]));
        // } else {
        //     const habits = JSON.parse(allHabits);
        //     habits.push(name);
        //     await storeData('habits', JSON.stringify(habits));
        // }
        //
        // const data = {
        //     // name: name,
        //     weeklyGoal: weeklyGoal,
        //     isNotificationsEnabled: isNotificationsEnabled,
        //     dates: [],
        // };
        // await storeData(`habit-${name}`, JSON.stringify(data));
        onClose();
    }
    return <View>
        <Text style={formStyles.title}>New Habit</Text>
        <View style={formStyles.module}>
            <View style={formStyles.row()}>
                <Text style={formStyles.label}>Name</Text>
                <TextInput
                    style={formStyles.input}
                    placeholder="Enter a name"
                    onChange={(e) => {
                        const value = e.nativeEvent.text;
                        setName(value);
                    }}
                />
            </View>
            <View style={formStyles.row()}>
                <Text style={formStyles.label}>Weekly goal</Text>
                <View style={formStyles.innerRow}>
                    <TextInput
                        style={formStyles.numberInput}
                        placeholder="Enter percentage"
                        keyboardType="numeric"
                        onChange={(e) => {
                            const value = e.nativeEvent.text;
                            setWeeklyGoal(value);
                        }}
                    />
                    <Text>%</Text>
                </View>

            </View>
            <View style={formStyles.row(true)}>
                <Text style={formStyles.label}>Turn on notifications?</Text>
                <Switch
                    trackColor={{false: COLORS.lightGrey, true: COLORS.black}}
                    thumbColor={isNotificationsEnabled ? COLORS.white : '#f4f3f4'}
                    onValueChange={setIsNotificationsEnabled}
                    value={isNotificationsEnabled}
                />
            </View>
        </View>
        <Button
            onPress={onSubmit}
            buttonStyle={globalStyles.button(true)}
            titleStyle={globalStyles.buttonTitle}
        >Done</Button>
    </View>
}

const formStyles = StyleSheet.create({
    module: {
        backgroundColor: COLORS.white,
        borderRadius: 15,
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 20,
    },
    row: (isLastChild = false) => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: isLastChild ? 0 : 1,
        borderBottomColor: COLORS.lightGrey,
        paddingTop: 10,
        paddingBottom: 10,
        minHeight: 50,
    }),
    innerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
    },
    label: {
        ...globalStyles.baseText,
    },
    input: {
        fontSize: 16,
        minWidth: 40,
    },
    numberInput: {
        fontSize: 16,
        minWidth: 20,
    },
});

const styles = StyleSheet.create({
    screen: {
        backgroundColor: COLORS.backgroundColor,
    },
    baseText: {
        fontSize: 16,
    },
    h1Text: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        paddingTop: 70,
        paddingBottom: 200,
        paddingRight: 15,
        paddingLeft: 15,
        gap: 20,
        minHeight: '100%',
    },
    calendar: {
        marginTop: 10,
    },
    weekHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        width: '14.3%',
    },
    dayHeaderWeekday: {
        color: COLORS.grey,
    },
    dayHeaderDate: {
        fontSize: 20,
        color: COLORS.grey,
        fontWeight: 'bold',
    },

});
