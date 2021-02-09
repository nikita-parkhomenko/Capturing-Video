let timer = 0;

const constraintObj = {
  audio: true,
  // так же кроме флага true можем конфигурировать объект видео
  video: {
    facingMode: 'user',
    width: { min: 640, ideal: 640, max: 1200 },
    height: { min: 480, ideal: 480, max: 720 },
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
    // Создаю новый MediaRecorder объект для записи видео, аудио
    let mediaRecorder = new MediaRecorder(mediaStreamObject)
    let chunks = []

    start.addEventListener('click', ev => {
      // начинаем записывать
      mediaRecorder.start()
      console.log(mediaRecorder.state)
    })

    stop.addEventListener('click', ev => {
      // останавливаем запись
      mediaRecorder.stop()
      console.log(mediaRecorder.state)
    })

    // запускаем обработчик данных записи и ложим данные в массив chunks, когда они готовы
    mediaRecorder.ondataavailable = ({ data }) => chunks.push(data)

    mediaRecorder.onstop = ev => {
      console.log('on stop')
      let blob = new Blob(chunks, { 'type': 'video/webm' })
      console.log('blob готов для загрузки на сервер', blob)
      // для сохранения памяти очищаем массив chunks
      chunks = []

      // создаем пустой FormData объект
      const formData = new FormData()
      // Добавляю пару ключ значение и имя файла
      formData.append('file', blob, 'video.webm')
      /*
        Отправляем файл на сервер
        axios({ method: 'POST', url: '/attachment/upload', formData })
      */
    }
  })
  .catch(err => {
    console.log(err.name, err.message)
  })