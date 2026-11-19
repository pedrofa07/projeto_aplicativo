
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  api,
  salvarToken,
  removerToken,
  definirTratamento401,
} from '../services/api';

const UsuarioContext = createContext(null);

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [restaurando, setRestaurando] = useState(true);

  useEffect(() => {
    definirTratamento401(() => {
      setUsuario(null);
    });

    restaurarSessao();
  }, []);

  async function restaurarSessao() {
    try {
      const resposta = await api.get('/usuarios/me');

      setUsuario(resposta.usuario);
    } catch (erro) {
      await removerToken();
      setUsuario(null);
    } finally {
      setRestaurando(false);
    }
  }

  async function login(email, senha) {
    const resposta = await api.post('/usuarios/login', {
      email: email.trim(),
      login: email.trim(),
      senha,
    });

    await salvarToken(resposta.token);

    setUsuario(resposta.usuario);

    return resposta.usuario;
  }

  async function logout() {
    await removerToken();
    setUsuario(null);
  }

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        restaurando,
        login,
        logout,
        restaurarSessao,
        estaLogado: !!usuario,
        ehAdmin: usuario?.nivel === 'admin',
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario() {
  const contexto = useContext(UsuarioContext);

  if (!contexto) {
    throw new Error(
      'useUsuario precisa ser utilizado dentro de UsuarioProvider.'
    );
  }

  return contexto;
}
