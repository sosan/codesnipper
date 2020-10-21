window.addEventListener("load", onLoadPage);
document.getElementById("descripcion").addEventListener("input", rellenarDescripcion);
document.getElementById("prefijo").addEventListener("input", rellenarDescripcion);
document.getElementById("codigo").addEventListener("input", rellenarDescripcion);

document.getElementById("btnEnviarNotion").addEventListener("click", enviarNotion);
document.getElementById("btnEnviarGist").addEventListener("click", enviarGist);
document.getElementById("tooltip").addEventListener("click", copyText);
document.getElementById("tooltip").addEventListener("mouseout", outCopy);




document.getElementById("codigo").addEventListener("keydown", function (e) 
{
    if (e.keyCode === 9 && document.activeElement.id === "codigo") 
    {
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var target = e.target;
        var value = target.value;

        target.value = value.substring(0, start)
            + "\t"
            + value.substring(end);

        this.selectionStart = this.selectionEnd = start + 1;
        rellenarDescripcion();
        e.preventDefault();
    }


}, false);


function rellenarDescripcion() 
{

    const descripcion = document.getElementById("descripcion").value;
    const prefijo = document.getElementById("prefijo").value;
    const codigoUsuario = document.getElementById("codigo").value;

    
    const codigoConvertido = codigoUsuario
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .split("\n");

    const resultadoSnippet = codigoConvertido.map((line, index) => {
        return index === codigoConvertido.length - 1 ? `"${line}"` : `"${line}",`;
    });
    
    const html = `"${descripcion}": {
        "prefix": "${prefijo}",
        "body": [
            ${resultadoSnippet.join("\n")}
        ],
        "description": "${descripcion}"
}`;
    document.getElementById("resultado").innerText = html;
    
}


function copyText()
{
    const resultadoACopiar = document.getElementById("resultado");

    let rangoActual;
    if (document.getSelection().rangeCount > 0)
    {
        rangoActual = document.getSelection().getRangeAt(0);
        window.getSelection().removeRange(rangoActual);
    }
    

    const rangoACopiar = document.createRange();
    rangoACopiar.selectNode(resultadoACopiar);
    window.getSelection().addRange(rangoACopiar);
    document.execCommand("copy");
    window.getSelection().removeRange(rangoACopiar);

    const tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "Copiado!";
}

function outCopy()
{
    let tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = "Copiar";
}

async function enviarGist()
{

    const token = document.getElementById("tokenGist").value;
    
    if( token === "")
    {
        return;
    }
    setCookie(null, null, token);

    console.log("enviando al server");

    const codigo = document.getElementById("resultado").innerText;
    const lenguaje = document.getElementById("lenguaje_codigo").value;

    const data = { 

        "description": "Snipplet " + lenguaje,
        "public": false,
        "files": {
            "": {
                "content": codigo
            },
        }

    };


    fetch("https://api.github.com/gists", {
        method: "POST",
        headers: {
            'Authorization':'token ' + token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log("resuestas=", response.body);
        console.log("resuestas=", response.body);
    })
    .then(respuesta => {
        if (typeof respuesta !== 'undefined') {
            console.log("Success:", JSON.parse(respuesta));
        }
        console.log("Success:", respuesta);

    })
    .catch((error) => {
        console.error("Error:", error);
    });


}


async function enviarNotion()
{
    const tokenNotion = document.getElementById("tokenNotion").value;
    const urlNotion = document.getElementById("urlNotion").value;
    
    if( tokenNotion === "" || urlNotion === "")
    {
        return;
    }
    setCookie(tokenNotion, urlNotion, null);


    console.log("enviando al server");
    
    const codigo = document.getElementById("resultado").innerText;
    const lenguaje = document.getElementById("lenguaje_codigo").value;

    const data = { 
        "codigo": codigo,
        "apiToken": tokenNotion,
        "idPage": urlNotion,
        "lenguaje": lenguaje,
    };

    console.log(JSON.stringify(data));

    fetch("http://localhost:5000/api", {
    // fetch("https://codesnippletback.herokuapp.com/api", {
        mode: "no-cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log("resuestas=", response.body);
        console.log("resuestas=", response.body);
    })
    .then(respuesta => {
        if (typeof respuesta !== 'undefined') {
            console.log("Success:", JSON.parse(respuesta));
        }
        console.log("Success:", respuesta);

    })
    .catch((error) => {
        console.error("Error:", error);
    });

}

function setCookie(tokenNotion, urlNotion, tokenGist)
{

    if (tokenGist)
    {
        var exp = new Date();
        exp.setTime(exp.getTime() + (30 * 24 * 60 * 60 * 1000 * 1000));
        document.cookie = "tokenGist=" + tokenGist + ";path=/; expires=" + exp.toGMTString();
    }

    if (tokenNotion || urlNotion)
    {
        var exp = new Date();
        exp.setTime(exp.getTime() + (30 * 24 * 60 * 60 * 1000 * 1000));
        document.cookie = "token_v2=" + tokenNotion + ";path=/; expires=" + exp.toGMTString();
        document.cookie = "nombreUrl=" + urlNotion + ";path=/; expires=" + exp.toGMTString();
    }
    
}



function getCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}




function onLoadPage()
{
    console.log("cargamos pagina")
    const cookieNotion = getCookie("token_v2");
    const cookieUrl = getCookie("nombreUrl");
    const cookieGist = getCookie("tokenGist");
    
    
    if (cookieNotion || cookieUrl)
    {
        //rellenar url y token
        console.log("rellenar inputs con datos cookie");
        document.getElementById("tokenNotion").value = cookieNotion;
        document.getElementById("urlNotion").value = cookieUrl;
    }
    
    if (cookieGist)
    {
        document.getElementById("tokenGist").value = cookieGist;
    }




}



