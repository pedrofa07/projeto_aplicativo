import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';

const verde = '#059669';

export default function Cabecalho({ navigation }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const navegar = (tela) => {
    setMenuAberto(false);
    navigation.navigate(tela);
  };

  return (
    <>
      <View style={styles.cabecalho}>
        <TouchableOpacity
          style={styles.logo}
          onPress={() => navegar('Inicio')}
        >
          <Text style={styles.icone}>☀</Text>
          <Text style={styles.nome}>BrightEnergy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() => setMenuAberto(true)}
          accessibilityLabel="Abrir menu"
        >
          <Text style={styles.hamburguer}>☰</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={menuAberto}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuAberto(false)}
      >
        <Pressable
          style={styles.fundoMenu}
          onPress={() => setMenuAberto(false)}
        >
          <Pressable style={styles.menu} onPress={() => {}}>
            <View style={styles.menuTopo}>
              <Text style={styles.menuTitulo}>Menu</Text>
              <TouchableOpacity onPress={() => setMenuAberto(false)}>
                <Text style={styles.fechar}>✕</Text>
              </TouchableOpacity>
            </View>

            {[
              ['Início', 'Inicio'],
              ['Calculadora', 'Calculadora'],
              ['Empresas', 'Empresas'],
              ['Contato', 'Contato'],
              ['Admin', 'Admin'],
            ].map(([titulo, tela]) => (
              <TouchableOpacity
                key={tela}
                style={styles.itemMenu}
                onPress={() => navegar(tela)}
              >
                <Text style={styles.itemTexto}>{titulo}</Text>
                <Text style={styles.seta}>›</Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    height: 68,
    backgroundColor: '#064e3b',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icone: {
    fontSize: 27,
    color: '#fbbf24',
    marginRight: 8,
  },
  nome: {
    fontSize: 21,
    color: '#fff',
    fontWeight: '800',
  },
  botaoMenu: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hamburguer: {
    color: '#fff',
    fontSize: 28,
  },
  fundoMenu: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'flex-end',
  },
  menu: {
    width: '82%',
    maxWidth: 340,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingHorizontal: 22,
  },
  menuTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 12,
  },
  menuTitulo: {
    fontSize: 23,
    fontWeight: '800',
    color: '#064e3b',
  },
  fechar: {
    fontSize: 25,
    color: '#475569',
  },
  itemMenu: {
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f0',
  },
  itemTexto: {
    fontSize: 17,
    color: '#10231d',
    fontWeight: '600',
  },
  seta: {
    fontSize: 22,
    color: verde,
  },
});