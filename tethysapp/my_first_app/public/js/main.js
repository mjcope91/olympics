var paths, map, locations, overlay

$(document).ready(function(){

    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');


    /**
    * Create an overlay to anchor the popup to the map.
    */
    overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
    });

    /**
    * Add a click handler to hide the popup.
    * @return {boolean} Don't follow the href.
    */
    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    var projection = ol.proj.get('EPSG:3857');

    var raster = new ol.layer.Tile({
        source: new ol.source.BingMaps({
        imagerySet: 'Aerial',
        key: 'SFpNe1Al6IDxInoiI7Ta~LX-BVFN0fbUpmO4hIUm3ZA~AsJ3XqhA_0XVG1SUun4_ibqrBVYJ1XaYJdYUuHGqVCPOM71cx-3FS2FzCJCa2vIh'
        })
    });

    var borders = new ol.layer.Vector({
        source: new ol.source.Vector({
        url: '/static/my_first_app/kml/borders.kml',
        format: new ol.format.KML()
        })
    });

    locations = new ol.layer.Vector({
        source: new ol.source.Vector({
        url: '/static/my_first_app/kml/locations.kml',
        format: new ol.format.KML()
        })
    });

     paths = new ol.layer.Vector({
        source: new ol.source.Vector({
        url: '/static/my_first_app/kml/torch.kml',
        format: new ol.format.KML()
        })
    });

    map = new ol.Map({
        layers: [raster, locations, paths, borders],
        overlays: [overlay],
        target: document.getElementById('map'),
        view: new ol.View({
          center: [876970.8463461736, 5859807.853963373],
          projection: projection,
          zoom: 2
        })
    });

      // display popup on click
      map.on('click', function(evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature, layer) {
              return feature;
            }, {layerFilter: function(layer) {
            return (layer === locations);},
            hitTolerance: 0
            });
        if (feature) {
            var coordinates = feature.getGeometry().getCoordinates();
            overlay.setPosition(coordinates);
            var displaycontent = feature.get('description');
            content.innerHTML = displaycontent;
            map.getView().setCenter(coordinates);
            map.getView().setZoom(5);
          };
      });
});

function showtorch(checkboxElem){
    if (checkboxElem.checked) {
    paths.setVisible(true);
    var extent = paths.getSource().getExtent();
    map.getView().fit(extent, map.getSize());

  } else {
    paths.setVisible(false);
}};

function selectlocation(){

    var location_dropdown = document.getElementById("location").value;
    var content = document.getElementById('popup-content');

	var myFeature = locations.getSource().getFeatures();
	var feature;
	for (i = 0; i < myFeature.length; i++) {
        feature = myFeature[i];
        if (feature.a == location_dropdown) {
            myCoords = feature.getGeometry().getCoordinates();
            overlay.setPosition(myCoords);
            var displaycontent = feature.I.description;
            content.innerHTML = displaycontent;

            map.getView().setCenter(myCoords);
            map.getView().setZoom(5);
            }
	}

}