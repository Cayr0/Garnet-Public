import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  CheckBox,
  Platform,
  Picker,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RectButton } from "react-native-gesture-handler";

import styles from "./styles";
import moment, { localeData } from "moment";
import { FontAwesome5 } from "@expo/vector-icons";

import { useUser } from "../../../../../Context/UserProvider";
import apiaxios from "../../../../../services/apiaxios";

import BtnPadrao from "../../../../../components/BtnPadrao/index";
import BtnVoltar from "../../../../../components/BtnVoltar/index";

const Item = () => {
  const { navigate } = useNavigation();
  const { User } = useUser();
  const [isSelect, setIsSelect] = useState(true);

  const [ApiRecursos, setApiRecursos] = useState([]);
  const [ErroApi, setErrorApi] = useState("");

  //Data Picker
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  //OnChange Recursos
  const [recSolicitado, sterecSolicitado] = useState([]);
  const [recName, setRecName] = useState("");
  const [recId, setRecId] = useState("");
  const [recQtd, setRecQtd] = useState("");

  //OnChange Horario
  const [AddIdHorario, setAddIdHorario] = useState(0);
  const [AddNomeHorario, setAddNomeHorario] = useState("");
  const [AddNewHorario, setAddNewHorario] = useState([]);

  const [professor, setProfessor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const [disciplina2, setDisciplina2] = useState("");
  const [date, setDate] = useState(new Date());
  const [salareal, setSalareal] = useState("");
  const [qdteAlunos, setQdteAlunos] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [completed, setCompleted] = useState("PENDENTE");
  const [horario, setHorario] = useState([
    { id: 1, hora: "07:25 - 09:15", assinado: false },
    { id: 2, hora: "09:25 - 10:55", assinado: false },
    { id: 3, hora: "10:55 - 12:20", assinado: false },
    { id: 4, hora: "13:30 - 15:00", assinado: false },
    { id: 5, hora: "15:00 - 16:30", assinado: false },
    { id: 6, hora: "16:45 - 18:15", assinado: false },
    { id: 7, hora: "18:30 - 20:00", assinado: false },
    { id: 8, hora: "20:20 - 21:50", assinado: false },
  ]);
  //handlerSolicitacao
  function CheckSolicitacao() {
    Alert.alert(
      "Mensagem",
      `Você gostaria de confirmar esta operação?`,
      [
        {
          text: "Cancelar",
          onPress: () => {
            ClearHandle();
          },
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            HandlerSolicitacao();
          },
        },
      ],
      { cancelable: false }
    );
  }

  function ClearHandle() {
    console.log("CHAMOU CLEAR");
    setAddNomeHorario("");
    setDescricao("");
    setDisciplina("");
    setDisciplina2("");
    setSalareal("");
    setQdteAlunos("");
    setObservacoes("");
    setDate(new Date());
    setAddIdHorario(0);
    setAddNewHorario([]);
    sterecSolicitado([]);
    setRecName("");
    setRecId("");
    setRecQtd("");
  }

  async function HandlerSolicitacao() {
    try {
      const res = await apiaxios.post("solicitacao", {
        professor,
        descricao,
        disciplina,
        disciplina2,
        data: date,
        salareal,
        qdteAlunos,
        observacoes,
        completed,
        recsolicitado: recSolicitado,
        horario: AddNewHorario,
      });
      console.log(res.data);

      ClearHandle();

      navigate("SolicitacaoPFV");
    } catch (error) {
      setErrorApi(error);
      console.log(error);
    }
  }

  function OnChangeRecursos() {
    if (!recName == "" && !recQtd == "") {
      sterecSolicitado([
        ...recSolicitado,
        {
          id: recId,
          r: recName,
          q: recQtd,
        },
      ]);
      setRecName("");
      setRecQtd("");
    }
  }

  function InRemoveRecurso(rec) {
    var i = recSolicitado.findIndex((x) => {
      return x.id === rec.id;
    });
    var ListRecSolic = [...recSolicitado];
    ListRecSolic.splice(i, 1);
    sterecSolicitado(ListRecSolic);
  }

  //FIM OnChange Recursos

  function onChangeHorarioArray() {
    if (!AddIdHorario == 0 && !AddNomeHorario == "") {
      setAddNewHorario([
        ...AddNewHorario,
        {
          id: AddIdHorario,
          hora: AddNomeHorario,
          assinado: true,
        },
      ]);
      setAddNomeHorario("");
      setAddIdHorario(0);
    }
  }

  function InRemoveHorario(horario) {
    var i = AddNewHorario.findIndex((x) => {
      return x.id === horario.id;
    });

    var ListHorarioSolic = [...AddNewHorario];
    ListHorarioSolic.splice(i, 1);
    setAddNewHorario(ListHorarioSolic);
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  //Fim Data Picker

  const formatD = "DD/MM/YYYY";

  function periodododia(id) {
    if (id >= 1 && id <= 3) {
      return <Text style={styles.TextTurno}>MANHÃ</Text>;
    } else if (id >= 4 && id <= 6) {
      return <Text style={styles.TextTurno}>TARDE</Text>;
    } else {
      return <Text style={styles.TextTurno}>NOITE</Text>;
    }
  }

  function PeriodoDoDiaSelect(id) {
    if (id >= 1 && id <= 3) {
      return "MANHÃ";
    } else if (id >= 4 && id <= 6) {
      return "TARDE";
    } else {
      return "NOITE";
    }
  }

  async function BuscarRecursos() {
    try {
      const res = await apiaxios.get("recursos");
      setApiRecursos(res.data);
    } catch (error) {
      setErrorApi(error);
    }
  }

  useEffect(() => {
    BuscarRecursos();
    setProfessor(User.name);
  }, []);
  // console.log(ApiRecursos)
  return (
    <View style={styles.ViewDados}>
      <View style={styles.ViewTextHeader}>
        <Text style={styles.TextHeaderDados}>Solicitação</Text>
      </View>

      <View style={styles.viewNomeSolicitado}>
        <Text style={styles.textNomeSolicitado}>{professor}</Text>
      </View>

      <View style={styles.ViewDadosEditar}>
        <View>
          <Text style={styles.TextHeaderSolicitacoes}>Descrição:</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.TextinputDescri}
              multiline
              value={descricao}
              onChangeText={(value) => setDescricao(value)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.TextHeaderSolicitacoes}>Disciplina:</Text>
          <View style={styles.inputDisciplina}>
            <TextInput
              style={styles.TextinputDisciplina}
              value={disciplina}
              onChangeText={(value) => setDisciplina(value)}
            />
          </View>

          <Text style={styles.TextHeaderSolicitacoes}>Disciplina 2:</Text>
          <View style={styles.inputDisciplina}>
            <TextInput
              style={styles.TextinputDisciplina}
              value={disciplina2}
              onChangeText={(value) => setDisciplina2(value)}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "100%", flex: 1, paddingRight: "1.5%" }}>
            <Text style={styles.TextHeaderSolicitacoes}>Data:</Text>
            <View style={styles.inputDateSalaQtde}>
              <RectButton
                onPress={showDatepicker}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto",
                    color: "#525252",
                  }}
                >
                  {date ? moment(date).local().format(formatD) : "Selecione"}
                </Text>
              </RectButton>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={date}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  minimumDate={new Date()}
                />
              )}
            </View>
          </View>

          <View style={{ width: "100%", flex: 1, paddingRight: "1.5%" }}>
            <Text style={styles.TextHeaderSolicitacoes}>Sala real:</Text>
            <View style={styles.inputDateSalaQtde}>
              <TextInput
                style={styles.TextinputDisciplina}
                value={salareal}
                onChangeText={(value) => setSalareal(value)}
              />
            </View>
          </View>

          <View style={{ width: "100%", flex: 1 }}>
            <Text style={styles.TextHeaderSolicitacoes}>Qtde de Alunos:</Text>
            <View style={styles.inputDateSalaQtde}>
              <TextInput
                style={styles.TextinputDisciplina}
                keyboardType="numeric"
                value={qdteAlunos}
                onChangeText={(value) => setQdteAlunos(value)}
              />
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.TextHeaderSolicitacoes}>Horário:</Text>
          <View style={styles.inputViewHorario}>
            <View style={styles.ViewHeaderHorario}>
              <View style={[styles.ViewQtRecurso, styles.ViewTipoRecurso]}>
                <View style={styles.InputTipoRecurso}>
                  <Picker
                    style={styles.PickerInput}
                    selectedValue={AddNomeHorario}
                    onValueChange={(value, key) => {
                      setAddNomeHorario(value), setAddIdHorario(key);
                    }}
                  >
                    <Picker.Item label="Selecione um Horário" value="" />
                    {ApiRecursos &&
                      horario.map((Item) => {
                        // console.log(Item)
                        return (
                          <Picker.Item
                            label={
                              PeriodoDoDiaSelect(Item.id) + " " + Item.hora
                            }
                            value={Item.hora}
                            key={Item.id}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>

              <RectButton
                onPress={onChangeHorarioArray}
                style={styles.ViewAddHorario}
              >
                <FontAwesome5 name="plus" size={18} color="#fff" />
              </RectButton>
            </View>

            <View style={styles.ViewHeaderHorario}>
              <Text style={styles.TextHeaderHorario1}>Turno</Text>
              <Text style={styles.TextHeaderHorario2}>Horário início</Text>
              <Text style={styles.TextHeaderHorario2}>Horário término</Text>
            </View>

            {AddNewHorario &&
              AddNewHorario.map((hora, index) => {
                const horaFormated = hora.hora.split(" ");
                return (
                  <View style={styles.ViewHorario} key={index}>
                    <View style={styles.ViewTurno}>
                      <CheckBox
                        value={hora.assinado}
                        onValueChange={() => {}}
                      />
                      {periodododia(hora.id)}
                    </View>
                    <View style={styles.ViewDaHora}>
                      <Text style={styles.TextHorario}>{horaFormated[0]}</Text>
                    </View>
                    <View style={styles.ViewDaHora}>
                      <Text style={styles.TextHorario}>{horaFormated[2]}</Text>
                    </View>
                    <RectButton
                      style={styles.ViewRecQt}
                      onPress={() => InRemoveHorario(hora)}
                    >
                      <FontAwesome5
                        name="times-circle"
                        size={14}
                        color="#e63946"
                      />
                    </RectButton>
                  </View>
                );
              })}
          </View>
        </View>

        <View>
          <Text style={styles.TextHeaderSolicitacoes}>Recurso:</Text>
          <View style={styles.inputViewRecurso}>
            <View style={styles.ViewHeaderHorario}>
              <View style={[styles.ViewQtRecurso, styles.ViewTipoRecurso]}>
                <View style={styles.InputTipoRecurso}>
                  <Picker
                    style={styles.PickerInput}
                    selectedValue={recName}
                    onValueChange={(itemValue, key) => {
                      setRecName(itemValue), setRecId(key);
                    }}
                  >
                    <Picker.Item label="Recursos" value="" />
                    {ApiRecursos &&
                      ApiRecursos.map((Item) => {
                        return (
                          <Picker.Item
                            label={"Qt: " + Item.qtde + " " + Item.descricao}
                            value={Item.descricao}
                            key={Item._id}
                          />
                        );
                      })}
                  </Picker>
                </View>
              </View>

              <View style={styles.ViewQtRecurso}>
                <Text style={styles.TextQtRecurso}>Quantidade:*</Text>
                <TextInput
                  style={styles.InputQt}
                  placeholder={"0"}
                  keyboardType="numeric"
                  value={recQtd}
                  onChangeText={(value) => setRecQtd(value)}
                />
              </View>
            </View>

            <View style={styles.ViewHeaderHorario}>
              <Text style={styles.TextQtRecurso}>Nome</Text>
              <Text style={[styles.TextHeaderHorario2, styles.TextHeaderRec2]}>
                Quantidade
              </Text>
            </View>
            {recSolicitado &&
              recSolicitado.map((rec, index) => {
                return (
                  <View style={styles.ViewRec} key={index}>
                    <View style={styles.ViewRecName}>
                      <Text style={styles.TextTurno} numberOfLines={1}>
                        {rec.r}
                      </Text>
                    </View>

                    <View style={styles.ViewRecQt}>
                      <Text style={styles.TextHorario}>{rec.q}</Text>
                    </View>

                    <RectButton
                      style={styles.ViewRecQt}
                      onPress={() => InRemoveRecurso(rec)}
                    >
                      <FontAwesome5
                        name="times-circle"
                        size={14}
                        color="#e63946"
                      />
                    </RectButton>
                  </View>
                );
              })}

            <View style={{ alignItems: "center" }}>
              <BtnPadrao
                ColorText={"#fff"}
                SizeText={16}
                ColorBackGround={"#108B93"}
                TamanhoButton={33}
                NameButton={"Adicionar"}
                MarginVertical={"5%"}
                funcao={OnChangeRecursos}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", padding: 15 }}>
        <BtnPadrao
          ColorText={"#fff"}
          SizeText={16}
          ColorBackGround={"#108B93"}
          TamanhoButton={45}
          NameButton={"Solicitar"}
          MarginRigth={5}
          funcao={CheckSolicitacao}
        />
        <BtnVoltar destino={"SolicitacaoPFV"} />
      </View>
    </View>
  );
};

export default Item;
