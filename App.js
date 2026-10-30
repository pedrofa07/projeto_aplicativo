
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from './app/screens/inicio';
import Calculadora from './app/screens/calculadora';
import Empresas from './app/screens/empresas';
import Contato from './app/screens/contato';
import CadastroEmpresa from './app/screens/cadastro_empresa';
import Admin from './app/screens/admin';
import Login from './app/screens/login';
import Cadastro from './app/screens/cadastro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
        <Stack.Screen name="CadastroEmpresa" component={CadastroEmpresa} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
