// https://raw.githubusercontent.com/carbon-intensity/methodology/master/Carbon%20Intensity%20Forecast%20Methodology.pdf
const fuelIntensities = new Map([
    // name, gCO2/kWh
    ["biomass", 120],
    ["coal", 937],
    ["gas_combined_cycle", 394],
    ["gas_open_cycle", 651],
    ["geothermal", 0],
    ["hydro", 0],
    ["nuclear", 0],
    ["oil", 935],
    ["other", 300],
    ["other_other", 0],
    ["other_renewable", 0],
    ["pumped_storage", 0],
    ["solar", 0],
    ["wind", 0],
]);

export default fuelIntensities;