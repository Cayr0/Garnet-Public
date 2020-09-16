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

import { useUser } from "../../../../../Context/UserProvider";
//Components
import BtnPadrao from "../../../../../components/BtnPadrao/index";

import Item from "./Item";

import styles from "./styles";

export default function NovaSolicitacaoPFV({ navigation: { navigate } }) {
  const { User } = useUser();

  const [inReload, setInReload] = useState(false);
  const [horario, setHorario] = useState("");

  useEffect(() => {
    Horario();
  }, []);

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

  function onRefresh() {}

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

        <Item />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
