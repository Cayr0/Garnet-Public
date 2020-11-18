import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Picker,
  AsyncStorage,
  Alert,
} from "react-native";

//Context
import { useUser } from "../../../../../Context/UserProvider";

// import apiaxios from "../../../services/apiaxios";

import styles from "./styles";

import apiaxios, { URL } from "../../../../../services/apiaxios";

export default function EditarRecurso({ route, navigation }) {
  const { User } = useUser(User);

  /*YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ])*/

  const [selectedValue, setSelectedValue] = useState("");
  const [postText, setPostText] = useState("");
  const [qtde, setQtde] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");
  const { itemId } = route.params;

  useEffect(() => {
    setPostText(itemId.descricao);
    setSelectedValue(itemId.setor);
    setQtde(itemId.qtde);
    setId(itemId._id);
    setStatus(itemId.status);
  }, []);

  async function atualizar() {
    try {
      var Recursos = {
        descricao: postText,
        setor: selectedValue,
        status: status,
        qtde: qtde,
      };

      if (postText && qtde && selectedValue === "Selecione") {
        const res = await apiaxios.put(`recursos/${id}`, Recursos);

        console.log(res.data);

        Alert.alert(
          "Mensagem",
          `Foi Atualizado: "${res.data.descricao}" com sucesso!`
        );
        setSelectedValue("Selecione");
        setPostText("");
        setQtde("");
        setTimeout(() => {
          navigation.navigate("Cadastro");
        });
      }
    } catch (error) {
      Alert.alert(
        "Mensagem",
        `${error}`,
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
    }
  }

  function delet() {
    Alert.alert(
      "Alerta",
      "Tem certeza que deseja deletar este recurso ?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel",
        },
        { text: "Sim", onPress: () => deletar() },
      ],
      { cancelable: false }
    );
  }

  async function deletar() {
    const res = await apiaxios.delete(`recursos/${id}`);

    if (res) {
      Alert.alert("Mensagem", `${res.data.message}`, [
        {
          text: "Sim",
          onPress: () => {
            navigation.navigate("Cadastro");
          },
        },
      ]);
      setPostText("");
      setSelectedValue("");
      setQtde("");
      setId("");
      setStatus("");
    }
  }

  return (
    <ScrollView style={styles.container}>
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
          <Text style={styles.textHeader2}>Boa Noite, {User.name}</Text>
        </View>

        <View style={styles.ViewDados}>
          <View style={styles.ViewTextHeader}>
            <Text style={styles.TextHeaderDados}>Editar Recurso</Text>
          </View>

          <View style={styles.Descricao}>
            <View style={styles.ViewText}>
              <Text style={styles.textDescricao}>Descrição*: </Text>
            </View>
            <View style={styles.inputDescricao}>
              <TextInput
                style={styles.input}
                numberOfLines={1}
                value={postText}
                autoCorrect={false}
                onChangeText={(itemValue, itemIndex) => setPostText(itemValue)}
              />
            </View>
          </View>

          <View style={styles.Setor}>
            <View style={styles.ViewText}>
              <Text style={styles.textSetor}>Setor*: </Text>
            </View>
            <View style={styles.inputSetor}>
              <Picker
                style={{
                  borderColor: "#ABABAB",
                  borderWidth: 0.5,
                  borderRadius: 8,
                  width: "100%",
                  height: 33,
                }}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
                itemStyle={{ fontSize: 10 }}
              >
                <Picker.Item
                  color="#525252"
                  label="Selecione"
                  value="Selecione"
                ></Picker.Item>
                <Picker.Item
                  color="#525252"
                  label="Audiovisual"
                  value="Audiovisual"
                ></Picker.Item>
                <Picker.Item
                  color="#525252"
                  label="Administrativo"
                  value="adm"
                ></Picker.Item>
              </Picker>
            </View>
          </View>

          <View style={styles.Status}>
            <View style={styles.ViewText}>
              <Text style={styles.textStts}>Status*: </Text>
            </View>
            <View style={styles.ViewInputStts}>
              <TextInput
                style={styles.inputStatus}
                numberOfLines={1}
                value={status}
                autoCorrect={false}
                onChangeText={(itemValue, itemIndex) => setStatus(itemValue)}
              />
            </View>
          </View>

          <View style={styles.Quantidade}>
            <View style={styles.ViewText}>
              <Text style={styles.textQT}>QT pro Dia*: </Text>
            </View>
            <View style={styles.ViewInputQT}>
              <TextInput
                style={styles.inputQT}
                value={qtde}
                autoCorrect={false}
                onChangeText={(itemValue, itemIndex) => setQtde(itemValue)}
              />
            </View>
          </View>

          <View style={styles.ViewBtns}>
            <TouchableOpacity
              style={styles.btnGravar}
              onPress={() => atualizar()}
            >
              <Text style={styles.textGravar}>Gravar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={() => delet()}
            >
              <Text style={styles.textCancelar}>Deletar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.btnVoltarView}>
          <TouchableOpacity
            style={styles.btnVoltar}
            onPress={() => goBack("Cadastro")}
          >
            <Text style={styles.textVoltar}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
