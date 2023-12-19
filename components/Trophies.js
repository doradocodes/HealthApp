import {View, Text, StyleSheet, Pressable} from "react-native";
import globalStyles, {COLORS} from "./styles/globalStyles";
import {Button, Icon, Overlay} from "@rneui/base";
import * as React from "react";
import {useState} from "react";
import moduleStyles from "./styles/moduleStyles";

export default function Trophies() {
    const [overlayVisible, setOverlayVisible] = useState(false);



    return <View style={styles.trophiesContainer}>
        <Pressable style={styles.trophy} onPress={() => setOverlayVisible(true)}>
            <Icon
                name="heart"
                type="font-awesome"
                size={20}
                color={COLORS.red}
            />
            <Text style={styles.trophyStreak}>22</Text>
        </Pressable>
        <View style={styles.trophyBlank}>
        </View>


        <Overlay
            isVisible={overlayVisible}
            onBackdropPress={() => setOverlayVisible(false)}
            overlayStyle={moduleStyles.overlayStyle}
        >
            <Text>You reached your water intake goal 22 times this month!</Text>
            <Button style={moduleStyles.overlayButton} onPress={() => setOverlayVisible(false)}>Close</Button>
        </Overlay>
    </View>
}

const styles = StyleSheet.create({
    trophiesContainer: {
        flexDirection: 'row',
        gap: 5,
        marginTop: 10,
    },
    trophy: {
        width: 50,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 4,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    trophyBlank: {
       backgroundColor: '#ccc',
       width: 50,
       height: 50,
    },
    trophyStreak: {
        ...globalStyles.baseText,
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: -3,
        marginBottom: -3,
    }
});