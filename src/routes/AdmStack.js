import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

//Rotas ADM
import Dashboard from '../pages/adm/dashboard/index';
import Perfil from '../pages/adm/perfil/index';
import Cadastro from '../pages/adm/cadastro-recurso/index';
import Solicitacao from '../pages/adm/solicitacoes/index';
import EditarRecurso from '../pages/adm/cadastro-recurso/ComponenteRecursos/editar/index';
import CadastrarRecurso from '../pages/adm/cadastro-recurso/ComponenteRecursos/cadastrar';
import EditarSolicitacao from '../pages/adm/solicitacoes/ComponenteRecursos/editar/index';

const { Navigator, Screen } = createStackNavigator();

function AdmStack() {
  return (
    <Navigator initialRouteName={Dashboard}>
      <Screen name="Dashboard" component={Dashboard} 
        options={{ headerTransparent: true, headerTitle: null, }}
      />
      <Screen name="Perfil" component={Perfil} 
        options={{ headerTransparent: true, headerTitle: null, }}
      />
      <Screen name="Cadastro" component={Cadastro} 
        options={{ headerTransparent: true, headerTitle: null, }}
      />
      <Screen name="Solicitacao" component={Solicitacao} 
        options={{ headerTransparent: true, headerTitle: null, }}
      />
      <Screen name="EditarSolicitacao" component={EditarSolicitacao} 
        options={{ headerTransparent: true, headerTitle: null, }}
      />
      <Screen name="EditarRecurso" component={EditarRecurso} 
        options={{ headerTransparent: true, headerTitle: null, }}
      />
      <Screen name="CadastrarRecurso" component={CadastrarRecurso} 
        options={{ headerTransparent: true, headerTitle: null, }}
      />
    </Navigator>
  );
};

export default AdmStack;