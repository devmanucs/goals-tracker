import { act, renderHook } from "@testing-library/react"

import { useDebounce } from "@/hooks/use-debounce"

describe("useDebounce", () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it("devolve o valor inicial de imediato", () => {
    const { result } = renderHook(() => useDebounce("duna"))
    expect(result.current).toBe("duna")
  })

  it("segura o valor novo até o atraso passar", () => {
    const { result, rerender } = renderHook(({ valor }) => useDebounce(valor, 350), {
      initialProps: { valor: "d" },
    })

    rerender({ valor: "duna" })
    expect(result.current).toBe("d")

    act(() => void jest.advanceTimersByTime(349))
    expect(result.current).toBe("d")

    act(() => void jest.advanceTimersByTime(1))
    expect(result.current).toBe("duna")
  })

  it("só propaga o último valor de uma digitação rápida", () => {
    // É o ponto do debounce: digitar "duna" não pode virar quatro requisições.
    const { result, rerender } = renderHook(({ valor }) => useDebounce(valor, 350), {
      initialProps: { valor: "" },
    })

    for (const valor of ["d", "du", "dun", "duna"]) {
      rerender({ valor })
      act(() => void jest.advanceTimersByTime(100))
    }

    expect(result.current).toBe("")

    act(() => void jest.advanceTimersByTime(350))
    expect(result.current).toBe("duna")
  })

  it("respeita um atraso customizado", () => {
    const { result, rerender } = renderHook(({ valor }) => useDebounce(valor, 1000), {
      initialProps: { valor: "a" },
    })

    rerender({ valor: "b" })
    act(() => void jest.advanceTimersByTime(500))
    expect(result.current).toBe("a")

    act(() => void jest.advanceTimersByTime(500))
    expect(result.current).toBe("b")
  })

  it("funciona com tipos que não são string", () => {
    const { result, rerender } = renderHook(({ valor }) => useDebounce(valor, 100), {
      initialProps: { valor: 1 },
    })

    rerender({ valor: 2 })
    act(() => void jest.advanceTimersByTime(100))
    expect(result.current).toBe(2)
  })
})
