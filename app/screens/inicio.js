import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Cabecalho from '../components/cabecalho';

const verde = '#059669';
const verdeEscuro = '#064e3b';

export default function Inicio({ navigation }) {
  return (
    <View style={styles.tela}>
      <Cabecalho navigation={navigation} />

      <ScrollView>
        <View style={styles.hero}>
          <Text style={styles.etiqueta}>
            ODS 7 - Energia Limpa e Acessível
          </Text>

          <Text style={styles.titulo}>
            Energia limpa em Santa Cruz do Sul:
          </Text>

          <Text style={styles.tituloDestaque}>
            economia e sustentabilidade
          </Text>

          <Text style={styles.descricao}>
            Santa Cruz do Sul é um dos maiores polos de energia solar do Brasil.
            Aqui você encontra informação clara, simulações de custo/retorno e
            contato com empresas locais — tudo pensado para facilitar a sua decisão.
          </Text>

          <TouchableOpacity
            style={styles.botaoPrimario}
            onPress={() => navigation.navigate('Calculadora')}
          >
            <Text style={styles.botaoPrimarioTexto}>
              ☀  Simular meu sistema
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoSecundario}
            onPress={() => navigation.navigate('Contato')}
          >
            <Text style={styles.botaoSecundarioTexto}>
              ❔  Fazer pergunta
            </Text>
          </TouchableOpacity>

          <View style={styles.ilustracao}>
            <Text style={styles.ilustracaoIcone}>☀️</Text>
            <Text style={styles.ilustracaoTexto}>Energia Solar</Text>
            <Text style={styles.ilustracaoFolha}>🌿</Text>
          </View>
        </View>

        <View style={styles.estatisticas}>
          <Estatistica numero="768" texto="Unidades geradoras em Santa Cruz (2019)" />
          <Estatistica numero="10.800 kW" texto="Potência instalada no município" />
          <Estatistica numero="84%" texto="Matriz renovável brasileira" />
          <Estatistica numero="68%" texto="Desconhecem incentivos fiscais" />
        </View>

        <View style={styles.secao}>
          <Text style={styles.etiquetaSecao}>Por que escolher</Text>
          <Text style={styles.tituloSecao}>
            Benefícios da Energia Renovável
          </Text>
          <Text style={styles.descricaoSecao}>
            Descubra como a energia limpa pode transformar sua vida e o planeta
          </Text>

          <Beneficio
            icone="💰"
            titulo="Redução de gastos com energia"
            texto="Economize até 95% na sua conta de luz com sistemas fotovoltaicos. O investimento se paga em média em 3 a 5 anos, gerando economia por mais de 25 anos."
            itens={[
              'Retorno garantido do investimento',
              'Proteção contra aumentos tarifários',
            ]}
          />

          <Beneficio
            icone="🌿"
            titulo="Menor impacto ambiental"
            texto="Cada sistema solar instalado reduz significativamente a emissão de CO2, contribuindo diretamente para o combate às mudanças climáticas."
            itens={[
              'Energia 100% limpa e renovável',
              'Redução da pegada de carbono',
            ]}
          />

          <Beneficio
            icone="🏠"
            titulo="Valorização do imóvel"
            texto="Imóveis com sistemas de energia solar instalados podem valorizar até 20% no mercado imobiliário brasileiro."
            itens={[
              'Diferencial competitivo',
              'Maior atratividade para compradores',
            ]}
          />

          <Beneficio
            icone="🏙️"
            titulo="Polo de inovação regional"
            texto="Santa Cruz do Sul investiu mais de R$ 54 milhões em sistemas fotovoltaicos em apenas cinco anos, gerando uma nova cadeia produtiva e fortalecendo a economia local."
            itens={[
              'Desenvolvimento regional',
              'Geração de oportunidades',
            ]}
          />
        </View>

        <View style={styles.cta}>
          <Text style={styles.ctaTitulo}>
            Descubra quanto você pode economizar
          </Text>

          <Text style={styles.ctaTexto}>
            Faça uma simulação do retorno do investimento em energia solar.
          </Text>

          <TouchableOpacity
            style={styles.botaoPrimario}
            onPress={() => navigation.navigate('Calculadora')}
          >
            <Text style={styles.botaoPrimarioTexto}>
              Simular meu sistema
            </Text>
          </TouchableOpacity>
        </View>

        <Rodape navigation={navigation} />
      </ScrollView>
    </View>
  );
}

function Estatistica({ numero, texto }) {
  return (
    <View style={styles.estatisticaItem}>
      <Text style={styles.estatisticaNumero}>{numero}</Text>
      <Text style={styles.estatisticaTexto}>{texto}</Text>
    </View>
  );
}

function Beneficio({ icone, titulo, texto, itens }) {
  return (
    <View style={styles.beneficio}>
      <Text style={styles.beneficioIcone}>{icone}</Text>
      <Text style={styles.beneficioTitulo}>{titulo}</Text>
      <Text style={styles.beneficioTexto}>{texto}</Text>

      {itens.map((item) => (
        <Text key={item} style={styles.beneficioItem}>
          ✓ {item}
        </Text>
      ))}
    </View>
  );
}

function Rodape({ navigation }) {
  return (
    <View style={styles.rodape}>
      <Text style={styles.rodapeTitulo}>Sobre Nós</Text>
      <Text style={styles.rodapeTexto}>
        A BrightEnergy é uma plataforma dedicada a democratizar o acesso à
        informação sobre energias renováveis em Santa Cruz do Sul.
      </Text>

      <Text style={styles.rodapeTitulo}>Links Rápidos</Text>

      {[
        ['Início', 'Inicio'],
        ['Calculadora', 'Calculadora'],
        ['Empresas', 'Empresas'],
        ['Contato', 'Contato'],
      ].map(([titulo, tela]) => (
        <TouchableOpacity
          key={tela}
          onPress={() => navigation.navigate(tela)}
        >
          <Text style={styles.rodapeLink}>{titulo}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.rodapeTexto}>
        © 2026 BrightEnergy. Projeto ODS 7 - Santa Cruz do Sul
      </Text>
      <Text style={styles.rodapeTexto}>Pedro Fagundes Alves</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  hero: {
    backgroundColor: '#f0fdf4',
    padding: 24,
    paddingTop: 35,
  },
  etiqueta: {
    alignSelf: 'flex-start',
    backgroundColor: '#dcfce7',
    color: '#166534',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 29,
    lineHeight: 37,
    fontWeight: '800',
    color: '#10231d',
  },
  tituloDestaque: {
    fontSize: 29,
    lineHeight: 37,
    fontWeight: '800',
    color: verde,
  },
  descricao: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 18,
    marginBottom: 22,
  },
  botaoPrimario: {
    backgroundColor: verde,
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 9,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoPrimarioTexto: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  botaoSecundario: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: verde,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 9,
    alignItems: 'center',
  },
  botaoSecundarioTexto: {
    color: verdeEscuro,
    fontWeight: '700',
    fontSize: 15,
  },
  ilustracao: {
    marginTop: 30,
    height: 190,
    backgroundColor: '#dcfce7',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ilustracaoIcone: {
    fontSize: 90,
  },
  ilustracaoTexto: {
    color: verdeEscuro,
    fontSize: 18,
    fontWeight: '800',
  },
  ilustracaoFolha: {
    position: 'absolute',
    bottom: 12,
    right: 22,
    fontSize: 35,
  },
  estatisticas: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  estatisticaItem: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  estatisticaNumero: {
    color: verde,
    fontSize: 29,
    fontWeight: '800',
  },
  estatisticaTexto: {
    textAlign: 'center',
    color: '#475569',
    fontSize: 14,
    marginTop: 7,
  },
  secao: {
    padding: 22,
    backgroundColor: '#f8fafc',
  },
  etiquetaSecao: {
    color: verde,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  tituloSecao: {
    color: '#10231d',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 10,
  },
  descricaoSecao: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 22,
  },
  beneficio: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 13,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  beneficioIcone: {
    fontSize: 32,
    marginBottom: 12,
  },
  beneficioTitulo: {
    color: '#10231d',
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 10,
  },
  beneficioTexto: {
    color: '#475569',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  beneficioItem: {
    color: verdeEscuro,
    fontSize: 13,
    lineHeight: 22,
    fontWeight: '600',
  },
  cta: {
    padding: 25,
    backgroundColor: verdeEscuro,
    alignItems: 'center',
  },
  ctaTitulo: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: '800',
    textAlign: 'center',
  },
  ctaTexto: {
    color: '#d1fae5',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginVertical: 15,
  },
  rodape: {
    padding: 24,
    backgroundColor: '#052e24',
  },
  rodapeTitulo: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 17,
    marginTop: 12,
    marginBottom: 8,
  },
  rodapeTexto: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 10,
  },
  rodapeLink: {
    color: '#d1fae5',
    fontSize: 14,
    paddingVertical: 5,
  },
});