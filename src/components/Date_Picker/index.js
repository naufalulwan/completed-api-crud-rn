import React, { useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { View, TouchableHighlight } from "react-native";
import FormInput from "../Form_Input";
import dayjs from "dayjs";
import { useWatch } from "react-hook-form";

const DatePicker = ({ setValue, value, edit, tag, control }) => {
  const [date, setDate] = useState(edit ? new Date(value) : new Date());

  const bornDateHook = useWatch({
    control,
    name: tag,
  });

  const onChange = (event, picker) => {
    if (event.type === "set") {
      const currentDate = picker || date;
      setValue(tag, currentDate, { shouldValidate: true });
      setDate(currentDate);
    }
  };

  const setDateTimePicker = () => {
    DateTimePickerAndroid.open({
      testID: "dateTimePicker",
      value: date,
      mode: "date",
      display: "default",
      is24Hour: true,
      onChange,
    });
  };

  return (
    <View>
      <TouchableHighlight
        underlayColor={"transparent"}
        onPress={setDateTimePicker}
      >
        <FormInput
          name="born_date"
          label="Tanggal Lahir"
          mode="outlined"
          control={control}
          editable={false}
          value={bornDateHook ? dayjs(bornDateHook).format("DD MMMM YYYY") : ""}
        />
      </TouchableHighlight>
    </View>
  );
};

export default DatePicker;
