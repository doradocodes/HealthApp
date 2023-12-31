import {StyleSheet, Text, TextInput, View} from "react-native";
import {Button, CheckBox, Icon, Overlay} from "@rneui/base";
import * as React from "react";
import moduleStyles from "../styles/moduleStyles";
import {useEffect, useState} from "react";
import CustomSlider from "../CustomSlider";
import {getData, storeData, updateData} from "../../storage";
import {formatDate, getCurrentDate, getCurrentTime} from "../../utils/dateUtils";
import * as Haptics from "expo-haptics";
import {COLORS} from "../styles/globalStyles";
import {getLocalData} from "../../utils/dataUtils";

export default function MealsModule(props) {
    const { date } = props;
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [breakfast, setBreakfast] = useState(null);
    const [lunch, setLunch] = useState(null);
    const [dinner, setDinner] = useState(null);

    const refreshData = () => {
        getLocalData(date)
            .then((data) => {
                setBreakfast(data.breakfast);
                setLunch(data.lunch);
                setDinner(data.dinner);
                setIsDataLoaded(true);
            });
    }

    useEffect(() => {
        if (!isDataLoaded) {
            refreshData();
        }
    }, [isDataLoaded]);

    useEffect(() => {
        refreshData()
    }, [date])

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    const renderHearts = (numberOfHearts) => {
        const hearts = [];
        for (let i = 0; i < numberOfHearts; i++) {
            hearts.push(<Icon name={'heart'} type={'font-awesome'} size={15} color={COLORS.red} key={`hearts-${i}`} />);
        }
        return hearts;
    }

    return <View style={{...moduleStyles.module, ...styles.module}}>
        <View style={moduleStyles.innerContainer}>
            <View style={moduleStyles.titleContainer}>
                <Text style={moduleStyles.moduleName}>My meals</Text>
                <Button
                    icon={<Icon name="edit" type="font-awesome" size={20} />}
                    onPress={toggleOverlay}
                    buttonStyle={moduleStyles.editButton}
                    containerStyle={{
                        padding: 0,
                        marginRight: -10,
                        width: 'auto'
                    }}
                    type="clear"
                />
            </View>

            <View style={styles.timelineWrapper}>
                <View style={styles.timeline} />
                { breakfast &&
                    <View style={styles.mealWrapper}>
                        <View style={styles.mealLabel}>
                            <View style={styles.mealLabelTextWrapper}>
                                <Text style={styles.mealLabelText}>breakfast</Text>
                            </View>
                            <View style={styles.hearts}>
                                {renderHearts(breakfast.hearts)}
                            </View>
                        </View>

                        <View style={styles.mealCircle}/>
                        <Text style={styles.food}>{breakfast.food}</Text>
                    </View>
                }

                { lunch &&
                    <View style={styles.mealWrapper}>
                        <View style={styles.mealLabel}>
                            <View style={styles.mealLabelTextWrapper}>
                                <Text style={styles.mealLabelText}>lunch</Text>
                            </View>
                            <View style={styles.hearts}>
                                {renderHearts(lunch.hearts)}
                            </View>
                        </View>
                        <View style={styles.mealCircle}/>
                        <Text style={styles.food}>{lunch.food}</Text>
                    </View>
                }

                { dinner &&
                    <View style={styles.mealWrapper}>
                        <View style={styles.mealLabel}>
                            <View style={styles.mealLabelTextWrapper}>
                                <Text style={styles.mealLabelText}>dinner</Text>
                            </View>
                            <View style={styles.hearts}>
                                {renderHearts(dinner.hearts)}
                            </View>
                        </View>
                        <View style={styles.mealCircle}/>
                        <Text style={styles.food}>{dinner.food}</Text>
                    </View>
                }

            </View>

        </View>
        <Overlay
            isVisible={overlayVisible}
            onBackdropPress={toggleOverlay}
            overlayStyle={moduleStyles.overlayStyle}
        >
            <MealInputForm
                toggleOverlay={() => toggleOverlay()}
                refreshData={refreshData}
                {...props}
            />
        </Overlay>

    </View>
}
const MealInputForm = ({ toggleOverlay, refreshData, date }) => {
    const [meal, setMeal] = useState('breakfast');
    const [time, setTime] = useState(getCurrentTime());
    const [food, setFood] = useState('');
    const [hearts, setHearts] = useState(1);

    return <>
        <Text style={moduleStyles.overlayTitle}>Time to add a new meal!</Text>
        <Text style={moduleStyles.overlaySubtitle}>Which meal was it?</Text>
        <View style={mealFormStyles.selectWrapper}>
            <CheckBox
                checked={meal === 'breakfast'}
                onPress={() => setMeal('breakfast')}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={'Breakfast'}
                titleProps={{
                    style: mealFormStyles.selectTitle,
                }}
                containerStyle={mealFormStyles.selectContainer}
                wrapperStyle={mealFormStyles.wrapper}
            />
            <CheckBox
                checked={meal === 'lunch'}
                onPress={() => setMeal('lunch')}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={'Lunch'}
                titleProps={{
                    style: mealFormStyles.selectTitle,
                }}
                containerStyle={mealFormStyles.selectContainer}
                wrapperStyle={mealFormStyles.wrapper}
            />
            <CheckBox
                checked={meal === 'dinner'}
                onPress={() => setMeal('dinner')}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                title={'Dinner'}
                titleProps={{
                    style: mealFormStyles.selectTitle,
                }}
                containerStyle={mealFormStyles.selectContainer}
                wrapperStyle={mealFormStyles.wrapper}
            />
        </View>
        <Text style={moduleStyles.overlaySubtitle}>What time did you have the meal?</Text>
        <View style={mealFormStyles.selectWrapper}>
            {/*<Text style={mealFormStyles.text}>{time}</Text>*/}
            <Text>or</Text>
            <Button
                buttonStyle={mealFormStyles.button}
                titleStyle={{
                    fontFamily: 'KosugiMaru_400Regular',
                    fontSize: 12,
                }}
            >Enter time</Button>
        </View>
        <Text style={moduleStyles.overlaySubtitle}>What did you eat?</Text>
        <View style={mealFormStyles.selectWrapper}>
            <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={value => setFood(value)}
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    width: '100%',
                    height: 100,
                }}
            />
        </View>
        <Text style={moduleStyles.overlaySubtitle}>How did you feel after?</Text>
        <View style={mealFormStyles.overlaySliderLabel}>
            <Text style={mealFormStyles.overlaySliderLabelMin}>0</Text>
            <Text style={mealFormStyles.overlaySliderLabelMin}>5</Text>
        </View>
        <CustomSlider
            color="#C72222"
            min={1}
            max={5}
            defaultValue={1}
            icon={<Icon
                name="heart"
                type="font-awesome"
                size={15}
                reverse
                containerStyle={{ bottom: 9, right: 10 }}
                color="#C72222"
            />}
            onValueChange={(val) => setHearts(val)}
        />
        <View style={mealFormStyles.heartsContainer}>
            { Array.from({length: hearts}, (x, i) =>
                <Icon
                    key={`hearts-${i}`}
                    name="heart"
                    type="font-awesome"
                    size={20}
                    color="#C72222"
                />)
            }
        </View>
        <Button
            title="Done"
            onPress={async (value) => {
                Haptics.selectionAsync();
                toggleOverlay();
                const currentDate = formatDate(date);
                const formValues = {
                    time,
                    food,
                    hearts,
                };

                const newMeal = {
                    [meal]: formValues,
                };

                await updateData(currentDate, JSON.stringify(newMeal));

                refreshData();
            }}
            buttonStyle={mealFormStyles.submitButton}
            containerStyle={mealFormStyles.submitButtonContainer}
            titleStyle={mealFormStyles.submitButtonTitle}
        />
    </>
}

const mealFormStyles = StyleSheet.create({
    text: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 14,
    },
    button: {
        borderRadius: 10,
        backgroundColor: '#A19B8F',
        padding: 5,
    },
    selectWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
        padding: 0,
        gap: 5,
        width: '100%',
    },
    selectContainer: {
        backgroundColor: 'transparent',
        margin: 0,
        padding: 0,
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 14,
    },
    selectTitle: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 14,
        marginLeft: 5,
    },
    wrapper: {
        margin: 0,
        padding: 0,
    },
    overlaySliderLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 0,
    },
    overlaySliderLabelMin: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 12,
        color: 'grey',
    },
    heartsContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        gap: 5,
    },
    submitButton: {
        borderRadius: 20,
        backgroundColor: COLORS.green,
        fontFamily: 'KosugiMaru_400Regular',
    },
    submitButtonContainer: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
    },
    submitButtonTitle: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 16,
    }
});

const styles = StyleSheet.create({
    module: {
        marginBottom: 50,
    },
    timelineWrapper: {
        width: '100%',
    },
    timeline: {
        borderRadius: 10,
        width: 10,
        backgroundColor: '#ccc',
        minHeight: 50,
        height: '100%',
        position: 'absolute',
        left: '50%',
        marginLeft: -5,
    },
    mealWrapper: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 5,
        left: 0,
        height: 50,
        position: 'relative',
    },
    mealLabel: {
        position: 'absolute',
        right: '50%',
        marginRight: 20,
        alignItems: 'flex-end',
        alignSelf: 'flex-start',
        gap: 5,
    },
    mealLabelTextWrapper: {
        backgroundColor: '#E8E7E3',
        borderRadius: 15,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    mealLabelText: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 12,
    },
    mealCircle: {
        backgroundColor: '#FAF7F0',
        width: 25,
        height: 25,
        borderRadius: '50%',
        borderWidth: 4,
        borderColor: '#ccc',
        position: 'absolute',
        left: '50%',
        marginLeft: -12.5,
    },
    food: {
        fontFamily: 'KosugiMaru_400Regular',
        width: '40%',
        paddingTop: 5,
        paddingBottom: 5,
        position: 'absolute',
        left: '50%',
        marginLeft: 20,
    },
    hearts: {
        flexDirection: 'row',
        gap: 2,
    },
});