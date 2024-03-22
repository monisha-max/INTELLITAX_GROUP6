// userTaxDetails.js
const mongoose = require('mongoose');

const userTaxDetailsSchema = new mongoose.Schema({
    year: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    grossSalary: Number,
    baseSalary: Number,
    hraReceived: Number,
    rentPaid: Number,
    dearAllowance: Number,
    ltaReceived: Number,
    investment80c: Number,
    section80TTA: Number,
    section80D: Number,
    section80G: Number,
    section24: Number,
    section80CCD1B: Number,
    section80CCD2: Number,
    section80E: Number,
    taxableSalary: Number,
    calculatedTaxOld: Number,
    surcharge: Number,
    finalTax: Number
});

module.exports = mongoose.model('UserTaxDetails', userTaxDetailsSchema);
