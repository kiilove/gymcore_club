// useFilterClasses.js
import { useMemo } from "react";

export const useFilterClasses = (originalClasses, filterState) => {
  return useMemo(() => {
    let filtered = originalClasses;
    const {
      activeChargeType,
      activeTitleFilter,
      appliedSearchText,
      nestedSearch,
    } = filterState;
    if (activeChargeType.length > 0) {
      filtered = filtered.filter((item) =>
        activeChargeType.includes(item.chargeType)
      );
    }
    if (activeTitleFilter.length > 0) {
      filtered = filtered.filter((item) =>
        activeTitleFilter.some((f) => item.title.includes(f))
      );
    }
    if (appliedSearchText) {
      filtered = nestedSearch
        ? filtered.filter(
            (item) =>
              item.title.includes(appliedSearchText) ||
              item.description.includes(appliedSearchText)
          )
        : originalClasses.filter(
            (item) =>
              item.title.includes(appliedSearchText) ||
              item.description.includes(appliedSearchText)
          );
    }
    return filtered;
  }, [originalClasses, filterState]);
};
