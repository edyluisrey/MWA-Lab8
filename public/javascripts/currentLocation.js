(function(){
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
  	document.getElementsByName("longitude")[0].value = position.coords.longitude;
  	document.getElementsByName("latitude")[0].value = position.coords.latitude; 
  }

})();
