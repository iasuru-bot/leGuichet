import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor'; // Récupérer les couleurs du thème
import { FontAwesome } from '@expo/vector-icons';
import Navbar from '@/components/navbar';
import { useSession } from './SessionContext';
import CustomBackButton from '@/components/customBackButton';

const ProfileScreen = () => {
    const { userInfo } = useSession(); // Récupérer les données de l'utilisateur depuis le contexte
    const primaryColor = useThemeColor({}, 'primary');
    const backgroundColor = useThemeColor({}, 'background');
    const white = useThemeColor({}, 'white');

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <CustomBackButton />
            <View style={styles.profileHeader}>
                <Image source={{ uri: 'https://placekitten.com/200/200' }} style={styles.profileImage} />
                <View style={styles.userInfo}>
                    <Text style={[styles.username, { color: primaryColor }]}>{userInfo?.name || 'Nom de l\'utilisateur'}</Text>
                    <Text style={[styles.email, { color: white }]}>{userInfo?.email || 'email@example.com'}</Text>
                </View>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: primaryColor }]}>
                    <Text style={styles.buttonText}>Modifier Profil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#FF6347' }]}>
                    <Text style={styles.buttonText}>Se Déconnecter</Text>
                </TouchableOpacity>
            </View>

            <Navbar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 16,
    },
    userInfo: {
        flexDirection: 'column',
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        marginBottom: 8,
    },
    captureCount: {
        fontSize: 16,
    },
    actionsContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    button: {
        width: '80%',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    footerButton: {
        padding: 10,
        backgroundColor: 'transparent',
        borderRadius: 20,
    },
});

export default ProfileScreen;
