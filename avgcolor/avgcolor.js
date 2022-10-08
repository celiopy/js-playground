function avgColor(img) {

    const blocks = 20; // tamanho do bloco para seleção da cor (n * pixels)

    let rgb = [0, 0, 0]; // padrão

    // cria um canvas
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

    return rgb;
}

// brightness
// const brightness = Math.round(((parseInt(rgb[0]) * 299) +
// (parseInt(rgb[1]) * 587) +
// (parseInt(rgb[2]) * 114)) / 1000);
// // console.log(brightness);

// rgb[3] = (brightness > 175) ? 'black' : 'white';

(async () => {
//   let blob = await fetch("https://images.unsplash.com/photo-1537017469405-7faf1912af7c?ixid=MnwzMDUwMHwwfDF8cmFuZG9tfHx8fHx8fHx8MTY1Mzk5ODA1OQ&ixlib=rb-1.2.1").then(r => r.blob());
//   let dataUrl = await new Promise(resolve => 
//   {
//     let reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.readAsDataURL(blob);
//   });

    window.addEventListener("load", event => {
        let img = document.querySelector('img'); 

        // garantir que a img existe
        if(img.complete && img.naturalHeight !== 0) {
            let rgb = avgColor(img), 
            rgbText = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';

            console.log(rgbText);
        }
    });

})();
