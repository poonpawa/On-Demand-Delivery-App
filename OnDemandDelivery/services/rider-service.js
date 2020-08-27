import firestore from '@react-native-firebase/firestore';

const RiderService = () => {

    const getAvailableRiders = async () => {
        return await firestore().collection('Riders')
            .where('IsAvailable', "==", true)
            .get()
    }
    //need Rider ID for getting the location

    /* const getCurrentLocation = async () => {
        return await firestore
    } */

    return {
        getAvailableRiders
    }
}

export default RiderService
