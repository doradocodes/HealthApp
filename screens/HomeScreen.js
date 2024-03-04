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


export default function HomeScreen({ navigation }) {
    const [currentDate, setCurrentDate] = React.useState(getCurrentDate());
    const [openDatePicker, setOpenDatePicker] = React.useState(false);
    const [selectedAvatar, setSelectedAvatar] = React.useState(0);
    const [appleHealthData, setAppleHealthData] = React.useState(null);

    const getAvatar = async () => {
        const resAvatar = await getData('avatar');
        if (resAvatar) {
            setSelectedAvatar(parseInt(resAvatar));
        }
    }

    useEffect(() => {
        getAvatar();
    }, [selectedAvatar]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            Haptics.selectionAsync();

            getAppleHealthData(currentDate, (d) => {
               setAppleHealthData(d);
            });
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getAppleHealthData(currentDate, (d) => {
            console.log('apple health data', d);
            setAppleHealthData(d);
        });
    }, []);

    const changeDate = () => {
        Haptics.selectionAsync();
    };

    return <View>
        <ScrollView style={styles.container}>
            <View style={globalStyles.dateWrapper}>
                <Pressable onPress={() => setOpenDatePicker(true)}>
                    <Text style={globalStyles.dateLabel}>{formatDate(currentDate)}</Text>
                </Pressable>
                {openDatePicker &&
                    [
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={currentDate.toDate()}
                            mode={'date'}
                            is24Hour={false}
                            display={'spinner'}
                            themeVariant="light"
                            onChange={(event, date) => {
                                setCurrentDate(moment(date));
                            }}
                        />,
                        <Button
                            buttonStyle={moduleStyles.overlayButton}
                            titleStyle={moduleStyles.overlayButtonTitle}
                            onPress={() => setOpenDatePicker(false)}
                        >Done</Button>
                    ]
                }
            </View>

            <StatsView />

            <View style={globalStyles.flexContainer}>
                <Image source={avatarImages[selectedAvatar].src} style={globalStyles.avatar} />
                <View style={styles.chatContainer}>
                    <Text style={styles.chatText}>Hi Dora! Have you tracked your meals today yet?</Text>
                </View>
            </View>

            <WaterIntakeModule date={currentDate} />
            <StepCountModule date={currentDate} appleHealthData={appleHealthData}/>
            <MealsModule date={currentDate}/>
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
        width: '83%',
        marginLeft: -30,
    },
    chatText: {
        fontFamily: 'KosugiMaru_400Regular',
        color: '#FFFFFF',
    },
});
