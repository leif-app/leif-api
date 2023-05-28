
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

export const convertEntsoePSRTypeToFuel = (psrType: string) => {
  switch (psrType) {
    case 'B01':
      return 'biomass';
    case 'B02':
    case 'B03':
    case 'B06':
      return 'coal';
    case 'B04':
    case 'B05':
      return 'gas_open_cycle';
    case 'B07':
      return 'oil';
    case 'B08':
      return 'coal';
    case 'B09':
      return 'geothermal';
    case 'B10':
      return 'pumped_storage';
    case 'B11':
    case 'B12':
    case 'B13':
      return 'hydro';
    case 'B14':
      return 'nuclear';
    case 'B15':
      return 'other_renewable';
    case 'B16':
      return 'solar';
    case 'B18':
    case 'B19':
      return 'wind';
    case 'B20':
      return 'other';
    default: 
      return null;
  }
}