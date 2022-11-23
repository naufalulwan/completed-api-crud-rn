import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddEditPersonelPage from "../pages/Add_Edit_Personel_Page";
import DetailPersonelPage from "../pages/Detail_Personel_Page";
import PersonelPage from "../pages/Personel_Page";

const { Navigator, Screen } = createNativeStackNavigator();

const Router = () => {
  return (
    <Navigator
      initialRouteName="Personel"
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    >
      <Screen name="Personel" component={PersonelPage} />
      <Screen name="AddEditPersonel" component={AddEditPersonelPage} />
      <Screen name="DetailPersonel" component={DetailPersonelPage} />
    </Navigator>
  );
};

export default Router;
