/*
Theme Color #FF9800（アンバーオレンジ）を中心に、ゴールドや燃えるようなアンバーの輝き
を加えたサイバー感溢れるSVGコードを作成しました。
o メインカラー (#FF9800) のグラデーション:
    ハイライトに明るいイエローゴールド (#FFD54F)、メインに #FF9800、ベース影にディープオレンジ (#E65100) 
    を組み合わせてエネルギー感と奥行きを出しました。
o ストロークと発光エフェクト:
    輪郭線（ストローク）やドロップシャドウを #FF6D00〜#FF3D00 などの熱量のあるオレンジ系に統一し、
    サイバーHUD（ヘッドアップディスプレイ）のような存在感のある発光演出を行っています。
<svg xmlns="http://www.w3.org/2000/svg" width="450" height="260" viewBox="-110 -20 220 130">
  <defs>
    <!-- アンバーオレンジ発光グラデーション -->
    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD54F" />
      <stop offset="50%" stop-color="#FF9800" />
      <stop offset="100%" stop-color="#E65100" />
    </linearGradient>

    <!-- 輪郭強調用グラデーション（ゴールド〜ネオンオレンジ） -->
    <linearGradient id="strokeAmberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFF59D" />
      <stop offset="50%" stop-color="#FF9800" />
      <stop offset="100%" stop-color="#FF3D00" />
    </linearGradient>

    <!-- サイバーオレンジ発光フィルター -->
    <filter id="amberGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComponentTransfer in="blur" result="glow1">
        <feFuncA type="linear" slope="1.5"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode in="glow1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- オレンジドロップシードー -->
    <filter id="amberDrop" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#FF6D00" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- バックグラウンド・アンビエント光 -->
  <path d="M99.98,-1.75 L0,0 L-89.88,43.84 A100,100,0,0,0,99.98,-1.75 Z" 
        fill="url(#amberGrad)" opacity="0.18" filter="url(#amberGlow)" />

  <!-- メインシェイプ -->
  <g filter="url(#amberDrop)">
    <path d="M99.98,-1.75 L0,0 L-89.88,43.84 A100,100,0,0,0,99.98,-1.75 Z" 
          fill="url(#amberGrad)" 
          stroke="url(#strokeAmberGrad)" 
          stroke-width="1.5" 
          stroke-linejoin="round" />
  </g>

  <!-- 近未来UI風のオーバーレイ（アクセントライン） -->
  <g stroke="url(#strokeAmberGrad)" stroke-width="1" fill="none" opacity="0.85" filter="url(#amberGlow)">
    <!-- インナーライン -->
    <path d="M85,-1.5 L0,0 L-76,37 A85,85,0,0,0,85,-1.5 Z" stroke-dasharray="4,2,1,2" />
    <!-- センターノード（原点強調） -->
    <circle cx="0" cy="0" r="4" fill="#FFE082" stroke="#FFFFFF" stroke-width="1" />
    <circle cx="0" cy="0" r="8" stroke="#FF9800" stroke-width="0.75" />
  </g>
</svg>
*/


/* もともとのイメージはこれ
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="419.76" height="243.5" viewBox="-99.88 -11.75 209.88 121.75">
<defs>
<filter id="difflight">
<feDiffuseLighting surfaceScale="4" lighting-color="#FF9800" diffuseConstant="5" result="light">
<fePointLight z="22"></fePointLight>
</feDiffuseLighting>
<feComposite in="light" in2="SourceGraphic" operator="in"></feComposite>
</filter>
<filter id="drop">
<feDropShadow dx="2" dy="5" stdDeviation="5" flood-color="#4A148C"></feDropShadow>
</filter>
</defs>
<g filter="url(#drop">
<g fill="#311B92" filter="url(#difflight)">
<g mask="url(#mask155_179)">
<path d="M99.98476951563913,-1.7452406437283439 L0,0 L-89.87940462991668,43.83711467890778 A100,100,0,0,0,99.98476951563913,-1.7452406437283439 Z" stroke="none" stroke-width="0" />
</g>
</g>
<text x="0" y="-4.5" font-size="18" font-weight="1000" fill="black" transform="         translate(-53.92764277795001 26.302268807344667)         rotate(-26)" text-anchor="end" dominant-baseline="auto">155</text>
<path d="M-53.92764277795001 26.302268807344667 L-78.19508202802751 38.13828977064977 -86.08576267023092 21.959996937264766 -61.81832342015341 10.123975973959666 Z" stroke="red" fill="none" />
<circle cx="-53.92764277795001" cy="26.302268807344667" r="2" fill="red" />
<circle cx="-78.19508202802751" cy="38.13828977064977" r="2" fill="red" />
<circle cx="-86.08576267023092" cy="21.959996937264766" r="2" fill="red" />
<circle cx="-61.81832342015341" cy="10.123975973959666" r="2" fill="red" />
<path d="M-89.87940462991668 -1.7452406437283439 L100.0 -1.7452406437283439 100.0 100.0 -89.87940462991668 100.0 Z" stroke="red" fill="none" stroke-width="1" />
</g>
</svg>

*/


//    svg = arc008_1(deg, start, 100, 60, 18, 0)
//// 角度　開始角　フレーム長　文字位置　文字サイズ 　時計回り=1
//def arc008_1(degree, start, frameR = 100, r=60,  mojis = 20, clockwise = 0): 
function drawsvg_008_1(degree, frameR) {

    if (degree < 0) {
        clockwise = 1
        degree *= -1
        start = 180
    }



    color = '#9C27B0'
    
    // フィルター定義
    defs = createSVGElement('defs', {})
    //<!-- アンバーオレンジ発光グラデーション -->
    linAmber = createSVGElement('linearGradient', {
        'id':"amberGrad", 'x1':"0%", 'y1':"0%", 'x2':"100%", 'y2':"100%"
    },
        createSVGElement('stop', {'offset':"0%", 'stop-color':"#FFD54F"}),
        createSVGElement('stop', {'offset':"50%", 'stop-color':"#FF9800"}),
        createSVGElement('stop', {'offset':"100%", 'stop-color':"#E65100"})
    )
    //<!-- 輪郭強調用グラデーション（ゴールド〜ネオンオレンジ） -->
    linStroke = createSVGElement('linearGradient', {
        'id':"strokeAmberGrad", 'x1':"0%", 'y1':"0%", 'x2':"100%", 'y2':"0%"
    },
        createSVGElement('stop', {'offset':"0%", 'stop-color':"#FFF59D"}),
        createSVGElement('stop', {'offset':"50%", 'stop-color':"#FF9800"}),
        createSVGElement('stop', {'offset':"100%", 'stop-color':"#FF3D00"})
    )
    //<!-- サイバーオレンジ発光フィルター -->
    filterGlow = createSVGElement('filter', {
        'id':"amberGlow", 'x':"-20%", 'y':"-20%", 'width':"140%", 'height':"140%"
    },
        createSVGElement('feGaussianBlur', {'stdDeviation':"3", 'result':"blur"}),
        createSVGElement('feComponentTransfer', { 'in':"blur", 'result':"glow1"},
            createSVGElement('feFuncA', {'type':"linear", 'slope':"1.5"})
        ),
        createSVGElement('feMerge', {},
            createSVGElement('feMergeNode', {'in':"glow1"}),
            createSVGElement('feMergeNode', {'in':"SourceGraphic"})
        )
    )
    //<!-- オレンジドロップシードー -->
    filterDrop = createSVGElement('filter', {
        'id':"amberDrop",'x':"-20%", 'y':"-20%", 'width':"140%", 'height':"140%"
    },
        createSVGElement('feDropShadow', {'dx':"0", 'dy':"8", 'stdDeviation':"8", 'flood-color':"#FF6D00", 'flood-opacity':"0.6"})
    )
    defs.append(linAmber, linStroke, filterGlow, filterDrop)




    // transform="rotate( start ) scale(1 -1)" を使わない。
    rad = degree / 180 * Math.PI
    rad_alpha = start / 180 * Math.PI
    rad_beta = (start + degree) / 180 * Math.PI

    if (clockwise == 0){ // 上下反転する＝sin()を＋180°
        clockwise_flg = -1
        counter_c_flg = 1
    } else { // 左右反転＋上下反転＝sin() cos() ともに反転＝ともに+180
        clockwise_flg = -1
        counter_c_flg = -1
    }    if (degree < 0) {
        clockwise = 1
        degree *= -1
        start = 180
    }

    acos = counter_c_flg * Math.cos(rad_alpha);
    asin = clockwise_flg * Math.sin(rad_alpha);
    bcos = counter_c_flg * Math.cos(rad_beta);
    bsin = clockwise_flg * Math.sin(rad_beta);
    //  <!-- バックグラウンド・アンビエント光 -->
    ;[sx, sy] = [frameR * acos, frameR * asin];
    if (degree < 360) {
        p = createSVGElement('path', {
            'fill': "url(#amberGrad)", 'opacity': "0.18", 'filter': "url(#amberGlow)",
            'd': M(sx, sy) + L(0, 0) + L(frameR * bcos, frameR * bsin) + A(frameR, (degree > 180) ? 1 : 0, 1 - clockwise, sx, sy) + ' Z'
        });
        // <!-- メインシェイプ -->
        gMain = createSVGElement('g', {},
            createSVGElement('path', {
                'fill': "url(#amberGrad)",
                'stroke': "url(#strokeAmberGrad)",
                'stroke-width': "1.5",
                'stroke-linejoin': "round",
                'd': M(sx, sy) + L(0, 0) + L(frameR * bcos, frameR * bsin) + A(frameR, (degree > 180) ? 1 : 0, 1 - clockwise, sx, sy) + ' Z'
            })
        );

    } else {
        p = createSVGElement('circle', {
            'cx': '0', 'cy': '0', 'r': `${frameR}`, 'fill': "url(#amberGrad)", 'opacity': "0.18", 'filter': "url(#amberGlow)"
        });
        // <!-- メインシェイプ -->
        gMain = createSVGElement('g', {},
            createSVGElement('circle', {
                'cx': '0', 'cy': '0', 'r': `${frameR}`, 'fill': "url(#amberGrad)",
                'stroke': "url(#strokeAmberGrad)",
                'stroke-width': "1.5"
            })

        );
    }
    //<!-- 近未来UI風のオーバーレイ（アクセントライン） -->
    /*
    <g stroke="url(#strokeAmberGrad)" stroke-width="1" fill="none" opacity="0.85" filter="url(#amberGlow)">
        <!-- インナーライン -->
        <path d="M85,-1.5 L0,0 L-76,37 A85,85,0,0,0,85,-1.5 Z" stroke-dasharray="4,2,1,2" />
        <!-- センターノード（原点強調） -->
        <circle cx="0" cy="0" r="4" fill="#FFE082" stroke="#FFFFFF" stroke-width="1" />
        <circle cx="0" cy="0" r="8" stroke="#FF9800" stroke-width="0.75" />
    </g>
    */
    _rad_alpha = (start + 1) / 180 * Math.PI;
    _rad_beta = (start + degree - 1) / 180 * Math.PI;
    _acos = counter_c_flg * Math.cos(_rad_alpha);
    _asin = clockwise_flg * Math.sin(_rad_alpha);
    _bcos = counter_c_flg * Math.cos(_rad_beta);
    _bsin = clockwise_flg * Math.sin(_rad_beta);
    _r = frameR * 0.80;
    ;[_sx, _sy] = [_r * _acos, _r * _asin];
    ;[_ex, _ey] = [_r * _bcos, _r * _bsin];
    gStroke = createSVGElement('g', {
        'stroke': "url(#strokeAmberGrad)", 'stroke-width': `${round(frameR/100, 1)}`, 'fill': "none", 'opacity': "0.85", 'filter': "url(#amberGlow)"
    },
        //<!-- インナーライン -->
        createSVGElement('path', {
            'stroke-dasharray': "4,2,1,2",
            'd': M(_sx, _sy) + LL(0, 0, _ex, _ey) + A(_r, (degree > 180) ? 1 : 0, 1 - clockwise, _sx, _sy) + ' Z'
        }),
        //<!-- センターノード（原点強調） -->
        drawCircle(0, 0, 4, "#FFE082", "#FFFFFF", 1),
        drawCircle(0, 0, 8, 'none', "#FF9800", 0.75)
    
    );





    ;[dcos, dsin] = [counter_c_flg * Math.cos(rad_beta), clockwise_flg * Math.sin(rad_beta)];
    //t_deg = (- degree - start) % 360
    const pythonMod = (n, m) => n - m * Math.floor(n / m);
    t_deg = pythonMod(- degree - start, 360);
    
    text_anchor = 'start';
    dominant_baseline = 'auto';
    reverse = -1;
    if ( 90 < t_deg && t_deg < 270) {
        reverse = 1;
        t_deg += 180;
        dominant_baseline = 'hanging';
        if (clockwise == 0){
            text_anchor = "end";
        }
    } else {
        if (clockwise != 0) {
            text_anchor = "end";
        }
    }
    //function drawText(str, font_size, x, y, text_anchor, font_family, font_weight, dominant_baseline, fill_col, id) {
    degree_text = drawText(`${degree}`, mojis, 0, reverse * mojis / 4, text_anchor, 'sans-serif', 1000, dominant_baseline, 'black', 'text' + getUuid());
    degree_text.setAttribute('transform', `translate(${round(r * dcos, 2)} ${round(r * dsin, 2)}) ` +
        `rotate(${round(counter_c_flg * t_deg, 2)})`);
    //root_g.append(degree_text)
    gMain.append(degree_text);
    
    // テキストバウンディングボックスを計算する。
    bcos = counter_c_flg * Math.cos((degree + start) / 180 * Math.PI)
    bsin = clockwise_flg * Math.sin((degree + start) / 180 * Math.PI)
    vertices = get_transformed_vertices(0, 0, counter_c_flg * 1.5 * mojis, -mojis, r * bcos, r * bsin, -counter_c_flg * (degree + start))

    //root_g = draw.Group(transform=f"translate({0} {0})")
    gMain.append(createSVGElement('path', {
        'd': M(vertices[0][0], vertices[0][1]) +
            LL(vertices[1][0], vertices[1][1], vertices[2][0], vertices[2][1]) + L(vertices[3][0], vertices[3][1]) + ' Z',
        'stroke': 'red', 'fill': 'none'
    }))
    vertices.forEach(v => {
        ;[vx, vy] = [v[0], v[1]];
        gMain.append(drawCircle(v[0], v[1], 2, 'red'))
    });       

    // 扇形のセクター（最小座標と、有効幅と高さ）を計算する。
    ;[scx, scy] = sector(start, start + degree);
    ;[scy[0], scy[1]] = [-scy[1], -scy[0]];
    if (clockwise == 1) {
        ;[scx[0], scx[1]] = [-scx[1], -scx[0]];
    }
    // frameRで正規化したテキストバウンディングボックスを扇形のセクター結果に加える
    vertices.forEach(v => {
        ;[vx, vy] = [v[0], v[1]];
        scx[0] = min(scx[0], vx / frameR)
        scx[1] = max(scx[1], vx / frameR)
        scy[0] = min(scy[0], vy / frameR)
        scy[1] = max(scy[1], vy / frameR)
     })
    gMain.append(createSVGElement('path', {
        'd': M(frameR*scx[0],frameR*scy[0]) + LL(frameR*scx[1], frameR*scy[0], frameR*scx[1], frameR*scy[1]) + L(frameR*scx[0], frameR*scy[1]) + ' Z',
        'stroke':'red', 'fill':'none', 'stroke-width':'1'
    }))



    w = round(frameR * abs(scx[1] - scx[0]), 2)
    h = round(frameR * abs(scy[1] - scy[0]), 2)
    padding = 10
    //d = drawDrawing(w + 2 * padding, h + 2 * padding, 
    //                 origin = (round(frameR*scx[0]-padding, 2),round(frameR*scy[0]-padding, 2)))
    wd = round(w + 2 * padding, 2);
    ht = round(h + 2 * padding, 2);     

    
    const d = document.createElementNS(SVG_NS, "svg");
    d.setAttribute('id', 'SVG-' + 'drawsvg_008_1'),
    d.setAttribute("xmlns", SVG_NS);
    d.setAttribute("width", `${wd}`);
    d.setAttribute("height", `${ht}`);
    d.setAttribute("viewBox", `${round(frameR * scx[0] - padding, 2)} ${round(frameR * scy[0] - padding, 2)} ${wd} ${ht}`);

    // フィルターを SVG に追加
    d.append(defs)
    d.append(p)
    d.append(gMain)
    d.append(gStroke)

    //d.append(top_g)

    //d.set_pixel_scale(2)  // Set number of pixels per geometry unit

    return d

} 