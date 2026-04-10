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
    title: "Chào mừng bạn",
    text: "Đây là ứng dụng tuyệt vời giúp bạn quản lý công việc.",
    image: { uri: "https://cdn-icons-png.flaticon.com/512/2092/2092663.png" },
    backgroundColor: "#3395ff",
  },
  {
    key: "s2",
    title: "Tính năng thông minh",
    text: "Hỗ trợ các thuật toán tối ưu hóa hiệu suất cực cao.",
    image: { uri: "https://cdn-icons-png.flaticon.com/512/1055/1055644.png" },
    backgroundColor: "#febe29",
  },
  {
    key: "s3",
    title: "Bắt đầu ngay",
    text: "Sẵn sàng trải nghiệm những điều thú vị nhất chưa?",
    image: { uri: "https://cdn-icons-png.flaticon.com/512/1087/1087420.png" },
    backgroundColor: "#22bcb5",
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
    width: 200,
    height: 200,
    marginVertical: 32,
  },
  text: {
    color: "white",
    textAlign: "center",
    paddingHorizontal: 16,
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
