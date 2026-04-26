// import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import OnboardingScreen from "../app/(tabs)/onboarding";

jest.mock("@expo/vector-icons", () => {
  const ReactLib = require("react");
  const { Text } = require("react-native");

  return {
    Ionicons: ({ name }: { name: string }) => <Text>{name}</Text>,
  };
});

jest.mock("react-native-app-intro-slider", () => {
  const ReactLib = require("react");
  const { View, TouchableOpacity, Text } = require("react-native");

  const goToSlideMock = jest.fn();

  const MockSlider = ReactLib.forwardRef((props: any, ref: any) => {
    ReactLib.useImperativeHandle(ref, () => ({
      goToSlide: goToSlideMock,
    }));

    return (
      <View>
        {props.renderItem({ item: props.data[0] })}

        <TouchableOpacity
          testID="set-index-0"
          onPress={() => props.onSlideChange?.(0)}
        >
          <Text>Set index 0</Text>
        </TouchableOpacity>

        <TouchableOpacity
          testID="set-index-last"
          onPress={() => props.onSlideChange?.(props.data.length - 1)}
        >
          <Text>Set index last</Text>
        </TouchableOpacity>

        {props.renderPagination?.()}
      </View>
    );
  });

  return {
    __esModule: true,
    default: MockSlider,
    __goToSlideMock: goToSlideMock,
  };
});

describe("OnboardingScreen", () => {
  const sliderModule = require("react-native-app-intro-slider");

  beforeEach(() => {
    sliderModule.__goToSlideMock.mockClear();
  });

  it("renders the first onboarding slide and skip action", () => {
    const onDone = jest.fn();
    const { getByText } = render(<OnboardingScreen onDone={onDone} />);

    expect(getByText("Chào mừng đến với UniBite")).toBeTruthy();
    expect(getByText("Skip")).toBeTruthy();
    expect(getByText("arrow-forward")).toBeTruthy();
  });

  it("calls onDone when pressing Skip", () => {
    const onDone = jest.fn();
    const { getByText } = render(<OnboardingScreen onDone={onDone} />);

    fireEvent.press(getByText("Skip"));

    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("goes to next slide when pressing next on non-last slide", () => {
    const onDone = jest.fn();
    const { getByText, getByTestId } = render(
      <OnboardingScreen onDone={onDone} />,
    );

    fireEvent.press(getByTestId("set-index-0"));
    fireEvent.press(getByText("arrow-forward"));

    expect(sliderModule.__goToSlideMock).toHaveBeenCalledWith(1, true);
    expect(onDone).not.toHaveBeenCalled();
  });

  it("calls onDone when pressing action button on last slide", () => {
    const onDone = jest.fn();
    const { getByText, getByTestId } = render(
      <OnboardingScreen onDone={onDone} />,
    );

    fireEvent.press(getByTestId("set-index-last"));
    fireEvent.press(getByText("checkmark"));

    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
