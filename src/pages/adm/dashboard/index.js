import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  AsyncStorage,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import styles from "./styles";

export default function Dashboard({ navigation }) {
  const [Name, setName] = useState("");
  const [horario, setHorario] = useState("");

  AsyncStorage.getItem("name", (err, result) => {
    if (result != null) {
      setName(JSON.parse(result));
    }
  });

  useEffect(() => {
    Horario();
  }, []);

  function Logout() {
    AsyncStorage.clear();
    navigation.replace("Login");
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
    <ScrollView style={styles.container}>
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

        <View style={styles.btnDashboard}>
          <TouchableOpacity
            style={styles.btndash}
            onPress={() => navigation.navigate("Perfil")}
          >
            <FontAwesome5 name="user-alt" size={12} color="#fff" />
            <Text style={styles.textSubmit}>Meu Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btndash}
            onPress={() => navigation.navigate("Cadastro")}
          >
            <FontAwesome5 name="cog" size={12} color="#fff" />
            <Text style={styles.textSubmit}>Cadastro de Recursos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btndash}
            onPress={() => navigation.navigate("Solicitacao")}
          >
            <FontAwesome5 name="list-ul" size={12} color="#fff" />
            <Text style={styles.textSubmit}>Solicitações de Recursos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btndash, styles.btndashSair]}
            onPress={() => Logout()}
          >
            <FontAwesome5 name="times" size={12} color="#525252" />
            <Text style={[styles.textSubmit, styles.textSubmitSair]}>Sair</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
