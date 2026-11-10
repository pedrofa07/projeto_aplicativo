
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';

import { api, salvarToken, removerToken } from '../services/api';
import Cabecalho from '../components/cabecalho';

export default function Admin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);

  const [empresas, setEmpresas] = useState([]);
  const [mensagens, setMensagens] = useState([]);

  const [carregando, setCarregando] = useState(false);

  const [modalExcluir, setModalExcluir] = useState(false);
  const [tipoExcluir, setTipoExcluir] = useState('');
  const [idExcluir, setIdExcluir] = useState(null);
  const [nomeExcluir, setNomeExcluir] = useState('');

  const [modalEditar, setModalEditar] = useState(false);
  const [empresaEditando, setEmpresaEditando] = useState(null);

  const [nomeEditado, setNomeEditado] = useState('');
  const [enderecoEditado, setEnderecoEditado] = useState('');
  const [bairroEditado, setBairroEditado] = useState('');
  const [telefoneEditado, setTelefoneEditado] = useState('');
  const [emailEditado, setEmailEditado] = useState('');
  const [instagramEditado, setInstagramEditado] = useState('');
  const [cnpjEditado, setCnpjEditado] = useState('');

  async function entrar() {
    if (!email.trim() || !senha) {
      Alert.alert('Atenção', 'Informe o login e a senha.');
      return;
    }

    try {
      setCarregando(true);

      const resposta = await api.post('/usuarios/login', {
        email: email.trim(),
        senha,
      });

      if (resposta.usuario.nivel !== 'admin') {
        await removerToken();

        Alert.alert(
          'Acesso negado',
          'Esta área é exclusiva do administrador.'
        );

        return;
      }

      await salvarToken(resposta.token);

      setAutenticado(true);

      await carregarDados();
    } catch (erro) {
      Alert.alert(
        'Erro ao entrar',
        erro.message || 'Não foi possível realizar o login.'
      );
    } finally {
      setCarregando(false);
    }
  }

  async function carregarDados() {
    try {
      setCarregando(true);

      const listaEmpresas = await api.get('/empresas/admin/todas');
      const listaMensagens = await api.get('/contato/admin');

      setEmpresas(Array.isArray(listaEmpresas) ? listaEmpresas : []);
      setMensagens(Array.isArray(listaMensagens) ? listaMensagens : []);
    } catch (erro) {
      Alert.alert(
        'Erro ao carregar dados',
        erro.message || 'Não foi possível carregar as informações.'
      );
    } finally {
      setCarregando(false);
    }
  }

  async function alterarAprovacao(id, aprovado) {
    try {
      setCarregando(true);

      await api.put(`/empresas/${id}/aprovacao`, {
        aprovado,
      });

      await carregarDados();

      Alert.alert(
        'Operação realizada!',
        aprovado
          ? 'Empresa aprovada com sucesso!'
          : 'Aprovação da empresa retirada com sucesso!'
      );
    } catch (erro) {
      Alert.alert(
        'Erro',
        erro.message || 'Não foi possível alterar a aprovação.'
      );
    } finally {
      setCarregando(false);
    }
  }

  function abrirEdicao(empresa) {
    setEmpresaEditando(empresa);

    setNomeEditado(empresa.nome || '');
    setEnderecoEditado(empresa.endereco || '');
    setBairroEditado(empresa.bairro || '');
    setTelefoneEditado(empresa.telefone || '');
    setEmailEditado(empresa.email || '');
    setInstagramEditado(empresa.instagram || '');
    setCnpjEditado(empresa.cnpj || '');

    setModalEditar(true);
  }

  async function salvarEdicao() {
    if (!empresaEditando) {
      Alert.alert('Erro', 'Nenhuma empresa selecionada.');
      return;
    }

    if (
      !nomeEditado.trim() ||
      !enderecoEditado.trim() ||
      !bairroEditado.trim() ||
      !telefoneEditado.trim() ||
      !emailEditado.trim() ||
      !cnpjEditado.trim()
    ) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos obrigatórios.'
      );
      return;
    }

    try {
      setCarregando(true);

      await api.put(`/empresas/${empresaEditando.id}`, {
        nome: nomeEditado.trim(),
        endereco: enderecoEditado.trim(),
        bairro: bairroEditado.trim(),
        telefone: telefoneEditado.trim(),
        email: emailEditado.trim(),
        instagram: instagramEditado.trim(),
        cnpj: cnpjEditado.trim(),
      });

      setModalEditar(false);
      setEmpresaEditando(null);

      await carregarDados();

      Alert.alert(
        'Alteração realizada!',
        'Empresa atualizada com sucesso!'
      );
    } catch (erro) {
      Alert.alert(
        'Erro ao editar',
        erro.message || 'Não foi possível editar a empresa.'
      );
    } finally {
      setCarregando(false);
    }
  }

  function abrirConfirmacaoExcluir(tipo, id, nome) {
    setTipoExcluir(tipo);
    setIdExcluir(id);
    setNomeExcluir(nome);
    setModalExcluir(true);
  }

  async function confirmarExclusao() {
    if (!idExcluir || !tipoExcluir) {
      Alert.alert(
        'Erro',
        'Não foi possível identificar o registro.'
      );
      return;
    }

    try {
      setCarregando(true);

      let mensagemSucesso = '';

      if (tipoExcluir === 'empresa') {
        await api.delete(`/empresas/${idExcluir}`);

        setEmpresas((lista) =>
          lista.filter(
            (empresa) => String(empresa.id) !== String(idExcluir)
          )
        );

        mensagemSucesso = 'Empresa excluída com sucesso!';
      } else if (tipoExcluir === 'mensagem') {
        await api.delete(`/contato/${idExcluir}`);

        setMensagens((lista) =>
          lista.filter(
            (mensagem) => String(mensagem.id) !== String(idExcluir)
          )
        );

        mensagemSucesso = 'Mensagem excluída com sucesso!';
      } else {
        Alert.alert('Erro', 'Tipo de registro inválido.');
        return;
      }

      setModalExcluir(false);
      setTipoExcluir('');
      setIdExcluir(null);
      setNomeExcluir('');

      Alert.alert(
        'Operação realizada!',
        mensagemSucesso
      );
    } catch (erro) {
      Alert.alert(
        'Erro ao excluir',
        erro.message || 'Não foi possível excluir o registro.'
      );
    } finally {
      setCarregando(false);
    }
  }

  async function sair() {
    await removerToken();

    setAutenticado(false);
    setEmail('');
    setSenha('');
    setEmpresas([]);
    setMensagens([]);
  }

  useEffect(() => {
    if (autenticado) {
      carregarDados();
    }
  }, [autenticado]);

  return (
    <View style={styles.container}>
      <Cabecalho navigation={navigation} />

      {!autenticado ? (
        <ScrollView contentContainerStyle={styles.conteudo}>
          <Text style={styles.titulo}>Área administrativa</Text>

          <Text style={styles.subtitulo}>
            Entre com a conta de administrador.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Login do administrador"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={entrar}
            disabled={carregando}
          >
            <Text style={styles.botaoTexto}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.conteudo}>
          <Text style={styles.titulo}>Painel administrativo</Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={carregarDados}
            disabled={carregando}
          >
            <Text style={styles.botaoTexto}>
              Atualizar dados
            </Text>
          </TouchableOpacity>

          {carregando && (
            <ActivityIndicator
              size="large"
              color="#087A46"
              style={styles.carregando}
            />
          )}

          <Text style={styles.secao}>
            Empresas cadastradas
          </Text>

          {empresas.length === 0 ? (
            <Text style={styles.vazio}>
              Nenhuma empresa cadastrada.
            </Text>
          ) : (
            empresas.map((empresa) => (
              <View key={empresa.id} style={styles.card}>
                <Text style={styles.nome}>
                  {empresa.nome}
                </Text>

                <Text style={styles.texto}>
                  Endereço: {empresa.endereco}
                </Text>

                <Text style={styles.texto}>
                  Bairro: {empresa.bairro}
                </Text>

                <Text style={styles.texto}>
                  Telefone: {empresa.telefone}
                </Text>

                <Text style={styles.texto}>
                  E-mail: {empresa.email}
                </Text>

                <Text style={styles.texto}>
                  Instagram: {empresa.instagram || 'Não informado'}
                </Text>

                <Text style={styles.texto}>
                  CNPJ: {empresa.cnpj || 'Não informado'}
                </Text>

                <Text style={styles.status}>
                  Situação: {empresa.aprovado ? 'Aprovada' : 'Pendente'}
                </Text>

                <TouchableOpacity
                  style={styles.botaoEditar}
                  onPress={() => abrirEdicao(empresa)}
                >
                  <Text style={styles.botaoTexto}>
                    Editar empresa
                  </Text>
                </TouchableOpacity>

                {!empresa.aprovado && (
                  <TouchableOpacity
                    style={styles.botao}
                    onPress={() => alterarAprovacao(empresa.id, true)}
                    disabled={carregando}
                  >
                    <Text style={styles.botaoTexto}>
                      Aprovar
                    </Text>
                  </TouchableOpacity>
                )}

                {empresa.aprovado ? (
                  <TouchableOpacity
                    style={styles.botaoSecundario}
                    onPress={() => alterarAprovacao(empresa.id, false)}
                    disabled={carregando}
                  >
                    <Text style={styles.botaoTexto}>
                      Retirar aprovação
                    </Text>
                  </TouchableOpacity>
                ) : null}

                <TouchableOpacity
                  style={styles.botaoExcluir}
                  onPress={() =>
                    abrirConfirmacaoExcluir(
                      'empresa',
                      empresa.id,
                      empresa.nome
                    )
                  }
                  disabled={carregando}
                >
                  <Text style={styles.botaoTexto}>
                    Excluir empresa
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          <Text style={styles.secao}>
            Mensagens recebidas
          </Text>

          {mensagens.length === 0 ? (
            <Text style={styles.vazio}>
              Nenhuma mensagem recebida.
            </Text>
          ) : (
            mensagens.map((mensagem) => (
              <View key={mensagem.id} style={styles.card}>
                <Text style={styles.nome}>
                  {mensagem.assunto}
                </Text>

                <Text style={styles.texto}>
                  Nome: {mensagem.nome}
                </Text>

                <Text style={styles.texto}>
                  E-mail: {mensagem.email}
                </Text>

                <Text style={styles.texto}>
                  {mensagem.mensagem}
                </Text>

                <TouchableOpacity
                  style={styles.botaoExcluir}
                  onPress={() =>
                    abrirConfirmacaoExcluir(
                      'mensagem',
                      mensagem.id,
                      mensagem.assunto
                    )
                  }
                  disabled={carregando}
                >
                  <Text style={styles.botaoTexto}>
                    Excluir mensagem
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          <TouchableOpacity
            style={styles.botaoSecundario}
            onPress={sair}
            disabled={carregando}
          >
            <Text style={styles.botaoTexto}>
              Sair do painel
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      <Modal
        visible={modalEditar}
        transparent
        animationType="slide"
        onRequestClose={() => setModalEditar(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCaixa}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.modalTitulo}>
                Editar empresa
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Nome da empresa"
                value={nomeEditado}
                onChangeText={setNomeEditado}
              />

              <TextInput
                style={styles.input}
                placeholder="Endereço"
                value={enderecoEditado}
                onChangeText={setEnderecoEditado}
              />

              <TextInput
                style={styles.input}
                placeholder="Bairro"
                value={bairroEditado}
                onChangeText={setBairroEditado}
              />

              <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={telefoneEditado}
                onChangeText={setTelefoneEditado}
                keyboardType="phone-pad"
              />

              <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={emailEditado}
                onChangeText={setEmailEditado}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Instagram"
                value={instagramEditado}
                onChangeText={setInstagramEditado}
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="CNPJ"
                value={cnpjEditado}
                onChangeText={setCnpjEditado}
                keyboardType="numeric"
              />

              <TouchableOpacity
                style={styles.botao}
                onPress={salvarEdicao}
                disabled={carregando}
              >
                <Text style={styles.botaoTexto}>
                  {carregando
                    ? 'Salvando...'
                    : 'Salvar alterações'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoSecundario}
                onPress={() => setModalEditar(false)}
                disabled={carregando}
              >
                <Text style={styles.botaoTexto}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalExcluir}
        transparent
        animationType="fade"
        onRequestClose={() => setModalExcluir(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCaixa}>
            <Text style={styles.modalTitulo}>
              Confirmar exclusão
            </Text>

            <Text style={styles.modalTexto}>
              {`Deseja realmente excluir "${nomeExcluir}"?`}
            </Text>

            <Text style={styles.modalAviso}>
              Essa ação não poderá ser desfeita.
            </Text>

            <View style={styles.modalBotoes}>
              <TouchableOpacity
                style={styles.modalCancelar}
                onPress={() => setModalExcluir(false)}
                disabled={carregando}
              >
                <Text style={styles.modalCancelarTexto}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalExcluir}
                onPress={confirmarExclusao}
                disabled={carregando}
              >
                <Text style={styles.botaoTexto}>
                  {carregando ? 'Excluindo...' : 'Excluir'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 10,
  },

  subtitulo: {
    color: '#444',
    marginBottom: 20,
  },

  secao: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#087A46',
    marginTop: 20,
    marginBottom: 12,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D5DED8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
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
    fontSize: 19,
    fontWeight: 'bold',
    color: '#087A46',
    marginBottom: 8,
  },

  texto: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
  },

  status: {
    fontWeight: 'bold',
    marginVertical: 8,
  },

  vazio: {
    color: '#666',
    marginBottom: 12,
  },

  carregando: {
    marginVertical: 12,
  },

  botao: {
    backgroundColor: '#087A46',
    padding: 13,
    borderRadius: 8,
    marginVertical: 8,
  },

  botaoEditar: {
    backgroundColor: '#1565C0',
    padding: 13,
    borderRadius: 8,
    marginVertical: 8,
  },

  botaoSecundario: {
    backgroundColor: '#555',
    padding: 13,
    borderRadius: 8,
    marginVertical: 8,
  },

  botaoExcluir: {
    backgroundColor: '#B3261E',
    padding: 13,
    borderRadius: 8,
    marginVertical: 8,
  },

  botaoTexto: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalCaixa: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
  },

  modalTitulo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#087A46',
    marginBottom: 12,
  },

  modalTexto: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },

  modalAviso: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },

  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },

  modalCancelar: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#EEEEEE',
  },

  modalCancelarTexto: {
    color: '#333',
    fontWeight: 'bold',
  },

  modalExcluir: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#B3261E',
    minWidth: 90,
  },
});
