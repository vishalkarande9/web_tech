(function () {

    angular.module(QuizUp).controller('QuestionsController', ['$scope','$api', '$http', '$userService','$filter', function ($scope, $api, $http, $userService,$filter) {

        var qc = this;
        $scope.arrsection=[];

        $scope.arrcourse=[];
        qc.env = {
            angularVersion: angular.version.full,
            //formly: formlyVersion
        };

        $scope.arrsection=[{"section_id":'5bfa121d5ea208458cf7a470',"section_title":"Asian Continents"}]
        $http.get($api.base + $api.course.get).then(function (result) {
            if (result.status === 200) {
                $scope.arrcourse=result.data.data

                qc.questionFields[0].templateOptions.options=$scope.arrcourse;
                //$scope.sections.course_title = result.data[0]
            }else{
            }
        }, function (error) {

        });
        qc.alerts = [];
        $scope.get=function()
        {
            $http.get($api.base + $api.section.get).then(function (result) {
                if (result.status === 200) {
                    $scope.arrsection=result.data.data

                }else{
                }
            }, function (error) {

            });

        }


        $scope.get();

        qc.addAlert = function (message, type) {
            qc.alerts.push({message: message, type: type});
        };

        qc.closeAlert = function (index) {
            qc.alerts.splice(index, 1);
        };
        qc.create = function () {
            $scope.filteredArr=[]
            $scope.filteredArrSec=[]
            $scope.filteredArr = $filter('filter')($scope.arrcourse, {
                _id: qc.questions.course_title
            });
            console.log("after course: ",$scope.filteredArr[0]._id)
            //console.log("Test ",qc.questions.section_title)
            $scope.filteredArrSec = $filter('filter')($scope.arrsection, {
                section_id: qc.questions.section_title
            });
            console.log("after section: ",$scope.filteredArrSec[0].section_id)

            qc.data={
                "section_details":
                        {"section_id":$scope.filteredArrSec[0].section_id,
                "section_title":$scope.filteredArrSec[0].section_title
                        },
                "course_details":
                    {"course_id":$scope.filteredArr[0]._id,
            "course_title":$scope.filteredArr[0].course_title
                    },
            "question":qc.questions['question'],
            "option":[{"option_number":1,"option_value":qc.questions['option_number_1'],"answer":qc.questions['chkbox_1']},
                     {"option_number":2,"option_value":qc.questions['option_number_2'],"answer":qc.questions['chkbox_2']},
                     {"option_number":3,"option_value":qc.questions['option_number_3'],"answer":qc.questions['chkbox_3']},
                     {"option_number":4,"option_value":qc.questions['option_number_4'],"answer":qc.questions['chkbox_4']}],
            "difficulty_level":qc.questions['difficulty_level']}
            console.log(qc.data)
            $http.put($api.base + $api.question.put, qc.data).then(function (result) {
                if (result.status === 200) {
                    qc.addAlert("Question added successfully","success");
                    qc.questions={}
                    //$scope.get()
                    qc.sections=[]

                }
            }, function (error) {
                qc.addAlert("Question could not be added. Please Try Again!");
            });

        };

        qc.options = {
            formState: {
                awesomeIsForced: false
            }
        };

        $scope.delete = function(id){



            //alert(JSON.stringify(cc.data))
            $http.delete($api.base + $api.section.del,{params:{_id:id}}).then(function (result) {
                //alert(result.status);
                if (result.status === 200) {
                    $scope.get();
                    qc.addAlert("Section deleted successfully","success");

                }
            }, function (error) {
                qc.addAlert("Section could not be deleted. Please Try Again!");
            });

        };
        qc.update=function(){
            $scope.filteredArr=[]
            $scope.filteredArr = $filter('filter')($scope.arrcourse, {
                _id: $scope.sc.sections.course_title
            });
            console.log($scope.filteredArr[0]._id)
            qc.data={

                "section_title":sc.sections['section_title'],
                "section_description":sc.sections['section_description'],
                "course_details":{"course_id":($scope.filteredArr[0]._id),
                    "course_title":$scope.filteredArr[0].course_title},
                "_id":sc.sections._id
            }
            $http.post($api.base + $api.section.post, sc.data).then(function (result) {
                if (result.status === 200) {
                    qc.addAlert("Section updated successfully","success");
                    $scope.get()
                    qc.questions=[]

                }
            }, function (error) {
                qc.addAlert("Section could not be updated. Please Try Again!");
            });
        }
        $scope.updateFromTable=function(stitle,descr,cid,sid){
            //alert("hello")
            qc.sections.section_title=stitle;
            qc.sections.section_description=descr;
            qc.sections['course_title']=cid
            qc.sections._id=sid
            console.log(id)
        }
        qc.questionFields = [
            {
                key: 'course_title',
                type: 'select',
                templateOptions: {
                    type: 'select',
                    label: 'Course Title',
                    valueProp: '_id',
                    labelProp: 'course_title',
                    placeholder: 'Select option',
                    defaultOptions:'Select Value',
                    options: [],
                    required: true,
                    visible: false,
                    "onChange": function () {
                        $scope.arrsection=[{"section_id":'5bfa121d5ea208458cf7a470',"section_title":"Asian Continents"}]
                      qc.questionFields[1].templateOptions.options=$scope.arrsection;
                        //console.log($scope.arrsection[0].section_title)
                        //console.log(this.options);
                    }
                }
            },
            {
                key: 'section_title',
                type: 'select',
                templateOptions: {
                    valueProp:'section_id',
                    labelProp: 'section_title',
                    type: 'select',
                    label: 'Section Title',
                    options:[],
                    //placeholder: 'Enter Your Password',
                    required: true
                }
            },
            {
                key: 'question',
                type: 'textarea',
                templateOptions: {
                    theme: "custom",
                    type: 'textarea',
                    label: 'Question',
                    // valueProp:'_id',
                    // labelProp: 'course_title',
                    placeholder: 'Enter Question',
                    options:[],
                    required: true,
                },

            },

            {
                className: 'row',
                fieldGroup: [
                    {
                        className: 'col-xs-1',
                        type: 'checkbox',
                        key: 'chkbox_1',
                        "defaultValue": false,

                        templateOptions: {
                            //label: 'A'
                        }
                    },
                    {className: 'col-xs-4',
                        type: 'input',
                        key: 'option_number_1',
                        templateOptions: {
                            placeholder: 'Enter answer 1'
                        }
                        },
                    {
                        className: 'col-xs-1',
                        type: 'checkbox',
                        key: 'chkbox_2',
                        "defaultValue": false,
                        templateOptions: {
                            //label: 'A'
                        }
                    },
                    {className: 'col-xs-4',
                        type: 'input',
                        key: 'option_number_2',
                        templateOptions: {
                            placeholder: 'Enter answer 2'
                        },}]
            },

            {
                className: 'row',
                fieldGroup: [
                    {
                        className: 'col-xs-1',
                        type: 'checkbox',
                        key: 'chkbox_3',
                        "defaultValue": false,
                        templateOptions: {
                            //label: 'A'
                        }
                    },
                    {className: 'col-xs-4',
                        type: 'input',
                        key: 'option_number_3',
                        templateOptions: {
                            placeholder: 'Enter answer 3'
                        }
                    },
                    {
                        className: 'col-xs-1',
                        type: 'checkbox',
                        "defaultValue": false,
                        key: 'chkbox_4',
                        templateOptions: {
                            //label: 'A'
                        }
                    },
                    {className: 'col-xs-4',
                        type: 'input',
                        key: 'option_number_4',
                        templateOptions: {
                            placeholder: 'Enter answer 4'
                        },}]
            },
            {
                type: "radio",
                key: "name",
                templateOptions: {
                    label: "Name",
                    theme: "custom",
                    labelProp: "firstName",
                    valueProp: "id",
                    options: [
                        {firstName: "Sarah", id: 1},
                        {firstName: "Jessica", id: 2},
                        {firstName: "Parker", id: 3}
                    ]
                }
            },
            {
                key: 'difficulty_level',
                type: 'select',
                templateOptions: {
                    type: 'select',
                    label: 'Difficulty Level',
                    //valueProp:'_id',
                    //labelProp: 'course_title',
                    placeholder: 'Select option',
                    options:[{"name":"Easy",
                            "value":0},
                        {"name":"Medium",
                            "value":1},
                        {"name":"Difficult",
                            "value":2}],
                    required: true,
                    visible:false,
                    "onChange": function () {
                        //console.log(this.options);
                    }
                }
            }
        ];
    }]);
})();