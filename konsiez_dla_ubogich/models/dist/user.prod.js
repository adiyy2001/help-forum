"use strict";var mongoose=require("mongoose"),validator=require("validator"),bcrypt=require("bcryptjs"),userSchema=mongoose.Schema({name:{type:String,required:!0,trim:!0,validate:function(e){if(e.length<3)throw new Error("Imie jest za krótkie")}},surname:{type:String,required:!0,trim:!0,validate:function(e){if(e.length<3)throw new Error("Nazwisko jest za krótkie")}},nick:{type:String,required:!0,trim:!0},email:{type:String,required:!0,trim:!0,unique:!0,validate:function(e){if(!validator.isEmail(e))throw new Error("niepoprawny adres email")}},password:{type:String,required:!0,trim:!0,validate:function(e){if(e.length<6)throw new Error("Hasło musi mieć conajmniej 6 znaków")}},password2:{type:String,required:!0,trim:!0,validate:function(e){if(!validator.equals(e,this.password))throw new Error("Hasła nie są identyczne")}},voivodeship:{type:String,required:!0},city:{type:String,required:!0}});userSchema.pre("save",function(r){var i;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if((i=this).isModified("password"))return e.next=4,regeneratorRuntime.awrap(bcrypt.hash(i.password,8));e.next=5;break;case 4:i.password=e.sent;case 5:r();case 6:case"end":return e.stop()}},null,this)});var User=module.exports=mongoose.model("User",userSchema);