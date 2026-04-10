import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import React from "react";
import {
  Alert,
  DevSettings,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Dữ liệu giả lập cho danh mục và sản phẩm
const CATEGORIES = ["Tất cả", "Áo khoác", "Giày dép", "Phụ kiện", "Đồ điện tử"];
const PRODUCTS = [
  {
    id: "1",
    name: "Áo Hoodie Modern",
    price: "450.000đ",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Giày Sneaker White",
    price: "1.200.000đ",
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Đồng hồ Minimalist",
    price: "850.000đ",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Balo Du lịch",
    price: "600.000đ",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function ShopHomeScreen() {
  const clearOnboarding = async () => {
    try {
      await SecureStore.deleteItemAsync("has_launched");

      const msg =
        "Đã xóa lưu trữ. Vui lòng tải lại ứng dụng (refresh) để xem lại màn hình chào mừng (Onboarding).";
      if (Platform.OS === "web") {
        window.alert(msg);
        window.location.reload(); // Tự động F5 trên web
      } else {
        Alert.alert("Thành công", msg, [
          {
            text: "Khởi động lại ngay",
            onPress: () => {
              if (__DEV__) {
                DevSettings.reload();
              } else {
                Alert.alert("Hãy đóng hẳn app và mở lại.");
              }
            },
          },
          { text: "Để sau", style: "cancel" },
        ]);
      }
    } catch (e) {
      console.error("Lỗi khi xóa SecureStore", e);
      if (Platform.OS === "web") window.alert("Lỗi khi xóa: " + e);
      else Alert.alert("Lỗi", "Không thể xóa lưu trữ");
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. Header & Thanh tìm kiếm */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.welcomeText}>Chào buổi sáng,</Text>
            <Text style={styles.userName}>người dùng 67</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={clearOnboarding}
              style={{
                marginRight: 15,
                padding: 8,
                backgroundColor: "#F0F0F0",
                borderRadius: 12,
              }}
            >
              <MaterialCommunityIcons name="refresh" size={26} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartBtn}>
              <MaterialCommunityIcons
                name="cart-outline"
                size={26}
                color="#000"
              />
              <View style={styles.cartBadge} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={22} color="#999" />
          <TextInput
            placeholder="Tìm kiếm sản phẩm..."
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 2. Banner Khuyến mãi */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Giảm giá 30%</Text>
            <Text style={styles.bannerSub}>Cho bộ sưu tập mùa hè mới nhất</Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>Mua ngay</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
            }}
            style={styles.bannerImg}
          />
        </View>

        {/* 3. Danh mục (Categories) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Danh mục</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryBtn,
                index === 0 && styles.categoryBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  index === 0 && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 4. Danh sách sản phẩm (Grid) */}
        <View style={styles.productGrid}>
          {PRODUCTS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.addBtn}>
                  <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: { fontSize: 14, color: "#888" },
  userName: { fontSize: 20, fontWeight: "bold", color: "#000" },
  cartBtn: { padding: 8, backgroundColor: "#F0F0F0", borderRadius: 12 },
  cartBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    backgroundColor: "#FF4757",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F2F6",
    paddingHorizontal: 15,
    borderRadius: 15,
    height: 50,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },

  bannerContainer: {
    margin: 20,
    height: 160,
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "#000",
  },
  bannerContent: { flex: 1, padding: 20, justifyContent: "center", zIndex: 1 },
  bannerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  bannerSub: { color: "#ddd", fontSize: 12, marginVertical: 8 },
  bannerBtn: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  bannerBtnText: { fontWeight: "bold", fontSize: 12 },
  bannerImg: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  seeAll: { color: "#3395ff" },

  categoryList: { paddingLeft: 20, marginBottom: 20 },
  categoryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  categoryBtnActive: { backgroundColor: "#000", borderColor: "#000" },
  categoryText: { color: "#888", fontWeight: "500" },
  categoryTextActive: { color: "#fff" },

  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  productCard: {
    width: (width - 45) / 2,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  productImage: { width: "100%", height: 180 },
  productInfo: { padding: 12 },
  productName: { fontSize: 14, fontWeight: "bold", color: "#333" },
  productPrice: {
    fontSize: 14,
    color: "#3395ff",
    fontWeight: "700",
    marginTop: 4,
  },
  addBtn: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#000",
    borderRadius: 8,
    padding: 4,
  },
});
