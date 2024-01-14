/// <reference lib="webworker" />

import {HandChecker} from "./model/handChecker";
import {GeneratedDeal} from "./model/GeneratedDeal";
import {ConditionParser} from "./service/ConditionParser";
import {AtomicParser2} from "./service/atomicParser2";

function shuffle(conditions: string[], maxTries: number) {

  let conditionParser = new ConditionParser(new AtomicParser2())
  let handCheckers: HandChecker[] = []
  try {
    for (let condition of conditions) {
      handCheckers.push(conditionParser.parse(condition))
    }
  } catch (e) {
    console.log("Parsing Error in webworker")
  }
  var deal = new GeneratedDeal()
  let n = 0;
  do {
    deal.shuffle1Hand()
    n++;
  } while (n < maxTries &&
  !(handCheckers[0](deal.getHand(0)) &&
    handCheckers[1](deal.getHand(1)) &&
    handCheckers[2](deal.getHand(2)) &&
    handCheckers[3](deal.getHand(3))))
  if (n == maxTries)
    return undefined
  deal.generationNo = n
  return deal
}

addEventListener('message', ({data}) => {
  console.log("DATA " + JSON.parse(data.conditions))
  var x = JSON.parse(data.conditions)
  console.log(x[0]);
  console.log(x[1]);
  console.log(x[2]);
  console.log(x[3]);
  console.log("DATA " + data.maxTries)

  const response = {deal: shuffle(x, data.maxTries)}
  postMessage(response);
});
