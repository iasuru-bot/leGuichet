import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import AdminNavbar from '@/components/AdminNavbar';
import { fetchData } from '@/hooks/fetchData';
import { UserType } from '@/types/GlobalType';
import UserItem from '@/components/UserItem';
import { useLoading } from './LoadingContext';

const AdminUsersPage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'admin');
  
  const { setLoading } = useLoading();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchData('/utilisateur', 'GET',undefined, setLoading);
        setUsers(response);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    try {
      await fetchData(`/admin/user/${id}`, 'DELETE',undefined, setLoading);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleDeletePress = (user: UserType) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const renderUserItem = ({ item }: { item: UserType }) => (
    <UserItem user={item} onDelete={() => handleDeletePress(item)} />
  );

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      <Text style={[styles.title, { color: primaryColor }]}>Admin Users</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.userList}
      />
      <AdminNavbar />

      {selectedUser && (
        <Modal
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContainer, { backgroundColor }]}>
              <Text style={[styles.modalTitle, { color: primaryColor }]}>Confirm Deletion</Text>
              <Text style={[styles.modalMessage, { color: textColor }]}>
                Are you sure you want to delete {selectedUser.prenom} {selectedUser.nom}?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: primaryColor }]}
                  onPress={() => handleDeleteUser(selectedUser.id)}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: 'gray' }]}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
  },
  userList: {
    width: '100%',
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AdminUsersPage;