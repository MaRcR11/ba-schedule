import randomLoadingMessages from "../data/randomLoadingMessages.json";

function getRandomLoadingMessage() {
  const loadingMessages = Object.values(randomLoadingMessages);
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
}

export default getRandomLoadingMessage;
