import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { CustomText, AppButton } from "@/components";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.button}
      >
        <CustomText type="body1">{t("translate.selectLanguage")}</CustomText>
        <MaterialIcons name="language" size={24} color={COLORS.black} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CustomText type="h3">{t("translate.selectLanguage")}</CustomText>
            <RNPickerSelect
              placeholder={{
                label: t("translate.selectLanguage"),
                value: null,
                color: COLORS.primary,
              }}
              onValueChange={(value) => changeLanguage(value)}
              items={[
                { label: t("translate.en"), value: "en" },
                { label: t("translate.fr"), value: "fr" },
                { label: t("translate.de"), value: "de" },
              ]}
              style={{
                inputIOS: styles.pickerInput,
                inputAndroid: styles.pickerInput,
              }}
            />
            <AppButton
              title={t("translate.close")}
              onPress={() => setModalVisible(false)}
              backgroundColor={COLORS.danger}
              containerStyle={styles.closeButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray,
    padding: 10,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: "center",
  },
  pickerInput: {
    color: COLORS.primary,
    width: "100%",
    marginTop: 20,
  },
  closeButton: {
    marginTop: 20,
    width: "100%",
  },
});

export default LanguageSelector;
