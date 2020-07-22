import firestore from '@react-native-firebase/firestore';

const storeService = () => {
    const getProducts = async (store, category) => {
        return await firestore().collection('Store')
            .doc(store)
            .collection('ProductInventory')
            .where('Category', '==', category)
            .get()
    }

    return {
        getProducts
    }
}

export default storeService
