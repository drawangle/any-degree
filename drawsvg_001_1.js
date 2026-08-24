
//# 角度　開始角　フレーム長　ポンタ−位置　ポインタ幅　文字サイズ
//#svg = arc001(340,0, 200, 100,150,28)
//# 角度　開始角　フレーム長　ポンタ−位置　ポインタ幅　文字サイズ
//svg = arc001_1(dg,start, R, R//2, R//2, R//5, 0)
//def arc001_1(degree, start, frameR = 100, r = 40,swidth = 50, s = 20, clockwise = 0): 

//# 角度　開始角　フレーム長　ポンタ−位置　ポインタ幅　文字サイズ
//def arc001_1(degree, start, frameR = 100, r = 40,swidth = 50, s = 20, clockwise = 0): 
function drawsvg_001_1(degree, frameR) {
    //console.log('drawsvg_001_1', degree, frameR);
    start = 0
    //frameR = r
    r = Math.floor(frameR / 2) + 0
    swidth = Math.floor(frameR / 2)
    s = 20
    clockwise = 0
    if (degree < 0) {
        clockwise = 1
        degree *= -1
        start = 180
    }

    padding = 10
    //color = '#9C27B0' // Purple 500
    color = '#F57F17' // Yellow 900


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

    // 弧を描く
    [sx, sy] = [frameR * acos, frameR * asin];
    [ex, ey] = [frameR * bcos, frameR * bsin];

    [srx, sry] = [r * acos, r * asin];
    [erx, ery] = [r * bcos, r * bsin];

    large_arc = (degree > 180) ? 1 : 0; // short:0  or not:1
    sweep = clockwise; // counterclockwise


    //g = draw.Group(transform=f"translate({0}, {0})")
    g = createSVGElement("g", {
        "transform": "translate(0, 0)"
    });

    //p = draw.Path(stroke=color, fill='none', stroke_width=2)
    p = createSVGElement('path', {
        'stroke': color, 'fill': 'none', 'stroke-width': '2',
        'd': `M${sx} ${sy} L0 0 ${ex} ${ey}`
    });

    if (degree < 360) {
        pp = createSVGElement('path', {
            'stroke': color, 'fill': 'none', 'stroke-width': `${swidth}`,
            'd': `M${srx} ${sry} A${r} ${r} 0 ${large_arc} ${sweep} ${erx} ${ery}`
        });
    }
    else {
        pp = createSVGElement('circle', {
            'cx': '0', 'cy': '0', 'r': `${r}`, 'fill': 'none', 'stroke': color, 'stroke-width': `${swidth}`
        });
    }

    // 4. 要素の組み立てとDOMへの追加
    //svg.appendChild(rect);

    g.appendChild(pp)
    g.appendChild(p)

    function get_4_centroid_diagonal_lenpow(alpha, beta, r, s) {
        // 扇形と対角線の交点と、バウンディングボックスの重心までの長さ（２乗）を返す
        x0 = (1 / 2) * alpha + (1 / 2) * beta
        x1 = Math.sin(x0)
        x2 = r * x1
        x3 = Math.sin(alpha) /* 0 2 */
        x4 = 3 * x3
        x5 = Math.cos(alpha)
        x6 = 1 / (-x4 + 2 * x5) /* 0 */
        x7 = 3 * x1
        x8 = Math.cos(x0)
        x9 = -x7 + 2 * x8 /* 0 1 */
        x10 = r * x8
        x11 = Math.sin(beta)
        x12 = 3 * x11
        x13 = Math.cos(beta)
        x14 = 1 / (-x12 + 2 * x13)
        x15 = 1 / (x4 + 2 * x5)
        x16 = x7 + 2 * x8
        x17 = 1 / (x12 + 2 * x13)
        return [
            (r * x3 * x6 * x9 - x2) ** 2 + (r * x5 * x6 * x9 - x10) ** 2,
            (r * x11 * x14 * x9 - x2) ** 2 + (r * x13 * x14 * x9 - x10) ** 2,
            (r * x3 * x15 * x16 - x2) ** 2 + (r * x5 * x15 * x16 - x10) ** 2,
            (r * x11 * x17 * x16 - x2) ** 2 + (r * x13 * x17 * x16 - x10) ** 2
        ];
    }

    small_r = r
    color = 'white'
    mojis = s
    if (degree < 45) {
        dgA = start / 180 * Math.PI // 扇型のα角度
        B = (start + degree) / 180 * Math.PI // 扇型のβ角度
        R = frameR // 扇型の半径

        // intersection of the diagonals to a corner of Square
        center_to_corner = 13 * mojis ** 2 / 16
        // 対角線とα線β線の交点から、対角線の交点、までの距離二乗を求める
        iv_c_pow = get_4_centroid_diagonal_lenpow(dgA, B, small_r, mojis)
        min_iv_c_cow = Math.min(...iv_c_pow) //4つのうちの最小を得る
        reduced_s = mojis
        // α線β線からはみ出していたら、文字を小さくする
        if (center_to_corner > min_iv_c_cow) {
            reduced_s = mojis * (min_iv_c_cow ** 0.5) / center_to_corner ** 0.5
        }
        mojis = reduced_s
    }
    if (degree <= 10) {
        color = '#37474F'
        mojis = s / 2
        small_r += (swidth + s / 4)
    }
    //console.log('mojis', mojis, s, frameR)

    ss = `${Math.abs(degree)}°`

    mcos = counter_c_flg * Math.cos((rad_alpha + rad_beta) / 2);
    msin = clockwise_flg * Math.sin((rad_alpha + rad_beta) / 2);
    [x, y] = [small_r * mcos, small_r * msin];
    id = `text_001_${degree}`;


    //text_element = draw.Text(
    //        ss, s, x, y - s/8, 
    //        text_anchor='middle', font_family='sans-serif', font_weight='bold', dominant_baseline='central', 
    //        fill=color, id=id
    //    )
    const text_element = createSVGElement("text", {
        "x": `${round(x, 2)}`,
        "y": `${round(y - mojis / 8, 2)}`,
        "text-anchor": "middle",
        "font-family": "sans-serif",
        "font-size": `${round(mojis, 2)}`,
        "font-weight": "bold",
        'dominant-baseline': 'central',
        "fill": color,
        'id': id
    });
    text_element.textContent = ss;

    g.appendChild(text_element);


    [scx, scy] = sector(start, start + degree);
    [scy[0], scy[1]] = [-scy[1], -scy[0]];
    if (clockwise == 1) {
        [scx[0], scx[1]] = [-scx[1], -scx[0]];
    }

    w = round(frameR * Math.abs(scx[1] - scx[0]), 2)
    h = round(frameR * Math.abs(scy[1] - scy[0]), 2)

    const d = document.createElementNS(SVG_NS, "svg");
    d.setAttribute('id', 'SVG-' + 'drawsvg_001_1'),
    d.setAttribute("xmlns", SVG_NS);
    d.setAttribute("width", `${round(w + 2 * padding, 2)}`);
    d.setAttribute("height", `${round(h + 2 * padding, 2)}`);
    d.setAttribute("viewBox", `${round(frameR * scx[0] - padding, 2)} ${round(frameR * scy[0] - padding, 2)} ${w + 2 * padding} ${h + 2 * padding}`);


    d.appendChild(g)

    return d;

}

