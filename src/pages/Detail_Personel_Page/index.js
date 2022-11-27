import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import {
  Appbar,
  Avatar,
  Text,
  Button,
  ThemeProvider,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import DetailFormat from "../../components/Detail_Format";
import { actionReducer, setEdit } from "../../redux/slices/PersonelSlice";
import Toast from "react-native-toast-message";
import {
  useDeletePersonelMutation,
  useGetPersonelByIdQuery,
} from "../../services/PersonelService";
import { useGetRanksQuery } from "../../services/RankService";
import { useGetStatusesQuery } from "../../services/StatusService";
import config from "../../config";

const DetailPersonelPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tag = useSelector(actionReducer);

  useGetRanksQuery();
  useGetStatusesQuery();

  const {
    data: personel,
    isLoading,
    refetch,
  } = useGetPersonelByIdQuery(tag?.id);
  const [deletePersonel] = useDeletePersonelMutation();

  useEffect(() => {
    refetch();
  }, []);

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
        {personel?.data?.image ? (
          <Avatar.Image
            size={100}
            onLoadStart={() => {
              <Avatar.Icon size={100} icon="account" />;
            }}
            source={{
              uri: config.BASE_URL + personel?.data.image,
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
            {isLoading ? "" : "NRP. " + personel?.data?.nrp}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 24 }}>
        <DetailFormat
          title="Pangkat"
          content={isLoading ? "..." : personel?.data?.rank}
        />
        <DetailFormat
          title="Status"
          content={isLoading ? "..." : personel?.data?.status}
        />
        <DetailFormat
          title="Alamat"
          content={isLoading ? "..." : personel?.data?.address}
        />
        <DetailFormat
          title="Tempat Lahir"
          content={isLoading ? "..." : personel?.data?.born_place}
        />
        <DetailFormat
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
                      Toast.show({
                        type: "info",
                        text1: "Yeay!",
                        text2: "Personel berhasil dihapus",
                      });
                      navigation.goBack();
                    })
                    .catch((err) => {
                      Toast.show({
                        type: "error",
                        text1: "Oops!",
                        text2: err?.data?.message,
                      });
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
