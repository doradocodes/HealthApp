import {StyleSheet, Text, View} from "react-native";
import CustomSlider from "../CustomSlider";
import * as React from "react";
import {useEffect, useState} from "react";
import {Button, Icon, Overlay, Slider} from "@rneui/base";
import moduleStyles from "../styles/moduleStyles";
import {getData, storeData, updateData} from "../../storage";
import {formatDate, getCurrentDate} from "../../utils/dateUtils";
import {COLORS} from "../styles/globalStyles";
import {getLocalData} from "../../utils/dataUtils";

export default function WaterIntakeModule({ date }) {
    const [dailyWaterIntake, setDailyWaterIntake] = useState(0);
    const [dailyWaterIntakeGoal, setDailyWaterIntakeGoal] = useState(30);
    const [dailyWaterIntakeTempGoal, setDailyWaterIntakeTempGoal] = useState(30);
    const [overlayVisible, setOverlayVisible] = React.useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const refreshData = () => {
        getLocalData(date)
            .then((data) => {
                setDailyWaterIntake(data.waterIntake);
                setIsDataLoaded(true);
            });
    }

    useEffect(() => {
        if (!isDataLoaded) {
            refreshData();
            getWaterGoal();
        }
    }, [isDataLoaded]);

    useEffect(() => {
        refreshData()
    }, [date])

    const getWaterGoal = async () => {
        const res1 = await getData('dailyWaterIntakeGoal');
        if (res1 && parseInt(res1)) {
            setDailyWaterIntakeGoal(parseInt(res1));
            setDailyWaterIntakeTempGoal(parseInt(res1));
        }
    };

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    const onValueChange = async (value) => {
        setDailyWaterIntake(parseInt(value));
        await updateData(formatDate(date), JSON.stringify({
            waterIntake: value.toString()
        }));
    };

    return <View style={moduleStyles.module}>
        <View style={moduleStyles.innerContainer}>
            <View style={moduleStyles.titleContainer}>
                <Text style={moduleStyles.moduleName}>Daily water intake</Text>
                <Button
                    icon={<Icon name="edit" type="font-awesome" size={20}/>}
                    onPress={toggleOverlay}
                    buttonStyle={moduleStyles.editButton}
                    containerStyle={moduleStyles.editButtonContainer}
                    type="clear"
                />
            </View>

            <CustomSlider
                color="#8AE3FF"
                defaultValue={dailyWaterIntake}
                max={dailyWaterIntakeGoal}
                goalLabel="oz"
                onValueChange={onValueChange}
            />
            <Text style={styles.goalLabel}>{dailyWaterIntake} / {dailyWaterIntakeGoal} oz</Text>
        </View>
        <Overlay
            isVisible={overlayVisible}
            onBackdropPress={toggleOverlay}
            overlayStyle={moduleStyles.overlayStyle}
        >
            <>
                <Text style={styles.title}>Set your daily water intake</Text>
                <View style={styles.overlaySliderLabel}>
                    <Text style={styles.overlaySliderLabelMin}>0</Text>
                    <Text style={styles.overlaySliderLabelMin}>100</Text>
                </View>
                <CustomSlider
                    color={COLORS.blue}
                    step={10}
                    defaultValue={dailyWaterIntakeGoal}
                    max={100}
                    goalLabel="steps"
                    onValueChange={(value) => setDailyWaterIntakeTempGoal(value)}
                ></CustomSlider>
                <Text style={styles.sliderValueLabel}>{dailyWaterIntakeTempGoal} oz</Text>
            </>
            <Button
                title="Done"
                buttonStyle={moduleStyles.overlayButton}
                onPress={async (value) => {
                    toggleOverlay();
                    await storeData('dailyWaterIntakeGoal', dailyWaterIntakeTempGoal.toString());
                    refreshData();
                }}
                containerStyle={moduleStyles.overlayButtonContainer}
                titleStyle={moduleStyles.overlayButtonTitle}
            />
        </Overlay>
    </View>
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    overlaySliderLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 0,
    },
    overlaySliderLabelMin: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 12,
    },
    goalLabel: {
        fontFamily: 'KosugiMaru_400Regular',
        textAlign: 'center'
    },
    input: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        padding: 5,
    },
    sliderValueLabel: {
        fontFamily: 'KosugiMaru_400Regular',
        textAlign: 'center'
    }
});