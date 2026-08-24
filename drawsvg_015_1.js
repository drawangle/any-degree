//# 矢印を固定、外枠を回してみる
// 角度　開始角　フレーム長　文字表示距離、文字サイズ、回転方向（時計回り clockwise = 1）
//def arc015_1(degree, start, frameR = 100, r=60,  mojis = 20, clockwise = 0): 
//    svg = arc015_1(deg, 0, 200, 91, 24, 0)

function drawsvg_015_1(degree, frameR) {
    start = 0
    r = frameR / 200 * 91
    mojis = frameR / 200 * 24
    clockwise = 0


    defs = createSVGElement('defs', {})
    gloss = createSVGElement('linearGradient', {
        'id': `gloss_${getUuid()}`, //# 重複しないユニークなIDを生成（例: "gloss_a1b2c3d4..."）
        'gradientUnits': "objectBoundingBox",
        'x1': "40%", 'y1': "0%", 'x2': "0%", 'y2': "100%"
    },
        createSVGElement('stop', { 'offset': "0%", 'stop-color': 'white', 'stop-opacity': '0.5' }),
        createSVGElement('stop', { 'offset': "3%", 'stop-color': 'white', 'stop-opacity': '1.0' }),
        createSVGElement('stop', { 'offset': "30%", 'stop-color': 'white', 'stop-opacity': '0.2' }),
        createSVGElement('stop', { 'offset': "35%", 'stop-color': 'white', 'stop-opacity': '0.25' }),
        createSVGElement('stop', { 'offset': "50%", 'stop-color': 'white', 'stop-opacity': '0.8' }),
        createSVGElement('stop', { 'offset': "55%", 'stop-color': 'white', 'stop-opacity': '0.4' }),
        createSVGElement('stop', { 'offset': "70%", 'stop-color': 'white', 'stop-opacity': '0.01' }),
        createSVGElement('stop', { 'offset': "75%", 'stop-color': 'white', 'stop-opacity': '1.0' }),
        createSVGElement('stop', { 'offset': "76%", 'stop-color': 'white', 'stop-opacity': '1.0' }),
        createSVGElement('stop', { 'offset': "79%", 'stop-color': 'white', 'stop-opacity': '0.3' }),
        createSVGElement('stop', { 'offset': "100%", 'stop-color': 'white', 'stop-opacity': '0.01' })
    );


    gloss2 = createSVGElement('linearGradient', {
        'id': `gloss_${getUuid()}`, //# 重複しないユニークなIDを生成（例: "gloss_a1b2c3d4..."）
        'gradientUnits': "objectBoundingBox",
        'x1': "0%", 'y1': "0%", 'x2': "30%", 'y2': "100%"
    },
        createSVGElement('stop', { 'offset': "0%", 'stop-color': 'white', 'stop-opacity': '0.1' }),
        createSVGElement('stop', { 'offset': "5%", 'stop-color': 'white', 'stop-opacity': '1.0' }),
        createSVGElement('stop', { 'offset': "10%", 'stop-color': 'white', 'stop-opacity': '0.2' }),
        createSVGElement('stop', { 'offset': "30%", 'stop-color': 'white', 'stop-opacity': '0.3' }),
        createSVGElement('stop', { 'offset': "55%", 'stop-color': 'white', 'stop-opacity': '0.5' }),
        createSVGElement('stop', { 'offset': "60%", 'stop-color': 'white', 'stop-opacity': '0.8' }),
        createSVGElement('stop', { 'offset': "65%", 'stop-color': 'white', 'stop-opacity': '0.1' }),
        createSVGElement('stop', { 'offset': "80%", 'stop-color': 'white', 'stop-opacity': '0.5' }),
        createSVGElement('stop', { 'offset': "85%", 'stop-color': 'white', 'stop-opacity': '1.0' }),
        createSVGElement('stop', { 'offset': "100%", 'stop-color': 'white', 'stop-opacity': '0.1' })
    );
    defs.append(gloss, gloss2)

    padding = 10
    mask = createSVGElement('mask', { 'id': `mask_${getUuid()}` },
        createSVGElement('rect', {
            'x': -(frameR + padding), 'y': -(frameR + padding), 'width': 2 * (frameR + padding), 'height': 2 * (frameR + padding), 'fill': 'white'
        })
    );



    if (clockwise == 0) {//# 上下反転する＝sin()を＋180°
        clockwise_flg = -1
        counter_c_flg = 1
    }
    else {//# 左右反転＋上下反転＝sin() cos() ともに反転＝ともに+180
        clockwise_flg = -1
        counter_c_flg = -1
    }


    g = createSVGElement('g', {});
    swidth = mojis / 6
    swidth2 = mojis * 0.4
    frame2 = frameR / 4 * 3
    //function drawCircle(x, y, r, fill = 'black', stroke='none', stroke_width=1 ) {
    g.append(drawCircle(0, 0, frameR, '#F5F5F5', '#B0BEC5', swidth))
    g.append(drawCircle(0, 0, frameR, 'none', `url(#${gloss.getAttribute('id')})`, swidth))
    g.append(drawCircle(0, 0, frame2, 'white', '#B0BEC5', swidth2))
    g.append(drawCircle(0, 0, frame2, 'none', `url(#${gloss2.getAttribute('id')})`, swidth2))

    g.append(drawCircle(0, 0, frameR - swidth / 2, 'none', "#78909C", 0.5))
    g.append(drawCircle(0, 0, frame2 + swidth2 / 2, 'none', "#78909C", 0.8))

    mask.append(drawCircle(0, 0, frame2 - swidth2, 'black'))
    g.setAttribute('mask', `url(#${mask.getAttribute('id')})`)


    pt = [
        [5, 60],
        [-5, 60],
        [-35, 10],
        [-30, 0],
        [30, 0],
        [35, 10],
        [5, 60],
    ]
    ct = [
        [1, 75],
        [-1, 75],
        [-25, 20],
        [-35, -0],
        [35, -0],
        [45, -0],
        [9, 45],
    ]
    pt.forEach(v => {
        v[0] = v[0] / 2
        v[1] = v[1] / 2 + 0.45 * 200
    })
    ct.forEach(v => {
        v[0] = v[0] / 2
        v[1] = v[1] / 2 + 0.45 * 200
    })

    m = 2

    p = createSVGElement('path', { 'stroke-width': '1', 'stroke-linejoin': 'round', 'fill': '#263238', 'stroke': '#263238' });
    p.setAttribute('d',
        M(pt[0][0], pt[0][1]) +
        C(ct[0][0], ct[0][1], ct[1][0], ct[1][1], pt[1][0], pt[1][1]) +
        S(ct[2][0], ct[2][1], pt[2][0], pt[2][1]) +
        S(ct[3][0], ct[3][1], pt[3][0], pt[3][1]) +
        L(pt[4][0], pt[4][1]) +
        C(ct[4][0], ct[4][1], ct[5][0], ct[5][1], pt[5][0], pt[5][1]) +
        S(ct[6][0], ct[6][1], pt[6][0], pt[6][1]) +
        ' Z ' +

        M(-m, pt[4][1]) +
        C(-m, pt[4][1] - 20, -m, 20, -3 * m, 0) +
        H(3 * m) +
        C(m, 20, m, pt[4][1] - 20, m, pt[4][1]) + ' Z'
    )
    p.setAttribute('transform', rotate(180) + scale(frameR / 200, frameR / 200));
    //# 中心点に置いた小円
    g_point = createSVGElement('g', { 'fill': 'pink' });
    g_point.append(p)
    g_point.append(drawCircle(0, 0, mojis * 0.8, 'white', '#263238', mojis * 0.2))
    //function drawText(str, font_size, x, y, text_anchor, font_family, font_weight, dominant_baseline, fill_col, id) {
    g_point.append(drawText(`${degree}`, mojis / 4 * 3, 0, mojis * 0.09,
        "middle", 'Times New Roman', 900, 'middle', '#263238', `degree_${degree}`
    ));



    //# 表面の目盛りを描画
    //# 中心へ向かう線 0 10 20,,, は長く、5,15,25,,,は中間、それ以外は短い線分
    pdgs = createSVGElement('path', { 'stroke': 'black', 'stroke-width': '0.5' }) //#,  transform=f"translate({0} {0}) scale(1 -1)")
    l_low = frameR - mojis / 2
    l_high = frameR - swidth / 2
    const pythonMod = (n, m) => n - m * Math.floor(n / m);
    pdstr = ''
    for (i = 0; i < 360; i++) {
        rad_i = (i + degree) / 180 * Math.PI;
        ;[icos, isin] = [counter_c_flg * Math.cos(rad_i), clockwise_flg * Math.sin(rad_i)];
        if (pythonMod(i, 10) == 0) {
            pdstr += M((2 * l_low - l_high) * icos, (2 * l_low - l_high) * isin)
            pdstr += L(l_high * icos, l_high * isin)
        }
        else if (pythonMod(i, 5) == 0) {
            pdstr += M((2 * l_low - l_high / 2 - l_low / 2) * icos, (2 * l_low - l_high / 2 - l_low / 2) * isin)
            pdstr += L(l_high * icos, l_high * isin)
        }
        else {
            pdstr += M(l_low * icos, l_low * isin)
            pdstr += L(l_high * icos, l_high * isin)
        }
    }
    pdgs.setAttribute('d', pdstr)
    g_point.append(pdgs)


    amber = '#FBC02D'
    amber = '#80CBC4' // teal
    //# 中心へ向かう線
    l_low = frame2 - swidth2 / 2 - mojis / 8 * 6
    l_high = frame2 - swidth2 / 2 - mojis / 8
    p_amber = createSVGElement('path', { 'stroke': amber, 'stroke-width': 1, 'fill': 'none' })
    sp_amber = '';
    //# 90度を20等分している
    for (i = 0; i < 81; i++) {
        rad_i = (-degree + i * 360 / 80 + 90) / 180 * Math.PI;
        ;[icos, isin] = [counter_c_flg * Math.cos(rad_i), clockwise_flg * Math.sin(rad_i)];
        sp_amber += M(l_low * icos, l_low * isin);
        sp_amber += L(l_high * icos, l_high * isin);
    }

    ;[r1, r2] = [r / 6 * 7, r / 6 * 5];
    for (i = -degree; i < -degree + 360; i += 45) {
        rad_i = (i + 90) / 180 * Math.PI;
        ;[icos, isin] = [counter_c_flg * Math.cos(rad_i), clockwise_flg * Math.sin(rad_i)];
        sp_amber += M(r1 * icos, r1 * isin);
        sp_amber += L(r2 * icos, r2 * isin);
    }
    p_amber.setAttribute('d', sp_amber)
    g_amber = createSVGElement('g', {})
    g_amber.append(p_amber)

    g_amber.append(drawCircle(0, 0, l_high, 'none', amber, 1))
    g_amber.append(drawCircle(0, 0, (l_high + l_low) / 2, 'none', amber, 0.2))
    g_amber.append(drawCircle(0, 0, l_low, 'none', amber, 1))

    g_amber.append(drawCircle(0, 0, r1, 'none', amber, mojis / 3))
    g_amber.append(drawCircle(0, 0, r2, 'none', amber, 2))




    //# 表面に数字を書く
    //function drawText(str, font_size, x, y, text_anchor, font_family, font_weight, dominant_baseline, fill_col, id)
    g_text = createSVGElement('g', {'fill': 'none'})
    s = mojis
    moji_r = frame2 + mojis * 0.6
    for (num = -degree + 0; num < -degree + 360; num += 20)    {
        if (num + degree == 0 || num + degree == 180) {
            continue
        }
        txt = drawText(`${num + degree}`, s, 0, 0,
            "middle", 'Times New Roman', 900, 'middle', 'black', `${num + degree}`)
        txt.setAttribute('transform',
            translate(moji_r *  Math.cos((num-90)/180*Math.PI), moji_r * Math.sin((num-90)/180*Math.PI)) +
            rotate(num)
        )
        g_text.append(txt)
    }
    
    //# 方位文字を描く
    direction = { 0: 'N', 45: 'NE', 90: 'E', 135: 'SE', 180: 'S', 225: 'SW', 270: 'W', 315: 'NW' }
    for (num = -degree + 0; num < -degree + 360; num += 45) {
        mojs = mojis
        if (pythonMod(num, 90) != 0) {
            mojs = mojis * 0.8
        }
        txt = drawText(`${direction[num + degree]}`, mojs, 0, 0,
            "middle", 'Times New Roman', 900, 'auto', '#455A64', `${direction[num + degree]}`)
        txt.setAttribute('transform',
            translate(r1 * Math.cos((num - 90) / 180 * Math.PI), r1 * Math.sin((num - 90) / 180 * Math.PI)) +
            rotate(num)
        );
        g_amber.append(txt)
    }
    
    //# 45度格子円を描く
    for (num = -degree + 0; num < -degree + 360; num += 45) {
        _num = num + 45 / 2;
        [ncos, nsin] = [Math.cos((_num) / 180 * Math.PI), Math.sin((_num) / 180 * Math.PI)];
        r_1 = r1 * 1.3;
        r_2 = r_1 * 0.82;
        r22 = r_2 * 1.02;
        [dncos, dnsin] = [Math.cos((_num + 90) / 180 * Math.PI), Math.sin((_num + 90) / 180 * Math.PI)];
        r_3 = r1 * 0.04;
        g_amber.append(createSVGElement('path', {
            'stroke-width': 0, 'stroke': '#455A64', 'fill': '#455A64',
            'd': M(r_1 * ncos, r_1 * nsin) + L(r_2 * ncos + r_3 * dncos, r_2 * nsin + r_3 * dnsin) +
                C(r22 * ncos, r22 * nsin, r22 * ncos, r22 * nsin, r_2 * ncos - r_3 * dncos, r_2 * nsin - r_3 * dnsin) + ' Z'
        }));
    }
    
    //# 外輪に E W 文字を描く
    ;[-degree + 90, -degree + 270].forEach(num => {
        mojs = mojis
        txt = drawText(`${direction[num + degree]}`, mojs * 0.7, 0, 0,
            "middle", 'Georgia', 900, 'auto', '#00695C', `${direction[num + degree]}`);
        txt.setAttribute('transform',
            translate(moji_r * Math.cos((num - 90) / 180 * Math.PI), moji_r * Math.sin((num - 90) / 180 * Math.PI)) +
            rotate(num)
        );
        g_amber.append(txt)
    });
    //# 外輪に N S 文字を描く
    ;[-degree + 0, -degree + 180].forEach(num => {
        mojs = mojis
        moji_r_NS = frame2 + mojis * 0.4
        txt = drawText(`${direction[num + degree]}`, mojs * 1.2, 0, 0,
            "middle", 'Georgia', 900, 'auto', '#00695C', `${direction[num + degree]}`);
        txt.setAttribute('transform',
            translate(moji_r_NS * Math.cos((num - 90) / 180 * Math.PI), moji_r_NS * Math.sin((num - 90) / 180 * Math.PI)) +
            rotate(num)
        );
        g_amber.append(txt)
    });


    //# 模様を書く
    r3 = r2 * 0.24;
    function get_po(r, deg) {
        
        rad = deg / 180 * Math.PI
        return [r * counter_c_flg * Math.cos(rad), r * clockwise_flg * Math.sin(rad)]
    }
    sp_amber = '';
    ;[0., 22.5, 45., 67.5, 90.].forEach(i => {
        const direction = [];
        for (let d = degree; d < degree + 360; d += 30) {
            direction.push(d);
        }
        //radius = [r2, r3, r3] * 4
        const radius = Array(4).fill([r2, r3, r3]).flat();
        //degree_radius = list(zip(direction + i, radius))
        degree_radius = [];
        for (j = 0; j < 12; j++) {
            degree_radius.push([direction[j]+i, radius[j]]);    
        }
        //pos = [get_po(_r, _d) for _d, _r in degree_radius]
        pos = [];
        for (j = 0; j < 12; j++) {
            [_d, _r] = degree_radius[j];
            pos.push(get_po(_r, _d));
        }
        sp_amber += M(pos[0][0], pos[0][1]);
        sp_amber += C(pos[1][0], pos[1][1], pos[2][0], pos[2][1], pos[3][0], pos[3][1]);
        sp_amber += C(pos[4][0], pos[4][1], pos[5][0], pos[5][1], pos[6][0], pos[6][1]);
        sp_amber += C(pos[7][0], pos[7][1], pos[8][0], pos[8][1], pos[9][0], pos[9][1]);
        sp_amber += C(pos[10][0], pos[10][1], pos[11][0], pos[11][1], pos[0][0], pos[0][1]);
        sp_amber += ' Z';
    });
    p_amber.setAttribute('d', p_amber.getAttribute('d') + sp_amber);





    //# 扇形のセクター（最小座標と、有効幅と高さ）を計算する。結果は上下反転させたあとの座標をframeRで正規化してある。
    ;[scx, scy] = [[-1, 1], [-1, 1]];

    /**
    g.append(createSVGElement('path', {
        'stroke':'red', 'fill':'none', 'stroke-width':1,
        'd': M(frameR*scx[0], frameR*scy[0]) + L(frameR*scx[1], frameR*scy[0]) + LL(frameR*scx[1], frameR*scy[1], frameR*scx[0], frameR*scy[1]) + ' Z'
    }));
     */
    /*
    g.append(createSVGElement('rect', {
        'x': -frameR, 'y': -frameR, 'width': frameR*2, 'height': frameR*2, 'fill':'none', 'stroke':'blue'
    }));
    */
    
    w = round(frameR * abs(scx[1] - scx[0]), 2)
    h = round(frameR * abs(scy[1] - scy[0]), 2)

    wd = round(w + 2 * padding, 2);
    ht = round(h + 2 * padding, 2);     

    const d = document.createElementNS(SVG_NS, "svg");
    d.setAttribute('id', 'SVG-' + 'drawsvg_015_1');
    d.setAttribute("xmlns", SVG_NS);
    d.setAttribute("width", `${wd}`);
    d.setAttribute("height", `${ht}`);
    d.setAttribute("viewBox", `${round(frameR * scx[0] - padding, 2)} ${round(frameR * scy[0] - padding, 2)} ${wd} ${ht}`);

    d.append(g)
    d.append(g_amber)
    d.append(g_point)
    d.append(g_text)
    d.append(mask)

    //# defs に追加
    d.append(defs)

    return d


}
