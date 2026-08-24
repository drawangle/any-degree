var mes = {};
mes["tosvg_success"] = "The SVG code has been copied to the clipboard!";
mes["topng_success"] = "The image has been copied to the clipboard! You can paste it into other apps.";
mes["copy_error"] = "Copy failed:";
mes["svg_notfound"] = "SVG element not found.";
mes["png_error"] = "Conversion to PNG failed.";
/////////////////////////////////////////
// 1. SVGコードをクリップボードにコピーする関数
// 2. 実行（先ほどのコードの直後に置く場合）
// ※ブラウザのセキュリティ制限のため、実際には「ボタンのクリックイベント」などの中。実行する必要があります。
//copySvgAsCode(svg);
/////////////////////////////////////////
async function copySvgAsCode() {
    try {
    // SVG要素をテキスト文字列（<svg>...</svg>）に変換
    const serializer = new XMLSerializer();
    const svgElement = document.getElementById('arc-slider');

    const svgString = serializer.serializeToString(svgElement);

    // クリップボードにテキストとして書き込み
    await navigator.clipboard.writeText(svgString);
    alert(mes["tosvg_success"]);
    } catch (err) {
    console.error(mes["copy_error"], err);
    }
}

/////////////////////////////////////////
// SVGを画像に変換してクリップボードにコピーする関数
// ユーザーのクリックイベント（onClickなど）の直下でこの関数を呼び出してください
// AndroidのChromeでエラー（例外）が発生する場合、原因はほぼ「HTTPS通信（常時SSL）になっていないこと」
// 、または「Android版Chrome特有のセキュリティ（フォーカス制限）」のどちらかです。
/////////////////////////////////////////
async function copySvgToClipboardAsPng() {
    try {
    // 1. クリップボードへの書き込みを即座に開始（スマホのセキュリティ対策）
    const item = new ClipboardItem({
        "image/png": new Promise((resolve, reject) => {
        
        // ① SVG要素を取得してBlob化
        const svg = document.getElementById('arc-slider');
        if (!svg) {
            reject(new Error(mes["svg_notfound"]));
            return;
        }
        
        // サイズ（viewBoxまたは属性から取得、デフォルト400）
        const width = svg.viewBox?.baseVal?.width || svg.width?.baseVal?.value || 400;
        const height = svg.viewBox?.baseVal?.height || svg.height?.baseVal?.value || 400;
        
        const svgString = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const blobURL = URL.createObjectURL(svgBlob);
        
        // ② SVGを一度Imageオブジェクトに読み込ませる
        const img = new Image();
        img.src = blobURL;
        
        img.onload = () => {
            // ③ 読み込み完了後、メモリ上にCanvasを作成して描画
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            
            const ctx = canvas.getContext('2ctx' in window ? '2d' : '2d'); // 一般的な2Dコンテキスト
            ctx.drawImage(img, 0, 0, width, height);
            
            // ④ CanvasからPNGのBlobを取り出してPromiseを解決（resolve）
            canvas.toBlob((pngBlob) => {
            URL.revokeObjectURL(blobURL); // メモリ解放
            if (pngBlob) {
                resolve(pngBlob);
            } else {
                reject(new Error(mes["png_error"]));
            }
            }, "image/png");
        };
        
        img.onerror = (err) => {
            URL.revokeObjectURL(blobURL);
            reject(err);
        };
        })
    });

    // 2. クリップボードへ書き込みを実行
    await navigator.clipboard.write([item]);
    alert(mes["topng_success"]);

    } catch (err) {
    console.error("Copying to the clipboard failed, or your browser does not support this feature.", err);
    alert(mes["copy_error"]);
    }
}
document.getElementById("copy-png-btn").addEventListener("click", () => {
    // ここで上記の関数を呼び出す
    copySvgToClipboardAsPng();
});
document.getElementById("copy-svg-btn").addEventListener("click", () => {
    // ここで上記の関数を呼び出す
    copySvgAsCode();
});
