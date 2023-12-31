import { useNavigate } from "react-router-dom";
import Welcome from "./steps/Welcome";
import Features from "./steps/Features";
import SelectProvider from "./steps/SelectProvider";
import { Header } from "../../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [Welcome, Features, SelectProvider];

export default function Onboarding() {
  const navigate = useNavigate();

  // const { pass } = useOnboarding();

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep === steps.length) {
      // pass();
      navigate("/");
    }
  }, [currentStep]);

  return (
    <div className="h-screen w-screen">
      <Header />
      <AnimatePresence>
        {steps.map((Step, idx) =>
          currentStep === idx ? (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full"
            >
              <Step next={() => setCurrentStep((prev) => prev + 1)} />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}
