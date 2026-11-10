
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

export default function Contato({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function enviarMensagem() {
    if (
      !nome.trim() ||
      !email.trim() ||
      !assunto.trim() ||
      !mensagem.trim()
    ) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos antes de enviar.'
      );
      return;
    }

    try {
      setEnviando(true);

      await api.post('/contato', {
        nome: nome.trim(),
        email: email.trim(),
        assunto: assunto.trim(),
        mensagem: mensagem.trim(),
      });

      setNome('');
      setEmail('');
      setAssunto('');
      setMensagem('');

      Alert.alert(
        'Mensagem enviada!',
        'Sua mensagem foi enviada com sucesso. Obrigado por entrar em contato!'
      );
    } catch (erro) {
      Alert.alert(
        'Erro ao enviar',
        erro.message ||
          'Não foi possível enviar sua mensagem. Tente novamente.'
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
          Entre em contato
        </Text>

        <Text style={styles.subtitulo}>
          Envie sua dúvida ou mensagem para a equipe BrightEnergy.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          editable={!enviando}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!enviando}
        />

        <TextInput
          style={styles.input}
          placeholder="Assunto"
          value={assunto}
          onChangeText={setAssunto}
          editable={!enviando}
        />

        <TextInput
          style={[styles.input, styles.mensagem]}
          placeholder="Escreva sua mensagem"
          value={mensagem}
          onChangeText={setMensagem}
          multiline
          textAlignVertical="top"
          editable={!enviando}
        />

        <TouchableOpacity
          style={[
            styles.botao,
            enviando && styles.botaoDesativado,
          ]}
          onPress={enviarMensagem}
          disabled={enviando}
        >
          <Text style={styles.botaoTexto}>
            {enviando ? 'Enviando...' : 'Enviar mensagem'}
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

  mensagem: {
    minHeight: 140,
  },

  botao: {
    backgroundColor: '#087A46',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
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
