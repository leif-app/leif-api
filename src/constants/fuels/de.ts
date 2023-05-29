// https://raw.githubusercontent.com/carbon-intensity/methodology/master/Carbon%20Intensity%20Forecast%20Methodology.pdf
const fuelIntensities = new Map([
    // name, gCO2/kWh
    ["biomass", 0],
    ["coal", 1073.03112],
    ["gas_combined_cycle", 472.8075167],
    ["gas_open_cycle", 472.8075167],
    ["geothermal", 0],
    ["hydro", 10.7],
    ["nuclear", 5.13],
    ["oil", 1124.903938],
    ["other", 300],
    ["other_other", 0],
    ["other_renewable", 0],
    ["pumped_storage", 419.4076679907016],
    ["solar", 35.11666667],
    ["wind", 12.62],
]);

export default fuelIntensities;