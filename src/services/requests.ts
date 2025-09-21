import {DocumentModel} from '../models/documentModel';
import {Config} from '../config/environment';

const BASE_URL = Config.BASE_URL;

export async function getDocuments(): Promise<DocumentModel[] | null> {
  try {
    const response = await fetch(`${BASE_URL}/documents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data: DocumentModel[] = await response.json();
    return data;
  } catch (error) {
    console.error('ERROR ON REQUEST DOCUMENTS:', (error as Error).message);
    return null;
  }
}
