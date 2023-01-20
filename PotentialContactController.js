({
    init: function (component, event, helper) {              
		
        const actions = [
            { label: 'Edit', name: 'edit' },
            { label: 'Send to Pardot', name: 'pardot' },
            { label: 'Show Details', name: 'details' }
        ];

        component.set('v.columns',[
            { label: 'No.', fieldName: 'RowNo'},
            { label: 'Potential Contact', fieldName: 'nameLink', type: 'url',sortable: true, typeAttributes: { label: { fieldName: "Name" }, target: "_blank",sortable: true }},
            { label: 'Interested in Events', fieldName: 'interestedCol', type:'icon', sortable: true, cellAttributes: {iconName: { fieldName: 'interestedCol'}, class: {"fieldName": "interestColor"} } }, 
            { label: 'Account Name', fieldName: 'AccountLink', type: 'url',sortable: true, typeAttributes: { label: { fieldName: "AccountName" }, target: "_blank" } },
            { label: 'Contact Status', fieldName: 'ContactStatus__c',sortable: true },
            { label: 'Contact Email', fieldName: 'ContactEmail', sortable: true },
            { label: 'Contact', fieldName: 'contactNameLink', type: 'url',sortable: true, typeAttributes: { label: { fieldName: "contactName" }, target: "_blank" } },
            { label: 'Status Colour', fieldName: 'statCol', type:'icon',sortable: true, cellAttributes: {iconName: { fieldName: 'statCol'}, class: {"fieldName": "color"} } },
            { label: 'Function Title', fieldName: 'FunctionTitle__c',sortable: true },
            { label: 'Notes', fieldName: 'Notes__c',sortable: true },
            { label: 'Pardot Hard Bounced', fieldName: 'Pardot_Hard_Bounced__c', type:'boolean',sortable: true },
            { label: 'Pardot Last Email Engagement', fieldName: 'Pardot_Last_Email_Engagement__c',sortable: true },
            { label: 'Level', fieldName: 'Execuitve_Level', sortable: true},
            {
                type: 'action',
                typeAttributes: { rowActions: actions },
            }

        ]);

        var action = component.get("c.getRelatedPotentialContacts");
        var pageRef = component.get("v.pageReference");
        component.set("v.recordId",pageRef.state.c__recordId);
     //   component.set("v.recordId",pageRef.attributes.c__recordId);
        action.setParams({
            "customEventId": component.get("v.recordId")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("response",response.getReturnValue());
                var rows = response.getReturnValue().relatedPContacts;
                if(rows != null){
                    var rowslength = rows.length;
                  //  var rowsUpd = [];
                    for(var i=0; i < rowslength; i++) {
                        
                        rows[i].nameLink = '/' + rows[i].Id;
                        rows[i].RowNo = i + 1; 
                        if(rows[i].Contact__c != undefined && rows[i].Contact__r.Account.Name != undefined){
                            rows[i].AccountName = rows[i].Contact__r.Account.Name; 
                        }
                        else{
                            rows[i].AccountName = "undefined"; 
                        }
                        
                        if(rows[i].Contact__c != undefined && rows[i].Contact__r.Interestinevents__c != undefined){
                            rows[i].interestedCol = rows[i].Contact__r.Interestinevents__c;
                            
                            switch(rows[i].Contact__r.Interestinevents__c){
                                    case 'Participated in previous event':
                                        rows[i].interestColor = 'green2';
                                        break;
                                    case 'Very interested':
                                        rows[i].interestColor = 'gold';
                                        break;
                                    case 'Generaly interested':
                                        rows[i].interestColor = 'grey';
                                        break;
                                    default:
                                        rows[i].interestColor = 'white';
                                        break;
                            } 
                        }
                        else{
                            rows[i].interestedCol = ''; 
                            rows[i].interestColor = 'white';
                        }
                      /*  if(rows[i].Contact__r.Interestinevents__c === undefined){
                            rows[i].interestedCol = '';
                           	rows[i].interestColor = 'white';
                        } */

                        if(rows[i].Contact__c != undefined && rows[i].Contact__r.AccountId != undefined){
                            rows[i].AccountLink = "/" + rows[i].Contact__r.AccountId; 
                        } 
                        else{
                            rows[i].AccountLink = "undefined";
                        }

                        if(rows[i].Contact__c != undefined && rows[i].Contact__r.Email != undefined){
                            rows[i].ContactEmail = rows[i].Contact__r.Email; 
                        } 
                        else{
                            rows[i].ContactEmail = "undefined";
                        }
                        
                        if(rows[i].Contact__c != undefined){
                            rows[i].contactNameLink = "/" + rows[i].Contact__c;
                        }
                        else{
                            rows[i].contactNameLink = "undefined";
                        }

                        if(rows[i].Contact__c != undefined && rows[i].Contact__r.Name != undefined){
                            rows[i].contactName = rows[i].Contact__r.Name;
                        }
                        else{
                            rows[i].contactName = "undefined";
                        }

                        if(rows[i].Status__c != undefined){
                          rows[i].statCol = rows[i].Status__c ;
                          
                          switch(rows[i].Status__c){
                                case 'interested':
                                    rows[i].color = 'yellow';
                                    break;
                                case 'planned meeting':
                                    rows[i].color = 'orangeacent';
                                    break;
                                case 'tentative':
                                    rows[i].color = 'orange';
                                    break;
                                case 'Registration':
                                    rows[i].color = 'green';
                                    break;
                                case 'To Do - individual contact':
                                    rows[i].color = 'lightblue';
                                    break;
                                case 'done - individual contact':
                                    rows[i].color = 'darkbluematt';
                                    break;
                                case 'Action 1':
                                    rows[i].color = 'lightgreen';
                                    break;
                                case 'Action 2':
                                    rows[i].color = 'lightblueshiny';
                                    break;
                                case 'Action 3':
                                    rows[i].color = 'lightpink';
                                    break;
                                case 'no time':
                                    rows[i].color = 'lightred';
                                    break;
                                case 'Registration next Event':
                                    rows[i].color = 'darkblue';
                                    break;
                                case 'Cancellation after Regi':
                                    rows[i].color = 'purple';
                                    break;
                                case 'Cancelled due to schedule':
                                    rows[i].color = 'brightgreenacent';
                                    break;
                                case 'No Interest':
                                    rows[i].color = 'red';
                                    break;
                                case 'Not relevant':
                                    rows[i].color = 'black1';
                                    break;
                                case 'Keynote Speaker':
                                    rows[i].color = 'darkgreen';
                                    break;
                                default:
                                    rows[i].color = 'white';
                                    break;
                          } 
                        }
                        else{
                            rows[i].statCol = '' ;
                          	rows[i].color = 'white';
                        }

                        if(rows[i].Pardot_Related_Contact_Id__c != undefined){  
                            rows[i].pardotContactId = rows[i].Pardot_Related_Contact_Id__c;
                        }

                        if(rows[i].Pardot_Related_Contact_Email__c != undefined){
                            rows[i].pardotContactEmail = rows[i].Pardot_Related_Contact_Email__c;
                        }

                        if(rows[i].Execuitve_Level__c != undefined){
                            rows[i].Execuitve_Level = rows[i].Execuitve_Level__c;
                        }
                        
                  //   rowsUpd.push(rows[i]);   
                    }
                }
                component.set('v.data.relatedPContacts', rows);  
                component.set('v.data.eventName', response.getReturnValue().eventName);

                component.set('v.data.count', response.getReturnValue().pContactCount);
				console.log('orgUrl --',response.getReturnValue().orgUrl);
                component.set("v.orgUrl",response.getReturnValue().orgUrl) ; 
                
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                 var errors = response.getError();
                 if (errors) {
                    if (errors[0] && errors[0].message) {
                       console.log("Error message: " + 
                                   errors[0].message);
                    }
                 } else {
                    console.log("Unknown error");
                 }
            }
        }); 
        $A.enqueueAction(action);
        
    },

    reInit: function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
    },

    hanldeEventClick:function(component,event,helper){
        var eUrl = $A.get("e.force:navigateToURL");
        var eventId = component.get('v.recordId');
        eUrl.setParams({
          "url": "/" + eventId
        });
        eUrl.fire(); 
    },

    handleEventHome:function(component,event,helper){
        var eHomeUrl = $A.get("e.force:navigateToURL");
        var orgUrl = component.get('v.orgUrl');
        console.log('orgUrl -',orgUrl);
        eHomeUrl.setParams({
          "url": orgUrl + "lightning/o/Event__c/home"
        });
        eHomeUrl.fire(); 
    },

    updateColumnSorting: function(component, event, helper) {
        var fieldName = event.getParam("fieldName");
        var sortDirection = event.getParam('sortDirection');
        // assign the latest attribute with the sorted column fieldName and sorted direction
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        helper.sortData(component, fieldName, sortDirection);
    },
    
        
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');

        switch (action.name) {
            case 'details':
                var row = event.getParam('row');
                var currentrecordId = row.Id; 
                var showRecordEvent = $A.get("e.force:navigateToURL");
                showRecordEvent.setParams({
                    "url": "/" + currentrecordId
                });
                showRecordEvent.fire();
                return;
                break;
            case 'edit':
                var row = event.getParam('row');
                var currentrecordId = row.Id; 
                var editRecordEvent = $A.get("e.force:editRecord");
                editRecordEvent.setParams({
                    "recordId": currentrecordId
                });
                editRecordEvent.fire();
                break;
            case 'pardot':
                var row = event.getParam('row');
                var currentrecordId = row.Id; 
                var pardotEmail = row.pardotContactEmail;
                var pardotContactId = row.pardotContactId;
                var pardotRecordEvent = $A.get("e.force:navigateToURL");
                pardotRecordEvent.setParams({
                   // "url": "/apex/AuraComponentRowButton?potentialContactId=" + pardotContactId 
                   "url": "/apex/pi__SendToPardot?contactEmail=" + encodeURI(pardotEmail) + "&contactId=" + pardotContactId + "&serverUrl={!$Api.Partner_Server_URL_90}"
                });
                pardotRecordEvent.fire();
                return;
                break;
        }
    }
});