import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AboutPage } from './AboutPage';
import HomeStack from './HomePage';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarIconStyle: {
          fontSize: 24,
        },
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          fontSize: 16,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}></Ionicons>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutPage}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={size}></Ionicons>
          ),
          headerShown: true,
          title: 'About Me',
        }}
      />
    </Tab.Navigator>
  );
}
