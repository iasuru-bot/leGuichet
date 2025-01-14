import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

const Navbar = () => {
    const [selected, setSelected] = useState('home'); // État pour suivre la page sélectionnée
    const primaryColor = useThemeColor({}, 'primary');
    const white = useThemeColor({}, 'white');

    // Fonction pour changer de sélection
    const handleSelect = (page) => {
        setSelected(page);
    };

    return (
        <View style={[styles.container]}>
            <View style={[styles.buttonContainer, { shadowColor: primaryColor, backgroundColor: primaryColor }]}>
                <TouchableOpacity
                    style={[styles.button, selected === 'home' && styles.selectedButton]}
                    onPress={() => handleSelect('home')}
                >
                    <FontAwesome name="home" size={30} color={selected === 'home' ? primaryColor : white} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, selected === 'search' && styles.selectedButton]}
                    onPress={() => handleSelect('search')}
                >
                    <FontAwesome name="search" size={25} color={selected === 'search' ? primaryColor : white} />
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        alignItems: 'center', // Center the navbar horizontally
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        height: 55,
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
