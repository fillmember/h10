import { useCallback } from "react";

export function useMergedRef(...refs) {
  return useCallback(function (element) {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(element);
      else if (ref != null) ref.current = element;
    });
  }, refs);
}
