import React from 'react';
import { Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import AdminNavbar from '@/components/AdminNavbar';
import { useSession } from './SessionContext';
import Button from '@/components/Button';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '@/types/navigation';

const AdminProfilePage = () => {
  const { userInfo, resetSession } = useSession();
  const backgroundColor = useThemeColor({}, 'background');
  const primaryColor = useThemeColor({}, 'admin');
  const gray = useThemeColor({}, 'gray');
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    resetSession();
    navigation.navigate('Home');
  };

  return (
    <StyledWrapper style={{ backgroundColor }}>
      <StyledProfileHeader>
        <Image source={{ uri: 'https://picsum.photos/700' }} style={styles.profileImage} />
        <StyledUserInfo>
          <StyledUsername style={{ color: primaryColor }}>{(userInfo?.prenom + ' ' + userInfo?.nom.toUpperCase()) || 'Nom de l\'utilisateur'}</StyledUsername>
          <StyledEmail style={{ color: gray }}>{userInfo?.email || 'email@example.com'}</StyledEmail>
        </StyledUserInfo>
      </StyledProfileHeader>

      <StyledActionsContainer>
        <Button title="Se déconnecter" onPress={handleLogout} variant='logout' />
      </StyledActionsContainer>

      <AdminNavbar />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const StyledProfileHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledUserInfo = styled.View`
  flex-direction: column;
`;

const StyledUsername = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const StyledEmail = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
`;

const StyledActionsContainer = styled.View`
  margin-top: 30px;
  align-items: center;
`;

const styles = {
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
};

export default AdminProfilePage;