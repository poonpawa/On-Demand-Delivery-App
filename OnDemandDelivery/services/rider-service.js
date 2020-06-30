import firestore from '@react-native-firebase/firestore';

const RiderService = () => {

    const getAvailableRiders = async () => {
        return await firestore().collection('Riders')
            .where('IsAvailable', "==", true)
            .get()
    }

    return {
        getAvailableRiders
    }
}

export default RiderService
