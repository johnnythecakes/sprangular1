#Lesson Index Card

###1. Google Maps 4 Rails

###2. Learning Objective(s)
* Be able to use google maps in their rails projects
* Understand whats happening behind the scene.

###3. Essential Question(s)
What are the 3 parts of getting google maps on the page


###4. Talking Points/Road Map

Today we're going to build an app that lets us add houses on a google map and they'll be saved in the database.

###First steps

* create a new rails app, houses_app.
* modify the Gemfile and run our configs. 

* create a model `House` with two fields, latitude and longitude. (they are both floats)

* give it a `HousesController` with an `index` action.
* config a get route `/houses` that points to that index

* Create an empty `index.html.erb`


Now we're all set up to start the real fun.....'

### Get an API key
So first thing that we have to do to use the Google maps api, is predictably, get an API key
[Get it right here](https://developers.google.com/maps/documentation/javascript/)
### Link javascript

Next step is to link their javascript in our `layouts/application.html.erb`
```
  <%= javascript_include_tag "https://maps.googleapis.com/maps/api/js?key=YOUR KEY HERE" %>
```
### Create the canvas on the page
To make the google maps API work, we need to add two divs to are page, nested within each other.

The outer one needs to have the id `#map-container` and the inner has the id `#map-canvas`.

Now lets create a stylesheet `app/assets/stylesheets/style.css` 
We need to set the size of the two divs
```
#map-container {
   height: 400px;
   border-radius: 16px 16px;
   border-color: #fff;
   border-style: solid;
   box-shadow: 2px 2px 10px #B1B1B1;
   margin-top: 25px;
   border-width: 7px;
 }
 #map-canvas {
   height: 384px;
   width: 100%;
 }
```

Now run the server and goto the page, lets see what we got going on. And make sure we're good up to this point




### Draw on that canvas
If we check [Google's Documentation](https://developers.google.com/maps/documentation/javascript/examples/marker-simple) they give us a quick way to find out if things are working. 

Lets create a script tag in our `index.html.erb` and stick google's code in there and see what happens
```
function initialize() {
  var myLatlng = new google.maps.LatLng(34.04948772763669, -118.2398127950728);
  var mapOptions = {
    zoom: 12,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
```

We create function initialize, that creates some stuff
* A new `LatLng` object that takes two params, a latitude and a longitude`
* a `mapOptions` object with two keys, zoom and center which we set equal to our myLatlng variable

* then we create the map by passing in the id where it will be created, and the options we want it created with.

You do! 

To get us back in the javascript swing of things, I want you guys to modify this code so there is a function `makeLatLng` that takes a latitude and longitude and returns a new `google.maps.LatLng` object 

Now lets refactor that code and create a new function `makeMarker` that takes a longitude and latitude and creates a marker on our map based on that.


### Mixing it up with models

Time for the real fun..... we're going to take ten minutes to generate a model `House` that has two float fields, a latitude and longitude and create a bunch of fake houses in your database.

I hope you see where I am going with this....

Then modify your controller action to lookup all the @houses.

Now we want to write a loop that goes through every house and adds them as a marker to our map.


```
  <% @houses.each do |house| %>
      makeMarker(<%= house.latitude %>,<%= house.longitude %>);
  <% end %>
```
Not too complicated really, since we built this super handy function.


### The fun part
Alright now comes the fun part...
I want to make it so that anytime you click on the map, it creates a house on that location. (Lets assume I am a billionaire and have hundreds of houses)
What is the javascript word for actions that happen?
(Hint, we listen for them)

We're going to have to add this code:
```
  google.maps.event.addListener(map, 'click', function(event){
      console.log(event);
  });
```
Now if we click, we should be able to see an object in our console.

I want you guys to make it so that we dont log an object to the console, but we instead log a string.  
"Latitude: 110, Longitude: 111"

Now lets combine the function that we previously created, with our new click event so that we're making markers on the fly.

Theres a problem though. If we refresh the page, we Lose all our markers, that's no good...how can we solve this?







We can check the Google Maps API docs for how to do this, it involves something called ajax....


###Ajax!
who can tell me what ajax stands for?

So to implement this, we have to create a function `createHouse`

```
function createHouse(latitude, longitude) {
  // send the data to the server
}
```

And where would we call this function?

You can read more about the ajax syntax here on [jquerys website](http://api.jquery.com/jQuery.ajax/) YMMV 

I'll give you part of the function, you need to figure it out and fix the errors yourself
```
function createHouse(latitude, longitude) {
    $.ajax
      ({
        type: "POST",
        datatype: "json",
        url: 
        data:  { house: }
      });
}
```

If we ge this set up right, we should be able to take a look at our rails server and see whats happening, we will also see an error message that states that we dont have a route or create action defined, so you will need to do that.

###After that,
Its just a matter of making sure that our params line up with our create action and that we set up our create properly. We eventually want it so that when you refresh the page, the houses stay.


###Styling our map.
The `mapOptions` object that we created can also be created with an optional key `styles`. Check out https://snazzymaps.com/ and copy some of their code and snazzup your map!

###Next steps
I want to split you guys into groups, dig into the google maps API and implement a set concept in the app we've built so far.

* Info Windows
* Street View
* Drawing Shapes
* Layers
* Custom Markers
* Disabling Controls And Custom UIs

### Customising that canvas using the gmaps API reference
https://developers.google.com/maps/documentation/javascript/reference


### Check out the wiki for more options
https://github.com/apneadiving/Google-Maps-for-Rails/wiki


###(optional) Using Geocoder for #near 
https://github.com/alexreisner/geocoder
