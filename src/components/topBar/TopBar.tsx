import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {storageService} from '../../utils/newstorage';
import WebSocketService from '../../services/webSoquet';
import {NotificationModel} from '../../models/notificationModel';

export const TopBar: React.FC = () => {
  const [notificationsAmount, setNotificationsAmount] = useState(0);
  const [notificationBuffer, setNotificationBuffer] = useState<
    NotificationModel[]
  >([]);
  const navigation = useNavigation();
  const websocket = new WebSocketService();
  const {MyNativeModule} = NativeModules;

  const fetchNotificationsCount = async () => {
    const storedNotifications = await storageService.getNotificationsArray(
      'notifications',
    );
    setNotificationsAmount(
      storedNotifications ? storedNotifications.length : 0,
    );
  };

  useEffect(() => {
    fetchNotificationsCount();
    websocket.connect();

    MyNativeModule.getMessage((message: string) => {
      console.log(message); // Esto imprimirá "Este es el mensaje desde el módulo nativo"
    });
    console.log('MODULE', MyNativeModule);

    if (websocket.socket) {
      websocket.socket.onmessage = async event => {
        // console.log('Nueva notificación recibida:', event.data);

        const newNotification = JSON.parse(event.data);

        // Agregar la notificación al buffer con un límite de 99
        setNotificationBuffer(prev => {
          const updatedBuffer = [...prev, newNotification];
          if (updatedBuffer.length > 99) {
            updatedBuffer.shift(); // Eliminar la más antigua si se supera el límite
          }
          return updatedBuffer;
        });
      };
    }

    // Procesar una notificación cada 10 segundos
    const interval = setInterval(async () => {
      setNotificationBuffer(prevBuffer => {
        if (prevBuffer.length > 0) {
          const [firstNotification, ...rest] = prevBuffer;

          console.log('Mostrando notificación:', firstNotification);

          // Guardar la notificación en el almacenamiento
          storageService.saveNotification('notifications', firstNotification);
          // Actualizar el contador
          fetchNotificationsCount();

          MyNativeModule.showNotification(
            firstNotification.UserName,
            firstNotification.DocumentTitle,
          );
          return rest;
        }
        return prevBuffer;
      });
    }, 20000);

    return () => {
      websocket.close();
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textTitle}>Documents</Text>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Notification')}>
        <Image
          source={require('../../assests/icons/bell.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      {notificationsAmount > 0 && (
        <TouchableOpacity
          style={styles.badge}
          onPress={() => navigation.navigate('Notification')}>
          <Text style={styles.badgeText}>
            {notificationsAmount < 100 ? notificationsAmount : '99'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
  },
  icon: {resizeMode: 'contain', width: 36, height: 36},
  textTitle: {
    fontSize: 36,
    fontWeight: '700',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
    borderRadius: 10,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: 'grey',
  },
  badge: {
    position: 'absolute',
    top: '30%',
    right: '7%',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
