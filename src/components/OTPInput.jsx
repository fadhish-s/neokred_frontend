import { useRef } from "react";

export default function OTPInput({ length = 6, value = "", onChange }) {
  const inputs = useRef([]);

  const handleKey = (e, idx) => {
    if (/^[0-9]$/.test(e.key)) {
      const next = idx + 1;
      if (next < length) inputs.current[next].focus();
    }
    if (e.key === "Backspace" && !e.target.value && idx > 0) {
      inputs.current[idx - 1].focus();
    }
  };

  return (
    <div className="flex space-x-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => (inputs.current[i] = el)}
          value={value[i] || ""}
          onChange={e => onChange(value => {
            const v = value.split("");
            v[i] = e.target.value.slice(-1);
            return v.join("").slice(0, length);
          })}
          onKeyDown={e => handleKey(e, i)}
          maxLength={1}
          className="w-12 h-12 text-center border-2 border-green-300 rounded-md focus:border-blue-500 focus:outline-none text-lg"
        />
      ))}
    </div>
  );
}
