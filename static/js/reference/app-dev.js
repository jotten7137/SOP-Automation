//Asset Visualization

//map
var map = L.map('map',{
    // center: [41.4934026, -82.0525798],
    center:[0,0], 
    zoom: 1,
  // layers: [tiles]
});

//openstreetmap - tile variable
var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
}).addTo(map);
  
//map scale
var scale = L.control.scale({
  metric: false,
  imperial: true}).addTo(map);

//LAYER CREATION
//extruder layer
var extruders = L.geoJson(poly_assets,{
  filter:function(feature,layer){
    return feature.properties.assetclass == "Extruder";
  },
  pointToLayer: function(feature,latlng){
    return L.marker(latlng, {
    })
    .on('mouseover',function(){
      this.bindPopup(feature.properties.compid+'<br>Asset Description: <b>'+feature.properties.assetdesc+'</b><br><p></p>Address: <b>'+feature.properties.Address+'</b><br>Telephone: <b>'+feature.properties.Telephone+'</b>').openPopup();
    });
  }
});

//injection layer
var injecters = L.geoJson(poly_assets,{
  filter:function(feature,layer){
    return feature.properties.assetclass == "Injection Molding Machine";
  },
  pointToLayer: function(feature,latlng){
    return L.marker(latlng, {
    }).on('mouseover',function(){
      this.bindPopup(feature.properties.compid+'<br>Asset Description: <b>'+feature.properties.assetdesc+'</b><br><p></p>Address: <b>'+feature.properties.Address+'</b><br>Telephone: <b>'+feature.properties.Telephone+'</b>').openPopup();
    });
  }
});

//lab layer
var lab = L.geoJson(poly_assets,{
  filter:function(feature,layer){
    return feature.properties.assetclass == "Lab Equipment";
  },
  pointToLayer: function(feature,latlng){
    return L.marker(latlng, {
    }).on('mouseover',function(){
      this.bindPopup(feature.properties.compid+'<br>Asset Description: <b>'+feature.properties.assetdesc+'</b><br><p></p>Address: <b>'+feature.properties.Address+'</b><br>Telephone: <b>'+feature.properties.Telephone+'</b>').openPopup();
    });
  }
});

//molds layer
var molds = L.geoJson(poly_assets,{
  filter:function(feature,layer){
    return feature.properties.assetclass == "MOLDS";
  },
  pointToLayer: function(feature,latlng){
    return L.marker(latlng, {
    }).on('mouseover',function(){
      this.bindPopup(feature.properties.compid+'<br>Asset Description: <b>'+feature.properties.assetdesc+'</b><br><p></p>Address: <b>'+feature.properties.Address+'</b><br>Telephone: <b>'+feature.properties.Telephone+'</b>').openPopup();
    });
  }
});

//all assets layer
var allassets = L.layerGroup([extruders,injecters,lab,molds])

//define markercluster group
var markers = L.markerClusterGroup()
markers.addLayer(allassets).addTo(map)

//Btn-All-layers
$("#allassets").click(function(){
  markers.clearLayers();
  markers.addLayer(allassets)
});
//Btn-Extruder-layers
$("#Extruder").click(function(){
  markers.clearLayers();
  markers.addLayer(extruders)
});
//Btn-Injecter-layers
$("#Injecter").click(function(){
  markers.clearLayers();
  markers.addLayer(injecters)
});
//Btn-Lab-layers
$("#Lab").click(function(){
  markers.clearLayers();
  markers.addLayer(lab)
});
//Btn-Molds-layers
$("#Molds").click(function(){
  markers.clearLayers();
  markers.addLayer(molds)
});

// SEARCHBAR FUNCTIONALITY
// implement fuse-search //https://fusejs.io/
var fuse_options = {
  shouldSort: true,     //if true - sorts result list by score
  tokenize: true,       //if true - algorithm will search individual words and the full string, computing the final score as a function of both
  matchAllTokens:true,  //if true - result set will only include records that match all tokens
  threshold:0.2,        //what point does the match algorithm give up. A threshold of 0.0 = perfect match and 1.0 = anything matches
  maxPatternLength: 25, //maximum length of the pattern
  minMatchCharLength: 1,
  keys: [   'properties.compid', 
            'properties.assetdesc',
            'properties.Address'] //List of properties that will be searched
};
var fuse = new Fuse(poly_assets.features, fuse_options);


//searchbar //https://github.com/stefanocudini/leaflet-search
var search = new L.Control.Search({
  layer: markers,
  initial: false,
  marker: false,
  propertyName: 'assetdesc',
  textPlaceholder:'Search for asset desc...',
  zoom: '13',
  
  filterData: function(text,records){
    var filter_file = fuse.search(text),
    ret={}, key;

    var list = []
    var list_geo = {}
    var coffee = {}

    for (i in filter_file){
      key = filter_file[i].properties.assetdesc;
      id = filter_file[i].properties.compid
      desc = filter_file[i].properties.assetdesc;
      Address = filter_file[i].properties.Address;
      telephone = filter_file[i].properties.Telephone;
      region = filter_file[i].properties.assetreg;
      // loc = (filter_file[i].geometry.coordinates);
      lng = filter_file[i].geometry.coordinates[0]; 
      lat = filter_file[i].geometry.coordinates[1];
      ret[key]=records[key];
    
      var feature = {type: 'Feature',
        properties: {id,desc, Address,telephone},
        geometry:{
          type: 'Point',
          coordinates: [lng,lat]
          }
        }
        list.push(feature)
      }
    
    list_geo = {"type":"FeatureCollection", "features": list};
    console.log("list_geo",list_geo)
    var coffee = L.geoJson(list_geo,{
        pointToLayer: function(feature,latlng){
          return new L.marker(latlng, {
          }).on('mouseover',function(){
            this.bindPopup(feature.properties.id+'<br>Asset Description: <b>'+feature.properties.desc+'</b><br><p></p>Address: <b>'+feature.properties.Address+'</b><br>Telephone: <b>'+feature.properties.telephone+'</b>').openPopup();
          });
        }
      });
    markers.clearLayers()
    markers.addLayer(coffee)
    return ret  
    // return list_geo
  }

}).addTo(map);

//clears layers on search-bar cancel button
document.querySelector('.search-cancel').addEventListener('click',event=>{
  markers.clearLayers()
})

//Marker Functionality
markers.on('click', function(a){
  if(a.layer._popup)
    a.layer.openPopup()
});

//marker_clusters - add everything to map
markers.addTo(map)

map.fitBounds(markers.getBounds());