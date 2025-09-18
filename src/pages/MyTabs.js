import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AboutPage } from './AboutPage';
import HomeStack from './HomePage';
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarIconStyle: {
          fontSize: 22,
        },
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle: {
          paddingTop: 4,
          fontSize: 14,
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
