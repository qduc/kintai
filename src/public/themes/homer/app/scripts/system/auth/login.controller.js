(function() { "use strict";
/**
 * @author ntd1712
 */
angular.module("homer").controller("LoginController", Anonymous);

function Anonymous($scope, LoginRepository, AbstractController) {
    function LoginController() {
        this.__super__.constructor.apply(this, arguments);
    }
    extend(LoginController, AbstractController);

    LoginController.prototype.login = function(model) {
        this.repository.store(model).then(
            function(response) {
                delete $scope.$parent.error;
                Lockr.set(CFG.session.cookie + "_jwt", response.data.token);
                $scope.$state.go(CFG.app.defaultRoute, {}, { reload: true });
            },
            function(response) {
                $scope.$parent.error = response.data.error || t("COULD_NOT_LOG_IN");
            });

        return this;
    };

    LoginController.prototype.logout = function(model) {
        this.repository.store(model)
            .then(function() {
                $scope.$state.go("login", {}, { reload: true });
            })
            .finally(function() {
                Lockr.rm(CFG.session.cookie + "_jwt");
            });

        return this;
    };

    LoginController.prototype.recovery = function(model) {
        this.repository.store(model).then(
            function() {
                delete $scope.$parent.error;
                $scope.$parent.toast = "PLEASE_CHECK_YOUR_EMAIL_FOR_THE_RESET_PASSWORD_INSTRUCTIONS";
                $scope.$state.go("login", {}, { reload: true });
            },
            function(response) {
                $scope.$parent.error = response.data.error || t("YOUR_EMAIL_IS_INVALID");
            });

        return this;
    };

    LoginController.prototype.reset = function(model) {
        if (model.password !== model.confirmPassword) {
            return $scope.$parent.error = t("PASSWORD_DOES_NOT_MATCH_THE_CONFIRM_PASSWORD");
        }

        this.repository.store(model).then(
            function() {
                delete $scope.$parent.error;
                $scope.$state.go("login", {}, { reload: true });
            },
            function(response) {
                $scope.$parent.error = response.data.error || t("COULD_NOT_RESET_PASSWORD");
            });

        return this;
    };

    return LoginController.newInstance(arguments);
}

})();