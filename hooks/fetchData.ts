import { useLoading } from "@/app/LoadingContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const endpoint = "https://6882-185-48-252-9.ngrok-free.app";

export async function fetchData(path: string, method: string, body?: Object, setLoading?: (loading: boolean) => void) {
  try {
      if (setLoading) setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const headers:{ [key: string]: string }= {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
      if(token !== 'undefined') {
          headers['Authorization'] = '' + token;
      }
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
  } finally {
    // Stop loading
    if (setLoading) setLoading(false);
}
}