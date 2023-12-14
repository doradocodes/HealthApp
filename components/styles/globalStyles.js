import {StyleSheet} from "react-native";

export default StyleSheet.create({
    baseText: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 16,
    },
    backgroundImage: {
        width: '100%',
        height: 250,
    },
    container: {
        backgroundColor: '#E6CEB5',
        flexDirection: 'column',
        paddingTop: 50,
        paddingBottom: 200,
        gap: 20,
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
});
