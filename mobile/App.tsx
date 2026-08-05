import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "./src/theme";

import HomeScreen from "./src/screens/HomeScreen";
import DoseScreen from "./src/screens/DoseScreen";
import AppointmentScreen from "./src/screens/AppointmentScreen";
import InstructionsScreen from "./src/screens/InstructionsScreen";
import NutritionScreen from "./src/screens/NutritionScreen";
import ContactScreen from "./src/screens/ContactScreen";

type TabParamList = {
  Home: undefined;
  Dose: undefined;
  Appointment: undefined;
  Instructions: undefined;
  Nutrition: undefined;
  Contact: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<string, { focused: keyof typeof Ionicons.glyphMap; default: keyof typeof Ionicons.glyphMap }> = {
  Home: { focused: "home", default: "home-outline" },
  Dose: { focused: "medkit", default: "medkit-outline" },
  Appointment: { focused: "calendar", default: "calendar-outline" },
  Instructions: { focused: "list", default: "list-outline" },
  Nutrition: { focused: "leaf", default: "leaf-outline" },
  Contact: { focused: "chatbubbles", default: "chatbubbles-outline" },
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          const icons = TAB_ICONS[route.name];
          return (
            <Ionicons
              name={focused ? icons.focused : icons.default}
              size={size}
              color={focused ? colors.primary : colors.textLight}
            />
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTitleStyle: {
          fontWeight: "600",
          color: colors.text,
        },
        headerShadowVisible: false,
        lazy: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Inicio", headerShown: false }}
      />
      <Tab.Screen
        name="Dose"
        component={DoseScreen}
        options={{ title: "Mi Dosis" }}
      />
      <Tab.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{ title: "Cita" }}
      />
      <Tab.Screen
        name="Instructions"
        component={InstructionsScreen}
        options={{ title: "Indicaciones" }}
      />
      <Tab.Screen
        name="Nutrition"
        component={NutritionScreen}
        options={{ title: "Nutrición" }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: "Contacto" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <TabNavigator />
    </NavigationContainer>
  );
}
