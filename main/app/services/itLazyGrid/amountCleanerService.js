'use strict';
/**
 * Service that provide RSQL query
 */
IteSoft.factory('itAmountCleanerService', [function () {

        var supportedLocales = ['en_US',
            'en_GB', 'fr_FR', 'de_DE', 'id_IT'];

        return {
            cleanAmount: function (amountString, aLocale) {
                var result = 0;


                //Recherche si la locale passée en argument est acceptée
                var localeFound = false;
                supportedLocales.forEach(function (entry) {

                    if (JSON.stringify(entry) == JSON.stringify(aLocale)) {
                        localeFound = true;
                    }
                })

                if (localeFound == false) {
                    console.log("Unable to format amount for local "
                        + aLocale);

                    return '';
                }

                //Suppression des " " pour séparer les milliers et des caractères non numériques
                amountString = amountString.replace(/[^0-9,.]/g, "");

                // SI on est en France ou Italie, on peut taper . ou , pour les décimales
                if (JSON.stringify(aLocale) == JSON.stringify(supportedLocales[2]) || JSON.stringify(aLocale) == JSON.stringify(supportedLocales[4])) {
                    amountString = amountString.replace(",", ".");
                }

                //Formattage des montants avec la locale
                result = new Intl.NumberFormat(aLocale.replace("_", "-")).v8Parse(amountString)

                console.log('result1 ' + result);

                if (result == undefined) {
                    result = parseFloat(amountString);
                }

                console.log('result2 ' + result);

                return result;
            },

            formatAmount: function (amount, aLocale) {
                var result = '';


                //Recherche si la locale passée en argument est acceptée
                var localeFound = false;
                supportedLocales.forEach(function (entry) {

                    if (JSON.stringify(entry) == JSON.stringify(aLocale)) {
                        localeFound = true;
                    }
                })

                if (localeFound == false) {
                    console.log("Unable to format amount for local "
                        + aLocale);

                    return '';
                }
                if (amount != undefined) {
                    var amountString = amount.toString();

                    //Suppression des " " pour séparer les milliers et des caractères non numériques
                    amountString = amountString.replace(/[^0-9,.]/g, "");

                    // SI on est en France ou Italie, on peut taper . ou , pour les décimales
                    if (JSON.stringify(aLocale) == JSON.stringify(supportedLocales[2]) || JSON.stringify(aLocale) == JSON.stringify(supportedLocales[4])) {
                        amountString = amountString.replace(",", ".");
                    }
                }
                //Formattage des montants avec la locale avec 2 décimales après la virgule
                result = new Intl.NumberFormat(aLocale.replace("_", "-"), {minimumFractionDigits: 2}).format(parseFloat(amountString));

                return result;
            }
        }


    }
    ]
)
;