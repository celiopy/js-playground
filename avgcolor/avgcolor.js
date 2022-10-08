function cToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
    return "#" + cToHex(rgb[0]) + cToHex(rgb[1]) + cToHex(rgb[2]);
}

function avgColor(img, hex = false) {

    const blocks = 20; // tamanho do bloco para seleção da cor (n * pixels)

    let rgb = [0, 0, 0]; // padrão

    // cria um canvas e extrai o contexto
    const canvas = document.createElement('canvas'), 
          context = canvas.getContext && canvas.getContext('2d');

    let data, width, height,
        i = 4, length, count = 0;

    if (!context)
        return rgb;

    height = canvas.height = img.naturalHeight || img.offsetHeight || img.height;
    width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;

    context.drawImage(img, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* erro de segurança, img em domínio diferente */
        return rgb;
    }

    length = data.data.length;

    // soma i ao valor de blocos * 4, enquanto menor que length
    // gera os valores rgb para cada visita
    while ( (i += blocks * 4) < length ) {
        ++count;
        rgb[0] += data.data[i];
        rgb[1] += data.data[i+1];
        rgb[2] += data.data[i+2];
    }

    // ~~ usado para arredondar valores
    rgb[0] = ~~(rgb[0]/count);
    rgb[1] = ~~(rgb[1]/count);
    rgb[2] = ~~(rgb[2]/count);

    if ( hex ) {
        rgb = rgbToHex(rgb);
    } else {
        rgb = rgb.join(', ');
    }

    return rgb;
}

// Use it like this, or whatever you want, 
// just run the function and it will extract the color from img.

(async () => {

    window.addEventListener("load", event => {
        let img = document.querySelector('.me'); 

        // garantir que a img existe
        if(img.complete && img.naturalHeight !== 0) {
            // rgb
            let rgb = avgColor(img);
            console.log(rgb);

            // hex
            let hex = avgColor(img, true);
            console.log(hex);
        }
    });

})();
