import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  AsyncStorage,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TextInput,
  Picker,
  Image,
  YellowBox,
} from "react-native";

import { URL } from "../../../services/apiaxios";

import { FontAwesome5 } from "@expo/vector-icons";

import styles from "./styles";
import Item from "./Item";
import apiaxios from "../../../services/apiaxios";

//Components
import BtnVoltar from "../../../components/BtnVoltar/index";
import { useFocusEffect } from "@react-navigation/native";

export default function Solicitacao({ navigation: { goBack, navigate } }) {
  const [solictacoes, setSolicitacoes] = useState([]);
  const [inMemorySolicitacoes, setInMemorySolicitacoes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [errorApi, setErrorApi] = useState("");
  const [horario, setHorario] = useState("");
  const [Name, setName] = useState("");
  const [inReload, setInReload] = useState(true);
  const [selectedValue, setSelectedValue] = useState("Todos");

  YellowBox.ignoreWarnings([
    "VirtualizedLists should never be nested", // TODO: Remove when fixed
  ]);

  AsyncStorage.getItem("name", (err, result) => {
    if (result != null) {
      setName(JSON.parse(result));
    }
  });

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

  // function onRefresh() {
  //   //Vai limpar o useState data que está armazenado os Dados da API
  //   //Vai obter os dados mais recentes, da API
  //   SearchingTheAPISolicitacoes()
  //   console.log("Pull Refresh nas Solicitacoes")
  // }

  function registerToSocket() {
    const socket = io(URL);

    //CreateSolicitacao, UpdateSolicitacao
    socket.on("CreateSolicitacao", (newSolicitacao) => {
      setSolicitacoes([newSolicitacao, ...solictacoes]);
      setInMemorySolicitacoes([newSolicitacao, ...inMemorySolicitacoes]);
    });
  }

  useFocusEffect(
    useCallback(()=>{
      SearchingTheAPISolicitacoes();
      return () => SearchingTheAPISolicitacoes();
    },[]),
  );

  async function SearchingTheAPISolicitacoes() {
    try {
      const res = await apiaxios.get("solicitacao", {
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': `Bearer ${JWT_TOKEN}`
        },
      });

      setSolicitacoes(res.data);
      setInMemorySolicitacoes(res.data);

      setInReload(false);
    } catch (error) {
      setErrorApi(error);
    }
  }

  function searchList() {
    const filteredList = inMemorySolicitacoes.filter((list) => {
      let listLowercase = list.professor.toLowerCase();

      let searchTermLowercase = filterText.toLowerCase();

      return listLowercase.indexOf(searchTermLowercase) > -1;
    });
    setSolicitacoes(filteredList);
  }

  function ClearFilter() {
    setFilterText("");
    if (filterText == "") {
      searchList();
    }
  }

  useEffect(() => {
    registerToSocket();
  }, [solictacoes]);

  useEffect(() => {
    SearchingTheAPISolicitacoes();
    Horario();
  },[]);

  return (
    <ScrollView
      style={styles.container}
      // refreshControl={ <RefreshControl refreshing={inReload} onRefresh={onRefresh} />}
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
            {horario}, {Name}
          </Text>
        </View>

        <View style={styles.ViewDados}>
          <View style={styles.ViewTextHeader}>
            <Text style={styles.TextHeaderDados}>Solicitações</Text>
          </View>

          <View>
            <View style={styles.ViewFiltro}>
              <Text style={styles.textDescricao}>Status: </Text>
              <View style={[styles.ViewInput, styles.ViewStatusSelect]}>
                <Picker
                  style={styles.input}
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }
                  itemStyle={{ fontSize: 7 }}
                >
                  <Picker.Item label="Todos" value="Todos" />
                  <Picker.Item label="Atendida" value="ATENDIDA" />
                  <Picker.Item label="Pendente" value="PENDENTE" />
                  <Picker.Item label="Andamento" value="ANDAMENTO" />
                </Picker>
              </View>
              <Text style={styles.textDocente}>Docente: </Text>
              <View style={[styles.ViewInput, styles.ViewDisciplina]}>
                <TextInput
                  style={styles.textInput}
                  value={filterText}
                  autoCorrect={false}
                  onChangeText={(value) => setFilterText(value)}
                />
              </View>
            </View>

            <View style={styles.ViewFiltro}>
              <Text style={styles.textDescricao}>Data: </Text>
              <View style={[styles.ViewInput, styles.ViewData]}>
                <TextInput
                  style={styles.textInput}
                  value={""}
                  autoCorrect={false}
                  onChangeText={() => {}}
                />
              </View>
              <Text style={styles.textDisciplina}>Disciplina: </Text>
              <View style={[styles.ViewInput, styles.ViewDocente]}>
                <TextInput
                  style={styles.textInput}
                  value={""}
                  autoCorrect={false}
                  onChangeText={() => {}}
                />
              </View>
            </View>

            <View style={styles.ViewFiltro}>
              <TouchableOpacity
                style={[styles.btnbarrapesquisa, styles.corbtn1]}
                onPress={() => ClearFilter()}
              >
                <FontAwesome5 name="backspace" size={12} color="#525252" />
                <Text style={styles.textBtn}>Limpar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btnbarrapesquisa, styles.corbtn2]}
                onPress={() => searchList()}
              >
                <FontAwesome5 name="search" size={12} color="#fff" />
                <Text style={[styles.textBtn, styles.textBtnNovo]}>
                  Consultar
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.viewRecurso}>
            <Text style={styles.textRecurso}>Solicitações</Text>
          </View>

          {inReload ? (
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
            <SafeAreaView style={styles.viewFlatList}>
              <FlatList
                data={solictacoes}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View>
                    <Item item={item} />
                  </View>
                )}
              />
            </SafeAreaView>
          )}
        </View>

        <BtnVoltar destino={"Dashboard"} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
