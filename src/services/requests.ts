import {Alert} from 'react-native';
import axios, {AxiosError} from 'axios';

interface Contributor {
  ID: string;
  Name: string;
}

export interface Document {
  ID: string;
  Title: string;
  Attachments: string[];
  Contributors: Contributor[];
  CreatedAt: string;
  UpdatedAt: string;
  Version: string;
}

const client = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function callDocuments(): Promise<Document[] | null> {
  try {
    const res = await client.get<Document[]>('/documents');
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error('ERROR ON REQUEST DOCUMENTS:', axiosError.message);

    if (axiosError.response) {
      console.log('Response data:', axiosError.response.data);
      console.log('Response status:', axiosError.response.status);
    } else if (axiosError.request) {
      console.log('No response received:', axiosError.request);
    } else {
      console.log('Request error:', axiosError.message);
    }

    Alert.alert('Ups', 'Something went wrong, try again later', [
      {text: 'OK', onPress: () => console.log('OK pressed')},
    ]);

    return null;
  }
}

export const getDocuments = async (): Promise<Document[] | null> => {
  return await callDocuments();
};
