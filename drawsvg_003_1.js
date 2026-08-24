function check_side(A, B, X) {
    /*"""
    点Aから点Bへ向かう線分に対して、点Xがどちら側にあるかを判定する
    A, B, X はそれぞれ (x, y) のタプル
    """*/
    // ベクトル AB と ベクトル AX の成分を計算
    ab_x = B[0] - A[0]
    ab_y = B[1] - A[1]
    ax_x = X[0] - A[0]
    ax_y = X[1] - A[1]
    
    // 2次元の外積（クロス積）を計算
    cross_product = (ab_x * ax_y) - (ab_y * ax_x)
    
    if (cross_product > 0) {
        return -1 //"左側 (Left)"
    } else if ( cross_product < 0) {
        return 1 //"右側 (Right)"
    } else {
        return 0 //"線上 (On the line)"
    }
}


function get_transformed_vertices(x, y, w, h, lx, ly, th_deg) {
    // 1. 角度をラジアンに変換
    th_rad = npRadians(th_deg)

        
    // 2. 回転行列を定義
    
    const [c, s] = [Math.cos(th_rad), Math.sin(th_rad)]
    /*
    R = np.array([
        [c, -s],
        [s,  c]
    ])
    
    // 3. 矩形の「回転中心」をどこにするかで基準頂点を決める
    // ここでは、元の矩形の左上 (x, y) を基準（ローカル原点）として4頂点を定義
    local_vertices = np.array([
        [x,     y],     // 左上
        [x + w, y],     // 右上
        [x + w, y + h], // 右下
        [x,     y + h]  // 左下
    ])
    
    // 4. すべての頂点に回転行列を適用 (4, 2) x (2, 2) の行列積
    // ※NumPyの仕様上、頂点ベクトルを横に並べるため R ではなく Rの転置(R.T) を掛けます
    rotated_vertices = np.dot(local_vertices, R.T)
    
    // 5. 平行移動 (lx, ly) を加算
    transformed_vertices = rotated_vertices + np.array([lx, ly])
    return transformed_vertices
    */
    
    // 変換後の頂点座標（[ [x1, y1], [x2, y2], ... ] 形式）
    const transformedVertices = [
    [x,     y],     // 左上
    [x + w, y],     // 右上
    [x + w, y + h], // 右下
    [x,     y + h]  // 左下
    ].map(([px, py]) => [
    px * c - py * s + lx,
    px * s + py * c + ly
    ]);
    
    return transformedVertices;
}

//svg = arc003_1(a, start_deg, 100, 80, 2, 28, 16, 0)

// 角度　開始角　フレーム長　ポンタ−位置　ポインタ幅　文字サイズ
function drawsvg_003_1(degree, frameR) {
    
    start = 0
    r = frameR - 50
    s = 22
    yr = 16
    clockwise = 0
    swidth = 3

    if (degree < 0) {
        clockwise = 1
        degree *= -1
        start = 180
    }
    
    // transform="rotate( start ) scale(1 -1)" を使わない。
    rad = degree / 180 * Math.PI
    rad_alpha = start / 180 * Math.PI
    rad_beta = (start + degree) / 180 * Math.PI

    if (clockwise == 0) { // 上下反転する＝sin()を＋180°
        clockwise_flg = -1
        counter_c_flg = 1
    } else { // 左右反転＋上下反転＝sin() cos() ともに反転＝ともに+180
        clockwise_flg = -1
        counter_c_flg = -1
    }
    acos = counter_c_flg * Math.cos(rad_alpha);
    asin = clockwise_flg * Math.sin(rad_alpha);
    bcos = counter_c_flg * Math.cos(rad_beta);
    bsin = clockwise_flg * Math.sin(rad_beta);
    [sx, sy] = [frameR * acos, frameR * asin];
    [ex, ey] = [frameR * bcos, frameR * bsin];


    padding = 10
    color = '#9C27B0'
    
    //g = draw.Group()//transform=f"translate({0}, {0})")
    g = createSVGElement("g", {});

    //p = draw.Path(stroke = color, fill = 'none', stroke_width = 2)
    p = createSVGElement('path', {
        'stroke': color, 'fill': 'none', 'stroke-width': '2'
        //'d': `M${sx} ${sy} L0 0 ${ex} ${ey}`
    });

    //pp = draw.Path(stroke = color, fill = 'none', stroke_width = swidth, stroke_linejoin = 'miter')
    pp = createSVGElement('path', {
        'stroke': color, 'fill': 'none', 'stroke-width': `${swidth}`,
        'stroke-linejoin': 'miter'
        //'d': `M${sx} ${sy} L0 0 ${ex} ${ey}`
    });
    



    // 弧を描く
    /**'''
    deg = -degree
    start_deg = -start
    srad = start_deg/180*Math.PI
    erad = (start_deg+deg)/180*Math.PI

    srad = start_deg/180*Math.PI
    erad = (start_deg+deg)/180*Math.PI

    //print(angle)
    sx,sy = frameR*Math.cos(srad), frameR*Math.sin(srad)
    ex,ey = frameR*Math.cos(erad), frameR*Math.sin(erad)
    '''*/
    qd = 1; // 矢印の長さ分、弧を短くする。1度減らす。

    [srx, sry] = [counter_c_flg * r * Math.cos(rad_alpha + qd / 180 * Math.PI), clockwise_flg * r * Math.sin(rad_alpha + qd / 180 * Math.PI)];
    [erx, ery] = [counter_c_flg * r * Math.cos(rad_beta - qd / 180 * Math.PI), clockwise_flg * r * Math.sin(rad_beta - qd / 180 * Math.PI)];

    large_arc = (degree > 180) ? 1 : 0; // short:0  or not:1
    sweep = clockwise // counterclockwise

    //p.M(sx, sy)
    //p.L(0, 0)
    //p.L(ex, ey)
    //p.setAttribute('d', `M${round(sx, 2)} ${round(sy, 2)} L0 0 ${round(ex, 2)} ${round(ey, 2)}`)
    p.setAttribute('d', M(sx, sy) + LL(0, 0, ex, ey))
    
    if (degree < 360) {
        //pp.M(srx, sry)
        //pp.A(r, r, 0, large_arc, sweep, erx, ery)
        //pp.setAttribute('d', `M${round(srx,2)} ${round(sry,2)} A${r} ${r} 0 ${large_arc} ${sweep} ${round(erx,2)} ${round(ery,2)}`)
        pp.setAttribute('d', M(srx, sry) + A(r, large_arc, sweep, erx, ery))
        //console.log(degree, srx, sry, erx, ery)

    } else {
        //pp.M(srx, sry)
        //pp.A(r, r, 0, large_arc, sweep, -srx, -sry)
        //pp.A(r, r, 0, large_arc, sweep, erx, ery)
        pp.setAttribute('d', M(srx, sry) + 
            A(r, large_arc, sweep, -srx, -sry) +
            A(r, large_arc, sweep, erx, ery))
    }

    // マーカー（矢印の先端）の作成
    if (degree < 30) {
        yr = yr / 2
    } else if (degree < 40) {
        yr = yr / 3 * 2
    }
    //arrow = draw.Path(d=f"M-4 {yr} L0 0 L4 {yr}", stroke_linejoin='bevel', stroke=color, fill='none', stroke_width=swidth)
    arrow = createSVGElement('path', {
        'stroke': color, 'fill': 'none', 'stroke-width': `${swidth}`,
        'stroke-linejoin': 'bevel',
        'd': M(-4, yr) + LL(0, 0, 4, yr)
    });

    th = Math.asin(yr / 2 / r) / Math.PI * 180 // 矢印の傾き。
    //print(yr, 'th: ', th)
    // 矢印はじめと終わり。矢印の長さが長いとき、傾きが大きくなる。
    //g_arraow_start = draw.Group(transform=f"translate({counter_c_flg * r*Math.cos(rad_alpha)}, {clockwise_flg * r*Math.sin(rad_alpha)}) rotate({180+(-1+2*clockwise)*start + (-1+2*clockwise)*th})")
    g_arraow_start = createSVGElement("g", {
        'transform': translate(counter_c_flg * r * Math.cos(rad_alpha), clockwise_flg * r * Math.sin(rad_alpha)) +
        rotate( 180+(-1 + 2 * clockwise) * start + (-1 + 2 * clockwise) * th )
    });
    g_arraow_start.appendChild(arrow)

    //g_arraow_end   = draw.Group(transform=f"translate({counter_c_flg * r*Math.cos(rad_beta)}, {clockwise_flg * r*Math.sin(rad_beta)}) rotate({(-1+clockwise*2)*(start + degree) -(-1+2*clockwise)*th})")
    g_arraow_end = createSVGElement("g", {
        'transform': translate(counter_c_flg * r * Math.cos(rad_beta), clockwise_flg * r * Math.sin(rad_beta)) +
            rotate((-1 + clockwise * 2) * (start + degree) - (-1 + 2 * clockwise) * th)
    });
    // g_arraow_end には arrow の複製（ディープコピー）を追加。ただ追加すると先に入れたほうが削除される
    //g_arraow_end.appendChild(arrow.cloneNode(true))//複製はやめた
    // a 要素に ID を設定
    uuid = getUuid()
    arrow.setAttribute('id', 'path' + uuid);
    // gEnd には <use> 要素を作って a を参照させる
    const useEl = document.createElementNS(SVG_NS, 'use');
    useEl.setAttribute('href', `#path${uuid}`); // 古いブラウザ対応なら 'http://www.w3.org/1999/xlink' の xlink:href
    g_arraow_end.appendChild(useEl);






    g.appendChild(pp) 
    g.appendChild(p) 

    // 文字描画の位置を決める
    if (degree < 30) {
        r = frameR
    }
    //ss = `${Math.abs(degree)}°`
    ss = `${Math.abs(degree)}`
    
    tx = counter_c_flg * (r+s)*Math.cos((rad_alpha + rad_beta)/2)
    ty = clockwise_flg * (r+s)*Math.sin((rad_alpha + rad_beta)/2)
    col = '#263238'
    id = `text_${degree}`


    // テキストバウンディングボックスを計算する。
    mojis = s
    vertices = get_transformed_vertices(-mojis, -mojis/2, 2*mojis, mojis, tx, ty, 0) // 始点xy、幅、高さ、文字サイズ、移動座標xy、回転角度

    // 4つの頂点のうち、一番中心に近い頂点を探して、弧に乗るように調整する。
    r_box_min = 10000**2
    //for v in vertices:
    //    r_box_min = min(r_box_min, v[0] ** 2 + v[1] ** 2)
    vertices.forEach(v => {
        r_box_min = Math.min(r_box_min, v[0] ** 2 + v[1] ** 2)
    });
    
    r_box = r_box_min**0.5 / r // 微調整する比率　
    // テキストバウンディングボックスが弧に乗るように、中心からの距離を微調整する
    tx = counter_c_flg * (r+s)*Math.cos((rad_alpha + rad_beta)/2) / r_box
    ty = clockwise_flg * (r+s)*Math.sin((rad_alpha + rad_beta)/2) / r_box
    vertices = get_transformed_vertices(-mojis, -mojis/2, 2*mojis, mojis, tx, ty, 0) // 始点xy、幅、高さ、文字サイズ、移動座標xy、回転角度
    
    // バウンディングボックス描画
    //    draw.Path(d = f'M{vertices[0][0]} {vertices[0][1]} ' +
    //    f'L{vertices[1][0]} {vertices[1][1]} {vertices[2][0]} {vertices[2][1]} {vertices[3][0]} {vertices[3][1]} Z',
    //    stroke='red', fill='none'))
    g.appendChild(
        createSVGElement('path', {
            'stroke': 'red', 'fill': 'none',
            'stroke-width': 1,
            'd': M(vertices[0][0], vertices[0][1]) +
            L(vertices[1][0],vertices[1][1]) + L(vertices[2][0], vertices[2][1]) + L(vertices[3][0], vertices[3][1]) + ' Z'
        }));

    //for v in vertices:
    //    g.append(draw.Circle(v[0], v[1], 2, fill='red'))
    //g.append(draw.Circle(tx, ty, 2, fill='red'))
    vertices.forEach(v => {
        g.appendChild(
            //createSVGElement('circle', {
            //    'cx': `${round(v[0], 2)}`, 'cy': `${round(v[1],2)}`, 'r': '2', 'fill': 'red'
            //})
            drawCircle(v[0], v[1], 2, 'red')
        )
    });
    g.appendChild(
        drawCircle(tx, ty, 2, 'red')
        //createSVGElement('circle', {
        //    'cx': `${round(tx, 2)}`, 'cy': `${round(ty, 2)}`, 'r': '2', 'fill': 'red'
        //})
    )
    
    // テキスト描画
    //text_element = draw.Text(
    //        ss, s, tx, ty,
    //        text_anchor='middle', font_family='sans-serif', font_weight='500', dominant_baseline='central',
    //        fill=col, id=id
    //    )
    /*
    const text_element = createSVGElement("text", {
        "x": `${round(tx, 2)}`,
        "y": `${round(ty, 2)}`,
        "text-anchor": "middle",
        "font-family": "sans-serif",
        "font-size": `${s}`,
        "font-weight": "500",
        'dominant_baseline': 'central',
        "fill": col,
        'id': id
    });
    text_element.textContent = ss;
    */
    const text_element = drawText(ss, s, tx, ty,'middle', 'sans-serif', 500, 'central', col, id)
    g.appendChild(text_element);



    // 扇形のセクター（最小座標と、有効幅と高さ）を計算する。
    ;[scx, scy] = sector(start, start + degree);
    //console.log('drawsvg_003_1: ', scx, scy);

        //print(scx, scy)
    ;[scy[0], scy[1]] = [-scy[1], -scy[0]];
    if (clockwise == 1) {
        ;[scx[0], scx[1]] = [-scx[1], -scx[0]];
    }
    // frameRで正規化したテキストバウンディングボックスを扇形のセクター結果に加える
    vertices.forEach(v => {
        ;[vx, vy] = v;
        scx[0] = min(scx[0], vx / frameR)
        scx[1] = max(scx[1], vx / frameR)
        scy[0] = min(scy[0], vy / frameR)
        scy[1] = max(scy[1], vy / frameR)
    })


    //g.append(draw.Path(
    //    d=f'M{frameR*scx[0]} {frameR*scy[0]} L{frameR*scx[1]} {frameR*scy[0]} {frameR*scx[1]} {frameR*scy[1]} {frameR*scx[0]} {frameR*scy[1]} Z', 
    //    stroke='red', fill='none' ,stroke_width=1
    //))
    g.appendChild(
        createSVGElement('path', {
            'stroke': 'red', 'fill': 'none', 'stroke-width': '1',
            'd': M(frameR * scx[0], frameR * scy[0]) +
                LL(frameR * scx[1], frameR * scy[0], frameR * scx[1], frameR * scy[1]) +
                L(frameR * scx[0], frameR * scy[1])
        })
    )

    w = round(frameR * Math.abs(scx[1] - scx[0]), 2)
    h = round(frameR * Math.abs(scy[1] - scy[0]), 2)
    //d = draw.Drawing(w + 2 * padding, h + 2 * padding, origin = (round(frameR*scx[0]-padding, 2),round(frameR*scy[0]-padding, 2)))

    wd = round(w + 2 * padding, 2);
    ht = round(h + 2 * padding, 2);     

    const d = document.createElementNS(SVG_NS, "svg");
    d.setAttribute('id', 'SVG-' + 'drawsvg_003_1'),
    d.setAttribute("xmlns", SVG_NS);
    d.setAttribute("width", `${wd}`);
    d.setAttribute("height", `${ht}`);
    d.setAttribute("viewBox", `${round(frameR * scx[0] - padding, 2)} ${round(frameR * scy[0] - padding, 2)} ${wd} ${ht}`);
    
    /***'''
    w,h = 320,220
    d = draw.Drawing(w, h, origin='center') 
    '''**/

    
    d.appendChild(g)
    
    if (degree >= 15) {// 角度が小さい場合は矢印省略
        // 3. マーカーをCanvasの defs に追加
        d.appendChild(g_arraow_start)
        d.appendChild(g_arraow_end)
    }
    //    d.set_pixel_scale(1)  // Set number of pixels per geometry unit

    return d;
}
//svg = arc003_1(a, start_deg, 100, 80, 2, 28, 16, 0)


