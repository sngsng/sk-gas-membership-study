/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import cls from "../../util";

interface TimerProps {
  className?: string;
  setIsButton: React.Dispatch<React.SetStateAction<boolean>>;
  isTimer: boolean;
}

function Timer({ className = "", setIsButton, isTimer }: TimerProps) {
  const [min, setMin] = useState<number>(3);
  const [sec, setSec] = useState<number>(0);
  const time = useRef(0);
  const timerId = useRef<any>(null);

  useEffect(() => {
    time.current = 180;
  }, [isTimer]);

  useEffect(() => {
    timerId.current = setInterval(() => {
      time.current -= 1;
      setMin(parseInt(String(time.current / 60), 10));
      setSec(time.current % 60);
    }, 1000);

    return () => clearInterval(timerId.current);
  }, [isTimer]);

  useEffect(() => {
    if (time.current <= 0) {
      console.log('----------------"타임아웃"----------------');
      console.log("타임아웃");
      clearInterval(timerId.current);
      setIsButton(true);
    }
  }, [sec]);

  return (
    <p className={cls("absolute top-52 right-20 text-b1", className)}>
      {`0${min}`}:{sec < 10 ? `0${sec}` : sec}
    </p>
  );
}

export default Timer;
