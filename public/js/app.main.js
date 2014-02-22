function app_module_log() {
  	el = document.getElementById("overlay");
  	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	join();
}

function signin() {
	$('#signin').show();
	$('#register').hide();
	$('.already-member').hide();
}
function join() {
	$('#signin').hide();
	$('#register').show();
	$('.already-member').show();
}

function admins_log() {
	user = $("#admin_utilisateur").val()
	pass = $('#admin_mot_de_passe').val();
	alert(user + " : " + pass);
}

