import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Entypo } from "@expo/vector-icons";
import { COLORS,FONTS } from "@/constants/theme";
import CustomText from "../texts/CustomText";

interface NotificationCardProps {
  image: string;
  title: string;
  subject: string;
  time: string;
}

const NotificationCard: FC<NotificationCardProps> = ({
  image,
  title,
  subject,
  time,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/doctor.jpeg")}
          style={{ width: "100%", height: "100%", borderRadius: 35 }}
        />
      </View>
      <View style={styles.textContainer}>
        <CustomText type="body4">{title}</CustomText>
        <CustomText type="body3">{subject}</CustomText>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Entypo name="back-in-time" size={32} color="black" />
            <Text style={{ marginLeft: 12, color: COLORS.black, ...FONTS.h3 }}>
              {time}
            </Text>
          </View>

          <Button title="View" />
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    // elevation: 2,
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 6,
    width: "100%",
    height: 120,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: "gray",
    maxHeight: "auto",
    marginTop:12
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  textContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 24,
    flex: 1,
  },
  image: { 
    width: "100%", 
    height: "100%", 
    borderRadius: 35
  },
});
