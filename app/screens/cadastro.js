import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import { api } from '../services/api';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {
    if (!nome || !email || !senha) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos.'
      );
      return;
    }

    if (senha.length < 6) {
      Alert.alert(
        'Atenção',
        'A senha precisa ter pelo menos 6 caracteres.'
      );
      return;
    }

    try {
      setCarregando(true);

      const resposta = await api.post('/usuarios/cadastro', {
        nome,
        email,
        senha,
      });

      Alert.alert(
        'Cadastro',
        resposta.mensagem,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (erro) {
      Alert.alert('Erro no cadastro', erro.message);
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
        <Text style={styles.titulo}>Crie sua conta</Text>

        <Text style={styles.descricao}>
          Cadastre-se para acessar sua conta.
        </Text>

        <Text style={styles.label}>Nome completo</Text>

        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>E-mail</Text>

        <TextInput
          style={styles.input}
          placeholder="seuemail@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>

        <TextInput
          style={styles.input}
          placeholder="Crie uma senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={cadastrar}
          disabled={carregando}
        >
          <Text style={styles.textoBotao}>
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSecundario}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textoSecundario}>
            Já tem uma conta? Entrar
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