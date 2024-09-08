import React from "react";
import { Modal, View, StyleSheet, Alert } from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "@/constants/theme";
import { AppButton, AuthCheckbox, CustomDateTimePicker, CustomText } from "@/components";
import { baseUrl } from "@/utils/variables";

interface TimeSlotModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCreate: (startTime: string, endTime: string, isAvailable: boolean) => void;
}

interface TimeSlotValues {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const timeSlotSchema = yup.object({
  startTime: yup
    .string()
    .required()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, // Regular expression for HH:MM:SS format
      "Start time must be in the format HH:MM:SS"
    ),
  endTime: yup
    .string()
    .required()
    .matches(
      /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, // Regular expression for HH:MM:SS format
      "End time must be in the format HH:MM:SS"
    ),
  isAvailable: yup.boolean().default(true),
});

const initialValues: TimeSlotValues = {
  startTime: "",
  endTime: "",
  isAvailable: true,
};

const TimeSlotModal: React.FC<TimeSlotModalProps> = ({
  isVisible,
  onClose,
  onCreate,
}) => {
  const { t } = useTranslation();

  const handleCreate = async (
    values: TimeSlotValues,
    actions: FormikHelpers<TimeSlotValues>
  ) => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const user = userData ? JSON.parse(userData) : null;
      const doctorId = user?.id;

      if (!doctorId) {
        throw new Error("Doctor ID not found");
      }

      const newTimeSlot = {
        doctorId,
        startTime: values.startTime,
        endTime: values.endTime,
        isAvailable: values.isAvailable,
      };

      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.post(
        `${baseUrl}/doctor/create-time-slot`,
        newTimeSlot,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onCreate(values.startTime, values.endTime, values.isAvailable);
      onClose();
    } catch (error:any) {
      console.error("Error response:", error.response); // Log the error response for debugging
      Alert.alert("Error", t("timeslot.failedToCreateTimeSlot"));
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <CustomText type="h3">{t("timeslot.createTimeSlot")}</CustomText>
          <Formik
            initialValues={initialValues}
            validationSchema={timeSlotSchema}
            onSubmit={handleCreate}
          >
            {({ handleSubmit, values, setFieldValue }) => (
              <View>
                <CustomDateTimePicker
                  name="startTime"
                  label={t("timeslot.selectStartTime")}
                />
                <CustomDateTimePicker
                  name="endTime"
                  label={t("timeslot.selectEndTime")}
                />
                <AuthCheckbox
                  isChecked={values.isAvailable}
                  onPress={() =>
                    setFieldValue("isAvailable", !values.isAvailable)
                  }
                  title={t("timeslot.isAvailable")}
                />
                <View style={styles.buttonContainer}>
                  <AppButton
                    title={t("timeslot.create")}
                    onPress={handleSubmit}
                    width={120}
                    backgroundColor={COLORS.primary}
                  />
                  <AppButton
                    title={t("timeslot.cancel")}
                    onPress={onClose}
                    width={120}
                    backgroundColor={COLORS.danger}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 12,
  },
});

export default TimeSlotModal;
