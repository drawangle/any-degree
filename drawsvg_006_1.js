// arc006_1( a, start_angle, 100, 70, 2, 28, 16, 0)
// 角度　開始角　フレーム長　ポンタ−位置　ポインタ幅　文字サイズ
//def arc006_1(degree, start, frameR = 100, r = 40,swidth = 50, s = 20, yr = 20, clockwise = 0): # 矢印の長さ): 
function drawsvg_006_1(degree, frameR) { // 矢印の長さ)) { 
    start = 0
    r = frameR - 60
    swidth = 4
    s = 28
    yr = 16
    clockwise = 0
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
    const [sx, sy] =[frameR * acos, frameR * asin];
    const [ex, ey] = [frameR * bcos, frameR * bsin];

    
    
    padding = 10
    color = '#9C27B0'
    
    //srad = 0
    //erad = degree/180*Math.PI

    //g_s = draw.Group(
        //transform=f"translate({0} {0}) rotate({start})", 
        //stroke = '#E91E63')
    g_s = createSVGElement("g", {'stroke': '#E91E63'});

    //<line x1="0" y1="80" x2="100" y2="20" stroke="black" />
    //line = draw.Line(0,0,sx, sy, stroke_width=20, stroke_linecap='round')
    line = drawLine(0,0, sx,sy, 20, 'round')

    g_s.appendChild(line)

    if (degree < 360) {
        //arc = draw.Path(d = f'M{r*acos} {r*asin} A{r} {r} 0 {degree//180} {clockwise} {r*bcos} {r*bsin}', stroke_width = 4, fill = 'none', stroke = '#FBC02D')
        arc = createSVGElement('path', {
            'stroke': '#FBC02D', 'fill': 'none', 'stroke-width': `${swidth}`,
            'stroke_linejoin': 'miter',
            'd': M(r*acos, r*asin) + A(r, (degree>180)?1:0, clockwise, r*bcos, r*bsin)
        });
    } else {
        arc = drawCircle(0,0,r,'none','#FBC02D', swidth)
    }
    g_s.appendChild(arc)

    //g_e = draw.Group(
    //    stroke='#FF9800')
    g_e= createSVGElement("g", {'stroke': '#FF9800'});

    //line = draw.Line(0, 0, ex, ey, stroke_width = 20, stroke_linecap = 'round')
    line = drawLine(0, 0, ex ,ey, 20, 'round')
    g_e.appendChild(line)

    //g = draw.Group()
    g= createSVGElement("g", {});
    g.appendChild(g_s)
    g.appendChild(g_e)
    g.appendChild(drawCircle(0,0,5, 'white', '#757575', 2))

    tx = 0
    ty = Math.min(-30, -frameR * Math.sin((degree+start)/180*Math.PI))
    ss = `${degree}°`
    text = drawText(ss,s, tx, ty, "middle", "sans-serif", 500, 'central', '#37474F', id)

    // テキストバウンディングボックスを計算する。
    mojis = s
    bcos = counter_c_flg * Math.cos((degree+start)/180*Math.PI)
    bsin = clockwise_flg * Math.sin((degree+start)/180*Math.PI)
    vertices = get_transformed_vertices(0, 0, 1.5*mojis, mojis, tx - s, ty - s/2, 0)
    g.appendChild(createSVGElement('path', {
        'stroke': 'red', 'fill': 'none',
        'd': M(vertices[0][0], vertices[0][1]) +
            LL(vertices[1][0], vertices[1][1], vertices[2][0], vertices[2][1]) +
            L(vertices[3][0], vertices[3][1]) + ' Z'

    }));
    
    //for (v in vertices) {
    //    g.appendChild(draw.Circle(v[0], v[1], 2, fill = 'red'))
    //}
    vertices.forEach(v => {
        g.appendChild(
            drawCircle(v[0], v[1], 2, 'red')
        )
    });



    /**'''
    // 扇形のセクター（最小座標と、有効幅と高さ）を計算する。
    scx, scy = sector(start, start + degree)
    //print(scx, scy)
    // テキストのバウンド枠を記録する。最小点と最大点
    txtmin = (tx - len(ss) * s / 4, ty - s / 2)
    txtmax = (tx + len(ss) * s / 4, ty + s / 2)
    //g.appendChild(draw.Rectangle(txtmin[0], txtmin[1], s*len(ss)//2, s, stroke_width=1, fill='none', stroke='red'))
    //print('----------')
    //print(txtmin, txtmax)
    // テキストセクターを計算する。frameRで正規化する
    text_scx = (txtmin[0] / frameR, txtmax[0] / frameR)
    text_scy = (txtmin[1] / frameR, txtmax[1] / frameR)
    //print(text_scx, text_scy)

    // 扇形のセクター（最小座標と、有効幅と高さ）を計算する。
    //scx, scy = sector(start, start+degree)
    //print(scx, scy)

    // テキストと扇形で最小の座標、幅高さを計算する
    scx[0] = min(scx[0], text_scx[0])
    scx[1] = max(scx[1], text_scx[1])
    scy[0] = min(scy[0], -text_scy[1])
    scy[1] = max(scy[1], -text_scy[0])
    '''*/

    // 扇形のセクター（最小座標と、有効幅と高さ）を計算する。
    [scx, scy] = sector(start, start + degree);
    [scy[0], scy[1]] = [-scy[1], -scy[0]];
    if (clockwise == 1) {
        [scx[0], scx[1]] = [-scx[1], -scx[0]];
    }
    // frameRで正規化したテキストバウンディングボックスを扇形のセクター結果に加える
    //for (vx, vy in vertices) {
    vertices.forEach(v => {
        const [vx, vy] = [v[0], v[1]];
        scx[0] = min(scx[0], vx / frameR);
        scx[1] = max(scx[1], vx / frameR);
        scy[0] = min(scy[0], vy / frameR);
        scy[1] = max(scy[1], vy / frameR);
    });
    //g.appendChild(draw.Path(
    //    d = f'M{frameR*scx[0]} {frameR*scy[0]} L{frameR*scx[1]} {frameR*scy[0]} {frameR*scx[1]} {frameR*scy[1]} {frameR*scx[0]} {frameR*scy[1]} Z',
    //    stroke = 'red', fill = 'none', stroke_width = 1
    //))

    g.appendChild(createSVGElement('path', {
        'stroke': 'red', 'fill': 'none', 'stroke-width': "1",
        'd': M(frameR * scx[0], frameR * scy[0]) +
            LL(frameR * scx[1], frameR * scy[0], frameR * scx[1], frameR * scy[1]) +
            L(frameR * scx[0], frameR * scy[1]) + ' Z'        
    }));





    padding = 15
    w = round(frameR * Math.abs(scx[1] - scx[0]), 2)
    h = round(frameR * Math.abs(scy[1] - scy[0]), 2)

    //d = draw.Drawing(w + 2 * padding, h + 2 * padding,
    //    origin = (round(frameR * scx[0] - padding, 2), round(frameR * scy[0] - padding, 2)))
    /**'''
    w, h = 220, 220
    d = draw.Drawing(w, h, origin = 'center')
    '''*/
    wd = round(w + 2 * padding, 2);
    ht = round(h + 2 * padding, 2);     
    
    const d = document.createElementNS(SVG_NS, "svg");
    d.setAttribute('id', 'SVG-' + 'drawsvg_006_1'),
    d.setAttribute("xmlns", SVG_NS);
    d.setAttribute("width", `${wd}`);
    d.setAttribute("height", `${ht}`);
    d.setAttribute("viewBox", `${round(frameR * scx[0] - padding, 2)} ${round(frameR * scy[0] - padding, 2)} ${wd} ${ht}`);





    d.appendChild(g)
    d.appendChild(text)

    //d.set_pixel_scale(1)  // Set number of pixels per geometry unit

    return d

}

/**        
for a in range(30, 361, 90)) {
    for start_angle in range(0, 361, 90)) {
        svg = arc006_1( a, start_angle, 100, 70, 2, 28, 16, 0)
 */