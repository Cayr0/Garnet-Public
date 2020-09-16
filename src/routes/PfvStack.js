import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

//Rota PFV
import DashboardPFV from '../pages/pfv/dashboard/index';
import PerfilPFV from '../pages/pfv/perfil/index';
import SolicitacaoPFV from '../pages/pfv/solicitacoes/index';
import EditarSolicitacaoPFV from '../pages/pfv/solicitacoes/ComponenteRecursos/editar/index';
import NovaSolicitacaoPFV from '../pages/pfv/solicitacoes/ComponenteRecursos/nova/index';

const { Navigator, Screen } = createStackNavigator();

function PfvStack() {
  return (
    <Navigator initialRouteName={DashboardPFV}>
      <Screen name="DashboardPFV" component={DashboardPFV} 
        options={{ headerTransparent: true, headerTitle: null, }}
      />
      <Screen name="PerfilPFV" component={PerfilPFV} 
        options={{ headerTransparent: true, headerTitle: null, }}
      />
      <Screen name="SolicitacaoPFV" component={SolicitacaoPFV} 
        options={{ headerTransparent: true, headerTitle: null, }}
      />
      <Screen name="EditarSolicitacaoPFV" component={EditarSolicitacaoPFV} 
        options={{ headerTransparent: true, headerTitle: null, }}
      />
      <Screen name="NovaSolicitacaoPFV" component={NovaSolicitacaoPFV} 
        options={{ headerTransparent: true, headerTitle: null, }}
      />
    </Navigator>
  );
};

export default PfvStack;