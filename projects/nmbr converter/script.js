let typeTo = document.getElementById("typeTo");
let res = document.getElementById("res");
let input = document.getElementById("input");
let inputType = document.getElementById("inputType");
let resultType = document.getElementById("resultType");
let error = document.getElementById("error");

const baseNames = {
  10: "Decimal",
  2: "Binary",
  8: "Octal",
  16: "HexaDecimal",
};

// Smart detect base
function detectBase(value) {
  if (/^0b[01]+$/i.test(value)) return 2;
  if (/^0o[0-7]+$/i.test(value)) return 8;
  if (/^0x[\da-f]+$/i.test(value)) return 16;
  if (/^\d+$/i.test(value)) return 10;
  return null;
}

function update() {
  const val = input.value.trim();
  const toBase = parseInt(typeTo.value);
  const fromBase = detectBase(val);

  inputType.innerText = "Enter a number:";
  resultType.innerText = `Result in ${baseNames[toBase]}:`;

  if (fromBase === null) {
    error.innerText = "Invalid number format. Use 0b, 0o, 0x prefixes or decimal digits.";
    res.value = "";
    return;
  }

  try {
    const parsed = parseInt(val, fromBase);
    if (isNaN(parsed)) throw "Invalid";
    res.value = parsed.toString(toBase).toUpperCase();
    error.innerText = "";
  } catch (e) {
    res.value = "";
    error.innerText = "Conversion error. Please check your input.";
  }
}
