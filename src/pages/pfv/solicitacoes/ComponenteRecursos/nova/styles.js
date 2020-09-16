/* eslint-disable no-undef */
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "10%",
    marginBottom: "5%",
  },
  textHeader: {
    textAlign: "center",
    color: "#087E85",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19,
    marginTop: "2%",
  },
  textHeader2: {
    textAlign: "center",
    color: "#087E85",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    marginTop: "1%",
  },
  ViewDados: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "flex-start",
    // borderColor: '#ABABAB',
    // borderWidth: 0.5,
    width: "97%",
    borderRadius: 8,
  },
  ViewTextHeader: {
    alignItems: "flex-start",
    width: "100%",
    marginLeft: "5%",
    top: -13,
  },
  TextHeaderDados: {
    backgroundColor: "#fff",
    borderColor: "#ABABAB",
    borderWidth: 0.5,
    borderRadius: 5,
    color: "#525252",
    padding: 5,
  },
  textStatusSolicitacao: {
    top: -14,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 14,
  },

  //Variavel de Status
  Red: {
    color: "#E51111",
  },
  Blue: {
    color: "#3690E9",
  },
  Green: {
    color: "#12A93B",
  },

  viewNomeSolicitado: {
    flex: 1,
    borderColor: "#ABABAB",
    borderWidth: 0.5,
    width: "97%",
    borderRadius: 5,
    marginBottom: 5,
    padding: 5,
    backgroundColor: "#F5F5F5",
  },
  textNomeSolicitado: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#108B93",
  },
  ViewDadosEditar: {
    width: "97%",
    flex: 1,
  },
  //Texto Header de Solicitações
  TextHeaderSolicitacoes: {
    fontWeight: "bold",
    color: "#525252",
  },

  //Solicitação Descrição,
  TextinputDescri: {
    color: "#525252",
    height: 80,
    textAlignVertical: "top",
  },
  input: {
    borderColor: "#ABABAB",
    borderWidth: 0.5,
    borderRadius: 8,
    width: "100%",
    padding: 5,
    marginBottom: 6,
  },

  //Solicitação Disciplinas,
  TextHeaderDisciplina: {
    fontWeight: "bold",
    color: "#525252",
  },
  TextinputDisciplina: {
    color: "#525252",
    textAlignVertical: "top",
  },
  inputDisciplina: {
    borderColor: "#ABABAB",
    borderWidth: 0.5,
    borderRadius: 8,
    width: "100%",
    padding: 5,
    height: 33,
    justifyContent: "center",
    marginBottom: 6,
  },
  //Solicitação Disciplinas,
  inputDateSalaQtde: {
    borderColor: "#ABABAB",
    borderWidth: 0.5,
    borderRadius: 8,
    width: "100%",
    padding: 5,
    height: 33,
    justifyContent: "center",
    marginBottom: 6,
  },
  //Campo View Container Horario
  inputViewHorario: {
    borderColor: "#ABABAB",
    borderWidth: 0.5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: "100%",
    marginBottom: 6,
  },
  //Campo Header do Horario
  ViewHeaderHorario: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TextHeaderHorario1: {
    flex: 1,
    padding: 5,
    fontWeight: "bold",
    color: "#525252",
    justifyContent: "center",
  },

  TextHeaderHorario2: {
    flex: 0.9,
    padding: 5,
    fontWeight: "bold",
    color: "#525252",
    justifyContent: "center",
    textAlign: "center",
  },

  //Campo dos horarios
  ViewAddHorario: {
    flexDirection: "row",
    flex: 0.2,
    backgroundColor: "#108B93",
    alignItems: "center",
    padding: -5,
    borderWidth: 0.5,
    borderRadius: 8,
    height: 33,
    marginTop: 5,
    marginRight: 5,
    justifyContent: "center",
  },

  ViewHorario: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#ABABAB",
    borderWidth: 0.5,
    width: "100%",
    height: 25,
  },

  ViewTurno: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  ViewDaHora: {
    flex: 0.9,
    padding: 5,
    justifyContent: "center",
  },

  //Campo de Texto nos horarios
  TextTurno: {
    color: "#525252",
  },

  TextHorario: {
    color: "#525252",
    textAlign: "center",
  },

  //Campo View Container Recurso
  inputViewRecurso: {
    borderColor: "#ABABAB",
    borderWidth: 0.5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: "100%",
    marginBottom: 15,
  },

  TextHeaderRec2: {
    flex: 1,
  },

  ViewRec: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#ABABAB",
    borderWidth: 0.5,
    width: "100%",
    height: 25,
  },

  ViewRecName: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
  },

  ViewRecQt: {
    flex: 0.23,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  //Styles Recursos
  InputTipoRecurso: {
    borderColor: "#ABABAB",
    borderWidth: 0.5,
    borderRadius: 8,
    flex: 1,
    height: 33,
    justifyContent: "center",
    // backgroundColor: '#9989',
  },

  ViewAddRecurso: {
    // backgroundColor: '#989',
    flex: 0.2,
    padding: 5,
    alignItems: "center",
  },

  PickerInput: {
    // width: '100%',
    color: "#525252",
  },

  ViewQtRecurso: {
    flexDirection: "row",
    flex: 0.8,
    // backgroundColor: '#989',
    padding: 5,
    alignItems: "center",
  },

  ViewTipoRecurso: {
    flex: 1,
  },

  TextQtRecurso: {
    flex: 1,
    padding: 5,
    fontWeight: "bold",
    color: "#525252",
  },

  InputQt: {
    flex: 0.7,
    borderWidth: 0.5,
    borderColor: "#ababab",
    borderRadius: 8,
    width: 40,
    height: 33,
    textAlign: "center",
  },

  //Botão Atender Pedente Confirmar ou Cancelar
  ViewBtnSituacao: {
    flexDirection: "row",
    marginTop: 41,
  },

  btnSituacao: {
    backgroundColor: "#E51111",
    width: "30%",
    height: 30,
    padding: 0,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },

  confirmarColor: {
    backgroundColor: "#3690E9",
  },

  AtenderColor: {
    backgroundColor: "#12A93B",
  },

  textVoltar: {
    color: "#FFF",
    fontFamily: "Roboto",
  },
});

export default styles;
