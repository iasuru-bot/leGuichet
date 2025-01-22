import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSession } from '@/app/SessionContext';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '@/types/navigation';

const Navbar = () => {
    const [selected, setSelected] = useState('home'); // État pour suivre la page sélectionnée
    const { activeTab, setActiveTab } = useSession(); // Utilisation de useSession pour récupérer la tab active
    const primaryColor = useThemeColor({}, 'primary');
    const white = useThemeColor({}, 'white');
    const navigation = useNavigation<HomeScreenNavigationProp>(); // Obtient l'objet navigation pour la redirection

    // Mettez à jour l'état de sélection en fonction de la tab active du contexte
    useEffect(() => {
        setSelected(activeTab);
    }, [activeTab]);

    // Fonction pour changer de sélection
    const handleSelect = (page: string) => {
        setSelected(page);
        setActiveTab(page);

        // Utilisation de navigation.navigate() pour rediriger vers la page correspondante
        switch (page) {
            case 'home':
                navigation.navigate('Landing');
                break;

            case 'list':
                navigation.navigate('CreateAnnonce');
                break;
            case 'user':
                navigation.navigate('Profile');
                break;
            default:
                break;
        }
    };

    return (
        <View style={[styles.container]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.buttonContainer, { shadowColor: primaryColor, backgroundColor: primaryColor }]}>
                    <TouchableOpacity
                        style={[styles.button, selected === 'home' && styles.selectedButton]}
                        onPress={() => handleSelect('home')}
                    >
                        <FontAwesome name="home" size={30} color={selected === 'home' ? primaryColor : white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selected === 'list' && styles.selectedButton]}
                        onPress={() => handleSelect('list')}
                    >
                        <FontAwesome name="list" size={25} color={selected === 'list' ? primaryColor : white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selected === 'user' && styles.selectedButton]}
                        onPress={() => handleSelect('user')}
                    >
                        <FontAwesome name="user" size={25} color={selected === 'user' ? primaryColor : white} />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        width: '100%',
        alignItems: 'center', // Center the navbar horizontally
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        height: 58,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 5,
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 20, // Full circle
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: 'white', // Rond blanc pour l'élément sélectionné
    },
});

export default Navbar;