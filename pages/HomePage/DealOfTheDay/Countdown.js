// components/CountdownTimer.js
import { useState, useEffect } from 'react';

const Countdown = () => { // This counts down every 24 hours, it is used for deal of the day as they are daily deals
  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const difference = endOfDay - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <>
      <span className="counterDeal"> {timeLeft.hours || '0'} </span>:
      <span className="counterDeal"> {timeLeft.minutes || '0'} </span>:
      <span className="counterDeal"> {timeLeft.seconds || '0'} </span>
    </>

  );
};

export default Countdown;
