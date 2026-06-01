const fs = require('fs');
const vm = require('vm');

const files = [
  'src/lib/resource-details/etiquette-guide-seeds-a.ts',
  'src/lib/resource-details/etiquette-guide-seeds-b.ts',
  'src/lib/resource-details/etiquette-guide-seeds-c.ts',
  'src/lib/resource-details/etiquette-guide-seeds-d.ts',
];

const seeds = [];

for (const file of files) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/^import[^\n]*\n/gm, '');
  code = code.replace(/export const \w+: EtiquetteGuideSeed\[\] = /, 'globalThis.__data = ');

  const context = {};
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(code, context);
  seeds.push(...context.__data);
}

function list(items) {
  return items.map((item) => item.toLowerCase()).join(', ');
}

function buildText(seed) {
  return [
    `${seed.title} explains how to navigate ${seed.setting} with attention to ${seed.summaryFocus} [1][2].`,
    `For ${seed.setting}, the safest standard is ${list(seed.wearRequired)}. Visitors should choose clothing that reads as intentionally respectful the moment they enter, because hosts should not have to correct basics like coverage, fit, or appropriateness at the door [1][2]. ${seed.wearNotes}`,
    `Avoid ${list(seed.wearAvoid)}. The goal is not fashion anxiety. It is removing distractions so the community can focus on worship rather than on whether a guest misunderstood the setting. When in doubt, choose the more modest option, especially on major holy days, main weekly services, or heavily attended events [1][2][3].`,
    `Helpful things to bring include ${list(seed.bringHelpful)}. These items help you move through the space without creating extra work for staff, clergy, or volunteers [1][2]. ${seed.bringNotes}`,
    `Do not bring ${list(seed.bringAvoid)}. Sacred spaces are usually arranged around prayer flow, clear walkways, and a low-noise environment. The visitor who carries less and keeps belongings tidy almost always looks more respectful than the visitor who arrives overloaded [2][3].`,
    `Plan to arrive ${seed.arrivalWindow}. ${seed.arrivalTimingDetails} Early arrival is one of the easiest forms of respect because it lets you learn the room before worship has begun [1][2].`,
    `${seed.arrivalFlow} If you are unsure where guests belong, stop and ask before moving deeper into the space. That is better than walking into a restricted or high-traffic area and creating an avoidable interruption [2][3].`,
    `Visitors can usually expect ${list(seed.whatHappens)}. Learning that sequence in advance lowers anxiety and helps you recognize which moments are central, which moments are transitional, and which moments require extra stillness [1][2].`,
    `${seed.whatHappensNotes} When you do not understand a movement or cue, wait half a beat and follow the nearest usher, host, or final row of attendees rather than copying the most visible person in the room [2][3].`,
    `Good participation usually means ${list(seed.participationDo)}. Respectful guests do not need to prove familiarity. They need to show attention, restraint, and a willingness to let the community define the pace and boundaries of the visit [1][2].`,
    `Do not ${list(seed.participationAvoid)}. ${seed.participationNotes} A visitor who observes carefully is almost always received better than a visitor who improvises sacred actions in order to blend in [2][3].`,
    `The most common mistakes include ${list(seed.commonMistakes)}. Most of these errors come from hurry, overconfidence, or treating worship like a public event rather than a living practice [1][2].`,
    `You can avoid most problems by arriving early, watching before acting, speaking softly, and saving detailed questions for after the service or for a host who has clearly invited them. Etiquette is usually less about performance and more about not making yourself the center of the room [2][3].`,
    `${seed.phrases.map((phrase) => `${phrase.phrase} means ${phrase.meaning}, and you should use it when ${phrase.whenToUse.toLowerCase()}`).join(' ')} [1][2].`,
    `${seed.phraseNotes} If pronunciation worries you, a simple hello and thank you are better than forcing a phrase at the wrong moment. Tone and timing matter at least as much as vocabulary [2][3].`,
  ].join(' ');
}

function countWords(text) {
  return text
    .replace(/\[\d+\]/g, ' ')
    .replace(/[^\p{L}\p{N}\s'-]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

for (const seed of seeds) {
  const words = countWords(buildText(seed));
  console.log(`${seed.title}\t${words}`);
}
