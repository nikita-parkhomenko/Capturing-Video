
const constraintObj = {
  audio: true,
  // так же кроме флага true можем конфигурировать объект видео
  video: {
    facingMode: 'user',
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 },
  }
}

// делаю запрос на разрешение использовать микрофон и камеру пользователя
navigator.mediaDevices.getUserMedia(constraintObj)
  .then(mediaStreamObject => {
    // подключаю медиа стрим к первому видео элементу
    let video = document.querySelector('video')
    video.srcObject = mediaStreamObject

    // говорю показывать в video элементе то, что снимает веб-камера
    video.onloadedmetadata = ev => video.play()

    let start = document.querySelector('.start-recording')
    let stop = document.querySelector('.stop-recording')
    let videoSave = document.querySelector('#video-save')

    console.log(start)
  })
  .catch(err => {
    console.log(err.name, err.message)
  })