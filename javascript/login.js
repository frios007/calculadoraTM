function loguear(){
 //  let user=document.getElementById("usuario").value;
 // let pass=document.getElementById("pass").value;

  // if(usuario.trim()=== "" || password.trim() === ''){
      //alert("Ingrese todos los campos");
       // return;
   //}
    window.location.href ="/html/menu.html";
}


    var checkbox = document.getElementById("contenido");
    var elemento = document.getElementById("mostrarContenido");

    checkbox.addEventListener("change", function(){
        if(checkbox.checked){
            elemento.style.display="block";
        }
        else{
            elemento.style.display="none";
        }
    });
    