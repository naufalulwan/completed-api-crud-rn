import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  TouchableHighlight,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Divider,
  List,
  ThemeProvider,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { setEdit, setPersonelbyId } from "../../redux/slices/PersonelSlice";
import { baseService } from "../../services";
import { useGetPersonelQuery } from "../../services/PersonelService";
import config from "../../config";

const PersonelPage = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(10);
  const [refresh, setRefresh] = useState(false);

  const {
    data: personels,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useGetPersonelQuery(perPage);

  const onRefresh = () => {
    setRefresh(true);
    refetch();
    setRefresh(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ zIndex: 1 }}>
        <Appbar.Action />
        <Appbar.Content title="Personel" style={{ alignItems: "center" }} />
        <Appbar.Action
          icon="plus"
          onPress={() => {
            dispatch(setEdit(false));
            navigation.navigate("AddEditPersonel");
          }}
        />
      </Appbar.Header>

      <FlatList
        data={personels?.data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            title="Refresh...."
            colors={[ThemeProvider.defaultProps.theme.colors.primary]}
            refreshing={refresh}
            onRefresh={onRefresh}
          />
        }
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableHighlight
                underlayColor={
                  ThemeProvider.defaultProps.theme.colors.surfaceVariant
                }
                onPress={() => {
                  dispatch(setPersonelbyId(item.id));
                  navigation.navigate("DetailPersonel");
                }}
              >
                <List.Item
                  style={{
                    paddingHorizontal: 8,
                  }}
                  title={item.name}
                  description={"Pangkat : " + item.rank}
                  left={(props) =>
                    item.image ? (
                      <List.Image
                        {...props}
                        style={{ width: 50, height: 50, borderRadius: 50 }}
                        source={{
                          uri: config.BASE_URL + item.image,
                        }}
                      />
                    ) : (
                      <List.Icon
                        {...props}
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor: "white",
                          borderRadius: 50,
                        }}
                        icon="account"
                      />
                    )
                  }
                />
              </TouchableHighlight>
              <Divider />
            </View>
          );
        }}
        ListEmptyComponent={() =>
          isLoading && (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator animating={true} size={"large"} />
            </View>
          )
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (perPage < personels?.meta?.total) {
            setPerPage((prev) => prev + 10);
            baseService.util.invalidateTags(["personel"]);
          }
        }}
        ListFooterComponent={() => {
          return refresh && isFetching && isSuccess ? (
            <View style={{ marginTop: 16, marginBottom: 32 }}>
              <ActivityIndicator animating={true} size={"small"} />
            </View>
          ) : null;
        }}
      />
    </View>
  );
};

export default PersonelPage;
