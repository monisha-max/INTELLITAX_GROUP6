// This function calculates the income tax based on an old tax regime for different salary ranges.
function getOldTax(salary) {
    if (salary <= 500000) {
        return 0;
    } else if (salary <= 1000000) {
        return (salary - 500000) * 0.2 + (250000 * 0.05);
    } else {
        return (salary - 1000000) * 0.3 + (500000 * 0.2) + (250000 * 0.05);
    }
}

// This function calculates an additional surcharge based on the salary and the calculated tax.
function getSurcharge(salary, tax) {
    if (salary < 5000000) {
        return 0;
    } else if (salary >= 5000000 && salary < 10000000) {
        return 0.1 * tax;
    } else if (salary >= 10000000 && salary < 20000000) {
        return 0.15 * tax;
    } else if (salary >= 20000000 && salary < 50000000) {
        return 0.25 * tax;
    } else if (salary >= 50000000) {
        return 0.37 * tax;
    }
}

module.exports = { getOldTax, getSurcharge };
