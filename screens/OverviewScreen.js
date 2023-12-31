import {View, Text, ScrollView, StyleSheet, Pressable, ImageBackground} from "react-native";
import {Button, Icon} from "@rneui/base";
import globalStyles, {COLORS} from "../components/styles/globalStyles";
import {getData} from "../storage";
import {useEffect, useState} from "react";
import {formatDate, getCurrentDate} from "../utils/dateUtils";
import * as Haptics from "expo-haptics";
import {Calendar, CalendarList} from "react-native-calendars";
import moduleStyles from "../components/styles/moduleStyles";
import * as React from "react";
import Trophies from "../components/Trophies";
import moment from "moment";
import {getLocalData} from "../utils/dataUtils";

const getMarkedDataObj = (dateObj) => {
    const date = dateObj.format('YYYY-MM-DD');

    return {
        [date]: {
            selected: true,
            selectedColor: '#ccc',
            // selectedTextColor: '#000',
        }
    }
}
export default function OverviewScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [markedDates, setMarkedDates] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [waterIntakeGoal, setDailyWaterIntakeGoal] = useState(0);
    const [stepsGoal, setStepsGoal] = useState(0);

    const refreshData = () => {
        getLocalData(selectedDate)
            .then((res) => {
                setData(res);
                setIsDataLoaded(true);
            });
    }

    const getWaterGoal = async () => {
        const res1 = await getData('dailyWaterIntakeGoal');
        if (res1 && parseInt(res1)) {
            setDailyWaterIntakeGoal(parseInt(res1));
        }
    };

    const getStepGoal = async () => {
        const res1 = await getData('dailyStepCountGoal');
        if (res1 && parseInt(res1)) {
            setStepsGoal(parseInt(res1));
        }
    };

    useEffect(() => {
        if (!isDataLoaded) {
            refreshData();
            getWaterGoal();
            getStepGoal();
            setMarkedDates(getMarkedDataObj(selectedDate));
        }
    }, [isDataLoaded]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            Haptics.selectionAsync();
        });

        return unsubscribe;
    }, [navigation]);

    const isGoalReached = (value, goal) => {
        if (parseInt(value) >= parseInt(goal)) {
            return <View style={globalStyles.flexContainer}>
                <Text>
                    <Icon name="check" type="font-awesome" color={COLORS.green} size={20}/>
                </Text>
                <Text style={globalStyles.baseText}>{value} / {goal}</Text>
            </View>;
        }
        return <View style={globalStyles.flexContainer}>
            <Text><Icon name="close" type="font-awesome" color={COLORS.red} size={20}/></Text>
            <Text style={globalStyles.baseText}>{value} / {goal}</Text>
        </View>;
    }


    const updatedSelectedDate = async (timestamp) => {
        const dateObj = moment(timestamp);
        await setSelectedDate(dateObj);
        const newMarkedDate = getMarkedDataObj(dateObj);
        await setMarkedDates(newMarkedDate);
        await refreshData();
    }


    return <View>
        <ScrollView style={globalStyles.container}>
            <Text style={globalStyles.header}>Overview</Text>
            <View style={moduleStyles.module}>
                <View style={moduleStyles.innerContainer}>
                    <Calendar
                        calendarStyle={{
                            width: '100%',
                        }}
                        style={{
                            backgroundColor: 'transparent',
                            borderRadius: 15,
                            marginBottom: 10,
                        }}
                        markingType={'multi-dot'}
                        markedDates={markedDates}
                        onDayPress={(day) => {
                            console.log('day pressed', day)
                            Haptics.selectionAsync()
                            updatedSelectedDate(day.timestamp);
                        }}
                        theme={{
                            arrowColor: 'orange',
                            backgroundColor: 'blue',
                            calendarBackground: 'transparent',
                            textDayFontFamily: 'KosugiMaru_400Regular',
                            textMonthFontFamily: 'KosugiMaru_400Regular',
                            textDayHeaderFontFamily: 'KosugiMaru_400Regular',
                            todayTextColor: '#00adf5',
                        }}
                    />
                    <View style={styles.dailyStatsContainer}>
                        <View style={styles.row}>
                            <Text style={styles.dailyStats}>Daily water goal reached?</Text>
                            {isGoalReached(data.waterIntake, waterIntakeGoal)}
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.dailyStats}>Daily step goal reached?</Text>
                            {isGoalReached(data.steps, stepsGoal)}
                        </View>

                        {/*<Text style={styles.dailyStats}>Average feeling after meals:</Text>*/}
                    </View>
                </View>
            </View>

            <View style={{...moduleStyles.module, ...styles.trophiesModule}}>
                <View style={moduleStyles.innerContainer}>
                    <Text style={moduleStyles.moduleName}>Trophies</Text>
                    <Trophies />
                </View>
            </View>
        </ScrollView>
        <ImageBackground source={require('./../assets/2d351f0091d46a9d6440ad3b34760350.jpg')} resizeMode="stretch" style={globalStyles.backgroundImage} />
    </View>
    ;
}

const styles = StyleSheet.create({
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
    dailyStatsContainer: {
        padding: 15,
    },
    dailyStats: {
        ...globalStyles.baseText,
        marginTop: 10,
        marginBottom: 10,
    },
    trophiesModule: {
        marginBottom: 50,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})