import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const endpoint = "https://9955-185-48-252-9.ngrok-free.app"

export async function fetchData(path: string, method: string, body?: Object) {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log(path, token);
        const headers:{ [key: string]: string }= {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        if(token !== 'undefined') {
            headers['Authorization'] = '' + token;
        }
        console.log(headers);
        return fetch(endpoint + path, {
            method,
            headers,
            ...(body ? {body: JSON.stringify(body)} : {}),
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            // error = JSON.parse(error);
            console.log(error.message);
            return showMessage({
                message: 'Erreur',
                description: error,
                type: 'danger',
                icon: 'danger',
            });
        });
    } catch (e: any) {
        console.error('FETCH ERROR', e)
        const error = JSON.parse(e);
        showMessage({
            message: 'Erreur',
            description: error.message,
            type: 'danger',
            icon: 'danger',
        });
        return error;
    }
}