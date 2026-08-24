/*
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="439.72" height="298.48" viewBox="-109.86 -39.24 219.86 149.24">
<defs>
<linearGradient x1="0.2" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox" id="gloss_038da9e7">
<stop offset="0.0" stop-color="white" stop-opacity="0.5" />
<stop offset="0.03" stop-color="white" stop-opacity="0.8" />
<stop offset="0.3" stop-color="white" stop-opacity="0.2" />
<stop offset="0.35" stop-color="white" stop-opacity="0.25" />
<stop offset="0.5" stop-color="white" stop-opacity="0.5" />
<stop offset="0.55" stop-color="white" stop-opacity="0.4" />
<stop offset="1.0" stop-color="white" stop-opacity="0.0" />
</linearGradient>
<linearGradient x1="0.0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox" id="gloss_42b45942">
<stop offset="0.0" stop-color="white" stop-opacity="0.1" />
<stop offset="0.05" stop-color="white" stop-opacity="1.0" />
<stop offset="0.1" stop-color="white" stop-opacity="0.2" />
<stop offset="0.3" stop-color="white" stop-opacity="0.3" />
<stop offset="0.55" stop-color="white" stop-opacity="0.5" />
<stop offset="0.6" stop-color="white" stop-opacity="0.8" />
<stop offset="0.65" stop-color="white" stop-opacity="0.1" />
<stop offset="0.8" stop-color="white" stop-opacity="0.5" />
<stop offset="0.85" stop-color="white" stop-opacity="1.0" />
<stop offset="1.0" stop-color="white" stop-opacity="0.1" />
</linearGradient>
<filter id="drop_c37f6064">
<feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#455A64"></feDropShadow>
</filter>
</defs>
<g stroke="#6A1B9A" fill="#6A1B9A" filter="url(#drop_c37f6064">
<path d="M95.63047559630354,-29.237170472273704 L0,0 L-99.86295347545739,5.233595624294348 A100,100,0,1,0,95.63047559630354,-29.237170472273704 Z" stroke-width="1" stroke-linejoin="round" id="d0" />
</g>
<g transform="translate(0 0)" fill="url(#bump_dc1eee19)">
<use xlink:href="#d0" />
</g>
<g stroke="url(#gloss_42b45942)" fill="none" stroke-opacity="100%" stroke-width="0.8">
<path d="M0.8195823285460363,1.8408120491564408 A4,4,0,0,1,-0.14056066537313686,2.0101111643225944 L-93.57508224827399,6.9068069488557775 A4,4,0,0,0,-97.33874856897472,11.365211261826174 A98,98,0,1,0,95.35563493149657,-22.612007580290964 A4,4,0,0,0,90.29408138070788,-25.51428751923329 Z" id="d1" />
</g>
<g fill="url(#gloss_038da9e7)">
<use xlink:href="#d1" />
</g>
<g>
<text x="0" y="-2.25" font-size="18" fill="#263238" font-weight="200" transform="translate(-59.917772085274436 3.1401573745766087) rotate(357) " text-anchor="end" dominant-baseline="('auto',)" font-family="Georgia">194°</text>
<path d="M-59.917772085274436 3.1401573745766087 L-95.86843533643909 5.024251799322606 -96.6220731063375 -9.356013501143257 -60.67140985517283 -11.240107925889255 Z" stroke="red" fill="none" />
<circle cx="-59.917772085274436" cy="3.1401573745766087" r="2" fill="red" />
<circle cx="-95.86843533643909" cy="5.024251799322606" r="2" fill="red" />
<circle cx="-96.6220731063375" cy="-9.356013501143257" r="2" fill="red" />
<circle cx="-60.67140985517283" cy="-11.240107925889255" r="2" fill="red" />
<path d="M-99.86295347545739 -29.237170472273704 L100.0 -29.237170472273704 100.0 100.0 -99.86295347545739 100.0 Z" stroke="red" fill="none" stroke-width="1" />
</g>
</svg>
*/
//################################################
//# α　βの扇型（半径r）の内部に、m離れて小さな扇形を描く。
//# 小さなの扇形の角を半径nの円で丸める。
//# 小さな扇形と3つの半径n円の接点の座標を求める。接点は6個
//################################################
//import math

function get_p1_prime_alpha(alpha, beta, r, m, n) {
    x0 = alpha - beta
    x1 = 1 / Math.sin(x0)
    x2 = Math.cos(alpha)
    x3 = n * x2
    x4 = Math.cos(x0)
    x5 = Math.sin(alpha)
    x6 = n * x5
    return [-x1 * (m * x2 + m * Math.cos(beta) + x3 * x4 + x3), -x1 * (m * x5 + m * Math.sin(beta) + x4 * x6 + x6)]
}

function get_p1_prime_beta(alpha, beta, r, m, n) {

    x0 = alpha - beta
    x1 = 1 / Math.sin(x0)
    x2 = Math.cos(beta)
    x3 = n * x2
    x4 = Math.cos(x0)
    x5 = Math.sin(beta)
    x6 = n * x5
    return [-x1 * (m * x2 + m * Math.cos(alpha) + x3 * x4 + x3), -x1 * (m * x5 + m * Math.sin(alpha) + x4 * x6 + x6)]
}
//#中心角が180超えたときのP1（外側）からα+m線への垂線の足
function get_p1_prime_alpha_alt(alpha, beta, r, m, n) {
    x0 = alpha - beta
    x1 = 1 / Math.sin(x0)
    x2 = Math.cos(alpha)
    x3 = Math.cos(x0)
    x4 = Math.sin(alpha)
    return [x1 * (-m * x2 - m * Math.cos(beta) + n * x2 * x3 + n * x2), x1 * (-m * x4 - m * Math.sin(beta) + n * x3 * x4 + n * x4)]
}
//#中心角が180超えたときのP1（外側）からβ-m線への垂線の足
function get_p1_prime_beta_alt(alpha, beta, r, m, n) {
    x0 = alpha - beta
    x1 = 1 / Math.sin(x0)
    x2 = Math.cos(beta)
    x3 = Math.cos(x0)
    x4 = Math.sin(beta)
    return [x1 * (-m * x2 - m * Math.cos(alpha) + n * x2 * x3 + n * x2), x1 * (-m * x4 - m * Math.sin(alpha) + n * x3 * x4 + n * x4)]
}

function get_p2_prime_alpha(alpha, beta, r, m, n) {
    x0 = Math.sin(alpha)
    x1 = Math.cos(alpha)
    x2 = Math.sqrt(r)
    x3 = Math.sqrt(-2 * m - 2 * n + r)
    return [-m * x0 + x1 * x2 * x3, m * x1 + x0 * x2 * x3]
}
function get_p2_prime_arc_0_0(alpha, beta, r, m, n) {
    x0 = Math.cos(alpha)
    x1 = Math.sin(alpha)
    x2 = Math.sqrt(r)
    x3 = 2 * m
    x4 = -r
    x5 = Math.sqrt(-2 * n - x3 - x4)
    x6 = x2 * x5
    x7 = (1 / 2) * m ** 4
    x8 = (1 / 2) * r ** 4
    x9 = m ** 3
    x10 = n * x9
    x11 = r ** 3
    x12 = x11 * x3
    x13 = n * x11
    x14 = r ** 2
    x15 = m * n
    x16 = n ** 2
    x17 = m * r * x16
    x18 = m ** 2
    x19 = 3 * x18
    x20 = n * r
    x21 = (1 / 2) * x16
    x22 = x18 * x21
    x23 = x14 * x21
    x24 = 2 * alpha
    x25 = Math.cos(x24)
    x26 = x14 * x25
    x27 = 2 * x18
    x28 = Math.sin(x24)
    x29 = x28 * x5
    x30 = r ** (5 / 2) * x29
    x31 = x28 * x6
    x32 = r ** (3 / 2) * x29
    x33 = Math.sqrt(m * x30 + n * x18 * x31 - n * x3 * x32 + n * x30 - 2 * r * x9 + x10 * x25 + x10 + x12 * x25 - x12 + x13 * x25 - x13 + 3 * x14 * x15 + x14 * x19 - x15 * x26 - x17 * x25 - x17 - x18 * x20 * x25 - x19 * x20 + x22 * x25 + x22 + x23 * x25 + x23 + x25 * x7 - x25 * x8 - x26 * x27 - x27 * x32 + x31 * x9 + x7 + x8) / (m + n + x4)
    return [x33 * (-m * x1 - n * x1 + x0 * x2 * x5) / (m * x0 + n * x0 + x1 * x6), x33]
}
function get_p2_prime_arc_0_1(alpha, beta, r, m, n) {
    x0 = -r
    x1 = m + n + x0
    x2 = Math.sin(alpha)
    x3 = Math.cos(alpha)
    x4 = 2 * m
    x5 = Math.sqrt(-2 * n - x0 - x4)
    x6 = Math.sqrt(r) * x5
    x7 = (1 / 2) * m ** 4
    x8 = (1 / 2) * r ** 4
    x9 = m ** 3
    x10 = n * x9
    x11 = r ** 3
    x12 = x11 * x4
    x13 = n * x11
    x14 = r ** 2
    x15 = m * n
    x16 = n ** 2
    x17 = m * r * x16
    x18 = m ** 2
    x19 = 3 * x18
    x20 = n * r
    x21 = (1 / 2) * x16
    x22 = x18 * x21
    x23 = x14 * x21
    x24 = 2 * alpha
    x25 = Math.cos(x24)
    x26 = x14 * x25
    x27 = 2 * x18
    x28 = Math.sin(x24)
    x29 = x28 * x5
    x30 = r ** (5 / 2) * x29
    x31 = x28 * x6
    x32 = r ** (3 / 2) * x29
    x33 = Math.sqrt(m * x30 + n * x18 * x31 + n * x30 - n * x32 * x4 - 2 * r * x9 + x10 * x25 + x10 + x12 * x25 - x12 + x13 * x25 - x13 + 3 * x14 * x15 + x14 * x19 - x15 * x26 - x17 * x25 - x17 - x18 * x20 * x25 - x19 * x20 + x22 * x25 + x22 + x23 * x25 + x23 + x25 * x7 - x25 * x8 - x26 * x27 - x27 * x32 + x31 * x9 + x7 + x8)
    return [x33 * (m * x2 + n * x2 - x3 * x6) / (x1 * (m * x3 + n * x3 + x2 * x6)), -x33 / x1]

}
function get_p3_prime_beta(alpha, beta, r, m, n) {
    x0 = Math.sin(beta)
    x1 = Math.cos(beta)
    x2 = Math.sqrt(r)
    x3 = Math.sqrt(-2 * m - 2 * n + r)
    return [m * x0 + x1 * x2 * x3, -m * x1 + x0 * x2 * x3]
}

function get_p3_prime_arc_0_0(alpha, beta, r, m, n) {
    x0 = Math.cos(beta)
    x1 = Math.sin(beta)
    x2 = 2 * m
    x3 = -r
    x4 = Math.sqrt(-2 * n - x2 - x3)
    x5 = Math.sqrt(r) * x4
    x6 = (1 / 2) * m ** 4
    x7 = (1 / 2) * r ** 4
    x8 = m ** 3
    x9 = n * x8
    x10 = r ** 3
    x11 = x10 * x2
    x12 = n * x10
    x13 = r ** 2
    x14 = m * n
    x15 = n ** 2
    x16 = m * r * x15
    x17 = m ** 2
    x18 = 3 * x17
    x19 = n * r
    x20 = (1 / 2) * x15
    x21 = x17 * x20
    x22 = x13 * x20
    x23 = 2 * beta
    x24 = Math.cos(x23)
    x25 = x13 * x24
    x26 = 2 * x17
    x27 = Math.sin(x23)
    x28 = x27 * x4
    x29 = r ** (5 / 2) * x28
    x30 = r ** (3 / 2) * x28
    x31 = x27 * x5
    x32 = Math.sqrt(-m * x29 - n * x17 * x31 + n * x2 * x30 - n * x29 - 2 * r * x8 + x11 * x24 - x11 + x12 * x24 - x12 + 3 * x13 * x14 + x13 * x18 - x14 * x25 - x16 * x24 - x16 - x17 * x19 * x24 - x18 * x19 + x21 * x24 + x21 + x22 * x24 + x22 + x24 * x6 - x24 * x7 + x24 * x9 - x25 * x26 + x26 * x30 - x31 * x8 + x6 + x7 + x9) / (m + n + x3)
    return [-x32 * (m * x1 + n * x1 + x0 * x5) / (m * x0 + n * x0 - x1 * x5), x32]
}

function get_p3_prime_arc_0_1(alpha, beta, r, m, n) {
    x0 = -r
    x1 = m + n + x0
    x2 = Math.sin(beta)
    x3 = Math.cos(beta)
    x4 = 2 * m
    x5 = Math.sqrt(-2 * n - x0 - x4)
    x6 = Math.sqrt(r) * x5
    x7 = (1 / 2) * m ** 4
    x8 = (1 / 2) * r ** 4
    x9 = m ** 3
    x10 = n * x9
    x11 = r ** 3
    x12 = x11 * x4
    x13 = n * x11
    x14 = r ** 2
    x15 = m * n
    x16 = n ** 2
    x17 = m * r * x16
    x18 = m ** 2
    x19 = 3 * x18
    x20 = n * r
    x21 = (1 / 2) * x16
    x22 = x18 * x21
    x23 = x14 * x21
    x24 = 2 * beta
    x25 = Math.cos(x24)
    x26 = x14 * x25
    x27 = 2 * x18
    x28 = Math.sin(x24)
    x29 = x28 * x5
    x30 = r ** (5 / 2) * x29
    x31 = r ** (3 / 2) * x29
    x32 = x28 * x6
    x33 = Math.sqrt(-m * x30 - n * x18 * x32 - n * x30 + n * x31 * x4 - 2 * r * x9 + x10 * x25 + x10 + x12 * x25 - x12 + x13 * x25 - x13 + 3 * x14 * x15 + x14 * x19 - x15 * x26 - x17 * x25 - x17 - x18 * x20 * x25 - x19 * x20 + x22 * x25 + x22 + x23 * x25 + x23 + x25 * x7 - x25 * x8 - x26 * x27 + x27 * x31 - x32 * x9 + x7 + x8)
    return [x33 * (m * x2 + n * x2 + x3 * x6) / (x1 * (m * x3 + n * x3 - x2 * x6)), -x33 / x1]
}

function intersection_alpha_m_beta_m(alpha, beta, r, m, n) {
    x0 = Math.cos(alpha)
    x1 = Math.sin(alpha)
    x2 = Math.cos(beta)
    x3 = Math.sin(beta)
    x4 = Math.sin(alpha - beta)
    return [-m * (x0 + x2) / x4, -m * (x1 + x3) / x4]
}



function drawsvg_012_1(degree, frameR) {

    if (degree < 0) {
        clockwise = 1
        degree *= -1
        start = 180
    }


    // フィルター定義
    defs = createSVGElement('defs', {})
    grGlossA = createSVGElement('linearGradient', {
        'gradientUnits': "objectBoundingBox",
        'id': `gloss_${getUuid()}`, 'x1': "20%", 'y1': "0%", 'x2': "0%", 'y2': "100%"
    },
        createSVGElement('stop', { 'offset': "0%", 'stop-color': "white", 'stop-opacity': '40%' }),
        createSVGElement('stop', { 'offset': "3%", 'stop-color': "white", 'stop-opacity': '80%' }),
        //createSVGElement('stop', { 'offset': "30%", 'stop-color': "white", 'stop-opacity': '5%' }),
        createSVGElement('stop', { 'offset': "40%", 'stop-color': "black", 'stop-opacity': '10%' }),
        createSVGElement('stop', { 'offset': "55%", 'stop-color': "white", 'stop-opacity': '40%' }),
        //createSVGElement('stop', { 'offset': "65%", 'stop-color': "white", 'stop-opacity': '30%' }),
        //createSVGElement('stop', { 'offset': "70%", 'stop-color': "white", 'stop-opacity': '20%' }),
        createSVGElement('stop', { 'offset': "100%",'stop-color': "black", 'stop-opacity': '60%' })
    )

    grGlossB = createSVGElement('linearGradient', {
        'gradientUnits': "objectBoundingBox",
        'id': `gloss_${getUuid()}`, 'x1': "0%", 'y1': "0%", 'x2': "0%", 'y2': "100%"
    },
        createSVGElement('stop', { 'offset': "0%", 'stop-color': "white", 'stop-opacity': '10%' }),
        createSVGElement('stop', { 'offset': "5%", 'stop-color': "white", 'stop-opacity': '100%' }),
        createSVGElement('stop', { 'offset': "10%", 'stop-color': "white", 'stop-opacity': '20%' }),
        createSVGElement('stop', { 'offset': "30%", 'stop-color': "white", 'stop-opacity': '30%' }),
        createSVGElement('stop', { 'offset': "55%", 'stop-color': "white", 'stop-opacity': '50%' }),
        createSVGElement('stop', { 'offset': "60%", 'stop-color': "white", 'stop-opacity': '80%' }),
        createSVGElement('stop', { 'offset': "65%", 'stop-color': "white", 'stop-opacity': '10%' }),
        createSVGElement('stop', { 'offset': "80%", 'stop-color': "white", 'stop-opacity': '50%' }),
        createSVGElement('stop', { 'offset': "85%", 'stop-color': "white", 'stop-opacity': '100%' }),
        createSVGElement('stop', { 'offset': "100%", 'stop-color': "white", 'stop-opacity': '10%' })
    )
    filterDrop = createSVGElement('filter', {
        'id': `drop_${getUuid()}`
    },
        createSVGElement('feDropShadow', { 'dx': "2", 'dy': "2", 'stdDeviation': "3", 'flood-color': "455A64", 'flood-opacity': "100%" })
    )
    defs.append(grGlossA, grGlossB, filterDrop)


    //# α、β 角に回転済みの扇形を生成する。
    color = '#9C27B0'
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
    acos = counter_c_flg * Math.cos(rad_alpha)
    asin = clockwise_flg * Math.sin(rad_alpha)
    bcos = counter_c_flg * Math.cos(rad_beta)
    bsin = clockwise_flg * Math.sin(rad_beta);

    [sx, sy] = [frameR * acos, frameR * asin];
    if (degree < 360) {
        p = createSVGElement('path', {
        'stroke-width': '1', 'stroke-linejoin': 'round',
        'd': M(sx, sy) + L(0, 0) + L(frameR * bcos, frameR * bsin) +
            A(frameR, (degree > 180) ? 1 : 0, 1 - clockwise, sx, sy) + ' Z'
        })

    }
    else if (degree >= 360) {
        p = createSVGElement('circle', {
            'cx': `${0}`, 'cy': `${0}`, 'r': `${frameR}`, 'stroke-width': `${1}`
        })
    }

    g_drop = createSVGElement('g', {
        'stroke': color, 'fill': color, 'filter': `url(#${filterDrop.getAttribute('id')}`
    }, p);

    /** この g はいらないのではないか？
    uuid = getUuid()
    p.setAttribute('id', 'path' + uuid);
    // g には <use> 要素を作って a を参照させる
    const useEl = document.createElementNS(SVG_NS, 'use');
    useEl.setAttribute('href', `#path${uuid}`); // 古いブラウザ対応なら 'http://www.w3.org/1999/xlink' の xlink:href
    g = createSVGElement('g', {'fill':'none'}, useEl)
    */




     /*#####################################################################
    # α、β 角に回転済みの内側扇形を生成する。 rotate({start})　を使用しない。20260630
    #####################################################################*/
    degA = start / 180 * Math.PI // 扇型のα角度
    B = (start + degree) / 180 * Math.PI // 扇型のβ角度
    R = frameR // 扇型の半径
    Mpx = 2 // 外枠を小さくするピクセル数
    N = 4 // 小さくした内枠の角の丸め半径

    //■ P1　中心に近い半円の端点　P2　α線と弧の近くの半円の端点、 p3 ベータ線の半円
    p1a = get_p1_prime_alpha(degA, B, R, Mpx, N)
    p1b = get_p1_prime_beta(degA, B, R, Mpx, N)
    p2alpha = get_p2_prime_alpha(degA, B, R, Mpx, N)

    // P2から-m円への垂線の足を求める
    // P2はalpha-m-n線と-m-n円の交点なので２つある。そのうち[0]を採用する。
    // P2から-m円への垂線の足は2つある。P2と垂線の足の短い方を採用。
    // get_p2_prime_arc_0_0()　get_p2_prime_arc_0_1() から得た座標から、
    // p2alphaに近い方を選ぶ
    p2arc_0 = get_p2_prime_arc_0_0(degA, B, R, Mpx, N)
    p2arc_1 = get_p2_prime_arc_0_1(degA, B, R, Mpx, N)
    if ((p2arc_0[0] - p2alpha[0]) ** 2 + (p2arc_0[1] - p2alpha[1]) ** 2 < (p2arc_1[0] - p2alpha[0]) ** 2 + (p2arc_1[1] - p2alpha[1]) ** 2) {
        p2arc = p2arc_0
    }
    else {
        p2arc = p2arc_1
    }

    p3beta = get_p3_prime_beta(degA, B, R, Mpx, N)
    // P3から-m円への垂線の足を求める
    // P3はbeta-m-n線と-m-n円の交点なので２つある。そのうち[0]を採用する。
    // P3から-m円への垂線の足は2つある。P3と垂線の足の間に原点がない短い方を採用。
    // get_p3_prime_arc_0_0()　get_p3_prime_arc_0_1() から得た座標から、
    // p3betaに近い方を選ぶ
    p3arc_0 = get_p3_prime_arc_0_1(degA, B, R, Mpx, N)
    p3arc_1 = get_p3_prime_arc_0_0(degA, B, R, Mpx, N)
    if ((p3arc_0[0] - p3beta[0]) ** 2 + (p3arc_0[1] - p3beta[1]) ** 2 < (p3arc_1[0] - p3beta[0]) ** 2 + (p3arc_1[1] - p3beta[1]) ** 2) {
        p3arc = p3arc_0
    }
    else {
        p3arc = p3arc_1
    }

    p1a_alt = p1b_alt = [0, 0]
    // 180度超えた場合は中心角の角丸の中心が外側に出る
    if (degree > 180) {
        p1a_alt = get_p1_prime_alpha_alt(degA, B, R, Mpx, N)
        p1b_alt = get_p1_prime_beta_alt(degA, B, R, Mpx, N)
    }
    // 中心角が小さいときは、中心角の角丸をやめて、交点にする。
    p1_inter = intersection_alpha_m_beta_m(degA, B, R, Mpx, N);

    // 半時計回り、時計回りで、x座標が反転する。y座標は全体的に上下反転。
    //for (xy in [p1_inter, p1a, p1b, p1a_alt, p1b_alt, p3beta, p3arc, p2arc, p2alpha]) {
    [p1_inter, p1a, p1b, p1a_alt, p1b_alt, p3beta, p3arc, p2arc, p2alpha].forEach(xy => {
        xy[0] *= counter_c_flg
        xy[1] *= clockwise_flg
    });

    if (degree < 360) {

        p_inner = createSVGElement('path', {})


        if (degree < 8) {
            p_inner.setAttribute('d', M(0, 0))
        } else if (degree <= 60) {
            p_inner.setAttribute('d', M(p1_inter[0], p1_inter[1]))
        } else if (degree <= 180) {
            p_inner.setAttribute('d', M(p1a[0], p1a[1]) +
                A(N, 0, 1 - clockwise, p1b[0], p1b[1]))
        } else if (degree <= 351) {
            p_inner.setAttribute('d', M(p1a_alt[0], p1a_alt[1]) +
                A(N, 0, clockwise, p1b_alt[0], p1b_alt[1]))
        } else {
            p_inner.setAttribute('d', M(0, 0))
        }
        p_inner.setAttribute('d', p_inner.getAttribute('d') +
            L(p3beta[0], p3beta[1]) +
            A(N, 0, 1 - clockwise, p3arc[0], p3arc[1]) +
            A(R - Mpx, (degree > 180) ? 1 : 0, 1 - clockwise, p2arc[0], p2arc[1]) +
            A(N, 0, 1 - clockwise, p2alpha[0], p2alpha[1]) + ' Z'
        )

    }
    if (degree >= 360) {
        p_inner = createSVGElement('circle', {
            'cx': `${0}`, 'cy': `${0}`, 'r': `${frameR - Mpx}`
        })
    }

    // 輝いている平面に内側の輪郭をいれると内側表面が反射する
    g_inner = createSVGElement('g', {
        'fill': `url(#${grGlossA.getAttribute('id')})`
    }, p_inner)

    //p_inner は一度追加してあるので、2度目は use を使って参照する
    uuid_p_inner = getUuid()
    p_inner.setAttribute('id', 'path' + uuid_p_inner);
    // g には <use> 要素を作って a を参照させる
    const useEl_p_inner = document.createElementNS(SVG_NS, 'use');
    useEl_p_inner.setAttribute('href', `#path${uuid_p_inner}`); // 古いブラウザ対応なら 'http://www.w3.org/1999/xlink' の xlink:href
    // 輝いているエッジに内側の輪郭をいれる
    g_edge_gloss = createSVGElement('g', {
        'stroke': `url(#${grGlossB.getAttribute('id')})`, 'fill': 'none', 'stroke-opacity': "100%", 'stroke-width': "1.5"
    }, useEl_p_inner)
    if (degree >= 360) {
        g_edge_gloss.append(drawLine(0,0,sx, sy+1, 1.5))
    }



    // テキストを配置
    moji_color = '#263238'
    dominant_baseline = 'auto'

    const pythonMod = (n, m) => n - m * Math.floor(n / m);
    t_deg = pythonMod(degree + start, 360);
    if (90 < t_deg && t_deg < 270) {
        rotangle = (-1 + 2 * clockwise) * (degree + start) - 180
        dominant_baseline = 'hanging'
        text_anchor = 'start'
        if (clockwise == 0) { text_anchor = 'end' }
    } else {
        rotangle = (-1 + 2 * clockwise) * (degree + start)
        text_anchor = 'end'
        if (clockwise == 0) { text_anchor = 'start' }
    }

    text = drawText(`${degree}°`, mojis, 0, -mojis / 8,
        text_anchor, 'sans-serif', 600, dominant_baseline, moji_color, 'degree')
    text.setAttribute('transform', `translate(${r * bcos} ${r * bsin}) rotate(${rotangle}) `)
    root_g = createSVGElement('g', {}, text)






    //# テキストバウンディングボックスを計算する。
    boucos = bcos
    bousin = bsin
    vertices = get_transformed_vertices(0, 0, (1 - 2 * clockwise) * (2 * mojis), -mojis * 0.8, (r) * boucos, (r) * bousin, (-1 + 2 * clockwise) * (degree + start))

    root_g.append(createSVGElement('path', {
        'stroke': 'red', 'fill': 'none',
        'd': M(vertices[0][0], vertices[0][1]) +
            LL(vertices[1][0], vertices[1][1], vertices[2][0], vertices[2][1]) + L(vertices[3][0], vertices[3][1]) + ' Z'
    }));
    vertices.forEach(v => {
        root_g.append(drawCircle(v[0], v[1], 2, 'red'))
    });

    //# 扇形のセクター（最小座標と、有効幅と高さ）を計算する。結果は上下反転させたあとの座標をframeRで正規化してある。
    ;[scx, scy] = sector(start, start + degree);
    ;[scy[0], scy[1]] = [-scy[1], -scy[0]];
    if (clockwise == 1) {
        ;[scx[0], scx[1]] = [-scx[1], -scx[0]];
    }

    //# frameRで正規化したテキストバウンディングボックスを扇形のセクター結果に加える
    vertices.forEach(v => {
        ;[vx, vy] = [v[0], v[1]];
        scx[0] = min(scx[0], vx / frameR)
        scx[1] = max(scx[1], vx / frameR)
        scy[0] = min(scy[0], vy / frameR)
        scy[1] = max(scy[1], vy / frameR)
    });
    root_g.append(createSVGElement('path', {
        'stroke': 'red', 'fill': 'none', 'stroke-width': '1',
        'd': M(frameR * scx[0], frameR * scy[0]) +
            LL(frameR * scx[1], frameR * scy[0], frameR * scx[1], frameR * scy[1]) + L(frameR * scx[0], frameR * scy[1]) + ' Z'
    }));

    w = round(frameR * abs(scx[1] - scx[0]), 2)
    h = round(frameR * abs(scy[1] - scy[0]), 2)
    padding = 10

    wd = round(w + 2 * padding, 2);
    ht = round(h + 2 * padding, 2);     

    const d = document.createElementNS(SVG_NS, "svg");
    d.setAttribute('id', 'SVG-' + 'drawsvg_012_1'),
    d.setAttribute("xmlns", SVG_NS);
    d.setAttribute("width", `${wd}`);
    d.setAttribute("height", `${ht}`);
    d.setAttribute("viewBox", `${round(frameR * scx[0] - padding, 2)} ${round(frameR * scy[0] - padding, 2)} ${wd} ${ht}`);


    d.append(g_drop)

    //d.append(g)     //** この g はいらないのではないか？

    d.append(g_edge_gloss)
    d.append(g_inner)
    d.append(root_g) //# 文字レイヤー

    // defs に追加
    d.append(defs)
    //d.set_pixel_scale(2)  # Set number of pixels per geometry unit

    return d









}