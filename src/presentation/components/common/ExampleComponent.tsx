import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Importaciones usando los nuevos path aliases
import { User, Post } from '@shared/types';
import { API_BASE_URL, ROUTES } from '@shared/constants';
import { formatDate, formatNumber } from '@shared/utils';
import { LoginUser, CreatePost } from '@core/domain/usecases';

// Ejemplo de componente que usa la nueva estructura
interface ExampleComponentProps {
  user: User;
  posts: Post[];
}

const ExampleComponent: React.FC<ExampleComponentProps> = ({ user, posts }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ejemplo de Clean Architecture
      </Text>
      
      <Text style={styles.subtitle}>
        Usuario: {user.username}
      </Text>
      
      <Text style={styles.info}>
        Posts: {formatNumber(posts.length)}
      </Text>
      
      <Text style={styles.info}>
        API Base URL: {API_BASE_URL}
      </Text>
      
      <Text style={styles.note}>
        Este componente demuestra cómo usar los path aliases:
        {'\n'}• @shared/types para tipos
        {'\n'}• @shared/constants para constantes
        {'\n'}• @shared/utils para utilidades
        {'\n'}• @core/domain/usecases para casos de uso
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: '#888',
  },
  note: {
    fontSize: 14,
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    color: '#555',
    lineHeight: 20,
  },
});

export default ExampleComponent;