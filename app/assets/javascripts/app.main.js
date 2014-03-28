//Fichier de javascript
app = (function(){

	function app_module_log() {
	  el = document.getElementById("overlay");
	  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
		join();
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

    function init(){

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
			    		$('.lstRestaurants').append('<option id="'+obj.id+'">'+obj.nom+'</option>');
						console.log(obj);
					});
			    }        
			});
		}

    return{
      init:init,
      redirect:redirect,
      app_open:app_open,
      app_signin:app_signin,
      app_register:app_register,
      app_restaurants:app_restaurants
    }
  })();

  var users=(function(){ 
    function init(){

    }

    function oauth(){
			$.ajax({
			    type: "GET",
			    url: "/api/signin",
			    data: {
			    	identificateur : $('#_aka').val(),
			    	mot_de_passe : $('#_password').val()
			    	
			    },
			    dataType: "html",
			    success: function(result){
			        console.log(result);
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
			        console.log(result);
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

    function restaurateur_form_values(id, nom, prenom, identificateur, mot_de_passe ) {
		//Cette fonctio place les valeur de la table vers un formulaire pour modifier un restaurateur
		//$('#restaurateur_id_edit').val(id);	//id creer par rails
		$('#restaurateur_nom_edit').val(nom);
	  	$('#restaurateur_prenom_edit').val(prenom);
	  	$('#restaurateur_identificateur_edit').val(identificateur);
	  	$('#restaurateur_mdp_edit').val(mot_de_passe);

	  	//pour modifier l'url de l'action du formulaire
	  	$('#form_modifierRestaurateur').attr('action', '/modifierRestaurateur/'+ id);
	  	//Il faut mettre le _path d'un restaurateur comme varaible pour ne pas devoir harcoder l'url du controller
	}

	function restaurant_form_values(id, nom, no_maison, rue, ville, code_postal, telephone) {
		$('#restaurant_nom_edit').val(nom);
	  	$('#restaurant_no_maison_edit').val(no_maison);
	  	$('#restaurant_rue_edit').val(rue);
	  	$('#restaurant_ville_edit').val(ville);
	  	$('#restaurant_code_postal_edit').val(code_postal);
	  	$('#restaurant_telephone_edit').val(telephone);

	  	//pour modifier l'url de l'action du formulaire
	  	$('#form_modifierRestaurant').attr('action', '/modifierRestaurant/'+ id);
	}

    function livreur_form_values(id, nom, prenom, identificateur, mot_de_passe ) {

		$('#livreur_nom_edit').val(nom);
	  	$('#livreur_prenom_edit').val(prenom);
	  	$('#livreur_identificateur_edit').val(identificateur);
	  	$('#livreur_mdp_edit').val(mot_de_passe);

	  	//pour modifier l'url de l'action du formulaire
	  	$('#form_modifierLivreur').attr('action', '/modifierLivreur/'+ id);
	  	//Il faut mettre le _path d'un restaurateur comme varaible pour ne pas devoir harcoder l'url du controller
	}


    return{
      init:init,
      restaurateur_form_values:restaurateur_form_values,
      restaurant_form_values:restaurant_form_values,
      livreur_form_values:livreur_form_values,
    }
  })();

  var restaurateur=(function(){ 
    function init(){
  		$('#menu-form').hide();
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
              	console.log(menu)
                if(menu != null){
                  $('#menu').text(" " + menu.nom);
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
          	console.log(menu);
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

    function informationPlat(id){
    	$('#informations-plat').show();
    	$('#modifier-plat').hide();
    	$.ajax({
			type: "GET",
			url: "/api/plat",
			data:{
				id: id,
			},
			dataType: "html",
			success: function(result){
				plat = $.parseJSON(result);
				$("#info-nom-plat").text(plat.nom);
				$("#info-prix-plat").text(plat.prix+"$");
				$("#info-description-plat").text(plat.description);
			}        
      	});
    }

    function createPlat(){
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
          	console.log(plat);
          	if(plat != 0){
          		$("#ul-plats").append('<li id="'+plat.id+'"><a href="javascript:app.restaurateur.informationPlat('+obj.id+')">'+plat.nom+'</a><span class="spacing">'+plat.prix+'$<a class="admin-btn-style" href="javascript:app.restaurateur.modPlat('+obj.id+')">modifier</a></span> </li>');
          		$('#nouveau-plat').hide();
          		$('#plat_nom').val("");
          		$('#plat_prix').val("");
          		$('#plat_description').val("");
          	}
          }        
     	});
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
          	console.log(plat);
          	if(plat != 0){
          		$("#"+plat.id).html('<a href="javascript:app.restaurateur.informationPlat('+obj.id+')">'+plat.nom+'</a><span class="spacing right">'+plat.prix+'$<a class="admin-btn-style" href="javascript:app.restaurateur.modPlat('+obj.id+')">modifier</a></span>');
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
          data:{
          	nom: $('#resto_menu').val(),
          },
          dataType: "html",
          success: function(result){
			$.each($.parseJSON(result), function(idx, obj) {
				$("#ul-plats").append('<li id="'+obj.id+'"><a href="javascript:app.restaurateur.informationPlat('+obj.id+')">'+obj.nom+'</a><span class="spacing right">'+obj.prix+'$<a class="admin-btn-style" href="javascript:app.restaurateur.modPlat('+obj.id+')">modifier</a></span> </li>');
			});

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
      informationPlat:informationPlat,
      createPlat:createPlat,
      modifierPlat:modifierPlat,
    }
  })();

  //return function
  return{
  		general:general,
  		users:users,
  		restaurateur:restaurateur,
	  	entrepreneur:entrepreneur,
	  	
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
