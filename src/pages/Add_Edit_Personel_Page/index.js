import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, ScrollView, ToastAndroid, View } from "react-native";
import { Appbar, Button, Text } from "react-native-paper";
import FormInput from "../../components/Form_Input";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../../constant/ValidationSchema";
import Picker from "../../components/Picker";
import dayjs from "dayjs";
import DatePicker from "../../components/Date_Picker";

import * as ImagePicker from "expo-image-picker";

import Toast from "react-native-toast-message";

import { useGetRanksQuery } from "../../services/RankService";
import { useGetStatusesQuery } from "../../services/StatusService";
import {
  useAddPersonelMutation,
  useGetPersonelByIdQuery,
  useUpdatePersonelMutation,
} from "../../services/PersonelService";
import { useSelector } from "react-redux";
import {
  actionReducer,
  actionReducerEdit,
} from "../../redux/slices/PersonelSlice";

const initialValues = {
  nrp: "",
  name: "",
  born_place: "",
  born_date: null,
  address: "",
  rank_id: "",
  status_id: "",
};

const AddEditPersonelPage = () => {
  const navigation = useNavigation();

  const edit = useSelector(actionReducerEdit);
  const tag = useSelector(actionReducer);

  const { data: ranks } = useGetRanksQuery();
  const { data: statuses } = useGetStatusesQuery();

  const { data: personel } = useGetPersonelByIdQuery(tag?.id);

  const [image, setImage] = useState(null);

  const [addPersonel, { isLoading: loadingAdd, isError: addError }] =
    useAddPersonelMutation();
  const [editPersonel, { isLoading: loadingEdit, isError: editError }] =
    useUpdatePersonelMutation();

  const methods = useForm({
    mode: "all",
    defaultValues: edit
      ? {
          ...personel?.data,
          // nrp: personel?.data.nrp,
          // name: personel?.data.name,
          // born_place: personel?.data.born_place,
          // born_date: personel?.data.born_date,
          // address: personel?.data.address,
          rank_id: ranks?.data?.filter(
            (value) => value.name === personel?.data.rank
          )[0].id,
          status_id: statuses?.data?.filter(
            (value) => value.name === personel?.data.status
          )[0].id,
        }
      : initialValues,
    resolver: yupResolver(validationSchema),
  });

  const { control, register, setValue, handleSubmit } = methods;

  useEffect(() => {
    register("born_date");
  }, [register]);

  const onsubmit = async (values) => {
    const formdata = new FormData();

    if (!edit) {
      formdata.append("nrp", values.nrp);
      formdata.append("name", values.name);
      formdata.append("born_place", values.born_place);
      formdata.append(
        "born_date",
        dayjs(values.born_date).format("YYYY-MM-DD")
      );
      formdata.append("address", values.address);
      formdata.append("rank_id", values.rank_id);
      formdata.append("status_id", values.status_id);

      if (image) {
        formdata.append("image", {
          uri: image?.uri,
          type: `${image?.type}/${image?.uri.split(".")[1]}`,
          name: image?.uri.split("/").pop(),
        });
      }
    }

    const result = Object.keys(values).reduce((acc, key) => {
      if (key !== "image") {
        acc[key] = values[key];
      }
      return acc;
    }, {});

    const payload = {
      ...result,
      born_date: dayjs(values.born_date).format("YYYY-MM-DD"),
    };

    if (edit) {
      await editPersonel({ id: tag?.id, data: payload })
        .unwrap()
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Yeay!",
            text2: "Personel berhasil diubah",
          });
          navigation.goBack();
        })
        .catch((_) => {
          Toast.show({
            type: "error",
            text1: "Terjadi Kesalahan",
            text2: "Personel gagal diubah",
          });
        });
    } else {
      await addPersonel(formdata)
        .unwrap()
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Yeay!",
            text2: "Personel berhasil ditambahkan",
          });
          navigation.goBack();
        })
        .catch((err) => {
          Toast.show({
            type: "error",
            text1: "Oops!",
            text2: "Personel gagal ditambahkan",
          });
        });
    }
  };

  const pickImage = async () => {
    ImagePicker.requestMediaLibraryPermissionsAsync();
    if ((await ImagePicker.getMediaLibraryPermissionsAsync()).granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: false,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0]);
      } else if (result.canceled) {
        ToastAndroid.show("Kamu tidak memilih gambar", ToastAndroid.SHORT);
      }
    } else {
      Alert.alert(
        "Perijinan Dibutuhkan",
        "Aplikasi membutuhkan perijinan untuk mengakses kamera, atau bisa melakukannya dengan manual di pengaturan aplikasi"
      );
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Tambah Personel" />
      </Appbar.Header>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <FormInput
            name="nrp"
            label="Nomor Personel"
            mode="outlined"
            control={control}
            keyboardType={"number-pad"}
          />
          <FormInput
            name="name"
            label="Nama Personil"
            mode="outlined"
            control={control}
          />
          <FormInput
            name="born_place"
            label="Tempat Lahir"
            mode="outlined"
            control={control}
          />
          <DatePicker
            setValue={setValue}
            value={personel?.data.born_date}
            tag="born_date"
            edit={edit}
            control={control}
          />
          <FormInput
            name="address"
            label="Alamat"
            mode="outlined"
            control={control}
          />
          <Picker
            name="rank_id"
            label="Pangkat"
            mode="outlined"
            control={control}
            list={
              ranks?.data?.map((rank) => ({
                label: rank.name,
                value: rank.id,
              })) ?? []
            }
          />
          <Picker
            name="status_id"
            label="Status"
            mode="outlined"
            control={control}
            list={
              statuses?.data?.map((status) => ({
                label: status.name,
                value: status.id,
              })) ?? []
            }
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 16,
              marginVertical: 16,
            }}
          >
            <Text numberOfLines={2} style={{ width: 200 }}>
              {image
                ? image?.uri
                : edit && personel?.data?.image
                ? personel?.data.image
                : "Silahkan pilih foto"}
            </Text>
            <Button onPress={pickImage}>Buka File</Button>
          </View>
          <Button
            mode="contained"
            style={{ marginVertical: 20, marginHorizontal: 16 }}
            onPress={handleSubmit(onsubmit, onError)}
          >
            {loadingAdd || loadingEdit ? "Now Loading" : "Simpan"}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddEditPersonelPage;
