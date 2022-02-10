import printJS from 'print-js'

function copyCanvas (source, target, options) {
  if (source.width > 0) {
    const opacity = source.parentNode.style.opacity || source.style.opacity
    target.globalAlpha = opacity === '' ? 1 : Number(opacity)
    const backgroundColor = source.parentNode.style.backgroundColor
    if (backgroundColor) {
      target.fillStyle = backgroundColor
      target.fillRect(0, 0, source.width, source.height)
    }
    let matrix
    const transform = source.style.transform
    if (transform) {
      matrix = transform
        .match(/^matrix\(([^\(]*)\)$/)[1]
        .split(',')
        .map(Number)
    } else {
      matrix = [
        parseFloat(source.style.width) / source.width,
        0,
        0,
        parseFloat(source.style.height) / source.height,
        0,
        0
      ]
    }
    CanvasRenderingContext2D.prototype.setTransform.apply(
      target,
      matrix
    )
    if (options) {
      const scaleX = matrix[0]
      const scaleY = matrix[3]

      target.drawImage(source, options.startX / scaleX, options.startY / scaleY, options.width / scaleX, options.height / scaleY, 0, 0, options.width / scaleX, options.height / scaleY)
    } else {
      target.drawImage(source, 0, 0)
    }
  }
}

function renderCompleteEvent (map, options) {
  const mapCanvas = document.createElement('canvas')
  const size = map.getSize()
  mapCanvas.width = size[0]
  mapCanvas.height = size[1]
  const mapContext = mapCanvas.getContext('2d')
  const targetList = map.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer')
  targetList.forEach((canvas) => {
    copyCanvas(canvas, mapContext, options)
  })
  const url = mapCanvas.toDataURL()
  printJS({
    printable: url,
    type: 'image',
    
  })
}


function getClipOptions (map, extent) {
  const minX = extent[0]
  const minY = extent[1]
  const maxX = extent[2]
  const maxY = extent[3]
  const leftBottom = [minX, minY]
  const rightTop = [maxX, maxY]

  const pixelLeftBottom = map.getPixelFromCoordinate(leftBottom)
  const pixelRightTop = map.getPixelFromCoordinate(rightTop)

  const w = Math.abs(pixelRightTop[0] - pixelLeftBottom[0])
  const h = Math.abs(pixelRightTop[1] - pixelLeftBottom[1])
  return {
    startX: pixelLeftBottom[0],
    startY: pixelRightTop[1],
    width: w,
    height: h
  }
}

export function printMap (map, extent, canvas) {
  if (map) {
    map.once('rendercomplete', () => {
      let option
      if (extent) {
        option = getClipOptions(map, extent)
      }
      renderCompleteEvent(map, option, canvas)
    })
    map.renderSync()
  }
}

