import CustomSlider from "../CustomSlider";
import * as React from "react";
import {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import moduleStyles from "../styles/moduleStyles";
import {Button, Icon, Overlay} from "@rneui/base";
import {getData, storeData, updateData} from "../../storage";
import {formatDate, getCurrentDate} from "../../utils/dateUtils";
import {COLORS} from "../styles/globalStyles";
import {getLocalData} from "../../utils/dataUtils";

export default function StepCountModule({ date }) {
    const [overlayVisible, setOverlayVisible] = React.useState(false);
    const [dailySteps, setDailySteps] = useState(0);
    const [dailyStepGoal, setDailyStepGoal] = useState(10000);
    const [dailyStepGoalTemp, setDailyStepGoalTemp] = useState(10000);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const refreshData = () => {
        getLocalData(date)
            .then((data) => {
                setDailySteps(data.steps);
                setIsDataLoaded(true);
            });
    }

    const getStepGoal = async () => {
        const res1 = await getData('dailyStepCountGoal');
        if (res1 && parseInt(res1)) {
            setDailyStepGoal(parseInt(res1));
            setDailyStepGoalTemp(parseInt(res1));
        }
    };

    useEffect(() => {
        if (!isDataLoaded) {
            refreshData();
            getStepGoal();
        }
    }, [isDataLoaded]);

    useEffect(() => {
        refreshData()
    }, [date])

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    const formatThousand = (value) => {
        return value / 1000 + 'k';
    };

    const onValueChange = async (value) => {
        setDailySteps(parseInt(value));
        await updateData(formatDate(date), JSON.stringify({
            steps: value.toString(),
        }));
    };

    return <View style={moduleStyles.module}>
        <View style={moduleStyles.innerContainer}>
            <View style={moduleStyles.titleContainer}>
                <Text style={moduleStyles.moduleName}>Daily step count</Text>
                <Button
                    icon={<Icon name="edit" type="font-awesome" size={20}/>}
                    onPress={toggleOverlay}
                    buttonStyle={moduleStyles.editButton}
                    containerStyle={moduleStyles.editButtonContainer}
                    type="clear"
                />
            </View>

            <CustomSlider
                color={COLORS.green}
                defaultValue={dailySteps}
                max={dailyStepGoal}
                goalLabel="steps"
                onValueChange={onValueChange}
            />
            <Text style={styles.goalLabel}>{dailySteps} / {formatThousand(dailyStepGoal)} steps</Text>
        </View>
        <Overlay
            isVisible={overlayVisible}
            onBackdropPress={toggleOverlay}
            overlayStyle={moduleStyles.overlayStyle}
        >
            <>
                <Text style={styles.title}>Set your daily step count</Text>
                <View style={styles.overlaySliderLabel}>
                    <Text style={styles.overlaySliderLabelMin}>0</Text>
                    <Text style={styles.overlaySliderLabelMin}>20k</Text>
                </View>
                <CustomSlider
                    color={COLORS.green}
                    step={1000}
                    defaultValue={dailyStepGoal}
                    max={20000}
                    goalLabel="steps"
                    onValueChange={(value) => setDailyStepGoalTemp(value)}
                ></CustomSlider>
                <Text style={styles.sliderValueLabel}>{formatThousand(dailyStepGoalTemp)} steps</Text>
            </>
            <Button
                title="Done"
                buttonStyle={moduleStyles.overlayButton}
                onPress={async () => {
                    toggleOverlay();
                    await storeData('dailyStepCountGoal', dailyStepGoalTemp.toString());
                    refreshData()
                }}
                containerStyle={moduleStyles.overlayButtonContainer}
                titleStyle={moduleStyles.overlayButtonTitle}
            />
        </Overlay>
    </View>;
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
    sliderValueLabel: {
        fontFamily: 'KosugiMaru_400Regular',
        textAlign: 'center'
    }
});
