export const LOW_CONFIDENCE_THRESHOLD = 70;

export const isLowConfidenceScore = (score: number) => {
  return score < LOW_CONFIDENCE_THRESHOLD;
};

export const getConfidenceCircleColor = (score: number) => {
  return isLowConfidenceScore(score) ? "text-red-500" : "text-amber-500";
};

export const calculateCircleProgress = (score: number, radius: number) => {
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;

  return {
    circumference,
    progressOffset,
  };
};
