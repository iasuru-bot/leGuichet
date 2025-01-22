import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import Navbar from '@/components/Navbar';
import CardList from '@/components/CardList';
import { useSession } from './SessionContext';
import AdminNavbar from '@/components/AdminNavbar';

const AdminHomePage = () => {
    const { cards } = useSession();
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const primaryColor = useThemeColor({}, 'admin');

    return (
        <View style={[styles.wrapper, { backgroundColor }]}>
            <Text style={[styles.title, { color: primaryColor }]}>Admin Home</Text>
            <Text style={[styles.message, { color: textColor }]}>Welcome to the admin dashboard!</Text>
            <CardList cards={cards} />
            <AdminNavbar />
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
    message: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default AdminHomePage;