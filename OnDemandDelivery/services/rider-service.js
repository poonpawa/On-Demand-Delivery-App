import firestore from '@react-native-firebase/firestore';

const RiderService = () => {

    const getAvailableRiders = async () => {
        return await firestore().collection('Riders')
            .where('IsAvailable', "==", true)
            .get()
    }
    //need Rider ID for getting the location

     const getRiderDetails = async (id) => {
        let data;
        await firestore().collection('Riders').doc(id).get().then((doc) => {
            data = doc.data();
        })
        return data;
    }

    return {
        getAvailableRiders, getRiderDetails
    }
}

export default RiderService
