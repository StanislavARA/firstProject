import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="YoYo" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("YoYo");
  });
});
describe("ProfileStatus component", () => {
  test("проверка на наличие span", () => {
    const component = create(<ProfileStatus status="YoYo" />);
    const root = component.root;
    let span = root.findByType("span")
    expect(span).not.toBeNull();
  });
});
describe("ProfileStatus component", () => {
  test("status from pros should be in the state", () => {
    const component = create(<ProfileStatus status="YoYo" />);
    const root = component.root;
    let span = root.findByType("span")
    expect(span.children[0]).toBe("YoYo");
  });
});

describe("ProfileStatus component", () => {
  test("проверка на на отсутствие инпута", () => {
    const component = create(<ProfileStatus status="YoYo" />);
    const root = component.root;
    expect(() => {
      let input = root.findByType("input")
    }).toThrow();
  });
});

describe("ProfileStatus component", () => {
  test("проверка на наличие span", () => {
    const component = create(<ProfileStatus status="YoYo" />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onDoubleClick();
    let input = root.findByType("input")

    expect(input.props.value).toBe("YoYo");
  });
});

describe("ProfileStatus component", () => {
  test("должен вызватьс колбэк", () => {
    const mockCallBack = jest.fn();
    const component = create(<ProfileStatus status="YoYo"
      updateStatus={mockCallBack} />);
    const instance = component.getInstance();
    instance.deactivateEditMode()


    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});