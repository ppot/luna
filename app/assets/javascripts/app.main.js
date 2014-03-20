//Fichier de javascript
app = (function(){

	function app_module_log() {
	  el = document.getElementById("overlay");
	  el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
		join();
	}

	function signin(){
		$('#signin').show();
		$('#register').hide();
		$('.already-member').hide();
	}

	function join(){
		$('#signin').hide();
		$('#register').show();
		$('.already-member').show();
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
	//return function
  return{
      app_module_log:app_module_log,
      signin:signin,
      join:join,
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
      restaurateur_form_values:restaurateur_form_values,
      restaurant_form_values:restaurant_form_values,
      livreur_form_values:livreur_form_values,
	}
})();
