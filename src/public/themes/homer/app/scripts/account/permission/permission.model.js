(function() { "use strict";
/**
 * @author ntd1712
 */
chaos.service("PermissionModel", Anonymous);

function Anonymous(AbstractModel) {
    function PermissionModel(data) {
        this.__super__.constructor.apply(this, [data, PermissionModel.getFields()]);
    }
    extend(PermissionModel, AbstractModel);

    /**
     * @returns {string}
     */
    PermissionModel.getRoute = function() {
        return "permission";
    };

    /**
     * @return {Object[]}
     */
    PermissionModel.getFields = function() {
        return [{
            data: "Id",
            value: 0,
            visible: false
        },{
            data: "Name",
            title: "Name",
            value: "",
            class: "col-xs-4"
        },{
            data: "Description",
            title: "Description",
            value: "",
            class: "text-wrap",
            sortable: false
        }];
    };

    return PermissionModel;
}

})();