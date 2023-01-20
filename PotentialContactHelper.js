({
    removePotentialContact: function (component, row) {
        var rows = component.get('v.data');
        var rowIndex = this.getRowIndex(rows, row);

        rows.splice(rowIndex, 1);
      //  this.updatePotentialContacts(component);
    },
    updatePotentialContacts: function (component) {
        var rows = cmp.get('v.data');
      //  var activeFilter = cmp.get('v.activeFilter');
        var filteredRows = rows;

        
    },
    sortData: function (component, fieldName, sortDirection) {
      var data = component.get("v.data.relatedPContacts");
      var reverse = sortDirection !== 'asc';
      //sorts the rows based on the column header that's clicked
      data.sort(this.sortBy(fieldName, reverse))
      for(var i=0; i < data.length; i++){
        data[i].RowNo = i + 1;
      }
      component.set("v.data.relatedPContacts", data);
      },

      sortBy: function (field, reverse) {
        if(field === "nameLink"){
          field = "Name";
      }
        if(field === "AccountLink"){
          field = "AccountName";
      }
      if(field === "contactNameLink"){
          field = "contactName";
      }
        var key = function(x){return x[field]}; //: function(x) {return x[field]};
        //checks if the two rows should switch places
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
});