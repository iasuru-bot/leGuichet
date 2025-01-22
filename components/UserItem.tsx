import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { UserType } from '@/types/GlobalType';
import { fetchData } from '@/hooks/fetchData';

interface UserItemProps {
  user: UserType;
  onDelete: (id: string) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onDelete }) => {
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'admin');

  const handleDelete = async () => {
    try {
      await fetchData(`/admin/user/${user.id}`, 'DELETE');
      onDelete(user.id);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <View style={[styles.userItem, { borderColor: primaryColor }]}>
      <Text style={[styles.userName, { color: textColor }]}>{user.prenom} {user.nom}</Text>
      <Text style={[styles.userEmail, { color: textColor }]}>{user.email}</Text>
      <TouchableOpacity style={[styles.deleteButton, { backgroundColor: primaryColor }]} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userItem: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserItem;