import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import OTPInput from "../components/OTPInput";
import FooterNote from "../components/FooterNote";

const steps = [
  { key: "firstName",  label: "First up, what’s your first name?*",      type: "text",  placeholder: "Type your first name" },
  { key: "middleName", label: "Also your middle name?",                  type: "text",  placeholder: "Type your middle name" },
  { key: "lastName",   label: "And your last name?*",                    type: "text",  placeholder: "Type your last name" },
  { key: "company",    label: "Thanks, {firstName}. What’s the name of the company?*", type: "text",  placeholder: "Type your answer here" },
  { key: "email",      label: "What email address can we reach you at?…*",      type: "email", placeholder: "name@example.com" },
  { key: "emailOtp",   label: "Let’s verify {email} is your mail",        type: "otp" },
  { key: "phone",      label: "Lastly, what’s your phone number?*",      type: "tel",   prefix: "+91", placeholder: "Type your answer here" },
  { key: "phoneOtp",   label: "We know you are Human… enter the OTP sent to {phone}", type: "otp" },
];

export default function SignupFlow() {
  const { step } = useParams();
  const idx = Number(step) - 1;
  const navigate = useNavigate();

  // 1) state per step + touched map
  const [inputs, setInputs] = useState(() =>
    steps.reduce((acc, s) => ({ ...acc, [s.key]: "" }), {})
  );
  const [touched, setTouched] = useState({});

  // redirect if invalid step
  useEffect(() => {
    if (idx < 0 || idx >= steps.length) {
      navigate("/signup/1", { replace: true });
    }
  }, [idx, navigate]);

  if (idx < 0 || idx >= steps.length) return null;
  const config = steps[idx];

  // interpolate label
  let label = config.label
    .replace("{firstName}", inputs.firstName || "there")
    .replace("{email}", inputs.email)
    .replace("{phone}", inputs.phone);

  // current raw value
  const raw = inputs[config.key].trim();

  // 2) validation check
  const isValid = (() => {
    switch (config.type) {
      case "text":
        return raw.length > 0;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);
      case "tel":
        return /^\d{7,}$/.test(raw);
      case "otp":
        return raw.length === 6;
      default:
        return false;
    }
  })();

  // 3) error message if touched & invalid
  let error = "";
  if (touched[config.key]) {
    switch (config.type) {
      case "text":
        if (raw.length === 0) error = "This field is required.";
        break;
      case "email":
        if (raw.length === 0) error = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw))
          error = "Please enter a valid email address.";
        break;
      case "tel":
        if (raw.length === 0) error = "Phone number is required.";
        else if (!/^\d{7,}$/.test(raw))
          error = "Please enter at least 7 digits.";
        break;
      case "otp":
        if (raw.length === 0) error = "OTP is required.";
        else if (raw.length < 6) error = "OTP must be 6 digits.";
        break;
    }
  }

  // 4) advance or finish
  const handleNext = () => {
    // mark touched so error will show if invalid
    setTouched(t => ({ ...t, [config.key]: true }));
    if (!isValid) return;

    if (idx + 1 < steps.length) {
      navigate(`/signup/${idx + 2}`);
    } else {
      navigate("/signup/success");
    }
  };

  // onBlur for fields
  const markTouched = () =>
    setTouched(t => ({ ...t, [config.key]: true }));

  // 5) render
  return (
    <div className="space-y-4   max-w-md w-full ">
      <h2 className="text-xl font-semibold text-gray-800">
        <span className="text-blue-600">{idx + 1}&nbsp;</span>
        {label}
      </h2>

      {/* input or OTP */}
      {config.type !== "otp" ? (
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 w-full">
            {config.prefix && (
              <span className="text-gray-500">{config.prefix}</span>
            )}
            <input
              autoFocus
              type={config.type}
              value={inputs[config.key]}
              onChange={e =>
                setInputs(i => ({
                  ...i,
                  [config.key]: e.target.value,
                }))
              }
              onBlur={markTouched}
              placeholder={config.placeholder}
              className={`
                w-full border-b-2 px-1 py-2 focus:outline-none
                ${error
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-600"}
              `}
            />
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
      ) : (
        <div>
          <OTPInput
            length={6}
            value={inputs[config.key]}
            onChange={fn =>
              setInputs(i => ({
                ...i,
                [config.key]: fn(i[config.key]),
              }))
            }
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
      )}

      {/* Next button */}
      <div className="flex   items-center gap-2">
        <div
          onClick={handleNext}
          className={`
            px-6 py-2 rounded shadow text-white bg-blue-600 hover:bg-blue-700 
            transition
          `}
        >
          OK
        </div>
        <p className="text-sm text-gray-500">Press Enter ↵</p>
      </div>

      <FooterNote onBack={() => navigate(-1)} />
    </div>
  );
}
