import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TextInput,
  Picker,
  AsyncStorage,
} from "react-native";

//Components
import BtnVoltarBack from "../../../../../components/BtnVoltarBack/index";

import styles from "./styles";

//Context
import { useUser } from "../../../../../Context/UserProvider";

import apiaxios, { URL } from "../../../../../services/apiaxios";

export default function CadastrarRecurso({ navigation }) {
  const { User } = useUser(User);

  const [selectedValue, setSelectedValue] = useState("Selecione");
  const [postText, setPostText] = useState("");
  const [qtde, setQtde] = useState("");

  // Função de cadastrar
  async function cadastrar() {
    try {
      var Recursos = {
        descricao: postText,
        setor: selectedValue,
        status: "Ativo",
        qtde: qtde,
      };

      if (postText && qtde && selectedValue!="Selecione") {
        const res = await apiaxios.post("recursos", Recursos);

        console.log(res.data);

        Alert.alert(
          "Mensagem",
          `Foi adicionado: "${res.data.descricao}" com sucesso!`,
          [{ text: "OK", onPress: () => {navigation.navigate("Cadastro")} }]
        );

        setSelectedValue("Selecione");
        setPostText("");
        setQtde("");
      } else {
        Alert.alert(
          "Mensagem",
          `Falta alguma coisa`,
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
    } catch (error) {
      Alert.alert(
        "Mensagem",
        `Recurso: "${postText}" ${error}`,
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

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.container2}>
        <View style={styles.header}>
          <Image
            style={{ width: 244, height: 53 }}
            source={require("../../../../../assets/logo1.png")}
          />
          <Text style={styles.textHeader}>
            Gestor Acadêmico Redentor - Itaperuna
          </Text>
          <Text style={styles.textHeader2}>Boa Noite, {User.name}</Text>
        </View>

        <View style={styles.ViewDados}>
          <View style={styles.ViewTextHeader}>
            <Text style={styles.TextHeaderDados}>Novo Recurso</Text>
          </View>

          <View style={styles.Descricao}>
            <View style={styles.ViewText}>
              <Text style={styles.textDescricao}>Descrição*: </Text>
            </View>
            <View style={styles.inputDescricao}>
              <TextInput
                style={styles.input}
                value={postText}
                autoCorrect={false}
                onChangeText={(itemValue, itemIndex) => setPostText(itemValue)}
              />
            </View>
          </View>

          <View style={styles.Setor}>
            <View style={styles.ViewTextSetor}>
              <Text style={styles.textSetor}>Setor*: </Text>
            </View>
            <View style={styles.inputSetor}>
              <Picker
                style={styles.input}
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="Selecione" value="Selecione"></Picker.Item>
                <Picker.Item
                  label="Audiovisual"
                  value="Audiovisual"
                ></Picker.Item>
                <Picker.Item label="Administrativo" value="ADM"></Picker.Item>
              </Picker>
            </View>
          </View>

          <View style={styles.Quantidade}>
            <View style={styles.ViewTextQt}>
              <Text style={styles.textQT}>QT pro Dia*: </Text>
            </View>
            <View style={styles.ViewInputQT}>
              <TextInput
                keyboardType="numeric"
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
              onPress={() => cadastrar()}
            >
              <Text style={styles.textGravar}>Gravar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.textCancelar}>Cancelar / Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <BtnVoltarBack />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
