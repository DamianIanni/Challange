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
  async saveNotificationArray(key: string, notifications: NotificationModel[]) {
    try {
      const data = JSON.stringify(notifications);
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
  async getNotificationsArray(key: string): Promise<NotificationModel[]> {
    try {
      const data = await this.notificationsStorage.getStringAsync(key);
      const parseData = JSON.parse(data);
      return parseData;
    } catch (error) {
      console.error('Error getting notification array:', error);
      return [];
    }
  }

  // Pushear un nuevo objeto al array existente en documentos
  //   async pushDocumentObject(key: string, newDocument: DocumentModel) {
  //     try {
  //       const documents = await this.getDocumentsArray(key);
  //       documents.push(newDocument);
  //       await this.saveDocumentArray(key, documents); // Actualizamos el array con el nuevo objeto
  //     } catch (error) {
  //       console.error('Error pushing document object:', error);
  //     }
  //   }

  // Pushear un nuevo objeto al array existente en notificaciones
  async pushNotificationObject(
    key: string,
    newNotification: NotificationModel,
  ) {
    try {
      const notifications = await this.getNotificationsArray(key);
      notifications.push(newNotification);
      await this.saveNotificationArray(key, notifications);
    } catch (error) {
      console.error('Error pushing notification object:', error);
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
      console.log('Document storage cleared');
    } catch (error) {
      console.error('Error clearing document storage:', error);
    }
  }
}

export const storageService = new StorageService();
