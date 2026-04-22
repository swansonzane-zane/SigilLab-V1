"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

import { TransitionOverlay } from "@/components/transition-overlay";

export type TransitionLevel = "instant" | "ritual" | "feedback";

export type TransitionState = {
  active: boolean;
  level: TransitionLevel;
  title: string;
  message?: string;
  autoHideMs?: number;
};

type TransitionContextValue = {
  activeTransition: TransitionState | null;
  startTransition: (state: TransitionState) => void;
  stopTransition: () => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [activeTransition, setActiveTransition] = useState<TransitionState | null>(
    null,
  );
  const timeoutRef = useRef<number | null>(null);
  const lastUrlRef = useRef<string>("");

  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const stopTransition = useCallback(() => {
    clearTimer();
    setActiveTransition(null);
  }, [clearTimer]);

  const startTransition = useCallback(
    (state: TransitionState) => {
      clearTimer();
      setActiveTransition(state);

      if (state.level === "feedback") {
        timeoutRef.current = window.setTimeout(() => {
          setActiveTransition(null);
          timeoutRef.current = null;
        }, state.autoHideMs ?? 2600);
      }
    },
    [clearTimer],
  );

  useEffect(() => {
    const nextUrl = pathname;
    const previousUrl = lastUrlRef.current;
    lastUrlRef.current = nextUrl;

    if (!previousUrl || previousUrl === nextUrl || !activeTransition) {
      return;
    }

    if (activeTransition.level === "feedback") {
      return;
    }

    clearTimer();
    timeoutRef.current = window.setTimeout(() => {
      setActiveTransition(null);
      timeoutRef.current = null;
    }, activeTransition.level === "ritual" ? 520 : 180);
  }, [activeTransition, clearTimer, pathname]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  const value = useMemo(
    () => ({
      activeTransition,
      startTransition,
      stopTransition,
    }),
    [activeTransition, startTransition, stopTransition],
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
      {activeTransition ? (
        <TransitionOverlay
          level={activeTransition.level}
          title={activeTransition.title}
          message={activeTransition.message}
        />
      ) : null}
    </TransitionContext.Provider>
  );
}

export function useTransitionController() {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error("useTransitionController must be used within TransitionProvider");
  }

  return context;
}
