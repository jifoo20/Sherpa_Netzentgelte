
guidedModel =// @startlock
{
	PLZ_Liste :
	{
		collectionMethods :
		{// @endlock
			removePLZ:function()
			{// @lock
				this.remove();
			}// @startlock
		},
		methods :
		{// @endlock
			addManyPLZ:function(my_path)
			{// @lock
				var x = currentSession().user.ID;
				if (x !== "00000000000000000000000000000000") {
						
				var my_reg = new RegExp ('[0-9]{5}');
				var myfile = File(my_path);
				var z=ds.PLZ_Liste.all();
				z.remove();
				var stream = TextStream(myfile, "read", 100);
				do {
				    var item = stream.read('\r');
					if (my_reg.test(item)) {
						var z=ds.PLZ_Liste.createEntity();
						z.plz=item;
						z.user=x;
						z.save();
					};
				} while (item != '');
				stream.close();				
				};
			},// @lock
			addPLZ:function(item)
			{// @lock
				if (this.query('plz = :1',item).length === 0){
					var ent =this.createEntity();
					ent.plz = item;
					ent.save();
					return true
				} else return false;
			}// @startlock
		},
		events :
		{
			onSave:function()
			{// @endlock
				this.user= currentSession().user.ID;
			},// @startlock
			onRestrictingQuery:function()
			{// @endlock
				var x = currentSession().user.ID;
				var ret = ds.PLZ_Liste.createEntityCollection();
					if (x !== "00000000000000000000000000000000") {
					ret = ds.PLZ_Liste.query('user = :1 ',x)};				
				return ret;	
			}// @startlock
		}
	},
	Einstellungen :
	{
		events :
		{
			onSave:function()
			{// @endlock
				
				if (this.arbeit_NT == null ) {	
					this.arbeit_NT=0;
				};
				
				if (this.arbeit_HT == null ) {
					this.arbeit_HT=0;
					};
					
				if (this.stichtag == null ) {
					this.stichtag=new Date();
					};	
				if (this.leistung == null ) {
					this.leistung=0;
					};	
					
					
			},// @startlock
			onRestrictingQuery:function()
			{// @endlock
				var ret = ds.Einstellungen.createEntityCollection();
				
				var x = currentSession().user.ID;
				if (x !== "00000000000000000000000000000000") {
			
				ret = ds.Einstellungen.query('user = :1 ',x)
				if (ret.length ==0 ) {
					var ent = ds.Einstellungen.createEntity();
					ent.user=x;
					ent.stichtag= new Date();
					ent.arbeit=10000;
					ent.druckstufe=0;
					ent.zaehlertyp=0;
					ent.leistung=0;
					ent.ml=false;
					ent.ka=3;
					ent.zaehlergroesse='';
				
					ent.arbeit_HT=1000;
					ent.aktuellerTab=0;
					ent.arbeit_NT=0;
					ent.leistung_strom=0;
					ent.blind=0;
					
					ent.spe_entnahme=1;
					ent.spe_messung=1;
					ent.zaehlerart=0;
					ent.datenbereitstellung=0;
					ent.entgelttyp=1;
					
					
					
					
					ent.save(); 
					ret.add(ent);
					
					
					
				};			
			};
			return ret;
			}// @startlock
		}
	},
	Parameter :
	{
		methods :
		{// @endlock
			setUser:function(items)
			{// @lock

				var old_users =directory.group("User").getUsers();
				items.forEach (function (my_item) {
					var myUser = directory.user(my_item.user_ID);
					if (myUser === null) {
						myUser=directory.addUser(my_item.name,my_item.password,my_item.fname)
					}
					else
					 {
					 	if (my_item.password != '***') {
					 		myUser.setPassword(my_item.password);
					 		};
					 	};
				});
				directory.save();

			},// @lock
			setPassword:function(my_id,my_password)
			{// @lock
				var myUser = directory.user(my_id);
				if (myUser !== null) {
					myUser.setPassword(my_password);
					directory.save();
			};
			},// @lock
			getUser:function()
			{// @lock
	
				var y = [];
				var g = directory.group("User");
				var x1 = g.getUsers(true); // get only users assigned to the group
				x1.forEach (function (item) {
					var x = {};
					x.user_ID=item.ID;
					x.name = item.name;
					x.fname = item.fullName;
					x.password ='*** Passwort vorhanden ***';
					y.push(x);
				});
				return y;
			},// @lock
			getParameter:function()
			{// @lock
				return currentSession().storage.sparte;
			}// @startlock
		}
	},
	Auswertung_Strom :
	{
		events :
		{
			onRestrictingQuery:function()
			{// @endlock
					
					var ret = ds.Auswertung_Strom.createEntityCollection();
						var x = currentSession().user.ID;
						if (x !== "00000000000000000000000000000000") {
						ret = ds.Auswertung_Strom.query('user = :1 ',x)					
					};
					return ret;
			}// @startlock
		},
		methods :
		{// @endlock
			getParameter:function()
			{// @lock
				
				return currentSession().storage.abfrage_strom;
			},// @lock
			getStrom:function()
			{// @lock
				var x = currentSession().user.ID;
				if (x !== "00000000000000000000000000000000") {
				 
				 	if (currentSession().storage.myid == undefined) {
				 		currentSession().storage.myid = generateUUID()
				 		};
				 	var my_mutex = Mutex(currentSession().storage.myid);
				 	if (my_mutex.tryToLock()) {		
					
					var ent =ds.PLZ_Liste.all();
					var my_plz = ent.toArray('plz');
					
					var result_plz=[];
					if (my_plz.length>=1) {
						for (var i=0;i<my_plz.length;i++) {
							
						var zz=ds.PLZ.query('PLZ = :1',my_plz[i].plz);
						var temp_plz=zz.distinctValues('PLZ');
						result_plz=result_plz.concat(temp_plz);
					};
					};
					var my_in =ds.Einstellungen.all().first();
					var x = currentSession().user.ID;
					var token =currentSession().promoteWith('Admin');
					var result = require('GET').get_strom(result_plz,my_in.stichtag,my_in.spe_entnahme,my_in.spe_messung,my_in.leistung_strom,my_in.arbeit_HT,my_in.arbeit_NT,my_in.blind,my_in.zaehlerart,my_in.datenbereitstellung,my_in.entgelttyp);
					currentSession().unPromote(token);
					var my_ent = ds.Auswertung_Strom.all();
					my_ent.remove();
					
					result.forEach (function (item) {
						var my_ent = ds.Auswertung_Strom.createEntity();
						my_ent.user=x;			
						my_ent.bdew=item.bdew;
						my_ent.netzbetreibername=item.netzbetreibername;				
						my_ent.gueltig_bis = item.gueltig_bis;
						my_ent.gueltig_von = item.gueltig_von;				
						my_ent.abrechnung = item.abrechnung;
						my_ent.msb = item.msb;
						my_ent.mdl = item.mdl;
						my_ent.ablesung = item.abl;				
						my_ent.grundpreis = item.grundpreis;
						my_ent.wirkarbeit = item.wirkarbeit;
						my_ent.wirkarbeit_HT = item.wirkarbeitHT;
						my_ent.wirkarbeit_NT = item.wirkarbeitNT;
						my_ent.leistung = item.leistung;
						my_ent.datenbereitstellung = item.datenbereitstellung;
						my_ent.konzessionsabgabe = item.konzessionsabgabe;
						my_ent.ka_tarif = item.ka_tarif;
						my_ent.ka_svk = item.ka_svk;
						my_ent.ka_schwachlast = item.ka_schwachlast;
						my_ent.stromWandlerEnthalten = item.stromwandler_enthalten;
						my_ent.kwk = item.kwk;
						my_ent.blindmehrarbeit = item.blindmehrarbeit;
						my_ent.offshore = item.offshore;
						my_ent.sonderkundenaufschlag = item.sonderkundenaufschlag;
						my_ent.gesamtpreis = item.gesamtpreis;
						my_ent.plz = item.plz;
					    my_ent.save();
					});
					my_mutex.unlock();
		
			} else {
				
			 return {error: 100, errorMessage: 'Eine Abfrage läuft bereits!'};
			};
			
			
			};			
			}// @startlock
		}
	},
	Auswertung_Gas :
	{
		events :
		{
			onRestrictingQuery:function()
			{// @endlock
			
			var ret = ds.Auswertung_Gas.createEntityCollection();
				var x = currentSession().user.ID;
				if (x !== "00000000000000000000000000000000") {
				ret = ds.Auswertung_Gas.query('user = :1 ',x)
			};
			return ret;
			}// @startlock
		},
		methods :
		{// @endlock
			getParameter:function()
			{// @lock
				return currentSession().storage.abfrage;
				
			},// @lock
			getGas:function()
			{// @lock
			var x = currentSession().user.ID;
				if (x !== "00000000000000000000000000000000") {
				var ent =ds.PLZ_Liste.all();
				var my_plz = ent.toArray('plz');
				
				var result_plz=[];
				if (my_plz.length>=1) {
					for (var i=0;i<my_plz.length;i++) {
						
					var zz=ds.PLZ.query('PLZ = :1',my_plz[i].plz);
					var temp_plz=zz.distinctValues('PLZ');
					result_plz=result_plz.concat(temp_plz);
				};
				};
				var my_in =ds.Einstellungen.all().first();
				var x = currentSession().user.ID;
				var token =currentSession().promoteWith('Admin');
				var result = require('GET').get_gas(result_plz,my_in.stichtag,my_in.druckstufe,my_in.ka,my_in.ml,my_in.leistung,my_in.arbeit,my_in.zaehlergroesse,my_in.zaehlertyp);
				currentSession().unPromote(token);
				var my_ent = ds.Auswertung_Gas.all();
				my_ent.remove();
				result.forEach (function (item) {
						var my_ent = ds.Auswertung_Gas.createEntity();
						my_ent.user=x;
						my_ent.bdew=item.bdew;
						my_ent.druckstufe=item.druckstufe;
						my_ent.gesamtpreis=item.gesamtpreis;
						my_ent.grundpreis=item.grundpreis;
						my_ent.gueltig_bis = item.gueltig_bis;
						my_ent.gueltig_von = item.gueltig_von;
						my_ent.konzessionsabgabe= item.konzessionsabgabe;
						my_ent.leistung = item.leistung;
						my_ent.abrechnung = item.abrechnung;
						my_ent.mdl = item.mdl;
						my_ent.mitLeistungsmessung = item.mitLeistungsmessung;
						my_ent.msb = item.msb;
						my_ent.netzbetreibername = item.netzbetreibername;
						my_ent.plz = item.plz;
						my_ent.regelenergieumlage = item.regelenergieumlage;
						my_ent.wirkarbeit = item.wirkarbeit;
						my_ent.zaehlergroesse_bis = item.zaehlergroesse_bis;
					    my_ent.zaehlergroesse_von = item.zaehlergroesse_von;
					    my_ent.zaehlertyp = item.zaehlertyp;
					    my_ent.save();
				});
				
			};
			}// @startlock
		}
	}
};// @endlock

