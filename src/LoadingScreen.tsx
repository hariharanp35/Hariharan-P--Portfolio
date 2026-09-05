import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Bot, BrainCircuit, Cpu, Sparkles } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const loadingMessages = [
    "Loading AI & Data Science portfolio",
    "Connecting data, models, and interfaces",
    "Turning insight into useful systems",
    "Ready to explore the work",
  ];

  useEffect(() => {
    const completionTimer = window.setTimeout(onComplete, 3000);
    return () => window.clearTimeout(completionTimer);
  }, []);

  // Animate progress counter
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return Math.min(prev + 2.5 + Math.random() * 1.5, 99);
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const messageTimer = window.setInterval(() => {
      setMessageIndex((current) =>
        Math.min(current + 1, loadingMessages.length - 1),
      );
    }, 850);

    return () => window.clearInterval(messageTimer);
  }, [loadingMessages.length]);

  const aiSymbols = [
    { Icon: Bot, className: "ai-symbol-one", delay: 0 },
    { Icon: Cpu, className: "ai-symbol-two", delay: 0.35 },
    { Icon: Sparkles, className: "ai-symbol-three", delay: 0.7 },
  ];

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Animated background gradient effect */}
      <motion.div
        className="loading-bg-gradient"
        aria-hidden="true"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* AI symbols create a lighter visual system than a boxed loader. */}
      <div className="loading-ai-symbols" aria-hidden="true">
        {aiSymbols.map(({ Icon, className, delay }) => (
          <motion.div
            key={className}
            className={`ai-symbol ${className}`}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 8, 0],
              opacity: [0.35, 0.9, 0.35],
            }}
            transition={{
              duration: 3.2,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={24} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      {/* AI-inspired neural network and data flow */}
      <div className="loading-neural-network" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((node) => (
          <motion.span
            key={node}
            className={`neural-node neural-node-${node + 1}`}
            animate={{
              opacity: [0.25, 0.9, 0.25],
              scale: [0.8, 1.15, 0.8],
              boxShadow: [
                "0 0 0 rgba(197, 243, 106, 0)",
                "0 0 16px rgba(197, 243, 106, 0.65)",
                "0 0 0 rgba(197, 243, 106, 0)",
              ],
            }}
            transition={{
              duration: 2.4,
              delay: node * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <i className="neural-line neural-line-1" />
        <i className="neural-line neural-line-2" />
        <i className="neural-line neural-line-3" />
        <i className="neural-line neural-line-4" />
      </div>

      {/* Animated corner accents */}
      <motion.div
        className="corner-accent corner-top-left"
        aria-hidden="true"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="corner-accent corner-top-right"
        aria-hidden="true"
        animate={{
          opacity: [0.2, 0.35, 0.2],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 5,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="corner-accent corner-bottom-left"
        aria-hidden="true"
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 5.5,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <div className="loading-container">
        {/* Animated circle rings around brand */}
        <motion.div className="loading-rings" aria-hidden="true">
          <motion.div
            className="ring ring-1"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, linear: true }}
          />
          <motion.div
            className="ring ring-2"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, linear: true }}
          />
        </motion.div>

        {/* Animated AI mark with glow */}
        <motion.div
          className="loading-brand"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="loading-ai-mark"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <BrainCircuit size={74} strokeWidth={1.25} />
          </motion.div>
        </motion.div>

        {/* Animated tagline */}
        <motion.div
          className="loading-tagline"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        >
          <motion.span
            animate={{
              color: [
                "rgba(237, 240, 242, 0.6)",
                "rgba(197, 243, 106, 0.8)",
                "rgba(237, 240, 242, 0.6)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            AI & Data Science / Digital Experiences
          </motion.span>
        </motion.div>

        <motion.div
          className="loading-domain"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        >
          <span>HP</span>
          <b>/</b>
          <span>AI&amp;DS</span>
          <b>/</b>
          <span>01</span>
        </motion.div>

        <motion.div
          className="loading-manifesto"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
        >
          <span>Data</span>
          <i />
          <span>Models</span>
          <i />
          <span>Impact</span>
        </motion.div>

        {/* Name reveal */}
        <motion.p
          className="loading-name"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          Hariharan P
        </motion.p>

        {/* Enhanced progress bar with animation */}
        <motion.div className="loading-progress-section">
          <motion.div className="loading-progress-container">
            <motion.div
              className="loading-progress-bar"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1, transformOrigin: "left" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            {/* Progress bar shimmer effect */}
            <motion.div
              className="progress-shimmer"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Progress percentage counter */}
          <motion.div className="loading-progress-text">
            <motion.span
              className="progress-number"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Enhanced animated dots indicator */}
        <motion.div
          className="loading-dots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.span
            className="dot"
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 0px rgba(197, 243, 106, 0)",
                "0 0 12px rgba(197, 243, 106, 0.6)",
                "0 0 0px rgba(197, 243, 106, 0)",
              ],
            }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="dot"
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 0px rgba(197, 243, 106, 0)",
                "0 0 12px rgba(197, 243, 106, 0.6)",
                "0 0 0px rgba(197, 243, 106, 0)",
              ],
            }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="dot"
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 0px rgba(197, 243, 106, 0)",
                "0 0 12px rgba(197, 243, 106, 0.6)",
                "0 0 0px rgba(197, 243, 106, 0)",
              ],
            }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </motion.div>

        {/* Status text */}
        <motion.p
          className="loading-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={loadingMessages[messageIndex]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {loadingMessages[messageIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.p>
      </div>
    </motion.div>
  );
}
