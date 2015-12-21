/**
 * Created by ZWolf on 6/1/2015.
 */
var aStory = {};
aStory.status = "";
var lastID = "";

Stories = new Mongo.Collection("stories");
Tasks = new Mongo.Collection("tasks");
var populated = true;

if(!populated){

    Stories.insert({
        _id: "1",
        text: "Design a better Scrum Board",
        person: "Zachary Wolf"
    });


    Stories.insert({
        _id: "2",
        text: "Finish Flash Development",
        person: "Ben Vanassee"
    });



    Stories.insert({
        _id: "3",
        text: "Design the Crude Wireframes for CEG",
        person: "Zack Thomlinson"
    });


    Tasks.insert({
        storyID: "1",
        desc: "Learn Proper CSS layout schemes",
        assignee: "Zachary Wolf",
        status: "wip"
    });



    Tasks.insert({
        storyID: "1",
        desc: "Include Bootstrap into the styling",
        assignee: "Zachary Wolf",
        status: "wip"
    });


    Tasks.insert({
        storyID: "2",
        desc: "Add JS Functionality",
        assignee: "Zachary Wolf",
        status: "todo"
    });




    Tasks.insert({
        storyID: "2",
        desc: "Revisit and finalize styling",
        assignee: "Zachary Wolf",
        status: "todo"
    });




    Tasks.insert({
        storyID: "3",
        desc: "Include recommendations from Ben, Tony, Zack, etc into functionality",
        assignee: "Zachary Wolf",
        status: "done"
    });


    Tasks.insert({
        storyID: "2",
        desc: "Fix the Task functionality",
        assignee: "Zachary Wolf",
        status: "wip"
    });

    Tasks.insert({
        storyID: "1",
        desc: "Add animations",
        assignee: "Zachary Wolf",
        status: "todo"
    });
}





Template.stories_list.helpers({
    stories: function(){
        return Stories.find({});
    }
});




Template.todosList.helpers({
    tasks: function(){
        return Tasks.find({storyID: this._id, status:"todo"})
    }

});


Template.inProgressList.helpers({
    tasks: function(){
        return Tasks.find({storyID: this._id, status:"wip"})
    }

});

Template.verifyList.helpers({
    tasks: function(){
        return Tasks.find({storyID: this._id, status:"verify"})
    }

});

Template.doneList.helpers({
    tasks: function(){
        return Tasks.find({storyID: this._id, status:"done"})
    }

});

Template.task.events({

    "click .tDelete": function(){
        Tasks.remove(this._id)
    },


    "click .moveRight": function(){
        if(this.status === "todo"){
            Tasks.update({
                    _id: this._id
                },
                {
                    $set: {status: "wip"}
                })
        }



        if(this.status === "wip"){
            Tasks.update({
                    _id: this._id
                },
                {
                    $set: {status: "verify"}
                })
        }



        if(this.status === "verify"){
            Tasks.update({
                    _id: this._id
                },
                {
                    $set: {status: "done"}
                })
        }


    },


    "click .moveLeft": function(){
        if(this.status === "done"){
            Tasks.update({
                    _id: this._id
                },
                {
                    $set: {status: "verify"}
                })
        }



        if(this.status === "wip"){
            Tasks.update({
                    _id: this._id
                },
                {
                    $set: {status: "todo"}
                })
        }



        if(this.status === "verify"){
            Tasks.update({
                    _id: this._id
                },
                {
                    $set: {status: "wip"}
                })
        }


    }


});
var theHTML = "<div" + "id='dialogueNode'> <" + "/div>"
/*Story Functions
 ==========================================
 */
Template.story.events({
   "click .sDelete": function() {
       var temp = Tasks.find({storyID: this._id});
       for (var i = 0; i < temp.count(); i++){
           Tasks.remove(this._id)
       }
       Stories.remove(this._id)
   },

    /*Add Task bootbox modal and activation*/
    "click .addTask": function(){
        aStory.storyID = this._id;
        bootbox.dialog({
            title: "Create a New Task",
            message: '<div class="form-group"><label class="control-label">Task Description:</label>' +
            '<input name="createTaskDesc" class=" form-control" placeholder="Description..."></div>' +
            '<div class="form-group"><label class="control-label">Assignee:</label>' +
            '<input name="createTaskAssignee" class="form-control" placeholder="..."></div>' +
            '',


            buttons: {
                main: {
                    label: "Add Task",
                    className: "btn-success taskAdded",
                    callback: function() {
                        aStory.desc = $('input[name="createTaskDesc"]','.bootbox').val();
                        aStory.assignee = $('input[name="createTaskAssignee"]','.bootbox').val();
                        aStory.status = "todo";
                        Tasks.insert(aStory);
                        sessionStorage.setItem('aStory', aStory);
                    }
                        }
                    }
                    });
        Blaze.render(Template.myDialog,$("#dialogNode")[0]);

        if (aStory.status != ""){
            Tasks.insert(Session.get('aStory'));
        }

        aStory.status = "";
                }
            });



/*Create Story Form Functions
==========================================
 */

Template.createStory.events({
    "click .aButton": function (event, template) {
        var story = {};
        story.text = $("input[name='createStoryText']").val();
        story.person = $("input[name='createStoryPerson']").val();

        Stories.insert(story);
    }
});



