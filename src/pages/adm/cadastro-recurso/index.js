import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  YellowBox,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import apiaxios from "../../../services/apiaxios";
import { URL } from "../../../services/apiaxios";

//Context
import { useUser } from "../../../Context/UserProvider";

//Components
import BtnVoltar from "../../../components/BtnVoltar/index";

import styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";

export default function Cadastro({ navigation: { goBack, navigate } }) {
  const { User } = useUser(User);

  YellowBox.ignoreWarnings([
    "VirtualizedLists should never be nested", // TODO: Remove when fixed
  ]);

  const [data, setData] = useState([]);
  const [isMemoryData, setIsMemoryData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [errorApi, setErrorApi] = useState("");
  const [pullRefresh, setPullRefresh] = useState(false);
  const [horario, setHorario] = useState("");

  useFocusEffect(
    useCallback(()=>{
      BuscarRecursos();
      return () => BuscarRecursos();
    },[]),
  );

  // async function registerToSocket() {
  //   const socket = io(URL);

  //   //CreateSolicitacao, UpdateSolicitacao
  //   await socket.on("CreateRecurso", (newRecurso) => {
  //     console.log(newRecurso);
  //     setData([newRecurso, ...data]);
  //     setIsMemoryData([newRecurso, ...isMemoryData]);
  //   });

  //   await socket.on("UpdateRecurso", (updateRecurso) => {
  //     setData(
  //       data.map((Rec) => {
  //         Rec._id === updateRecurso._id ? updateRecurso : Rec;
  //       })
  //     );
  //     setIsMemoryData(data);
  //   });
  // }

  // useEffect(() => {
  //   registerToSocket();
  // }, [data]);

  useEffect(() => {
    Horario();
    BuscarRecursos();
  }, []);
  //Busca no banco e traz os recursos cadastrados
  async function BuscarRecursos() {
    try {
      //Lib para conectar com o banco
      const res = await apiaxios.get("recursos");
      setData(res.data);
      setIsMemoryData(res.data);
    } catch (error) {
      setErrorApi(error);
    }
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

  async function onRefresh() {
    //Vai limpar o useState data que está armazenado os Dados da API
    setData([]);
    //Vai obter os dados mais recentes, da API
    await BuscarRecursos();
  }

  function searchList() {
    const filteredList = isMemoryData.filter((list) => {
      let listLowercase = list.descricao.toLowerCase();

      let searchTermLowercase = filterText.toLowerCase();

      return listLowercase.indexOf(searchTermLowercase) > -1;
    });
    setData(filteredList);
  }

  async function ClearFilter() {
    setFilterText("");
    if (!filterText) {
      searchList();
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigate("EditarRecurso", { itemId: item });
      }}
      style={styles.flatList}
    >
      <Text style={styles.test1} numberOfLines={1}>
        {item.descricao}
      </Text>
      <Text style={styles.test2}>{item.qtde}</Text>
      <Text style={styles.test3}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={pullRefresh} onRefresh={onRefresh} />
      }
    >
      <KeyboardAvoidingView style={styles.container2}>
        <View style={styles.header}>
          <Image
            style={{
              width: 244,
              height: 53,
            }}
            source={require("../../../assets/logo1.png")}
          />

          <Text style={styles.textHeader}>
            Gestor Acadêmico Redentor - Itaperuna
          </Text>
          <Text style={styles.textHeader2}>
            {horario}, {User.name}
          </Text>
        </View>

        <View style={styles.ViewDados}>
          <View style={styles.ViewTextHeader}>
            <Text style={styles.TextHeaderDados}>
              Administração de Recursos
            </Text>
          </View>

          <View style={styles.Descricao}>
            <View style={styles.ViewText}>
              <Text style={styles.textDescricao}>Descrição: </Text>
            </View>
            <View style={styles.inputDescricao}>
              <TextInput
                style={styles.input}
                placeholder="Pesquisar..."
                value={filterText}
                autoCorrect={false}
                onChangeText={(value) => {
                  setFilterText(value);
                }}
              />
            </View>
          </View>

          <View style={styles.btnheader}>
            <TouchableOpacity
              style={[styles.BtnBarra, styles.BtnPesquisa]}
              onPress={() => {
                ClearFilter();
              }}
            >
              <FontAwesome5 name="backspace" size={12} color="#525252" />
              <Text style={styles.textBtn}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.BtnBarra, styles.BtnPesquisa]}
              onPress={() => searchList()}
            >
              <FontAwesome5 name="search" size={12} color="#525252" />
              <Text style={styles.textBtn}>Consultar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.BtnBarra, styles.BtnNovo]}
              onPress={() => {
                navigate("CadastrarRecurso");
              }}
            >
              <FontAwesome5 name="plus" size={12} color="#fff" />
              <Text style={[styles.textBtn, styles.textBtnNovo]}>
                Novo recurso
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.viewRecurso}>
            <Text style={styles.textRecurso}>Recursos</Text>
          </View>

          {!data ? (
            <View style={styles.viewFlatList}>
              <ActivityIndicator
                size="large"
                color="#087E85"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              />
            </View>
          ) : (
            <View style={styles.viewFlatList}>
              <View style={styles.barraDescricao}>
                <Text style={styles.textDesc}>Descrição</Text>
                <Text style={styles.textBarraDescricao}>QT/dia</Text>
                <Text style={styles.textDesc}>Status</Text>
              </View>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </View>

        <BtnVoltar destino={"Dashboard"} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
