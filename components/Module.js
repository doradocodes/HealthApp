import {View, Text, StyleSheet} from "react-native";
import {Button, Icon, Overlay, Slider} from "@rneui/base";
import * as React from "react";
import CustomSlider from "./CustomSlider";
import {COLORS} from "./styles/globalStyles";

export default function Module({ name, children, overlay, onOverlayClose }) {
    const [visible, setVisible] = React.useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return <View style={styles.module}>
        <View style={styles.innerContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.moduleName}>{name}</Text>
                <Button
                    icon={<Icon name="edit" type="font-awesome" size={20} />}
                    onPress={toggleOverlay}
                    buttonStyle={styles.editButton}
                    containerStyle={{
                        padding: 0,
                        marginRight: -10,
                        width: 'auto'
                    }}
                    type="clear"
                />
            </View>

            {children}

        </View>
            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                overlayStyle={styles.overlayStyle}
            >
                {overlay}
                <Button
                    title="Done"
                    buttonStyle={{
                        borderRadius: 20,
                        backgroundColor: COLORS.green,
                        fontFamily: 'KosugiMaru_400Regular',
                    }}
                    onPress={(value) => {
                        toggleOverlay();
                        // onOverlayClose();
                    }}
                    containerStyle={{
                        width: '50%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 20,
                    }}
                    titleStyle={{
                        fontFamily: 'KosugiMaru_400Regular',
                        fontSize: 16,
                    }}
                />
            </Overlay>

    </View>
}

const styles = StyleSheet.create({
    module: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    innerContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        marginBottom: 20,
        backgroundColor: '#FAF7F0',
        borderRadius: 15,
        shadowColor: '#A19B8F',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    moduleName: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 16,
    },
    overlayStyle: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#FAF7F0',
        width: '90%',
        height: 'auto',
        minHeight: '30%',
        flexDirection: 'column',
        // justifyContent: 'space-between',
    },
    editButton: {
        width: 'auto',
        padding: 0,
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    }
});
