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
		$('#restaurateur_id_edit').val(id);	//id creer par rails
		$('#restaurateur_nom_edit').val(nom);
	  	$('#restaurateur_prenom_edit').val(prenom);
	  	$('#restaurateur_identificateur_edit').val(identificateur);
	  	$('#restaurateur_mdp_edit').val(mot_de_passe);
	}

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
	}
})();
