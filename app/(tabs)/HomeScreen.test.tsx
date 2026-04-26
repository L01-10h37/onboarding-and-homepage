import { describe, expect, it } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import HomeScreen from "./index";

jest.mock("@expo/vector-icons", () => {
    const ReactLib = require("react");
    const { Text } = require("react-native");

    return {
        Ionicons: ({ name }: { name: string }) => <Text>{name}</Text>,
        MaterialCommunityIcons: ({ name }: { name: string }) => (
            <Text>{name}</Text>
        ),
    };
});

describe("HomeScreen", () => {
    it("renders without crashing", () => {
        const { toJSON } = render(<HomeScreen />);
        expect(toJSON()).toBeTruthy();
    });

    it("renders the search bar, categories, discount card and popular foods section", () => {
        const { getByText, getByPlaceholderText } = render(<HomeScreen />);

        // Search bar
        expect(
            getByPlaceholderText("Tìm kiếm món ăn, quán ăn,..."),
        ).toBeTruthy();

        // Categories
        expect(getByText("Tất cả")).toBeTruthy();
        expect(getByText("Cơm")).toBeTruthy();
        expect(getByText("Phở")).toBeTruthy();
        expect(getByText("Bánh")).toBeTruthy();
        expect(getByText("Giải khát")).toBeTruthy();

        // Discount card
        expect(getByText("Giảm giá 50%")).toBeTruthy();
        expect(getByText("Đặt ngay")).toBeTruthy();

        // Section header
        expect(getByText("Món ăn phổ biến")).toBeTruthy();
        expect(getByText("Xem tất cả")).toBeTruthy();
    });

    it("renders all popular food cards with name, price and rating", () => {
        const { getByText } = render(<HomeScreen />);

        // Food names
        expect(getByText("Cơm gà xối mỡ")).toBeTruthy();
        expect(getByText("Bún bò Huế")).toBeTruthy();
        expect(getByText("Bún riêu cua")).toBeTruthy();
        expect(getByText("Mì cay 7 cấp độ")).toBeTruthy();

        // Prices
        expect(getByText("50.000đ")).toBeTruthy();
        expect(getByText("45.000đ")).toBeTruthy();
        expect(getByText("43.000đ")).toBeTruthy();
        expect(getByText("60.000đ")).toBeTruthy();
    });

    it("allows pressing the 'Đặt ngay' button without errors", () => {
        const { getByText } = render(<HomeScreen />);

        const orderButton = getByText("Đặt ngay");
        expect(() => fireEvent.press(orderButton)).not.toThrow();
    });

    it("allows pressing a food card without errors", () => {
        const { getByText } = render(<HomeScreen />);

        const foodCard = getByText("Cơm gà xối mỡ");
        expect(() => fireEvent.press(foodCard)).not.toThrow();
    });
});
