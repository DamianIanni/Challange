import {DocumentModel} from '../models/documentModel';

export const sortDataUtil = (data: DocumentModel[]): DocumentModel[] => {
  return [...data].sort(
    (a, b) => new Date(a.CreatedAt).getTime() - new Date(b.CreatedAt).getTime(),
  );
};

export const sortDataUtilUpdated = (data: DocumentModel[]): DocumentModel[] => {
  return [...data].sort(
    (a, b) => new Date(a.UpdatedAt).getTime() - new Date(b.UpdatedAt).getTime(),
  );
};
