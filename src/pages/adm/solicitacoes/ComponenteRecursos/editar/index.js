import React, { useState, useEffect } from 'react';
import {
  View, 
  Text,   
  KeyboardAvoidingView, 
  Image,
  ScrollView,
  AsyncStorage,
  Alert,
  RefreshControl,
  YellowBox,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useUser } from '../../../../../Context/UserProvider';
//Components
import BtnVoltar from '../../../../../components/BtnVoltar/index'

import Item from './Item';
import styles from './styles';
import moment from 'moment';

import { base_URL_DELETE_PUT_GET_POST_Recursos } from '../../../../../services/api'

export default function EditarSolicitacao({ route, navigation}) {

  const { User } = useUser();

  const [selectedValue, setSelectedValue] = useState('');
  const [inReload,setInReload] = useState(true);
  const [horario,setHorario] = useState('');
  const [data,setData] = useState([
    {
      professor: '',
      dataSolicitada: '',
      dataFezSolicitacao: '',
      horario: [ ],
      salaSolic: '',
      statusSolic: '',
      descricao: '',
      disciplina: '',
      disciplina2: '',
      qtdealunos: '',
      recsolicitado: [ ],
      observacao: '',
      id: '',
    }
  ]);

  const { itemId } = route.params;
  


  useEffect(()=> {
    setData({
      professor: itemId.professor,
      dataSolicitada: itemId.data,
      dataFezSolicitacao: itemId.createdAt,
      horario: itemId.horario,
      salaSolic: itemId.salareal,
      statusSolic: itemId.completed,
      descricao: itemId.descricao,
      disciplina: itemId.disciplina,
      disciplina2: itemId.disciplina2,
      qtdealunos: itemId.qdteAlunos,
      recursos: itemId.recsolicitado,
      observacao: itemId.observacoes,
      id: itemId._id,
    });
    Horario();
    setInReload(false);
  },[]);
  
  
  function atualizar() {
    //o ip vai mudar dependendo do ip da maquina que for roda o server
    fetch(base_URL_DELETE_PUT_GET_POST_Recursos+id, {
      method:"PUT",
      //aqui vou poder mandar o token para alguma requisição
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "descricao":postText,
		    "setor":selectedValue,
		    "status":status,
		    "qtde":qtde
      })
    })
    //recebo a resposta do server
    .then(res=>res.json())
    .then ((res) => {
      if (res.error) {
        Alert.alert(
          "Mensagem",
          `${res.error}`,
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel"
            },
            { text: "OK", onPress: () => {} }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Mensagem",
          `Foi Atualizado: "${res.descr.descricao}" com sucesso!`,
        );
        setSelectedValue("Selecione")
        setPostText('')
        setQtde('')
        setTimeout(() => (
          navigation.navigate('Cadastro')
        ), 1500)
      }
    })

  }

  function delet() {
    Alert.alert(
      "Alerta",
      "Tem certeza que deseja apagar esse recurso ?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Sim", onPress: () => deletar() }
      ],
      { cancelable: false }
    );
  }

  function deletar() {
    //o ip vai mudar dependendo do ip da maquina que for roda o server
    fetch(base_URL_DELETE_PUT_GET_POST_Recursos+id, {
      method:"DELETE",
      //aqui vou poder mandar o token para alguma requisição
      headers: {
        'Content-Type': 'application/json'
      }
    })
    //recebo a resposta do server
    .then(res=>res.json())
    .then ((res) => {
      if(res) {
        Alert.alert(
          "Mensagem",
          `${res.message}`,
          [
            { text: "Sim", onPress: () => navigation.navigate('Cadastro') }
          ]
        );
        setPostText('')
        setSelectedValue('')
        setQtde('')
        setId('')
        setStatus('')
      }
    })
  }

  function onRefresh() {
    //Vai limpar o useState data que está armazenado os Dados da API
    //Vai obter os dados mais recentes, da API
    //BuscarRecursos();
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

  function situacao() {
    if(data.statusSolic=='ATENDIDO'){
      return
    }
    if(data.statusSolic=='ANDAMENTO'){

      return (
          <View style={styles.ViewBtnSituacao}>
            <RectButton 
              style={styles.btnSituacao}
              onPress={ ()=> {} }
            > 
              <Text style={styles.textVoltar}>Pedente</Text>
            </RectButton>
            <RectButton 
              style={[styles.btnSituacao,styles.confirmarColor]}
              onPress={ ()=> {} }
            > 
              <Text style={styles.textVoltar}>Confirmar</Text>
            </RectButton>
            <RectButton 
              style={[styles.btnSituacao,styles.AtenderColor]}
              onPress={ ()=> {} }
            > 
              <Text style={styles.textVoltar}>Atender</Text>
            </RectButton>
          </View>
        )
    } else {

      return (
          <View style={styles.ViewBtnSituacao}>
            <RectButton 
              style={[styles.btnSituacao,styles.confirmarColor]}
              onPress={ ()=> {} }
            > 
              <Text style={styles.textVoltar}>Confirmar</Text>
            </RectButton>
            <RectButton 
              style={[styles.btnSituacao,styles.AtenderColor]}
              onPress={ ()=> {} }
            > 
              <Text style={styles.textVoltar}>Atender</Text>
            </RectButton>
          </View>
        )
    }
  }
 

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={ <RefreshControl refreshing={inReload} onRefresh={onRefresh} />}  
    >
      <KeyboardAvoidingView style={styles.container2}>
        <View style={styles.header}>

          <Image 
            style={{
              width: 244,
              height: 53
            }} 
            source={require('../../../../../assets/logo1.png')} 
            />
          
          <Text style={styles.textHeader}>
            Gestor Acadêmico Redentor - Itaperuna
          </Text>
          <Text style={styles.textHeader2}>
            {horario}, {User.name}
          </Text>
        </View>   
          
        <Item data={data} /> 

        {situacao()}     

        <BtnVoltar destino={'Solicitacao'} />

      </KeyboardAvoidingView>
    </ScrollView>
  )
}
