
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { api } from '../services/api';
import Cabecalho from '../components/cabecalho';

export default function CadastroEmpresa({ navigation }) {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function cadastrar() {
    if (
      !nome.trim() ||
      !endereco.trim() ||
      !bairro.trim() ||
      !telefone.trim() ||
      !email.trim() ||
      !cnpj.trim()
    ) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos obrigatórios, incluindo o CNPJ.'
      );
      return;
    }

    try {
      setEnviando(true);

      await api.post('/empresas', {
        nome: nome.trim(),
        endereco: endereco.trim(),
        bairro: bairro.trim(),
        telefone: telefone.trim(),
        email: email.trim(),
        instagram: instagram.trim(),
        cnpj: cnpj.trim(),
      });

      setNome('');
      setEndereco('');
      setBairro('');
      setTelefone('');
      setEmail('');
      setInstagram('');
      setCnpj('');

      Alert.alert(
        'Solicitação enviada!',
        'Sua empresa foi cadastrada e está aguardando aprovação do administrador.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Empresas'),
          },
        ]
      );
    } catch (erro) {
      Alert.alert(
        'Erro ao cadastrar',
        erro.message || 'Não foi possível enviar a solicitação. Tente novamente.'
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Cabecalho navigation={navigation} />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.titulo}>
          Cadastre sua empresa
        </Text>

        <Text style={styles.subtitulo}>
          Preencha os dados para solicitar a inclusão no catálogo.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome da empresa *"
          value={nome}
          onChangeText={setNome}
          editable={!enviando}
        />

        <TextInput
          style={styles.input}
          placeholder="Endereço *"
          value={endereco}
          onChangeText={setEndereco}
          editable={!enviando}
        />

        <TextInput
          style={styles.input}
          placeholder="Bairro *"
          value={bairro}
          onChangeText={setBairro}
          editable={!enviando}
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone *"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          editable={!enviando}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail *"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!enviando}
        />

        <TextInput
          style={styles.input}
          placeholder="Instagram"
          value={instagram}
          onChangeText={setInstagram}
          autoCapitalize="none"
          editable={!enviando}
        />

        <TextInput
          style={styles.input}
          placeholder="CNPJ *"
          value={cnpj}
          onChangeText={setCnpj}
          keyboardType="numeric"
          editable={!enviando}
        />

        <Text style={styles.observacao}>
          * Campos obrigatórios.
        </Text>

        <TouchableOpacity
          style={[
            styles.botao,
            enviando && styles.botaoDesativado,
          ]}
          onPress={cadastrar}
          disabled={enviando}
        >
          <Text style={styles.botaoTexto}>
            {enviando ? 'Enviando...' : 'Enviar cadastro'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8F6',
  },

  conteudo: {
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#087A46',
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 15,
    color: '#444',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D5DED8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  observacao: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },

  botao: {
    backgroundColor: '#087A46',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 25,
  },

  botaoDesativado: {
    opacity: 0.6,
  },

  botaoTexto: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
