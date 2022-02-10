const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: [0, 0],
    zoom: 2,
    projection: 'EPSG:4326'
  })
});

const features = []
for (let i = 0; i < 100; i++) {
  const x = Math.random() * 45
  const y = Math.random() * 20
  features.push(new ol.Feature({
    geometry: new ol.geom.Point([x, y])
  }))
}

const vtLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: features
  })
})

map.addLayer(vtLayer)

function exportPng() {
  const extent = map.getView().calculateExtent()
  olMapExport.printMap(map, extent)
}