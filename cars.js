/*
● Create a file ‘cars.js’. Within cars.js:
o Create 5 car objects using a constructor function.
o Each car object should have the following properties: make, model, colour,
image, registration number, price.
o Each car object should also include a showMore() method. This method
should display a dialogue that displays all the details about the specific car
object. Hint: See more about <dialog> here .
o Create a function that will be used to display the make, model and image of
each car object in ‘cars.html’ when ‘cars.html’ is loaded.
*/
let cars = [];

// Each car object should have the following properties: make, model, color, image, registration number, price.
function Car( make, model, color, image, registration, price, year ){
    
    this.make = make;
    this.model = model;
    this.color = color;
    this.image = image;
    this.registration = registration;
    this.price = price;
    this.year = year;
    
    cars.push(this);
}

// Each car object should also include a showMore() method. This method should display a dialogue that displays all the details about the specific car object. Hint: See more about <dialog> here .
Car.prototype.showMore = function(){
    let dialog = "dialog" + this.make;
    document.getElementById(dialog).show();
}

Car.prototype.describe = function () {
  let description = "This " + this.color + " " + this.year + " " + this.make + " " + this.model + " costs " + this.price + ".&lt;br /&gt;Its registration number is " + this.registration + ".";
  return description;
}

// Create 5 car objects using a constructor function.
/*let myAudi = new Car("Audi", "R8", "black", "Audi.jpg", "A17189712", "$139,000");
let myBMW = new Car("BMW", "M3", "blue", "BMW.jpg", "B034534569", "$149,999");
let myChevy = new Car("Chevy", "Corvette", "white", "Chevy.jpg", "C124", "99,999");
let myDodge = new Car("Dodge", "Challenger", "red", "Dodge.jpg", "D02930912", "$79,999");
let myFiat = new Car("Fiat", "500", "blue", "Fiat.jpg", "F02940", "$39,999");*/

/*let temp = new Car("Chevy", "Nova", "blue", "nova.jpg", "A17189712", "$139,000", "1969");
temp = new Car("Plymouth", "Hemi", "blue", "hemi.jpg", "B034534569", "$149,999", "1970");
temp = new Car("Chevy", "Camaro", "blue", "camaro.jpg", "C124", "99,999", "1969");
temp = new Car("Shelby", "Cobra", "red", "cobra.jpg", "F02940", "$39,999", "????");
temp = new Car("Pontiac", "GTO", "silver", "gto.jpg", "D02930912", "$79,999", "1970");*/

let myChevrolet = new Car("Chevrolet", "Nova", "blue", "nova.jpg", "A17189712", "$139,000", "1969");
let myPlymouth = new Car("Plymouth", "Hemi", "blue", "hemi.jpg", "B034534569", "$149,999", "1970");
let myChevy = new Car("Chevy", "Camaro", "blue", "camaro.jpg", "C124", "99,999", "1969");
let myShelby = new Car("Shelby", "Cobra", "red", "cobra.jpg", "F02940", "$39,999", "????");
let myPontiac = new Car("Pontiac", "GTO", "silver", "gto.jpg", "D02930912", "$79,999", "1970");

// Create a function that will be used to display the make, model and image of each car object in ‘cars.html’ when ‘cars.html’ is loaded.
function showAll(){
    //console.log(cars);
    //console.log(cars.length);
    let i = 0;
    let newDialog, newDiv, newText, temp;
    do{
        /*
        //console.log(cars[i]['make']);
        //console.log(cars[i].describe());
        newDiv = document.createElement("div");
        newDiv.style.cssFloat = "left";
        newDiv.id = cars[i].make;
        newText = document.createTextNode(cars[i].describe());
        newDiv.appendChild(newText);
        document.getElementById('cars').appendChild(newDiv);
        */
        //alert(i);
        
        //newDiv = '<div class="card" style="float: left; max-width:450px;"><div class="card-header">' + cars[i].year + ' ' + cars[i].make + ' ' + cars[i].model + '</div><div class="card-body"><img src="Images/' + cars[i].image + '" onclick="my' + cars[i].make + '.showMore();" height="100" /></div><div class="card-footer" style="min-height:100px;"><dialog id="dialog' + cars[i].make + '" style="font-size: smaller;">This ' + cars[i].year + ' ' + cars[i].color + ' ' + cars[i].make + ' ' + cars[i].model + ' costs ' + cars[i].price + '. Its registration number is ' + cars[i].registration + '.</dialog></div></div>';
        
        // works but I don't really like the card style
        /*newDiv = '<div class="card" style="float: left; max-width:450px;"><div class="card-header">' + cars[i].year + ' ' + cars[i].make + ' ' + cars[i].model + '</div><div class="card-body"><img src="Images/' + cars[i].image + '" onclick="my' + cars[i].make + '.showMore();" height="100" /></div><div class="card-footer" style="min-height:100px;"><dialog id="dialog' + cars[i].make + '" style="font-size: smaller;">This ' + cars[i].year + ' ' + cars[i].color + ' ' + cars[i].make + ' ' + cars[i].model + ' costs ' + cars[i].price + '. Its registration number is ' + cars[i].registration + '.</dialog></div></div>';*/
        
        newDiv = '<div class="card" style="float: left; max-width:450px;">';
        newDiv += '<div class="card-header">' + cars[i].year + ' ' + cars[i].make + ' ' + cars[i].model + '</div>';
        newDiv += '<div class="card-body"><img src="Images/' + cars[i].image + '" onclick="my' + cars[i].make + '.showMore();" height="100" /></div>';
        newDiv += '<div class="card-footer" style="min-height:100px;">';
        newDiv += '<dialog id="dialog' + cars[i].make + '" style="background-color: lightyellow;font-size: smaller; border: 0;">This ' + cars[i].year + ' ' + cars[i].color + ' ' + cars[i].make + ' ' + cars[i].model + ' costs ' + cars[i].price + '. Its registration number is ' + cars[i].registration + '.</dialog></div></div>';
        
        //newDiv = '<div class="card" style="width:500px"><img class="card-img-top" src="Images/' + cars[i].image + '" /><div class="card-img-overlay"><h4 class="card-title">John Doe</h4><p class="card-text">Some example text.</p><a href="#" class="btn btn-primary">See Profile</a></div></div>';
        
        document.getElementById('cars').innerHTML += newDiv;
        
        //temp = "my" + cars[i].make + ".showMore()";
        //eval(temp);
        i++;
    }
    while(i < cars.length);
}

//console.log(cars.length);