/**
 * todo: path should be more flexible and more capable of error handling
 * @param {String} path, which matches the regex pattern below
 */
function createAudioManager(path) {
  // path: ./src/
  const audios = {};

  function addSingleAudio(key, filename) {
    return audios[key] || (audios[key] = filename);
  }

  function loadAudios(audios) {
    for (let key in audios) {
      addSingleAudio(key, audios[key]);
    }
  }

  // todo: buggy
  function getAudioByName(name) {
    const file = `${path}${name}`;
    return audios.find((a) => {
      const { src } = a;
      return src === file;
    });
  }

  return {
    addSingleAudio,
    loadAudios,
    getAudioByName
  };
}

module.exports = createAudioManager;
