import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mockApi } from '../services/mockApi.native';
import { CATEGORIES } from '../constants';
import { useApp } from '../App.native';

export default function ReportScreen() {
  const navigation = useNavigation<any>();
  const { user } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(CATEGORIES[0]?.id || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !categoryId) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!user) {
      navigation.navigate('Login');
      return;
    }

    setLoading(true);
    try {
      // TODO: Get location from device GPS
      const issue = await mockApi.createIssue({
        createdBy: user.id,
        creatorName: user.name,
        title,
        description,
        categoryId,
        latitude: 37.3852, // Default location - replace with actual GPS
        longitude: -122.1141,
        address: 'Location to be determined',
      });
      
      Alert.alert('Success', 'Issue reported successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('MainTabs', { screen: 'Feed' }) }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to report issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Report an Issue</Text>
        <Text style={styles.subtitle}>Help improve your community</Text>

        <TextInput
          style={styles.input}
          placeholder="Issue Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#9ca3af"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the issue..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
          placeholderTextColor="#9ca3af"
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryContainer}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryButton,
                categoryId === cat.id && styles.categoryButtonActive
              ]}
              onPress={() => setCategoryId(cat.id)}
            >
              <Text style={[
                styles.categoryButtonText,
                categoryId === cat.id && styles.categoryButtonTextActive
              ]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Submitting...' : 'Submit Report'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    color: '#111827',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#2563eb',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
