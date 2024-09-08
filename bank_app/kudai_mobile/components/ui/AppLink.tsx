import { COLORS } from "@/constants/theme";
import { FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import CustomText from "../texts/CustomText";

interface Props {
  title: string;
  onPress?(): void;
}

const AppLink: FC<Props> = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <CustomText type="body5">{title}</CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: COLORS.primary,
  },
  title: {
    color: COLORS.primary,
  },
});

export default AppLink;
