class WebSocketService {
  public socket: WebSocket | null = null;
  public isConnected: boolean = false;

  connect(): void {
    if (this.socket) {
      console.warn('Ya está conectado a un WebSocket.');
      return;
    }

    this.socket = new WebSocket('ws://localhost:8080/notifications');

    this.socket.onopen = () => {
      console.log('Conexión WebSocket abierta');
      this.isConnected = true;
    };

    this.socket.onerror = error => {
      console.error('Error en la conexión WebSocket:', error.message);
    };

    this.socket.onclose = event => {
      console.log('Conexión WebSocket cerrada', event.code);
      this.isConnected = false;
    };
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
      console.log('Conexión WebSocket cerrada manualmente');
    }

    this.isConnected = false;
    this.socket = null;
  }
}

export default WebSocketService;
