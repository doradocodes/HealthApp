import {View, Text, ScrollView} from "react-native";
import {Button} from "@rneui/base";
import globalStyles from "../components/styles/globalStyles";
import {getData} from "../storage";
import {useEffect, useState} from "react";
import {getCurrentDate} from "../utils/dateUtils";

export default function OverviewScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const getLocalData = async (date) => {
        getData(date)
            .then((res) => {
                if (res) {
                    const d = JSON.parse(res);
                    setData(parseInt(d.steps));
                    setIsDataLoaded(true);
                }
            });
    };

    useEffect(() => {
        if (!isDataLoaded) {
            getLocalData(getCurrentDate());
        }
    }, [isDataLoaded]);

    return <ScrollView style={globalStyles.container}>
        <Text>OverviewScreen</Text>
        <Button onPress={() => navigation.navigate('Home')}>Back</Button>
    </ScrollView>;
}

