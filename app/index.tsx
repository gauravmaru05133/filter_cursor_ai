import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SplashScreen } from '@/components/splash-screen';

export default function IndexScreen() {
  const router = useRouter();

  const handleLoginPress = () => {
    router.replace('/login');
  };

  return <SplashScreen onLoginPress={handleLoginPress} />;
}



