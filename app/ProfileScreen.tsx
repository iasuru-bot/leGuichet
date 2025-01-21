import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor'; // Récupérer les couleurs du thème
import Navbar from '@/components/navbar';
import { useSession } from './SessionContext';
import CustomBackButton from '@/components/customBackButton';
import Button from '@/components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeScreenNavigationProp } from '@/types/navigation';

const ProfileScreen = () => {
  const { userInfo, resetSession } = useSession(); // Récupérer les données de l'utilisateur depuis le contexte
  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const gray = useThemeColor({}, 'gray');
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleLogout = async () => {
    // Supprimer le token de session
    await AsyncStorage.removeItem('userToken');
    // Réinitialiser les informations de l'utilisateur dans le contexte
    resetSession();
    // Rediriger vers la page d'accueil
    navigation.navigate('Home');
  };

  return (
    <StyledWrapper style={{ backgroundColor }}>
      <CustomBackButton />
      <StyledProfileHeader>
        <Image source={{ uri: 'https://picsum.photos/700' }} style={styles.profileImage} />
        <StyledUserInfo>
          <StyledUsername style={{ color: primaryColor }}>{userInfo?.name || 'Nom de l\'utilisateur'}</StyledUsername>
          <StyledEmail style={{ color: gray }}>{userInfo?.email || 'email@example.com'}</StyledEmail>
        </StyledUserInfo>
      </StyledProfileHeader>

      <StyledActionsContainer>
        <Button title="Se déconnecter" onPress={handleLogout} variant='logout'/>
      </StyledActionsContainer>

      <Navbar />
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

export default ProfileScreen;