window.addEventListener('load', function () {
    let lat;
    let long;
    let location=document.querySelector(".location-location");
    let temprature12=document.querySelector(".Temprature-tempratures");
    let summary1=document.querySelector(".Temprature-summary");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const proxy=`https://cors-anywhere.herokuapp.com/`;
            const api=`${proxy}https://api.darksky.net/forecast/ecf445968ed4406d384cf147874d4bdb/${lat},${long}`;
            fetch(api)
                .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                const {temperature , summary, icon} = data.currently;
                temprature12.textContent=temperature;
                summary1.textContent=summary;
                location.textContent=data.timezone;
                setIcon(icon,document.querySelector('.icon'));
            })
        });
    }
    function setIcon(icon, iconID){
        const skycons= new Skycons({color:"white"});
        const currentIcon=icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});