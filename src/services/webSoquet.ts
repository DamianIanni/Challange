class WebSocketService {
  private socket: WebSocket | null = null;
  public isConnected: boolean = false;
  private messages: string[] = [];

  // Establecer la conexión WebSocket
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

    // this.socket.onmessage = event => {
    //   console.log('Mensaje recibido:', event.data);
    //   this.messages.push(event.data); // Guardar los mensajes en el array
    // };

    this.socket.onerror = error => {
      console.error('Error en la conexión WebSocket:', error.message);
    };

    this.socket.onclose = event => {
      console.log('Conexión WebSocket cerrada', event.code);
      this.isConnected = false;
    };
  }

  // Cerrar la conexión WebSocket
  close(): void {
    if (this.socket) {
      this.socket.close();
      console.log('Conexión WebSocket cerrada manualmente');
    }
    // else {
    //   console.warn(
    //     'No se puede cerrar WebSocket: ya está cerrado o no existe.',
    //   );
    // }

    this.isConnected = false;
    this.socket = null;
  }

  // Obtener los mensajes recibidos
  getMessages(): string[] {
    return this.messages;
  }
}

export default WebSocketService;
