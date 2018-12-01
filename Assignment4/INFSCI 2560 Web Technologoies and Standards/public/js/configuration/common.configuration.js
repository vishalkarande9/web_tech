(function () {
    angular.module(QuizUp).constant('$api', {
        base: "http://localhost:3000/api/", //Prathamesh
        account: {
            register: "account/register",
            login: "account/login",
            profile: "account/profile",

        },
        course:{
           get:"course/get",
            put:"course/add",
            post:"course/update",
            del:"course/delete"
        },
        section:{
            get:"section/get",
            put:"section/add",
            post:"section/update",
            del:"section/delete"
        },
        question:{
            get:"question/get",
            put:"question/add",
            post:"question/update",
            del:"question/delete"
        }
    }).constant('formlyExampleApiCheck', apiCheck())
        .config(['formlyConfigProvider', function (formlyConfigProvider) {
            formlyConfigProvider.setType({
                name: 'matchField',
                apiCheck: function () {
                    return {
                        data: {
                            fieldToMatch: formlyExampleApiCheck.string
                        }
                    }
                },
                apiCheckOptions: {
                    prefix: 'matchField type'
                },
                defaultOptions: function matchFieldDefaultOptions(options) {
                    return {
                        extras: {
                            validateOnModelChange: true
                        },
                        expressionProperties: {
                            'templateOptions.disabled': function (viewValue, modelValue, scope) {
                                let matchField = find(scope.fields, 'key', options.data.fieldToMatch);
                                if (!matchField) {
                                    throw new Error('Could not find a field for the key ' + options.data.fieldToMatch);
                                }
                                const model = options.data.modelToMatch || scope.model;
                                let originalValue = model[options.data.fieldToMatch];
                                const invalidOriginal = matchField.formControl && matchField.formControl.$invalid;
                                return !originalValue || invalidOriginal;
                            }
                        },
                        validators: {
                            fieldMatch: {
                                expression: function (viewValue, modelValue, fieldScope) {
                                    const value = modelValue || viewValue;
                                    const model = options.data.modelToMatch || fieldScope.model;
                                    return value === model[options.data.fieldToMatch];
                                },
                                message: options.data.matchFieldMessage || '"Must match"'
                            }
                        }
                    };

                    function find(array, prop, value) {
                        let foundItem;
                        array.some(function (item) {
                            if (item[prop] === value) {
                                foundItem = item;
                            }
                            return !!foundItem;
                        });
                        return foundItem;
                    }
                }
            });
        }]);
})();