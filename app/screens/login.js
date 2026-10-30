import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import { api, salvarToken } from '../services/api';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (!email || !senha) {
      Alert.alert(
        'Atenção',
        'Informe seu e-mail/login e sua senha.'
      );
      return;
    }

    try {
      setCarregando(true);

      const resposta = await api.post('/usuarios/login', {
        email,
        login: email,
        senha,
      });

      await salvarToken(resposta.token);

      if (resposta.usuario.nivel === 'admin') {
        navigation.navigate('Admin');
        return;
      }

      Alert.alert(
        'Login',
        'Login realizado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Inicio'),
          },
        ]
      );
    } catch (erro) {
      Alert.alert('Erro no login', erro.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollConteudo}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>BrightEnergy</Text>
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Bem-vindo!</Text>

        <Text style={styles.descricao}>
          Entre na sua conta para continuar.
        </Text>

        <Text style={styles.label}>E-mail ou login</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail ou login"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>

        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={entrar}
          disabled={carregando}
        >
          <Text style={styles.textoBotao}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.textoSecundario}>
            Ainda não tem conta? Cadastre-se
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate('Inicio')}
        >
          <Text style={styles.textoVoltar}>
            Voltar para o início
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8F5',
  },
  scrollConteudo: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#123D2B',
    padding: 25,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  conteudo: {
    padding: 25,
    paddingTop: 40,
  },
  titulo: {
    color: '#123D2B',
    fontSize: 30,
    fontWeight: 'bold',
  },
  descricao: {
    color: '#526358',
    marginTop: 10,
    marginBottom: 30,
  },
  label: {
    color: '#123D2B',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8E3DA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#123D2B',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  botaoSecundario: {
    padding: 18,
    alignItems: 'center',
  },
  textoSecundario: {
    color: '#123D2B',
    fontWeight: 'bold',
  },
  botaoVoltar: {
    padding: 12,
    alignItems: 'center',
  },
  textoVoltar: {
    color: '#526358',
  },
});