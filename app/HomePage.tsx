import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationButton from '@/components/navigationButton';
import { HomeScreenNavigationProp } from '@/types/navigation';
import { useThemeColor } from '@/hooks/useThemeColor';

const HomePage = () => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const tertiaryColor = useThemeColor({}, 'tertiary'); 

  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={[styles.wrapper , { backgroundColor }]}>
              
              <Text style={[styles.title, {color : primaryColor}]}>Le Bon Commerce</Text>
              <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <View style={[styles.form , { backgroundColor, borderColor: primaryColor }]}>

        <Text style={[styles.message, {color : textColor}]}>Trouvez tout ce qui vous plait !</Text>
        <NavigationButton title="Se connecter" onPress={() => navigation.navigate('Login')} variant="secondary"/>
        <NavigationButton title="S'enregistrer" onPress={() => navigation.navigate('SignUp')} variant='primary' />
        <NavigationButton title="Les annonces" onPress={() => navigation.navigate('Landing')} variant="outlinedPrimary"/>
      </View>
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
  form: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    display: 'flex',
    gap: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 40,
  },

});

export default HomePage;