import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import ChaptersScreen from "../screens/ChaptersScreen";
import VersesScreen from "../screens/VersesScreen";
import SlokScreen from "../screens/SlokScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChaptersScreen">
        <Stack.Screen
          name="ChaptersScreen"
          component={ChaptersScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VersesScreen"
          component={VersesScreen}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="SlokScreen"
          component={SlokScreen}
          options={{
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
