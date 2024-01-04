import {Dimensions, StyleSheet} from "react-native";

export const COLORS = {
    green: '#3BCB52',
    red: '#f50',
    blue: '#8AE3FF',
    backgroundColor: '#E6CEB5',
    moduleBackground: '#FAF7F0',
    black: '#2B2B2B',
    grey: '#A19B8F',
    lightGrey: '#CCCCCC',
}

export default StyleSheet.create({
    baseText: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 16,
    },
    header: {
        fontFamily: 'KosugiMaru_400Regular',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    backgroundImage: {
        zIndex: -1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get("window").width, //for full screen
        height: Dimensions.get("window").height //for full screen
    },
    container: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        paddingTop: 50,
        paddingBottom: 50,
        gap: 20,
    },
    chatContainer: {
        backgroundColor: '#2B2B2B',
        borderRadius: 15,

        padding: 15,
        width: '80%',
        marginBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    chatText: {
        fontFamily: 'KosugiMaru_400Regular',
        color: '#FFFFFF',
    },

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
        marginBottom: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        shadowColor: COLORS.grey,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    dateLabel: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 16,
        textAlign: 'center',
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        zIndex: 1,
        width: 80,
        height: 80,
        marginLeft: -20,
        // objectFit: 'contain',
        // backgroundColor: 'red'
    }
});
