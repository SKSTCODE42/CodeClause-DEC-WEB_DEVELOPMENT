var setTheme = window.localStorage.getItem('theme');
if (setTheme == null) {
    window.localStorage.setItem('theme', 'lightmode.css');
    document.getElementById("myStyleSheet").href = 'lightmode.css';
}
else if (setTheme == 'lightmode.css') {
    window.localStorage.setItem('theme', 'lightmode.css');
    document.getElementById("myStyleSheet").href = 'lightmode.css';
}
else if (setTheme == 'darkmode.css') {
    window.localStorage.setItem('theme', 'darkmode.css');
    document.getElementById("myStyleSheet").href = 'darkmode.css';
}
function change() {
    var setTheme = window.localStorage.getItem('theme');
    if (setTheme == 'darkmode.css') {
        window.localStorage.setItem('theme', 'lightmode.css');
        document.getElementById("myStyleSheet").href = 'lightmode.css';
    }
    else if (setTheme == 'lightmode.css') {
        window.localStorage.setItem('theme', 'darkmode.css');
        document.getElementById("myStyleSheet").href = 'darkmode.css';
    }
}

var Area = [
    "Square Kilometer (km²)",
    "Hectare (ha)",
    "Are (a)",
    "Square Meter (m²)",
    "Square Decimeter (dm²)",
    "Square Centimeter (cm²)",
    "Square Millimeter (mm²)",
    "Acre (acre)",
    "Square Mile (mi²)",
    "Square Yard (yd²)",
    "Square Foot (ft²)",
    "Square Inch (in²)",
];
var AreaFactor = [
    1,
    100,
    10000,
    1000000,
    100000000,
    1e10,
    1e12,
    247.105407,
    0.386102159,
    1195990.05,
    10763910.4,
    1.5500031e9
];

var Length = [
    "Kilometer (km)",
    "Meter (m)",
    "Decimeter (dm)",
    "Centimeter (cm)",
    "Millimeter (mm)",
    "Mile (mi)",
    "Yard (yd)",
    "Foot (ft)",
    "Inch (in)",
    "Light Year (ly)",
];
var LengthFactor = [
    1,
    1000,
    10000,
    100000,
    1000000,
    0.621371192,
    1093.61333,
    3280.8399,
    39370.0787,
    1.05700083e-13
];

var Mass = [
    "Metric Ton (t)",
    "Kilogram (kg)",
    "Gram (gm)",
    "Milligram (mg)",
    "Pound (lbs)",
    "Ounce (oz)",
];
var MassFactor = [
    1,
    1000,
    1000000,
    1e9,
    2204.62262,
    35273.9619
];

var Speed = [
    "Mach (Mach)",
    "Meter Per Second (m/s)",
    "Kilometer Per Hour (kmph)",
    "Kilometer Per Second (km/s)",
    "Knot (knot)",
    "Mile Per Hour (mph)",
    "Foot Per Second (fps)",
    "Inch Per Second (ips)",
];
var SpeedFactor = [
    1,
    340.3,
    1225.08,
    0.3403,
    661.490281,
    761.22942,
    1116.46982,
    13397.6378
];

var Pressure = [
    "Atmosphreic (atm)",
    "Pascal (Pa)",
    "Hectopascal (hPa)",
    "Bar (bar)",
    "Millimeter Of Mercury (mm/Hg)",
    "Pounds Per Square Inch (Psi)",
];
var PressureFactor = [
    1,
    101325,
    1013.25,
    1.01325,
    760.002100178515,
    14.695950008681
];

var Temperature = [
    "Degree Celsius (°C)",
    "Degree Fahrenheit (°F)",
    "Kelvin (K)",
    "Degree Rankine (°Ra)",
];
var TemperatureIncrement = [0, -32, -273.15, -491.67];
var TemperatureFactor = [
    1,
    0.555555555555,
    1,
    0.555555555555
];

var Time = [
    "Year (yr)",
    "Week (wk)",
    "Day (day)",
    "Hour (hr)",
    "Minute (min)",
    "Second (s)",
    "Millisecond (ms)",
];
var TimeFactor = [
    1,
    52.1428571,
    365,
    8760,
    525600,
    31536000,
    3.1536e10
];

var Volume = [
    "Cubic Meter (m³)",
    "Cubic Decimeter (dm³)",
    "Cubic Centimeter (cm³)",
    "Cubic Millimeter (mm³)",
    "Liter (l)",
    "Deciliter (dl)",
    "Centiliter (cl)",
    "Milliliter (ml)",
    "Cubic Foot (ft³)",
    "Cubic Inch (in³)",
    "Cubic Yard (yd³)",
];
var VolumeFactor = [
    1,
    1000,
    1000000,
    1e9,
    1000,
    10000,
    100000,
    1000000,
    35.3146667,
    61023.7441,
    1.30795062
];

var categoriesArr = [
    Area,
    Length,
    Mass,
    Speed,
    Pressure,
    Temperature,
    Time,
    Volume];

var FactorsArr = [
    AreaFactor,
    LengthFactor,
    MassFactor,
    SpeedFactor,
    PressureFactor,
    TemperatureFactor,
    TimeFactor,
    VolumeFactor
];

function displayFromSection() {
    var fromSelectLength = document.getElementById("fromSelect").length;
    if (fromSelectLength > 1) {
        for (var i = fromSelectLength; i > 0; i--) {
            document.getElementById("fromSelect").remove(i);
        }
    }
    categoriesArr[document.getElementById("categories").selectedIndex - 1].forEach(element => {
        document.getElementById("fromSelect").add(new Option(element, element));
    });
    document.getElementById("fromInput").value = '';
    document.getElementById("fromSelect").selectedIndex = "1";
    document.getElementById("from").style.display = 'inherit';
    document.getElementById("to").style.display = 'none';
    document.getElementById("answer").innerHTML = '';
    document.getElementById("answer").style.display = 'none';
}

function displayToSection() {
    if (document.getElementById("answer").style.display == 'none') {
        if (!(document.getElementById("fromInput").value == "" || document.getElementById("fromSelect").selectedIndex == "0")) {
            var toSelectLength = document.getElementById("toSelect").length;
            if (toSelectLength > 1) {
                for (var i = toSelectLength; i > 0; i--) {
                    document.getElementById("toSelect").remove(i);
                }
            }
            categoriesArr[document.getElementById("categories").selectedIndex - 1].forEach(element => {
                document.getElementById("toSelect").add(new Option(element, element));
            });
            document.getElementById("answer").innerHTML = '';
            document.getElementById("to").style.display = 'inherit';
            displayAnswer();
        }
    }
    else {
        displayAnswer();
    }
}

function displayAnswer() {
    if (!(document.getElementById("fromInput").value == "" || document.getElementById("toSelect").selectedIndex == "0")) {
        var answerToPrint = calculate();
        if (categoriesArr[document.getElementById("categories").selectedIndex - 1][document.getElementById("toSelect").selectedIndex - 1] != "Foot (ft)") {
            document.getElementById("answer").innerHTML = document.getElementById("fromInput").value + " " + categoriesArr[document.getElementById("categories").selectedIndex - 1][document.getElementById("fromSelect").selectedIndex - 1] + " is = " + answerToPrint + " " + categoriesArr[document.getElementById("categories").selectedIndex - 1][document.getElementById("toSelect").selectedIndex - 1];
        }
        else {
            document.getElementById("answer").innerHTML = document.getElementById("fromInput").value + " " + categoriesArr[document.getElementById("categories").selectedIndex - 1][document.getElementById("fromSelect").selectedIndex - 1] + " is = " + answerToPrint;
        }
        document.getElementById("answer").style.display = 'inherit';
    }
}

function calculate() {
    var sourceUnit = categoriesArr[document.getElementById("categories").selectedIndex - 1][document.getElementById("fromSelect").selectedIndex - 1];

    var targetUnit = categoriesArr[document.getElementById("categories").selectedIndex - 1][document.getElementById("toSelect").selectedIndex - 1];

    var result = document.getElementById("fromInput").value;

    if (sourceUnit == targetUnit) {
        return result;
    }

    if (categoriesArr[document.getElementById("categories").selectedIndex - 1] == Temperature) {
        result = parseFloat(result) + TemperatureIncrement[document.getElementById("fromSelect").selectedIndex - 1];
    }


    result = result * FactorsArr[document.getElementById("categories").selectedIndex - 1][document.getElementById("toSelect").selectedIndex - 1];

    result = result / FactorsArr[document.getElementById("categories").selectedIndex - 1][document.getElementById("fromSelect").selectedIndex - 1];

    if (categoriesArr[document.getElementById("categories").selectedIndex - 1] == Temperature) {
        result = parseFloat(result) - TemperatureIncrement[document.getElementById("toSelect").selectedIndex - 1];
    }

    if (targetUnit == "Foot (ft)") {
        var str = result + " " + targetUnit + "<br>" + document.getElementById("fromInput").value + " " + sourceUnit + " is = ";

        var intResult = parseInt(result);

        var result = result % intResult;

        result = result * FactorsArr[1][8];

        result = result / FactorsArr[1][7];

        str = str + intResult + " " + targetUnit + " and " + result + " " + "Inch (in)";

        return str;
    }

    return result;
}

window.onresize = function () { changeTextOfCategoriesOptionTag(); };
window.onload = function () { changeTextOfCategoriesOptionTag(); };
function changeTextOfCategoriesOptionTag() {
    if (window.innerHeight < 446 || window.innerWidth < 1009) {
        document.getElementById("changeTextForSmallScreen").textContent = 'Select';
        document.getElementById("fromSelect").firstChild.textContent = 'Select unit';
    }
    else {
        document.getElementById("changeTextForSmallScreen").textContent = 'Choose a measurement category to convert';
        document.getElementById("fromSelect").firstChild.textContent = 'Choose a unit';
    }
}