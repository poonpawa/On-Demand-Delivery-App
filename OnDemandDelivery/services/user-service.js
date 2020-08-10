import firebase from "@react-native-firebase/app";
import firestore from '@react-native-firebase/firestore';

const UserService = () => {

    //getting the Buyer collection DB reference
    const getBuyerDBReference = () => {
        const userId = firebase.auth().currentUser.uid;
        return firestore().collection('Buyers').doc(userId)
    }

    //for creating initial user entry
    const AddUserDetails = (userData) => {
        const { name, email } = userData;
        getBuyerDBReference().set({
            Name: name,
            Email: email
        })
    }

    //for real time buyers location update
    const UpdateLocation = (value) => {
        getBuyerDBReference().update({
            Location: new firestore.GeoPoint(value.latitude, value.longitude)
        })
    }

    //To add values in Buyers collection
    const AddData = (key, value) => {
        if (value) {
            let data = {}
            data[key] = value
            getBuyerDBReference().update(data)
        }
    }
    //to get all the buyer details
    const getBuyerDetails = async () => {
        let userData;
        await getBuyerDBReference().get().then((doc) => {
            userData = doc.data();
        })
        return userData;
    }

    //to get any value from from buyer collection
    const getValue = async (key) => {
        let dbValue;
        await getBuyerDBReference().get().then((doc) => {
            dbValue = doc.data()[key];
        })
        return dbValue;
    }

    return {
        getBuyerDBReference, AddUserDetails, UpdateLocation, AddData, getValue, getBuyerDetails
    }
}

export default UserService