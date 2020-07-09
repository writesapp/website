import { useEffect } from "react";

export const useMountEffect = (fn) => useEffect(fn, []);
