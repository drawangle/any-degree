
//     svg = arc014(deg, start, 200, 178, 12, 0)
function drawsvg_014_1(degree, frameR) {
    start = 0
    r = frameR / 200 * 178
    mojis = frameR / 100 * 6
    clockwise = 0
    if (degree < 0) {
        clockwise = 1
        degree *= -1
        start = 180
    }




    // フィルター定義
    defs = createSVGElement('defs', {})
    //<!-- アクリルの歪みと光沢をシミュレートするフィルター -->
    filterAcrylic = createSVGElement('filter', {
        'id': `acrylic-effect`, 'x': "-10%", 'y': "-10%", 'width': "120%", 'height': "120%"
    },
        //<!-- 1. 背後の歪み（屈折） -->
        createSVGElement('feTurbulence', {
            'type': "fractalNoise", 'baseFrequency': "0.05",
            'numOctaves': "3", 'result': "noise"
        }),
        createSVGElement('feDisplacementMap', {
            'in': "SourceGraphic", 'in2': "noise", 'scale': "2",
            'xChannelSelector': "R", 'yChannelSelector': "G"
        }),

        //<!-- 2. エッジの光沢（ハイライト） -->
        createSVGElement('feSpecularLighting', {
            'in': "SourceAlpha", 'surfaceScale': "1", 'specularConstant': "1",
            'specularExponent': "30", 'lighting-color': "white", 'result': "specLight"
        },
            createSVGElement('fePointLight', { 'x': "-100", 'y': "-100", 'z': "50" })
        ),
        createSVGElement('specLight', {
            'in': "specLight", 'in2': "SourceAlpha", 'operator': "in",
            'result': "specularHighlight"
        }),
        createSVGElement('SourceGraphic', {
            'in': "SourceGraphic", 'in2': "specularHighlight",
            'operator': "arithmetic", 'k1': "0", 'k2': "1", 'k3': "1", 'k4': "0"
        })
    );
    //< !--アクリル本体の透明な水色グラデーション -->
    cyans = ["#80DEEA", "#B2EBF2", "#eefafa"]
    //cyans = ['#1c9aaa', '#21b3c5', '#44c8c8']
    cyans = ['#1c9aaa', '#21b3c5', '#44c8c8']
    //cyans = ['#1c45aa', '#2151c5', '#4479c8']
    cyans = ['#1c6faa', '#2182c5', '#44a0c8']
    //cyans = ['#23c4d9', '#46cfdf', '#7cd8d8']
    //cyans = ['#51d1e2', '#7cdde8', '#b5e9e9']
    cyans = ['#21b6c9', '#34cadc', '#6ad3d3']
    gradAcrylic = createSVGElement('linearGradient', {
        'gradientUnits': "objectBoundingBox",
        'id': "acrylic-gradient", 'x1': "0%", 'y1': "0%", 'x2': "100%", 'y2': "100%"
    },
        createSVGElement('stop', { 'offset': "0%", 'stop-color': cyans[0], 'stop-opacity': '0.8' }),
        createSVGElement('stop', { 'offset': "50%", 'stop-color': cyans[1], 'stop-opacity': '0.6' }),
        createSVGElement('stop', { 'offset': "100%", 'stop-color': cyans[2], 'stop-opacity': '0.4' })
    );
    defs.append(filterAcrylic, gradAcrylic)





    m = 20 //#下ひれ幅
    n = 0 //#横ひれ幅
    //#####################################################################
    //# α、β 角に回転済みの扇形を生成する。 rotate({start})　を使用しない。20260630
    //#####################################################################
    rad = degree / 180 * Math.PI
    rad_alpha = start / 180 * Math.PI
    rad_beta = (start + degree) / 180 * Math.PI

    if (clockwise == 0) //# 上下反転する＝sin()を＋180°
    {
        clockwise_flg = -1
        counter_c_flg = 1
    }
    else //# 左右反転＋上下反転＝sin() cos() ともに反転＝ともに+180
    {
        clockwise_flg = -1
        counter_c_flg = -1
    }

    acos = counter_c_flg * Math.cos(rad_alpha)
    asin = clockwise_flg * Math.sin(rad_alpha)
    bcos = counter_c_flg * Math.cos(rad_beta)
    bsin = clockwise_flg * Math.sin(rad_beta);

    ;[sx, sy] =[frameR * acos, frameR * asin];
    //<!-- 元のパス形状（ストロークなし、アクリルグラデーション） -->
    p = createSVGElement('path', {
        'fill': "url(#acrylic-gradient)",
        'stroke-width': '1', 'stroke-linejoin': 'round',
        'd': M(sx, sy) +
            L(0, 0) + L(frameR * bcos, frameR * bsin) +
            A(frameR, (degree > 180) ? 1 : 0, 1 - clockwise, sx, sy) + ' Z'
    });
    if (degree >= 360) {
        p = drawCircle(0, 0, frameR, fill="url(#acrylic-gradient)", stroke_width = 1 )
    }

    //<!-- エッジ（ストローク）をわずかに残す -->#B2EBF2
    po = createSVGElement('path', {
        'stroke': '#B2EBF2', 'fill': 'none', 'stroke-width': '2.0', 'opacity': "60%",
        'stroke-miterlimit': '1.414', 'stroke-linejoin': 'bavel',
        'd': M(sx, sy) +
            L(0, 0) + L(frameR * bcos, frameR * bsin) +
            A(frameR, (degree > 180) ? 1 : 0, 1 - clockwise, sx, sy) + ' Z'
    });

    g = createSVGElement('g', { 'fill': "url(#acrylic-effect)", 'opacity':"0.8" }) //cyanの透明なグラデーション
    g.append(p);
    g.append(po);




    //# 表面の目盛りを描画

    //# 中心へ向かう線
    pdgs = ''
    l_low = frameR/100 * 96
    l_high = frameR
    const pythonMod = (n, m) => n - m * Math.floor(n / m);
    //t_deg = pythonMod(- degree - start, 360);       
    for (i = 0; i < degree; i++) {
        rad_i = (start + i) / 180 * Math.PI;
        [icos, isin] =[counter_c_flg * Math.cos(rad_i), clockwise_flg * Math.sin(rad_i)];
        if (pythonMod(i, 5) == 0) {
            pdgs += M((2 * l_low - l_high) * icos, (2 * l_low - l_high) * isin)
            pdgs += L(l_high * icos, l_high * isin)
        }
        else {
            pdgs += M(l_low * icos, l_low * isin)
            pdgs += L(l_high * icos, l_high * isin)
        }
    }

    m_low = frameR/100 * 82
    m_high = frameR/100 * 86
    for (i = 0; i < degree; i++) {
        rad_i = (start + i) / 180 * Math.PI;
        [icos, isin] = [counter_c_flg * Math.cos(rad_i), clockwise_flg * Math.sin(rad_i)];
        if (pythonMod(i ,10) == 0) {
            pdgs += M(m_low * icos, m_low * isin)
            pdgs += L(m_high * icos, m_high * isin)
        }
    }
    m_low = frameR/100 * 10
    m_high = frameR/100 * 76
    for (i = 0; i < degree; i++) {
        
        rad_i = (start + i) / 180 * Math.PI;
        [icos, isin] = [counter_c_flg * Math.cos(rad_i), clockwise_flg * Math.sin(rad_i)];
        if (i % 10 == 0) {
            pdgs += M(m_low * icos, m_low * isin)
            pdgs += L(m_high * icos, m_high * isin)
        }

    }
 

    //# degree度 目盛り線
    ;[dcos, dsin] = [counter_c_flg * Math.cos(rad_beta), clockwise_flg * Math.sin(rad_beta)];
    degree_line = drawLine(frameR/100*101*dcos, frameR/100*101*dsin, frameR/100*105*dcos, frameR/100*105*dsin,
            0.6, 'butt')
    //# 弧
    m_high = frameR/100 * 85
    acos = counter_c_flg * Math.cos(rad_alpha)
    asin = clockwise_flg * Math.sin(rad_alpha)
    bcos = counter_c_flg * Math.cos(rad_beta)
    bsin = clockwise_flg * Math.sin(rad_beta)
 
    pdgs += M(m_low*bcos, m_low*bsin)
    pdgs += A(m_low,(degree>180)?1:0,1 - clockwise,m_low*acos, m_low*asin)
    pdgs += M(m_high*bcos, m_high*bsin)
    pdgs += A(m_high,(degree>180)?1:0,1 - clockwise,m_high*acos, m_high*asin)

    m_high = 75
    pdgs += M(m_high*bcos, m_high*bsin)
    pdgs += A(m_high,(degree>180)?1:0,1 - clockwise,m_high*acos, m_high*asin)


   
    //# 表面に数字を書く
    g_text = createSVGElement('g', { 'fill': 'none' }) 
    s = mojis
    moji_r = r
    for (num = 0; num < 361; num += 10)
    {
        if (num > degree || num >= 360) {
            break
        }
        //function drawText(str, font_size, x, y, text_anchor, font_family, font_weight, dominant_baseline, fill_col, id) {
        const txt = drawText(`${num}`, s, 0, 0, "middle", 'sans-serif', 200, 'middle', 'black', `${num}`);
        txt.setAttribute('transform', translate(moji_r * counter_c_flg * Math.cos((num+start)/180*Math.PI), moji_r * clockwise_flg * Math.sin((num+start)/180*Math.PI)) +
            rotate(counter_c_flg * (90 - num - start)))
        g_text.append(txt)
    }
        
    moji_r -= (frameR/100 * 10)
    for (num = 0; num < 361; num +=10)
    {
        if (num > degree || num >= 360) {
            continue
        }
        maxangle = 360
        if (degree <= 180) {
            //# num は 180から10°ずつ引いていく        
            maxangle = 180
        }

        //function drawText(str, font_size, x, y, text_anchor, font_family, font_weight, dominant_baseline, fill_col, id) {
        const txt = drawText(`${maxangle - num}`, s, 0, 0, "middle", 'sans-serif', 200, 'middle', 'black', `${maxangle - num}`)
        txt.setAttribute('transform', translate(moji_r * counter_c_flg * Math.cos((num+start)/180*Math.PI), moji_r * clockwise_flg * Math.sin((num+start)/180*Math.PI)) +
            rotate(counter_c_flg * (90 - num - start)))
        g_text.append(txt)
    }


    //# 度数を表すテキスト
    [dcos, dsin] = [counter_c_flg * Math.cos(rad_beta), clockwise_flg * Math.sin(rad_beta)];
    /*t_deg = 360 - degree - start
    if (t_deg < 0) {
        t_deg += 360
    }
    else if (t_deg > 360) {
        t_deg -= 360
    }*/
    t_deg = pythonMod(- degree - start, 360); 

    text_anchor='start'
    dominant_baseline='auto'

    if (90 < t_deg && t_deg < 270) {
        
        t_deg += 180
        if (clockwise == 0) {
            text_anchor = "end"
            dominant_baseline = 'hanging'
        }
        else {
            dominant_baseline = 'hanging'
        }
    }
    else
    {
        if (clockwise == 0) {
            //pass
        }
        else {
            text_anchor = "end"
        }
    }

    //function drawText(str, font_size, x, y, text_anchor, font_family, font_weight, dominant_baseline, fill_col, id) {
    degree_text = drawText(`${degree}`, s, 0, 0, text_anchor, 'sans-serif', 800, dominant_baseline, 'black', `${degree}`)
    degree_text.setAttribute('letter_spacing', '0')
    degree_text.setAttribute('transform', translate(frameR/100*105*dcos, frameR/100*105*dsin) +
        rotate(counter_c_flg * t_deg) )


    g_text.append(degree_text)


    //print(123) // windows.print が実行できる。ブラウザの印刷ダイアログが起動する

    pathDgs = createSVGElement('path', {
        'stroke': 'black', 'stroke-width': '0.2',
        'd': pdgs
    })


    g_grid = createSVGElement('g', { 'fill': 'none' },
        pathDgs,
        degree_line
    );


    //# テキストバウンディングボックスを計算する。
    bcos = counter_c_flg * Math.cos((degree+start)/180*Math.PI)
    bsin = clockwise_flg * Math.sin((degree+start)/180*Math.PI)
    vertices = get_transformed_vertices(0, 0, counter_c_flg * 1.5*mojis, -mojis, (frameR/100*105)*bcos, (frameR/100*105)*bsin, -counter_c_flg * (degree+start))

    root_g = createSVGElement('g', {},
        createSVGElement('path', {
            'stroke': 'red', 'fill': 'none', 'stroke-width': 0.5,
            'd': M(vertices[0][0], vertices[0][1]) +
                LL(vertices[1][0], vertices[1][1], vertices[2][0], vertices[2][1]) + L(vertices[3][0], vertices[3][1]) + ' Z'
        }))

    vertices.forEach(v => {
        root_g.append(drawCircle(v[0], v[1], 1, fill = 'red'))
    });

    //#
    vertices2 = get_transformed_vertices(0, 0, counter_c_flg * 2*mojis, -mojis, (frameR/100*80)*bcos, (frameR/100*80)*bsin, -counter_c_flg * (degree+start))
    root_g.append(
        createSVGElement('path', {
            'stroke': 'red', 'fill': 'none', 'stroke-width': 0.5,
            'd': M(vertices2[0][0], vertices2[0][1]) +
                LL(vertices2[1][0], vertices2[1][1], vertices2[2][0], vertices2[2][1]) + L(vertices2[3][0], vertices2[3][1]) + ' Z'
        }));

    //#
    bcos = counter_c_flg * Math.cos((start)/180*Math.PI)
    bsin = clockwise_flg * Math.sin((start)/180*Math.PI)
    vertices3 = get_transformed_vertices(0, 0, counter_c_flg * 2*mojis, mojis, (frameR/100*80)*bcos, (frameR/100*80)*bsin, -counter_c_flg * start)
    root_g.append(
        createSVGElement('path', {
            'stroke': 'red', 'fill': 'none', 'stroke-width': 0.5,
            'd': M(vertices3[0][0], vertices3[0][1]) +
                LL(vertices3[1][0], vertices3[1][1], vertices3[2][0], vertices3[2][1]) + L(vertices3[3][0], vertices3[3][1]) + ' Z'
        }));








    //# 扇形のセクター（最小座標と、有効幅と高さ）を計算する。結果は上下反転させたあとの座標をframeRで正規化してある。
    ;[scx, scy] = sector(start, start + degree);
    ;[scy[0], scy[1]] = [-scy[1], -scy[0]];
    if (clockwise == 1) {
        ;[scx[0], scx[1]] = [-scx[1], -scx[0]];
    }
    
    //# frameRで正規化したテキストバウンディングボックスを扇形のセクター結果に加える
    [vertices, vertices2, vertices3].forEach(vers => {
        vers.forEach(v => {
            [vx, vy] = [v[0], v[1]];
            scx[0] = min(scx[0], vx / frameR)
            scx[1] = max(scx[1], vx / frameR)
            scy[0] = min(scy[0], vy / frameR)
            scy[1] = max(scy[1], vy / frameR)
        });
    });
    root_g.append(
        createSVGElement('path', {
            'stroke': 'red', 'fill': 'none', 'stroke-width': 0.5,
            'd': M(frameR*scx[0], frameR*scy[0]) +
                LL(frameR*scx[1], frameR*scy[0], frameR*scx[1], frameR*scy[1]) + L(frameR*scx[0], frameR*scy[1]) + ' Z'
        }));
            

    
    
    
    w = round(frameR * abs(scx[1] - scx[0]), 2)
    h = round(frameR * abs(scy[1] - scy[0]), 2)
    padding = 10

    wd = round(w + 2 * padding, 2);
    ht = round(h + 2 * padding, 2);     

    const d = document.createElementNS(SVG_NS, "svg");
    d.setAttribute('id', 'SVG-' + 'drawsvg_014_1'),
    d.setAttribute("xmlns", SVG_NS);
    d.setAttribute("width", `${wd}`);
    d.setAttribute("height", `${ht}`);
    d.setAttribute("viewBox", `${round(frameR * scx[0] - padding, 2)} ${round(frameR * scy[0] - padding, 2)} ${wd} ${ht}`);


    d.append(defs)
    d.append(g)
    
    d.append(g_grid)
    d.append(g_text)
    d.append(root_g)
    /*
    */
    
    return d







}