import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import React from "react";
import { Alert, View } from "react-native";
import {
  Appbar,
  Avatar,
  Text,
  Button,
  ThemeProvider,
  ActivityIndicator,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import TextFormat from "../../components/Text_Format";
import { actionReducer, setEdit } from "../../redux/slices/PersonelSlice";

import {
  useDeletePersonelMutation,
  useGetPersonelByIdQuery,
} from "../../services/PersonelService";
import { useGetRanksQuery } from "../../services/RankService";
import { useGetStatusesQuery } from "../../services/StatusService";

const DetailPersonelPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tag = useSelector(actionReducer);

  const { data: personel, isLoading } = useGetPersonelByIdQuery(tag?.id);
  const [deletePersonel] = useDeletePersonelMutation();

  useGetRanksQuery();
  useGetStatusesQuery();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content
          title="Detail Personel"
          style={{ alignItems: "center" }}
        />
        <Appbar.Action />
      </Appbar.Header>

      <View
        style={{
          alignItems: "center",
          marginTop: 24,
          height: 180,
          justifyContent: "space-evenly",
        }}
      >
        {isLoading ? (
          <ActivityIndicator size={"small"} />
        ) : personel?.data?.image ? (
          <Avatar.Image
            size={100}
            onLoadStart={() => {
              console.log("Loading Image");
            }}
            source={{
              uri: "https://mabesal.indi.network" + personel?.data.image,
            }}
          />
        ) : (
          <Avatar.Icon size={100} icon="account" />
        )}

        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            {isLoading ? "Unknown" : personel?.data?.name}
          </Text>

          <Text style={{ fontSize: 16 }}>
            NRP. {isLoading ? "0" : personel?.data?.nrp}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 24 }}>
        <TextFormat
          title="Pangkat"
          content={isLoading ? "..." : personel?.data?.rank}
        />
        <TextFormat
          title="Status"
          content={isLoading ? "..." : personel?.data?.status}
        />
        <TextFormat
          title="Alamat"
          content={isLoading ? "..." : personel?.data?.address}
        />
        <TextFormat
          title="Tempat Lahir"
          content={isLoading ? "..." : personel?.data?.born_place}
        />
        <TextFormat
          title="Tanggal Lahir"
          content={
            isLoading
              ? "..."
              : personel?.data?.born_date &&
                dayjs(personel?.data?.born_date).format("DD MMMM YYYY")
          }
        />
      </View>
      <View style={{ marginTop: 32 }}>
        <Button
          mode="contained"
          disabled={isLoading}
          style={{
            marginBottom: 12,
            marginHorizontal: 14,

            backgroundColor: ThemeProvider.defaultProps.theme.colors.secondary,
          }}
          onPress={() => {
            dispatch(setEdit(true));
            navigation.navigate("AddEditPersonel");
          }}
        >
          Edit
        </Button>
        <Button
          mode="contained"
          disabled={isLoading}
          style={{
            marginHorizontal: 14,
            backgroundColor: ThemeProvider.defaultProps.theme.colors.error,
          }}
          onPress={() => {
            Alert.alert("Hapus Personel", "Apakah anda yakin?", [
              {
                text: "Batal",
                style: "cancel",
              },
              {
                text: "Hapus",
                onPress: () => {
                  deletePersonel(tag?.id)
                    .unwrap()
                    .then(() => {
                      navigation.goBack();
                    });
                },
              },
            ]);
          }}
        >
          Delete
        </Button>
      </View>
    </View>
  );
};

export default DetailPersonelPage;
