window.onload = init;

function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: [2350563.8790858407, 5503261.94556951],
            zoom: 7.5,
            minZoom: 1
        }),
        target: 'js-map'
    })

    //base layers
    const openStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM({
            crossOrigin: null
        }),
        visible: true,
        type: 'base',
        title: 'OSM Standardna mapa'
    })

    const yandexMapStandard = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'http://vec0{1-4}.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}',
            projection: 'EPSG:3395',
            crossOrigin: null,
            tileGrid: ol.tilegrid.createXYZ({
                extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
            })
        }),
        visible: false,
        type: 'base',
        title: 'Yandex mapa'
    })

    const googleMapsStandard = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: 'http://mt1.google.com/vt/lyrs=m@113&hl=en&&x={x}&y={y}&z={z}',
            crossOrigin: null,
            attributions: '<a href="https://developers.google.com/maps/terms">Terms of Use.</a>'
        }),
        visible: false,
        type: 'base',
        title: 'Google mapa standard'
    })

    const googleMapsSatelite = new ol.layer.Tile({
        source: new ol.source.TileImage({
            url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',
            crossOrigin: null,
            attributions: '<a href="https://developers.google.com/maps/terms">Terms of Use.</a>'
        }),
        visible: false,
        type: 'base',
        title: 'Google mapa satelit'
    })

    const layerGroup = new ol.layer.Group({
        title: 'Osnovni slojevi',
        layers: [
            openStreetMapStandard, yandexMapStandard, googleMapsStandard, googleMapsSatelite
        ]
    })

    map.addLayer(layerGroup);

    //overlays
    const geoserverCenej = new ol.layer.Tile({
        title: 'Čenej',
        source: new ol.source.TileWMS({
            url: 'http://localhost:8585/geoserver/wms',
            params: { 'LAYERS': 'cite:Cenej', 'TILED': true },
            serverType: 'geoserver',
        }),
        visible: false,
    })

    const geoserverSrbija = new ol.layer.Tile({
        title: 'Srbija',
        source: new ol.source.TileWMS({
            url: 'http://localhost:8585/geoserver/wms',
            params: { 'LAYERS': 'cite:Srbija', 'TILED': true },
            serverType: 'geoserver',
        }),
        visible: false,
    });

    const geoserverZasticenaPodrucija = new ol.layer.Tile({
        title: 'Zasticena podrucija',
        source: new ol.source.TileWMS({
            url: 'http://localhost:8585/geoserver/wms',
            params: { 'LAYERS': 'cite:Zasticena_podrucija', 'TILED': true },
            serverType: 'geoserver',
        }),
        visible: false,
    });

    const geoserverJezera = new ol.layer.Tile({
        title: 'Jezera',
        source: new ol.source.TileWMS({
            url: 'http://localhost:8585/geoserver/wms',
            params: { 'LAYERS': 'cite:Jezera', 'TILED': true },
            serverType: 'geoserver',
        }),
        visible: false,
    });

    const geoserverZapadnaSrbija = new ol.layer.Tile({
        title: 'Zapadna Srbija',
        source: new ol.source.TileWMS({
            url: 'http://localhost:8585/geoserver/wms',
            params: { 'LAYERS': 'cite:Zapad', 'TILED': true },
            serverType: 'geoserver',
        }),
        visible: false,
    });


    const layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Legend',
        groupSelectStyle: 'group'
    });

    const overLayerGroup = new ol.layer.Group({
        title: 'Prekrivači',
        layers: [
            geoserverCenej, geoserverSrbija, geoserverZasticenaPodrucija, geoserverJezera, geoserverZapadnaSrbija
        ]
    });
    map.addLayer(overLayerGroup);

    map.addControl(layerSwitcher);

}