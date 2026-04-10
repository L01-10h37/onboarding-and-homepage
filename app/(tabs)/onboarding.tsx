import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

// Định nghĩa kiểu dữ liệu cho mỗi Slide
interface SlideItem {
  key: string;
  title: string;
  text: string;
  image: ImageSourcePropType;
  backgroundColor: string;
}

// Định nghĩa kiểu dữ liệu cho Props của component
interface OnboardingProps {
  onDone: () => void;
}

const slides: SlideItem[] = [
  {
    key: "s1",
    title: "Chào mừng đến với UniBite",
    text: "UniBite giúp bạn dễ dàng khám phá những món ăn ngon quanh khuôn viên trường nhanh chóng, tiện lợi và đáng tin cậy.",
    image: require("@/assets/images/screen1.png"),
    backgroundColor: "#DAF2DB",
  },
  {
    key: "s2",
    title: "Khám phá quán ăn quanh bạn",
    text: "Tìm kiếm và khám phá những quán ăn ngon gần bạn với chỉ một chạm.",
    image: require("@/assets/images/screen2.png"),
    backgroundColor: "#DAF2DB",
  },
  {
    key: "s3",
    title: "Đặt món thật dễ dàng",
    text: "Thêm món ăn yêu thích vào giỏ và đặt hàng chỉ với vài thao tác. Trải nghiệm đặt đồ ăn nhanh chóng, tiện lợi và rõ ràng hơn bao giờ hết.",
    image: require("@/assets/images/screen3.png"),
    backgroundColor: "#DAF2DB",
  },
    {
    key: "s4",
    title: "Đánh giá & tin cậy",
    text: "Xem nhận xét và đánh giá chân thực từ các sinh viên khác để chọn món ăn phù hợp. Không còn phải tìm kiếm thông tin rời rạc trên mạng xã hội.",
    image: require("@/assets/images/screen4.png"),
    backgroundColor: "#DAF2DB",
  },
];

const OnboardingScreen: React.FC<OnboardingProps> = ({ onDone }) => {
  const renderItem = ({ item }: { item: SlideItem }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      showSkipButton={true}
      onSkip={onDone}
      bottomButton
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 96,
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: "#6D5A5A",
    textAlign: "center",
    paddingHorizontal: 16,
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    color: "#3E8C55",
    fontWeight: "bold",
    textAlign: "center",
  },
});
