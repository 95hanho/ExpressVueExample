
var setStatusArr = ['작동중지','작동중'];
var calledItemCount = 100;

function getUseYnStr(useYn){
	if(useYn == 'Y'){
		return "ON";
	}
	else{
		return "OFF";
	}
}

function loadSetPage(){
	dwr.engine.setErrorHandler(error.expiredSession);
	$('#acsSetShowItemCountSelector').change(function(){
		getSetPageInfo();
	});
	getSetPageInfo();
}

function setPageCallback(){
	getSetPageInfo();
}

/*
 * set 조회
 */
function getSetPageInfo(){
	SetService.getSetPageInfo(
		$('#acsSetName').val()
		, $("#acsSetUseYnSelector option:selected").val()
		, $("#acsSetStatusSelector option:selected").val()
		, $('#acsSetCurrentPage').val()
		, $("#acsSetShowItemCountSelector option:selected").val()
		, function(data){
			if(data.totalCount < $("#acsSetShowItemCountSelector option:selected").val()){
				$('#acsSetPageSelectorDiv')[0].innerHTML = "";
			}
			else{
				$('#acsSetPageSelectorDiv')[0].innerHTML = pagination.makeHtmlString(data, "#acsSetCurrentPage", setPageCallback);
			}
			if(data != null){
				getAcsSetList(data.minItem);
			}
			
		});
}

var mentCellFuncs = [
	function(data) {return data.setName;},
	function(data) {return data.mentName;},
	function(data) {return string.addComma(data.calledCount);},
	function(data) {return data.acsOnDateTime;},
	function(data) {
		var href = "<div class='action-buttons' style='text-align:center'>";
		if(data.setStatus == '0' && data.useYn == 'Y'){
			//예약상태
			href += "<i class='icon-calendar blue bigger-130' title=\"통화 발생이 예약되어 있습니다. 자동 시작일시가 되면 자등으로 통화 발생을 시작합니다.\"></i>";
		}
		else if(data.setStatus == '0'){
			href += "<i class='icon-pause grey bigger-130' title=\"통화 발생이 중지되어 있습니다.\"></i>";
		}
		else{
			href += "<i class='icon-play green bigger-130' title=\"통화 발생중입니다.\"></i>";
		}
		href+="</div>";
		return href;
	},
	function(data) {
		var href =
			"<div class='action-buttons' style='text-align:center'>"
			+ "<a class='green' title=\"상세보기\" href=\"javascript:openAcsSetDetailPop(\'" + data.setIdx + "\')\"><i class='icon-search bigger-130'></i></a>";
		
		if(data.setStatus == '0'){
			if(data.useYn == 'Y'){
			//예약상태
				href += "<a class='grey' title=\"예약 상태\" href=\"javascript:alert('예약된 설정은 수동으로 on/off할 수 없습니다.')\"><i class='icon-calendar bigger-130'></i></a>";
			}
			else{
				if(data.calledCount > 0){
					href += "<a class='red' title=\"호 발생 시작\" href=\"javascript:startSet(\'" + data.setIdx + "\')\"><i class='icon-play bigger-130'></i></a>";
				}
				else{
					href += "<a class='grey' title=\"등록된 착신번호가 없습니다. 착신번호를 추가하세요.\" href=\"javascript:alert('등록된 착신번호가 없습니다. 착신번호를 추가하세요.')\"><i class='icon-play bigger-130'></i></a>"
				}
			}
			href += "<a class='blue' title=\"수정\" href=\"javascript:openAcsSetUpdatePop(\'" + data.setIdx + "\')\"><i class='icon-cog bigger-130'></i></a>"
					+ "<a class='blue' title=\"착신번호관리\" href=\"javascript:openManageCalledNumberPop(\'" + data.setIdx + "\')\"><i class='icon-th-list bigger-130'></i></a>"
					
					+ "<a class='red' title=\"삭제\" href=\"javascript:deleteAcsSet(\'" + data.setIdx + "\')\"><i class='icon-trash bigger-130'></i></a>";
		}
		else{
			href+= "<a class='blue' title=\"호 발생 중지\" href=\"javascript:stopSet(\'" + data.setIdx + "\')\"><i class='icon-pause bigger-130'></i></a>"
				+ "<a class='grey' title=\"활성화된 상태에서 수정할 수 없습니다.\" href=\"#\"><i class='icon-cog bigger-130'></i></a>"
				+ "<a class='green' title=\"착신번호보기\" href=\"javascript:openShowCalledNumberPop(\'" + data.setIdx + "\')\"><i class='icon-th-list bigger-130'></i></a>"
				+ "<a class='grey' title=\"활성화된 상태에서 삭제할 수 없습니다.\" href=\"#\"><i class='icon-trash bigger-130'></i></a>";
		}
		href += "</div>";
		return href;
	}
];


function getAcsSetList(minItem){
	SetService.getAcsSetList(
		$('#acsSetName').val()
		, $("#acsSetUseYnSelector option:selected").val()
		, $("#acsSetStatusSelector option:selected").val()
		, minItem 
		, $("#acsSetShowItemCountSelector option:selected").val()
		, function(data){
			dwr.util.removeAllRows("acsSetTbody");
			dwr.util.addRows("acsSetTbody", data, mentCellFuncs, tableController.tableCreator);
	});
}

function openAcsSetDetailPop(setIdx){
	var url = "openAcsSetDetailPop?setIdx="+setIdx;
	common.popup(url, '설정조회', 600, 450);
}

function openAcsSetInsertPop(){
	var url = "openAcsSetInsertPop";
	common.popup(url, '설정추가',  630, 520);
}

function openAcsSetUpdatePop(setIdx){
	var url = "openAcsSetUpdatePop?setIdx="+setIdx;
	common.popup(url, '설정수정', 600, 490);
}

function startSet(setIdx){
	if(confirm("해당 캠페인의 전화를 시작하시겠습니까?") == false){
		return;
	}
	SetService.changeSetStatus(
		setIdx
		, 'Y' //start
		, function(data){
			if(data != null){
				if(data.resultCode == '00' || data.resultCode == '45'){
					$('#acsSetCurrentPage').val("1");
					getSetPageInfo();
				}
				alert(data.resultMessage);
			}
	});
}

function stopSet(setIdx){
	if(confirm("해당 캠페인의 전화를 중지하시겠습니까?") == false){
		return;
	}
	SetService.changeSetStatus(
		setIdx
		, 'N' //stop
		, function(data){
			if(data != null){
				if(data.resultCode == '00'){
					$('#acsSetCurrentPage').val("1");
					getSetPageInfo();
				}
				alert(data.resultMessage);
			}
	});
}

var testCallFlag = 0;
function initInsertPop(){
	dwr.engine.setErrorHandler(error.invalidRequestPop);
	moveDiv('1');
	getMentList();
	getCallerList();
	$(".acsReservePicker").prop('disabled', true);
	
	$('.acsOnDateTimeRadio').change(function(){
		if($(".acsOnDateTimeRadio:checked").val() == 'M'){
			$(".acsReservePicker").prop('disabled', true);
		}
		else{
			$(".acsReservePicker").prop('disabled', false);
		}
	});

	$('#acsOnDatePicker').datepicker({
       	format:'yyyy-mm-dd',
            "autoclose": true
       });
	$("#acsOnDatePicker").datepicker('update',new Date());
	
	$('#acsOnTimePicker').timepicker({
		minuteStep: 1,
		secondStep: 1,
		showMeridian: false,
		showSeconds: true
	});
	
	$("#acsTestPhoneNumber").keypress(function(event){
		type.onlyNumberAndBarTypeEvent(event);
	});
	$("#calledNumber").keypress(function(event){
		type.onlyNumberAndBarTypeEvent(event);
	});
	

	$('#acsMentSelector').change(function(){
		testCallFlag = 0;
	});
	
	testCallFlag = 0;
}


function moveDiv(page){
	if($("#actionStatus").html() != ""){
		return;
	}
	
	if(page == '1'){
		$("#acsSetDiv").show();
		$("#acsCalledList").hide();
		$("#setComplete").hide();
	}
	else if(page == '2'){
		if($('#acsSetName').val() == ''){
			alert("설정명을 입력하세요.");
			return moveDiv('1');
		}
		if($("#acsMentSelector option:selected").val() == '0'){
			alert("안내 멘트를 선택하세요.");
			return moveDiv('1');
		}
		
		if(testCallFlag == 0){
			alert("테스트 전화로 먼저 음원을 테스트해야 합니다.");
			return moveDiv('1');
		}
		
		if($(".acsOnDateTimeRadio:checked").val() == 'A'){
			if($("#acsOnDatePicker").val() == ''){
				alert("시작일시 지정시 서비스 시작일을 입력하셔야 합니다.");
				return moveDiv('1');
			}
			if($("#acsOnTimePicker").val() == ''){
				alert("시작일시 지정시 서비스 시작 시간을 입력하셔야 합니다.");
				return moveDiv('1');
			}
		}
		
		$("#acsSetDiv").hide();
		$("#acsCalledList").show();
		$("#setComplete").hide();
	}
	else if(page == '3'){
		$("#acsSetDiv").hide();
		$("#acsCalledList").hide();
		$("#setComplete").show();
	}
}

function initUpdatePop(){
	dwr.engine.setErrorHandler(error.invalidRequestPop);
	
	$('#acsMentSelector').change(function(){
		testCallFlag = 0;
	});
	
	SetService.getSetInfoBySetIdx(
		$("#setIdx").val()
		, function(set){
			if(set != null){
				$("#acsSetName").val(set.setName);
				$("#oldMentIdx").val(set.mentIdx);
				Ment.getAcsMentListForSelctor(
					function(data){
						if(data != null){
							dwr.util.removeAllOptions("acsMentSelector");
							dwr.util.addOptions("acsMentSelector", data, function(data){return data.mentIdx;}, function(data){return data.mentName;});
							$("#acsMentSelector").val(set.mentIdx);
						}
						else{
							alert("등록된 안내가 없습니다.");
							window.close();
						}
				});
				
				SetService.getCallerList(
					function(data){
						if(data != null && data.length > 0){
							if(data.length > 1){
								$("#acsCallerDiv").show();
							}
							dwr.util.removeAllOptions("acsCallerSelector");
							dwr.util.addOptions("acsCallerSelector", data, function(data){return data.callerIdx;}, function(data){return data.tmNumber + "[" + data.callerNumber+"]";});
							$("#acsCallerSelector").val(set.callerIdx);
						}
						else{
							alert("등록된 번호가 없습니다. 관리자에게 문의하세요.");
							window.close();
						}
				});
				
				$('.acsOnDateTimeRadio').change(function(){
					if($(".acsOnDateTimeRadio:checked").val() == 'M'){
						$(".acsReservePicker").prop('disabled', true);
					}
					else{
						$(".acsReservePicker").prop('disabled', false);
					}
				});

				$('#acsOnDatePicker').datepicker({
			       	format:'yyyy-mm-dd',
			            "autoclose": true
			       });
				$("#acsOnDatePicker").datepicker('update',new Date());
				
				$('#acsOnTimePicker').timepicker({
					minuteStep: 1,
					secondStep: 1,
					showMeridian: false,
					showSeconds: true
				});
				
				if(set.acsOnDateTime != ''){
					
					$('input:radio[name=acsOnDateTimeRadio]').filter("[value='A']").attr('checked', true);
					$(".acsReservePicker").prop('disabled', false);
					$('#acsOnDatePicker').val(set.acsOnDateTime.substr(0, 10));
					$('#acsOnTimePicker').val(set.acsOnDateTime.substr(11, 19));
				}
				else{
					$(".acsReservePicker").prop('disabled', true);
				}
				
				testCallFlag = 0;
				$("#acsTestPhoneNumber").keypress(function(event){
					type.onlyNumberAndBarTypeEvent(event);
				});
			}
			else{
				alert("잘못된 설정입니다.");
				window.close();
			}
	});
	
}


function initDetailPop(){
	dwr.engine.setErrorHandler(error.invalidRequestPop);
	SetService.getSetInfoBySetIdx(
		$("#setIdx").val()
		, function(data){
			if(data != null){
				$("#setName").text(data.setName);
				$("#setStatus").text(setStatusArr[data.setStatus]);
				$("#useYn").text(getUseYnStr(data.useYn));
				
				
				if(data.acsOnDateTime != ''){
					$("#acsOnDateTime").text(data.acsOnDateTime);
				}
				else{
					$(".reserveLine").hide();
				}
				$("#modDate").text(data.modDate);
				
				$("#callerNumber").text(string.getPhoneNumberString(data.callerNumber));
//				$("#tmNumber").text(string.getPhoneNumberString(data.tmNumber));
				$("#calledCount").text(string.addComma(data.calledCount));
				
				$("#mentName").text(data.mentName);
				$("#mentDesc").text(data.mentDesc);
			}
	});
}

function getMentList(){
	Ment.getAcsMentListForSelctor(
			function(data){
				if(data != null && data.length > 0){
					dwr.util.removeAllOptions("acsMentSelector");
					$("#acsMentSelector").append("<option value='0' selected>멘트를 선택하세요.</option>");
					dwr.util.addOptions("acsMentSelector", data, function(data){return data.mentIdx;}, function(data){return data.mentName;});
				}
				else{
					alert("안내 멘트를 먼저 등록하세요.");
					window.close();
				}
		});
}



function getCallerList(){
	SetService.getCallerList(
			function(data){
				if(data != null && data.length > 0){
					dwr.util.removeAllOptions("acsCallerSelector");
					if(data.length > 1){
						$("#acsCallerSelector").append("<option value='0' selected>번호를 선택하세요.</option>");
						$("#acsCallerDiv").show();
					}
					dwr.util.addOptions("acsCallerSelector", data, function(data){return data.callerIdx;}, function(data){return data.tmNumber + "[" + data.callerNumber+"]";});
				}
				else{
					alert("등록된 번호가 없습니다. 관리자에게 문의하세요.");
					window.close();
				}
		});
}

function isNumberAbleToInsert(calledOptions, calledNumber){
	for(var i = 0; i< calledOptions.length; i++){
		var num = calledOptions[i].text.split(":")[0];
		if(string.makeOnlyNumberString(calledNumber) == string.makeOnlyNumberString(num)){
			return false;
		}
	}
	return true;
}

function addCalledOption(calledNumber, calledName){
	var option = '';
	option = "<option value='"+ string.makeOnlyNumberString(calledNumber) +"'>"	+ string.getPhoneNumberString(calledNumber);
	if(calledName != null && calledName != ''){
		option += ":" + calledName;
	}
	option += "</option>";
	$("#calledNumberList").append(option);
}

function addOneCalledNumber(){
	if($("#calledNumber").val() == ""){
		alert("추가할 번호를 입력하세요.");
		return false;
	}
	var calledOptions = $("#calledNumberList")[0].options;
	if(isNumberAbleToInsert(calledOptions, $("#calledNumber").val()) == false){
		alert("이미 등록된 번호입니다.");
		return false;
	}
	
	addCalledOption($("#calledNumber").val(), $("#calledName").val());
	
	$("#calledNumberCount").text($("#calledNumberList option").length);
	$("#calledNumber").val('');
	$("#calledName").val('');
}


function removeCalledNumberList(){
	if($("#calledNumberList option:selected").length == 0){
		alert("제거할 항목을 선택하세요.");
		return;
	}
	
	if(confirm("선택한 항목을 제거합니까?") == false){
		return;
	}
	
	$("#calledNumberList option:selected").remove();
	$("#calledNumberCount").text($("#calledNumberList option").length);
}


function makeTestCall(){
	if($("#acsMentSelector option:selected").val() == '0'){
		alert("안내멘트를 선택하세요.");
		return false;
	}
	
	if($('#acsTestPhoneNumber').val() == ''){
		alert("테스트 전화번호를 입력하세요.");
		return false;
	}
	
	if($('#acsCallerSelector option:selected').val() == '0'){
		alert("상담원 번호를 선택하세요.");
		return false;
	}
	
	SetService.makeTestCall(
			$('#acsTestPhoneNumber').val()
			, $("#acsMentSelector option:selected").val()
			, $("#acsCallerSelector option:selected").val()
			, function(data){
				if(data != null){
					if(data.resultCode == '00'){
						alert("테스트 전화를 요청했습니다. 테스트 통화 완료 후 다음을 눌러주시기 바랍니다.");
						testCallFlag = 1;
					}
					else{
						testCallFlag = 0;
						alert(data.resultMessage);
					}
				}
		});
}




function downloadExcelFormat(){
	SetService.downloadExcelFormat(
		function(data){
			if(data != null){
				dwr.engine.openInDownload(data);
			}
			else{
				alert("엑셀 양식 파일 다운로드에 실패했습니다.");
			}
	});
}

function addCalledNumbers(){
	if($("#actionStatus").html() != ""){
		return;
	}
	var displayErrorCount = 10;
	var fileName = $("#importCalledNumberFile").val();
	if(fileName == ''){
		alert("업로드 할 엑셀 파일을 선택하세요.");
		return;
	}
	
	var file = dwr.util.getValue('importCalledNumberFile');
	$("#actionStatus").html("<i class=\"icon-spinner icon-spin orange bigger-125\"></i>업로드 중입니다. 잠시만 기다려주세요.");
	SetService.addCalledNumbers(
		file
		, function(data){
			$("#actionStatus").html("");
			if(data.result.resultCode == '00'){
				var calledList = data.calledNumberList;
				var existList = "";
				var existCount = 0;
				for(var i = 0; i < calledList.length; i++){
					var called = calledList[i];
					var calledOptions = $("#calledNumberList")[0].options;
					if(isNumberAbleToInsert(calledOptions, called.calledNumber) == false){
						if(existCount <= displayErrorCount){
							existList += "\n" + called.calledNumber;
						}
						existCount++;
						continue;
					}
					addCalledOption(called.calledNumber, called.calledName);
					$("#calledNumberCount").text($("#calledNumberList option").length);
				}
				if(existCount >= calledList.length){
					alert("모든 번호가 이미 추가되어있습니다. 번호를 중복하여 추가할 수 없습니다.");
				}
				else if(existCount > displayErrorCount){
					existCount -= displayErrorCount;
					alert("이미 추가된 번호는 다시 추가할 수 없습니다.\n추가실패 번호목록" + existList + "\n외에 " + existCount + "개의 번호");
				}
				else if(existCount > 0){
					alert("이미 추가된 번호는 다시 추가할 수 없습니다.\n추가실패 번호목록" + existList);
				}
			}
			else{
				alert(data.result.resultMessage);
			}
	});
}

function insertAcsSet(){
	if($("#actionStatus").html() != ""){
		return;
	}
	if($("#acsSetName").val() == ''){
		alert("설정명을 입력하세요.");
		return false;
	}
	if($("#acsMentSelector option:selected").val() == '0'){
		alert("안내멘트를 선택하세요.");
		return false;
	}
	/*
	if($("#calledNumberList option").length == 0){
		alert("착신 번호를 추가하세요.");
		return false;
	}
	*/
	if($(".acsOnDateTimeRadio:checked").val() == 'A'){
		if($("#acsOnDatePicker").val() == ''){
			alert("시작일시 지정시 서비스 시작일을 입력하셔야 합니다.");
			return false;
		}
		if($("#acsOnTimePicker").val() == ''){
			alert("시작일시 지정시 서비스 시작 시간을 입력하셔야 합니다.");
			return false;
		}
	}
	
	var calledNumbers = [];
	/*
	$("#calledNumberList option").each(function(){
		var called = $(this).text().split(":");
		
		if(called.length >= 1){
			var calledName = "";
			for(var i = 1; i < called.length; i++){
				if(i != 1){
					calledName +=":";
				}
				calledName += called[i];
			}
			calledNumbers.push({"calledNumber":$(this).val(),"calledName":calledName});
		}
	});
	
	 */
	if(testCallFlag == 0){
		alert("테스트 전화로 먼저 음원을 테스트해야 합니다.");
		return moveDiv('1');
	}
	
	var param = {
			"setName":$("#acsSetName").val()
			, "mentIdx":$("#acsMentSelector option:selected").val()
			, "callerIdx":$("#acsCallerSelector option:selected").val()
			, "setType":$(".acsOnDateTimeRadio:checked").val()
			, "acsOnDate":$("#acsOnDatePicker").val()
			, "acsOnTime":$("#acsOnTimePicker").val()
			, "calledNumberList":calledNumbers
	};
	$("#actionStatus").html("<i class=\"icon-spinner icon-spin orange bigger-125\"></i>저장중입니다. 잠시만 기다려주세요.");
	SetService.insertAcsSet(
			param
			, function(data){
				$("#actionStatus").html("");
				if(data != null){
					if(data.result.resultCode != '00'){
						alert(data.result.resultMessage);
					} 
					else{
						/*
						dwr.engine.openInDownload(data.file);
						moveDiv('3');
						*/
						opener.getSetPageInfo();
						window.close();
						
					}
				}
				else{
					alert("데이터를 저장할 수 없습니다.");
				}
		});
}



function updateAcsSet(){
	if($("#acsSetName").val() == ''){
		alert("설정명을 입력하세요.");
		return false;
	}
	if($("#acsMentSelector option:selected").val() == '0'){
		alert("안내멘트를 선택하세요.");
		return false;
	}
	
	if($("#acsMentSelector option:selected").val() != $("#oldMentIdx").val()){
		if(testCallFlag == 0){
			alert("안내멘트를 바꾸시려면 테스트 전화로 테스트를 먼저 하셔야 합니다.");
			return false;
		}
	}
	
	if($(".acsOnDateTimeRadio:checked").val() == 'A'){
		if($("#acsOnDatePicker").val() == ''){
			alert("시작일시 지정시 서비스 시작일을 입력하셔야 합니다.");
			return false;
		}
		if($("#acsOnTimePicker").val() == ''){
			alert("시작일시 지정시 서비스 시작 시간을 입력하셔야 합니다.");
			return false;
		}
	}
	
	var param = {
			"setIdx":$("#setIdx").val()
			, "setName":$("#acsSetName").val()
			, "mentIdx":$("#acsMentSelector option:selected").val()
			, "callerIdx":$("#acsCallerSelector option:selected").val()
			, "setType":$(".acsOnDateTimeRadio:checked").val()
			, "acsOnDate":$("#acsOnDatePicker").val()
			, "acsOnTime":$("#acsOnTimePicker").val()
	};
	SetService.updateAcsSet(
			param
			, function(data){
				if(data != null){
					if(data.resultCode == '00'){
						opener.$('#acsSetCurrentPage').val("1");
						opener.getSetPageInfo();
						window.close();
					}
					else{
						alert(data.resultMessage);
					}
				}
				else{
					alert("데이터를 수정할 수 없습니다.");
				}
		});
}



function deleteAcsSet(setIdx){
	if(confirm("한번 삭제한 데이터는 복원할 수 없습니다. 삭제하시겠습니까?") == false){
		return;
	}
	
	SetService.deleteAcsSet(
		setIdx
		, function(data){
			if(data != null){
				if(data.resultCode == '00'){
					$('#acsSetCurrentPage').val("1");
					getSetPageInfo();
				}
				else{
					alert(data.resultMessage);
				}
			}
			else{
				alert("데이터 삭제에 실패했습니다.");
			}
	});
}




/*
 * 착신 번호 관리
 */

function initCalledManagePop(){
	dwr.engine.setErrorHandler(error.invalidRequestPop);
	getCalledPageInfo();
	
	$("#calledNumber").keypress(function(event){
		type.onlyNumberAndBarTypeEvent(event);
	});
	$("#actionStatus").html("<i class=\"icon-spinner icon-spin orange bigger-125\"></i>착신번호를 불러오는 중입니다. 잠시만 기다려주세요.");
}

function getCalledPageCallback(){
	getCalledPageInfo();
}

function getCalledPageInfo(){
	SetService.getCalledPageInfo(
		$("#setIdx").val()
		, $('#acsCalledCurrentPage').val()
		, calledItemCount
		, function(data){
			if(data != null){
				if(data.totalCount < calledItemCount){
					$('#acsCalledPageSelectorDiv')[0].innerHTML = "";
				}
				else{
					$('#acsCalledPageSelectorDiv')[0].innerHTML = pagination.makeHtmlString(data, "#acsCalledCurrentPage", getCalledPageCallback);
				}
				getCalledList($('#setIdx').val(), data.minItem, data.totalCount);
			}
			else{
				alert("착신번호 정보를 가져오는데 실패했습니다.");
			}
		});
}

function getCalledList(setIdx, minItem, totalCount){
	SetService.getCalledList(
		setIdx
		, minItem
		, calledItemCount
		, function(data){
			if(data != null){
				dwr.util.removeAllOptions("calledNumberList");
				dwr.util.addOptions("calledNumberList", data, function(data){return data.calledIdx;}
				, function(data){
						if(data.calledName != ''){
							return data.calledNumber + ":" + data.calledName;
						}
						else{
							return data.calledNumber;
						}
					}
				);
				$("#calledNumberCount").text(totalCount);
				$("#actionStatus").html("");
			}
	});
}

function openManageCalledNumberPop(setIdx){
	var url = "openManageCalledNumberPop?setIdx=" + setIdx;
	common.popup(url, '착신관리', 670, 580);
}


function insertOneCalledNumber(){
	if($("#calledNumber").val() == ""){
		alert("추가할 번호를 입력하세요.");
		return false;
	}
	var calledOptions = $("#calledNumberList")[0].options;
	if(isNumberAbleToInsert(calledOptions, $("#calledNumber").val()) == false){
		alert("이미 등록된 번호입니다.");
		return false;
	}
	
	SetService.insertCalledNumber(
			$("#setIdx").val()
			, $("#calledNumber").val()
			, $("#calledName").val()
			, function(data){
				if(data != null){
					if(data.resultCode == '00'){
						getCalledPageInfo();
						$("#calledNumber").val('');
						$("#calledName").val('');
						opener.getSetPageInfo();
					}
					else{
						alert(data.resultMessage);
					}
				}
		});
}

function insertCalledNumbers(){
	
	if($("#actionStatus").html() != ""){
		return;
	}
	
	var fileName = $("#importCalledNumberFile").val();
	if(fileName == ''){
		alert("업로드 할 엑셀 파일을 선택하세요.");
		return;
	}
	
	var file = dwr.util.getValue('importCalledNumberFile');
	$("#actionStatus").html("<i class=\"icon-spinner icon-spin orange bigger-125\"></i>업로드 중입니다. 잠시만 기다려주세요.");
	
	//SetService.insertCalledNumbers(
	SetService.insertCalledNumbersInBatch(
		$("#setIdx").val()
		, file
		, function(data){
			$("#actionStatus").html("");
			if(data != null){
				if(data.result.resultCode == '00'){
					getCalledPageInfo();
					opener.getSetPageInfo();
					dwr.engine.openInDownload(data.file);
				}
				else{
					alert(data.result.resultMessage);
				}
			}
			else{
				alert("파일 추가에 실패했습니다.");
			}
		}
	);
}

function deleteCalledNumberList(){
	if($("#actionStatus").html() != ""){
		return;
	}
	
	if($("#calledNumberList option:selected").length == 0){
		alert("삭제할 항목을 선택하세요.");
		return;
	}
	
	if(confirm("한번 삭제한 데이터는 복원할 수 없습니다. 선택한 항목을 삭제합니까?") == false){
		return;
	}
	
	var calledIdxList = [];
	$("#calledNumberList option:selected").each(function(){
		calledIdxList.push({"calledIdx":$(this).val()});
	});
	
	$("#actionStatus").html("<i class=\"icon-spinner icon-spin orange bigger-125\"></i>삭제 중입니다. 잠시만 기다려주세요.");
	SetService.deleteCalledNumbers(
			$("#setIdx").val()
			, calledIdxList
			, function(data){
				$("#actionStatus").html("");
				if(data != null){
					if(data.resultCode == '00'){
						getCalledPageInfo();
						opener.getSetPageInfo();
					}
					else{
						alert(data.resultMessage);
					}
				}
				else{
					alert("착신번호 삭제에 실패했습니다.");
				}
		});
}


function deleteAllCalledNumbers(){
	if($("#actionStatus").html() != ""){
		$("#actionStatus").html("<i class=\"icon-spinner icon-spin orange bigger-125\"></i>처리중인 작업이 있습니다. 잠시만 기다려주세요.");
		return false;
	}
		
	if(confirm("모든 전화번호를 삭제하시겠습니까?") == false){
		return false;
	}
	
	if(confirm("한번 삭제한 데이터는 복원할 수 없습니다. 모든 전화번호를 삭제하시겠습니까?") == false){
		return false;
	}
	
	$("#actionStatus").html("<i class=\"icon-spinner icon-spin orange bigger-125\"></i>삭제 중입니다. 잠시만 기다려주세요.");
	SetService.deleteAllCalledNumbers(
			$("#setIdx").val()
			, function(data){
				$("#actionStatus").html("");
				if(data != null){
					if(data.resultCode == '00'){
						getCalledPageInfo();
						opener.getSetPageInfo();
					}
					else{
						alert(data.resultMessage);
					}
				}
				else{
					alert("착신번호 삭제에 실패했습니다.");
				}
		});
}



function closeActionPop(){
	if($("#actionStatus").html() != ""){
		return;
	}
//	opener.getSetPageInfo();
	window.close();
}



/*
 * 착신 번호 조회
 */
function initCalledDetailPop(){
//	dwr.engine.setErrorHandler(error.invalidRequestPop);
	getCalledPageInfo();
}


function openShowCalledNumberPop(setIdx){
	var url = "openShowCalledNumberPop?setIdx=" + setIdx;
	common.popup(url, '착신번호보기', 670, 580);
}
