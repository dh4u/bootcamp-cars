/* Although MongoDB is schemaless, Mongoose works with schemas. 
Remember, a schema describes what data is in a database and how it is organised and structured.  */
const mongoose = require('mongoose');

// set up some variables / functions that I will use later
const d = new Date;
const currentYear = d.getFullYear();
//https://github.com/kelektiv/node-uuid
function uuidv4() {
    const uuidv1 = require('uuid/v1');
    return uuidv1();
}

// set up the schema
let CarSchema = mongoose.Schema({
  make:{
      type:String,
      required:true
  },
  model:{
      type:String,
      required:true
  },
  year:{
      type:Number,
      required:true,
      default: currentYear
  },
  VIN:{
      type:String,
      required:true,
      default: uuidv4()
  },
  color:{
      type:String,
      required:true,
      default: "white"
  }/* ,
  timestamps: {
        type:Date,
        required: true,
        timestamps: true,
        path: {createdAt: 'insertDate', default: Date.now()},
        path: {updatedAt: 'updatedDate', setOnInsert: false, default: Date.now() }
  } */
},
{timestamps: {
      createdAt: 'insertDate', 
      default: Date.now(),
      updatedAt: 'updatedDate', setOnInsert: false, 
      default: Date.now()
    }
});

// make sure the updatedAt field is updated when the save function is called
CarSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

/*Models are special constructors that are compiled based on the schemas you have defined. According to Mongoose’s official documentation: 

“Instances of these models represent documents which can be saved and retrieved from our database. 
All document creation and retrieval from the database is handled by these models.”

Below is an example of how you create a model using the model() method. The two arguments you pass to this method are:  
The name of the model 
the schema object you created in the previous step
*/
module.exports = mongoose.model('Car', CarSchema);
