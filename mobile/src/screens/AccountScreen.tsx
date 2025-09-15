import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

export const AccountScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>R</Text>
        </View>
        <Text style={styles.name}>Ryu</Text>
        <Text style={styles.email}>ryu@streetfighter.com</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Way of Earth - Basic Training</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Way of Water - Flow Techniques</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Way of Fire - Combat Forms</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Way of Wind - Counter Attacks</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Way of Void - Inner Balance</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Leave Dojo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          "Know your enemy, know his sword" - Musashi
        </Text>
        <Text style={styles.footerText}>
          "Void is the only way" - Ryu
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cleanWhite,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grayLight,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.redMedium,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.redDeep,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.grayDark,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: COLORS.grayMedium,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  menuItem: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.redVeryLight,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.grayDark,
  },
  signOutButton: {
    backgroundColor: COLORS.redMedium,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.redDeep,
    marginTop: 16,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  footer: {
    padding: 16,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.grayMedium,
    textAlign: 'center',
  },
});

export default AccountScreen; 