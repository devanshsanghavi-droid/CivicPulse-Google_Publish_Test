import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../App.native';

export default function LandingScreen() {
  const navigation = useNavigation<any>();
  const { user } = useApp();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Community-Powered City Improvement</Text>
        </View>
        
        <Text style={styles.title}>CivicPulse</Text>
        
        <Text style={styles.subtitle}>
          Report issues in your city. Upvote what matters.{'\n'}
          Make your community better, together.
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Feed' })}
          >
            <Text style={styles.primaryButtonText}>Browse Issues</Text>
          </TouchableOpacity>
          {!user && (
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.secondaryButtonText}>Sign In / Join</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Features Grid */}
      <View style={styles.featuresSection}>
        <FeatureCard
          title="Report Issues"
          description="Snap a photo, pin the location, and submit. It takes less than a minute to inform the city."
        />
        <FeatureCard
          title="Prioritize Together"
          description="Upvote issues that affect you. The most critical concerns naturally rise to the top for attention."
        />
        <FeatureCard
          title="Track Progress"
          description="Follow reported issues and receive updates when the city acknowledges or resolves them."
        />
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <StatItem value="150+" label="Issues Reported" />
        <StatItem value="2.5K" label="Community Votes" />
        <StatItem value="89%" label="Resolution Rate" />
      </View>

      {/* Footer CTA */}
      <View style={styles.footerSection}>
        <Text style={styles.footerTitle}>Ready to make a difference?</Text>
        <Text style={styles.footerSubtitle}>
          Join your neighbors in prioritizing urban infrastructure and building a safer community.
        </Text>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={() => navigation.navigate(user ? 'MainTabs' : 'Login')}
        >
          <Text style={styles.ctaButtonText}>
            {user ? 'Report Your First Issue' : 'Sign Up to Report Issues'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>
        <Text style={styles.featureIconText}>📍</Text>
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    alignItems: 'center',
  },
  heroSection: {
    paddingTop: 80,
    paddingBottom: 64,
    paddingHorizontal: 24,
    alignItems: 'center',
    maxWidth: 800,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    marginBottom: 32,
  },
  badgeText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 56,
    fontWeight: '900',
    color: '#2563eb',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#6b7280',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 600,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  secondaryButtonText: {
    color: '#4b5563',
    fontSize: 18,
    fontWeight: '700',
  },
  featuresSection: {
    paddingVertical: 64,
    paddingHorizontal: 24,
    width: '100%',
    maxWidth: 1200,
    gap: 32,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureIconText: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  statsSection: {
    paddingVertical: 64,
    width: '100%',
    backgroundColor: '#f1f5f9',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    marginVertical: 16,
  },
  statValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#2563eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  footerSection: {
    paddingVertical: 96,
    paddingHorizontal: 24,
    alignItems: 'center',
    maxWidth: 600,
  },
  footerTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  footerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
