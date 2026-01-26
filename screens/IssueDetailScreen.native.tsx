import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { mockApi } from '../services/mockApi.native';
import { Issue, Comment } from '../types';
import { CATEGORIES } from '../constants';
import { useApp } from '../App.native';

export default function IssueDetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { user } = useApp();
  const issueId = route.params?.id;
  
  const [issue, setIssue] = useState<Issue | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  useEffect(() => {
    loadIssue();
    loadComments();
  }, [issueId]);

  const loadIssue = async () => {
    try {
      const issueData = await mockApi.getIssue(issueId);
      setIssue(issueData || null);
      if (user && issueData) {
        const upvoted = await mockApi.hasUpvoted(issueId, user.id);
        setHasUpvoted(upvoted);
      }
    } catch (error) {
      console.error('Error loading issue:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const commentsData = await mockApi.getComments(issueId);
      setComments(commentsData);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleUpvote = async () => {
    if (!user || !issue) return;
    await mockApi.toggleUpvote(issueId, user.id);
    loadIssue();
  };

  const handleComment = async () => {
    if (!user || !commentText.trim()) return;
    await mockApi.addComment(issueId, user.id, user.name, commentText);
    setCommentText('');
    loadComments();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!issue) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Issue not found</Text>
      </View>
    );
  }

  const category = CATEGORIES.find(c => c.id === issue.categoryId);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.category}>{category?.name || 'Other'}</Text>
          <Text style={styles.date}>
            {new Date(issue.createdAt).toLocaleDateString()}
          </Text>
        </View>

        <Text style={styles.title}>{issue.title}</Text>
        <Text style={styles.description}>{issue.description}</Text>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.upvoteButton, hasUpvoted && styles.upvoteButtonActive]}
            onPress={handleUpvote}
            disabled={!user}
          >
            <Text style={[styles.upvoteText, hasUpvoted && styles.upvoteTextActive]}>
              👍 {issue.upvoteCount}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comments ({comments.length})</Text>
          
          {comments.map(comment => (
            <View key={comment.id} style={styles.comment}>
              <Text style={styles.commentAuthor}>{comment.userName}</Text>
              <Text style={styles.commentText}>{comment.body}</Text>
              <Text style={styles.commentDate}>
                {new Date(comment.createdAt).toLocaleDateString()}
              </Text>
            </View>
          ))}

          {user && (
            <View style={styles.commentInput}>
              <TextInput
                style={styles.commentTextInput}
                placeholder="Add a comment..."
                value={commentText}
                onChangeText={setCommentText}
                multiline
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity 
                style={styles.commentSubmitButton}
                onPress={handleComment}
              >
                <Text style={styles.commentSubmitText}>Post</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563eb',
    textTransform: 'uppercase',
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  actions: {
    marginBottom: 32,
  },
  upvoteButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  upvoteButtonActive: {
    backgroundColor: '#2563eb',
  },
  upvoteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  upvoteTextActive: {
    color: '#ffffff',
  },
  commentsSection: {
    marginTop: 24,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  comment: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  commentDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  commentInput: {
    marginTop: 16,
  },
  commentTextInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    marginBottom: 8,
    color: '#111827',
  },
  commentSubmitButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: 'flex-end',
    paddingHorizontal: 24,
  },
  commentSubmitText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 32,
  },
});
