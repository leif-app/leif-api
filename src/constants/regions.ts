const regions = new Map([
    ["gb", [
        {id: 'gb-1', name: 'North Scotland', externalID: '1'},
        {id: 'gb-2', name: 'South Scotland', externalID: '2'},
        {id: 'gb-3', name: 'North West England', externalID: '3'},
        {id: 'gb-4', name: 'North East England', externalID: '4'},
        {id: 'gb-5', name: 'Yorkshire', externalID: '5'},
        {id: 'gb-6', name: 'North Wales', externalID: '6'},
        {id: 'gb-7', name: 'South Wales', externalID: '7'},
        {id: 'gb-8', name: 'West Midlands', externalID: '8'},
        {id: 'gb-9', name: 'East Midlands', externalID: '9'},
        {id: 'gb-10', name: 'East England', externalID: '10'},
        {id: 'gb-11', name: 'South West England', externalID: '11'},
        {id: 'gb-12', name: 'South England', externalID: '12'},
        {id: 'gb-13', name: 'London', externalID: '13'},
        {id: 'gb-14', name: 'South East England', externalID: '14'},
        {id: 'gb-15', name: 'England', externalID: '15'},
        {id: 'gb-16', name: 'Scotland', externalID: '16'},
        {id: 'gb-17', name: 'Wales', externalID: '17'
    }]],
    ["de", [
        {id: "de-germanywest", name: "Frankfurt", externalID: "germanywestcentral"},
        {id: "de-germanynorth", name: "Berlin", externalID: "germanynorth"},
        {id: "de-germany", name: "Germany", externalID: "Germany (DE)"},
    ]],
    ["fr", [
        {id: "fr-francecentral", name: "Paris", externalID: "francecentral"},
        {id: "fr-francesouth", name: "Marseille", externalID: "francesouth"},
    ]],
    ["us", [
        {id: "us-northcentralus", name: "Illinois", externalID: "northcentralus"},
        {id: "us-westus", name: "California", externalID: "westus"},
        {id: "us-westcentralus", name: "Wyoming", externalID: "westcentralus"},
        {id: "us-eastus", name: "Virginia", externalID: "eastus"},
        {id: "us-southcentralus", name: "Texas", externalID: "southcentralus"},
        {id: "us-westus2", name: "Washington", externalID: "westus2"},
        {id: "us-westus3", name: "Arizona", externalID: "westus3"},
        {id: "us-centralus", name: "Iowa", externalID: "centralus"},
    ]],
    ["au", [
        {id: "au-australiacentral", name: "Canberra", externalID: "australiacentral"},
        {id: "au-australiasoutheast", name: "Victoria", externalID: "australiasoutheast"},
        {id: "au-australiaeast", name: "New South Wales", externalID: "australiaeast"},
    ]],
    ["se", [
        {id: "se-swedencentral", name: "Gävle", externalID: "swedencentral"},
    ]],
    ["jp", [
        {id: "jp-japaneast", name: "Tokyo", externalID: "japaneast"},
        {id: "jp-japanwest", name: "Osaka", externalID: "japanwest"},
    ]],
    ["ko", [
        {id: "ko-koreacentral", name: "Seoul", externalID: "koreacentral"},
        {id: "ko-koreasouth", name: "Busan", externalID: "koreasouth"},
    ]],
    ["ca", [
        {id: "ca-canadacentral", name: "Toronto", externalID: "canadacentral"},
        {id: "ca-canadaeast", name: "Quebec", externalID: "canadaeast"},
    ]],
    ["ch", [
        {id: "ch-switzerlandnorth", name: "Zürich", externalID: "switzerlandnorth"},
        {id: "ch-switzerlandwest", name: "West", externalID: "switzerlandwest"},
    ]],
    ["no", [
        {id: "no-norwayeast", name: "Oslo", externalID: "norwayeast"},
        {id: "no-norwaywest", name: "West", externalID: "norwaywest"},
    ]],
    ["br", [
        {id: "br-brazilsoutheast", name: "Rio", externalID: "brazilsoutheast"},
        {id: "br-brazilsouth", name: "São Paulo", externalID: "brazilsouth"},
    ]],
    ["sg", [
        {id: "sg-southeastasia", name: "Singapore", externalID: "southeastasia"},
    ]],
    ["ie", [
        {id: "ie-northeurope", name: "Dublin", externalID: "northeurope"},
    ]],
    ["za", [
        {id: "za-southafricanorth", name: "Johannesburg", externalID: "southafricanorth"},
        {id: "za-southafricawest", name: "Cape Town", externalID: "southafricawest"},
    ]],
    ["in", [
        {id: "in-centralindia", name: "Pune", externalID: "centralindia"},
        {id: "in-jioindiawest", name: "Jamnagar", externalID: "jioindiawest"},
        {id: "in-jioindiacentral", name: "Nagpur", externalID: "jioindiacentral"},
        {id: "in-southindia", name: "Chennai", externalID: "southindia"},
        {id: "in-westindia", name: "Mumbai", externalID: "westindia"},
    ]],
    ["ae", [
        {id: "ae-uaenorth", name: "Dubai", externalID: "uaenorth"},
        {id: "ae-uaecentral", name: "Abu Dhabi", externalID: "uaecentral"},
    ]],
    ["nl", [
        {id: "nl-westeurope", name: "North Holland", externalID: "westeurope"},
    ]],
]);

export default regions;