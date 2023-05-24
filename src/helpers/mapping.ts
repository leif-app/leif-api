// Based on 2022 from https://raw.githubusercontent.com/carbon-intensity/methodology/master/Carbon%20Intensity%20Forecast%20Methodology.pdf.
export const intensityToIndex = (intensity: number) => {
  if (intensity <= 44) {
    return "very low";
  } else if (intensity >= 45 && intensity <= 129) {
    return "low";
  } else if (intensity >= 130 && intensity <= 209) {
    return "moderate";
  } else if (intensity >= 210 && intensity <= 310) {
    return "high";
  }
  return "very high";
};
