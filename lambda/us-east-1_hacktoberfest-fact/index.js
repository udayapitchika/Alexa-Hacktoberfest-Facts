/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.70678702-d80d-42c8-9b72-277597c71dcb';

const SKILL_NAME = 'Hacktoberfest Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'The Hacktoberfest Facts skill cannot help you with that.  It can help you discover facts about Hacktoberfest if you say tell me a Hacktoberfest fact. What can I help you with ?';
const FALLBACK_REPROMPT = 'What can I help you with?';
const ERROR_MESSAGE = 'Sorry, an error occurred. Please try again later.';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
        'Hacktoberfest is a global event which motivates open source contributors to boost up their contribution. As well as it is a month-long celebration of open source software in partnership with GitHub. In addition to that by contributing to this challenge you can earn a limited edition T-Shirt',
        'Hacktoberfest is a month-long celebration of open source software between October 1-31 started in 2014',
        'To get a t-shirt, you must make five pull requests in October. Pull requests can be to any public repo on GitHub.',
        'In 2017, in partnership with custom apparel company Kotis Design, Digital Ocean shipped approximately 32,000 shirts to 120 countries',
        'Participants in Hacktoberfest represented 119 countries and thousands of skill sets. This program welcomes everyone already in the open source software community, and anyone who is interested in diving in.',
        'Participating in Hacktoberfest leads to personal growth, professional opportunities, and community building. This all starts with meaningful contributions to open source software.',
        'Hacktoberfest in 2017 resulted in over 200,000 merged pull requests in almost 65,000 repositories.',
        'Digital Ocean launched Hacktoberfest in 2014 to encourage contribution to open source projects. The event was a clear success. Soon, Hacktoberfest has become a powerful force in driving contributions to open source',
        'In 2016, 10,227 of the 29,616 registered participants had opened four pull requests in order to complete Hacktoberfest successfully.',
        'In 2014, Hactoberfest had 768 participants. In 2015, This number grew to 14,419 people from 96 countries signing up and 5,708 people created four pull requests each.'
      ];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;
        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.response.shouldEndSession(true);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.FallbackIntent': function () {
        const speechOutput = FALLBACK_MESSAGE;
        const fallBackReprompt = FALLBACK_REPROMPT;
        this.response.speak(speechOutput).listen(fallBackReprompt);
        this.emit(':responseReady');
    },

    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
