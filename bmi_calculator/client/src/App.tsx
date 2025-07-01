import React, { useState } from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Header from "./components/Header";
import BMIForm from "./components/BMIForm";
import BMIResult from "./components/BMIResult";
import BMIHistory from "./components/BMIHistory";
import "./App.css";
import type { BMIResultTypes } from "./types";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key");
}

const BMIApp: React.FC = () => {
  const [currentResult, setCurrentResult] = useState<BMIResultTypes | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"calculator" | "history">(
    "calculator"
  );

  const handleBMIResult = (result: BMIResultTypes) => {
    setCurrentResult(result);
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "calculator" ? "active" : ""}`}
            onClick={() => setActiveTab("calculator")}
          >
            Calculator
          </button>
          <button
            className={`tab ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </div>

        {activeTab === "calculator" ? (
          <div className="calculator-section">
            <div className="calculator-container">
              <BMIForm onResult={handleBMIResult} />
              {currentResult && <BMIResult result={currentResult} />}
            </div>
          </div>
        ) : (
          <div className="history-section">
            <BMIHistory />
          </div>
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <BMIApp />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;
