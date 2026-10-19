
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

const TOTAL_NOTES = 18;
const EDGE_THRESHOLD = 8;
const WHEEL_THRESHOLD = 40;

export function useNotesScrollNavigation(noteNumber: number) {
    const navigate = useNavigate();
    const location = useLocation();

    const accumulatedDelta = useRef(0);
    const locked = useRef(false);
    const cooldownRef = useRef(false);
    const cooldownTimerRef = useRef<number | null>(null);

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    accumulatedDelta.current = 0;
    locked.current = false;
    }, [location.pathname]);

    useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
        if (locked.current || cooldownRef.current) 
        return;

        if (event.ctrlKey) 
        return;

        const scrollingDown = event.deltaY > 0;
        const scrollingUp = event.deltaY < 0;

        const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - EDGE_THRESHOLD;

        const atTop = window.scrollY <= EDGE_THRESHOLD;

        const canGoNext = noteNumber < TOTAL_NOTES;
        const canGoPrevious = noteNumber > 1;

        const shouldNavigate =
        (scrollingDown && atBottom && canGoNext) ||
        (scrollingUp && atTop && canGoPrevious);

        if (!shouldNavigate) {
        accumulatedDelta.current = 0;
            return;
        }

        accumulatedDelta.current += event.deltaY;

        if (Math.abs(accumulatedDelta.current) < WHEEL_THRESHOLD) {
            return;
        }

        const nextNote = scrollingDown
        ? noteNumber + 1
        : noteNumber - 1;

        locked.current = true;
        cooldownRef.current = true;
        accumulatedDelta.current = 0;

        if (cooldownTimerRef.current !== null) {
        window.clearTimeout(cooldownTimerRef.current);
        }

        cooldownTimerRef.current = window.setTimeout(() => {
        cooldownRef.current = false;
        cooldownTimerRef.current = null;
        }, 800);

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

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
        window.removeEventListener("wheel", handleWheel);

        if (cooldownTimerRef.current !== null) {
            window.clearTimeout(cooldownTimerRef.current);
        }
    };
    }, [navigate, noteNumber]);

    return null;
}
