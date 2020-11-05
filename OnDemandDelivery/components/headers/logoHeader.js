import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Header, Icon } from 'react-native-elements';


const logoHeader = (props) => {
    const renderCustomLeftIcon = () => {
        return(
          <Image
          source={require('../../assets/Images/freshMartAppLogo.png')}
          /> 
        );
    };
    return (
        <View>
            <Header
                leftComponent={() => renderCustomLeftIcon()}
                containerStyle={styles.mainContainer}
            />
        </View>
    )
}

export default logoHeader

const styles = StyleSheet.create({
    mainContainer: {
      paddingLeft: 16,
      paddingRight: 16,
      backgroundColor: 'white',
      borderBottomColor: '#EAEAEA',
    }
})
