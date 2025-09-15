import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export const AccountScreen: React.FC = () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'September 2025',
  };

  const menuItems = [
    { title: 'Profile Settings', subtitle: 'Manage your profile information' },
    { title: 'Notifications', subtitle: 'Configure notification preferences' },
    { title: 'Privacy & Security', subtitle: 'Manage account security settings' },
    { title: 'Data & Storage', subtitle: 'Manage your data and storage' },
    { title: 'Help & Support', subtitle: 'Get help and contact support' },
    { title: 'About', subtitle: 'App version and information' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{mockUser.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{mockUser.name}</Text>
        <Text style={styles.email}>{mockUser.email}</Text>
        <Text style={styles.joinDate}>Member since {mockUser.joinDate}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          This is a placeholder screen for demonstration purposes.
        </Text>
        <Text style={styles.footerText}>
          In a production app, this would include:
        </Text>
        <Text style={styles.bulletPoint}>• User authentication system</Text>
        <Text style={styles.bulletPoint}>• Real user profile management</Text>
        <Text style={styles.bulletPoint}>• Settings and preferences</Text>
        <Text style={styles.bulletPoint}>• User-specific data persistence</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  joinDate: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  chevron: {
    fontSize: 20,
    color: '#9CA3AF',
    marginLeft: 12,
  },
  signOutButton: {
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footer: {
    padding: 16,
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  bulletPoint: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    marginLeft: 16,
  },
});

export default AccountScreen; 