import React, { useState, useEffect, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
  Keyboard,
  AsyncStorage,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";

import { useUser } from "./Context/UserProvider";

import { FontAwesome5 } from "@expo/vector-icons";

import { base_URL_authenticate } from "./services/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login({ navigation }) {
  const { setUser } = useUser();
  const passwordRef = useRef();

  const [logo] = useState(new Animated.ValueXY({ x: 309, y: 201 }));
  const [usuario, setUsuario] = useState("rramos");
  const [password, setPassword] = useState("12345678");
  const [time, setTime] = useState(false);
  const [secureT, setSecureT] = useState(true);

  function inLoggin() {
    setTime(true);
    //o ip vai mudar dependendo do ip da maquina que for roda o server
    fetch(base_URL_authenticate, {
      method: "POST",
      //aqui vou poder mandar o token para alguma requisição
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: usuario,
        password: password,
      }),
    })
      //recebo a resposta do server
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          setUser(res.user);
          //salvando os dados no LocalStorage
          AsyncStorage.setItem("user", JSON.stringify(res.user));
          AsyncStorage.setItem("name", JSON.stringify(res.user.name));
          AsyncStorage.setItem("@token", res.token);
          const identi = res.user.identific;

          setTime(false);
          loginIdentific(identi);

          setUsuario("");
          setPassword("");
        } else {
          //Mensagem dos erros de senha, usuario e etc.
          Alert.alert(
            "Mensagem",
            `${res.message}`,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ],
            { cancelable: false }
          );
          setTime(false);
        }
      })
      .done(); //Não sei pra que.
  }
  //Função para identificar se é professor ou adm
  function loginIdentific(identi) {
    if (identi === "1") {
      navigation.navigate("AdmStack");
    } else {
      navigation.navigate("PfvStack");
    }
  }

  //função para animação da imagem logo, que diminiu ela com o teclado abre
  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 230,
        duration: 100,
        useNativeDriver: true, //Add this line
      }),
      Animated.timing(logo.y, {
        toValue: 149,
        duration: 100,
        useNativeDriver: true, //Add this line
      }),
    ]).start();
  }
  // e aumenta ela quando o teclado fecha
  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 309,
        duration: 100,
        useNativeDriver: true, //Add this line
      }),
      Animated.timing(logo.y, {
        toValue: 201,
        duration: 100,
        useNativeDriver: true, //Add this line
      }),
    ]).start();
  }

  function secureText() {
    setSecureT(!secureT);
  }

  useEffect(() => {
    if (Platform.OS === "android") {
      //aqui pegamos a informação quando o teclado abre(Show) e fecha(Hide)
      keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        keyboardDidShow
      );
      keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        keyboardDidHide
      );
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.header}>
          <View style={styles.headerTextImg}>
            <Image
              resizeMode="contain"
              source={require("./assets/LogoPng.png")}
            />

            <Text style={styles.textHeader}>
              Gestor Acadêmico UniRedentor{"\n"}Itaperuna
            </Text>

            <Text style={styles.textHeader}>Faça seu login</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={[styles.input, styles.inputIcon]}>
            <TextInput
              style={styles.TextInputSIcon}
              placeholder="Usuário"
              autoCorrect={false}
              autoCapitalize="none"
              value={usuario}
              onChangeText={(text) => {
                setUsuario(text);
              }}
              underlineColorAndroid="transparent"
              // autoFocus
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              returnKeyType="next"
            />
          </View>
          <View style={[styles.input, styles.inputIcon]}>
            <TextInput
              style={styles.TextInputIcon}
              secureTextEntry={secureT}
              // style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
              underlineColorAndroid="transparent"
              returnKeyType="send"
              onSubmitEditing={() => {
                inLoggin();
              }}
              ref={passwordRef}
            />
            <TouchableOpacity
              style={{
                flex: 0.1,
                height: "100%",
                // backgroundColor: 'red',
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => secureText()}
            >
              <FontAwesome5
                name={secureT ? "eye" : "eye-slash"}
                size={17}
                color="#ABABAB"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btnSubmit} onPress={() => inLoggin()}>
            {time ? (
              <View style={styles.viewFlatList}>
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                />
              </View>
            ) : (
              <Text style={styles.textSubmit}>Acessar</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
  },
  footer: {
    flex: 1,
    width: "80%",
  },
  textHeader: {
    textAlign: "center",
    color: "#087E85",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 45,
    marginBottom: 15,
    borderColor: "#ABABAB",
    borderWidth: 0.5,
    backgroundColor: "#fff",
    fontSize: 15,
    borderRadius: 8,
    padding: 10,
  },
  inputIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  TextInputIcon: {
    color: "#525252",
    flex: 0.9,
  },
  TextInputSIcon: {
    color: "#525252",
    flex: 1,
  },
  btnSubmit: {
    backgroundColor: "#087E85",
    height: "90%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
  },
  textSubmit: {
    fontSize: 15,
    color: "#fff",
  },
  headerTextImg: {
    width: "100%",
    alignItems: "center",
    marginBottom: 45,
    // backgroundColor: '#222'
  },
});
