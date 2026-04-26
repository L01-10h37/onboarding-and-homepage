// import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";

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
  let attachRef = true;

  const MockSlider = ReactLib.forwardRef((props: any, ref: any) => {
    if (attachRef) {
      ReactLib.useImperativeHandle(ref, () => ({
        goToSlide: goToSlideMock,
      }));
    }

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

        <TouchableOpacity
          testID="set-index-1"
          onPress={() => props.onSlideChange?.(1)}
        >
          <Text>Set index 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          testID="trigger-slider-done"
          onPress={() => props.onDone?.()}
        >
          <Text>Trigger slider done</Text>
        </TouchableOpacity>

        {props.renderPagination?.()}
      </View>
    );
  });

  return {
    __esModule: true,
    default: MockSlider,
    __goToSlideMock: goToSlideMock,
    __setAttachRef: (value: boolean) => {
      attachRef = value;
    },
  };
});

describe("OnboardingScreen", () => {
  const sliderModule = require("react-native-app-intro-slider");

  beforeEach(() => {
    sliderModule.__setAttachRef(true);
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

  it("goes to the correct next slide from a middle index", () => {
    const onDone = jest.fn();
    const { getByText, getByTestId } = render(
      <OnboardingScreen onDone={onDone} />,
    );

    fireEvent.press(getByTestId("set-index-1"));
    expect(getByText("arrow-forward")).toBeTruthy();
    fireEvent.press(getByText("arrow-forward"));

    expect(sliderModule.__goToSlideMock).toHaveBeenCalledWith(2, true);
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

  it("calls onDone from AppIntroSlider onDone prop", () => {
    const onDone = jest.fn();
    const { getByTestId } = render(<OnboardingScreen onDone={onDone} />);

    fireEvent.press(getByTestId("trigger-slider-done"));

    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it("does not crash when ref is unavailable on non-last slide", () => {
    sliderModule.__setAttachRef(false);
    const onDone = jest.fn();
    const { getByText, getByTestId } = render(
      <OnboardingScreen onDone={onDone} />,
    );

    fireEvent.press(getByTestId("set-index-0"));
    expect(() => fireEvent.press(getByText("arrow-forward"))).not.toThrow();

    expect(sliderModule.__goToSlideMock).not.toHaveBeenCalled();
    expect(onDone).not.toHaveBeenCalled();
  });
});
