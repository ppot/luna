//Fichier de javascript
app = (function(){

	function app_module_log() {
	  el = document.getElementById("overlay");
	  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
		join();
		google_map.init();
	}

	function app_nouveau_restaurateur(){
		app_admin_hide();
		$('#add-restaurateur').show();
	}

	function app_nouveau_restaurant(){
		app_admin_hide();
		$('#add-restaurant').show();
	}

	function app_nouveau_livreur(){
		app_admin_hide();
		$('#add-livreur').show();
	}
		function app_gerer_restaurateur(){
		app_admin_hide();
		$('#gerer-restaurateur').show();
	}

	function app_gerer_restaurant(){
		app_admin_hide();
		$('#gerer-restaurant').show();
	}

	function app_gerer_livreur(){
		app_admin_hide();
		$('#gerer-livreur').show();
	}

	function app_admin_hide(){
		$('#add-restaurateur').hide();
		$('#add-restaurant').hide();
		$('#add-livreur').hide();
		$('#gerer-restaurateur').hide();
		$('#gerer-restaurant').hide();
		$('#gerer-livreur').hide();
		$('#form_modifierRestaurant').hide();
		$('#form_modifierLivreur').hide();
		$('#mofifierRestaurateur_form').hide();
	}

	function app_add_menu(){
		app_menus_hide();
		$('#add-menu').show();
	}

	function app_menus(){
		app_menus_hide();
		$('#menus').show();
	}

	function app_menu_preparation(){
		app_menus_hide();
		$('#menu-preparation').show();
	}

	function app_menus_hide(){
		$('#add-menu').hide();
		$('#menus').hide();
		$('#menu-preparation').hide();
	}

  var general=(function(){ 
  	var cart = null;
  	var complete = false;
  	var addrId=-1;
    function init(){
  		$('.cart').hide(); //temp
  		$('.shoopingCart').hide();
  		$('#complete_sucess').hide();
    }

    function redirect(path){
			window.location.href =  path;
		}

		function app_open(){
			$('.register-app').hide();
			$("#oauth-error").hide();
			$('#register-error').hide();
		}

		function app_signin () {
			$('.login-app').show();
			$('.register-app').hide();
		}

		function app_register () {
			$('.login-app').hide();
			$('.register-app').show();
		}
		function app_restaurants(){
			$.ajax({
			    type: "GET",
			    url: "/api/listRestaurants",
			    dataType: "html",
			    success: function(result){
			    	$.each($.parseJSON(result), function(idx, obj) {
			    		$('#lstRestaurants').append('<li><a href="javascript:app.general.getFoodElements('+obj.id+')" id="'+obj.id+'">'+obj.nom+'</a></li>');
					});
			    }        
			});
		}

		function getFoodElements(id){
			  app.general.menu(id);
              app.general.plats(id);
		}

		function menu(id){
			$.ajax({
				type: "GET",
				data:{
					id:id,
				},
				url: "/api/restaurant_menu",
				dataType: "html",
				success: function(result){
					menu = $.parseJSON(result)
					$('#resto-menu').text(menu.nom);
				}        
          	});
		}

		function plats(id){
			$.ajax({
				type: "GET",
				data:{
					menu_id:id,
				},
				url: "/api/menu_plats",
				dataType: "html",
				success: function(result){
					$.each($.parseJSON(result), function(idx, obj) {
						$("#ul-plats").append('<li id="'+obj.id+'"><span class="plat-nom">'+obj.nom+'</span><span class="right"><span class="spacing">'+obj.prix+'$</span><a class="c-btn-style" href="javascript:app.general.appCart('+obj.id+')">+</a></span> <br/><span>'+obj.description+'</span></li>');
					});
				}        
          	});
		}

		function plat(id){
	    	$.ajax({
				type: "GET",
				url: "/api/plat",
				data:{
					id: id,
				},
				dataType: "html",
				success: function(result){
					plat = $.parseJSON(result);
					$("#plat-nom").text(plat.nom);
					$("#plat-prix").text(plat.prix + "$");
					$("#plat-description").text(plat.description);
				}        
	      	});
    	}

    	function appCart(id){
    		if (cart == null){
    			cart = new shoopingCart();
    			$.ajax({
					type: "GET",
					url: "/api/plat",
					data:{
						id: id,
					},
					dataType: "html",
					success: function(result){
						plat = $.parseJSON(result);
						cart.pushItem(new shoopingCartItems(id,plat));
					} 
	      		});
    			$('.cart').show();
    		}
    		else{
    			item = cart.find(id);
    			if(item != null){
    				cart.items[item].addQTE();
    			}
    			else{
    				$.ajax({
						type: "GET",
						url: "/api/plat",
						data:{
							id: id,
						},
						dataType: "html",
						success: function(result){
							plat = $.parseJSON(result);
							cart.pushItem(new shoopingCartItems(id,plat));
						} 
	      			});
    			}
    		}
    	}

    	function addQTE(id){
    		 item = cart.find(id);
    		 cart.items[item].addQTE();
    		 $("#qte_"+id).html(cart.items[item].qte);
    		 $('#tr_total').html(cart.total());
    	}

    	function removeQTE(id){
   			item = cart.find(id);
   			cart.items[item].minusQTE();

   			if(cart.items[item].qte==0){
   				$("#tr_"+id).remove();
   				$('#tr_total').html(cart.total());
   				 delete cart.remove(id);
   			}
   			else{
				$("#qte_"+id).html(cart.items[item].qte);
				$('#tr_total').html(cart.total());
   			}


    	}

    	function completeCart(){
    		complete = true;
    		$('#complete_order').show();
    		$('.adresse').hide();
    		$('.adresses').hide();
    		$(".cart-items").html('');
    		$('#complete_sucess').hide();
	    	for (var i = 0; i < cart.items.length; i++) {
	    		obplat = cart.items[i];
				$(".cart-items").append('<tr class="tr" id="tr_'+obplat.id+'"><td>'+obplat.plat.nom+'<span class="right">qte: <span id="qte_'+obplat.id+'">'+obplat.qte+'</span></span></td><td class="bill-price">'+obplat.plat.prix+'$</td><td></td></tr>');
			}
			$(".cart-items").append('<tr class="tr"><td>total</td><td class="bill-price" id="tr_total">'+cart.total()+'$</td><td></td></tr>');

		    var now     = new Date(); 
		    var year    = now.getFullYear();
		    var month   = now.getMonth()+1; 
		    var day     = now.getDate();
		    var hour    = now.getHours();
		    var minute  = now.getMinutes();
		    var second  = now.getSeconds(); 
			$("#liv_date").val(year+'-'+month+'-'+day);
			$("#liv_heure").val(hour+':'+minute+':'+second);
    	}

    	function confirmCart(){
    		var date = $('#liv_date').val();
    		var time = $('#liv_heure').val();
			$.ajax({
				type: "GET",
				url: "/api/confirmer_cart",
				data:{
					date_de_commande: $('#liv_date').val(),
					heure_de_commande: $('#liv_heure').val(),
					prix_total: cart.total(),
					addr_id: addrId,
				},
				dataType: "html",
				success: function(result){
					order = $.parseJSON(result);
					for (var i = 0; i < cart.items.length; i++) {
	    				obplat = cart.items[i];
	    				$.ajax({
							type: "GET",
							url: "/api/confirmer_cart_plat",
							data:{
								commande_id: order.id,
								plat_id: obplat.id,
								qte: obplat.qte,
							},
							dataType: "html",
							success: function(result){
							} 
		  				});
					}
					$('#token').text(order.no_confirmation);
					$('#order_date').text(date);
					$('#order_time').text(time);
					$('#order_total').text(order.prix_total);
					$('#complete_order').hide();
					$('#complete_sucess').show();
					addrId = -1;
					cart = null;
					$('.cart').hide();
				} 
  			});
    	}

    	function showCart(){
    		$('.shoopingCart').show();
    		if(!complete){
    			$('#complete_order').hide();
    		}
    		$(".cart-items").html('');
	    	for (var i = 0; i < cart.items.length; i++) {
	    		obplat = cart.items[i];
				$(".cart-items").append('<tr class="tr" id="tr_'+obplat.id+'"><td>'+obplat.plat.nom+'<span class="right">qte: <span id="qte_'+obplat.id+'">'+obplat.qte+'</span></span></td><td class="bill-price">'+obplat.plat.prix+'$</td><td><a class="c-btn-style" href="javascript:app.general.addQTE('+obplat.id+')">+</a><a class="c-btn-style" href="javascript:app.general.removeQTE('+obplat.id+')">-</a></td></tr>');
			}
			$(".cart-items").append('<tr class="tr"><td>total</td><td class="bill-price" id="tr_total">'+cart.total()+'$</td><td><a class="c-btn-style" href="javascript:app.general.completeCart()">completer</a></td></tr>');

    	}

    	function cartClose(){
    		$('.shoopingCart').hide();
    		$('#complete_sucess').hide();
    		complete = false;
    	}

    	function adresses(){
    		$('.adresses').show();
    		$('.adresse').hide();
    		$("#adresses_list").html('');
    		$.ajax({
				type: "GET",
				url: "/api/adresses",
				dataType: "html",
				success: function(result){
					$.each($.parseJSON(result), function(idx, obj) {
						$("#adresses_list").append('<li id="'+obj.id+'" class="adr-li"><span class="space adr">'+obj.no_maison+'</span><span class="space adr">'+obj.rue+'</span><span class="space adr">'+obj.ville+'</span><span class="space adr">'+obj.code_postal+'</span><br/><span class="space adr">'+obj.telephone+'</span><a href="javascript:app.general.addr('+obj.id+')">select</a></li>');
					});
				} 
			});
    	}

    	function nAdresse(){
    		$('.adresse').show();
    		$('.adresses').hide();
    	}

    	function bAdresse(){
			$.ajax({
				type: "GET",
				url: "/api/nAdresse",
				data:{
					adress:{
			    		no_maison  :  $('#n_adresse_numero').val(), 
			    		rue  :  $('#n_adresse_rue').val(),	
			    		ville  :  $('#n_adresse_ville').val(), 
			    		telephone  :  $('#n_adresse_telephone').val(), 
			    		code_postal  :  $('#n_adresse_code_postale').val()
			    	}
				},
				dataType: "html",
				success: function(result){
					console.log(result);
				} 
			});
    	}

    	function addr(id){
    		addrId = id;
    	}

    return{
      init:init,
      redirect:redirect,
      app_open:app_open,
      app_signin:app_signin,
      app_register:app_register,
      app_restaurants:app_restaurants,
      menu:menu,
      plats:plats,
      getFoodElements:getFoodElements,
      plat:plat,
      appCart:appCart,
      showCart:showCart,
      cartClose:cartClose,
      addQTE:addQTE,
      removeQTE:removeQTE,
      completeCart:completeCart,
      confirmCart:confirmCart,
      adresses:adresses,
      nAdresse:nAdresse,
      bAdresse:bAdresse,
      addr:addr,
    }
  })();

  var users=(function(){ 
    function init(){

    }

    function oauth(){
    	value =  $('#type').find(":selected").val();
			$.ajax({
			    type: "GET",
			    url: "/api/signin",
			    data: {
			    	identificateur : $('#_aka').val(),
			    	mot_de_passe : $('#_password').val(),
			    },
			    dataType: "html",
			    success: function(result){
			        if(result == 1){
			        	general.redirect("/users/profile")
			        }
			        else if(result == 2){
			        	general.redirect("/management/restaurateur")
			        }
			        else if(result == 3){
			        	general.redirect("/management/livraison")
			        }
			        else if(result == 4){
			        	general.redirect("/management/entrepreneur")
			        }
			        else{
			        	$("#oauth-error").show();
			        	$(".message-error").text("mauvais utilisateur ou mot de passe");
			        }
			    }        
			});
		}

		function register () {
			$.ajax({
			    type: "GET",
			    url: "/api/register",
			    data: {
			    	utilisateur: {
				    	nom :  $('#inscription_nom').val(),
				    	prenom :  $('#inscription_prenom').val(),
				    	identificateur : $('#inscription_identificateur').val(),
				    	mot_de_passe : $('#inscription_motDePass').val(),

			    	},
			    	infos:{
			    		courriel : $('#inscription_email').val(),
				    	date_naissance : $('#inscription_dateNaissance').val()
			    	},
			    	adress:{
			    		no_maison  :  $('#adresse_numero').val(), 
			    		rue  :  $('#adresse_rue').val(),	
			    		ville  :  $('#adresse_ville').val(), 
			    		telephone  :  $('#adresse_telephone').val(), 
			    		code_postal  :  $('#adresse_code_postale').val()
			    	}
			    },
			    dataType: "html",
			    success: function(result){
			        if(result==1){
			        	general.redirect("/users/profile")
			        }
			        else{
						$('#register-error').show();
						$('.register-message-error').text("oups i did it again");
			        }
			    }        
			});
		}

		function user_update(){
			$.ajax({
			    type: "GET",
			    url: "/api/user_update",
			    data: {
			    	mot_de_passe : $('#mdp').val(),
			    	adress:{
			    		no_maison  :  $('#numero').val(), 
			    		rue  :  $('#rue').val(),	
			    		ville  :  $('#ville').val(), 
			    		telephone  :  $('#telephone').val(), 
			    		code_postal  :  $('#code_postale').val()
			    	}
			    },
			    dataType: "html",
			    success: function(result){
			        console.log(result); 
			    }        
			});
		}
	    return{
	      init:init,
	      oauth:oauth,
	      register:register,
	      user_update:user_update,
	    }
  })();

var entrepreneur=(function(){ 
    function init(){

    }

    function restaurateur_new() {
    	$.ajax({
			    type: "POST",
			    url: "/management/saisirInformations",
			    data: {
			    	utilisateur: {
			    		nom : $('#ajouterRestaurateur_nom').val(),
			    		prenom : $('#ajouterRestaurateur_prenom').val(),
			    		identificateur : $('#ajouterRestaurateur_identificateur').val(),
			    		mot_de_passe : $('#ajouterRestaurateur_mot_de_passe').val(),	
			    	},
			    	restaurant: $('#ajouterRestaurateur_restaurant').val()	
			    },
			    dataType: "json",
			    success: function(response){
			    	$('#add-restaurateur label').html('');
			    	$('#restaurateur_succes').removeClass('alert-box success group');
			        if (response.response == '1') {
			        	adresse_client = '<address><strong>' + response.restaurant_nom + '</strong><br>' + response.restaurant_adresse.no_maison + ' ' + response.restaurant_adresse.rue + ' <br>' + response.restaurant_adresse.ville + ' , ' + response.restaurant_adresse.code_postal + ' <br><abbr title="Phone">P:</abbr>' + response.restaurant_adresse.telephone + ' </address>';
			        	$('#restaurateur_succes').html('Restaurateur ajouté avec succès');
			        	$('#restaurateurs_table').append('<tr><td>'+ response.restaurateur.identificateur + '</td><td>'+ response.restaurateur.mot_de_passe + '</td><td>' + response.restaurateur.nom + '</td><td>' + response.restaurateur.prenom + '</td><td>' + adresse_client + '</td></tr>');
			        	$('#restaurateur_succes').addClass('alert-box success group');
			        } else if (response.response == '2') {
			        	$('#ajouterRestaurateur_restaurant_label').html("Création d'un restaurateur SANS restaurant");
			        	$('#restaurateurs_table').append('<tr><td>'+ response.restaurateur.identificateur + '</td><td>'+ response.restaurateur.mot_de_passe + '</td><td>' + response.restaurateur.nom + '</td><td>' + response.restaurateur.prenom + '</td><td>restaurant requis</td></tr>');
			        } else {	//rep 0
			        	
			        	for (key in response.errors) {
						    $('#ajouterRestaurateur_'+ key +'_label').html(response.errors[key][0]);	//on place les erreurs de valiadtion dans les labels
						}
			        }
			    },
			    error: function(XMLHttpRequest, textStatus, errorThrown) { 
        			console.log("Status: " + textStatus + "Error: " + errorThrown);
    			}          
			});
    }

    function restaurateur_delete(restaurateur_id) {
    	$.ajax({
			    type: "GET",
			    url: "/management/supprimerRestaurateur?id=" + restaurateur_id,
			    dataType: "json",
			    success: function(response){
			        if (response.response == '1') {
			        	$('#gerer_restaurateur' + restaurateur_id).remove();
			        } else {	//rep 0	
			        	console.log("Le restaurateur n'a pas été suprimmé");
			        }
			    },
			    error: function(XMLHttpRequest, textStatus, errorThrown) { 
        			console.log("Status: " + textStatus + "Error: " + errorThrown);
    			}          
			});
    }

    function restaurateur_update() {
    	restaurateur_id = $('#restaurateur_id_edit').val();
    	$.ajax({
		    type: "GET",
		    url: "/modifierRestaurateur/"+ restaurateur_id,
		    dataType: "json",
		    data: {
			    	utilisateur: {
			    		id : $('#restaurateur_id_edit').val(),
			    		nom : $('#restaurateur_nom_edit').val(),
			    		prenom : $('#restaurateur_prenom_edit').val(),
			    		identificateur : $('#restaurateur_identificateur_edit').val(),
			    		mot_de_passe : $('#restaurateur_mot_de_passe_edit').val(),	
			    	},
			    	restaurant: $('#restaurateur_restaurant_edit').val()	
			    },
		    success: function(response){
		        $('#mofifierRestaurateur_form label').html('');
			    	$('#restaurateur_edit_succes').removeClass('alert-box success group');
			        if (response.response == '1') {
			        	adresse_restaurant = '<address><strong>' + response.restaurant_nom + '</strong><br>' + response.restaurant_adresse.no_maison + ' ' + response.restaurant_adresse.rue + ' <br>' + response.restaurant_adresse.ville + ' , ' + response.restaurant_adresse.code_postal + ' <br><abbr title="Phone">P:</abbr>' + response.restaurant_adresse.telephone + ' </address>';
			        	$('#restaurateur_edit_succes').html('Restaurateur ajouté avec succès');
			        	$('#gerer_restaurateur'+ response.restaurateur.id).html('<td>'+ response.restaurateur.identificateur + '</td><td>'+ response.restaurateur.mot_de_passe + '</td><td>' + response.restaurateur.nom + '</td><td>' + response.restaurateur.prenom + '</td><td>' + adresse_restaurant + '</td>');
			        	$('#restaurateur_edit_succes').html('Restaurateur modifié avec succès');
			        	$('#restaurateur_edit_succes').addClass('alert-box success group');
			        } else if (response.response == '2') {
			        	restaurant = $('#gerer_restaurateur'+ restaurateur_id+ ' td').last();			    
			        	links = $('#gerer_restaurateur'+response.restaurateur.id + ' td').first().html();		
			        	$('#gerer_restaurateur'+restaurateur_id).html('<td>' + links + '</td><td>'+ response.restaurateur.identificateur + '</td><td>'+ response.restaurateur.mot_de_passe + '</td><td>' + response.restaurateur.nom + '</td><td>' + response.restaurateur.prenom + '</td>');
			        	$('#gerer_restaurateur'+restaurateur_id).append(restaurant);
			        	$('#restaurateur_edit_succes').html('Restaurateur modifié avec succès');
			        	$('#restaurateur_edit_succes').addClass('alert-box success group');
			        } else {	//rep 0
			        	
			        	for (key in response.errors) {
						    $('#restaurateur_'+ key +'_edit_label').html(response.errors[key][0]);	//on place les erreurs de valiadtion dans les labels
						}
			        }
			    },
			    error: function(XMLHttpRequest, textStatus, errorThrown) { 
        			console.log("Status: " + textStatus + "Error: " + errorThrown);
    			}             
		});
    }

    function restaurant_new() {
    	$.ajax({
			    type: "POST",
			    url: "/management/saisirInformationsRestaurant",
			    data: {
			    	restaurant: {
			    		nom : $('#restaurant_nom').val(),	
			    	},
			    	adresse: {
			    		no_maison : $('#adresse_no_maison').val(),
			    		rue : $('#adresse_rue').val(),
			    		ville : $('#adresse_ville').val(),
			    		telephone : $('#adresse_telephone').val(),
			    		code_postal : $('#adresse_code_postal').val(),
			    	},
			    	restaurateur: $('#restaurateur').val()	
			    },
			    dataType: "json",
			    success: function(response){
			    	$('#add-restaurant label').html('');
			    	$('#restaurant_succes').removeClass('alert-box success group');
			        if (response.response == '1') {
			        	adresse_client = '<address><strong>' + response.restaurant_nom + '</strong><br>' + response.restaurant_adresse.no_maison + ' ' + response.restaurant_adresse.rue + ' <br>' + response.restaurant_adresse.ville + ' , ' + response.restaurant_adresse.code_postal + ' <br><abbr title="Phone">P:</abbr>' + response.restaurant_adresse.telephone + ' </address>';
			        	$('#restaurant_succes').html('Restaurant ajouté avec succès');
			        	$('#restaurants_table').append('<tr><td>'+ response.restaurateur.identificateur + '</td><td>'+ response.restaurateur.mot_de_passe + '</td><td>' + response.restaurateur.nom + '</td><td>' + response.restaurateur.prenom + '</td><td>' + adresse_client + '</td></tr>');
			        	$('#restaurant_succes').addClass('alert-box success group');
			        } else if (response.response == '2') {
			        	$('#restaurant_succes').html("Création d'un restaurant SANS restaurateur");
			        	$('#restaurants_table').append('<tr><td>restaurateur requis</td><td>'+ response.restaurant + '</td><td>'+ response.adresse.telephone + '</td><td>' + response.adresse.no_maison + '</td><td>' + response.adresse.rue + '</td><td>'+ response.adresse.ville + '</td><td>'+ response.adresse.code_postal + '</td></tr>');
			        } else {	//rep 0
			        	if(response.errors.nom.length > 0) {
			        		$('#restaurant_nom_label').html(response.errors.nom[0]);	//on place les erreurs de valiadtion dans les labels
			        	}
			        	for (key in response.errors.adresse) {
						    console.log(key);
						    $('#adresse_'+ key +'_label').html(response.errors.adresse[key][0]);	//on place les erreurs de valiadtion dans les labels
						}
			        }
			    },
			    error: function(XMLHttpRequest, textStatus, errorThrown) { 
        			console.log("Status: " + textStatus + "Error: " + errorThrown);
    			}          
			});
    }

    function restaurant_delete(restaurant_id) {
		$.ajax({
			    type: "GET",
			    url: "/management/supprimerRestaurant?id=" + restaurant_id,
			    dataType: "json",
			    success: function(response){
			        if (response.response == '1') {
			        	$('#gerer_restaurant' + restaurant_id).remove();
			        } else {	//rep 0	
			        	console.log("Le restaurateur n'a pas été suprimmé");
			        }
			    },
			    error: function(XMLHttpRequest, textStatus, errorThrown) { 
	    			console.log("Status: " + textStatus + "Error: " + errorThrown);
				}          
		});
    }

    function restaurant_update() {
    	restaurant_id = $('#restaurant_id_edit').val();
    	$.ajax({
		    type: "GET",
		    url: "/modifierRestaurant/"+ restaurant_id,
		    dataType: "json",
		    data: {
			    	restaurant: {
			    		id : $('#restaurant_id_edit').val(),
			    		nom : $('#restaurant_nom_edit').val(),	
			    	},
			    	adresse: {
			    		id : $('#restaurant_adresse_id_edit').val(),
			    		no_maison : $('#restaurant_no_maison_edit').val(),
			    		rue : $('#restaurant_rue_edit').val(),
			    		ville : $('#restaurant_ville_edit').val(),
			    		telephone : $('#restaurant_telephone_edit').val(),
			    		code_postal : $('#restaurant_code_postal_edit').val(),
			    	},
			    	restaurateur: $('#form_modifierRestaurant_restaurateur').val()	
			    },
		    success: function(response){
		        $('#form_modifierRestaurant label').html('');
			    	$('#restaurant_edit_succes').removeClass('alert-box success group');
			        if (response.response == '1') {
			        	adresse_restaurant = '<address><strong>' + response.restaurant.nom + '</strong><br>' + response.adresse.no_maison + ' ' + response.adresse.rue + ' <br>' + response.adresse.ville + ' , ' + response.adresse.code_postal + ' <br><abbr title="Phone">P:</abbr>' + response.adresse.telephone + ' </address>';
			        	links = $('#gerer_restaurants'+response.restaurant.id + ' td').first().html();		        	
			        	$('#restaurant_edit_succes').html('Restaurant modifié avec succès');
			        	$('#restaurant_edit_succes').addClass('alert-box success group');			        	
			        	$('#gerer_restaurants'+ response.restaurant.id).html('<td>' + links + '</td><td>'+ response.restaurateur + '</td><td>'+ adresse_restaurant + '</td>');
			        	
			        } else if (response.response == '2') {
			        	adresse_restaurant = '<address><strong>' + response.restaurant.nom + '</strong><br>' + response.adresse.no_maison + ' ' + response.adresse.rue + ' <br>' + response.adresse.ville + ' , ' + response.adresse.code_postal + ' <br><abbr title="Phone">P:</abbr>' + response.adresse.telephone + ' </address>';
			        	links = $('#gerer_restaurants'+response.restaurant.id + ' td').first().html();			     
			        	restaurateur = $('#gerer_restaurants'+response.restaurant.id + ' td:nth-child(2)').html();
			        	$('#restaurant_edit_succes').html('Restaurant modifié avec succès');
			        	$('#restaurant_edit_succes').addClass('alert-box success group');
			        	$('#gerer_restaurants'+response.restaurant.id).html('<td>' + links + '</td><td>'+ restaurateur + '</td><td>'+adresse_restaurant+'</td>');
			        } else {	//rep 0
			        	if(response.errors.nom.length > 0) {
			        		$('#restaurant_nom_edit_label').html(response.errors.nom[0]);	//on place les erreurs de valiadtion dans les labels
			        	}
			        	for (key in response.errors.adresse) {
						    $('#restaurant_'+ key +'_edit_label').html(response.errors.adresse[key][0]);	//on place les erreurs de valiadtion dans les labels
						}
			        }
			    },
			    error: function(XMLHttpRequest, textStatus, errorThrown) { 
        			console.log("Status: " + textStatus + "Error: " + errorThrown);
    			}             
		});
    }

    function livreur_new() {
		$.ajax({
		    type: "POST",
		    url: "/management/saisirInformationsLivreur",
		    data: {
		    	utilisateur: {
		    		nom : $('#utilisateur_nom').val(),
		    		prenom : $('#utilisateur_prenom').val(),
		    		identificateur : $('#utilisateur_identificateur').val(),
		    		mot_de_passe : $('#utilisateur_mot_de_passe').val(),	
		    	}
		    },
		    dataType: "json",
		    success: function(response){
		    	$('#new_utilisateur label').html('');
		    	$('#utilisateur_succes_label').removeClass('alert-box success group');
		        if (response.response == '1') {		        	
		        	$('#utilisateur_succes_label').html('Livreur ajouté avec succès');
		        	$('#utilisateur_succes_label').addClass('alert-box success group');
		        	$('#livreurs_table').append('<tr><td>'+ response.livreur.identificateur + '</td><td>'+ response.livreur.mot_de_passe + '</td><td>' + response.livreur.nom + '</td><td>' + response.livreur.prenom + '</td></tr>');
		        } else {	//rep 0	
		        	for (key in response.errors) {
					    $('#utilisateur_'+ key +'_label').html(response.errors[key][0]);	//on place les erreurs de valiadtion dans les labels
					}
		        }
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
    			console.log("Status: " + textStatus + "Error: " + errorThrown);
			}          
		});
    }
	
    function livreur_delete(livreur_id) {
		$.ajax({
		    type: "GET",
		    url: "/management/supprimerLivreur?id=" + livreur_id,
		    dataType: "json",
		    success: function(response){
		        if (response.response == '1') {
		        	$('#gerer_livreurs' + livreur_id).remove();
		        } else {	//rep 0	
		        	console.log("Le livreur n'a pas été suprimmé");
		        }
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
    			console.log("Status: " + textStatus + "Error: " + errorThrown);
			}          
		});
    }

    function livreur_update() {
		livreur_id = $('#livreur_id_edit').val();
		$.ajax({
		    type: "GET",
		    url: "/modifierLivreur/"+ livreur_id,
		    dataType: "json",
		    data: {
		    	utilisateur: {
		    		nom : $('#livreur_nom_edit').val(),
		    		prenom : $('#livreur_prenom_edit').val(),
		    		identificateur : $('#livreur_identificateur_edit').val(),
		    		mot_de_passe : $('#livreur_mot_de_passe_edit').val(),	
		    	}
		    },
	    success: function(response){
	        $('#form_modifierLivreur label').html('');
		    	$('#livreur_succes_edit_label').removeClass('alert-box success group');
		        if (response.response == '1') {		        	
		        	links = $('#gerer_livreurs'+response.livreur.id + ' td').first().html();		 
		        	$('#gerer_livreurs'+response.livreur.id).html('<td>' + links + '</td><td>'+ response.livreur.identificateur + '</td><td>'+ response.livreur.mot_de_passe + '</td><td>'+ response.livreur.nom + '</td><td>'+ response.livreur.prenom + '</td>');
		        	$('#livreur_succes_edit_label').html('Livreur modifié avec succès');
		        	$('#livreur_succes_edit_label').addClass('alert-box success group');
		        } else {	//rep 0

		        	for (key in response.errors) {
		        		console.log(key);
					    $('#livreur_'+ key +'_edit_label').html(response.errors[key][0]);	//on place les erreurs de valiadtion dans les labels
					}
		        }
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
    			console.log("Status: " + textStatus + "Error: " + errorThrown);
			}             
		});
    }

    function labels_hide() {
		$('label').html('');
		$('label').removeClass('alert-box success group');
	}

    function restaurateur_form_values(id, restaurant_nom, nom, prenom, identificateur, mot_de_passe ) {
		//Cette fonctio place les valeur de la table vers un formulaire pour modifier un restaurateur
		$('#restaurateur_nom_edit').val(nom);
	  	$('#restaurateur_prenom_edit').val(prenom);
	  	$('#restaurateur_identificateur_edit').val(identificateur);
	  	$('#restaurateur_mot_de_passe_edit').val(mot_de_passe);

	  	$('#restaurateur_id_edit').val(id);
	  	$('#restaurateur_restaurant_edit option:first').text(restaurant_nom);
		$('#mofifierRestaurateur_form').show();
		labels_hide();
	}

	function restaurant_form_values(id, adresse_id, restaurateur_nom, nom, no_maison, rue, ville, code_postal, telephone) {
		$('#restaurant_nom_edit').val(nom);
	  	$('#restaurant_no_maison_edit').val(no_maison);
	  	$('#restaurant_rue_edit').val(rue);
	  	$('#restaurant_ville_edit').val(ville);
	  	$('#restaurant_code_postal_edit').val(code_postal);
	  	$('#restaurant_telephone_edit').val(telephone);

	  	$('#restaurant_id_edit').val(id);
	  	$('#restaurant_adresse_id_edit').val(adresse_id);
	  	$('#form_modifierRestaurant_restaurateur option:first').text(restaurateur_nom);
	  	$('#form_modifierRestaurant').show();
	  	labels_hide();
	}

    function livreur_form_values(id, nom, prenom, identificateur, mot_de_passe ) {

		$('#livreur_nom_edit').val(nom);
	  	$('#livreur_prenom_edit').val(prenom);
	  	$('#livreur_identificateur_edit').val(identificateur);
	  	$('#livreur_mdp_edit').val(mot_de_passe);
	  	$('#livreur_id_edit').val(id);
	  	$('#form_modifierLivreur').show();
	  	labels_hide();
	}

    return{
      init:init,
      restaurateur_form_values:restaurateur_form_values,
      restaurant_form_values:restaurant_form_values,
      livreur_form_values:livreur_form_values,
      restaurateur_new:restaurateur_new,
      restaurateur_delete:restaurateur_delete,
      restaurateur_update:restaurateur_update,
      restaurant_new:restaurant_new,
      restaurant_delete:restaurant_delete,
      restaurant_update:restaurant_update,
      livreur_new:livreur_new,
      livreur_delete:livreur_delete,
      livreur_update:livreur_update,
    }
  })();

  var restaurateur=(function(){ 
    function init(){
  		$('#menu-form').hide();
  		$("#cmd").hide();
  		$('#plats-error').hide();
    }

    function getRestaurant(){
          $.ajax({
              type: "GET",
              url: "/api/getRestaurantForRestaurateur",
              dataType: "html",
              success: function(result){
              	 restaurant = $.parseJSON(result)
                if(restaurant != null){
                  $('#resto').text(" " + restaurant.nom);
              	}
              	else{
                  	$('#resto').text(" Aucun restaurant");
              	}
              }        
          });
    }

    function getMenu(){
          $.ajax({
              type: "GET",
              url: "/api/getRetaurantMenu",
              dataType: "html",
              success: function(result){
              	menu = $.parseJSON(result)
                if(menu != null){
                  $('#menu').text(" " + menu.nom);
                  $('.rstoid').attr("id",menu.restaurant_id);
                  getCommandesNotReady();
                  $('#newMenu').hide();
                  $('#menu-form').hide();
                  $('#id-newPlat').show();
                  $('#plats-form').show();
                  $('#nouveau-plat').hide();
                  $('#informations-plat').hide();
                  $('#modifier-plat').hide();
              	}
              	else{
                  	$('#menu').text(" Aucun menu");
                  	$('#plats-form').hide();
                  	$('#id-newPlat').hide();
              	}
              }        
          });
    }

    function bindMenu(){
	 $.ajax({
          type: "GET",
          url: "/api/bindMenu",
          data:{
          	nom: $('#resto_menu').val(),
          },
          dataType: "html",
          success: function(result){
          	menu = $.parseJSON(result);
          	getMenu();
          }        
      });
    }

    function newMenu(){
    	$('#menu-form').show();
    }

    function newPlat(){
    	 $('#nouveau-plat').show();
    }

    function modPlat(id){
    	$('#modifier-plat').show();
    	$.ajax({
			type: "GET",
			url: "/api/plat",
			data:{
				id: id,
			},
			dataType: "html",
			success: function(result){
				plat = $.parseJSON(result);
				$("#plat_mod-nom").val(plat.nom);
				$("#plat_mod-description").val(plat.description);
				$("#plat_mod-prix").val(plat.prix);
				$("#plat_mod-action").attr("href","javascript:app.restaurateur.modifierPlat("+plat.id+")");
			}        
      	});
    }

    function createPlat(){
    	var nom = $('#plat_nom').val();
    	var prix = $('#plat_prix').val();
    	var description = $('#plat_description').val();
    	var error ="";
    	if(nom == ""){
    		error+='le nom du menu est obligatoire<br/>'	
    	}
    	if(description == ""){
    		error+='qu’aucune description n’a été fournie<br/>'
    		$('#plats-error').html('qu’aucune description n’a été fournie');		
    	}
    	if(prix == ""){
    		error+='aucun prix n’a été fournie<br/>'	
    	}

    	if(error!=""){
    		$('#plats-error').html(error);
    		$('#plats-error').show();
    	}
    	else{
    		$('#plats-error').hide();
	   		$.ajax({
	          type: "GET",
	          url: "/api/createPlat",
	          data:{
	          	nom: $('#plat_nom').val(),
	          	prix: $('#plat_prix').val(),
	          	description: $('#plat_description').val(),
	          },
	          dataType: "html",
	          success: function(result){
	          	plat = $.parseJSON(result);
	          	if(plat != 0){
	          		$("#ul-plats").append('<li id="'+plat.id+'"><span class="plat-nom">'+plat.nom+'</span><span class="spacing">'+plat.prix+'$<a class="admin-btn-style" href="javascript:app.restaurateur.modPlat('+plat.id+')">modifier</a></span> </li>');
	          		$('#nouveau-plat').hide();
	          		$('#plat_nom').val("");
	          		$('#plat_prix').val("");
	          		$('#plat_description').val("");
	          	}
	          }        
	     	});
    	}
    }
    function modifierPlat(id){
   		$.ajax({
          type: "GET",
          url: "/api/modPlat",
          data:{
          	id:id,
          	nom: $("#plat_mod-nom").val(),
          	prix: $("#plat_mod-prix").val(),
          	description: $("#plat_mod-description").val(),
          },
          dataType: "html",
          success: function(result){
          	plat = $.parseJSON(result);
          	if(plat != 0){
          		$("#"+plat.id).html('<span class="plat-nom">'+plat.nom+'</span><span class="spacing right">'+plat.prix+'$<a class="admin-btn-style" href="javascript:app.restaurateur.modPlat('+plat.id+')">modifier</a></span>');
          		$("#info-nom-plat").text("");
				$("#info-prix-plat").text("");
				$("#info-description-plat").text("");
				$("#plat_mod-action").attr("href","#");
				$('#informations-plat').hide();
                $('#modifier-plat').hide();
          	}
          }        
     	});
    }

    function getPlats(){
    	$.ajax({
          type: "GET",
          url: "/api/listPlat",
          dataType: "html",
          success: function(result){
			$.each($.parseJSON(result), function(idx, obj) {
				$("#ul-plats").append('<li id="'+obj.id+'"><span class="plat-nom">'+obj.nom+'</span><span class="spacing right">'+obj.prix+'$<a class="admin-btn-style" href="javascript:app.restaurateur.modPlat('+obj.id+')">modifier</a></span><br/><span>'+obj.description+'</span> </li>');
			});

          }        
      	});
    }

    function getCommandesNotReady(){
    	val = $('.rstoid').attr('id');
    	$.ajax({
          type: "GET",
          url: "/api/commandesRestaurantsNotReady",
          dataType: "html",
          data:{
          	restaurant_id:val,
          },
          success: function(result){
			$.each($.parseJSON(result), function(idx, obj) {
				status = "";
				if(!obj.status_pret)
					status = "non pret"

				$(".commandes-items").append('<tr class="tr" id="tr_'+obj.id+'"><td>'+obj.id+'<a class="hunt-btn-style" href="javascript:app.restaurateur.getOrder('+obj.id+')">preparer</a></td><td>'+obj.no_confirmation+'</td><td>'+obj.date_de_commande+'</td><td>'+obj.heure_de_commande+'</td><td id="td_status'+obj.id+'">'+status+'</td></tr>');
			});
          }        
      	});
    }

    function getOrder(id){
    	$.ajax({
          type: "GET",
          url: "/api/commandeOrder",
          data:{
          	id:id
          },
          dataType: "html",
          success: function(result){
          	order = $.parseJSON(result);
          	$('#td_status'+order.id).text("en preparation");
          	$("#cmd-id").text("#"+order.id);
          	$("#cmd-prix").text(order.prix_total+"$"); 
          	$("#cmd-conf").text(order.no_confirmation);
          	getOrderItems(order.id);
          	getAdresse(order.adresse_id);
          	$('#cmd-total').text(order.prix_total+"$");
          	$('#cmd-function').attr('href','javascript:app.restaurateur.ready('+order.id+')');
          	$("#cmd").show();
          }        
      	});
    }

    function getOrderItems(id){
    	$.ajax({
          type: "GET",
          url: "/api/commandeOrderItems",
          data:{
          	commande_id:id
          },
          dataType: "html",
          success: function(result){
          	$('.order-items').html('');
          	$.each($.parseJSON(result), function(idx, obj) {
          		$('.order-items').append('<span class="bill">'+obj.nom+' x '+obj.quantitee+'<span class="bill-price">'+obj.prix+'$</span></span><br/>');
			});
          }        
      	});    	
    }

    function getAdresse(id){
    	$.ajax({
          type: "GET",
          url: "/api/commandeAddr",
          data:{
          	id:id
          },
          dataType: "html",
          success: function(result){
          	addr = $.parseJSON(result);
          	$("#addr_no_maison").text(addr.no_maison);
          	$("#addr_rue").text(addr.rue);
          	$("#addr_ville").text(addr.ville);
          	$("#addr_code_postal").text(addr.code_postal);
          	$("#addr_telephone").text(addr.telephone);
          	}        
      	});    	
    }

    function ready(id){
 		$.ajax({
          type: "GET",
          url: "/api/commandeOrderReady",
          data:{
          	commande_id:id
          },
          dataType: "html",
          success: function(result){
          	cmd = $.parseJSON(result);
          	if(cmd.status_pret){
          		$('#td_status'+order.id).text("pret");
          		$("#cmd").hide();
          	}


          	}        
      	});    	   	
    }

    return{
      init:init,
      getRestaurant:getRestaurant,
      newMenu:newMenu,
      getMenu:getMenu,
      getPlats:getPlats,
      bindMenu:bindMenu,
      newPlat:newPlat,
      modPlat:modPlat,
      createPlat:createPlat,
      modifierPlat:modifierPlat,
      getCommandesNotReady:getCommandesNotReady,
      getOrder:getOrder,
      ready:ready,
    }
  })();

var livreur=(function(){ 

    function init(){

    }

    function afficher_commande_details(commande, heure, plats) {
    	$('#commande_id').html('#' + commande.id);
    	$('#no_confirmation').html('confirmation: ' + commande.no_confirmation);
    	$('#date_commande').html('date: ' +commande.date_de_commande + ' à ' + heure);
    	$('#commande_plats').html(' <h5 style="color:#C0C0C0"> Commande</h5>');
    	for (var i=0; i< plats.length; i++) {  	    
		 	$('#commande_plats').last().append('<span>' +plats[i].nom + '<span class="bill-price">' + plats[i].prix + '$</span><br/>');
		}
		$('#commande_plats').last().append('<br/><span>TOTAL<span class="bill-price">' + commande.prix_total + '$</span>');
    	$('#livraison_client').html("<a class='hunt-btn-style' href='/livrerCommande/0'>Livrer</a>");
    	$.ajax({
		    type: "GET",
		    url: "/management/livraisonDetails/" + commande.id,
		    dataType: "json",
		    success: function(response){
		        if (response.response == '1') {
		        	adresse_client_template = "<h5 style='color:#C0C0C0'>Adresse du client</h5>\
                        <strong>Client</strong><br>\
                          "+ response.adresse_client[0].no_maison+" "+ response.adresse_client[0].rue +",<br>\
                          "+ response.adresse_client[0].ville+", CA "+ response.adresse_client[0].code_postal+"<br>\
                        <abbr title='Phone'>P:</abbr> "+ response.adresse_client[0].telephone+"\
                  	</div>"
		        	$('#adresse_client').html(adresse_client_template);
		        	adresse_restaurant_template = "<h5 style='color:#C0C0C0'>Adresse du Restaurant</h5>\
                        <strong>" + response.adresse_restaurant[0].nom + "</strong><br>\
                          "+ response.adresse_restaurant[0].no_maison+" "+ response.adresse_restaurant[0].rue +",<br>\
                          "+ response.adresse_restaurant[0].ville+", CA "+ response.adresse_restaurant[0].code_postal+"<br>\
                        <abbr title='Phone'>P:</abbr> "+ response.adresse_restaurant[0].telephone+"\
                  	</div>"
		        	$('#adresse_restaurant').html(adresse_restaurant_template);
		        	$('#livraison_client').html('<a class="hunt-btn-style" href="javascript:void(0)" onclick="app.livreur.livrerCommande('+ commande.id +')">Livrer</a>');
		        	google_map.calcRoute(response.adresse_client[0].code_postal, response.adresse_restaurant[0].code_postal);    	
		        } else {	//rep 0	
		        	console.log("Les adresses n'ont pas pu être loadées.");
		        }
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
    			console.log("Status: " + textStatus + "Error: " + errorThrown);
			}          
		});
    }

    function livrerCommande(commande_id) {

    	$.ajax({
		    type: "GET",
		    url: "/livrerCommande/" + commande_id,
		    dataType: "json",
		    success: function(response){
		        if (response.response == '1') {
		        	$('#livraison_succes').html('Livraison enregistrée');
				  } else {	//rep 0	
		        	console.log("La livraison n'a pas été enregistrée.");
		        }
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) { 
    			console.log("Status: " + textStatus + "Error: " + errorThrown);
			}          
		});
    }

    return{
      init:init,
      afficher_commande_details:afficher_commande_details,
      livrerCommande:livrerCommande,
    }
  })();


	//return function
  return{
  		general:general,
  		users:users,
  		restaurateur:restaurateur,
	  	entrepreneur:entrepreneur,
	  	livreur:livreur,
	  	
		app_module_log:app_module_log,
		app_admin_hide:app_admin_hide,
		app_nouveau_restaurateur:app_nouveau_restaurateur,
		app_nouveau_restaurant:app_nouveau_restaurant,
		app_nouveau_livreur:app_nouveau_livreur,
		app_gerer_restaurateur:app_gerer_restaurateur,
		app_gerer_restaurant:app_gerer_restaurant,
		app_gerer_livreur:app_gerer_livreur,
		app_menus_hide:app_menus_hide,
		app_add_menu:app_add_menu,
		app_menus:app_menus,
		app_menu_preparation:app_menu_preparation,
	}
})();


function shoopingCart(){
	this.items = new Array();
}
shoopingCart.prototype.pushItem = function(item){
	this.items.push(item);
}
shoopingCart.prototype.find = function(id){
	if(this.items.length>0){
		for (var i = 0; i < this.items.length; i++) {
			if(this.items[i].id == id){
				return i;
			}
		}
	}
	return null;
}
shoopingCart.prototype.remove = function(id){
	if(this.items.length>0){
		for (var i = 0; i < this.items.length; i++) {
			if(this.items[i].id == id){
				this.items.splice(i,1);
			}
		}
	}
}
shoopingCart.prototype.total = function(){
	var total = 0;
	for (var i = 0; i < this.items.length; i++) {
		total+=parseFloat(this.items[i].qte * this.items[i].plat.prix);
	}
	return total;
}

function shoopingCartItems(id,plat){
	this.id = id;
	this.plat = plat;
	this.qte = 1;
}
shoopingCartItems.prototype.addQTE = function(){
	this.qte += 1;
}
shoopingCartItems.prototype.minusQTE = function(){
	this.qte -= 1;
}
function shoopingCartPlat(nom,description,menu_id,prix){
	this.nom = nom;
	this.prix = prix;
	this.menu_id = menu_id;
	this.prix = prix;
}



var google_map=(function(){ 

    function init(){
    	directionsService = new google.maps.DirectionsService();
    	directionsDisplay = new google.maps.DirectionsRenderer();
    	google.maps.event.addDomListener(window, 'load', initialize);
    }
   
	function initialize() {
		
		var mapOptions = {
		  zoom: 10,
		  center: new google.maps.LatLng(45.5086, -73.5539)
		};
		var map = new google.maps.Map(map_canvas, mapOptions);
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('directions-panel'));
	}

	function calcRoute(commande_zip, restaurant_zip) {

		var request = {
		  origin: restaurant_zip,   //code postale du livreur
		  destination: commande_zip,  //code postale de la commande
		  travelMode: google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
		  if (status == google.maps.DirectionsStatus.OK) {
		    directionsDisplay.setDirections(response);
		  }
		});
	}

    return{
      init:init,
      initialize:initialize,
      calcRoute:calcRoute,
    }
  })();
