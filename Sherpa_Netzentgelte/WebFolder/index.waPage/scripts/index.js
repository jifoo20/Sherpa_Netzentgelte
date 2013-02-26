
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var fileUpload1 = {};	// @fileUpload
	var imageButton4 = {};	// @buttonImage
	var imageButton3 = {};	// @buttonImage
	var login1 = {};	// @login
	var imageButton2 = {};	// @buttonImage
	var imageButton1 = {};	// @buttonImage
// @endregion// @endlock

// eventHandlers// @lock

	fileUpload1.filesUploaded = function fileUpload1_filesUploaded (event)// @startlock
	{// @endlock
		debugger;
		ds.PLZ_Liste.addManyPLZ (event.response[0].path, {onSuccess: function () {
			sources.pLZ_Liste.all();
		}}) 
	};// @lock

	imageButton4.click = function imageButton4_click (event)// @startlock
	{// @endlock
		var url =document.URL;
		window.open(url+'/download_strom','_self');	
	};// @lock

	imageButton3.click = function imageButton3_click (event)// @startlock
	{// @endlock
		sources.einstellungen.save({onSuccess:function(event) {
			
			$$("progressBar1").startListening();
			ds.Auswertung_Strom.getStrom( {onSuccess: function(event) {
			if (event.result == null) {
					sources.auswertung_Strom.allEntities()
				} else {
					alert(event.result.errorMessage);	
				};
				$$("progressBar1").stopListening();
				$$("progressBar1").hide();
				
		}});
			
		}});
	
	};// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		sources.einstellungen.all({onSuccess: function () {sources.einstellungen.autoDispatch();	
		}} );
		sources.pLZ_Liste.all();
//		sources.auswertung_Gas.all();
		sources.auswertung_Strom.all();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		sources.einstellungen.all({onSuccess: function () {sources.einstellungen.autoDispatch();
		}} );
		sources.pLZ_Liste.all();
//		sources.auswertung_Gas.all();
		sources.auswertung_Strom.all();
	};// @lock

	imageButton2.click = function imageButton2_click (event)// @startlock
	{// @endlock
		var my_sel = sources.pLZ_Liste.getSelection();
			var selArray = my_sel.getSelectedRows ();
			var ent2 =sources.pLZ_Liste.buildFromSelection(my_sel, {onSuccess: function (result) {
				var ent = result.dataSource;
				ent.removePLZ({onSuccess: function () {
						sources.pLZ_Liste.all();
					}});
			}
		});
	};// @lock

	imageButton1.click = function imageButton1_click (event)// @startlock
	{// @endlock
		if (neue_plz.length > 1) {
			if (!ds.PLZ_Liste.addPLZ(neue_plz)) {
				alert("Eintrag schon vorhanden!");
			} else {
			sources.pLZ_Liste.all();	
			
			};
		};
			
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("fileUpload1", "filesUploaded", fileUpload1.filesUploaded, "WAF");
	WAF.addListener("imageButton4", "click", imageButton4.click, "WAF");
	WAF.addListener("imageButton3", "click", imageButton3.click, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("imageButton2", "click", imageButton2.click, "WAF");
	WAF.addListener("imageButton1", "click", imageButton1.click, "WAF");
// @endregion
};// @endlock
