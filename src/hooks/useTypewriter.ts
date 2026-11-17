import { useEffect, useRef, useState } from 'react';

/**
 * Reveals text one character at a time. `speed` is 0–100; higher is faster.
 * `skip()` reveals everything at once.
 */
export function useTypewriter(text: string, speed: number) {
  const [count, setCount] = useState(0);
  const timer = useRef<number | null>(null);
  const textRef = useRef(text);
  const speedRef = useRef(speed);
  textRef.current = text;
  speedRef.current = speed;

  useEffect(() => {
    setCount(0);
    if (timer.current) window.clearTimeout(timer.current);
    const interval = Math.max(6, 34 - (speed / 100) * 28);
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      setCount((prev) => {
        if (prev >= textRef.current.length) return prev;
        const chunk = speedRef.current > 75 ? 2 : 1;
        return Math.min(textRef.current.length, prev + chunk);
      });
      timer.current = window.setTimeout(tick, interval);
    };

    timer.current = window.setTimeout(tick, 90);
    return () => {
      cancelled = true;
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [text, speed]);

  const done = count >= text.length;

  const skip = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setCount(text.length);
  };

  return { display: text.slice(0, count), done, skip };
}
