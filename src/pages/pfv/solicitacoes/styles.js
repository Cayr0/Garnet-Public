/* eslint-disable no-undef */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '10%',
    marginBottom: '5%'
  },
  textHeader: {
    textAlign: 'center',
    color: '#087E85',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19,
    marginTop: '2%',
  },
  textHeader2: {
    textAlign: 'center',
    color: '#087E85',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    marginTop: '1%',
  },
  
  ViewDados: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // borderColor: '#ABABAB',
    // borderWidth: 0.5,
    width:'97%',
    borderRadius: 8,
  },
  ViewTextHeader: {
    alignItems: 'flex-start',
    width: '100%',
    
    top: -13
  },
  TextHeaderDados: {
    backgroundColor:'#fff',
    borderColor: '#ABABAB',
    borderWidth: 0.5,
    borderRadius: 5,
    color: '#525252',
    padding: 5,
  },
  Descricao: {
    flexDirection: 'row',
    padding: 7,
  },
  ViewFiltro: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 8,
    width: '97%'
  },
  input: {
    borderColor: '#ABABAB',
    borderWidth: 0.5,
    borderRadius: 8,
    width: '100%',
    padding: 0,
    color:'#525252',
    height: 33,
  },
  ViewInput: {
    borderColor: '#ABABAB',
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  textInput: {
    color:'#525252',
    width: '100%',
    fontSize: 13,
    padding: 3,
  },

  ViewData: {
    flex: 0.4
  },
  ViewDocente: {
    flex: 1
  },
  ViewStatusSelect: {
    flex: 0.8
  },
  textDescricao: {
    fontSize: 14,
    color: '#525252'
  },
  textData: {
    marginLeft: 4, 
  },
  btnheader: {
    flex: 1,
    flexDirection: "row",
  },
  btnbarrapesquisa: {
    flexDirection: 'row',
    borderRadius: 8,
    alignItems:'center',
    justifyContent:'center',
    width: 120,
    height: 35,
    margin: 5,
  },
  corbtn1: {
    backgroundColor:'#E4E4E4',
  },
  corbtn2: {
    flex: 1,
    backgroundColor:'#108B93',
  },
  textBtn: {
    marginLeft: 6,
    fontSize: 16,
    color: '#525252',
  },
  textBtnNovo: {
    color: '#fff',
  },

  viewRecurso: {
    flex: 1,
    borderColor: '#ABABAB',
    borderWidth: 0.5,
    width:'97%',
    borderRadius: 5,
    padding:5,
    backgroundColor: '#F5F5F5'
  },

  textRecurso: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'#525252',
  },

  viewFlatList: {
    flex: 1,
    //borderColor: '#ABABAB',
    //borderWidth: 0.5,
    width:'99%',
    //borderRadius: 5,
    
    padding:5,
    backgroundColor: '#fff'
  },
  barraDescricao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  /*Styles Flatlist*/
  flatList: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // maxHeight: '10%',
    flex: 1,
    borderColor: '#E4E4E4',
    borderWidth: 1,
    backgroundColor: '#F5F5F5'
  },

  /*Styles Dentro do Flatlist*/
  ViewDisciplinas: {
    flexDirection: "column",
    // flex: 0.8,
    width: 73,
    padding: 3,
  },
  textDisciplinas: {
    fontWeight: 'bold',
    color: '#525252',
    fontSize: 11,
    fontFamily: "Roboto",
  },
  textNomeDisciplinas: {
    fontWeight: 'normal',
    color: '#525252',
    fontSize: 11,
    fontFamily: "Roboto",
  },
  //-------------------
  ViewRecurso: {
    flexDirection: "column",
    padding: 3,
    flex: 1,
    marginLeft: 2,
  },
  textRecurso: {
    fontWeight: 'bold',
    color: '#525252',
    fontSize: 11,
    fontFamily: "Roboto",
  },
  textNRecurso: {
    fontWeight: 'normal',
  },
  //------------------------
  ViewHorario: {
    flexDirection: "column",
    padding: 3,
    flex: 0.8,
    marginLeft: 2,
  },
  textHorario: {
    fontWeight: 'bold',
    color: '#525252',
    fontSize: 11,
    fontFamily: "Roboto",
  },
  textNomeHorario: {
    fontWeight: 'normal',
    color: '#525252',
    fontSize: 11,
    fontFamily: "Roboto",
  },
  textDate: {
    fontWeight: 'bold',
    color: '#525252',
    fontSize: 11,
    fontFamily: "Roboto",
  },
  //------------------------
  ViewStts: {
    flexDirection: "column",
    padding: 3,
    marginLeft: 2,
  },
  ViewNomeStts: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "70%",
  },
  textStts: {
    fontWeight: 'bold',
    color: '#525252',
    fontSize: 11,
    fontFamily: "Roboto",
  },

  //Variavel de Status
  CircleRed: {
    width:20,
    height:20,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "#E51111",
  },
  CircleBlue: {
    width:20,
    height:20,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "#3690E9",
  },
  CircleGreen: {
    width:20,
    height:20,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "#12A93B",
  },


  //Botão de Voltar
  btnVoltarView: {
    justifyContent: 'center',
    margin: '15%',
    width: '50%'
  },
  btnVoltar: {
    backgroundColor:'#E4E4E4',
    borderRadius: 8,
    alignItems:'center',
    justifyContent:'center',
    height: 45,
  },
  textVoltar: {
    fontSize: 16,
    color: '#525252',
  },
});

export default styles;
