import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    contextImc: {
        flex: 1,
        marginTop: 20,
        paddingTop: 15,
        alignItems: 'center',
        width: '100%'
    },
    numberImc: {
        fontSize: 48,
        color: '#ff0043',
        fontWeight: 'bold'
    },
    information: {
        fontSize: 18,
        color: '#ff0043',
        fontWeight: 'bold'
    },
    boxShareButton: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    shared: {
        backgroundColor: '#181772',
        borderRadius: 50,
        paddingBottom: 5,
        paddingTop: 5
    },
    sharedText: {
        color: '#ffffff',
        fontWeight: 'bold',
        paddingHorizontal: 30,
    }
});

export default styles