
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  (Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api'
    : 'http://localhost:3000/api');

let tratamento401 = null;

export function definirTratamento401(callback) {
  tratamento401 = callback;
}

export async function salvarToken(token) {
  await AsyncStorage.setItem('token', token);
}

export async function removerToken() {
  await AsyncStorage.removeItem('token');
}

export async function obterToken() {
  return await AsyncStorage.getItem('token');
}

async function requisicao(endpoint, metodo = 'GET', dados = null) {
  const token = await obterToken();

  let resposta;

  try {
    resposta = await fetch(`${API_URL}${endpoint}`, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {}),
      },
      ...(dados !== null
        ? { body: JSON.stringify(dados) }
        : {}),
    });
  } catch (erro) {
    throw new Error(
      'Não foi possível conectar com o servidor. Verifique se a API está funcionando.'
    );
  }

  const resultado = await resposta.json().catch(() => ({}));

  if (resposta.status === 401) {
    await removerToken();

    if (tratamento401) {
      tratamento401();
    }

    const erro = new Error(
      resultado.mensagem || 'Sua sessão expirou. Faça login novamente.'
    );

    erro.status = 401;

    throw erro;
  }

  if (!resposta.ok) {
    const erro = new Error(
      resultado.mensagem || 'Erro ao realizar requisição.'
    );

    erro.status = resposta.status;

    throw erro;
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
