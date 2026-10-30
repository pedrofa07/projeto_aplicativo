import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';

import Cabecalho from '../components/cabecalho';

export default function Calculadora({ navigation }) {
  const [conta, setConta] = useState('');
  const [custoSistema, setCustoSistema] = useState('');
  const [percentualEconomia, setPercentualEconomia] = useState('80');

  const [resultado, setResultado] = useState(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);

  function calcularOrcamento() {
    const valorConta = Number(conta.replace(',', '.'));
    const valorSistema = Number(custoSistema.replace(',', '.'));
    const percentual = Number(
      percentualEconomia.replace(',', '.')
    );

    if (
      !conta ||
      !custoSistema ||
      !percentualEconomia ||
      valorConta <= 0 ||
      valorSistema <= 0 ||
      percentual <= 0 ||
      percentual > 100
    ) {
      Alert.alert(
        'Dados inválidos',
        'Preencha os campos corretamente. O percentual de economia deve estar entre 1 e 100.'
      );

      return;
    }

    const economiaMensal =
      valorConta * (percentual / 100);

    const payback =
      valorSistema / economiaMensal;

    const economia5Anos =
      economiaMensal * 60;

    const economia10Anos =
      economiaMensal * 120;

    setResultado({
      valorConta,
      valorSistema,
      percentual,
      economiaMensal,
      payback,
      economia5Anos,
      economia10Anos,
    });
  }

  function voltarCalcular() {
    setResultado(null);
  }

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function formatarNumero(valor) {
    return valor.toLocaleString('pt-BR', {
      maximumFractionDigits: 1,
    });
  }

  return (
    <View style={styles.container}>
      <Cabecalho navigation={navigation} />

      {/* Tela de explicação sobre a calculadora */}
      <Modal
        visible={mostrarExplicacao}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setMostrarExplicacao(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalCabecalho}>
            <Text style={styles.modalTitulo}>
              Como funciona o cálculo?
            </Text>

            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={() => setMostrarExplicacao(false)}
            >
              <Text style={styles.textoFechar}>X</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.modalConteudo}
          >
            <Text style={styles.tituloExplicacao}>
              1. Economia mensal
            </Text>

            <Text style={styles.textoExplicacao}>
              A economia mensal é calculada multiplicando o
              valor médio da conta pelo percentual de redução
              escolhido.
            </Text>

            <View style={styles.formula}>
              <Text style={styles.textoFormula}>
                Economia = Conta × (% economia ÷ 100)
              </Text>
            </View>

            <Text style={styles.exemplo}>
              Ex.: R$ 500 × 80% = R$ 400/mês
            </Text>

            <Text style={styles.tituloExplicacao}>
              2. Tempo de retorno (Payback)
            </Text>

            <Text style={styles.textoExplicacao}>
              O payback indica em quantos meses o valor
              investido no sistema será recuperado pela
              economia gerada.
            </Text>

            <View style={styles.formula}>
              <Text style={styles.textoFormula}>
                Payback = Custo do sistema ÷ Economia mensal
              </Text>
            </View>

            <Text style={styles.exemplo}>
              Ex.: R$ 15.000 ÷ R$ 400 = 37,5 meses (~3,1 anos)
            </Text>

            <Text style={styles.tituloExplicacao}>
              3. Economia acumulada
            </Text>

            <Text style={styles.textoExplicacao}>
              Projetamos quanto você deixará de gastar em 5 e
              10 anos multiplicando a economia mensal pelo
              número de meses.
            </Text>

            <View style={styles.formula}>
              <Text style={styles.textoFormula}>
                Economia (5 anos) = Economia mensal × 60
              </Text>
            </View>

            <Text style={styles.exemplo}>
              Ex.: R$ 400 × 60 = R$ 24.000
            </Text>

            <View style={styles.formula}>
              <Text style={styles.textoFormula}>
                Economia (10 anos) = Economia mensal × 120
              </Text>
            </View>

            <Text style={styles.exemplo}>
              Ex.: R$ 400 × 120 = R$ 48.000
            </Text>

            <View style={styles.observacao}>
              <Text style={styles.textoObservacao}>
                Observação: Este cálculo é uma estimativa
                simplificada. Fatores como irradiação solar
                local, inclinação do telhado, sombreamento e
                reajustes tarifários podem alterar os
                resultados reais. Consulte uma empresa
                especializada para obter um orçamento
                detalhado.
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Tela de resultado */}
      {resultado ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudo}
        >
          <Text style={styles.titulo}>
            Resultado do orçamento
          </Text>

          <Text style={styles.subtitulo}>
            Confira a estimativa de economia do seu sistema
            de energia solar.
          </Text>

          <View style={styles.cardResultado}>
            <Text style={styles.labelResultado}>
              Economia mensal estimada
            </Text>

            <Text style={styles.valorPrincipal}>
              {formatarMoeda(resultado.economiaMensal)}
            </Text>

            <Text style={styles.descricaoResultado}>
              Economia aproximada por mês
            </Text>
          </View>

          <View style={styles.cardResultado}>
            <Text style={styles.labelResultado}>
              Tempo de retorno do investimento
            </Text>

            <Text style={styles.valor}>
              {formatarNumero(resultado.payback)} meses
            </Text>

            <Text style={styles.descricaoResultado}>
              Aproximadamente{' '}
              {formatarNumero(resultado.payback / 12)} anos
            </Text>
          </View>

          <View style={styles.cardResultado}>
            <Text style={styles.labelResultado}>
              Economia acumulada em 5 anos
            </Text>

            <Text style={styles.valor}>
              {formatarMoeda(resultado.economia5Anos)}
            </Text>
          </View>

          <View style={styles.cardResultado}>
            <Text style={styles.labelResultado}>
              Economia acumulada em 10 anos
            </Text>

            <Text style={styles.valor}>
              {formatarMoeda(resultado.economia10Anos)}
            </Text>
          </View>

          <View style={styles.observacao}>
            <Text style={styles.textoObservacao}>
              Este resultado é uma estimativa baseada nos
              valores informados. O orçamento real depende
              das condições do imóvel e da avaliação de uma
              empresa especializada.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.botao}
            onPress={voltarCalcular}
          >
            <Text style={styles.textoBotao}>
              Voltar a calcular
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        /* Tela de preenchimento da calculadora */
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudo}
        >
          <Text style={styles.titulo}>
            Calculadora de energia solar
          </Text>

          <Text style={styles.subtitulo}>
            Simule a economia que um sistema de energia
            solar pode gerar para você.
          </Text>

          <TouchableOpacity
            style={styles.botaoExplicacao}
            onPress={() => setMostrarExplicacao(true)}
          >
            <Text style={styles.textoBotaoExplicacao}>
              Como funciona a calculadora?
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>
            Valor médio da conta de luz (R$)
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: 500"
            keyboardType="decimal-pad"
            value={conta}
            onChangeText={setConta}
          />

          <Text style={styles.label}>
            Custo estimado do sistema (R$)
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: 15000"
            keyboardType="decimal-pad"
            value={custoSistema}
            onChangeText={setCustoSistema}
          />

          <Text style={styles.label}>
            Percentual de economia (%)
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: 80"
            keyboardType="decimal-pad"
            value={percentualEconomia}
            onChangeText={setPercentualEconomia}
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={calcularOrcamento}
          >
            <Text style={styles.textoBotao}>
              Calcular orçamento
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scroll: {
    flex: 1,
  },

  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#123D2B',
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 15,
    lineHeight: 22,
    color: '#526358',
    marginBottom: 22,
  },

  botaoExplicacao: {
    backgroundColor: '#EFF5F1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#D7E5DA',
  },

  textoBotaoExplicacao: {
    color: '#123D2B',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  label: {
    color: '#123D2B',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#F7F9F7',
    borderWidth: 1,
    borderColor: '#D7E1D9',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },

  botao: {
    backgroundColor: '#123D2B',
    padding: 17,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  cardResultado: {
    backgroundColor: '#F1F6F2',
    padding: 20,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DFEAE1',
  },

  labelResultado: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#123D2B',
    marginBottom: 10,
  },

  valorPrincipal: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#07834A',
  },

  valor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#07834A',
  },

  descricaoResultado: {
    fontSize: 14,
    color: '#526358',
    marginTop: 8,
  },

  observacao: {
    backgroundColor: '#FFF9E9',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
  },

  textoObservacao: {
    color: '#6D6043',
    fontSize: 13,
    lineHeight: 20,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  modalCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EAE6',
  },

  modalTitulo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#123D2B',
    flex: 1,
  },

  botaoFechar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF5F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  textoFechar: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#123D2B',
  },

  modalConteudo: {
    padding: 20,
    paddingBottom: 40,
  },

  tituloExplicacao: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#172D22',
    marginTop: 12,
    marginBottom: 10,
  },

  textoExplicacao: {
    fontSize: 14,
    lineHeight: 21,
    color: '#526358',
  },

  formula: {
    backgroundColor: '#EFF4F7',
    padding: 12,
    borderRadius: 9,
    marginTop: 10,
    marginBottom: 10,
  },

  textoFormula: {
    color: '#15563D',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 21,
  },

  exemplo: {
    color: '#526358',
    fontSize: 13,
    marginBottom: 12,
  },
});