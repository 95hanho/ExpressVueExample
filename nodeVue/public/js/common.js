var common = {
		debug:function(msg){
			console.log(msg);
		},
		popup:function(mylink, windowname) 
		{
			return this.popup(mylink, windowname, 400, 200);
		},

		popup:function(mylink, windowname, width, height)
		{
			if (! window.focus){
				return;
			}
			var href;
			if (typeof(mylink) == 'string'){
			   href=mylink;
			}
			else{
			   href=mylink.href;
			}
			window.open(href, windowname, 'width=' + width + ',height=' + height + ',scrollbars=yes');
			return;
		},
		
		popup2:function(mylink, windowname, width, height)
		{
			if (! window.focus){
				return;
			}
			var href;
			if (typeof(mylink) == 'string'){
			   href=mylink;
			}
			else{
			   href=mylink.href;
			}
			window.open(href, windowname, 'width=' + width + ',height=' + height + ',scrollbars=yes,resizable=yes');
			return;
		},
		
		popupCurrentPosition:function(event, mylink, windowname, width, height)
		{
			if (! window.focus){
				return;
			}
			var href;
			if (typeof(mylink) == 'string'){
			   href=mylink;
			}
			else{
			   href=mylink.href;
			}
			var xcoor = event.screenX;
			var ycoor = event.screenY;
			window.open(href, windowname, 'width=' + width + ',height=' + height + ', left=' + xcoor + ', top=' + ycoor + ',scrollbars=no,status=no,toolbar=no,menubar=no,directories=no,location=no');
			return;
		},
		closeSelf:function()
		{
			window.close();
		},
		
		encodeURIStr:function(uri){
			return encodeURIComponent(uri);
		},
		
		doAction:function(url, method){
			$.ajax({
				url: url,
				type: method,
				dataType: "html",
				timeout: 3000,
				complete: function(res) {
//					console.log(res);
			   }
			});
		},
		urlParam:function(name){
			var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
			return results[1] || '';
		},
			
		hideShow:function(name, idx, funcArray){
			var showWrap = '#' + name + idx;
			var arrayIdx = Number(idx) - 1;
			$('.' + name).hide();
			$(showWrap).show();
			if(arrayIdx < 0 || funcArray.length <= arrayIdx){
				alert("잘못된 접근입니다.");
				return;
			}
			funcArray[arrayIdx]();
		},
		loadPage:function(name, idx, array){
			var arrayIdx = Number(idx) - 1;
			if(arrayIdx < 0 || array.length <= arrayIdx){
				alert("잘못된 접근입니다.");
				return;
			}
			$("#" + name).load(array[arrayIdx]);
		},

		serviceCallback:function(data, successCallback){
			if(data.resultCode == "00"){
				successCallback();
			}
			else{
				alert(data.resultMessage);
			}
		},
		getSendType:function(){
			return 'send';
		},
		getReceivedType:function(){
			return 'received';
		}
		,
		dwrErrorHandler:function(errorString, exception){
			logger.debug(errorString);
			logger.debug(exception);
		}
};


var type = {
		getPhoneNumberType:function(phoneNumber){
			var length = phoneNumber.length;
			if(length >= 9){
				return phoneNumber.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
			}
			else if(length == 8 || length == 7){
				return phoneNumber.replace(/(^01.{1}|[0-9]+)([0-9]{4})/, "$1-$2");
			}
			else if(length > 3){
				return phoneNumber.replace(/([0-9]{3})([0-9]+)/, "$1-$2");
			}
			else{
				return phoneNumber;
			}
			return convert;
		},
		onlyNumberTypeEvent:function(event){
			if (event.which && ((event.which > 47 && event.which < 58) || event.which == 8)) {
				return;
		    } else {
		        event.preventDefault();
		    }
		},
		onlyNumberAndBarTypeEvent:function(event){
			if(event.which == 45){
				return;
			}
			type.onlyNumberTypeEvent(event);
		}
};
