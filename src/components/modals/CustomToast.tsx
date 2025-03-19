/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text, Animated, StyleSheet} from 'react-native';

interface ToastProps {
  message?: string;
  visible: boolean;
  onHide: () => void;
}

export const CustomToast: React.FC<ToastProps> = ({
  message,
  visible,
  onHide,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timeoutId = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide());
      }, 4000);

      return () => clearTimeout(timeoutId); // Cleanup the timeout
    }
  }, [visible, fadeAnim]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toastContainer, {opacity: fadeAnim}]}>
      <Text numberOfLines={3} style={styles.toastText}>
        New document <Text style={{fontWeight: 'bold'}}>{message}</Text>{' '}
        submited
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'green',
    maxWidth: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  toastText: {
    color: 'white',
    fontSize: 14,
  },
});
