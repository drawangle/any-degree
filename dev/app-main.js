const SVG_NS = "http://www.w3.org/2000/svg";
// SVG要素を作って属性をまとめて適用する汎用関数
function createSVGElement(tagName, attributes) {
    const el = document.createElementNS(SVG_NS, tagName);
    Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
}

function drawArc(degree = Number(document.getElementById("anydegree").value)) {
    //console.log(degree)
    //const svgWrapper = document.createElement("div");
    //svgWrapper.id = `testacr_${degree}_001`;
    //svgWrapper.className = "svg-wrapper";
    
    
    // 2. SVG 要素を「名前空間付き」で作成
    /*
    const svgElement = createSVGElement("svg", {
        "viewBox": "-200 -200 200 200",
        "width": "400",
        "height": "400"
    });*/
    // 1. 親となるSVGコンテナを作成（事前に作成してあれば不要です）
    const svgElement = document.createElementNS(SVG_NS, "svg");
    svgElement.setAttribute("id", "arc-slider"); 
    svgElement.setAttribute("width", "400");
    svgElement.setAttribute("height", "400");
    svgElement.setAttribute("viewBox", "-200 -200 400 400");

    // 3. 中の図形（例: path や circle）も名前空間付きで作成
    // 横線
    const path = createSVGElement("path", {
        "d": "M0 0 H200",
        "fill": "none",
        "stroke": "#FF9800",
        "stroke-width": "2"
    });
    //<g id="slider-knob" transform="rotate(90, 200, 200)">
    const g = createSVGElement("g", {
        "id": "slider-knob"
        //"transform": "rotate(0, 0, 0)"
    });
    //<line x1="200" y1="200" x2="200" y2="35" stroke="#FF9800" stroke-width="8" stroke-linecap="round" />
    const line = createSVGElement("line", {
        "x1": "0",
        "y1": "0",
        "x2": "0",
        "y2": "-165",
        "stroke": "#FF9800", "stroke-width": "8", "stroke-linecap": "round"
    });
    g.appendChild(line);
    //<circle cx="200" cy="35" r="14" fill="#ffffff" stroke="#7B1FA2" stroke-width="4" filter="drop-shadow(0px 3px 5px rgba(0,0,0,0.3))" />
    const circle = createSVGElement("circle", {
        "cx": "0",
        "cy": "-165",
        "r": "14",
        "fill": "#ffffff",
        "stroke": "#7B1FA2",
        "stroke-width": "4",
        "filter": "drop-shadow(0px 3px 5px rgba(0,0,0,0.3))"
    });
    g.appendChild(circle);
    //<g id="spiral"  transform="rotate(0, 200, 200)"></g>
    const gspiral = createSVGElement("g", {
        "id": "spiral"
        //"transform": "rotate(0, 0, 0)"
    });
    //<g id="point" />
    const gpoint = createSVGElement("g", {
        "id": "point"
    });
    //<text x="200" y="215" text-anchor="middle" font-family="sans-serif" font-size="48" font-weight="bold" fill="#333" id="angle-display">0°</text>
    const text = createSVGElement("text", {
        "id": "angle-display",
        "x": "0",
        "y": "15",
        "text-anchor": "middle",
        "font-family": "sans-serif",
        "font-size": "48",
        "font-weight": "bold",
        "fill": "#333"
    });
    text.textContent = "0°";
    const lap_text = createSVGElement("text", {
        "id": "lap-text",
        "x": "0",
        "y": "35",
        "text-anchor": "middle",
        "font-family": "sans-serif",
        "font-size": "20",
        "font-weight": "bold",
        "fill": "#333"
    });
    lap_text.textContent = "";


 


    // 4. 階層構造を組み立てる
    svgElement.appendChild(path);   // path を svg の中に入れる
    svgElement.appendChild(g);   // g を svg の中に入れる
    svgElement.appendChild(gspiral);   // g を svg の中に入れる
    svgElement.appendChild(gpoint);   // g を svg の中に入れる
    svgElement.appendChild(text);   // text を svg の中に入れる
    svgElement.appendChild(lap_text);   // text を svg の中に入れる

    // 5. 画面に追加
    const svgWrapper = document.getElementsByClassName("svg-wrapper");
    if (svgWrapper.length > 0) {
        svgWrapper[0].appendChild(svgElement); // svg を div の中に入れる
    }

}


// 初めにSVGエレメントを作成する
drawArc(135)



const inputEl = document.getElementById('anydegree');
const clearBtn = document.getElementById('clear-btn');

const slider = document.getElementById('arc-slider');
const knob = document.getElementById('slider-knob');
const angle_display = document.getElementById('angle-display');
const spiral = document.getElementById('spiral');


let isDragging = false;

// SVGの viewBox 内の中心座標
const centerX = 0;
const centerY = 0;
// 現在の累計角度
let finalAngle = 0;
//let nlap = 0;
let old_y = 0;



// --- 入力イベントの処理 ---

// Enterキーを検知して描画関数を呼び出す
inputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        //drawArc(inputEl.value);
        drawangle_degree()
        inputEl.blur(); // 入力完了したらスマホのキーボードを閉じる
    }
});

// A. 入力欄に文字が入力されたら「×ボタン」を表示し、空なら非表示にする
inputEl.addEventListener('input', () => {
    if (inputEl.value.length > 0) {
        clearBtn.style.display = 'block'; // 文字があれば表示
    } else {
        clearBtn.style.display = 'none';  // 空なら非表示
    }
});

// B. ×ボタンがクリックされたら、数値をクリアしてボタン自身も隠す
clearBtn.addEventListener('click', () => {
    inputEl.value = '';             // 値をクリア
    clearBtn.style.display = 'none'; // ボタンを非表示にする
    inputEl.focus();                // クリア後、すぐ再入力できるようにフォーカスを戻す
});



/*
document.getElementById("angle-form").addEventListener("submit", function(event) {
    // 画面がリロード（再読み込み）されるのを防ぐ決まり文句
    event.preventDefault(); 
    //const value = document.getElementById("anydegree").value;
    drawangle_degree();
});
*/
// --- イベントリスナーの設定（Pointer Events） ---

// スライダーの上でクリック/タッチされた時
slider.addEventListener('pointerdown', (e) => {
    isDragging = true;
    slider.setPointerCapture(e.pointerId); // マウスが要素外に出ても追跡を維持
    updateAngle(e);
});

// 動かしている時
slider.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    updateAngle(e);
});

// 離された時
slider.addEventListener('pointerup', (e) => {
    isDragging = false;
    lastX = 0
    lastY = 0
    slider.releasePointerCapture(e.pointerId);
});



// 初期状態として135度の円弧を最初に描画しておく
drawangle_degree(135);






function floor3(fval) {
    return Math.floor(fval * 1000) / 1000;
}

function drawangle_degree(any_degree = Number(document.getElementById("anydegree").value)) {
    
    finalAngle = any_degree;
    angle = finalAngle % 360;

    //console.log("何周もする finalAngle angle:", angle, finalAngle); 
    // 何周もするので周回数を記録しておく。
    //nlap = Math.floor(finalAngle / 360);
    old_y = 0;

    // 5. SVGのツマミを回転させ、テキストを更新
    //knob.setAttribute('transform', `rotate(${ 90 - angle}, ${centerX}, ${centerY})`);
    knob.setAttribute('transform', `rotate(${ 90 - angle})`);
    angle_display.textContent = `${Math.abs(finalAngle)}°`;
    if (Math.trunc(finalAngle/360) != 0) {
        // "750° = 2 rot. + 30°" （※rot. は rotations の略）を表示する
        document.getElementById('lap-text').textContent = `${Math.trunc(Math.abs(finalAngle) / 360)} rot. ${Math.trunc(Math.abs(finalAngle) % 360)}°`;
    } else {
        document.getElementById('lap-text').textContent = '';
    }



    // spiralの描画
    drawangleSVG(angle, finalAngle);
}

function unsign(value) {
    return -Math.sign(value); // 値が正なら-1、負なら1を返す
}

function drawangleSVG(angle, finalAngle) {
    // 3. SVG要素の作成 (名前空間の指定が必須)
    const svgNS = "http://www.w3.org/2000/svg";
    const path = document.createElementNS(svgNS, "path");
    // 1. パスのコマンドを格納する配列を作る
    const dSegments = [];
    // 2. 最初の移動と直線をいれる
    const [cx, cy] = [centerX, centerY]; // 中心
    const r = 70;
    const [sx, sy] = [cx + r, cy] // 中心から右に70の位置が開始点
    let rad_arc = (angle * Math.PI) / 180; // 度をラジアンに変換

    dSegments.push(`M ${sx} ${sy}`);
    let w = 10;
    // 3. 後から好きなタイミングで追加していく
    // 反時計回りはプラス角度方向、時計回りはマイナス方向
    let _sx = sx;

    const drift_a = 0.001
    let drift_angle = 0

    let [ex, ey] = [sx, sy];

    for (let i=0; i<30; i++) { //360x30=10800度を最大値とする
        // 最初の半分を描画する。原点は移動なし。反時計回りはプラス。時計回りはマイナス方向
        if (finalAngle >= 360*i+180) {
            dSegments.push(`A 10 10  0 0 0  ${cx - r - w*i} ${cy}`);
        }
        else if (finalAngle <= -360*i-180) {
            dSegments.push(`A 10 10  0 0 1  ${cx - r - w*i} ${cy}`);
        }
        else { //半円まで届かない角度。途中で終わりの弧を描画する
            //半径
            _r = (_sx - (cx - r - w*i)) / 2; // 右端_sx と 予想円の左端の座標から、直径が得られる。
            //中心x
            _cx = _sx - _r;
            ex = floor3(_cx + _r * Math.cos(rad_arc));
            ey = floor3(cy - _r * Math.sin(rad_arc));
            dSegments.push(`A ${_r} ${_r}  0 0 ${Number(finalAngle < 0)}  ${ex} ${ey}`);// angle が正なら0、負なら1
            //console.log(`[1] A ${_r} ${_r}  0 0 ${Number(angle < 0)}  ${ex} ${ey} : ${_sx} ${_cx}`);
            break;
        }

        // 後半の半分を描画する。原点は移動させる。反時計回りはプラス。時計回りはマイナス方向
        _sx = cx - r - w*i; //開始点を最左端にした。目指す終点は最右端。
        if (finalAngle > 360*i+360) {
            dSegments.push(`A 10 10  0 0 0  ${cx + r + w + w*i} ${cy}`);
        }
        else if (finalAngle < -360*i-360) {
            dSegments.push(`A 10 10  0 0 1  ${cx + r + w + w*i} ${cy}`);
        }
        else { //半円まで届かない角度。途中で終わりの弧を描画する
            //半径
            _r = ((cx +r + w + w*i) - _sx) / 2; //仮の最右端から開始点を引くと直径
            //中心x
            _cx = _sx + _r;
            /**
            //回転角が半円まで足りない。さらに、中心が右に移動するので、270度のときにやじりが先に進みすぎる。
            drift_angle = 3 / (drift_a * (angle - 270) ** 2 + 1) // 270度付近は少しだけ進みを遅らせる。

            ex = floor3(_cx + _r * Math.cos(rad_arc - drift_angle / 180 * Math.PI));
            ey = floor3(cy - _r * Math.sin(rad_arc - drift_angle / 180 * Math.PI));
            dSegments.push(`A ${_r} ${_r}  0 0 ${Number(finalAngle < 0)}  ${ex} ${ey}`);
            //console.log(`[2] A ${_r} ${_r}  0 0 ${Number(angle < 0)}  ${ex} ${ey} : ${_sx} ${_cx}`);
             */
            
            //ずれを考慮しない場合
            //ex = floor3(_cx + _r * Math.cos(rad_arc));
            //ey = floor3(cy - _r * Math.sin(rad_arc));

            //ずれを考慮すると
            //p2:ずらした中心点、r2:ずらした半円の半径
            //[Point2D(
            // (p2*cos(alpha) + sqrt( -p2**2*sin(alpha)**2 + r2**2 )) * cos(alpha),
            // (p2*cos(alpha) + sqrt( -p2**2*sin(alpha)**2 + r2**2 )) * sin(alpha)),
            //Point2D(
            // (p2*cos(alpha) - sqrt( -p2**2*sin(alpha)**2 + r2**2 )) * cos(alpha),
            // (p2*cos(alpha) - sqrt( -p2**2*sin(alpha)**2 + r2**2 )) * sin(alpha))]
            _w = w/2;
            A = _w * Math.cos(rad_arc);
            B = Math.sqrt(-_w*_w * Math.sin(rad_arc) ** 2 + (r + _w*(2*i+1)) ** 2);
            ex = floor3(cx + (A + B) * Math.cos(rad_arc));
            ey = floor3(cy - (A + B) * Math.sin(rad_arc));


            dSegments.push(`A ${_r} ${_r}  0 0 ${Number(finalAngle < 0)}  ${ex} ${ey}`);
            


            break;

        }
        _sx = cx + r + w + w*i;

    }

    // 最後に閉じたい場合はさらに push("Z") してもOK
    //dSegments.push("Z");
    

    // 4. 配列をスペース区切りの文字列にして、d属性に一気にセットする
    path.setAttribute("d", dSegments.join(" "));
    path.setAttribute("stroke", "#ff4081");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-width", "6");
    path.setAttribute("filter", "drop-shadow(0px 3px 5px rgba(0,0,0,0.3))");

    // 5. 要素を組み立てて画面に配置する
    spiral.innerHTML = ""; // いま中にある path をすべて消去
    spiral.appendChild(path); // svg g の中にpathを入れる

    
    if (finalAngle == 0) {
        const point = document.getElementById('point');
        point.innerHTML = "";
        return;
    }

    // 矢印のやじり(point)を描画する
    // 反時計回りプラス方向は右端では上、左端は下向き。時計回りは右端下、左端上方向
    const point = document.getElementById('point');
    const path_p = document.createElementNS(svgNS, "path");
    // 矢印のやじり(point)を描画する
    // 点H
    let frameR = _r;
    let t_a = Math.min(0.3, 20/_r); //羽の長さ
    let t = Math.min(0.05, 5/_r); //左右の広がり
    let hx = floor3(frameR * Math.cos(rad_arc));
    let hy = floor3(-frameR * Math.sin(rad_arc));
    let hx1 = floor3( frameR*(1-t) * Math.cos(rad_arc + unsign(angle)*t_a));
    let hy1 = floor3(-frameR*(1-t) * Math.sin(rad_arc + unsign(angle)*t_a));
    let hx2 = floor3( frameR*(1+t) * Math.cos(rad_arc + unsign(angle)*t_a));
    let hy2 = floor3(-frameR * (1 + t) * Math.sin(rad_arc + unsign(angle) * t_a));
    
    //やじりを実際の位置に移動させるためのずれを計算する
    d_x = ex - hx;
    d_y = ey - hy;

    //g.append( draw.Lines(hx1, hy1, hx, hy, hx2, hy2, stroke='blue', stroke_width=1, close=False, fill='none'))
    path_p.setAttribute("d", `M${hx1+d_x} ${hy1+d_y} L${hx+d_x} ${hy+d_y} L${hx2+d_x} ${hy2+d_y}`);
    path_p.setAttribute("stroke", "#ff4081");
    path_p.setAttribute("fill", "none");
    path_p.setAttribute("stroke-width", "4");
    path_p.setAttribute("stroke-linejoin", "round");
    point.innerHTML = "";
    point.appendChild(path_p);




    /*
    //point.setAttribute('transform', `translate(${_cx - drift_angle}, ${cy})`);
    if (Math.abs(finalAngle) < 180) {
        //_r = r
        console.log('1: ',finalAngle )
    }
    else if (Math.abs(finalAngle) % 360 > 180) {
        point.setAttribute('transform', `translate(${5}, ${0})`);
        console.log('2: ',finalAngle , Math.abs(finalAngle) % 360 > 180)
    }
    else {
        point.setAttribute('transform', `translate(${-0.5}, ${0})`);
    }
    */
    
    //console.log(`_r= ${_r} : ex,ey= ${ex},${ey} : hx,hy= ${hx},${hy} :diff ${ex - hx} ${ey - hy} ${Math.sqrt((ex - hx) ** 2 + (ey - hy) ** 2)}`);








}

// 前回のマウス位置を保持する変数（原点からの相対座標）
let lastX = 0;
let lastY = 0;

// マウスが動いたときに呼ばれる関数
function onMouseMove(currentMouseX, currentMouseY, originX, originY) {
    // 1. 原点を基準とした現在の相対座標に変換
    const curX = currentMouseX - originX;
    const curY = currentMouseY - originY;
    
    // 初回フレーム時は前回位置を更新して終了
    if (lastX === 0 && lastY === 0) {
        lastX = curX;
        lastY = curY;
        return 0;
    }

    // 2. 2つのベクトルの長さの平方（2乗）を計算
    // Math.sqrt() を避けるため、2乗のまま計算に使います
    const lastLengthSq = lastX * lastX + lastY * lastY;
    const curLengthSq = curX * curX + curY * curY;
    
    // 原点付近でのゼロ除算（NaN）を防ぐ安全弁
    if (lastLengthSq < 0.0001 || curLengthSq < 0.0001) return 0;

    // 3. 外積（クロス積）を計算
    const crossProduct = lastX * curY - lastY * curX;

    // 4. 【超軽量】微小角近似による角度増減（ラジアン）の計算
    // 外積をそれぞれの長さで割ることで sin(Δθ) を抽出し、それをそのまま角度(rad)とする
    const deltaAngleRad = crossProduct / Math.sqrt(lastLengthSq * curLengthSq);
    
    // 次のフレームのために現在の座標を保存
    lastX = curX;
    lastY = curY;

    // 度数法（degree）が必要な場合は、最後に掛け算を1回するだけ
    return deltaAngleRad * (180 / Math.PI);
}

// 反時計回り＋方向。時計回りー方向
// 時計回りのスパイラルも描画する。
// 角度を計算してUIを更新する関数
function updateAngle(event) {
    // 1. スライダー（SVG）の画面上の位置とサイズを取得
    const rect = slider.getBoundingClientRect();
    
    // 2. クリック/タッチされた位置を、SVG内の相対座標に変換
    const x = event.clientX - rect.left - (rect.width / 2);
    const y = -(event.clientY - rect.top - (rect.height / 2));

    let d_angle = onMouseMove(x, y, 0, 0);

    finalAngle += d_angle


   
    let v = x**2 + y**2;
    if (v < 50**2) {
        // 5度ごとにする。角度が増加方向なら+1、減少方向なら-1する Math.sign() を使う
        finalAngle = (Math.sign(d_angle) + Math.trunc(finalAngle/5)) * 5; //小数点以下を切り捨てる
    }

    angle = finalAngle % 360

    //console.log(event.clientX, event.clientY, "x y angle:", x, y, Math.trunc(angle), Math.trunc(finalAngle), d_angle, lastX, lastY, ' v=',v); //小数部の桁を取り除く

    old_y = y;

    // 5. SVGのツマミを回転させ、テキストを更新
    knob.setAttribute('transform', `rotate(${ 90 - angle}, ${centerX}, ${centerY})`);
    angle_display.textContent = `${Math.trunc(Math.abs(finalAngle))}°`;
    document.getElementById("anydegree").value = Math.trunc(finalAngle);

    if (Math.trunc(finalAngle/360) != 0) {
        // "750° = 2 rot. + 30°" （※rot. は rotations の略）を表示する
        document.getElementById('lap-text').textContent = `${Math.trunc(Math.abs(finalAngle) / 360)} rot. ${Math.trunc(Math.abs(finalAngle) % 360)}°`;
    } else {
        document.getElementById('lap-text').textContent = '';
    }



    clearBtn.style.display = 'block'; // 文字があれば消去☓を表示


    /////////////////////////////////////////////
    // ここで目的の数値をJavaScriptの他の処理に渡せます
    /////////////////////////////////////////////
    // console.log("現在の中心角:", finalAngle);
    // spiralの描画
    drawangleSVG(angle, finalAngle);

}

