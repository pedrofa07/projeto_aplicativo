import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { api } from '../services/api';
import Cabecalho from '../components/cabecalho';

export default function Empresas({ navigation }) {
  const [empresas, setEmpresas] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [carregando, setCarregando] = useState(true);

  async function carregarEmpresas() {
    try {
      setCarregando(true);
      const dados = await api.get('/empresas');
      setEmpresas(dados);
    } catch (erro) {
      Alert.alert('Erro', erro.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarEmpresas();
  }, []);

  const empresasFiltradas = empresas.filter((empresa) =>
    `${empresa.nome} ${empresa.bairro}`
      .toLowerCase()
      .includes(pesquisa.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Cabecalho navigation={navigation} />

      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.titulo}>Empresas</Text>
        <Text style={styles.subtitulo}>
          Conheça empresas da região que trabalham com energia solar.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Pesquisar empresa ou bairro"
          value={pesquisa}
          onChangeText={setPesquisa}
        />

        {carregando ? (
          <ActivityIndicator size="large" color="#0A8F55" />
        ) : empresasFiltradas.length === 0 ? (
          <Text style={styles.aviso}>
            Nenhuma empresa encontrada.
          </Text>
        ) : (
          empresasFiltradas.map((empresa) => (
            <View key={empresa.id} style={styles.card}>
              <Text style={styles.nome}>{empresa.nome}</Text>
              <Text style={styles.texto}>📍 {empresa.endereco}</Text>
              <Text style={styles.texto}>Bairro: {empresa.bairro}</Text>
              <Text style={styles.texto}>Telefone: {empresa.telefone}</Text>
              <Text style={styles.texto}>E-mail: {empresa.email}</Text>

              {empresa.instagram ? (
                <Text style={styles.texto}>
                  Instagram: {empresa.instagram}
                </Text>
              ) : null}
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('CadastroEmpresa')}
        >
          <Text style={styles.botaoTexto}>Cadastrar empresa</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#087A46',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D5DED8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E0E8E2',
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#087A46',
    marginBottom: 10,
  },
  texto: {
    fontSize: 15,
    color: '#333',
    marginBottom: 5,
  },
  aviso: {
    color: '#555',
    textAlign: 'center',
    marginVertical: 20,
  },
  botao: {
    backgroundColor: '#087A46',
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  botaoTexto: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});