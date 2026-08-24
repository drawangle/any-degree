/************************** drawsvg_007_1.svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="240.0" height="273.02" viewBox="-10 -100.63 120.0 136.51">
<defs>
<filter id="gblue">
<feGaussianBlur in="SourceGraphic" stdDeviation="2"></feGaussianBlur>
</filter>
</defs>
<g transform="translate(0, 0)">
<g transform="translate(0, 0)" fill="#1A237E" filter="url(#gblue)">
<path d="M42.26182617406993,-90.630778703665 L0,0 L96.59258262890684,25.881904510252035 A100,100,0,0,0,42.26182617406993,-90.630778703665 Z" stroke="none" stroke-width="0" id="d0" />
</g>
<g transform="translate(-4, -4)" fill="#9C27B0">
<use xlink:href="#d0" />
<text x="0" y="-20.25" font-size="18" font-weight="400" fill="#1A237E" transform="         translate(57.95554957734411 15.529142706151221)         rotate(-345)" text-anchor="start" dominant-baseline="hanging">80</text>
</g>
</g>
</svg>
****************************/
//function drawText(str, font_size, x, y, text_anchor, font_family, font_weight, dominant_baseline, fill_col, id) {
function rot_text(deg, start_deg, r, s) {
    if (90 < (deg + start_deg)%360 && (deg + start_deg)%360 < 270){
        text = drawText(`${deg}°`, s, r, -s / 2, "middle", "sans-serif", 1000, 'middle', 'black', id)
        text.setAttribute('transform', `rotate(${180-deg-start_deg}) translate(${-2*r} 0)`) 
        //    fill = 'black', font_weight = 1000, transform = f"rotate({180-deg-start_deg}) translate({-2*r} 0)", 
        //                 text_anchor="middle" , dominant_baseline='middle')
        return text
    }
    text = drawText(`${deg}°`, s, r, s / 1.8, "middle", "sans-serif", 1000, 'middle', 'black', id)
    text.setAttribute('transform', `rotate(${-deg-start_deg}) translate(${0} 0)`) 
    return text
    //return draw.Text(f'{deg}°', s, r, s / 1.8, fill = 'black', font_weight = 1000, transform = f"rotate({-deg-start_deg}) translate({0} 0)", 
    //                 text_anchor="middle" , dominant_baseline='middle')
}
//svg = arc004_1(deg, start, 100, 60, 18, 0)
//開始角　フレーム長　文字位置距離　文字サイズ 時計回り=1
function drawsvg_007_1(degree, frameR) {
    start = 0
    r = frameR - 40
    mojis = 18
    clockwise = 0 
    
    if (degree < 0) {
        clockwise = 1
        degree *= -1
        start = 180
    }


    // フィルター定義
    /*
    <filter id="gblue">
    <feGaussianBlur in="SourceGraphic" stdDeviation="2"></feGaussianBlur>
    </filter>

    filt = draw.Filter(id = "gblue")
    filt.appendChild(draw.FilterItem(
        'feGaussianBlur',
        in_='SourceGraphic',
        stdDeviation=2,
        
    ))*/
    const filt = document.createElementNS(SVG_NS, 'filter');
    filt.setAttribute('id', 'gblue');
    const filterItem = document.createElementNS(SVG_NS, 'feGaussianBlur');
    filterItem.setAttribute('in', 'SourceGraphic')
    filterItem.setAttribute('stdDeviation', '2') 
    filt.appendChild(filterItem)

    
       
    rad = degree / 180 * Math.PI
    rad_alpha = start / 180 * Math.PI
    rad_beta = (start + degree) / 180 * Math.PI

    if (clockwise == 0) { // 上下反転する＝sin()を＋180°
        clockwise_flg = -1
        counter_c_flg = 1
    } else {  // 左右反転＋上下反転＝sin() cos() ともに反転＝ともに+180
        clockwise_flg = -1
        counter_c_flg = -1
    }
    acos = counter_c_flg * Math.cos(rad_alpha)
    asin = clockwise_flg * Math.sin(rad_alpha)
    bcos = counter_c_flg * Math.cos(rad_beta)
    bsin = clockwise_flg * Math.sin(rad_beta)

    color = '#9C27B0'
    bgcolor = '#311B92'
    bgcolor = '#1A237E'
    
    //p = draw.Path(stroke='none',  stroke_width=0) 
    const [sx, sy] = [frameR * acos, frameR * asin];
    //p.M(sx, sy)
    //p.L(0,0)
    //p.L(frameR*bcos, frameR*bsin)
    //p.A(frameR,frameR,0,degree//180, 1-clockwise, sx, sy)
    //p.Z()
    if (degree < 360) {
        p = createSVGElement('path', {
            'stroke': 'none', 'stroke-width': '0',
            'd': M(sx, sy) + L(0,0) + L(frameR*bcos, frameR*bsin) + A(frameR,(degree>180)?1:0, 1-clockwise, sx, sy) + ' Z'
        });
        if (degree == 0) {
            p.setAttribute('stroke', color); //角度0のときはここで線を引く
            p.setAttribute('stroke-width', 0.5);
        }
    } else {
        p = drawCircle(0, 0, frameR, '', 'none', 0)
    }






    [dcos, dsin] = [counter_c_flg * Math.cos(rad_beta), clockwise_flg * Math.sin(rad_beta)];
    //t_deg = (- degree - start) % 360; //余りの符号が割られる数（左辺）と同じになるので使えない
    // パターン2: Math.floor を使う関数（Pythonの%の挙動を直接再現）
    const pythonMod = (n, m) => n - m * Math.floor(n / m);
    t_deg = pythonMod(- degree - start, 360);

    text_anchor='start'
    dominant_baseline='auto'
    reverse = -1
    if (90 < t_deg && t_deg < 270) {
        reverse = 1
        t_deg += 180
        dominant_baseline = 'hanging'
        if (clockwise == 0){
            text_anchor = "end"
        }
    } else{
        if (clockwise != 0){
            text_anchor = "end"
        }
    }
    
    //degree_text = draw.Text(f'{degree}', mojis, 0, reverse * -mojis / 8 * 9, font_weight = 400,
    //    fill=bgcolor,
    //    transform=f" \
    //    translate({r*dcos} {r*dsin}) \
    //    rotate({counter_c_flg * t_deg})",text_anchor=text_anchor, dominant_baseline=dominant_baseline)
    //function drawText(str, font_size, x, y, text_anchor, font_family, font_weight, dominant_baseline, fill_col, id) {
    degree_text = drawText(`${degree}°`, mojis, 0, reverse * -mojis / 8 * 9, text_anchor, "sans-serif", 400, dominant_baseline, bgcolor, id)
    degree_text.setAttribute('transform', `translate(${round(r*dcos, 2)} ${round(r*dsin, 2)}) rotate(${round(counter_c_flg * t_deg, 2)})`) 


    
    //blur_g = draw.Group(transform=f"translate({0}, {0})",fill=bgcolor, filter=f'url(#{filt.id})')
    blur_g = createSVGElement("g", {
        'transform': `translate(0 0)`,
        'fill': bgcolor,
        'filter': `url(#${filt.getAttribute('id')})`
    });
    blur_g.appendChild(p)




    //top_g = draw.Group(transform=f"translate({-4}, {-4})",fill=color)
    top_g = createSVGElement("g", {
        'fill': color,
        'transform': 'translate(-4 -4)'
    });
    //top_g.appendChild(p) //p はもう追加してあるので、uss を使って参照する
    uuid = getUuid()
    p.setAttribute('id', 'path' + uuid);
    // top_g には <use> 要素を作って a を参照させる
    const useEl = document.createElementNS(SVG_NS, 'use');
    useEl.setAttribute('href', `#path${uuid}`); // 古いブラウザ対応なら 'http://www.w3.org/1999/xlink' の xlink:href
    top_g.appendChild(useEl);

    if (degree >= 360) {
        top_g.append(createSVGElement('path', {
            'fill': 'none',
            'stroke': bgcolor, 'stroke-width': '0.5',
            'd': M(sx, sy) + L(0,0)
        }))
    }



    top_g.appendChild( degree_text )
    
    //root_g = draw.Group(transform=f"translate({0}, {0})")
    root_g = createSVGElement("g", {
        'transform': 'translate(0 0)'
    })
    root_g.appendChild(blur_g)
    root_g.appendChild(top_g)


    // テキストバウンディングボックスを計算する。
    bcos = counter_c_flg * Math.cos((degree+start)/180*Math.PI)
    bsin = clockwise_flg * Math.sin((degree+start)/180*Math.PI)
    vertices = get_transformed_vertices(0, 0, counter_c_flg * 1.5 * mojis, mojis, r * bcos, r * bsin, -counter_c_flg * (degree + start));
    //console.log(vertices[0],vertices[1],vertices[2],vertices[3])
    
    
    
    //root_g.appendChild(draw.Path(d=f'M{vertices[0][0]} {vertices[0][1]} '+
    //    f'L{vertices[1][0]} {vertices[1][1]} {vertices[2][0]} {vertices[2][1]} {vertices[3][0]} {vertices[3][1]} Z',
    //    stroke='red', fill='none'))
    //for v in vertices:
    //    root_g.appendChild(draw.Circle(v[0], v[1], 2, fill='red'))








    // 扇形のセクター（最小座標と、有効幅と高さ）を計算する。
    ;[scx, scy] = sector(start, start + degree);
    //console.log('drawsvg_007_1: ', scx, scy);
    ;[scy[0], scy[1]] = [-scy[1], -scy[0]];
    if (clockwise == 1) {
        ;[scx[0], scx[1]] = [-scx[1], -scx[0]];
    }
    // frameRで正規化したテキストバウンディングボックスを扇形のセクター結果に加える
    vertices.forEach(v => {
        ;[vx, vy] = [v[0], v[1]];
        scx[0] = min(scx[0], vx / frameR);
        scx[1] = max(scx[1], vx / frameR);
        scy[0] = min(scy[0], vy / frameR);
        scy[1] = max(scy[1], vy / frameR);
    });
   
    w = round(frameR * abs(scx[1] - scx[0]), 2)
    h = round(frameR * abs(scy[1] - scy[0]), 2)
    padding = 10
    //d = draw.Drawing(w + 2 * padding, h + 2 * padding, 
    //                 origin = (round(frameR*scx[0]-padding, 2),round(frameR*scy[0]-padding, 2)))

    wd = round(w + 2 * padding, 2);
    ht = round(h + 2 * padding, 2);     
    
    const d = document.createElementNS(SVG_NS, "svg");
    d.setAttribute('id', 'SVG-' + 'drawsvg_007_1'),
    d.setAttribute("xmlns", SVG_NS);
    d.setAttribute("width", `${wd}`);
    d.setAttribute("height", `${ht}`);
    d.setAttribute("viewBox", `${round(frameR * scx[0] - padding, 2)} ${round(frameR * scy[0] - padding, 2)} ${wd} ${ht}`);



    // フィルターを SVG に追加
    //d.append_def(filt)
    defs = createSVGElement("def", {})
    defs.appendChild(filt)
    d.appendChild(defs)
        
    
    d.appendChild(root_g)
    //d.set_pixel_scale(2)  // Set number of pixels per geometry unit

    //d.appendChild(top_g)
    return d
}
/*'''
for deg in range(5,61,5):
    for start in range(0,360,90):
        svg = arc004_1(deg, start, 100, 60, 18, 0)
        display(svg)
        svg = arc004_1(deg, start, 100, 60, 18, 1)
        display(svg)
        break
    //break

'''*/
/*
import random
for _ in range(20):
    deg = random.randint(0, 360)
    start = random.randint(0, 360)
    svg = arc004_1(deg, start, 100, 60, 18, 0)
    display(svg)
    svg = arc004_1(deg, start, 100, 60, 18, 1)
    display(svg)



print(svg.as_svg())
*/