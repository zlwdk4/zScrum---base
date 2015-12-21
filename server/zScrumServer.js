/**
 * Created by ZWolf on 6/1/2015.
 */
Stories = new Mongo.Collection("stories");
Tasks = new Mongo.Collection("tasks");

Meteor.startup(function () {
    //if (Stories.find().count() === 0) {
    //    console.log("OK")
    //}


});