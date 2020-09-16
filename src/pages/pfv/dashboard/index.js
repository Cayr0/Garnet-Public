import React, { useState, useEffect } from 'react';
import {
  View, 
  Text,  
  KeyboardAvoidingView, 
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  AsyncStorage
} from 'react-native';

import { useUser } from '../../../Context/UserProvider'

import styles from './styles'

export default function DashboardPFV({navigation}) {

  const { User } = useUser();

  const [horario,setHorario] = useState('')

  useEffect(()=>{
    Horario()
  },[])

  function Logout() {
    AsyncStorage.clear()
    navigation.navigate('Login')
  }

  function Horario() {
    let d = new Date();
    let hour = d.getHours();
    if(hour < 5)
    {
      setHorario("Boa Noite");
    }
    else
    if(hour < 8)
    {
      setHorario("Bom Dia");
    }
    else
    if(hour < 12)
    {
      setHorario("Bom Dia");
    }
    else
    if(hour < 18)
    {
      setHorario("Boa tarde");
    }
    else
    {
      setHorario("Boa noite");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.container2}>
        <View style={styles.header}>

          <Image 
            style={{
              width: 244,
              height: 53
            }} 
            source={require('../../../assets/logo1.png')} 
            />
          
          <Text style={styles.textHeader}>
            Gestor Acadêmico Redentor - Itaperuna
          </Text>
          <Text style={styles.textHeader2}>
            {horario}, {User.name}
          </Text>
        </View>

        <View style={styles.btnDashboard}>

          <TouchableOpacity 
            style={styles.btndash}
            onPress={ ()=> navigation.navigate('PerfilPFV')}
            > 
            <Text style={styles.textSubmit}>Meu Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btndash}
            onPress={ ()=> navigation.navigate('SolicitacaoPFV')}
            > 
            <Text style={styles.textSubmit}>Solicitações de Recursos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btndashSair}
            onPress={ ()=> Logout()}
            > 
            <Text style={styles.textSubmitSair}>Sair</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}


