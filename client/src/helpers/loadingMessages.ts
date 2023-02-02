import * as randomLoadingMessages from "../data/randomLoadingMessages.json";

function getRandomLoadingMessage() {
  return Object.values((randomLoadingMessages as any).default)[Math.floor(Math.random() * Object.values((randomLoadingMessages as any).default).length)];
}

export default getRandomLoadingMessage;
