import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Android Emulator:
const API_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api'
    : 'http://localhost:3000/api';

async function requisicao(endpoint, metodo = 'GET', dados = null) {
  const token = await AsyncStorage.getItem('token');

  const resposta = await fetch(`${API_URL}${endpoint}`, {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
    ...(dados
      ? {
          body: JSON.stringify(dados),
        }
      : {}),
  });

  const resultado = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(
      resultado.mensagem || 'Erro ao realizar requisição.'
    );
  }

  return resultado;
}

export const api = {
  get: (endpoint) => requisicao(endpoint),

  post: (endpoint, dados) =>
    requisicao(endpoint, 'POST', dados),

  put: (endpoint, dados) =>
    requisicao(endpoint, 'PUT', dados),

  delete: (endpoint) =>
    requisicao(endpoint, 'DELETE'),
};

export async function salvarToken(token) {
  await AsyncStorage.setItem('token', token);
}

export async function removerToken() {
  await AsyncStorage.removeItem('token');
}