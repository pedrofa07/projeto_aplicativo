
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Navegacao from './app/navigation/navegacao';
import { UsuarioProvider } from './app/context/usuario';

export default function App() {
  return (
    <UsuarioProvider>
      <NavigationContainer>
        <Navegacao />
      </NavigationContainer>
    </UsuarioProvider>
  );
}
