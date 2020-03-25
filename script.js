const logo = document.querySelector("#logo");
const menu = document.querySelector("#menu");
const banner  = document.querySelector("#banner ");
const container  = document.querySelector("#container");

const tl = new TimelineMax();
tl.fromTo(banner,1,{height:"0%"},{height:"80%",ease:Power2.easeInOut})
.fromTo(banner,1.2, 
    {width:"100%"}, 
    {width:"80%",ease: Power2.easeInOut}
    )
