"use client";

import React from "react";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp decimals={2} decimal="." prefix="$" end={amount} />
      <h1>Add Goodbye to helix</h1>
    </div>

  );
};

export default AnimatedCounter;
