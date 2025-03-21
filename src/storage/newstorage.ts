import MMKVStorage from 'react-native-mmkv-storage';
import {DocumentModel} from '../models/documentModel';
import {NotificationModel} from '../models/notificationModel';

class StorageService {
  private documentsStorage: any;
  private notificationsStorage: any;

  constructor() {
    try {
      this.documentsStorage = new MMKVStorage.Loader()
        .withInstanceID('documentsStorage')
        .initialize();
      this.notificationsStorage = new MMKVStorage.Loader()
        .withInstanceID('notificationsStorage')
        .initialize();
    } catch (error) {
      console.error('Error initializing MMKV storage:', error);
    }
  }

  getDocumentsStorage(): any {
    return this.documentsStorage;
  }

  getNotificationsStorage(): any {
    return this.notificationsStorage;
  }

  // Guardar un array de objetos en el almacenamiento de documentos
  async saveDocumentArray(key: string, documents: DocumentModel[]) {
    try {
      const data = JSON.stringify(documents);
      await this.documentsStorage.setStringAsync(key, data);
    } catch (error) {
      console.error('Error saving document array:', error);
    }
  }

  // Guardar un array de objetos en el almacenamiento de notificaciones
  async saveNotification(key: string, notification: NotificationModel) {
    try {
      const existingNotifications = await this.getNotificationsArray(key);
      // console.log('EXISTE', existingNotifications);

      if (existingNotifications) {
        if (existingNotifications.length >= 99) {
          existingNotifications.shift();
        }
        existingNotifications.push(notification);
        const data = JSON.stringify(existingNotifications);
        await this.notificationsStorage.setStringAsync(key, data);
        return;
      }
      const data = JSON.stringify([notification]);
      await this.notificationsStorage.setStringAsync(key, data);
    } catch (error) {
      console.error('Error saving notification array:', error);
    }
  }

  // Leer el array de objetos desde el almacenamiento de documentos
  async getDocumentsArray(key: string): Promise<DocumentModel[]> {
    try {
      const data = await this.documentsStorage.getStringAsync(key);
      const parseData = JSON.parse(data);
      return parseData;
    } catch (error) {
      console.error('Error getting document array:', error);
      return [];
    }
  }

  // Leer el array de objetos desde el almacenamiento de notificaciones
  async getNotificationsArray(
    key: string,
  ): Promise<NotificationModel[] | undefined> {
    try {
      const data = await this.notificationsStorage.getStringAsync(key);
      if (data) {
        const parseData = JSON.parse(data);
        return parseData;
      }
      return [];
    } catch (error) {
      console.error('Error getting notification array:', error);
    }
  }

  // Pushear un nuevo array de objetos al existente en documentos
  async pushDocumentArray(key: string, newDocuments: DocumentModel[]) {
    try {
      const documents = await this.getDocumentsArray(key);
      documents.push(...newDocuments);
      await this.saveDocumentArray(key, documents);
    } catch (error) {
      console.error('Error pushing document array:', error);
    }
  }

  async pushNewDocument(key: string, newDocument: DocumentModel) {
    try {
      const documents = await this.getDocumentsArray(key);
      documents.push(newDocument);
      await this.saveDocumentArray(key, documents);
    } catch (error) {
      console.error('Error pushing document array:', error);
    }
  }

  // Limpiar el almacenamiento de documentos
  async clearDocumentsStorage() {
    try {
      await this.documentsStorage.clearStore();
      await this.notificationsStorage.clearStore();
      console.log('Document storage cleared');
    } catch (error) {
      console.error('Error clearing document storage:', error);
    }
  }
}

export const storageService = new StorageService();
