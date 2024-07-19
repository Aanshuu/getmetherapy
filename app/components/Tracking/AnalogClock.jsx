import { useState, useEffect } from "react";

export default function AnalogClock({ speed }) {
  const [time, setTime] = useState(getISTTime());

  function getISTTime() {
    const now = new Date();
    const utcOffset = now.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const istOffset = 5.5 * 60 * 60000; // IST offset in milliseconds (5 hours and 30 minutes)
    return new Date(now.getTime() + utcOffset + istOffset);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => new Date(prevTime.getTime() + 1000 * speed));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [speed]);

  const getRotationDegrees = (time) => {
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();
    return {
      secondHand: seconds * 6 * (- 1),
      minuteHand: (minutes * 6 + seconds * 0.1) * (- 1),
      hourHand: (hours * 30 + minutes * 0.5) * (- 1),
    };
  };

  const { secondHand, minuteHand, hourHand } = getRotationDegrees(time);

  return (
    <div className="clock">
      <div className="dot" />
      <div className="hour twelve">12</div>
      <div className="hour one">1</div>
      <div className="hour two">2</div>
      <div className="hour three">3</div>
      <div className="hour four">4</div>
      <div className="hour five">5</div>
      <div className="hour six">6</div>
      <div className="hour seven">7</div>
      <div className="hour eight">8</div>
      <div className="hour nine">9</div>
      <div className="hour ten">10</div>
      <div className="hour eleven">11</div>
      <div
        className="hour-hand"
        style={{ transform: `rotate(${hourHand}deg)` }}
      />
      <div
        className="minute-hand"
        style={{ transform: `rotate(${minuteHand}deg)` }}
      />
      <div
        className="second-hand"
        style={{ transform: `rotate(${secondHand}deg)` }}
      />
    </div>
  );
}
