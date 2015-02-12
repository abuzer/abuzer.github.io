$(function() {

    var TASK_LIST_ENDPOINT = "./json/tasks.json";
    var CREATE_TASK_ENDPOINT = "http://demos.telerik.com/kendo-ui/service/tasks/create"; // using demo end point for create events
    var UPDATE_TASK_ENDPOINT = "http://demos.telerik.com/kendo-ui/service/tasks/update"; // using demo end point for update events
    var DELETE_TASK_ENDPOINT = "http://demos.telerik.com/kendo-ui/service/tasks/destroy"; // returning success

    $("#scheduler").kendoScheduler({
        date: new Date("2015/2/15"),
        height: $(window).height() - 2, // substructing 2 pixel for hiding vertical scroll
        views: [
            "day",
            "week",
            {
                type: "month",
                selected: true
            },
        ],
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: TASK_LIST_ENDPOINT,
                    dataType: "json"
                },
                update: {
                    url: UPDATE_TASK_ENDPOINT,
                    dataType: "jsonp"
                  },
                create: {
                    url: CREATE_TASK_ENDPOINT,
                    dataType: "jsonp"
                },
                destroy: {
                    url: DELETE_TASK_ENDPOINT,
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {
                            models: kendo.stringify(options.models)
                        };
                    }
                }
            },
            schema: {
                model: {
                    id: "taskId",
                    fields: {
                        taskId: {
                            from: "TaskID",
                            type: "number"
                        },
                        title: {
                            from: "Title",
                            defaultValue: "No title",
                            validation: {
                                required: true
                            }
                        },
                        start: {
                            type: "date",
                            from: "Start"
                        },
                        end: {
                            type: "date",
                            from: "End"
                        },
                        startTimezone: {
                            from: "StartTimezone"
                        },
                        endTimezone: {
                            from: "EndTimezone"
                        },
                        description: {
                            from: "Description"
                        },
                        ownerId: {
                            from: "OwnerID",
                            defaultValue: 1
                        },
                        isAllDay: {
                            type: "boolean",
                            from: "IsAllDay"
                        }
                    }
                }
            }
        },
        resources: [{
            field: "ownerId",
            title: "Owner",
            dataSource: [{
                text: "User 1",
                value: 1,
                color: "#f8a311"
            }, {
                text: "User 2",
                value: 2,
                color: "#5110ed"
            }, ]
        }]

    });
}); // end document.ready
