import {NativeModules} from 'react-native';
import {DocumentModel} from '../models/documentModel';

const {MyNativeModule} = NativeModules;

export const callOnShare = (document: DocumentModel) => {
  try {
    MyNativeModule.share(document.Title);
  } catch (error) {
    console.log('ERROR SHARING DOCUMENT TITLE');
  }
};
