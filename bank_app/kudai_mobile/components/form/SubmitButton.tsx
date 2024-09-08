import React, { FC } from "react";
import { StyleSheet } from "react-native";
import AppButton from "../ui/form/AppButton";

interface SubmitButtonProps {
  title: string;
  onPress:() => void
}

const SubmitButton: FC<SubmitButtonProps> = ({ title,onPress }) => {
  return <AppButton onPress={onPress} title={title} />;
};

export default SubmitButton;

const styles = StyleSheet.create({});
