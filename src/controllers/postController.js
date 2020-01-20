import json2md from 'json2md';
import R from 'ramda';
import {requester} from '../lib/requester';

const reducerIntent = (origine, data) => {
  if (origine[data.intent]) {
    origine[data.intent].push(data.text)
  } else {
    origine[data.intent] = [data.text]
  }
  return origine;
}
const trainRasaModel = async (request, response) => {
  const common_examples = [{
    "text": "hey",
    "intent": "greet",
    "entities": []
  }, {
    "text": "yo",
    "intent": "greet",
    "entities": []
  }, {
    "text": "i'm looking for a place in the north of town",
    "intent": "restaurant_search",
    "entities": [
      {
        "start": 31,
        "end": 36,
        "value": "north",
        "entity": "location"
      }
    ]
  },
    {
      "text": "i'm looking for a place in the south of town",
      "intent": "restaurant_search",
      "entities": [
        {
          "start": 31,
          "end": 36,
          "value": "north",
          "entity": "location"
        }
      ]
    }];
  const regex_features = [];
  const lookup_tables = [];
  const entity_synonyms = [];
  const mdOptions = {
    language: 'en',
    pipeline: 'supervised_embeddings'
  }
  const intentReduce = R.reduce(reducerIntent, {}, common_examples);
  const mdIntent = R.flatten(R.map(key => {
      return [{
        h2: R.concat("intent:", key)
      },
        {
          ul: R.prop(key, intentReduce)
        }
      ];
    }
    , R.keys(intentReduce)
  ));
  const body = {
    config: JSON.stringify(mdOptions),
    nlu: json2md(mdIntent, '', '')
  }
  const queryParams = {
    project: request.body.project
  };

  const result = await requester('train', queryParams, body);
  response.setHeader('Content-Type', 'application/json');
  response.send(result);
}
/*const evaluateRasaModel = async (request, response) => {
  const body = {
    rasa_nlu_data: {
      "common_examples": [
        {
          "text": "hey",
          "intent": "greets",
          "entities": []
        },
        {
          "text": "hey",
          "intent": "greet",
          "entities": []
        },
        {
          "text": "ho",
          "intent": "greet",
          "entities": []
        },
        {
          "text": "bonjour",
          "intent": "5d95b3297e9d2",
          "entities": []
        },
        {
          "text": "coucou",
          "intent": "greets",
          "entities": []
        }
      ],
      "regex_features": [],
      "lookup_tables": [],
      "entity_synonyms": []
    }
  };
  const queryParams = {
    project: request.body.project,
    model: request.body.model
  };
  const result = await requester('evaluate', queryParams, body);
  response.setHeader('Content-Type', 'application/json');
  response.send(result);
}*/
const parseRasaModel = async (request, response) => {

  const resultCharge = await requester('update', {}, {
    model_file: R.concat('models/', request.body.model)
  });

  if (resultCharge === true) {
    const result = await requester('parse', {}, {
      text: request.body.text,
    });
    response.setHeader('Content-Type', 'application/json');
    if(result){
      response.send(result);
    } else {
      response.send(responseDefautlParse(request.body.text));
    }
  } else {
    response.send(responseDefautlParse(request.body.text));
  }
}

const responseDefautlParse = text => ({
  intent: {},
  entities: [],
  intent_ranking: [],
  text
})
module.exports = {
  trainRasaModel,
  /*evaluateRasaModel*/
  parseRasaModel
}
