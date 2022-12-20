
var headerMenu={
		getUserServiceMenu:function(){
			User.getUserServiceList(function(data){
				var allLink = "";
				if(data == null){
					return;
				}
				for(var i = 0; i<data.length; i++){
					var link = "<a href=\"" + data[i].href + "\">|"+ data[i].serviceName+"|</a>";
					allLink = allLink + link; 
				}
				dwr.util.setValue('userMenuSpan',allLink, {escapeHtml:false});
			});
		}
}


var logger = {
		debug:function(msg){
			if(window.console){
				console.log(msg);
			}
			else{
				alert(msg);
			}
		}
};

var pagination = {
		firstPage:1,
		changePage:function(page, pageElementID, pageCallback){
			$(pageElementID).val(page);
			pageCallback();
		},
		
		moveFirstPage:function(pageElementID, pageCallback){
			/*
			if(Number($(pageElementID).val() == pagination.firstPage)){
				alert("첫번째 페이지입니다.");
				return;
			}
			*/
			$(pageElementID).val(pagination.firstPage);
			pageCallback();
		},

		moveBeforePage:function(pageElementID, pageCallback){
			var movePage = Number($(pageElementID).val()) - 1;
			if(movePage < pagination.firstPage){
				alert("첫번째 페이지입니다.");
				return;
			}
			$(pageElementID).val(movePage);
			pageCallback();
		},

		moveNextPage:function(lastPage, pageElementID, pageCallback){
			var movePage = Number($(pageElementID).val()) + 1;
			if(movePage > lastPage){
				alert("마지막 페이지입니다.");
				return;
			}
			$(pageElementID).val(movePage);
			pageCallback();
		},

		moveLastPage:function(lastPage, pageElementID, pageCallback){
			/*
			if(Number($(pageElementID).val()) == lastPage){
				alert("마지막 페이지입니다.");
				return;
			}
			*/
			$(pageElementID).val(lastPage);
			pageCallback();
		},
		/*
		 * makeHtmlString 호출 시 pageCallback function의 내용에는 작은따옴표(')가 포함되어서는 안된다.
		 * 만약 function에 작은따옴표가 들어있다면, 별도의 callback function에서 pageCallback function을 호출하도록 정의한다.
		 * ex. 
		 	function pageCallback(){
				getInMappingPageList();
			}
		 */
		makeHtmlString:function(data, pageElementID, pageCallback){
			var html = "<ul class=\"pagination pull-right no-margin\">"
				+ "<li class=\"prev\"><a href='javascript:pagination.moveFirstPage(\"" + pageElementID + "\", " + pageCallback 
				+ ")'> <i class=\"icon-double-angle-left\"></i></a></li>"
				+ "<li class=\"prev\"><a href='javascript:pagination.moveBeforePage(\"" + pageElementID + "\", " + pageCallback
				+ ")'> <i class=\"icon-angle-left\"></i> </a></li>";
			
			for(var i = data.minPage; i <= data.maxPage; i++){
				if(i == Number($(pageElementID).val())){
					html += "<li class=\"active\">";
				}
				else{
					html += "<li>";
				}
				html += "<a href='javascript:pagination.changePage(" + i + ",\"" +pageElementID + "\", " + pageCallback + ")'>"+ i + "</a>"
						+  "</li>";
			}
			html += "<li class=\"next\"><a href='javascript:pagination.moveNextPage(" + data.endPage + ", \"" + pageElementID + "\", " + pageCallback 
				 +")'> <i class=\"icon-angle-right\"></i> </a></li> " 
				 + "<li class=\"next\"><a href='javascript:pagination.moveLastPage(" + data.endPage + ", \"" + pageElementID + "\", " + pageCallback
				 + ")'> <i class=\"icon-double-angle-right\"></i> </a></p>";
			html+="</ul>";
			return html;
		}
		
};
var tableController = {
	tableCreator:{
		rowCreator:function(options) {
		    var row = document.createElement("tr");
		    if(options.rowNum %2 == 0){
		    	row.className="evenRow";
		    }
		    else{
		    	row.className="oddRow";
		    }
		    return row;
		  }
		  ,cellCreator:function(options) {
		    var td = document.createElement("td");
//		    td.style.height="2em";
		    return td;
		  }
		  ,escapeHtml:false
	},
	nth:-1,
	tableCreatorHiddenNth:{
		rowCreator:function(options) {
		    var row = document.createElement("tr");
		    if(options.rowNum %2 == 0){
		    	row.className="evenRow";
		    }
		    else{
		    	row.className="oddRow";
		    }
		    return row;
		  }
		  ,cellCreator:function(options) {
		    var td = document.createElement("td");
		    if(options.cellNum == tableController.nth){
		    	td.style.visibility = "hidden";
		    }
		    return td;
		  }
		  ,escapeHtml:false
	},
	setHiddenNth:function(nth){
		tableController.nth = nth - 1;
	}
};

var comma = {
	setComma:function(str){
		str += '';
		x = str.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
//		return Number(String(str).replace(/\..*|[^\d]/g, "")).toLocaleString().slice(0,-3);
	},
	removeComma:function(str){
		return parseInt(str.replace(/,/g, ""));
	}
};


var string={
	getSomeShowString:function (list, count){
		var result = "";
		if(list == undefined || list == null){
			return result;
		}
		for(var i = 0; i < list.length; i++){
			if(i != 0){
				result += '<br/>';
			}
			if(i >= count){
				var extraCount = list.length - count; 
				result += '외에 ' + extraCount;
				break;
			}
			else{
				result += string.escapeHTML(list[i]);
			}
		}
		return result;
	},
	getSomeShowPhoneNumber:function(list, count){
		var result = "";
		if(list == undefined || list == null){
			return result;
		}
		for(var i = 0; i < list.length; i++){
			if(i != 0){
				result += '<br/>';
			}
			if(i >= count){
				var extraCount = list.length - count; 
				result += '외에 ' + extraCount +'개';
				break;
			}
			else{
				result += type.getPhoneNumberString(list[i]);
			}
		}
		return result;
	},
	newlineShowString:function (str, length){
		var addedBytes = 0;
		var convertStr = "";
		var totalBytes = string.getBytes(str);
		var destStr = "";
		
		if(totalBytes <= length){
			return string.escapeHTML(str);
		}
		for (var i = 0; i<str.length; i++) {
			addedBytes += (str.charCodeAt(i) > 128) ? 2 : 1;
			convertStr += str.charAt(i);
			if(addedBytes >= length){
				addedBytes = 0;
				destStr += string.escapeHTML(convertStr) + '<br/>';
				convertStr = "";
			}
		}
		if(convertStr != ''){
			destStr += string.escapeHTML(convertStr);
		}
		return destStr;
	},
	newlineShowStringWithMaxLine:function (str, length, maxLine){
		var addedBytes = 0;
		var convertStr = "";
		var totalBytes = string.getBytes(str);
		var lineCount = 0;
		var destStr = "";
		
		if(totalBytes <= length){
			return str;
		}
		for (var i = 0; i<str.length; i++) {
			addedBytes += (str.charCodeAt(i) > 128) ? 2 : 1;
			convertStr += str.charAt(i);
			if(addedBytes >= length){
				addedBytes = 0;
//				convertStr += '<br/>';
				destStr += string.escapeHTML(convertStr) + '<br/>';
				convertStr = "";
				lineCount++;
				if(lineCount >= maxLine){
					destStr += '...';
					break;
				}
			}
		}
		if(convertStr != ''){
			destStr += string.escapeHTML(convertStr);
		}
		return destStr;
	},
	getBytes:function(str){
		var bytes = 0;
		for (var i = 0; i<str.length; i++) {
			bytes += (str.charCodeAt(i) > 128) ? 2 : 1;
		}
		return bytes;
	},
	cutShowString:function (str, length){
		var bytes = 0;
		var cutStr = "";
		var totalBytes = string.getBytes(str); 
		if(totalBytes < length){
			return str;
		}
		
		for (var i = 0; i < str.length; i++) {
			bytes += (str.charCodeAt(i) > 128) ? 2 : 1;
			cutStr += str.charAt(i);
			if(bytes >= length){
				cutStr += '...';
				break;
			}
		}
		return cutStr;
	},
	makeCellPhoneNumberString:function(element){
		var text = element.val();
		text = getPhoneNumberString(text);
		element.val(text);
	},
	getPhoneNumberString:function(text){
		text = string.getOnlyNumberString(text);
		if(text.length >= 12){
			text = text.replace(/([0-9]{4})([0-9]{4})([0-9]+)/,"$1-$2-$3");
		}
		else if(text.length == 11){
			text = text.replace(/([0-9]{3})([0-9]{4})([0-9]+)/,"$1-$2-$3");
		}
		else if(text.length == 10){
			text = text.replace(/([0-9]{3})([0-9]{3})([0-9]+)/,"$1-$2-$3");
		}
		else if(text.length == 9){
			text = text.replace(/([0-9]{2})([0-9]{3})([0-9]+)/,"$1-$2-$3");
		}
		else if(text.length == 8){
			text = text.replace(/([0-9]{4})([0-9]+)/,"$1-$2");
		}
		else if(text.length > 4){
			text = text.replace(/([0-9]{3})([0-9]+)/,"$1-$2");
		}
		return text;
	},
	makeOnlyNumberString:function(str){
		var result = "";
		for (var i = 0; i < str.length; i++) {
			if($.isNumeric(str.charAt(i)) == true){
				result += str.charAt(i);
			}
			else{
				continue;
			}
		}
		return result;
	},
	getOnlyNumberString:function(str){
		var result = "";
		for (var i = 0; i < str.length; i++) {
			if($.isNumeric(str.charAt(i)) == true){
				result += str.charAt(i);
			}
			else{
				continue;
			}
		}
		return result;
	},
	makeDateString:function(elementId){
		var text = $(elementId).val();
		if(text.length == 4 || text.length == 7){
			$(elementId).val($(elementId).val() + '-');
			return 1;
		}
		return 0;
	},
	getDateTimeString:function(text){
		if(text.length <= 4){
			return this.getDateString(text);
		}
		else if(text.length <= 8){
			return this.getDateString(text);
		}
		else{
			return this.getDateString(text.substr(0, 8)) + " " + this.getTimeString(text.substr(8));
		}
	},
	getDateString:function(text){
		if(text.length <= 4){
			return text.replace(/([0-9]{2})([0-9]{2})/,"$1-$2");
		}
		return text.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/,"$1-$2-$3");
	},
	getTimeString:function(text){
		if(text.length <= 4){
			return text.replace(/([0-9]{2})([0-9]{2})/,"$1:$2");
		}
		return text.replace(/([0-9]{2})([0-9]{2})([0-9]{2})/,"$1:$2:$3");
		
	},
	makeDateTimeString:function(elementId){
		if(common.makeDateString(elementId) == 1){
			return 1;
		}
		var text = $(elementId).val();
		if(text.length == 10){
			$(elementId).val($(elementId).val() + ' ');
			return 1;
		}
		else if(text.length == 13 || text.length == 16){
			$(elementId).val($(elementId).val() + ':');
			return 1;
		}
		else if(text.length > 18){
			return -1;
		}
		return 0;
	},
	addComma:function(str){
		var reg =  /(^[+-]?\d+)(\d{3})/;
		var converted = String(str);
		while(reg.test(converted)){
			converted = converted.replace(reg, '$1' + ',' + '$2');
		}
//		var won = Number(String(str).replace(/\..*|[^\d]/g, "")).toLocaleString().slice(0,-3);
		return converted;
	},
	escapeHTML:function(str) {
	    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
	}
};


var error = {
	expiredSession:function(msg, exc){
		alert("세션이 만료되었습니다. 다시 로그인해주시기 바랍니다.");
		window.location.replace("login");
	},
	invalidRequestPop:function(msg, exc){
		alert("요청을 처리할 수 없습니다.");
		window.close();
	}
};
