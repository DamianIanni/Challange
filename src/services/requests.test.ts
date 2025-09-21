import {getDocuments} from './requests';
import {DocumentModel} from '../models/documentModel';

// Mock the Config module
jest.mock('../config/environment', () => ({
  Config: {
    BASE_URL: 'http://localhost:8080',
    WEBSOCKET_URL: 'ws://localhost:8080/notifications',
    LOCAL_IP: '192.168.0.6',
  },
}));

import {Config} from '../config/environment';

global.fetch = jest.fn(); // Mockeamos fetch global

describe('getDocuments', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpiamos los mocks antes de cada test
  });

  test('debe devolver una lista de documentos cuando la API responde correctamente', async () => {
    const mockData: DocumentModel[] = [
      {
        Attachments: ['European Amber Lager', 'Wood-aged Beer'],
        Contributors: [
          {
            ID: '1b41861e-51e2-4bf4-ba13-b20f01ce81ef',
            Name: 'Jasen Crona',
          },
        ],
        CreatedAt: '1912-03-08T06:01:39.382278739Z',
        ID: '69517c79-a4b2-4f64-9c83-20e5678e4519',
        Title: 'Arrogant Bastard Ale',
        UpdatedAt: '1952-02-29T22:21:13.817038244Z',
        Version: '5.3.15',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await getDocuments();

    expect(global.fetch).toHaveBeenCalledWith(
      `${Config.BASE_URL}/documents`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      },
    );
    expect(result).toEqual(mockData);
  });

  test('debe devolver null cuando la API responde con error', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Network Error',
    });

    const result = await getDocuments();

    expect(global.fetch).toHaveBeenCalledWith(
      `${Config.BASE_URL}/documents`,
      {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      },
    );
    expect(result).toBeNull();
  });

  test('debe devolver null cuando hay un error en la petición', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Fetch failed'),
    );

    const result = await getDocuments();

    expect(result).toBeNull();
  });
});
