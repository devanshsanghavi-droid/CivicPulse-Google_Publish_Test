import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { mockApi } from '../services/mockApi.native';
import { Issue } from '../types';
import { CATEGORIES } from '../constants';
import { useApp } from '../App.native';

const StatusBadge = ({ status }: { status: string }) => {
  const colors: { [key: string]: { bg: string; text: string } } = {
    open: { bg: '#fee2e2', text: '#991b1b' },
    acknowledged: { bg: '#fef3c7', text: '#92400e' },
    resolved: { bg: '#d1fae5', text: '#065f46' }
  };
  const color = colors[status] || colors.open;
  
  return (
    <View style={[styles.statusBadge, { backgroundColor: color.bg }]}>
      <Text style={[styles.statusText, { color: color.text }]}>{status.toUpperCase()}</Text>
    </View>
  );
};

export default function FeedScreen() {
  const navigation = useNavigation<any>();
  const { setSelectedIssueId } = useApp();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [sort, setSort] = useState('trending');
  const [filterCat, setFilterCat] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIssues();
  }, [sort, filterCat]);

  const loadIssues = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getIssues(sort, filterCat);
      const filtered = data.filter(i => 
        i.title.toLowerCase().includes(search.toLowerCase()) || 
        i.description.toLowerCase().includes(search.toLowerCase())
      );
      setIssues(filtered);
    } catch (error) {
      console.error('Error loading issues:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
  }, [search]);

  const handleIssuePress = (issueId: string) => {
    setSelectedIssueId(issueId);
    navigation.navigate('IssueDetail', { id: issueId });
  };

  const renderIssue = ({ item }: { item: Issue }) => {
    const category = CATEGORIES.find(c => c.id === item.categoryId);
    
    return (
      <TouchableOpacity 
        style={styles.issueCard}
        onPress={() => handleIssuePress(item.id)}
      >
        <View style={styles.issueHeader}>
          <StatusBadge status={item.status} />
          <Text style={styles.upvoteCount}>👍 {item.upvoteCount}</Text>
        </View>
        <Text style={styles.issueTitle}>{item.title}</Text>
        <Text style={styles.issueDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.issueFooter}>
          <Text style={styles.categoryText}>{category?.name || 'Other'}</Text>
          <Text style={styles.dateText}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search city issues..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#9ca3af"
        />
        
        <View style={styles.filterRow}>
          <ScrollableButtons
            options={['trending', 'newest', 'upvoted']}
            selected={sort}
            onSelect={setSort}
          />
        </View>
        
        <View style={styles.categoryRow}>
          <ScrollableButtons
            options={['all', ...CATEGORIES.map(c => c.id)]}
            selected={filterCat || 'all'}
            onSelect={(id) => setFilterCat(id === 'all' ? undefined : id)}
            labels={['All', ...CATEGORIES.map(c => c.name)]}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <FlatList
          data={issues}
          renderItem={renderIssue}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No issues found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

function ScrollableButtons({ 
  options, 
  selected, 
  onSelect,
  labels 
}: { 
  options: string[]; 
  selected: string; 
  onSelect: (value: string) => void;
  labels?: string[];
}) {
  return (
    <View style={styles.buttonGroup}>
      {options.map((option, index) => {
        const label = labels ? labels[index] : option;
        const isSelected = selected === option;
        return (
          <TouchableOpacity
            key={option}
            style={[styles.filterButton, isSelected && styles.filterButtonActive]}
            onPress={() => onSelect(option)}
          >
            <Text style={[styles.filterButtonText, isSelected && styles.filterButtonTextActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  filterRow: {
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
    marginBottom: 8,
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  listContent: {
    padding: 16,
  },
  issueCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  upvoteCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  issueDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  issueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
  },
  dateText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
  },
});
