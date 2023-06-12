import { useEffect, useState } from 'react';
import logo from '../logo.svg';

export const useBattery = () => {

  const [bettery, setBettery] = useState<number>(0);
  const [charging , setCharging] = useState<boolean>(false);
  const [permissionNotification, setPermissionNotification] = useState<boolean>(false);

  useEffect(() => {
    if ('Notification' in window && navigator.serviceWorker) {
      Notification.requestPermission().then((permission) => {
        setPermissionNotification(permission === 'granted');
        if (permission === 'granted') {
          listenerLevelBattery();
        }
      });
    }
  }, []);

  const listenerLevelBattery = () => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBettery(numeroEntero(battery.level * 100));
        setCharging(battery.charging);
        battery.addEventListener('levelchange', async () => {
          const leveMax = 99;
          const leveMin = 17;
          const levelBattery = numeroEntero(battery.level * 100);
          setBettery(levelBattery);
          const messageLevel = `\nBattery Level: ${bettery}%`
          const message = levelBattery > leveMax ? 'Fully charged battery' : 'Low battery,\nit is recommended to connect charger.';
          if (levelBattery > leveMax || (levelBattery <= leveMin && !charging)) {
            const fullMessage = `${message + messageLevel}`;
            handleShowNotification(fullMessage);
            await sentMessage(fullMessage, '');
          }
        });

        battery.addEventListener('chargingchange', function() {
          setCharging(battery.charging);
        });
      });
    } else {
      handleShowNotification('The Battery API is not supported in this browser.')
    }
  }

  const handleShowNotification = (body: string) => {
    if (Notification.permission === 'granted') {
      const vibrate = [200, 100, 200, 100, 200, 100, 400, 100, 200, 100, 200, 100, 400];
      const notification = new Notification('Battery alert', {
        badge: logo,
        body,
        // image: logo,
        icon: logo,
        lang: 'en',
        requireInteraction: false,
        renotify: true,
        tag: 'Alert Battery',
        vibrate,
      });
    }
  };

  const sentMessage = async (message: string, chatId: string) => {
    const botToken = ''; // Reemplaza con tu token de acceso

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      if (response.ok) {
        console.log('Mensaje enviado exitosamente');
      } else {
        console.error('Error al enviar el mensaje:', response.status);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  }

  const numeroEntero = (numero: number): number => {
    return parseInt(numero.toFixed(0));
  }

  return {
    bettery,
    charging,
    permissionNotification,
    sentMessage
  }
}
