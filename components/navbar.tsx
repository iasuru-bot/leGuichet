import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSession } from '@/app/SessionContext';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '@/types/navigation';

const Navbar = () => {
    const [selected, setSelected] = useState('home');
    const { activeTab, setActiveTab } = useSession();
    const primaryColor = useThemeColor({}, 'primary');
    const white = useThemeColor({}, 'white');
    const navigation = useNavigation<HomeScreenNavigationProp>();


    useEffect(() => {
        setSelected(activeTab);
    }, [activeTab]);

    const handleSelect = (page: string) => {
        setSelected(page);
        setActiveTab(page);

        switch (page) {
            case 'home':
                navigation.navigate('Landing');
                break;
            case 'list':
                navigation.navigate('CreateAnnonce');
                break;
            case 'list-alt':
                navigation.navigate('MesAnnonces');
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
                        <FontAwesome name="plus" size={25} color={selected === 'list' ? primaryColor : white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selected === 'list-alt' && styles.selectedButton]}
                        onPress={() => handleSelect('list-alt')}
                    >
                        <FontAwesome name="list-alt" size={25} color={selected === 'list-alt' ? primaryColor : white} />
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
        alignItems: 'center',
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
        borderRadius: 20,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: 'white',
    },
});

export default Navbar;