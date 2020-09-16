import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";

import { RectButton } from "react-native-gesture-handler";

import { useUser } from "../../../../../Context/UserProvider";
//Components
import BtnVoltar from "../../../../../components/BtnVoltar/index";

//API
import apiaxios from "../../../../../services/apiaxios";

import Item from "./Item";

import styles from "./styles";

export default function EditarSolicitacaoPFV({ route, navigation }) {
  const { User } = useUser();

  const [selectedValue, setSelectedValue] = useState("");
  const [inReload, setInReload] = useState(true);
  const [horario, setHorario] = useState("");
  const [data, setData] = useState([
    {
      professor: "",
      dataSolicitada: "",
      dataFezSolicitacao: "",
      horario: [],
      salaSolic: "",
      statusSolic: "",
      descricao: "",
      disciplina: "",
      disciplina2: "",
      qtdealunos: "",
      recsolicitado: [],
      observacao: "",
      id: "",
    },
  ]);

  const { itemId } = route.params;

  useEffect(() => {
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
  }, []);

  function atualizar() {
    //o ip vai mudar dependendo do ip da maquina que for roda o server
    fetch(base_URL_DELETE_PUT_GET_POST_Recursos + id, {
      method: "PUT",
      //aqui vou poder mandar o token para alguma requisição
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descricao: postText,
        setor: selectedValue,
        status: status,
        qtde: qtde,
      }),
    })
      //recebo a resposta do server
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          Alert.alert(
            "Mensagem",
            `${res.error}`,
            [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
              },
              { text: "OK", onPress: () => {} },
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            "Mensagem",
            `Foi Atualizado: "${res.descr.descricao}" com sucesso!`
          );
          setSelectedValue("Selecione");
          setPostText("");
          setQtde("");
          setTimeout(() => navigation.navigate("Cadastro"), 1500);
        }
      });
  }

  function delet() {
    Alert.alert(
      "Alerta",
      "Tem certeza que deseja deletar essa solicitação ?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            deletar();
          },
        },
      ],
      { cancelable: false }
    );
  }

  async function deletar() {
    try {
      const res = await apiaxios.delete(`solicitacao/${itemId._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Alert.alert(
        "Alerta",
        `${res.data.message}`,
        [
          {
            text: "Não",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "Sim",
            onPress: () => {
              Apagou();
            },
          },
        ],
        { cancelable: false }
      );

      console.log(res.status);
    } catch (error) {
      console.log(error);
    }
  }

  function Apagou() {
    navigation.navigate("SolicitacaoPFV");
  }

  function onRefresh() {
    //Vai limpar o useState data que está armazenado os Dados da API
    //Vai obter os dados mais recentes, da API
    //BuscarRecursos();
  }

  function Horario() {
    let d = new Date();
    let hour = d.getHours();
    if (hour < 5) {
      setHorario("Boa Noite");
    } else if (hour < 8) {
      setHorario("Bom Dia");
    } else if (hour < 12) {
      setHorario("Bom Dia");
    } else if (hour < 18) {
      setHorario("Boa tarde");
    } else {
      setHorario("Boa noite");
    }
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={inReload} onRefresh={onRefresh} />
      }
    >
      <KeyboardAvoidingView style={styles.container2}>
        <View style={styles.header}>
          <Image
            style={{
              width: 244,
              height: 53,
            }}
            source={require("../../../../../assets/logo1.png")}
          />

          <Text style={styles.textHeader}>
            Gestor Acadêmico Redentor - Itaperuna
          </Text>
          <Text style={styles.textHeader2}>
            {horario}, {User.name}
          </Text>
        </View>

        <Item data={data} />

        <View style={styles.ViewBtnSituacao}>
          <RectButton
            style={styles.btnSituacao}
            onPress={() => {
              delet();
            }}
          >
            <Text style={styles.textVoltar}>Deletar</Text>
          </RectButton>
        </View>

        <BtnVoltar destino={"SolicitacaoPFV"} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
