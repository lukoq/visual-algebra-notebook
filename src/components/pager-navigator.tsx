import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type TouchEvent,
} from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react";

import { cn } from "@/lib/utils";

type PagerNavigatorProps = {
  totalPages: number;
  activePage: number;
  onSelect: (page: number) => void;
};

const WINDOW_SIZE = 6;
const RESTING_SIZE = 3;
const SWIPE_THRESHOLD = 36;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getWindowState(totalPages: number, activePage: number) {
  const total = Number.isFinite(totalPages) ? Math.max(1, Math.floor(totalPages)) : 1;
  const active = Number.isFinite(activePage) ? clamp(Math.floor(activePage), 1, total) : 1;
  const windowSize = Math.min(WINDOW_SIZE, total);
  const restingSize = Math.min(RESTING_SIZE, windowSize);
  const maxStart = total - windowSize;
  const activeIndex = active - 1;
  const start = clamp(activeIndex, 0, maxStart);
  const restingStart = clamp(activeIndex, start, start + windowSize - restingSize);

  return { total, active, start, restingStart };
}

export function PagerNavigator({ totalPages, activePage, onSelect }: PagerNavigatorProps) {
  const { total, active, start, restingStart } = getWindowState(totalPages, activePage);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [toggled, setToggled] = useState(false);
  const expanded = hovered || focused || toggled;
  const offset = expanded ? start : restingStart;
  const touchStartX = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const suppressionTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (suppressionTimer.current !== undefined) {
        clearTimeout(suppressionTimer.current);
      }
    };
  }, []);

  const selectPage = useCallback(
    (page: number) => {
      onSelect(clamp(page, 1, total));
    },
    [onSelect, total],
  );

  const handleClick = (page: number) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }

    selectPage(page);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") {
      setHovered(true);
    }
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") {
      setHovered(false);
    }
  };

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) {
      setFocused(true);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setFocused(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectPage(active - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      selectPage(active + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectPage(1);
    } else if (event.key === "End") {
      event.preventDefault();
      selectPage(total);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    suppressClick.current = false;
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null) return;

    const endX = event.changedTouches[0]?.clientX ?? startX;
    const deltaX = endX - startX;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    suppressClick.current = true;
    if (suppressionTimer.current !== undefined) {
      clearTimeout(suppressionTimer.current);
    }
    suppressionTimer.current = setTimeout(() => {
      suppressClick.current = false;
      suppressionTimer.current = undefined;
    }, 350);

    selectPage(active + (deltaX < 0 ? 1 : -1));
  };

  return (
    <nav
      aria-label="Book pages"
      className="pager-navigator"
      data-expanded={expanded}
      style={{ "--pager-offset": offset } as CSSProperties}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        className="pager-navigator__arrow"
        aria-label="Previous page"
        disabled={active === 1}
        onClick={() => handleClick(active - 1)}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>

      <div className="pager-navigator__viewport">
        <div className="pager-navigator__track">
          {Array.from({ length: total }, (_, index) => {
            const page = index + 1;
            const isActive = page === active;

            return (
              <div className="pager-navigator__slot" key={page}>
                <button
                  type="button"
                  aria-label={`Page ${page}`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "pager-navigator__page",
                    isActive && "pager-navigator__page--active",
                  )}
                  onClick={() => handleClick(page)}
                >
                  {page}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="pager-navigator__expand"
        aria-label={expanded ? "Collapse page navigator" : "Expand page navigator"}
        aria-expanded={expanded}
        onClick={() => setToggled((value) => !value)}
      >
        {expanded ? (
          <Minimize2 className="size-3.5" aria-hidden="true" />
        ) : (
          <Maximize2 className="size-3.5" aria-hidden="true" />
        )}
      </button>

      <button
        type="button"
        className="pager-navigator__arrow"
        aria-label="Next page"
        disabled={active === total}
        onClick={() => handleClick(active + 1)}
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
