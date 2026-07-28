import { useEffect } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import remoteConfig from '@react-native-firebase/remote-config';
import { Provider } from 'react-redux';
import { store } from './store/store';

import Authentication from './Authentication';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const activateFb = async () => {
      remoteConfig().fetchAndActivate().then((fetched: any) => {
        if (fetched) console.log('fetched');
        else console.log('not fetched')
      });
    }

    activateFb();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Authentication />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
