import React from "react";

import { TextInput, HelperText } from "react-native-paper";
import { ErrorMessage } from "@hookform/error-message";
import { useController } from "react-hook-form";
import { View, TextInput as NativeTextInput } from "react-native";

const FormInput = (props) => {
  const { field, formState } = useController({
    name: props.name,
    control: props.control,
    defaultValue: props.defaultValue,
  });

  return (
    <View style={{ marginTop: 8, marginHorizontal: 16 }}>
      <TextInput
        ref={field.ref}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        multiline={field.name === "address" ? true : false}
        render={(baseProps) => (
          <NativeTextInput
            {...baseProps}
            numberOfLines={3}
            style={[
              baseProps.style,
              baseProps.multiline
                ? {
                    height: 100,
                    paddingBottom: 8,
                    paddingTop: 8,
                  }
                : null,
            ]}
          />
        )}
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

export default FormInput;
