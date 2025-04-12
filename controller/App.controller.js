sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/ValueState",
    "sap/ui/model/json/JSONModel"
  ], function (Controller, MessageToast, ValueState, JSONModel) {
    "use strict";
  
    return Controller.extend("sapapp.controller.App", {
      onInit: function () {
        // Load employee data from local JSON file
        var oModel = new JSONModel();
        oModel.loadData("data.json"); // path relative to webapp/
        this.getView().setModel(oModel, "employeeModel");
  
        // Debug: confirm data loaded
        oModel.attachRequestCompleted(function () {
          console.log("Employee data loaded:", oModel.getData());
        });
      },
  
      onGreet: function () {
        var oNameInput = this.byId("nameInput");
        var oEmailInput = this.byId("emailInput");
  
        var sName = oNameInput.getValue();
        var sEmail = oEmailInput.getValue();
  
        // Reset Styles
        oNameInput.setValueState(ValueState.None);
        oEmailInput.setValueState(ValueState.None);
  
        // Validation check
        if (!sName && !sEmail) {
          MessageToast.show("Please enter both name and email!");
          oNameInput.setValueState(ValueState.Error);
          oEmailInput.setValueState(ValueState.Error);
          return;
        }
  
        if (!sName) {
          MessageToast.show("Please enter your name!");
          oNameInput.setValueState(ValueState.Error);
          return;
        }
  
        if (!sEmail) {
          MessageToast.show("Please enter your email!");
          oEmailInput.setValueState(ValueState.Error);
          return;
        }
  
        // Email format validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(sEmail)) {
          oEmailInput.setValueState(ValueState.Error);
          MessageToast.show("Please enter a valid email address.");
          return;
        }
  
        // Show greeting
        var oText = this.byId("greetingText");
        oText.setText("Hello, " + sName + "! Your email is " + sEmail);
  
        MessageToast.show("Greeting displayed!");
      }
    });
  });
  