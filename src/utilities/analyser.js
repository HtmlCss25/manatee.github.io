
export function setAudioContext(audioElem){

            // Crée un contexte audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Crée un analyseur de fréquence
    const analyser = audioContext.createAnalyser();

    // Configure l'analyseur
    analyser.fftSize = 2048; // Taille de la transformation de Fourier rapide (FFT)

    // Crée un tableau de données pour stocker les fréquences
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // Obtient le flux audio (par exemple, depuis un élément audio)
    const audioSource = audioContext.createMediaElementSource(audioElem);
    console.log(audioSource)

    // Connecte le flux audio à l'analyseur
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);

    return {analyser,frequencyData}

}

function getFrequence({analyser,frequencyData}){

  analyser.getByteFrequencyData(frequencyData);

  // frequencyData contient maintenant les amplitudes des différentes fréquences
  // Faites quelque chose avec ces données, par exemple, imprimez-les dans la console

  // Appelez la fonction à nouveau pour mettre à jour en continu
  const id =  requestAnimationFrame(getFrequence);
  return id
}

export default getFrequence


