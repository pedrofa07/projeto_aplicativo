
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from '../screens/inicio';
import Calculadora from '../screens/calculadora';
import Empresas from '../screens/empresas';
import Contato from '../screens/contato';
import Login from '../screens/login';
import Cadastro from '../screens/cadastro';
import Admin from '../screens/admin';
import CadastroEmpresa from '../screens/cadastro_empresa';

const Stack = createNativeStackNavigator();

export default function Navegacao() {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Calculadora" component={Calculadora} />
      <Stack.Screen name="Empresas" component={Empresas} />
      <Stack.Screen name="Contato" component={Contato} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="CadastroEmpresa" component={CadastroEmpresa} />
    </Stack.Navigator>
  );
}
