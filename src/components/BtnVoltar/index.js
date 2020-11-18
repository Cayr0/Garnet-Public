import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import styles from './styles';

const BtnVoltar = ({ destino }) => {

  const { replace, goBack } = useNavigation();

  function handlereplace() {
    replace(`${destino}`);
  }

  function handlegoback() {
    goBack(`${destino}`);
  }

  return (
    <View style={styles.btnVoltarView}>

      <TouchableOpacity 
        style={styles.btnVoltar}
        onPress={ ()=> handlegoback()}
      > 

        <Text style={styles.textVoltar}>Voltar</Text>

      </TouchableOpacity>

    </View>
  )
}

export default BtnVoltar;