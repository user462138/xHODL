import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Button, Pressable } from 'react-native';
import { Avatar } from "react-native-paper";
import { createContext, useState } from "react";
import { DataProvider } from "@/components/DataProvider";

interface PhotoContextProps {
  photoUri: string | null;
  setPhotoUri: (uri: string | null) => void;
}

// Create the context
export const PhotoContext = createContext<PhotoContextProps>({ photoUri: '', setPhotoUri: (uri: string | null) => { } });

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const headerRightFunction = () => {
    if (photoUri) {
      return (
        <Link href="/profile" asChild>
          <Pressable>
            <Avatar.Image
              size={35}
              source={{ uri: photoUri }}
            />
          </Pressable>
        </Link>
      );
    } else {
      return (
        <Link href="/profile" asChild>
          <Pressable>
            <Avatar.Text size={35} label="XD" />
          </Pressable>
        </Link>
      );
    }
  };

  return (
    <DataProvider>
      <PhotoContext.Provider value={{ photoUri, setPhotoUri }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: 'rgba(134, 65, 244, 1)',
            headerStyle: {
              backgroundColor: '#121212',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            tabBarStyle: {
              backgroundColor: '#121212',
              borderTopColor: '#121212',
            },
            headerRight: headerRightFunction,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'xHODL',
              tabBarIcon: ({ color }) => <FontAwesome name="line-chart" size={24} color={color} />
            }}
          />
          <Tabs.Screen
            name="wallet"
            options={{
              title: 'Wallet',
              tabBarIcon: ({ color }) => <AntDesign name="piechart" size={24} color={color} />
            }}
          />
          <Tabs.Screen
            name="news"
            options={{
              title: 'News',
              tabBarIcon: ({ color }) => <FontAwesome6 name="newspaper" size={24} color={color} />
            }}
          />
          <Tabs.Screen
            name="[link]"
            options={{
              title: 'WebView',
              href: null,
              headerRight: () => null,
              headerLeft: () => <Button onPress={() => router.push({ pathname: "/news" })} title="Go Back" />,
              tabBarStyle: { display: 'none' }, // Hide the tab bar
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              href: null,
              headerRight: () => null,
              headerLeft: () => <Button onPress={() => router.back()} title="Go Back" />,
              tabBarStyle: { display: 'none' }, // Hide the tab bar
            }}
          />
          <Tabs.Screen
            name="camera"
            options={{
              href: null,
              headerRight: () => null,
              headerLeft: () => <Button onPress={() => router.back()} title="Go Back" />,
              tabBarStyle: { display: 'none' }, // Hide the tab bar
            }}
          />
          <Tabs.Screen
            name="media"
            options={{
              title: 'Media',
              href: null,
              headerRight: () => null,
              headerLeft: () => <Button onPress={() => router.back()} title="Go Back" />,
              tabBarStyle: { display: 'none' }, // Hide the tab bar
            }}
          />
        </Tabs>
      </PhotoContext.Provider>
    </DataProvider>
  );
};

export default RootLayout;
