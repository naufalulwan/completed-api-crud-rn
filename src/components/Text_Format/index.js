import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Col, Grid } from "react-native-easy-grid";
import { Text } from "react-native-paper";

const TextFormat = ({ title, content }) => {
  const [valueLine, setValueLine] = useState(1);

  const onTextLayout = useCallback((e) => {
    setValueLine(e.nativeEvent.lines.length);
  }, []);

  return (
    <View
      style={
        valueLine > 2
          ? { height: 80, marginHorizontal: 16 }
          : valueLine > 1
          ? { height: 55, marginHorizontal: 16 }
          : { height: 35, marginHorizontal: 16 }
      }
    >
      <Grid>
        <Col style={{ marginRight: -130, height: 35 }}>
          <Text style={{ fontWeight: "700" }}>{title}</Text>
        </Col>
        <Col style={{ marginRight: -200, height: 35 }}>
          <Text> : </Text>
        </Col>
        <Col>
          <Text
            style={{
              fontWeight: "600",
              flexDirection: "column",
              textAlign: "justify",
              lineHeight: 20,
            }}
            numberOfLines={3}
            ellipsizeMode={"tail"}
            onTextLayout={onTextLayout}
          >
            {content}
          </Text>
        </Col>
      </Grid>
    </View>
  );
};

export default TextFormat;
