import { renderHook, act } from "@testing-library/react";

import { describe, expect, it } from "vitest";
import useArray from "../hooks/useArray";

type TestObject = { id: number; name: string; active: boolean };

describe("useArray hook", () => {
  const initialArray: TestObject[] = [
    { id: 1, name: "One", active: true },
    { id: 2, name: "Two", active: false },
  ];

  it("initializes with default array", () => {
    const { result } = renderHook(() => useArray<TestObject>(initialArray));
    expect(result.current.array).toEqual(initialArray);
  });

  it("push adds element to array", () => {
    const { result } = renderHook(() => useArray<TestObject>([]));
    act(() => {
      result.current.push({ id: 3, name: "Three", active: true });
    });
    expect(result.current.array).toHaveLength(1);
    expect(result.current.array[0].name).toBe("Three");
  });

  it("update replaces element at given index", () => {
    const { result } = renderHook(() => useArray<TestObject>(initialArray));
    act(() => {
      result.current.update({ id: 99, name: "Updated", active: false }, 1);
    });
    expect(result.current.array[1].id).toBe(99);
    expect(result.current.array[1].name).toBe("Updated");
  });

  it("includes returns true if value present", () => {
    const { result } = renderHook(() => useArray<number>([1, 2, 3]));
    expect(result.current.includes(2)).toBe(true);
    expect(result.current.includes(4)).toBe(false);
  });

  it("removeValueByIndex removes element by index", () => {
    const { result } = renderHook(() => useArray<TestObject>(initialArray));
    act(() => {
      result.current.removeValueByIndex(0);
    });
    expect(result.current.array).toHaveLength(1);
    expect(result.current.array[0].id).toBe(2);
  });

  it("updateObjectByKey updates object fields by key match", () => {
    const { result } = renderHook(() => useArray<TestObject>(initialArray));
    act(() => {
      result.current.updateObjectByKey("id", 1, [{ field: "name", fieldValue: "New Name" }]);
    });
    expect(result.current.array[0].name).toBe("New Name");
  });

  it("removeByKey removes object by key match", () => {
    const { result } = renderHook(() => useArray<TestObject>(initialArray));
    act(() => {
      result.current.removeByKey("id", 2);
    });
    expect(result.current.array).toHaveLength(1);
    expect(result.current.array[0].id).toBe(1);
  });

  it("findIndexByKey returns correct index", () => {
    const { result } = renderHook(() => useArray<TestObject>(initialArray));
    expect(result.current.findIndexByKey("id", 2)).toBe(1);
    expect(result.current.findIndexByKey("id", 99)).toBe(-1);
  });

  it("updateObjectByIndex updates object fields at index", () => {
    const { result } = renderHook(() => useArray<TestObject>(initialArray));
    act(() => {
      result.current.updateObjectByIndex(0, [{ field: "active", fieldValue: false }]);
    });
    expect(result.current.array[0].active).toBe(false);
  });

  it("replaceObjectByIndex replaces entire object at index", () => {
    const { result } = renderHook(() => useArray<TestObject>(initialArray));
    const newObject = { id: 5, name: "Five", active: true };
    act(() => {
      result.current.replaceObjectByIndex(1, newObject);
    });
    expect(result.current.array[1]).toEqual(newObject);
  });
});
