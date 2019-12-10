Date.prototype.toISOString = function () {

    return this.getUTCFullYear()
      + '-' + pad(this.getUTCMonth() + 1, 2)
      + '-' + pad(this.getUTCDate(), 2)
      + 'T' + pad(this.getUTCHours(), 2)
      + ':' + pad(this.getUTCMinutes(), 2)
      + ':' + pad(this.getUTCSeconds(), 2)
      + '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5)
      + 'Z';

};
Date.prototype.toISODateString = function (h, m) {
//debugger;
    if (h == null)
        h = 0;
    if (m == null)
        m = 0
    return this.getUTCFullYear()
      + '-' + pad(this.getUTCMonth() + 1, 2)
      + '-' + pad(this.getUTCDate(), 2)
      + 'T' + pad(h,2)
      + ':' + pad(m, 2)
      + ':' + "00"
      + '.' + "000"
      + 'Z';

};
function getISODateString(y,m,d,h, min)
{
  if (h == null)
        h = 0;
    if (min == null)
        min = 0
    return y
      + '-' + pad(m, 2)
      + '-' + pad(d, 2)
      + 'T' + pad(h,2)
      + ':' + pad(min, 2)
      + ':' + "00"
      + '.' + "000"
      + 'Z';


}
function daysBetween(first, second) {
    var one; 
    var two;
	
	if(first[first.length-1] == "Z")
	{
		var f = first.split('T')[0].split('-');
		
		var s = second.split('T')[0].split('-');
	    one = new Date(Number(f[0]), Number(f[1]), Number(f[2]));
     
	    two = new Date(Number(s[0]), Number(s[1]), Number(s[2]));
		
	}
	else
{
    var f = new Date(first);
    var s = new Date(second);
    // Copy date parts of the timestamps, discarding the time parts.
    one = new Date(f.getFullYear(), f.getMonth(), f.getDate());
     
    two = new Date(s.getFullYear(), s.getMonth(), s.getDate());
}
    // Do the math.
    var millisecondsPerDay = 1000 * 60 * 60 * 24;
    var millisBetween = two.getTime() - one.getTime();
    var days = millisBetween / millisecondsPerDay;

    // Round down.
    return Math.floor(days);
}
function pad(val, len) {
    var strVal = val.toString();
    while (strVal.length < len) {
        strVal = "0" + strVal;
    }
    return strVal;

}
function gDateValue(pdate,h,m) {
    //debugger;
    var dateParts = pdate.split('/');

    var jd = $.calendars.newDate(Number(dateParts[0]), Number(dateParts[1]), Number(dateParts[2]), 'persian', 'fa');
    if(h == null)
    	return jd.toJSDate().toISODateString();
    return jd.toJSDate().toISODateString(h,m);
}
function pDateValue(gdate) {
   // debugger;
    var d = gdate.split('T')[0].split('-');
    var jd = $.calendars.instance('gregorian').newDate(Number(d[0]), Number(d[1]), Number(d[2])).toJD();
    var date = $.calendars.instance('persian').fromJD(jd);
    return date.formatYear() + "/" + date.month() + "/" + date.day() + " " + date.calendar().regionalOptions['fa'].dayNames[date.dayOfWeek()];
}
function pDateValueShort(gdate,offset) {
   // debugger;
    var d = gdate.split('T')[0].split('-');
    var jd = $.calendars.instance('gregorian').newDate(Number(d[0]), Number(d[1]), Number(d[2])).toJD();
    var date = $.calendars.instance('persian').fromJD(jd);
    if(offset != null)
    date.add(offset,'d');
    return date.formatYear() + "/" + pad(date.month(),2) + "/" + pad(date.day(),2);
}

function loadQueryRequest(list, callback, query)
{
    var loadAction = function () {
        var clientContext = SP.ClientContext.get_current();
        var web = clientContext.get_web();
        var oList = web.get_lists().getById(list);


        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(query);
         var collListItem = oList.getItems(camlQuery);

        clientContext.load(collListItem);

        clientContext.executeQueryAsync(function () {
            var listItemEnumerator = collListItem.getEnumerator();

            while (listItemEnumerator.moveNext()) {
                var oListItem = listItemEnumerator.get_current();
                callback(oListItem);
            }

        }, function () { });
    };
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', loadAction);
}
function loadRequest(url, callback,async) {
	if(async == null)
		async = true;
    $.ajax({
        url: url,
        type: "GET",
        async : async,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: callback,
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });

}
function loadRestRequest(url, callback) {
var async = true;
var res = null;
	if(callback == null)
	{
		async = false;
		callback = function(data){
			res =  data.d;
		}
	}
    $.ajax({
        url: url,
        type: "GET",
        async : async,
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: callback,
        error: function (error) {
            alert(JSON.stringify(error));
        }
    });
    return res;

}

function addNewItem(url, data, successCallback, errorCallback) {
    if (successCallback == null)
        successCallback = function (data) {
            console.log(data);
        }
    if (errorCallback == null)
        errorCallback = function (error) {
            alert(JSON.stringify(error));
        }
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + url,
        type: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(data),
        success: successCallback
        ,
        error: errorCallback
    }
    );
}
function updateItem(url, data, successCallback, errorCallback) {
    if (successCallback == null)
        successCallback = function (data) {
            console.log(data);
        }
    if(errorCallback == null)
        errorCallback = function (error) {
            alert(JSON.stringify(error));
        }
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + url,
        type: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose",
            "X-HTTP-Method": "MERGE",
            "If-Match": "*"
        },
        data: JSON.stringify(data),
        success: successCallback,
        error: errorCallback
    });
}


function getQueryStringValue(qname) {
    var index = location.href.toLowerCase().indexOf(qname.toLowerCase() + '=')
    if (index> -1) {
    	index = index + qname.length +1;
        var val = location.href.substring(index);
        return val.split("&")[0];
    }
    return "";
}
function getCurrentRowId(tr)
{
    return tr.attr("iid").split(',')[1].split(',')[0];
}
function getValueFromRow(tr,colunmIndex)
{
   // debugger;
    return tr.find('.ms-vb2').eq(colunmIndex).text();
}
function getLookupIdFromRow(tr, colunmIndex) {
    return tr.find('.ms-vb2').eq(colunmIndex).find('a').attr('href').split('ID=')[1].split('&')[0];
}

function dialogOpener(url, title, dialogResultCallback, width, height) {
    if (url.length < 2)
        return;
    var Option = {
        url: url,
        allowMaximize : false
    };

    if (width != null)
        Option.width = width;
    if (height != null)
        Option.height = height;

    if (title != null)
        Option.title = title;
    if (dialogResultCallback != null)
        Option.dialogReturnValueCallback = dialogResultCallback;

    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', Option);
}
function getSearchQuery() {
    return "<View><Query>" + $('input[name$="HiddenFieldQuery"]').val() + "</Query></View>";
}




//For exp as excell : InternetOptions -> Security Tab -> Custom Level -> Initialize and script Activex Controls not market as safe for scripting-> enable(Not Secure)
function exportToExcel(tablename) // Function to Export the Table Data to Excel.
    {
        //var isIEBrowser = isIE();
        var isIEBrowser = true;
        if (isIEBrowser == false) {
            alert('Please use Internet Explorer for Excel Export Functionality.');
            return false;
        }
        else {
            var strTableID = tablename; // It's the Table ID of Table in Webpart
            var detailsTable = document.getElementById(strTableID);
            var objExcel = new ActiveXObject("Excel.Application");
            var objWorkBook = objExcel.Workbooks.Add;
            var objWorkSheet = objWorkBook.Worksheets(1);

            for (var intRowIndex = 0; intRowIndex < detailsTable.rows.length; intRowIndex++) {
                var columnCount = detailsTable.rows(intRowIndex).cells.length;
                for (var intColumnIndex = 0; intColumnIndex < columnCount; intColumnIndex++) {
                    //if (intColumnIndex != 3)
                    objWorkSheet.Cells(intRowIndex + 1, columnCount - intColumnIndex) = detailsTable.rows(intRowIndex).cells(intColumnIndex).innerText;
                }
            }
            objExcel.Visible = true;
            objExcel.UserControl = true;
        }
    }
    
    
    
    function fnExcelReport(tablename)
	{
	    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
	    var textRange; var j=0;
	    tab = document.getElementById(tablename); // id of table
	
	    for(j = 0 ; j < tab.rows.length ; j++) 
	    {     
	        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
	        //tab_text=tab_text+"</tr>";
	    }
	
	    tab_text=tab_text+"</table>";
	    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
	    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
	    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
	
	    var ua = window.navigator.userAgent;
	    var msie = ua.indexOf("MSIE "); 
	
	    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
	    {
	        txtArea1.document.open("txt/html","replace");
	        txtArea1.document.write(tab_text);
	        txtArea1.document.close();
	        txtArea1.focus(); 
	        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
	    }  
	    else                 //other browser not tested on IE 11
	        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  
	
	    return (sa);
	}
	
	
	
	
	function fnExcelReport2(id, name) {
  var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
  tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
  tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
  tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
  tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
  tab_text = tab_text + "<table border='1px'>";
  var exportTable = $('#' + id).clone();
  exportTable.find('input').each(function (index, elem) { $(elem).remove(); });
  tab_text = tab_text + exportTable.html();
  tab_text = tab_text + '</table></body></html>';
  var fileName = name + '_' + parseInt(Math.random() * 10000000000) + '.xls';

  //Save the file
  var blob = new Blob([tab_text], { type: "application/vnd.ms-excel;charset=utf-8" })
  window.saveAs(blob, fileName);
}






