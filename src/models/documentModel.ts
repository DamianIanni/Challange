interface Contributor {
  ID: string;
  Name: string;
}

export interface DocumentModel {
  ID: string;
  Title: string;
  Attachments: string[];
  Contributors: Contributor[];
  CreatedAt: string;
  UpdatedAt: string;
  Version: string;
}
