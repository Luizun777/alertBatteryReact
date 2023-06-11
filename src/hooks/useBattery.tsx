import { useEffect, useState } from 'react';
import logo from '../logo.svg';

export const useBattery = () => {

  const [bettery, setBettery] = useState<number>(0);
  const [charging , setCharging] = useState<boolean>(false);

  useEffect(() => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBettery(battery.level * 100);
        setCharging(battery.charging);
        battery.addEventListener('levelchange', () => {
          const levelBattery = battery.level * 100;
          setBettery(levelBattery);
          const messageLevel = `\nBattery Level: ${bettery}%`
          const message = levelBattery === 100 ? 'Fully charged battery' : 'Low battery, it is recommended to connect charger.';
          if (levelBattery === 100 || levelBattery === 15) {
            handleShowNotification(`${message + messageLevel}`);
          }
        });

        battery.addEventListener('chargingchange', function() {
          setCharging(battery.charging);
        });
      });
    } else {
      handleShowNotification('The Battery API is not supported in this browser.')
    }
  }, []);

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

  return {
    bettery,
    charging
  }
}
