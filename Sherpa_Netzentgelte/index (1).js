
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var imageButton6 = {};	// @buttonImage
	var imageButton4 = {};	// @buttonImage
	var login1 = {};	// @login
	var imageButton5 = {};	// @buttonImage
	var imageButton3 = {};	// @buttonImage
	var menuItem2 = {};	// @menuItem
	var menuItem1 = {};	// @menuItem
	var documentEvent = {};	// @document
	var imageButton2 = {};	// @buttonImage
	var imageButton1 = {};	// @buttonImage
	var button4 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	imageButton6.click = function imageButton6_click (event)// @startlock
	{// @endlock
		var url =document.URL;
		window.open(url+'download_strom','_self');	
	};// @lock

	imageButton4.click = function imageButton4_click (event)// @startlock
	{// @endlock
		var url =document.URL;
		window.open(url+'download_gas','_self');	
	};// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		sources.einstellungen.all({onSuccess: function () {sources.einstellungen.autoDispatch();	
		}} );
		sources.pLZ_Liste.all();
		sources.auswertung_Gas.all();
		sources.auswertung_Strom.all();
		
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		sources.einstellungen.all({onSuccess: function () {sources.einstellungen.autoDispatch();
		}} );
		sources.pLZ_Liste.all();
		sources.auswertung_Gas.all();
		sources.auswertung_Strom.all();
		var tab = sources.einstellungen.aktuellerTab+1;
		$$('tabView1').selectTab(tab);
		$$('tabView4').selectTab(tab);
	};// @lock

	imageButton5.click = function imageButton5_click (event)// @startlock
	{// @endlock
		sources.einstellungen.aktuellerTab=$$('tabView4').getSelectedTab().index-1;
		sources.einstellungen.save({onSuccess:function() {
		}});
		ds.Auswertung_Strom.getStrom( {onSuccess: function() {
			sources.auswertung_Strom.allEntities();
			sources.auswertung_Strom.autoDispatch();
		}});
		
	};// @lock

	imageButton3.click = function imageButton3_click (event)// @startlock
	{// @endlock
		sources.einstellungen.aktuellerTab=$$('tabView4').getSelectedTab().index-1;
		sources.einstellungen.save({onSuccess:function() {
		}});
		ds.Auswertung_Gas.getGas( {onSuccess: function() {
			sources.auswertung_Gas.allEntities();
			sources.auswertung_Gas.autoDispatch();
		}});
		
			
	};// @lock

	menuItem2.click = function menuItem2_click (event)// @startlock
	{// @endlock
		 var tabObject = $$('tabView4').getSelectedTab();
		 $$('tabView1').selectTab(tabObject.index);
		  
	};// @lock

	menuItem1.click = function menuItem1_click (event)// @startlock
	{// @endlock
		 var tabObject = $$('tabView4').getSelectedTab();
		 $$('tabView1').selectTab(tabObject.index);
		  
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
		var tab = sources.einstellungen.aktuellerTab+1;
		$$('tabView1').selectTab(tab);
		$$('tabView4').selectTab(tab);
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

	button4.click = function button4_click (event)// @startlock
	{// @endlock
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("imageButton6", "click", imageButton6.click, "WAF");
	WAF.addListener("imageButton4", "click", imageButton4.click, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("imageButton5", "click", imageButton5.click, "WAF");
	WAF.addListener("imageButton3", "click", imageButton3.click, "WAF");
	WAF.addListener("menuItem2", "click", menuItem2.click, "WAF");
	WAF.addListener("menuItem1", "click", menuItem1.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("imageButton2", "click", imageButton2.click, "WAF");
	WAF.addListener("imageButton1", "click", imageButton1.click, "WAF");
	WAF.addListener("button4", "click", button4.click, "WAF");
// @endregion
};// @endlock


