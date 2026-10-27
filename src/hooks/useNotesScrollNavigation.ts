
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

const TOTAL_NOTES = 18;
const EDGE_THRESHOLD = 8;
const WHEEL_THRESHOLD = 180;
const GESTURE_END_DELAY = 350;
const EDGE_DWELL_MS = 250;

let navigationLocked = false;
let unlockTimer: ReturnType<typeof setTimeout> | undefined;

function lockNavigation() {
  navigationLocked = true;

  if (unlockTimer !== undefined) {
    clearTimeout(unlockTimer);
  }

  unlockTimer = setTimeout(() => {
    navigationLocked = false;
    unlockTimer = undefined;
  }, GESTURE_END_DELAY);
}

export function useNotesScrollNavigation(noteNumber: number) {
  const navigate = useNavigate();
  const location = useLocation();

  const accumulatedDelta = useRef(0);
  const edgeStartTime = useRef<number | null>(null);
  const edgeDirection = useRef<"up" | "down" | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    accumulatedDelta.current = 0;
  }, [location.pathname]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // Podczas tego samego gestu nie przechodź
      // do kolejnej notatki.
      if (navigationLocked) {
        lockNavigation();
        return;
      }

      if (event.ctrlKey || event.deltaY === 0) return;

      const scrollingDown = event.deltaY > 0;
      const scrollingUp = event.deltaY < 0;

      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - EDGE_THRESHOLD;

      const atTop = window.scrollY <= EDGE_THRESHOLD;

      const shouldNavigate =
        (scrollingDown &&
          atBottom &&
          noteNumber < TOTAL_NOTES) ||
        (scrollingUp && atTop && noteNumber > 1);

      if (!shouldNavigate) {
        accumulatedDelta.current = 0;
        edgeStartTime.current = null;
        edgeDirection.current = null;
        return;
      }

      const direction = scrollingDown ? "down" : "up";

      if (edgeDirection.current !== direction) {
        accumulatedDelta.current = 0;
        edgeStartTime.current = Date.now();
        edgeDirection.current = direction;
      }

      accumulatedDelta.current += Math.abs(event.deltaY);

      const edgeDuration =
        Date.now() - (edgeStartTime.current ?? Date.now());

        
      if(accumulatedDelta.current < WHEEL_THRESHOLD || edgeDuration < EDGE_DWELL_MS){
        return;
      }

      const nextNote = scrollingDown
        ? noteNumber + 1
        : noteNumber - 1;

      accumulatedDelta.current = 0;
      edgeStartTime.current = null;
      edgeDirection.current = null;



      void navigate({
        to: `/notes-${nextNote}` as
          | "/notes-1"
          | "/notes-2"
          | "/notes-3"
          | "/notes-4"
          | "/notes-5"
          | "/notes-6"
          | "/notes-7"
          | "/notes-8"
          | "/notes-9"
          | "/notes-10"
          | "/notes-11"
          | "/notes-12"
          | "/notes-13"
          | "/notes-14"
          | "/notes-15"
          | "/notes-16"
          | "/notes-17"
          | "/notes-18",
      });
    };

    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [navigate, noteNumber]);

  return null;
}
