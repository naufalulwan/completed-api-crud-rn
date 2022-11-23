import DropDown from "react-native-paper-dropdown";
import React, { useState } from "react";
import { View } from "react-native";
import { useController } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { HelperText } from "react-native-paper";

const Picker = (props) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const { field, formState } = useController({
    name: props.name,
    control: props.control,
    defaultValue: props.defaultValue,
  });

  return (
    <View style={{ marginTop: 8, marginHorizontal: 16 }}>
      <DropDown
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={field.value}
        setValue={field.onChange}
        {...props}
      />
      <ErrorMessage
        errors={formState.errors}
        name={props.name}
        render={({ message }) => (
          <HelperText type="error" visible={!!message}>
            {message}
          </HelperText>
        )}
      />
    </View>
  );
};

export default Picker;
