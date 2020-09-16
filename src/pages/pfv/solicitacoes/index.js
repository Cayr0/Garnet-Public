import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TextInput,
  Picker,
  Image,
  YellowBox,
} from "react-native";

//Context
import { useUser } from "../../../Context/UserProvider";

//Components
import BtnVoltar from "../../../components/BtnVoltar/index";
import Item from "./Item";

import { FontAwesome5 } from "@expo/vector-icons";
import apiaxios from "../../../services/apiaxios";
import { URL } from "../../../services/apiaxios";

import styles from "./styles";

export default function SolicitacaoPFV({ navigation: { navigate } }) {
  const { User } = useUser(User);

  const [solictacoes, setSolicitacoes] = useState([]);
  const [filterSolicitacoes, setFilterSolicitacoes] = useState([]);
  const [errorApi, setErrorApi] = useState("");
  const [horario, setHorario] = useState("");
  const [inReload, setInReload] = useState(true);

  //State Filters
  const [disciplinaFilter, setDisciplinaFilter] = useState("");
  const [dataFilter, setDateFilter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  YellowBox.ignoreWarnings([
    "VirtualizedLists should never be nested", // TODO: Remove when fixed
  ]);

  function registerToSocket() {
    const socket = io(URL);

    //CreateSolicitacao, UpdateSolicitacao
    socket.on("CreateSolicitacao", (newSolicitacao) => {
      // setSolicitacoes([newSolicitacao, ...solictacoes]);
      // setFilterSolicitacoes([newSolicitacao, ...filterSolicitacoes]);
      SearchingTheAPISolicitacoes();
    });

    socket.on("DeleteSolicitacao", (newSolicitacao) => {
      // setSolicitacoes([newSolicitacao, ...solictacoes]);
      // setFilterSolicitacoes([newSolicitacao, ...filterSolicitacoes]);
      SearchingTheAPISolicitacoes();
    });
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

  // function onRefresh() {
  //   //Vai limpar o useState data que está armazenado os Dados da API
  //   //Vai obter os dados mais recentes, da API
  //   SearchingTheAPISolicitacoes()
  //   console.log("Pull Refresh nas Solicitacoes")
  // }

  async function SearchingTheAPISolicitacoes() {
    try {
      const res = await apiaxios.get(`solicitacao/user/${User._id}`);

      setSolicitacoes(res.data);
      setFilterSolicitacoes(res.data);

      setInReload(false);
    } catch (error) {
      setErrorApi(error);
    }
  }

  //useEffect Pesquisa de Filtros
  useEffect(() => {
    if (!disciplinaFilter == "") {
      setFilterSolicitacoes(
        solictacoes.filter((list) => {
          return list.disciplina
            .toLowerCase()
            .includes(disciplinaFilter.toLowerCase());
        })
      );
    }
    if (!selectedFilter == "") {
      setFilterSolicitacoes(
        solictacoes.filter((list) => {
          return list.completed
            .toLowerCase()
            .includes(selectedFilter.toLowerCase());
        })
      );
    }
    if (!dataFilter == "") {
      setFilterSolicitacoes(
        solictacoes.filter((list) => {
          return list.data.toLowerCase().includes(dataFilter.toLowerCase());
        })
      );
    }
  }, [disciplinaFilter, selectedFilter, dataFilter, solictacoes]);

  function ClearFilter() {
    setFilterSolicitacoes(solictacoes), setDisciplinaFilter("");
    setSelectedFilter(""), setDateFilter("");
  }

  useEffect(() => {
    registerToSocket();
  }, [solictacoes]);

  useEffect(() => {
    SearchingTheAPISolicitacoes();
    Horario();
    return function cleanup() {
      abortController.abort();
    };
  }, []);

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
            {horario}, {User.name}
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
                  selectedValue={selectedFilter}
                  onValueChange={(value) => setSelectedFilter(value)}
                  itemStyle={{ fontSize: 7 }}
                >
                  <Picker.Item label="Todos" value="" />
                  <Picker.Item label="Atendida" value="ATENDIDA" />
                  <Picker.Item label="Pendente" value="PENDENTE" />
                  <Picker.Item label="Andamento" value="ANDAMENTO" />
                </Picker>
              </View>
              <Text style={[styles.textDescricao, styles.textData]}>
                Data:{" "}
              </Text>
              <View style={[styles.ViewInput, styles.ViewData]}>
                <TextInput
                  style={styles.textInput}
                  value={dataFilter}
                  autoCorrect={false}
                  onChangeText={(value) => setDateFilter(value)}
                />
              </View>
            </View>

            <View style={styles.ViewFiltro}>
              <Text style={styles.textDescricao}>Disciplina: </Text>
              <View style={[styles.ViewInput, styles.ViewDocente]}>
                <TextInput
                  style={styles.textInput}
                  value={disciplinaFilter}
                  autoCorrect={false}
                  onChangeText={(value) => setDisciplinaFilter(value)}
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
                onPress={() => navigate("NovaSolicitacaoPFV")}
              >
                <FontAwesome5 name="plus" size={12} color="#fff" />
                <Text style={[styles.textBtn, styles.textBtnNovo]}>
                  Nova Solicitação
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
              <FlatList //RecicleView no React Native
                data={filterSolicitacoes}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
                renderItem={({ item }) => {
                  if (item.completed === "PENDENTE") {
                    return (
                      <View>
                        <Item item={item} />
                      </View>
                    );
                  }
                }}
              />
            </SafeAreaView>
          )}
        </View>

        <BtnVoltar destino={"DashboardPFV"} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
