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
    marginBottom:'10%'
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

  btnVoltarView: {
    justifyContent: 'center',
    marginTop: '15%',
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

  ViewDados: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: '#ABABAB',
    borderWidth: 0.5,
    width:'97%',
    borderRadius: 8,
  },
  Descricao: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems:'center',
    padding: 5,
  },
  input: {
    borderColor: '#ABABAB',
    borderWidth: 0.5,
    borderRadius: 8,
    width: '100%',
    fontSize: 13,
    padding: 3,
  },
  ViewTextHeader: {
    alignItems: 'flex-start',
    width: '100%',
    marginLeft: '5%',
    top: -13
  },
  TextHeaderDados: {
    backgroundColor:'#fff',
    borderRadius: 5,
    borderColor: '#ABABAB',
    borderWidth: 0.5,
    color: '#525252',
    padding: 5,
    
  },
  textDescricao: {
    fontSize: 14,
    color: '#525252'
  },
  ViewText: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 60,
    flex: 1,
    
  },
  inputDescricao: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 4,
  },
  btnheader: {
    flex: 1,
    flexDirection: "row",
    marginBottom: '3%',
    padding: 10,
  },
  BtnBarra: {
    flexDirection: 'row',
    borderRadius: 8,
    alignItems:'center',
    justifyContent:'center',
    height: 35,
    margin: 3,
  },
  BtnNovo: {
    backgroundColor:'#108B93',
    width: "40%",
  },
  BtnPesquisa: {
    backgroundColor:'#E4E4E4',
    width: "30%",
  },
  textBtn: {
    fontSize: 16,
    color: '#525252',
    marginLeft: 6,
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
    marginBottom: 5,
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
    width:'97%',
    //borderRadius: 5,
    marginBottom: 5,
    padding:5,
    backgroundColor: '#fff'
  },
  barraDescricao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  textBarraDescricao: {
    marginLeft:'50%',
    fontWeight: 'bold',
    color: '#525252'
  },
  textDesc: {
    fontWeight: 'bold',
    color: '#525252'
  },
  flatList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 26,
    borderColor: '#E4E4E4',
    borderBottomWidth: 1,
  },
  test1: {
    flex: 3,
    width: '60%',
    //backgroundColor: '#CD025C',
    color: '#525252'
  },
  test2: {
    flex: 0.6,
    width: 1,
    //backgroundColor: '#aaf5d8',
    textAlign: 'center',
    color: '#525252',
  },
  test3: {
    flex: 0.6,
    width: '10%',
    //backgroundColor: '#e03b3b',
    textAlign: 'center',
    color: '#525252',
  },
});

export default styles;
