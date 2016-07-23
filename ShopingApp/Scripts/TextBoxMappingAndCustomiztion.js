function add() {
    $("#Name").val("");
    $("#Desscription").val("");
    $("#SID").val("");
    $("#StartDate").val("");
    $("#EndDate").val("");
    $("#SID").val("");
    $("#Type").val("");
    $("#order_number").val("");
    $("#check").show();
    $("#order").hide();
   //$("#aEdit").hide();
    $("#Name").removeAttr("disabled");
    $("#Desscription").removeAttr("disabled");
    $("#StartDate").removeAttr("disabled");
    $("#EndDate").removeAttr("disabled");
    $("#SID").removeAttr("disabled");
    $("#Type").removeAttr("disabled");
    $("#order_number").removeAttr("disabled");
    ////add textbox class
    //$("#Desscription").addClass("text-field");
    //$("#Desscription").addClass("text-field");
    //$("#StartDate").addClass("text-field");
    //$("#EndDate").addClass("text-field");
  }
function editdata() {
    $("#check").show();

    $("#order").hide();

    $("#Name").removeAttr("disabled");

    $("#Desscription").removeAttr("disabled");

    $("#StartDate").removeAttr("disabled");

    $("#EndDate").removeAttr("disabled");

   // $("#SID").removeAttr("disabled");

    $("#Type").removeAttr("disabled");

   // $("#order_number").removeAttr("disabled");

    //add css for textboxes
    $("#Name").addClass("text-field").removeAttr("style");
    $("#Desscription").addClass("text-field").removeAttr("style");
    $("#StartDate").addClass("text-field").removeAttr("style");
    $("#EndDate").addClass("text-field").removeAttr("style");
   // $("#SID").addClass("dropdown basic").removeAttr("style");
    $("#Type").addClass("dropdown basic").removeAttr("style");
    //$("#order_number").addClass("dropdown basic").removeAttr("style");

}
function showreverse() {
    $("#check").hide();
    $("#order").show();
    //add css for textboxes
    $("#Name").addClass("text-field").removeAttr("style");
    $("#Desscription").addClass("text-field").removeAttr("style");
    $("#StartDate").addClass("text-field").removeAttr("style");
    $("#EndDate").addClass("text-field").removeAttr("style");
   // $("#SID").addClass("dropdown basic").removeAttr("style");
    $("#Type").addClass("dropdown basic").removeAttr("style");
   // $("#order_number").addClass("dropdown basic").removeAttr("style");
    
}