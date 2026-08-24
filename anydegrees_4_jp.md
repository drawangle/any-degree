[ホーム](../index.html) | [概要](../about.html) | [プライバシーポリシー](../privacy.html) | [お問い合わせ](../contact.html)

---

# 角度表示ページ: いろいろな角度を生成

ようこそ **角度表示** のページへ。**いろいろな角度を生成** ツールがお好きな角度をイラストにします。このツールは、どなたでも自由に使っていただけるように、WEBページ上で動作します。   

<!-- ツールUI操作エリア（HTML直書き） -->
<style type="text/css">
  body {
    caret-color: transparent;
  }
</style>
<style>
  /* PC用の基本指定 */
  #setDegreeFrame {
    width: 100%;
    height: 320px; 
    border: 0;
  }
  /* スマホ用（画面幅768px以下の場合） */
  @media (max-width: 768px) {
    #setDegreeFrame {
    width: 50%; /* スマホ画面のコンテンツの高さに合わせて調整 */
    height: 260px; 
  }
}
</style>
<link rel="stylesheet" href="arc_slider.css">

---

## **角度生成** ツールの用途: いろいろな角度をすぐに確認できます

**丸いノブ** を動かして**お望みの角度**に変えてください。即座にイラストが更新されます。


<!-- SVGを配置するコンテナ -->
  <style>
    /* SVG自体のレスポンシブ設定 */
    .gallery-item svg {
      width: 100%;
      height: auto;
      display: block;      /* インラインブロック特有の下部余白を解除 */
    }

  </style>


<div hidden id="current-angle">0</div>

<div id="svg-gallery" class="svg-gallery">


<div class="app-container">
  <div class="svg-wrapper">
    <svg id="arc-slider" viewBox="-120 -120 240 240" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L100,0" fill="none" stroke="#FF9800" stroke-width="2" />
      <g id="slider-knob" transform="rotate(-135, 0, 0)"      >
        <line x1="0" y1="0" x2="85" y2="0" stroke="#FF9800" stroke-width="8" stroke-linecap="round" />
        <circle cx="85" cy="0" r="14" fill="#ffffff" stroke="#7B1FA2" stroke-width="4" filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.3))" />
      </g>
      <g id="spiral"  />
      <g id="point" />
      <text x="0" y="15" text-anchor="middle" font-family="sans-serif" font-size="48" font-weight="bold" fill="#333" id="angle-display">135°</text>
    </svg>
  </div>
  <div class="control-panel">
    <div class="control-label" id="control-label">入力してEnter</div>
    <div class="input-container">
      <input type="text" inputmode="numeric" id="anydegree" placeholder="135" maxlength="8">
      <button type="button" id="clear-btn">&times;</button>
    </div>
  </div>
</div>





<template>
  <div><img src = "/jupyter/drawsvg_001_1.png"></div>
  <!--<img src = "/jupyter/drawsvg_003.png">-->
  <img src = "/jupyter/drawsvg_003_1.png">
  <img src = "/jupyter/drawsvg_006_1.png">
  <!--<img src = "/jupyter/drawsvg_007.png">-->
  <img src = "/jupyter/drawsvg_007_1.png">
  <img src = "/jupyter/drawsvg_008_1.png">
  <!--<img src = "/jupyter/drawsvg_011.png">
  <img src = "/jupyter/drawsvg_012.png">-->
  <img src = "/jupyter/drawsvg_012_1.png">
  <!--<img src = "/jupyter/drawsvg_013.png">-->
  <img src = "/jupyter/drawsvg_014.png">
  <img src = "/jupyter/drawsvg_015_1.png">
  <img src = "/any-degree/angle_sim_tool.png">
</template>

</div>
<script src="drawsvg_main.js"></script>
<script src="set_degree_tool.js"></script> 
<script src="drawsvg_001_1.js"></script>
<script src="drawsvg_003_1.js"></script>
<script src="drawsvg_006_1.js"></script>
<script src="drawsvg_007_1.js"></script>
<script src="drawsvg_008_1.js"></script>
<script src="drawsvg_012_1.js"></script>
<script src="drawsvg_014_1.js"></script>
<script src="drawsvg_015_1.js"></script>


<script>
  const gallery = document.getElementById('svg-gallery');
  // 半径
  let r = 100;
  // 初期角度
  //let degree = 360;
  //let degree = 359;
  let degree = 135;
  //let degree = 290;
  //let degree = 60;
  //let degree = 30;
  //let degree = 20;
  //let degree = 10;
  //let degree = 3;
  //let degree = 1;
  //let degree = 0;


  // タスクリスト
  const taskList = [
    { fn: drawsvg_001_1, args: [degree, r] },
    { fn: drawsvg_003_1, args: [degree, r] },
    { fn: drawsvg_006_1, args: [degree, r] },
    { fn: drawsvg_007_1, args: [degree, r] },
    { fn: drawsvg_008_1, args: [degree, r] },
    { fn: drawsvg_012_1, args: [degree, r] },
    { fn: drawsvg_014_1, args: [degree, r] },
    { fn: drawsvg_015_1, args: [degree, r] }
  ];

  function setupGallery() {
    finalAngle = degree;
    console.log('setupGallery', degree)
    //_degree = document.getElementById('anydegree').value;
    document.getElementById('anydegree').value = degree
    degree = document.getElementById('anydegree').value;
    //console.log('setupGallery', degree)


    // forEachで実行と後処理を行う
    taskList.forEach(task => {
      // 1. ラッパー要素の作成
      const wrapper = document.createElement('div');
      wrapper.className = 'gallery-item';
      // 1. style プロパティ経由で背景色を設定する（最も一般的）
      wrapper.style.backgroundColor = '#ECEFF1'; //Blue Grey 50
      // id を付与
      wrapper.id = task.fn.name;
      // 1. 関数を実行して結果を受け取る
      const result = task.fn(...task.args);

      // SVG PNG ボタンを挿入
      /*
      <div class="container">
          <button id="copy-svg-btn">To SVG</button>
          <button id="copy-png-btn">To PNG</button>
      </div>
      */
      const buttons = document.createElement('div');
      buttons.className = 'container'
      buttons.insertAdjacentHTML(
        'beforeend',
        '<button class="copy-svg-btn" data-tooltip="SVGをクリップボードにコピー">To SVG</button>' +
        '<button class="copy-png-btn" data-tooltip="PNGをクリップボードにコピー">To PNG</button>')
      wrapper.appendChild(buttons);

      // 2. 受け取った結果を使って後処理を行う
      wrapper.appendChild(result);
      gallery.appendChild(wrapper);
    });
  }
  function updateGallery() {
    //最新の degree でSVGを再作成する
    //console.log('updateGallery', degree)
    taskList.forEach(task => {
      const wrapper = document.getElementById(task.fn.name);
      var oldElement = wrapper.lastChild;
      // パラメータ degree を更新する
      task.args[0] = degree;
      // 1. 関数を実行して結果を受け取る
      const result = task.fn(...task.args);
      //wrapper.replaceChild(result, oldElement);
      wrapper.removeChild(oldElement);
      wrapper.appendChild(result);
    });
  }



  setupGallery();
</script>



<!--「横から順に並べたい」「隙間なく完璧に敷き詰めたい」場合は、Macy.js などの軽量ライブラリが最適です。-->
<script src="https://cdn.jsdelivr.net/npm/macy@2"></script>

<script>
  // グローバル変数として保持（後から再描画で呼び出せるようにする）
  let macy;

  // 1. 初期化処理を関数にまとめる
  function initGallery() {
    macy = Macy({
      container: '#svg-gallery',
      trueOrder: false,
      margin: 8,
      columns: 4,
      breakAt: {
        940: 3,
        520: 2,
        400: 1
      }
    });
  }

  // 2. DOMの構築完了時に実行する
  document.addEventListener('DOMContentLoaded', initGallery);


</script>
<!-- クリップボードにイメージをコピーするツール -->
<script src="clip_tools.js"></script> 


設計、作図、デザイン、学習、新しい発見のために、このツールをぜひご利用ください。

---

## **角度生成** ツールの使い方: 角度をイラストにする

**丸いノブ**を動かすとレバーが回転し、その傾きに連動して、イラストが描く図形の角度が増減します。**`入力してEnter`**の入力欄に数字をいれて **`➔`キー** あるいは **`Enter`** を押すことでも可能です。
イラストの**右下**、**左下**に 画像を取得する **ボタン**があります。
![SVG](/jupyter/icon_SVG.svg)ボタンを押すとSVG形式で、![PNG](/jupyter/icon_PNG.svg)ボタンはPNG形式で画像をクリップボードにコピーします。

保存した画像はご自由にご利用いただけます。

----
## SVG画像をPNG画像に変換してファイルに保存する方法

次のテキストを**HTML**ファイルとして作成し、**ブラウザ**で表示すると、表示されたイラストを**画像としてコピー**できます。JavaScriptソースにSVGコードを**文字列**として埋め込んで画像形式を変換しています。

```javascript
<meta charset="UTF-8">
<script>
svgText = `
<!--START-->
<svg xmlns="http://www.w3.org/2000/svg" 
width="120" height="116" viewBox="-10 -106 120 116">
<path stroke="#9C27B0" fill="none" stroke-width="3" 
d="M49.99 -0.88 A50 50 0 0 0 13.78  -48.07 "/>
<path stroke="#9C27B0" fill="none" stroke-width="2" 
d="M100 0 L0 0  25.88 -96.6 "/>
<text x="59" y="-45" font-family="sans-serif" font-size="22" fill="#263238" 
font-weight="500" text-anchor="middle" dominant-baseline="central" >75°</text>
</svg>
<!--END-->
`;
// SVGからバイナリデータを作り、その場所をURLとして取得
const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
const blobURL = URL.createObjectURL(svgBlob);

const img = new Image();
img.onload = () => {
  // Canvasの準備（SVGの描画サイズに合わせる）
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || 500;   // SVG側に width がない場合の予備
  canvas.height = img.naturalHeight || 500; // SVG側に height がない場合の予備
  const ctx = canvas.getContext('2d');

  // 背景を透明ではなく「白」にしたい場合はここで塗ります
  // ctx.fillStyle = '#ffffff';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  // CanvasにSVGを複写
  ctx.drawImage(img, 0, 0);
  // body に追加して画面表示
  document.body.appendChild(canvas);
  // 確実に使い終わったURLを解放
  URL.revokeObjectURL(blobURL);
};
//SVGをimgで描画する
img.src = blobURL;
</script>
```
<a href="/dev/svg2clipboard_local_test9.html" target="_blank">ソースコードへのリンク</a>

### 作業手順: 上のテキストをそのまま貼り付けると画像に変換できます。

1. 新しいファイル `newimg.html` を作ります。ファイルの拡張子は **`.html`** にしてください
1. 空のファイル `newimg.html` をエディターなどで開き、中身を編集していきます。
1. 上のテキストをそのままコピーして、新しいhtmlファイルにペーストします。
1. 上のテキスト中の、  **`<!--START-->`**と **`<!--END-->`** の間にある **`<svg>`**から**`</svg>`**までを削除します。
1. **`角度生成ツール`** が生成したイラストの左下にある**`SVGボタン`**を押してSVGを**コピー**します。
1. 手順**4.**で削除した**`<svg>`****`</svg>`**の位置に、手順**5.** でコピーしたSVGコードを**ペースト**します。
1. ファイル `newimg.html` を保存します。
1. ファイル `newimg.html` をブラウザで開きます。置き換えたSVGコードが画像として表示されます。
1. 右マウスボタンクリック、画像の長押しなど、ブラウザの機能を使って、**画像を保存**や**画像をコピー**が可能になります。
<img src="saveimg-jp.png" width="300" /><img src="saveimg-en.png"  width="300" />


----
## 画像を2倍の大きさに拡大するときは:

1. 上の手順で作ったファイル `newimg.html` をエディターなどで開き、編集していきます。
1. 上のテキスト中にある、`<svg` の後ろにある  `width="`**`120`**`" height="`**`116`**`"` を探します。この部分はSVG画像が画面に表示される大きさを表しています。
1. **2倍**の大きさにするため、`width="`**`240`**`" height="`**`232`**`"`のように**幅**と**高さ**を**2倍**に書き換えます。
1. 保存してブラウザで開くと拡大した画像が表示されます。

> [!TIP]
> SVGイラストを改造したいときも同じ手順で修正することができます。







----
## まとめ

好きな角度を入力して、簡単にイメージで確認できるツールをご紹介しました。完成したイメージはSVG形式、PNG形式の画像として保存し、自由に使用できます。
また、SVG形式のテキストをブラウザ内に画像として表示する方法をご紹介しましたのでお試しください。
新しいイラストのデザイン案に関してご要望をお待ちしています。
**角度生成ツール** は 100% 自由にお使いいただけます。内部での課金、ユーザー登録、機能制限などはありません。必要なだけ何度でもご利用ください。
**角度生成ツール** がお役に立ちましたら、ぜひ当サイトの他の関連ページもご覧ください。

- [角度シミュレーター](/any-degree/spiral_1_jp.md)
- [いろいろな角度を作るページ](/any-degree/anydegrees_4_jp.md)
- [SVGからPNG変換するツール ](/dev/svg2png.html)
- [jsで書いたSVGをイメージオブジェクトに変換する技術文書](/dev/svg2png_tec.html)
- [Sympyで方程式を関数化する技術文書](/dev/svg2png_tec.html)
- [緯度経度を作るツール](/dev/latlngview.html)


----

© 2026 drawangle.com. All rights reserved.
[ホーム](../index.html) | [概要](../about.html) | [プライバシーポリシー](../privacy.html) | [利用規約 / 免責事項](../terms.html) | [お問い合わせ](../contact.html)

