! function(e, t) { "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).Popper = {}) }(this, (function(e) {
    "use strict";

    function t(e) { if (null == e) return window; if ("[object Window]" !== e.toString()) { var t = e.ownerDocument; return t && t.defaultView || window } return e }

    function s(e) { return e instanceof t(e).Element || e instanceof Element }

    function i(e) { return e instanceof t(e).HTMLElement || e instanceof HTMLElement }

    function n(e) { return "undefined" != typeof ShadowRoot && (e instanceof t(e).ShadowRoot || e instanceof ShadowRoot) }
    var r = Math.max,
        a = Math.min,
        o = Math.round;

    function l() { var e = navigator.userAgentData; return null != e && e.brands && Array.isArray(e.brands) ? e.brands.map((function(e) { return e.brand + "/" + e.version })).join(" ") : navigator.userAgent }

    function c() { return !/^((?!chrome|android).)*safari/i.test(l()) }

    function d(e, n, r) {
        void 0 === n && (n = !1), void 0 === r && (r = !1);
        var a = e.getBoundingClientRect(),
            l = 1,
            d = 1;
        n && i(e) && (l = e.offsetWidth > 0 && o(a.width) / e.offsetWidth || 1, d = e.offsetHeight > 0 && o(a.height) / e.offsetHeight || 1);
        var u = (s(e) ? t(e) : window).visualViewport,
            p = !c() && r,
            h = (a.left + (p && u ? u.offsetLeft : 0)) / l,
            f = (a.top + (p && u ? u.offsetTop : 0)) / d,
            m = a.width / l,
            g = a.height / d;
        return { width: m, height: g, top: f, right: h + m, bottom: f + g, left: h, x: h, y: f }
    }

    function u(e) { var s = t(e); return { scrollLeft: s.pageXOffset, scrollTop: s.pageYOffset } }

    function p(e) { return e ? (e.nodeName || "").toLowerCase() : null }

    function h(e) { return ((s(e) ? e.ownerDocument : e.document) || window.document).documentElement }

    function f(e) { return d(h(e)).left + u(e).scrollLeft }

    function m(e) { return t(e).getComputedStyle(e) }

    function g(e) {
        var t = m(e),
            s = t.overflow,
            i = t.overflowX,
            n = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(s + n + i)
    }

    function v(e, s, n) {
        void 0 === n && (n = !1);
        var r, a, l = i(s),
            c = i(s) && function(e) {
                var t = e.getBoundingClientRect(),
                    s = o(t.width) / e.offsetWidth || 1,
                    i = o(t.height) / e.offsetHeight || 1;
                return 1 !== s || 1 !== i
            }(s),
            m = h(s),
            v = d(e, c, n),
            b = { scrollLeft: 0, scrollTop: 0 },
            y = { x: 0, y: 0 };
        return (l || !l && !n) && (("body" !== p(s) || g(m)) && (b = (r = s) !== t(r) && i(r) ? { scrollLeft: (a = r).scrollLeft, scrollTop: a.scrollTop } : u(r)), i(s) ? ((y = d(s, !0)).x += s.clientLeft, y.y += s.clientTop) : m && (y.x = f(m))), { x: v.left + b.scrollLeft - y.x, y: v.top + b.scrollTop - y.y, width: v.width, height: v.height }
    }

    function b(e) {
        var t = d(e),
            s = e.offsetWidth,
            i = e.offsetHeight;
        return Math.abs(t.width - s) <= 1 && (s = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), { x: e.offsetLeft, y: e.offsetTop, width: s, height: i }
    }

    function y(e) { return "html" === p(e) ? e : e.assignedSlot || e.parentNode || (n(e) ? e.host : null) || h(e) }

    function w(e) { return ["html", "body", "#document"].indexOf(p(e)) >= 0 ? e.ownerDocument.body : i(e) && g(e) ? e : w(y(e)) }

    function x(e, s) {
        var i;
        void 0 === s && (s = []);
        var n = w(e),
            r = n === (null == (i = e.ownerDocument) ? void 0 : i.body),
            a = t(n),
            o = r ? [a].concat(a.visualViewport || [], g(n) ? n : []) : n,
            l = s.concat(o);
        return r ? l : l.concat(x(y(o)))
    }

    function _(e) { return ["table", "td", "th"].indexOf(p(e)) >= 0 }

    function E(e) { return i(e) && "fixed" !== m(e).position ? e.offsetParent : null }

    function T(e) {
        for (var s = t(e), r = E(e); r && _(r) && "static" === m(r).position;) r = E(r);
        return r && ("html" === p(r) || "body" === p(r) && "static" === m(r).position) ? s : r || function(e) {
            var t = /firefox/i.test(l());
            if (/Trident/i.test(l()) && i(e) && "fixed" === m(e).position) return null;
            var s = y(e);
            for (n(s) && (s = s.host); i(s) && ["html", "body"].indexOf(p(s)) < 0;) {
                var r = m(s);
                if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || t && "filter" === r.willChange || t && r.filter && "none" !== r.filter) return s;
                s = s.parentNode
            }
            return null
        }(e) || s
    }
    var C = "top",
        S = "bottom",
        M = "right",
        k = "left",
        A = "auto",
        P = [C, S, M, k],
        O = "start",
        L = "end",
        $ = "viewport",
        I = "popper",
        z = P.reduce((function(e, t) { return e.concat([t + "-" + O, t + "-" + L]) }), []),
        D = [].concat(P, [A]).reduce((function(e, t) { return e.concat([t, t + "-" + O, t + "-" + L]) }), []),
        N = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

    function j(e) {
        var t = new Map,
            s = new Set,
            i = [];
        return e.forEach((function(e) { t.set(e.name, e) })), e.forEach((function(e) {
            s.has(e.name) || function e(n) {
                s.add(n.name), [].concat(n.requires || [], n.requiresIfExists || []).forEach((function(i) {
                    if (!s.has(i)) {
                        var n = t.get(i);
                        n && e(n)
                    }
                })), i.push(n)
            }(e)
        })), i
    }

    function H(e) { return e.split("-")[0] }

    function F(e, t) {
        var s = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (s && n(s)) {
            var i = t;
            do {
                if (i && e.isSameNode(i)) return !0;
                i = i.parentNode || i.host
            } while (i)
        }
        return !1
    }

    function B(e) { return Object.assign({}, e, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height }) }

    function W(e, i, n) {
        return i === $ ? B(function(e, s) {
            var i = t(e),
                n = h(e),
                r = i.visualViewport,
                a = n.clientWidth,
                o = n.clientHeight,
                l = 0,
                d = 0;
            if (r) {
                a = r.width, o = r.height;
                var u = c();
                (u || !u && "fixed" === s) && (l = r.offsetLeft, d = r.offsetTop)
            }
            return { width: a, height: o, x: l + f(e), y: d }
        }(e, n)) : s(i) ? function(e, t) { var s = d(e, !1, "fixed" === t); return s.top = s.top + e.clientTop, s.left = s.left + e.clientLeft, s.bottom = s.top + e.clientHeight, s.right = s.left + e.clientWidth, s.width = e.clientWidth, s.height = e.clientHeight, s.x = s.left, s.y = s.top, s }(i, n) : B(function(e) {
            var t, s = h(e),
                i = u(e),
                n = null == (t = e.ownerDocument) ? void 0 : t.body,
                a = r(s.scrollWidth, s.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0),
                o = r(s.scrollHeight, s.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0),
                l = -i.scrollLeft + f(e),
                c = -i.scrollTop;
            return "rtl" === m(n || s).direction && (l += r(s.clientWidth, n ? n.clientWidth : 0) - a), { width: a, height: o, x: l, y: c }
        }(h(e)))
    }

    function q(e, t, n, o) {
        var l = "clippingParents" === t ? function(e) {
                var t = x(y(e)),
                    n = ["absolute", "fixed"].indexOf(m(e).position) >= 0 && i(e) ? T(e) : e;
                return s(n) ? t.filter((function(e) { return s(e) && F(e, n) && "body" !== p(e) })) : []
            }(e) : [].concat(t),
            c = [].concat(l, [n]),
            d = c[0],
            u = c.reduce((function(t, s) { var i = W(e, s, o); return t.top = r(i.top, t.top), t.right = a(i.right, t.right), t.bottom = a(i.bottom, t.bottom), t.left = r(i.left, t.left), t }), W(e, d, o));
        return u.width = u.right - u.left, u.height = u.bottom - u.top, u.x = u.left, u.y = u.top, u
    }

    function R(e) { return e.split("-")[1] }

    function V(e) { return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y" }

    function X(e) {
        var t, s = e.reference,
            i = e.element,
            n = e.placement,
            r = n ? H(n) : null,
            a = n ? R(n) : null,
            o = s.x + s.width / 2 - i.width / 2,
            l = s.y + s.height / 2 - i.height / 2;
        switch (r) {
            case C:
                t = { x: o, y: s.y - i.height };
                break;
            case S:
                t = { x: o, y: s.y + s.height };
                break;
            case M:
                t = { x: s.x + s.width, y: l };
                break;
            case k:
                t = { x: s.x - i.width, y: l };
                break;
            default:
                t = { x: s.x, y: s.y }
        }
        var c = r ? V(r) : null;
        if (null != c) {
            var d = "y" === c ? "height" : "width";
            switch (a) {
                case O:
                    t[c] = t[c] - (s[d] / 2 - i[d] / 2);
                    break;
                case L:
                    t[c] = t[c] + (s[d] / 2 - i[d] / 2)
            }
        }
        return t
    }

    function Y(e) { return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e) }

    function G(e, t) { return t.reduce((function(t, s) { return t[s] = e, t }), {}) }

    function U(e, t) {
        void 0 === t && (t = {});
        var i = t,
            n = i.placement,
            r = void 0 === n ? e.placement : n,
            a = i.strategy,
            o = void 0 === a ? e.strategy : a,
            l = i.boundary,
            c = void 0 === l ? "clippingParents" : l,
            u = i.rootBoundary,
            p = void 0 === u ? $ : u,
            f = i.elementContext,
            m = void 0 === f ? I : f,
            g = i.altBoundary,
            v = void 0 !== g && g,
            b = i.padding,
            y = void 0 === b ? 0 : b,
            w = Y("number" != typeof y ? y : G(y, P)),
            x = m === I ? "reference" : I,
            _ = e.rects.popper,
            E = e.elements[v ? x : m],
            T = q(s(E) ? E : E.contextElement || h(e.elements.popper), c, p, o),
            k = d(e.elements.reference),
            A = X({ reference: k, element: _, strategy: "absolute", placement: r }),
            O = B(Object.assign({}, _, A)),
            L = m === I ? O : k,
            z = { top: T.top - L.top + w.top, bottom: L.bottom - T.bottom + w.bottom, left: T.left - L.left + w.left, right: L.right - T.right + w.right },
            D = e.modifiersData.offset;
        if (m === I && D) {
            var N = D[r];
            Object.keys(z).forEach((function(e) {
                var t = [M, S].indexOf(e) >= 0 ? 1 : -1,
                    s = [C, S].indexOf(e) >= 0 ? "y" : "x";
                z[e] += N[s] * t
            }))
        }
        return z
    }
    var K = { placement: "bottom", modifiers: [], strategy: "absolute" };

    function Q() { for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s]; return !t.some((function(e) { return !(e && "function" == typeof e.getBoundingClientRect) })) }

    function Z(e) {
        void 0 === e && (e = {});
        var t = e,
            i = t.defaultModifiers,
            n = void 0 === i ? [] : i,
            r = t.defaultOptions,
            a = void 0 === r ? K : r;
        return function(e, t, i) {
            void 0 === i && (i = a);
            var r, o, l = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, K, a), modifiersData: {}, elements: { reference: e, popper: t }, attributes: {}, styles: {} },
                c = [],
                d = !1,
                u = {
                    state: l,
                    setOptions: function(i) {
                        var r = "function" == typeof i ? i(l.options) : i;
                        p(), l.options = Object.assign({}, a, l.options, r), l.scrollParents = { reference: s(e) ? x(e) : e.contextElement ? x(e.contextElement) : [], popper: x(t) };
                        var o, d, h = function(e) { var t = j(e); return N.reduce((function(e, s) { return e.concat(t.filter((function(e) { return e.phase === s }))) }), []) }((o = [].concat(n, l.options.modifiers), d = o.reduce((function(e, t) { var s = e[t.name]; return e[t.name] = s ? Object.assign({}, s, t, { options: Object.assign({}, s.options, t.options), data: Object.assign({}, s.data, t.data) }) : t, e }), {}), Object.keys(d).map((function(e) { return d[e] }))));
                        return l.orderedModifiers = h.filter((function(e) { return e.enabled })), l.orderedModifiers.forEach((function(e) {
                            var t = e.name,
                                s = e.options,
                                i = void 0 === s ? {} : s,
                                n = e.effect;
                            if ("function" == typeof n) {
                                var r = n({ state: l, name: t, instance: u, options: i });
                                c.push(r || function() {})
                            }
                        })), u.update()
                    },
                    forceUpdate: function() {
                        if (!d) {
                            var e = l.elements,
                                t = e.reference,
                                s = e.popper;
                            if (Q(t, s)) {
                                l.rects = { reference: v(t, T(s), "fixed" === l.options.strategy), popper: b(s) }, l.reset = !1, l.placement = l.options.placement, l.orderedModifiers.forEach((function(e) { return l.modifiersData[e.name] = Object.assign({}, e.data) }));
                                for (var i = 0; i < l.orderedModifiers.length; i++)
                                    if (!0 !== l.reset) {
                                        var n = l.orderedModifiers[i],
                                            r = n.fn,
                                            a = n.options,
                                            o = void 0 === a ? {} : a,
                                            c = n.name;
                                        "function" == typeof r && (l = r({ state: l, options: o, name: c, instance: u }) || l)
                                    } else l.reset = !1, i = -1
                            }
                        }
                    },
                    update: (r = function() { return new Promise((function(e) { u.forceUpdate(), e(l) })) }, function() { return o || (o = new Promise((function(e) { Promise.resolve().then((function() { o = void 0, e(r()) })) }))), o }),
                    destroy: function() { p(), d = !0 }
                };
            if (!Q(e, t)) return u;

            function p() { c.forEach((function(e) { return e() })), c = [] }
            return u.setOptions(i).then((function(e) {!d && i.onFirstUpdate && i.onFirstUpdate(e) })), u
        }
    }
    var J = { passive: !0 },
        ee = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(e) {
                var s = e.state,
                    i = e.instance,
                    n = e.options,
                    r = n.scroll,
                    a = void 0 === r || r,
                    o = n.resize,
                    l = void 0 === o || o,
                    c = t(s.elements.popper),
                    d = [].concat(s.scrollParents.reference, s.scrollParents.popper);
                return a && d.forEach((function(e) { e.addEventListener("scroll", i.update, J) })), l && c.addEventListener("resize", i.update, J),
                    function() { a && d.forEach((function(e) { e.removeEventListener("scroll", i.update, J) })), l && c.removeEventListener("resize", i.update, J) }
            },
            data: {}
        },
        te = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(e) {
                var t = e.state,
                    s = e.name;
                t.modifiersData[s] = X({ reference: t.rects.reference, element: t.rects.popper, strategy: "absolute", placement: t.placement })
            },
            data: {}
        },
        se = { top: "auto", right: "auto", bottom: "auto", left: "auto" };

    function ie(e) {
        var s, i = e.popper,
            n = e.popperRect,
            r = e.placement,
            a = e.variation,
            l = e.offsets,
            c = e.position,
            d = e.gpuAcceleration,
            u = e.adaptive,
            p = e.roundOffsets,
            f = e.isFixed,
            g = l.x,
            v = void 0 === g ? 0 : g,
            b = l.y,
            y = void 0 === b ? 0 : b,
            w = "function" == typeof p ? p({ x: v, y: y }) : { x: v, y: y };
        v = w.x, y = w.y;
        var x = l.hasOwnProperty("x"),
            _ = l.hasOwnProperty("y"),
            E = k,
            A = C,
            P = window;
        if (u) {
            var O = T(i),
                $ = "clientHeight",
                I = "clientWidth";
            O === t(i) && "static" !== m(O = h(i)).position && "absolute" === c && ($ = "scrollHeight", I = "scrollWidth"), O = O, (r === C || (r === k || r === M) && a === L) && (A = S, y -= (f && O === P && P.visualViewport ? P.visualViewport.height : O[$]) - n.height, y *= d ? 1 : -1), r !== k && (r !== C && r !== S || a !== L) || (E = M, v -= (f && O === P && P.visualViewport ? P.visualViewport.width : O[I]) - n.width, v *= d ? 1 : -1)
        }
        var z, D = Object.assign({ position: c }, u && se),
            N = !0 === p ? function(e, t) {
                var s = e.x,
                    i = e.y,
                    n = t.devicePixelRatio || 1;
                return { x: o(s * n) / n || 0, y: o(i * n) / n || 0 }
            }({ x: v, y: y }, t(i)) : { x: v, y: y };
        return v = N.x, y = N.y, d ? Object.assign({}, D, ((z = {})[A] = _ ? "0" : "", z[E] = x ? "0" : "", z.transform = (P.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + y + "px)" : "translate3d(" + v + "px, " + y + "px, 0)", z)) : Object.assign({}, D, ((s = {})[A] = _ ? y + "px" : "", s[E] = x ? v + "px" : "", s.transform = "", s))
    }
    var ne = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function(e) {
                var t = e.state,
                    s = e.options,
                    i = s.gpuAcceleration,
                    n = void 0 === i || i,
                    r = s.adaptive,
                    a = void 0 === r || r,
                    o = s.roundOffsets,
                    l = void 0 === o || o,
                    c = { placement: H(t.placement), variation: R(t.placement), popper: t.elements.popper, popperRect: t.rects.popper, gpuAcceleration: n, isFixed: "fixed" === t.options.strategy };
                null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, ie(Object.assign({}, c, { offsets: t.modifiersData.popperOffsets, position: t.options.strategy, adaptive: a, roundOffsets: l })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, ie(Object.assign({}, c, { offsets: t.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: l })))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement })
            },
            data: {}
        },
        re = {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function(e) {
                var t = e.state;
                Object.keys(t.elements).forEach((function(e) {
                    var s = t.styles[e] || {},
                        n = t.attributes[e] || {},
                        r = t.elements[e];
                    i(r) && p(r) && (Object.assign(r.style, s), Object.keys(n).forEach((function(e) { var t = n[e];!1 === t ? r.removeAttribute(e) : r.setAttribute(e, !0 === t ? "" : t) })))
                }))
            },
            effect: function(e) {
                var t = e.state,
                    s = { popper: { position: t.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
                return Object.assign(t.elements.popper.style, s.popper), t.styles = s, t.elements.arrow && Object.assign(t.elements.arrow.style, s.arrow),
                    function() {
                        Object.keys(t.elements).forEach((function(e) {
                            var n = t.elements[e],
                                r = t.attributes[e] || {},
                                a = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : s[e]).reduce((function(e, t) { return e[t] = "", e }), {});
                            i(n) && p(n) && (Object.assign(n.style, a), Object.keys(r).forEach((function(e) { n.removeAttribute(e) })))
                        }))
                    }
            },
            requires: ["computeStyles"]
        },
        ae = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(e) {
                var t = e.state,
                    s = e.options,
                    i = e.name,
                    n = s.offset,
                    r = void 0 === n ? [0, 0] : n,
                    a = D.reduce((function(e, s) {
                        return e[s] = function(e, t, s) {
                            var i = H(e),
                                n = [k, C].indexOf(i) >= 0 ? -1 : 1,
                                r = "function" == typeof s ? s(Object.assign({}, t, { placement: e })) : s,
                                a = r[0],
                                o = r[1];
                            return a = a || 0, o = (o || 0) * n, [k, M].indexOf(i) >= 0 ? { x: o, y: a } : { x: a, y: o }
                        }(s, t.rects, r), e
                    }), {}),
                    o = a[t.placement],
                    l = o.x,
                    c = o.y;
                null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += c), t.modifiersData[i] = a
            }
        },
        oe = { left: "right", right: "left", bottom: "top", top: "bottom" };

    function le(e) { return e.replace(/left|right|bottom|top/g, (function(e) { return oe[e] })) }
    var ce = { start: "end", end: "start" };

    function de(e) { return e.replace(/start|end/g, (function(e) { return ce[e] })) }

    function ue(e, t) {
        void 0 === t && (t = {});
        var s = t,
            i = s.placement,
            n = s.boundary,
            r = s.rootBoundary,
            a = s.padding,
            o = s.flipVariations,
            l = s.allowedAutoPlacements,
            c = void 0 === l ? D : l,
            d = R(i),
            u = d ? o ? z : z.filter((function(e) { return R(e) === d })) : P,
            p = u.filter((function(e) { return c.indexOf(e) >= 0 }));
        0 === p.length && (p = u);
        var h = p.reduce((function(t, s) { return t[s] = U(e, { placement: s, boundary: n, rootBoundary: r, padding: a })[H(s)], t }), {});
        return Object.keys(h).sort((function(e, t) { return h[e] - h[t] }))
    }
    var pe = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state,
                s = e.options,
                i = e.name;
            if (!t.modifiersData[i]._skip) {
                for (var n = s.mainAxis, r = void 0 === n || n, a = s.altAxis, o = void 0 === a || a, l = s.fallbackPlacements, c = s.padding, d = s.boundary, u = s.rootBoundary, p = s.altBoundary, h = s.flipVariations, f = void 0 === h || h, m = s.allowedAutoPlacements, g = t.options.placement, v = H(g), b = l || (v !== g && f ? function(e) { if (H(e) === A) return []; var t = le(e); return [de(e), t, de(t)] }(g) : [le(g)]), y = [g].concat(b).reduce((function(e, s) { return e.concat(H(s) === A ? ue(t, { placement: s, boundary: d, rootBoundary: u, padding: c, flipVariations: f, allowedAutoPlacements: m }) : s) }), []), w = t.rects.reference, x = t.rects.popper, _ = new Map, E = !0, T = y[0], P = 0; P < y.length; P++) {
                    var L = y[P],
                        $ = H(L),
                        I = R(L) === O,
                        z = [C, S].indexOf($) >= 0,
                        D = z ? "width" : "height",
                        N = U(t, { placement: L, boundary: d, rootBoundary: u, altBoundary: p, padding: c }),
                        j = z ? I ? M : k : I ? S : C;
                    w[D] > x[D] && (j = le(j));
                    var F = le(j),
                        B = [];
                    if (r && B.push(N[$] <= 0), o && B.push(N[j] <= 0, N[F] <= 0), B.every((function(e) { return e }))) { T = L, E = !1; break }
                    _.set(L, B)
                }
                if (E)
                    for (var W = function(e) { var t = y.find((function(t) { var s = _.get(t); if (s) return s.slice(0, e).every((function(e) { return e })) })); if (t) return T = t, "break" }, q = f ? 3 : 1; q > 0 && "break" !== W(q); q--);
                t.placement !== T && (t.modifiersData[i]._skip = !0, t.placement = T, t.reset = !0)
            }
        },
        requiresIfExists: ["offset"],
        data: { _skip: !1 }
    };

    function he(e, t, s) { return r(e, a(t, s)) }
    var fe = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state,
                    s = e.options,
                    i = e.name,
                    n = s.mainAxis,
                    o = void 0 === n || n,
                    l = s.altAxis,
                    c = void 0 !== l && l,
                    d = s.boundary,
                    u = s.rootBoundary,
                    p = s.altBoundary,
                    h = s.padding,
                    f = s.tether,
                    m = void 0 === f || f,
                    g = s.tetherOffset,
                    v = void 0 === g ? 0 : g,
                    y = U(t, { boundary: d, rootBoundary: u, padding: h, altBoundary: p }),
                    w = H(t.placement),
                    x = R(t.placement),
                    _ = !x,
                    E = V(w),
                    A = "x" === E ? "y" : "x",
                    P = t.modifiersData.popperOffsets,
                    L = t.rects.reference,
                    $ = t.rects.popper,
                    I = "function" == typeof v ? v(Object.assign({}, t.rects, { placement: t.placement })) : v,
                    z = "number" == typeof I ? { mainAxis: I, altAxis: I } : Object.assign({ mainAxis: 0, altAxis: 0 }, I),
                    D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
                    N = { x: 0, y: 0 };
                if (P) {
                    if (o) {
                        var j, F = "y" === E ? C : k,
                            B = "y" === E ? S : M,
                            W = "y" === E ? "height" : "width",
                            q = P[E],
                            X = q + y[F],
                            Y = q - y[B],
                            G = m ? -$[W] / 2 : 0,
                            K = x === O ? L[W] : $[W],
                            Q = x === O ? -$[W] : -L[W],
                            Z = t.elements.arrow,
                            J = m && Z ? b(Z) : { width: 0, height: 0 },
                            ee = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : { top: 0, right: 0, bottom: 0, left: 0 },
                            te = ee[F],
                            se = ee[B],
                            ie = he(0, L[W], J[W]),
                            ne = _ ? L[W] / 2 - G - ie - te - z.mainAxis : K - ie - te - z.mainAxis,
                            re = _ ? -L[W] / 2 + G + ie + se + z.mainAxis : Q + ie + se + z.mainAxis,
                            ae = t.elements.arrow && T(t.elements.arrow),
                            oe = ae ? "y" === E ? ae.clientTop || 0 : ae.clientLeft || 0 : 0,
                            le = null != (j = null == D ? void 0 : D[E]) ? j : 0,
                            ce = q + re - le,
                            de = he(m ? a(X, q + ne - le - oe) : X, q, m ? r(Y, ce) : Y);
                        P[E] = de, N[E] = de - q
                    }
                    if (c) {
                        var ue, pe = "x" === E ? C : k,
                            fe = "x" === E ? S : M,
                            me = P[A],
                            ge = "y" === A ? "height" : "width",
                            ve = me + y[pe],
                            be = me - y[fe],
                            ye = -1 !== [C, k].indexOf(w),
                            we = null != (ue = null == D ? void 0 : D[A]) ? ue : 0,
                            xe = ye ? ve : me - L[ge] - $[ge] - we + z.altAxis,
                            _e = ye ? me + L[ge] + $[ge] - we - z.altAxis : be,
                            Ee = m && ye ? function(e, t, s) { var i = he(e, t, s); return i > s ? s : i }(xe, me, _e) : he(m ? xe : ve, me, m ? _e : be);
                        P[A] = Ee, N[A] = Ee - me
                    }
                    t.modifiersData[i] = N
                }
            },
            requiresIfExists: ["offset"]
        },
        me = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t, s = e.state,
                    i = e.name,
                    n = e.options,
                    r = s.elements.arrow,
                    a = s.modifiersData.popperOffsets,
                    o = H(s.placement),
                    l = V(o),
                    c = [k, M].indexOf(o) >= 0 ? "height" : "width";
                if (r && a) {
                    var d = function(e, t) { return Y("number" != typeof(e = "function" == typeof e ? e(Object.assign({}, t.rects, { placement: t.placement })) : e) ? e : G(e, P)) }(n.padding, s),
                        u = b(r),
                        p = "y" === l ? C : k,
                        h = "y" === l ? S : M,
                        f = s.rects.reference[c] + s.rects.reference[l] - a[l] - s.rects.popper[c],
                        m = a[l] - s.rects.reference[l],
                        g = T(r),
                        v = g ? "y" === l ? g.clientHeight || 0 : g.clientWidth || 0 : 0,
                        y = f / 2 - m / 2,
                        w = d[p],
                        x = v - u[c] - d[h],
                        _ = v / 2 - u[c] / 2 + y,
                        E = he(w, _, x),
                        A = l;
                    s.modifiersData[i] = ((t = {})[A] = E, t.centerOffset = E - _, t)
                }
            },
            effect: function(e) {
                var t = e.state,
                    s = e.options.element,
                    i = void 0 === s ? "[data-popper-arrow]" : s;
                null != i && ("string" != typeof i || (i = t.elements.popper.querySelector(i))) && F(t.elements.popper, i) && (t.elements.arrow = i)
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"]
        };

    function ge(e, t, s) { return void 0 === s && (s = { x: 0, y: 0 }), { top: e.top - t.height - s.y, right: e.right - t.width + s.x, bottom: e.bottom - t.height + s.y, left: e.left - t.width - s.x } }

    function ve(e) { return [C, M, S, k].some((function(t) { return e[t] >= 0 })) }
    var be = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(e) {
                var t = e.state,
                    s = e.name,
                    i = t.rects.reference,
                    n = t.rects.popper,
                    r = t.modifiersData.preventOverflow,
                    a = U(t, { elementContext: "reference" }),
                    o = U(t, { altBoundary: !0 }),
                    l = ge(a, i),
                    c = ge(o, n, r),
                    d = ve(l),
                    u = ve(c);
                t.modifiersData[s] = { referenceClippingOffsets: l, popperEscapeOffsets: c, isReferenceHidden: d, hasPopperEscaped: u }, t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-reference-hidden": d, "data-popper-escaped": u })
            }
        },
        ye = Z({ defaultModifiers: [ee, te, ne, re] }),
        we = [ee, te, ne, re, ae, pe, fe, me, be],
        xe = Z({ defaultModifiers: we });
    e.applyStyles = re, e.arrow = me, e.computeStyles = ne, e.createPopper = xe, e.createPopperLite = ye, e.defaultModifiers = we, e.detectOverflow = U, e.eventListeners = ee, e.flip = pe, e.hide = be, e.offset = ae, e.popperGenerator = Z, e.popperOffsets = te, e.preventOverflow = fe, Object.defineProperty(e, "__esModule", { value: !0 })
})),
function(e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("@popperjs/core")) : "function" == typeof define && define.amd ? define(["@popperjs/core"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).bootstrap = t(e.Popper) }(this, (function(e) {
    "use strict";
    const t = function(e) {
            if (e && e.__esModule) return e;
            const t = Object.create(null, {
                [Symbol.toStringTag]: { value: "Module" }
            });
            if (e)
                for (const s in e)
                    if ("default" !== s) {
                        const i = Object.getOwnPropertyDescriptor(e, s);
                        Object.defineProperty(t, s, i.get ? i : { enumerable: !0, get: () => e[s] })
                    }
            return t.default = e, Object.freeze(t)
        }(e),
        s = "transitionend",
        i = e => {
            let t = e.getAttribute("data-bs-target");
            if (!t || "#" === t) {
                let s = e.getAttribute("href");
                if (!s || !s.includes("#") && !s.startsWith(".")) return null;
                s.includes("#") && !s.startsWith("#") && (s = "#" + s.split("#")[1]), t = s && "#" !== s ? s.trim() : null
            }
            return t
        },
        n = e => { const t = i(e); return t && document.querySelector(t) ? t : null },
        r = e => { const t = i(e); return t ? document.querySelector(t) : null },
        a = e => { e.dispatchEvent(new Event(s)) },
        o = e => !(!e || "object" != typeof e) && (void 0 !== e.jquery && (e = e[0]), void 0 !== e.nodeType),
        l = e => o(e) ? e.jquery ? e[0] : e : "string" == typeof e && e.length > 0 ? document.querySelector(e) : null,
        c = e => {
            if (!o(e) || 0 === e.getClientRects().length) return !1;
            const t = "visible" === getComputedStyle(e).getPropertyValue("visibility"),
                s = e.closest("details:not([open])");
            if (!s) return t;
            if (s !== e) { const t = e.closest("summary"); if (t && t.parentNode !== s) return !1; if (null === t) return !1 }
            return t
        },
        d = e => !e || e.nodeType !== Node.ELEMENT_NODE || !!e.classList.contains("disabled") || (void 0 !== e.disabled ? e.disabled : e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled")),
        u = e => { if (!document.documentElement.attachShadow) return null; if ("function" == typeof e.getRootNode) { const t = e.getRootNode(); return t instanceof ShadowRoot ? t : null } return e instanceof ShadowRoot ? e : e.parentNode ? u(e.parentNode) : null },
        p = () => {},
        h = e => { e.offsetHeight },
        f = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null,
        m = [],
        g = () => "rtl" === document.documentElement.dir,
        v = e => {
            var t;
            t = () => {
                const t = f();
                if (t) {
                    const s = e.NAME,
                        i = t.fn[s];
                    t.fn[s] = e.jQueryInterface, t.fn[s].Constructor = e, t.fn[s].noConflict = () => (t.fn[s] = i, e.jQueryInterface)
                }
            }, "loading" === document.readyState ? (m.length || document.addEventListener("DOMContentLoaded", () => { for (const e of m) e() }), m.push(t)) : t()
        },
        b = e => { "function" == typeof e && e() },
        y = (e, t, i = !0) => {
            if (!i) return void b(e);
            const n = (e => {
                if (!e) return 0;
                let { transitionDuration: t, transitionDelay: s } = window.getComputedStyle(e);
                const i = Number.parseFloat(t),
                    n = Number.parseFloat(s);
                return i || n ? (t = t.split(",")[0], s = s.split(",")[0], 1e3 * (Number.parseFloat(t) + Number.parseFloat(s))) : 0
            })(t) + 5;
            let r = !1;
            const o = ({ target: i }) => { i === t && (r = !0, t.removeEventListener(s, o), b(e)) };
            t.addEventListener(s, o), setTimeout(() => { r || a(t) }, n)
        },
        w = (e, t, s, i) => { const n = e.length; let r = e.indexOf(t); return -1 === r ? !s && i ? e[n - 1] : e[0] : (r += s ? 1 : -1, i && (r = (r + n) % n), e[Math.max(0, Math.min(r, n - 1))]) },
        x = /[^.]*(?=\..*)\.|.*/,
        _ = /\..*/,
        E = /::\d+$/,
        T = {};
    let C = 1;
    const S = { mouseenter: "mouseover", mouseleave: "mouseout" },
        M = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

    function k(e, t) { return t && `${t}::${C++}` || e.uidEvent || C++ }

    function A(e) { const t = k(e); return e.uidEvent = t, T[t] = T[t] || {}, T[t] }

    function P(e, t, s = null) { return Object.values(e).find(e => e.callable === t && e.delegationSelector === s) }

    function O(e, t, s) {
        const i = "string" == typeof t,
            n = i ? s : t || s;
        let r = z(e);
        return M.has(r) || (r = e), [i, n, r]
    }

    function L(e, t, s, i, n) {
        if ("string" != typeof t || !e) return;
        let [r, a, o] = O(t, s, i);
        if (t in S) { a = (e => function(t) { if (!t.relatedTarget || t.relatedTarget !== t.delegateTarget && !t.delegateTarget.contains(t.relatedTarget)) return e.call(this, t) })(a) }
        const l = A(e),
            c = l[o] || (l[o] = {}),
            d = P(c, a, r ? s : null);
        if (d) return void(d.oneOff = d.oneOff && n);
        const u = k(a, t.replace(x, "")),
            p = r ? function(e, t, s) {
                return function i(n) {
                    const r = e.querySelectorAll(t);
                    for (let { target: a } = n; a && a !== this; a = a.parentNode)
                        for (const o of r)
                            if (o === a) return N(n, { delegateTarget: a }), i.oneOff && D.off(e, n.type, t, s), s.apply(a, [n])
                }
            }(e, s, a) : function(e, t) { return function s(i) { return N(i, { delegateTarget: e }), s.oneOff && D.off(e, i.type, t), t.apply(e, [i]) } }(e, a);
        p.delegationSelector = r ? s : null, p.callable = a, p.oneOff = n, p.uidEvent = u, c[u] = p, e.addEventListener(o, p, r)
    }

    function $(e, t, s, i, n) {
        const r = P(t[s], i, n);
        r && (e.removeEventListener(s, r, Boolean(n)), delete t[s][r.uidEvent])
    }

    function I(e, t, s, i) {
        const n = t[s] || {};
        for (const r of Object.keys(n))
            if (r.includes(i)) {
                const i = n[r];
                $(e, t, s, i.callable, i.delegationSelector)
            }
    }

    function z(e) { return e = e.replace(_, ""), S[e] || e }
    const D = {
        on(e, t, s, i) { L(e, t, s, i, !1) },
        one(e, t, s, i) { L(e, t, s, i, !0) },
        off(e, t, s, i) {
            if ("string" != typeof t || !e) return;
            const [n, r, a] = O(t, s, i), o = a !== t, l = A(e), c = l[a] || {}, d = t.startsWith(".");
            if (void 0 === r) {
                if (d)
                    for (const s of Object.keys(l)) I(e, l, s, t.slice(1));
                for (const s of Object.keys(c)) {
                    const i = s.replace(E, "");
                    if (!o || t.includes(i)) {
                        const t = c[s];
                        $(e, l, a, t.callable, t.delegationSelector)
                    }
                }
            } else {
                if (!Object.keys(c).length) return;
                $(e, l, a, r, n ? s : null)
            }
        },
        trigger(e, t, s) {
            if ("string" != typeof t || !e) return null;
            const i = f();
            let n = null,
                r = !0,
                a = !0,
                o = !1;
            t !== z(t) && i && (n = i.Event(t, s), i(e).trigger(n), r = !n.isPropagationStopped(), a = !n.isImmediatePropagationStopped(), o = n.isDefaultPrevented());
            let l = new Event(t, { bubbles: r, cancelable: !0 });
            return l = N(l, s), o && l.preventDefault(), a && e.dispatchEvent(l), l.defaultPrevented && n && n.preventDefault(), l
        }
    };

    function N(e, t) {
        for (const [s, i] of Object.entries(t || {})) try { e[s] = i } catch (t) { Object.defineProperty(e, s, { configurable: !0, get: () => i }) }
        return e
    }
    const j = new Map,
        H = {set(e, t, s) {
                j.has(e) || j.set(e, new Map);
                const i = j.get(e);
                i.has(t) || 0 === i.size ? i.set(t, s) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(i.keys())[0]}.`)
            },
            get: (e, t) => j.has(e) && j.get(e).get(t) || null,
            remove(e, t) {
                if (!j.has(e)) return;
                const s = j.get(e);
                s.delete(t), 0 === s.size && j.delete(e)
            }
        };

    function F(e) { if ("true" === e) return !0; if ("false" === e) return !1; if (e === Number(e).toString()) return Number(e); if ("" === e || "null" === e) return null; if ("string" != typeof e) return e; try { return JSON.parse(decodeURIComponent(e)) } catch (t) { return e } }

    function B(e) { return e.replace(/[A-Z]/g, e => "-" + e.toLowerCase()) }
    const W = {
        setDataAttribute(e, t, s) { e.setAttribute("data-bs-" + B(t), s) },
        removeDataAttribute(e, t) { e.removeAttribute("data-bs-" + B(t)) },
        getDataAttributes(e) {
            if (!e) return {};
            const t = {},
                s = Object.keys(e.dataset).filter(e => e.startsWith("bs") && !e.startsWith("bsConfig"));
            for (const i of s) {
                let s = i.replace(/^bs/, "");
                s = s.charAt(0).toLowerCase() + s.slice(1, s.length), t[s] = F(e.dataset[i])
            }
            return t
        },
        getDataAttribute: (e, t) => F(e.getAttribute("data-bs-" + B(t)))
    };
    class q {
        static get Default() { return {} }
        static get DefaultType() { return {} }
        static get NAME() { throw new Error('You have to implement the static method "NAME", for each component!') }
        _getConfig(e) { return e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e }
        _configAfterMerge(e) { return e }
        _mergeConfigObj(e, t) { const s = o(t) ? W.getDataAttribute(t, "config") : {}; return {...this.constructor.Default, ... "object" == typeof s ? s : {}, ...o(t) ? W.getDataAttributes(t) : {}, ... "object" == typeof e ? e : {} } }
        _typeCheckConfig(e, t = this.constructor.DefaultType) {
            for (const i of Object.keys(t)) {
                const n = t[i],
                    r = e[i],
                    a = o(r) ? "element" : null == (s = r) ? "" + s : Object.prototype.toString.call(s).match(/\s([a-z]+)/i)[1].toLowerCase();
                if (!new RegExp(n).test(a)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${a}" but expected type "${n}".`)
            }
            var s
        }
    }
    class R extends q {
        constructor(e, t) { super(), (e = l(e)) && (this._element = e, this._config = this._getConfig(t), H.set(this._element, this.constructor.DATA_KEY, this)) }
        dispose() { H.remove(this._element, this.constructor.DATA_KEY), D.off(this._element, this.constructor.EVENT_KEY); for (const e of Object.getOwnPropertyNames(this)) this[e] = null }
        _queueCallback(e, t, s = !0) { y(e, t, s) }
        _getConfig(e) { return e = this._mergeConfigObj(e, this._element), e = this._configAfterMerge(e), this._typeCheckConfig(e), e }
        static getInstance(e) { return H.get(l(e), this.DATA_KEY) }
        static getOrCreateInstance(e, t = {}) { return this.getInstance(e) || new this(e, "object" == typeof t ? t : null) }
        static get VERSION() { return "5.2.3" }
        static get DATA_KEY() { return "bs." + this.NAME }
        static get EVENT_KEY() { return "." + this.DATA_KEY }
        static eventName(e) { return `${e}${this.EVENT_KEY}` }
    }
    const V = (e, t = "hide") => {
        const s = "click.dismiss" + e.EVENT_KEY,
            i = e.NAME;
        D.on(document, s, `[data-bs-dismiss="${i}"]`, (function(s) {
            if (["A", "AREA"].includes(this.tagName) && s.preventDefault(), d(this)) return;
            const n = r(this) || this.closest("." + i);
            e.getOrCreateInstance(n)[t]()
        }))
    };
    class X extends R {
        static get NAME() { return "alert" }
        close() {
            if (D.trigger(this._element, "close.bs.alert").defaultPrevented) return;
            this._element.classList.remove("show");
            const e = this._element.classList.contains("fade");
            this._queueCallback(() => this._destroyElement(), this._element, e)
        }
        _destroyElement() { this._element.remove(), D.trigger(this._element, "closed.bs.alert"), this.dispose() }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = X.getOrCreateInstance(this);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                    t[e](this)
                }
            }))
        }
    }
    V(X, "close"), v(X);
    const Y = '[data-bs-toggle="button"]';
    class G extends R {
        static get NAME() { return "button" }
        toggle() { this._element.setAttribute("aria-pressed", this._element.classList.toggle("active")) }
        static jQueryInterface(e) { return this.each((function() { const t = G.getOrCreateInstance(this); "toggle" === e && t[e]() })) }
    }
    D.on(document, "click.bs.button.data-api", Y, e => {
        e.preventDefault();
        const t = e.target.closest(Y);
        G.getOrCreateInstance(t).toggle()
    }), v(G);
    const U = {
            find: (e, t = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(t, e)),
            findOne: (e, t = document.documentElement) => Element.prototype.querySelector.call(t, e),
            children: (e, t) => [].concat(...e.children).filter(e => e.matches(t)),
            parents(e, t) { const s = []; let i = e.parentNode.closest(t); for (; i;) s.push(i), i = i.parentNode.closest(t); return s },
            prev(e, t) {
                let s = e.previousElementSibling;
                for (; s;) {
                    if (s.matches(t)) return [s];
                    s = s.previousElementSibling
                }
                return []
            },
            next(e, t) {
                let s = e.nextElementSibling;
                for (; s;) {
                    if (s.matches(t)) return [s];
                    s = s.nextElementSibling
                }
                return []
            },
            focusableChildren(e) { const t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(e => e + ':not([tabindex^="-"])').join(","); return this.find(t, e).filter(e => !d(e) && c(e)) }
        },
        K = { endCallback: null, leftCallback: null, rightCallback: null },
        Q = { endCallback: "(function|null)", leftCallback: "(function|null)", rightCallback: "(function|null)" };
    class Z extends q {
        constructor(e, t) { super(), this._element = e, e && Z.isSupported() && (this._config = this._getConfig(t), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents()) }
        static get Default() { return K }
        static get DefaultType() { return Q }
        static get NAME() { return "swipe" }
        dispose() { D.off(this._element, ".bs.swipe") }
        _start(e) { this._supportPointerEvents ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX) : this._deltaX = e.touches[0].clientX }
        _end(e) { this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX), this._handleSwipe(), b(this._config.endCallback) }
        _move(e) { this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX }
        _handleSwipe() {
            const e = Math.abs(this._deltaX);
            if (e <= 40) return;
            const t = e / this._deltaX;
            this._deltaX = 0, t && b(t > 0 ? this._config.rightCallback : this._config.leftCallback)
        }
        _initEvents() { this._supportPointerEvents ? (D.on(this._element, "pointerdown.bs.swipe", e => this._start(e)), D.on(this._element, "pointerup.bs.swipe", e => this._end(e)), this._element.classList.add("pointer-event")) : (D.on(this._element, "touchstart.bs.swipe", e => this._start(e)), D.on(this._element, "touchmove.bs.swipe", e => this._move(e)), D.on(this._element, "touchend.bs.swipe", e => this._end(e))) }
        _eventIsPointerPenTouch(e) { return this._supportPointerEvents && ("pen" === e.pointerType || "touch" === e.pointerType) }
        static isSupported() { return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0 }
    }
    const J = "next",
        ee = "prev",
        te = "left",
        se = "right",
        ie = "slid.bs.carousel",
        ne = "carousel",
        re = "active",
        ae = { ArrowLeft: se, ArrowRight: te },
        oe = { interval: 5e3, keyboard: !0, pause: "hover", ride: !1, touch: !0, wrap: !0 },
        le = { interval: "(number|boolean)", keyboard: "boolean", pause: "(string|boolean)", ride: "(boolean|string)", touch: "boolean", wrap: "boolean" };
    class ce extends R {
        constructor(e, t) { super(e, t), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = U.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === ne && this.cycle() }
        static get Default() { return oe }
        static get DefaultType() { return le }
        static get NAME() { return "carousel" }
        next() { this._slide(J) }
        nextWhenVisible() {!document.hidden && c(this._element) && this.next() }
        prev() { this._slide(ee) }
        pause() { this._isSliding && a(this._element), this._clearInterval() }
        cycle() { this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval) }
        _maybeEnableCycle() { this._config.ride && (this._isSliding ? D.one(this._element, ie, () => this.cycle()) : this.cycle()) }
        to(e) {
            const t = this._getItems();
            if (e > t.length - 1 || e < 0) return;
            if (this._isSliding) return void D.one(this._element, ie, () => this.to(e));
            const s = this._getItemIndex(this._getActive());
            if (s === e) return;
            const i = e > s ? J : ee;
            this._slide(i, t[e])
        }
        dispose() { this._swipeHelper && this._swipeHelper.dispose(), super.dispose() }
        _configAfterMerge(e) { return e.defaultInterval = e.interval, e }
        _addEventListeners() { this._config.keyboard && D.on(this._element, "keydown.bs.carousel", e => this._keydown(e)), "hover" === this._config.pause && (D.on(this._element, "mouseenter.bs.carousel", () => this.pause()), D.on(this._element, "mouseleave.bs.carousel", () => this._maybeEnableCycle())), this._config.touch && Z.isSupported() && this._addTouchEventListeners() }
        _addTouchEventListeners() {
            for (const e of U.find(".carousel-item img", this._element)) D.on(e, "dragstart.bs.carousel", e => e.preventDefault());
            const e = { leftCallback: () => this._slide(this._directionToOrder(te)), rightCallback: () => this._slide(this._directionToOrder(se)), endCallback: () => { "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval)) } };
            this._swipeHelper = new Z(this._element, e)
        }
        _keydown(e) {
            if (/input|textarea/i.test(e.target.tagName)) return;
            const t = ae[e.key];
            t && (e.preventDefault(), this._slide(this._directionToOrder(t)))
        }
        _getItemIndex(e) { return this._getItems().indexOf(e) }
        _setActiveIndicatorElement(e) {
            if (!this._indicatorsElement) return;
            const t = U.findOne(".active", this._indicatorsElement);
            t.classList.remove(re), t.removeAttribute("aria-current");
            const s = U.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
            s && (s.classList.add(re), s.setAttribute("aria-current", "true"))
        }
        _updateInterval() {
            const e = this._activeElement || this._getActive();
            if (!e) return;
            const t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
            this._config.interval = t || this._config.defaultInterval
        }
        _slide(e, t = null) {
            if (this._isSliding) return;
            const s = this._getActive(),
                i = e === J,
                n = t || w(this._getItems(), s, i, this._config.wrap);
            if (n === s) return;
            const r = this._getItemIndex(n),
                a = t => D.trigger(this._element, t, { relatedTarget: n, direction: this._orderToDirection(e), from: this._getItemIndex(s), to: r });
            if (a("slide.bs.carousel").defaultPrevented) return;
            if (!s || !n) return;
            const o = Boolean(this._interval);
            this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(r), this._activeElement = n;
            const l = i ? "carousel-item-start" : "carousel-item-end",
                c = i ? "carousel-item-next" : "carousel-item-prev";
            n.classList.add(c), h(n), s.classList.add(l), n.classList.add(l), this._queueCallback(() => { n.classList.remove(l, c), n.classList.add(re), s.classList.remove(re, c, l), this._isSliding = !1, a(ie) }, s, this._isAnimated()), o && this.cycle()
        }
        _isAnimated() { return this._element.classList.contains("slide") }
        _getActive() { return U.findOne(".active.carousel-item", this._element) }
        _getItems() { return U.find(".carousel-item", this._element) }
        _clearInterval() { this._interval && (clearInterval(this._interval), this._interval = null) }
        _directionToOrder(e) { return g() ? e === te ? ee : J : e === te ? J : ee }
        _orderToDirection(e) { return g() ? e === ee ? te : se : e === ee ? se : te }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = ce.getOrCreateInstance(this, e);
                if ("number" != typeof e) {
                    if ("string" == typeof e) {
                        if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                        t[e]()
                    }
                } else t.to(e)
            }))
        }
    }
    D.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", (function(e) {
        const t = r(this);
        if (!t || !t.classList.contains(ne)) return;
        e.preventDefault();
        const s = ce.getOrCreateInstance(t),
            i = this.getAttribute("data-bs-slide-to");
        return i ? (s.to(i), void s._maybeEnableCycle()) : "next" === W.getDataAttribute(this, "slide") ? (s.next(), void s._maybeEnableCycle()) : (s.prev(), void s._maybeEnableCycle())
    })), D.on(window, "load.bs.carousel.data-api", () => { const e = U.find('[data-bs-ride="carousel"]'); for (const t of e) ce.getOrCreateInstance(t) }), v(ce);
    const de = "show",
        ue = "collapse",
        pe = "collapsing",
        he = '[data-bs-toggle="collapse"]',
        fe = { parent: null, toggle: !0 },
        me = { parent: "(null|element)", toggle: "boolean" };
    class ge extends R {
        constructor(e, t) {
            super(e, t), this._isTransitioning = !1, this._triggerArray = [];
            const s = U.find(he);
            for (const e of s) {
                const t = n(e),
                    s = U.find(t).filter(e => e === this._element);
                null !== t && s.length && this._triggerArray.push(e)
            }
            this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
        }
        static get Default() { return fe }
        static get DefaultType() { return me }
        static get NAME() { return "collapse" }
        toggle() { this._isShown() ? this.hide() : this.show() }
        show() {
            if (this._isTransitioning || this._isShown()) return;
            let e = [];
            if (this._config.parent && (e = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter(e => e !== this._element).map(e => ge.getOrCreateInstance(e, { toggle: !1 }))), e.length && e[0]._isTransitioning) return;
            if (D.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
            for (const t of e) t.hide();
            const t = this._getDimension();
            this._element.classList.remove(ue), this._element.classList.add(pe), this._element.style[t] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
            const s = "scroll" + (t[0].toUpperCase() + t.slice(1));
            this._queueCallback(() => { this._isTransitioning = !1, this._element.classList.remove(pe), this._element.classList.add(ue, de), this._element.style[t] = "", D.trigger(this._element, "shown.bs.collapse") }, this._element, !0), this._element.style[t] = this._element[s] + "px"
        }
        hide() {
            if (this._isTransitioning || !this._isShown()) return;
            if (D.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
            const e = this._getDimension();
            this._element.style[e] = this._element.getBoundingClientRect()[e] + "px", h(this._element), this._element.classList.add(pe), this._element.classList.remove(ue, de);
            for (const e of this._triggerArray) {
                const t = r(e);
                t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1)
            }
            this._isTransitioning = !0, this._element.style[e] = "", this._queueCallback(() => { this._isTransitioning = !1, this._element.classList.remove(pe), this._element.classList.add(ue), D.trigger(this._element, "hidden.bs.collapse") }, this._element, !0)
        }
        _isShown(e = this._element) { return e.classList.contains(de) }
        _configAfterMerge(e) { return e.toggle = Boolean(e.toggle), e.parent = l(e.parent), e }
        _getDimension() { return this._element.classList.contains("collapse-horizontal") ? "width" : "height" }
        _initializeChildren() {
            if (!this._config.parent) return;
            const e = this._getFirstLevelChildren(he);
            for (const t of e) {
                const e = r(t);
                e && this._addAriaAndCollapsedClass([t], this._isShown(e))
            }
        }
        _getFirstLevelChildren(e) { const t = U.find(":scope .collapse .collapse", this._config.parent); return U.find(e, this._config.parent).filter(e => !t.includes(e)) }
        _addAriaAndCollapsedClass(e, t) {
            if (e.length)
                for (const s of e) s.classList.toggle("collapsed", !t), s.setAttribute("aria-expanded", t)
        }
        static jQueryInterface(e) {
            const t = {};
            return "string" == typeof e && /show|hide/.test(e) && (t.toggle = !1), this.each((function() {
                const s = ge.getOrCreateInstance(this, t);
                if ("string" == typeof e) {
                    if (void 0 === s[e]) throw new TypeError(`No method named "${e}"`);
                    s[e]()
                }
            }))
        }
    }
    D.on(document, "click.bs.collapse.data-api", he, (function(e) {
        ("A" === e.target.tagName || e.delegateTarget && "A" === e.delegateTarget.tagName) && e.preventDefault();
        const t = n(this),
            s = U.find(t);
        for (const e of s) ge.getOrCreateInstance(e, { toggle: !1 }).toggle()
    })), v(ge);
    const ve = "dropdown",
        be = "ArrowUp",
        ye = "ArrowDown",
        we = "click.bs.dropdown.data-api",
        xe = "keydown.bs.dropdown.data-api",
        _e = "show",
        Ee = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
        Te = ".dropdown-menu",
        Ce = g() ? "top-end" : "top-start",
        Se = g() ? "top-start" : "top-end",
        Me = g() ? "bottom-end" : "bottom-start",
        ke = g() ? "bottom-start" : "bottom-end",
        Ae = g() ? "left-start" : "right-start",
        Pe = g() ? "right-start" : "left-start",
        Oe = { autoClose: !0, boundary: "clippingParents", display: "dynamic", offset: [0, 2], popperConfig: null, reference: "toggle" },
        Le = { autoClose: "(boolean|string)", boundary: "(string|element)", display: "string", offset: "(array|string|function)", popperConfig: "(null|object|function)", reference: "(string|element|object)" };
    class $e extends R {
        constructor(e, t) { super(e, t), this._popper = null, this._parent = this._element.parentNode, this._menu = U.next(this._element, Te)[0] || U.prev(this._element, Te)[0] || U.findOne(Te, this._parent), this._inNavbar = this._detectNavbar() }
        static get Default() { return Oe }
        static get DefaultType() { return Le }
        static get NAME() { return ve }
        toggle() { return this._isShown() ? this.hide() : this.show() }
        show() {
            if (d(this._element) || this._isShown()) return;
            const e = { relatedTarget: this._element };
            if (!D.trigger(this._element, "show.bs.dropdown", e).defaultPrevented) {
                if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav"))
                    for (const e of[].concat(...document.body.children)) D.on(e, "mouseover", p);
                this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(_e), this._element.classList.add(_e), D.trigger(this._element, "shown.bs.dropdown", e)
            }
        }
        hide() {
            if (d(this._element) || !this._isShown()) return;
            const e = { relatedTarget: this._element };
            this._completeHide(e)
        }
        dispose() { this._popper && this._popper.destroy(), super.dispose() }
        update() { this._inNavbar = this._detectNavbar(), this._popper && this._popper.update() }
        _completeHide(e) {
            if (!D.trigger(this._element, "hide.bs.dropdown", e).defaultPrevented) {
                if ("ontouchstart" in document.documentElement)
                    for (const e of[].concat(...document.body.children)) D.off(e, "mouseover", p);
                this._popper && this._popper.destroy(), this._menu.classList.remove(_e), this._element.classList.remove(_e), this._element.setAttribute("aria-expanded", "false"), W.removeDataAttribute(this._menu, "popper"), D.trigger(this._element, "hidden.bs.dropdown", e)
            }
        }
        _getConfig(e) { if ("object" == typeof(e = super._getConfig(e)).reference && !o(e.reference) && "function" != typeof e.reference.getBoundingClientRect) throw new TypeError(ve.toUpperCase() + ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.'); return e }
        _createPopper() {
            if (void 0 === t) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            let e = this._element;
            "parent" === this._config.reference ? e = this._parent : o(this._config.reference) ? e = l(this._config.reference) : "object" == typeof this._config.reference && (e = this._config.reference);
            const s = this._getPopperConfig();
            this._popper = t.createPopper(e, this._menu, s)
        }
        _isShown() { return this._menu.classList.contains(_e) }
        _getPlacement() { const e = this._parent; if (e.classList.contains("dropend")) return Ae; if (e.classList.contains("dropstart")) return Pe; if (e.classList.contains("dropup-center")) return "top"; if (e.classList.contains("dropdown-center")) return "bottom"; const t = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim(); return e.classList.contains("dropup") ? t ? Se : Ce : t ? ke : Me }
        _detectNavbar() { return null !== this._element.closest(".navbar") }
        _getOffset() { const { offset: e } = this._config; return "string" == typeof e ? e.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof e ? t => e(t, this._element) : e }
        _getPopperConfig() { const e = { placement: this._getPlacement(), modifiers: [{ name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "offset", options: { offset: this._getOffset() } }] }; return (this._inNavbar || "static" === this._config.display) && (W.setDataAttribute(this._menu, "popper", "static"), e.modifiers = [{ name: "applyStyles", enabled: !1 }]), {...e, ... "function" == typeof this._config.popperConfig ? this._config.popperConfig(e) : this._config.popperConfig } }
        _selectMenuItem({ key: e, target: t }) {
            const s = U.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(e => c(e));
            s.length && w(s, t, e === ye, !s.includes(t)).focus()
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = $e.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
        static clearMenus(e) {
            if (2 === e.button || "keyup" === e.type && "Tab" !== e.key) return;
            const t = U.find('[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled).show');
            for (const s of t) {
                const t = $e.getInstance(s);
                if (!t || !1 === t._config.autoClose) continue;
                const i = e.composedPath(),
                    n = i.includes(t._menu);
                if (i.includes(t._element) || "inside" === t._config.autoClose && !n || "outside" === t._config.autoClose && n) continue;
                if (t._menu.contains(e.target) && ("keyup" === e.type && "Tab" === e.key || /input|select|option|textarea|form/i.test(e.target.tagName))) continue;
                const r = { relatedTarget: t._element };
                "click" === e.type && (r.clickEvent = e), t._completeHide(r)
            }
        }
        static dataApiKeydownHandler(e) {
            const t = /input|textarea/i.test(e.target.tagName),
                s = "Escape" === e.key,
                i = [be, ye].includes(e.key);
            if (!i && !s) return;
            if (t && !s) return;
            e.preventDefault();
            const n = this.matches(Ee) ? this : U.prev(this, Ee)[0] || U.next(this, Ee)[0] || U.findOne(Ee, e.delegateTarget.parentNode),
                r = $e.getOrCreateInstance(n);
            if (i) return e.stopPropagation(), r.show(), void r._selectMenuItem(e);
            r._isShown() && (e.stopPropagation(), r.hide(), n.focus())
        }
    }
    D.on(document, xe, Ee, $e.dataApiKeydownHandler), D.on(document, xe, Te, $e.dataApiKeydownHandler), D.on(document, we, $e.clearMenus), D.on(document, "keyup.bs.dropdown.data-api", $e.clearMenus), D.on(document, we, Ee, (function(e) { e.preventDefault(), $e.getOrCreateInstance(this).toggle() })), v($e);
    const Ie = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        ze = ".sticky-top",
        De = "padding-right",
        Ne = "margin-right";
    class je {
        constructor() { this._element = document.body }
        getWidth() { const e = document.documentElement.clientWidth; return Math.abs(window.innerWidth - e) }
        hide() {
            const e = this.getWidth();
            this._disableOverFlow(), this._setElementAttributes(this._element, De, t => t + e), this._setElementAttributes(Ie, De, t => t + e), this._setElementAttributes(ze, Ne, t => t - e)
        }
        reset() { this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, De), this._resetElementAttributes(Ie, De), this._resetElementAttributes(ze, Ne) }
        isOverflowing() { return this.getWidth() > 0 }
        _disableOverFlow() { this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden" }
        _setElementAttributes(e, t, s) {
            const i = this.getWidth();
            this._applyManipulationCallback(e, e => {
                if (e !== this._element && window.innerWidth > e.clientWidth + i) return;
                this._saveInitialAttribute(e, t);
                const n = window.getComputedStyle(e).getPropertyValue(t);
                e.style.setProperty(t, s(Number.parseFloat(n)) + "px")
            })
        }
        _saveInitialAttribute(e, t) {
            const s = e.style.getPropertyValue(t);
            s && W.setDataAttribute(e, t, s)
        }
        _resetElementAttributes(e, t) {
            this._applyManipulationCallback(e, e => {
                const s = W.getDataAttribute(e, t);
                null !== s ? (W.removeDataAttribute(e, t), e.style.setProperty(t, s)) : e.style.removeProperty(t)
            })
        }
        _applyManipulationCallback(e, t) {
            if (o(e)) t(e);
            else
                for (const s of U.find(e, this._element)) t(s)
        }
    }
    const He = "mousedown.bs.backdrop",
        Fe = { className: "modal-backdrop", clickCallback: null, isAnimated: !1, isVisible: !0, rootElement: "body" },
        Be = { className: "string", clickCallback: "(function|null)", isAnimated: "boolean", isVisible: "boolean", rootElement: "(element|string)" };
    class We extends q {
        constructor(e) { super(), this._config = this._getConfig(e), this._isAppended = !1, this._element = null }
        static get Default() { return Fe }
        static get DefaultType() { return Be }
        static get NAME() { return "backdrop" }
        show(e) {
            if (!this._config.isVisible) return void b(e);
            this._append();
            const t = this._getElement();
            this._config.isAnimated && h(t), t.classList.add("show"), this._emulateAnimation(() => { b(e) })
        }
        hide(e) { this._config.isVisible ? (this._getElement().classList.remove("show"), this._emulateAnimation(() => { this.dispose(), b(e) })) : b(e) }
        dispose() { this._isAppended && (D.off(this._element, He), this._element.remove(), this._isAppended = !1) }
        _getElement() {
            if (!this._element) {
                const e = document.createElement("div");
                e.className = this._config.className, this._config.isAnimated && e.classList.add("fade"), this._element = e
            }
            return this._element
        }
        _configAfterMerge(e) { return e.rootElement = l(e.rootElement), e }
        _append() {
            if (this._isAppended) return;
            const e = this._getElement();
            this._config.rootElement.append(e), D.on(e, He, () => { b(this._config.clickCallback) }), this._isAppended = !0
        }
        _emulateAnimation(e) { y(e, this._getElement(), this._config.isAnimated) }
    }
    const qe = ".bs.focustrap",
        Re = "backward",
        Ve = { autofocus: !0, trapElement: null },
        Xe = { autofocus: "boolean", trapElement: "element" };
    class Ye extends q {
        constructor(e) { super(), this._config = this._getConfig(e), this._isActive = !1, this._lastTabNavDirection = null }
        static get Default() { return Ve }
        static get DefaultType() { return Xe }
        static get NAME() { return "focustrap" }
        activate() { this._isActive || (this._config.autofocus && this._config.trapElement.focus(), D.off(document, qe), D.on(document, "focusin.bs.focustrap", e => this._handleFocusin(e)), D.on(document, "keydown.tab.bs.focustrap", e => this._handleKeydown(e)), this._isActive = !0) }
        deactivate() { this._isActive && (this._isActive = !1, D.off(document, qe)) }
        _handleFocusin(e) {
            const { trapElement: t } = this._config;
            if (e.target === document || e.target === t || t.contains(e.target)) return;
            const s = U.focusableChildren(t);
            0 === s.length ? t.focus() : this._lastTabNavDirection === Re ? s[s.length - 1].focus() : s[0].focus()
        }
        _handleKeydown(e) { "Tab" === e.key && (this._lastTabNavDirection = e.shiftKey ? Re : "forward") }
    }
    const Ge = "hidden.bs.modal",
        Ue = "show.bs.modal",
        Ke = "modal-open",
        Qe = "modal-static",
        Ze = { backdrop: !0, focus: !0, keyboard: !0 },
        Je = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
    class et extends R {
        constructor(e, t) { super(e, t), this._dialog = U.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new je, this._addEventListeners() }
        static get Default() { return Ze }
        static get DefaultType() { return Je }
        static get NAME() { return "modal" }
        toggle(e) { return this._isShown ? this.hide() : this.show(e) }
        show(e) { this._isShown || this._isTransitioning || D.trigger(this._element, Ue, { relatedTarget: e }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Ke), this._adjustDialog(), this._backdrop.show(() => this._showElement(e))) }
        hide() { this._isShown && !this._isTransitioning && (D.trigger(this._element, "hide.bs.modal").defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove("show"), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()))) }
        dispose() {
            for (const e of[window, this._dialog]) D.off(e, ".bs.modal");
            this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
        }
        handleUpdate() { this._adjustDialog() }
        _initializeBackDrop() { return new We({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() }) }
        _initializeFocusTrap() { return new Ye({ trapElement: this._element }) }
        _showElement(e) {
            document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
            const t = U.findOne(".modal-body", this._dialog);
            t && (t.scrollTop = 0), h(this._element), this._element.classList.add("show"), this._queueCallback(() => { this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, D.trigger(this._element, "shown.bs.modal", { relatedTarget: e }) }, this._dialog, this._isAnimated())
        }
        _addEventListeners() { D.on(this._element, "keydown.dismiss.bs.modal", e => { if ("Escape" === e.key) return this._config.keyboard ? (e.preventDefault(), void this.hide()) : void this._triggerBackdropTransition() }), D.on(window, "resize.bs.modal", () => { this._isShown && !this._isTransitioning && this._adjustDialog() }), D.on(this._element, "mousedown.dismiss.bs.modal", e => { D.one(this._element, "click.dismiss.bs.modal", t => { this._element === e.target && this._element === t.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition()) }) }) }
        _hideModal() { this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide(() => { document.body.classList.remove(Ke), this._resetAdjustments(), this._scrollBar.reset(), D.trigger(this._element, Ge) }) }
        _isAnimated() { return this._element.classList.contains("fade") }
        _triggerBackdropTransition() {
            if (D.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;
            const e = this._element.scrollHeight > document.documentElement.clientHeight,
                t = this._element.style.overflowY;
            "hidden" === t || this._element.classList.contains(Qe) || (e || (this._element.style.overflowY = "hidden"), this._element.classList.add(Qe), this._queueCallback(() => { this._element.classList.remove(Qe), this._queueCallback(() => { this._element.style.overflowY = t }, this._dialog) }, this._dialog), this._element.focus())
        }
        _adjustDialog() {
            const e = this._element.scrollHeight > document.documentElement.clientHeight,
                t = this._scrollBar.getWidth(),
                s = t > 0;
            if (s && !e) {
                const e = g() ? "paddingLeft" : "paddingRight";
                this._element.style[e] = t + "px"
            }
            if (!s && e) {
                const e = g() ? "paddingRight" : "paddingLeft";
                this._element.style[e] = t + "px"
            }
        }
        _resetAdjustments() { this._element.style.paddingLeft = "", this._element.style.paddingRight = "" }
        static jQueryInterface(e, t) {
            return this.each((function() {
                const s = et.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === s[e]) throw new TypeError(`No method named "${e}"`);
                    s[e](t)
                }
            }))
        }
    }
    D.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', (function(e) {
        const t = r(this);
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(), D.one(t, Ue, e => { e.defaultPrevented || D.one(t, Ge, () => { c(this) && this.focus() }) });
        const s = U.findOne(".modal.show");
        s && et.getInstance(s).hide(), et.getOrCreateInstance(t).toggle(this)
    })), V(et), v(et);
    const tt = "showing",
        st = ".offcanvas.show",
        it = "hidePrevented.bs.offcanvas",
        nt = "hidden.bs.offcanvas",
        rt = { backdrop: !0, keyboard: !0, scroll: !1 },
        at = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
    class ot extends R {
        constructor(e, t) { super(e, t), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners() }
        static get Default() { return rt }
        static get DefaultType() { return at }
        static get NAME() { return "offcanvas" }
        toggle(e) { return this._isShown ? this.hide() : this.show(e) }
        show(e) { this._isShown || D.trigger(this._element, "show.bs.offcanvas", { relatedTarget: e }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || (new je).hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(tt), this._queueCallback(() => { this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add("show"), this._element.classList.remove(tt), D.trigger(this._element, "shown.bs.offcanvas", { relatedTarget: e }) }, this._element, !0)) }
        hide() { this._isShown && (D.trigger(this._element, "hide.bs.offcanvas").defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add("hiding"), this._backdrop.hide(), this._queueCallback(() => { this._element.classList.remove("show", "hiding"), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || (new je).reset(), D.trigger(this._element, nt) }, this._element, !0))) }
        dispose() { this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose() }
        _initializeBackDrop() { const e = Boolean(this._config.backdrop); return new We({ className: "offcanvas-backdrop", isVisible: e, isAnimated: !0, rootElement: this._element.parentNode, clickCallback: e ? () => { "static" !== this._config.backdrop ? this.hide() : D.trigger(this._element, it) } : null }) }
        _initializeFocusTrap() { return new Ye({ trapElement: this._element }) }
        _addEventListeners() { D.on(this._element, "keydown.dismiss.bs.offcanvas", e => { "Escape" === e.key && (this._config.keyboard ? this.hide() : D.trigger(this._element, it)) }) }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = ot.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                    t[e](this)
                }
            }))
        }
    }
    D.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', (function(e) {
        const t = r(this);
        if (["A", "AREA"].includes(this.tagName) && e.preventDefault(), d(this)) return;
        D.one(t, nt, () => { c(this) && this.focus() });
        const s = U.findOne(st);
        s && s !== t && ot.getInstance(s).hide(), ot.getOrCreateInstance(t).toggle(this)
    })), D.on(window, "load.bs.offcanvas.data-api", () => { for (const e of U.find(st)) ot.getOrCreateInstance(e).show() }), D.on(window, "resize.bs.offcanvas", () => { for (const e of U.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(e).position && ot.getOrCreateInstance(e).hide() }), V(ot), v(ot);
    const lt = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
        ct = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
        dt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
        ut = (e, t) => { const s = e.nodeName.toLowerCase(); return t.includes(s) ? !lt.has(s) || Boolean(ct.test(e.nodeValue) || dt.test(e.nodeValue)) : t.filter(e => e instanceof RegExp).some(e => e.test(s)) },
        pt = { "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i], a: ["target", "href", "title", "rel"], area: [], b: [], br: [], col: [], code: [], div: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ["src", "srcset", "alt", "title", "width", "height"], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] },
        ht = { allowList: pt, content: {}, extraClass: "", html: !1, sanitize: !0, sanitizeFn: null, template: "<div></div>" },
        ft = { allowList: "object", content: "object", extraClass: "(string|function)", html: "boolean", sanitize: "boolean", sanitizeFn: "(null|function)", template: "string" },
        mt = { entry: "(string|element|function|null)", selector: "(string|element)" };
    class gt extends q {
        constructor(e) { super(), this._config = this._getConfig(e) }
        static get Default() { return ht }
        static get DefaultType() { return ft }
        static get NAME() { return "TemplateFactory" }
        getContent() { return Object.values(this._config.content).map(e => this._resolvePossibleFunction(e)).filter(Boolean) }
        hasContent() { return this.getContent().length > 0 }
        changeContent(e) { return this._checkContent(e), this._config.content = {...this._config.content, ...e }, this }
        toHtml() {
            const e = document.createElement("div");
            e.innerHTML = this._maybeSanitize(this._config.template);
            for (const [t, s] of Object.entries(this._config.content)) this._setContent(e, s, t);
            const t = e.children[0],
                s = this._resolvePossibleFunction(this._config.extraClass);
            return s && t.classList.add(...s.split(" ")), t
        }
        _typeCheckConfig(e) { super._typeCheckConfig(e), this._checkContent(e.content) }
        _checkContent(e) { for (const [t, s] of Object.entries(e)) super._typeCheckConfig({ selector: t, entry: s }, mt) }
        _setContent(e, t, s) {
            const i = U.findOne(s, e);
            i && ((t = this._resolvePossibleFunction(t)) ? o(t) ? this._putElementInTemplate(l(t), i) : this._config.html ? i.innerHTML = this._maybeSanitize(t) : i.textContent = t : i.remove())
        }
        _maybeSanitize(e) {
            return this._config.sanitize ? function(e, t, s) {
                if (!e.length) return e;
                if (s && "function" == typeof s) return s(e);
                const i = (new window.DOMParser).parseFromString(e, "text/html"),
                    n = [].concat(...i.body.querySelectorAll("*"));
                for (const e of n) {
                    const s = e.nodeName.toLowerCase();
                    if (!Object.keys(t).includes(s)) { e.remove(); continue }
                    const i = [].concat(...e.attributes),
                        n = [].concat(t["*"] || [], t[s] || []);
                    for (const t of i) ut(t, n) || e.removeAttribute(t.nodeName)
                }
                return i.body.innerHTML
            }(e, this._config.allowList, this._config.sanitizeFn) : e
        }
        _resolvePossibleFunction(e) { return "function" == typeof e ? e(this) : e }
        _putElementInTemplate(e, t) {
            if (this._config.html) return t.innerHTML = "", void t.append(e);
            t.textContent = e.textContent
        }
    }
    const vt = new Set(["sanitize", "allowList", "sanitizeFn"]),
        bt = "fade",
        yt = "show",
        wt = "hide.bs.modal",
        xt = "hover",
        _t = { AUTO: "auto", TOP: "top", RIGHT: g() ? "left" : "right", BOTTOM: "bottom", LEFT: g() ? "right" : "left" },
        Et = { allowList: pt, animation: !0, boundary: "clippingParents", container: !1, customClass: "", delay: 0, fallbackPlacements: ["top", "right", "bottom", "left"], html: !1, offset: [0, 0], placement: "top", popperConfig: null, sanitize: !0, sanitizeFn: null, selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', title: "", trigger: "hover focus" },
        Tt = { allowList: "object", animation: "boolean", boundary: "(string|element)", container: "(string|element|boolean)", customClass: "(string|function)", delay: "(number|object)", fallbackPlacements: "array", html: "boolean", offset: "(array|string|function)", placement: "(string|function)", popperConfig: "(null|object|function)", sanitize: "boolean", sanitizeFn: "(null|function)", selector: "(string|boolean)", template: "string", title: "(string|element|function)", trigger: "string" };
    class Ct extends R {
        constructor(e, s) {
            if (void 0 === t) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(e, s), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle()
        }
        static get Default() { return Et }
        static get DefaultType() { return Tt }
        static get NAME() { return "tooltip" }
        enable() { this._isEnabled = !0 }
        disable() { this._isEnabled = !1 }
        toggleEnabled() { this._isEnabled = !this._isEnabled }
        toggle() { this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click, this._isShown() ? this._leave() : this._enter()) }
        dispose() { clearTimeout(this._timeout), D.off(this._element.closest(".modal"), wt, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose() }
        show() {
            if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
            if (!this._isWithContent() || !this._isEnabled) return;
            const e = D.trigger(this._element, this.constructor.eventName("show")),
                t = (u(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
            if (e.defaultPrevented || !t) return;
            this._disposePopper();
            const s = this._getTipElement();
            this._element.setAttribute("aria-describedby", s.getAttribute("id"));
            const { container: i } = this._config;
            if (this._element.ownerDocument.documentElement.contains(this.tip) || (i.append(s), D.trigger(this._element, this.constructor.eventName("inserted"))), this._popper = this._createPopper(s), s.classList.add(yt), "ontouchstart" in document.documentElement)
                for (const e of[].concat(...document.body.children)) D.on(e, "mouseover", p);
            this._queueCallback(() => { D.trigger(this._element, this.constructor.eventName("shown")), !1 === this._isHovered && this._leave(), this._isHovered = !1 }, this.tip, this._isAnimated())
        }
        hide() {
            if (this._isShown() && !D.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) {
                if (this._getTipElement().classList.remove(yt), "ontouchstart" in document.documentElement)
                    for (const e of[].concat(...document.body.children)) D.off(e, "mouseover", p);
                this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, this._isHovered = null, this._queueCallback(() => { this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), D.trigger(this._element, this.constructor.eventName("hidden"))) }, this.tip, this._isAnimated())
            }
        }
        update() { this._popper && this._popper.update() }
        _isWithContent() { return Boolean(this._getTitle()) }
        _getTipElement() { return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip }
        _createTipElement(e) {
            const t = this._getTemplateFactory(e).toHtml();
            if (!t) return null;
            t.classList.remove(bt, yt), t.classList.add(`bs-${this.constructor.NAME}-auto`);
            const s = (e => { do { e += Math.floor(1e6 * Math.random()) } while (document.getElementById(e)); return e })(this.constructor.NAME).toString();
            return t.setAttribute("id", s), this._isAnimated() && t.classList.add(bt), t
        }
        setContent(e) { this._newContent = e, this._isShown() && (this._disposePopper(), this.show()) }
        _getTemplateFactory(e) { return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new gt({...this._config, content: e, extraClass: this._resolvePossibleFunction(this._config.customClass) }), this._templateFactory }
        _getContentForTemplate() { return { ".tooltip-inner": this._getTitle() } }
        _getTitle() { return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title") }
        _initializeOnDelegatedTarget(e) { return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig()) }
        _isAnimated() { return this._config.animation || this.tip && this.tip.classList.contains(bt) }
        _isShown() { return this.tip && this.tip.classList.contains(yt) }
        _createPopper(e) {
            const s = "function" == typeof this._config.placement ? this._config.placement.call(this, e, this._element) : this._config.placement,
                i = _t[s.toUpperCase()];
            return t.createPopper(this._element, e, this._getPopperConfig(i))
        }
        _getOffset() { const { offset: e } = this._config; return "string" == typeof e ? e.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof e ? t => e(t, this._element) : e }
        _resolvePossibleFunction(e) { return "function" == typeof e ? e.call(this._element) : e }
        _getPopperConfig(e) { const t = { placement: e, modifiers: [{ name: "flip", options: { fallbackPlacements: this._config.fallbackPlacements } }, { name: "offset", options: { offset: this._getOffset() } }, { name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "arrow", options: { element: `.${this.constructor.NAME}-arrow` } }, { name: "preSetPlacement", enabled: !0, phase: "beforeMain", fn: e => { this._getTipElement().setAttribute("data-popper-placement", e.state.placement) } }] }; return {...t, ... "function" == typeof this._config.popperConfig ? this._config.popperConfig(t) : this._config.popperConfig } }
        _setListeners() {
            const e = this._config.trigger.split(" ");
            for (const t of e)
                if ("click" === t) D.on(this._element, this.constructor.eventName("click"), this._config.selector, e => { this._initializeOnDelegatedTarget(e).toggle() });
                else if ("manual" !== t) {
                const e = t === xt ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"),
                    s = t === xt ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
                D.on(this._element, e, this._config.selector, e => {
                    const t = this._initializeOnDelegatedTarget(e);
                    t._activeTrigger["focusin" === e.type ? "focus" : xt] = !0, t._enter()
                }), D.on(this._element, s, this._config.selector, e => {
                    const t = this._initializeOnDelegatedTarget(e);
                    t._activeTrigger["focusout" === e.type ? "focus" : xt] = t._element.contains(e.relatedTarget), t._leave()
                })
            }
            this._hideModalHandler = () => { this._element && this.hide() }, D.on(this._element.closest(".modal"), wt, this._hideModalHandler)
        }
        _fixTitle() {
            const e = this._element.getAttribute("title");
            e && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", e), this._element.setAttribute("data-bs-original-title", e), this._element.removeAttribute("title"))
        }
        _enter() { this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0, this._setTimeout(() => { this._isHovered && this.show() }, this._config.delay.show)) }
        _leave() { this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout(() => { this._isHovered || this.hide() }, this._config.delay.hide)) }
        _setTimeout(e, t) { clearTimeout(this._timeout), this._timeout = setTimeout(e, t) }
        _isWithActiveTrigger() { return Object.values(this._activeTrigger).includes(!0) }
        _getConfig(e) { const t = W.getDataAttributes(this._element); for (const e of Object.keys(t)) vt.has(e) && delete t[e]; return e = {...t, ... "object" == typeof e && e ? e : {} }, e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e }
        _configAfterMerge(e) { return e.container = !1 === e.container ? document.body : l(e.container), "number" == typeof e.delay && (e.delay = { show: e.delay, hide: e.delay }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), e }
        _getDelegateConfig() { const e = {}; for (const t in this._config) this.constructor.Default[t] !== this._config[t] && (e[t] = this._config[t]); return e.selector = !1, e.trigger = "manual", e }
        _disposePopper() { this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null) }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Ct.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
    }
    v(Ct);
    const St = {...Ct.Default, content: "", offset: [0, 8], placement: "right", template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', trigger: "click" },
        Mt = {...Ct.DefaultType, content: "(null|string|element|function)" };
    class kt extends Ct {
        static get Default() { return St }
        static get DefaultType() { return Mt }
        static get NAME() { return "popover" }
        _isWithContent() { return this._getTitle() || this._getContent() }
        _getContentForTemplate() { return { ".popover-header": this._getTitle(), ".popover-body": this._getContent() } }
        _getContent() { return this._resolvePossibleFunction(this._config.content) }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = kt.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
    }
    v(kt);
    const At = "click.bs.scrollspy",
        Pt = "active",
        Ot = { offset: null, rootMargin: "0px 0px -25%", smoothScroll: !1, target: null, threshold: [.1, .5, 1] },
        Lt = { offset: "(number|null)", rootMargin: "string", smoothScroll: "boolean", target: "element", threshold: "array" };
    class $t extends R {
        constructor(e, t) { super(e, t), this._targetLinks = new Map, this._observableSections = new Map, this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }, this.refresh() }
        static get Default() { return Ot }
        static get DefaultType() { return Lt }
        static get NAME() { return "scrollspy" }
        refresh() { this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver(); for (const e of this._observableSections.values()) this._observer.observe(e) }
        dispose() { this._observer.disconnect(), super.dispose() }
        _configAfterMerge(e) { return e.target = l(e.target) || document.body, e.rootMargin = e.offset ? e.offset + "px 0px -30%" : e.rootMargin, "string" == typeof e.threshold && (e.threshold = e.threshold.split(",").map(e => Number.parseFloat(e))), e }
        _maybeEnableSmoothScroll() {
            this._config.smoothScroll && (D.off(this._config.target, At), D.on(this._config.target, At, "[href]", e => {
                const t = this._observableSections.get(e.target.hash);
                if (t) {
                    e.preventDefault();
                    const s = this._rootElement || window,
                        i = t.offsetTop - this._element.offsetTop;
                    if (s.scrollTo) return void s.scrollTo({ top: i, behavior: "smooth" });
                    s.scrollTop = i
                }
            }))
        }
        _getNewObserver() { const e = { root: this._rootElement, threshold: this._config.threshold, rootMargin: this._config.rootMargin }; return new IntersectionObserver(e => this._observerCallback(e), e) }
        _observerCallback(e) {
            const t = e => this._targetLinks.get("#" + e.target.id),
                s = e => { this._previousScrollData.visibleEntryTop = e.target.offsetTop, this._process(t(e)) },
                i = (this._rootElement || document.documentElement).scrollTop,
                n = i >= this._previousScrollData.parentScrollTop;
            this._previousScrollData.parentScrollTop = i;
            for (const r of e) { if (!r.isIntersecting) { this._activeTarget = null, this._clearActiveClass(t(r)); continue } const e = r.target.offsetTop >= this._previousScrollData.visibleEntryTop; if (n && e) { if (s(r), !i) return } else n || e || s(r) }
        }
        _initializeTargetsAndObservables() {
            this._targetLinks = new Map, this._observableSections = new Map;
            const e = U.find("[href]", this._config.target);
            for (const t of e) {
                if (!t.hash || d(t)) continue;
                const e = U.findOne(t.hash, this._element);
                c(e) && (this._targetLinks.set(t.hash, t), this._observableSections.set(t.hash, e))
            }
        }
        _process(e) { this._activeTarget !== e && (this._clearActiveClass(this._config.target), this._activeTarget = e, e.classList.add(Pt), this._activateParents(e), D.trigger(this._element, "activate.bs.scrollspy", { relatedTarget: e })) }
        _activateParents(e) {
            if (e.classList.contains("dropdown-item")) U.findOne(".dropdown-toggle", e.closest(".dropdown")).classList.add(Pt);
            else
                for (const t of U.parents(e, ".nav, .list-group"))
                    for (const e of U.prev(t, ".nav-link, .nav-item > .nav-link, .list-group-item")) e.classList.add(Pt)
        }
        _clearActiveClass(e) { e.classList.remove(Pt); const t = U.find("[href].active", e); for (const e of t) e.classList.remove(Pt) }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = $t.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
    }
    D.on(window, "load.bs.scrollspy.data-api", () => { for (const e of U.find('[data-bs-spy="scroll"]')) $t.getOrCreateInstance(e) }), v($t);
    const It = "ArrowLeft",
        zt = "ArrowRight",
        Dt = "ArrowUp",
        Nt = "ArrowDown",
        jt = "active",
        Ht = "show",
        Ft = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
        Bt = '.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ' + Ft;
    class Wt extends R {
        constructor(e) { super(e), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), D.on(this._element, "keydown.bs.tab", e => this._keydown(e))) }
        static get NAME() { return "tab" }
        show() {
            const e = this._element;
            if (this._elemIsActive(e)) return;
            const t = this._getActiveElem(),
                s = t ? D.trigger(t, "hide.bs.tab", { relatedTarget: e }) : null;
            D.trigger(e, "show.bs.tab", { relatedTarget: t }).defaultPrevented || s && s.defaultPrevented || (this._deactivate(t, e), this._activate(e, t))
        }
        _activate(e, t) { e && (e.classList.add(jt), this._activate(r(e)), this._queueCallback(() => { "tab" === e.getAttribute("role") ? (e.removeAttribute("tabindex"), e.setAttribute("aria-selected", !0), this._toggleDropDown(e, !0), D.trigger(e, "shown.bs.tab", { relatedTarget: t })) : e.classList.add(Ht) }, e, e.classList.contains("fade"))) }
        _deactivate(e, t) { e && (e.classList.remove(jt), e.blur(), this._deactivate(r(e)), this._queueCallback(() => { "tab" === e.getAttribute("role") ? (e.setAttribute("aria-selected", !1), e.setAttribute("tabindex", "-1"), this._toggleDropDown(e, !1), D.trigger(e, "hidden.bs.tab", { relatedTarget: t })) : e.classList.remove(Ht) }, e, e.classList.contains("fade"))) }
        _keydown(e) {
            if (![It, zt, Dt, Nt].includes(e.key)) return;
            e.stopPropagation(), e.preventDefault();
            const t = [zt, Nt].includes(e.key),
                s = w(this._getChildren().filter(e => !d(e)), e.target, t, !0);
            s && (s.focus({ preventScroll: !0 }), Wt.getOrCreateInstance(s).show())
        }
        _getChildren() { return U.find(Bt, this._parent) }
        _getActiveElem() { return this._getChildren().find(e => this._elemIsActive(e)) || null }
        _setInitialAttributes(e, t) { this._setAttributeIfNotExists(e, "role", "tablist"); for (const e of t) this._setInitialAttributesOnChild(e) }
        _setInitialAttributesOnChild(e) {
            e = this._getInnerElement(e);
            const t = this._elemIsActive(e),
                s = this._getOuterElement(e);
            e.setAttribute("aria-selected", t), s !== e && this._setAttributeIfNotExists(s, "role", "presentation"), t || e.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(e, "role", "tab"), this._setInitialAttributesOnTargetPanel(e)
        }
        _setInitialAttributesOnTargetPanel(e) {
            const t = r(e);
            t && (this._setAttributeIfNotExists(t, "role", "tabpanel"), e.id && this._setAttributeIfNotExists(t, "aria-labelledby", "#" + e.id))
        }
        _toggleDropDown(e, t) {
            const s = this._getOuterElement(e);
            if (!s.classList.contains("dropdown")) return;
            const i = (e, i) => {
                const n = U.findOne(e, s);
                n && n.classList.toggle(i, t)
            };
            i(".dropdown-toggle", jt), i(".dropdown-menu", Ht), s.setAttribute("aria-expanded", t)
        }
        _setAttributeIfNotExists(e, t, s) { e.hasAttribute(t) || e.setAttribute(t, s) }
        _elemIsActive(e) { return e.classList.contains(jt) }
        _getInnerElement(e) { return e.matches(Bt) ? e : U.findOne(Bt, e) }
        _getOuterElement(e) { return e.closest(".nav-item, .list-group-item") || e }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Wt.getOrCreateInstance(this);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e) throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }))
        }
    }
    D.on(document, "click.bs.tab", Ft, (function(e) {
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(), d(this) || Wt.getOrCreateInstance(this).show()
    })), D.on(window, "load.bs.tab", () => { for (const e of U.find('.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]')) Wt.getOrCreateInstance(e) }), v(Wt);
    const qt = "show",
        Rt = "showing",
        Vt = { animation: "boolean", autohide: "boolean", delay: "number" },
        Xt = { animation: !0, autohide: !0, delay: 5e3 };
    class Yt extends R {
        constructor(e, t) { super(e, t), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners() }
        static get Default() { return Xt }
        static get DefaultType() { return Vt }
        static get NAME() { return "toast" }
        show() { D.trigger(this._element, "show.bs.toast").defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove("hide"), h(this._element), this._element.classList.add(qt, Rt), this._queueCallback(() => { this._element.classList.remove(Rt), D.trigger(this._element, "shown.bs.toast"), this._maybeScheduleHide() }, this._element, this._config.animation)) }
        hide() { this.isShown() && (D.trigger(this._element, "hide.bs.toast").defaultPrevented || (this._element.classList.add(Rt), this._queueCallback(() => { this._element.classList.add("hide"), this._element.classList.remove(Rt, qt), D.trigger(this._element, "hidden.bs.toast") }, this._element, this._config.animation))) }
        dispose() { this._clearTimeout(), this.isShown() && this._element.classList.remove(qt), super.dispose() }
        isShown() { return this._element.classList.contains(qt) }
        _maybeScheduleHide() { this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => { this.hide() }, this._config.delay))) }
        _onInteraction(e, t) {
            switch (e.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = t;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = t
            }
            if (t) return void this._clearTimeout();
            const s = e.relatedTarget;
            this._element === s || this._element.contains(s) || this._maybeScheduleHide()
        }
        _setListeners() { D.on(this._element, "mouseover.bs.toast", e => this._onInteraction(e, !0)), D.on(this._element, "mouseout.bs.toast", e => this._onInteraction(e, !1)), D.on(this._element, "focusin.bs.toast", e => this._onInteraction(e, !0)), D.on(this._element, "focusout.bs.toast", e => this._onInteraction(e, !1)) }
        _clearTimeout() { clearTimeout(this._timeout), this._timeout = null }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Yt.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e]) throw new TypeError(`No method named "${e}"`);
                    t[e](this)
                }
            }))
        }
    }
    return V(Yt), v(Yt), { Alert: X, Button: G, Carousel: ce, Collapse: ge, Dropdown: $e, Modal: et, Offcanvas: ot, Popover: kt, ScrollSpy: $t, Tab: Wt, Toast: Yt, Tooltip: Ct }
})),
function(e, t) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else { var s = t(); for (var i in s)("object" == typeof exports ? exports : e)[i] = s[i] }
}(window, (function() {
    return function(e) {
        var t = {};

        function s(i) { if (t[i]) return t[i].exports; var n = t[i] = { i: i, l: !1, exports: {} }; return e[i].call(n.exports, n, n.exports, s), n.l = !0, n.exports }
        return s.m = e, s.c = t, s.d = function(e, t, i) { s.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i }) }, s.r = function(e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, s.t = function(e, t) {
            if (1 & t && (e = s(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var i = Object.create(null);
            if (s.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e)
                for (var n in e) s.d(i, n, function(t) { return e[t] }.bind(null, n));
            return i
        }, s.n = function(e) { var t = e && e.__esModule ? function() { return e.default } : function() { return e }; return s.d(t, "a", t), t }, s.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, s.p = "", s(s.s = 0)
    }([function(e, t, s) {
        "use strict";
        s.r(t);
        var i, n = "fslightbox-",
            r = "".concat(n, "styles"),
            a = "".concat(n, "cursor-grabbing"),
            o = "".concat(n, "full-dimension"),
            l = "".concat(n, "flex-centered"),
            c = "".concat(n, "open"),
            d = "".concat(n, "transform-transition"),
            u = "".concat(n, "absoluted"),
            p = "".concat(n, "slide-btn"),
            h = "".concat(p, "-container"),
            f = "".concat(n, "fade-in"),
            m = "".concat(n, "fade-out"),
            g = f + "-strong",
            v = m + "-strong",
            b = "".concat(n, "opacity-"),
            y = "".concat(b, "1"),
            w = "".concat(n, "source");

        function x(e) { return (x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e })(e) }

        function _(e) {
            var t = e.stageIndexes,
                s = e.core.stageManager,
                i = e.props.sources.length - 1;
            s.getPreviousSlideIndex = function() { return 0 === t.current ? i : t.current - 1 }, s.getNextSlideIndex = function() { return t.current === i ? 0 : t.current + 1 }, s.updateStageIndexes = 0 === i ? function() {} : 1 === i ? function() { 0 === t.current ? (t.next = 1, delete t.previous) : (t.previous = 0, delete t.next) } : function() { t.previous = s.getPreviousSlideIndex(), t.next = s.getNextSlideIndex() }, s.i = i <= 2 ? function() { return !0 } : function(e) { var s = t.current; if (0 === s && e === i || s === i && 0 === e) return !0; var n = s - e; return -1 === n || 0 === n || 1 === n }
        }

        function E(e) {
            var t, s = e.props,
                i = 0,
                n = {};
            this.getSourceTypeFromLocalStorageByUrl = function(e) { return t[e] ? t[e] : r(e) }, this.handleReceivedSourceTypeForUrl = function(e, s) { if (!1 === n[s] && (i--, "invalid" !== e ? n[s] = e : delete n[s], 0 === i)) {! function(e, t) { for (var s in t) e[s] = t[s] }(t, n); try { localStorage.setItem("fslightbox-types", JSON.stringify(t)) } catch (e) {} } };
            var r = function(e) { i++, n[e] = !1 };
            if (s.disableLocalStorage) this.getSourceTypeFromLocalStorageByUrl = function() {}, this.handleReceivedSourceTypeForUrl = function() {};
            else {
                try { t = JSON.parse(localStorage.getItem("fslightbox-types")) } catch (e) {}
                t || (t = {}, this.getSourceTypeFromLocalStorageByUrl = r)
            }
        }

        function T(e, t, s, i) {
            var n = e.data,
                r = e.elements.sources,
                a = s / i,
                o = 0;
            this.adjustSize = function() {
                if ((o = n.maxSourceWidth / a) < n.maxSourceHeight) return s < n.maxSourceWidth && (o = i), l();
                o = i > n.maxSourceHeight ? n.maxSourceHeight : i, l()
            };
            var l = function() { r[t].style.width = o * a + "px", r[t].style.height = o + "px" }
        }

        function C(e, t) {
            var s = this,
                i = e.collections.sourceSizers,
                n = e.elements,
                r = n.sourceAnimationWrappers,
                a = n.sources,
                o = e.isl,
                l = e.resolve;

            function c(e, s) { i[t] = l(T, [t, e, s]), i[t].adjustSize() }
            this.runActions = function(e, i) { o[t] = !0, a[t].classList.add(y), r[t].classList.add(g), r[t].removeChild(r[t].firstChild), c(e, i), s.runActions = c }
        }

        function S(e, t) {
            var s, i = this,
                n = e.elements.sources,
                r = e.props,
                a = (0, e.resolve)(C, [t]);
            this.handleImageLoad = function(e) {
                var t = e.target,
                    s = t.naturalWidth,
                    i = t.naturalHeight;
                a.runActions(s, i)
            }, this.handleVideoLoad = function(e) {
                var t = e.target,
                    i = t.videoWidth,
                    n = t.videoHeight;
                s = !0, a.runActions(i, n)
            }, this.handleNotMetaDatedVideoLoad = function() { s || i.handleYoutubeLoad() }, this.handleYoutubeLoad = function() {
                var e = 1920,
                    t = 1080;
                r.maxYoutubeDimensions && (e = r.maxYoutubeDimensions.width, t = r.maxYoutubeDimensions.height), a.runActions(e, t)
            }, this.handleCustomLoad = function() {
                var e = n[t],
                    s = e.offsetWidth,
                    r = e.offsetHeight;
                s && r ? a.runActions(s, r) : setTimeout(i.handleCustomLoad)
            }
        }

        function M(e, t, s) {
            var i = e.elements.sources,
                n = e.props.customClasses,
                r = n[t] ? n[t] : "";
            i[t].className = s + " " + r
        }

        function k(e, t) {
            var s = e.elements.sources,
                i = e.props.customAttributes;
            for (var n in i[t]) s[t].setAttribute(n, i[t][n])
        }

        function A(e, t) {
            var s = e.collections.sourceLoadHandlers,
                i = e.elements,
                n = i.sources,
                r = i.sourceAnimationWrappers,
                a = e.props.sources;
            n[t] = document.createElement("img"), M(e, t, w), n[t].src = a[t], n[t].onload = s[t].handleImageLoad, k(e, t), r[t].appendChild(n[t])
        }

        function P(e, t) {
            var s = e.collections.sourceLoadHandlers,
                i = e.elements,
                n = i.sources,
                r = i.sourceAnimationWrappers,
                a = e.props,
                o = a.sources,
                l = a.videosPosters;
            n[t] = document.createElement("video"), M(e, t, w), n[t].src = o[t], n[t].onloadedmetadata = function(e) { s[t].handleVideoLoad(e) }, n[t].controls = !0, k(e, t), l[t] && (n[t].poster = l[t]);
            var c = document.createElement("source");
            c.src = o[t], n[t].appendChild(c), setTimeout(s[t].handleNotMetaDatedVideoLoad, 3e3), r[t].appendChild(n[t])
        }

        function O(e, t) {
            var s = e.collections.sourceLoadHandlers,
                i = e.elements,
                r = i.sources,
                a = i.sourceAnimationWrappers,
                o = e.props.sources;
            r[t] = document.createElement("iframe"), M(e, t, "".concat(w, " ").concat(n, "youtube-iframe"));
            var l = o[t],
                c = l.split("?")[1];
            r[t].src = "https://www.youtube.com/embed/".concat(l.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2], "?").concat(c || ""), r[t].allowFullscreen = !0, k(e, t), a[t].appendChild(r[t]), s[t].handleYoutubeLoad()
        }

        function L(e, t) {
            var s = e.collections.sourceLoadHandlers,
                i = e.elements,
                n = i.sources,
                r = i.sourceAnimationWrappers,
                a = e.props.sources;
            n[t] = a[t], M(e, t, "".concat(n[t].className, " ").concat(w)), r[t].appendChild(n[t]), s[t].handleCustomLoad()
        }

        function $(e, t) {
            var s = e.elements,
                i = s.sources,
                r = s.sourceAnimationWrappers;
            e.props.sources, i[t] = document.createElement("div"), i[t].className = "".concat(n, "invalid-file-wrapper ").concat(l), i[t].innerHTML = "Invalid source", r[t].classList.add(g), r[t].removeChild(r[t].firstChild), r[t].appendChild(i[t])
        }

        function I(e) {
            var t = e.collections,
                s = t.sourceLoadHandlers,
                i = t.sourcesRenderFunctions,
                n = e.core.sourceDisplayFacade,
                r = e.resolve;
            this.runActionsForSourceTypeAndIndex = function(t, a) {
                var o;
                switch ("invalid" !== t && (s[a] = r(S, [a])), t) {
                    case "image":
                        o = A;
                        break;
                    case "video":
                        o = P;
                        break;
                    case "youtube":
                        o = O;
                        break;
                    case "custom":
                        o = L;
                        break;
                    default:
                        o = $
                }
                i[a] = function() { return o(e, a) }, n.displaySourcesWhichShouldBeDisplayed()
            }
        }

        function z() {
            var e, t, s, i = function(e) { var t = document.createElement("a"); return t.href = e, "www.youtube.com" === t.hostname || "youtu.be" === t.hostname },
                n = function(e) { return e.slice(0, e.indexOf("/")) };

            function r() {
                if (4 !== s.readyState) {
                    if (2 === s.readyState) {
                        var e;
                        switch (n(s.getResponseHeader("content-type"))) {
                            case "image":
                                e = "image";
                                break;
                            case "video":
                                e = "video";
                                break;
                            default:
                                e = "invalid"
                        }
                        s.onreadystatechange = null, s.abort(), t(e)
                    }
                } else t("invalid")
            }
            this.setUrlToCheck = function(t) { e = t }, this.getSourceType = function(n) {
                if (i(e)) return n("youtube");
                t = n, (s = new XMLHttpRequest).onreadystatechange = r, s.open("GET", e, !0), s.send()
            }
        }

        function D(e, t, s) {
            var i = e.props,
                n = i.types,
                r = i.type,
                a = i.sources,
                o = e.resolve;
            this.getTypeSetByClientForIndex = function(e) { var t; return n && n[e] ? t = n[e] : r && (t = r), t }, this.retrieveTypeWithXhrForIndex = function(e) {
                var i = o(z);
                i.setUrlToCheck(a[e]), i.getSourceType((function(i) { t.handleReceivedSourceTypeForUrl(i, a[e]), s.runActionsForSourceTypeAndIndex(i, e) }))
            }
        }

        function N(e, t) {
            var s = e.core.stageManager,
                i = e.elements,
                n = i.smw,
                r = i.sourceWrappersContainer,
                a = e.props,
                c = 0,
                p = document.createElement("div");

            function h(e) { p.style.transform = "translateX(".concat(e + c, "px)"), c = 0 }

            function f() { return (1 + a.slideDistance) * innerWidth }
            p.className = "".concat(u, " ").concat(o, " ").concat(l), p.s = function() { p.style.display = "flex" }, p.h = function() { p.style.display = "none" }, p.a = function() { p.classList.add(d) }, p.d = function() { p.classList.remove(d) }, p.n = function() { p.style.removeProperty("transform") }, p.v = function(e) { return c = e, p }, p.ne = function() { h(-f()) }, p.z = function() { h(0) }, p.p = function() { h(f()) }, s.i(t) || p.h(), n[t] = p, r.appendChild(p),
                function(e, t) {
                    var s = e.elements,
                        i = s.smw,
                        n = s.sourceAnimationWrappers,
                        r = document.createElement("div"),
                        a = document.createElement("div");
                    a.className = "fslightboxl";
                    for (var o = 0; o < 3; o++) {
                        var l = document.createElement("div");
                        a.appendChild(l)
                    }
                    r.appendChild(a), i[t].appendChild(r), n[t] = r
                }(e, t)
        }

        function j(e, t, s, i) {
            var r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            r.setAttributeNS(null, "width", t), r.setAttributeNS(null, "height", t), r.setAttributeNS(null, "viewBox", s);
            var a = document.createElementNS("http://www.w3.org/2000/svg", "path");
            return a.setAttributeNS(null, "class", "".concat(n, "svg-path")), a.setAttributeNS(null, "d", i), r.appendChild(a), e.appendChild(r), r
        }

        function H(e, t) { var s = document.createElement("div"); return s.className = "".concat(n, "toolbar-button ").concat(l), s.title = t, e.appendChild(s), s }

        function F(e) {
            var t = e.props.sources,
                s = e.elements.container,
                i = document.createElement("div");
            i.className = "".concat(n, "nav"), s.appendChild(i),
                function(e, t) {
                    var s = document.createElement("div");
                    s.className = "".concat(n, "toolbar"), t.appendChild(s),
                        function(e, t) {
                            var s = e.componentsServices,
                                i = e.data,
                                n = e.fs,
                                r = "M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z",
                                a = H(t);
                            a.title = "Enter fullscreen";
                            var o = j(a, "20px", "0 0 18 18", r);
                            s.ofs = function() { i.ifs = !0, a.title = "Exit fullscreen", o.setAttributeNS(null, "width", "24px"), o.setAttributeNS(null, "height", "24px"), o.setAttributeNS(null, "viewBox", "0 0 950 1024"), o.firstChild.setAttributeNS(null, "d", "M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z") }, s.xfs = function() { i.ifs = !1, a.title = "Enter fullscreen", o.setAttributeNS(null, "width", "20px"), o.setAttributeNS(null, "height", "20px"), o.setAttributeNS(null, "viewBox", "0 0 18 18"), o.firstChild.setAttributeNS(null, "d", r) }, a.onclick = n.t
                        }(e, s),
                        function(e, t) {
                            var s = H(t, "Close");
                            s.onclick = e.core.lightboxCloser.closeLightbox, j(s, "20px", "0 0 24 24", "M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z")
                        }(e, s)
                }(e, i), t.length > 1 && function(e, t) {
                    var s = e.componentsServices,
                        i = e.props.sources,
                        r = (e.stageIndexes, document.createElement("div"));
                    r.className = "".concat(n, "slide-number-container");
                    var a = document.createElement("div");
                    a.className = l;
                    var o = document.createElement("span");
                    s.setSlideNumber = function(e) { return o.innerHTML = e };
                    var c = document.createElement("span");
                    c.className = "".concat(n, "slash");
                    var d = document.createElement("div");
                    d.innerHTML = i.length, r.appendChild(a), a.appendChild(o), a.appendChild(c), a.appendChild(d), t.appendChild(r), setTimeout((function() { a.offsetWidth > 55 && (r.style.justifyContent = "flex-start") }))
                }(e, i)
        }

        function B(e, t, s, i) {
            var n = e.elements.container,
                r = s.charAt(0).toUpperCase() + s.slice(1),
                a = document.createElement("div");
            a.className = "".concat(h, " ").concat(h, "-").concat(s), a.title = "".concat(r, " slide"), a.onclick = t,
                function(e, t) {
                    var s = document.createElement("div");
                    s.className = "".concat(p, " ").concat(l), j(s, "20px", "0 0 20 20", t), e.appendChild(s)
                }(a, i), n.appendChild(a)
        }

        function W(e) {
            var t = e.core,
                s = t.lightboxCloser,
                i = t.slideChangeFacade,
                n = e.fs;
            this.listener = function(e) {
                switch (e.key) {
                    case "Escape":
                        s.closeLightbox();
                        break;
                    case "ArrowLeft":
                        i.changeToPrevious();
                        break;
                    case "ArrowRight":
                        i.changeToNext();
                        break;
                    case "F11":
                        e.preventDefault(), n.t()
                }
            }
        }

        function q(e) {
            var t = e.elements,
                s = e.sourcePointerProps,
                i = e.stageIndexes;

            function n(e, i) { t.smw[e].v(s.swipedX)[i]() }
            this.runActionsForEvent = function(e) {
                var r, o, l;
                t.container.contains(t.slideSwipingHoverer) || t.container.appendChild(t.slideSwipingHoverer), r = t.container, o = a, (l = r.classList).contains(o) || l.add(o), s.swipedX = e.screenX - s.downScreenX;
                var c = i.previous,
                    d = i.next;
                n(i.current, "z"), void 0 !== c && s.swipedX > 0 ? n(c, "ne") : void 0 !== d && s.swipedX < 0 && n(d, "p")
            }
        }

        function R(e) {
            var t = e.props.sources,
                s = e.resolve,
                i = e.sourcePointerProps,
                n = s(q);
            1 === t.length ? this.listener = function() { i.swipedX = 1 } : this.listener = function(e) { i.isPointering && n.runActionsForEvent(e) }
        }

        function V(e) {
            var t = e.core.slideIndexChanger,
                s = e.elements.smw,
                i = e.stageIndexes,
                n = e.sws;

            function r(e) {
                var t = s[i.current];
                t.a(), t[e]()
            }

            function a(e, t) { void 0 !== e && (s[e].s(), s[e][t]()) }
            this.runPositiveSwipedXActions = function() {
                var e = i.previous;
                if (void 0 === e) r("z");
                else {
                    r("p");
                    var s = i.next;
                    t.changeTo(e);
                    var o = i.previous;
                    n.d(o), n.b(s), r("z"), a(o, "ne")
                }
            }, this.runNegativeSwipedXActions = function() {
                var e = i.next;
                if (void 0 === e) r("z");
                else {
                    r("ne");
                    var s = i.previous;
                    t.changeTo(e);
                    var o = i.next;
                    n.d(o), n.b(s), r("z"), a(o, "p")
                }
            }
        }

        function X(e, t) { e.contains(t) && e.removeChild(t) }

        function Y(e) {
            var t = e.core.lightboxCloser,
                s = e.elements,
                i = e.resolve,
                n = e.sourcePointerProps,
                r = i(V);
            this.runNoSwipeActions = function() { X(s.container, s.slideSwipingHoverer), n.isSourceDownEventTarget || t.closeLightbox(), n.isPointering = !1 }, this.runActions = function() { n.swipedX > 0 ? r.runPositiveSwipedXActions() : r.runNegativeSwipedXActions(), X(s.container, s.slideSwipingHoverer), s.container.classList.remove(a), n.isPointering = !1 }
        }

        function G(e) {
            var t = e.resolve,
                s = e.sourcePointerProps,
                i = t(Y);
            this.listener = function() { s.isPointering && (s.swipedX ? i.runActions() : i.runNoSwipeActions()) }
        }

        function U(e) {
            var t = this,
                s = e.core,
                i = s.eventsDispatcher,
                n = s.globalEventsController,
                r = s.scrollbarRecompensor,
                a = e.data,
                o = e.elements,
                l = e.fs,
                d = e.props,
                u = e.sourcePointerProps;
            this.isLightboxFadingOut = !1, this.runActions = function() { t.isLightboxFadingOut = !0, o.container.classList.add(v), n.removeListeners(), d.exitFullscreenOnClose && a.ifs && l.x(), setTimeout((function() { t.isLightboxFadingOut = !1, u.isPointering = !1, o.container.classList.remove(v), document.documentElement.classList.remove(c), r.removeRecompense(), document.body.removeChild(o.container), i.dispatch("onClose") }), 270) }
        }

        function K(e, t) {
            var s = e.classList;
            s.contains(t) && s.remove(t)
        }

        function Q(e) {
            var t, s, i;
            s = (t = e).core.eventsDispatcher, i = t.props, s.dispatch = function(e) { i[e] && i[e]() },
                function(e) {
                    var t = e.componentsServices,
                        s = e.data,
                        i = e.fs,
                        n = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"];

                    function r(e) { for (var t = 0; t < n.length; t++) document[e](n[t], a) }

                    function a() { document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement ? t.ofs() : t.xfs() }
                    i.o = function() {
                        t.ofs();
                        var e = document.documentElement;
                        e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen()
                    }, i.x = function() { t.xfs(), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen() }, i.t = function() { s.ifs ? i.x() : i.o() }, i.l = function() { r("addEventListener") }, i.q = function() { r("removeEventListener") }
                }(e),
                function(e) {
                    var t = e.core,
                        s = t.globalEventsController,
                        i = t.windowResizeActioner,
                        n = e.fs,
                        r = e.resolve,
                        a = r(W),
                        o = r(R),
                        l = r(G);
                    s.attachListeners = function() { document.addEventListener("pointermove", o.listener), document.addEventListener("pointerup", l.listener), addEventListener("resize", i.runActions), document.addEventListener("keydown", a.listener), n.l() }, s.removeListeners = function() { document.removeEventListener("pointermove", o.listener), document.removeEventListener("pointerup", l.listener), removeEventListener("resize", i.runActions), document.removeEventListener("keydown", a.listener), n.q() }
                }(e),
                function(e) {
                    var t = e.core.lightboxCloser,
                        s = (0, e.resolve)(U);
                    t.closeLightbox = function() { s.isLightboxFadingOut || s.runActions() }
                }(e),
                function(e) {
                    var t = e.data,
                        s = e.core.scrollbarRecompensor;

                    function i() { document.body.offsetHeight > innerHeight && (document.body.style.marginRight = t.scrollbarWidth + "px") }
                    s.addRecompense = function() { "complete" === document.readyState ? i() : addEventListener("load", (function() { i(), s.addRecompense = i })) }, s.removeRecompense = function() { document.body.style.removeProperty("margin-right") }
                }(e),
                function(e) {
                    var t = e.core,
                        s = t.slideChangeFacade,
                        i = t.slideIndexChanger,
                        n = t.stageManager;
                    e.props.sources.length > 1 ? (s.changeToPrevious = function() { i.jumpTo(n.getPreviousSlideIndex()) }, s.changeToNext = function() { i.jumpTo(n.getNextSlideIndex()) }) : (s.changeToPrevious = function() {}, s.changeToNext = function() {})
                }(e),
                function(e) {
                    var t = e.componentsServices,
                        s = e.core,
                        i = s.slideIndexChanger,
                        n = s.sourceDisplayFacade,
                        r = s.stageManager,
                        a = e.elements,
                        o = a.smw,
                        l = a.sourceAnimationWrappers,
                        c = e.isl,
                        d = e.stageIndexes,
                        u = e.sws;
                    i.changeTo = function(e) { d.current = e, r.updateStageIndexes(), t.setSlideNumber(e + 1), n.displaySourcesWhichShouldBeDisplayed() }, i.jumpTo = function(e) {
                        var t = d.previous,
                            s = d.current,
                            n = d.next,
                            a = c[s],
                            p = c[e];
                        i.changeTo(e);
                        for (var h = 0; h < o.length; h++) o[h].d();
                        u.d(s), u.c(), requestAnimationFrame((function() {
                            requestAnimationFrame((function() {
                                var e = d.previous,
                                    i = d.next;

                                function h() { r.i(s) ? s === d.previous ? o[s].ne() : s === d.next && o[s].p() : (o[s].h(), o[s].n()) }
                                a && l[s].classList.add(m), p && l[d.current].classList.add(f), u.a(), void 0 !== e && e !== s && o[e].ne(), o[d.current].n(), void 0 !== i && i !== s && o[i].p(), u.b(t), u.b(n), c[s] ? setTimeout(h, 260) : h()
                            }))
                        }))
                    }
                }(e),
                function(e) {
                    var t = e.core.sourcesPointerDown,
                        s = e.elements,
                        i = s.smw,
                        n = s.sources,
                        r = e.sourcePointerProps,
                        a = e.stageIndexes;
                    t.listener = function(e) {
                        "VIDEO" !== e.target.tagName && e.preventDefault(), r.isPointering = !0, r.downScreenX = e.screenX, r.swipedX = 0;
                        var t = n[a.current];
                        t && t.contains(e.target) ? r.isSourceDownEventTarget = !0 : r.isSourceDownEventTarget = !1;
                        for (var s = 0; s < i.length; s++) i[s].d()
                    }
                }(e),
                function(e) {
                    var t = e.collections.sourcesRenderFunctions,
                        s = e.core.sourceDisplayFacade,
                        i = e.props,
                        n = e.stageIndexes;

                    function r(e) { t[e] && (t[e](), delete t[e]) }
                    s.displaySourcesWhichShouldBeDisplayed = function() {
                        if (i.loadOnlyCurrentSource) r(n.current);
                        else
                            for (var e in n) r(n[e])
                    }
                }(e),
                function(e) {
                    var t = e.core.stageManager,
                        s = e.elements,
                        i = s.smw,
                        n = s.sourceAnimationWrappers,
                        r = e.isl,
                        a = e.stageIndexes,
                        o = e.sws;
                    o.a = function() { for (var e in a) i[a[e]].s() }, o.b = function(e) { void 0 === e || t.i(e) || (i[e].h(), i[e].n()) }, o.c = function() { for (var e in a) o.d(a[e]) }, o.d = function(e) {
                        if (r[e]) {
                            var t = n[e];
                            K(t, g), K(t, f), K(t, m)
                        }
                    }
                }(e),
                function(e) {
                    var t = e.collections.sourceSizers,
                        s = e.core.windowResizeActioner,
                        i = e.data,
                        n = e.elements.smw,
                        r = e.stageIndexes;
                    s.runActions = function() {
                        innerWidth < 992 ? i.maxSourceWidth = innerWidth : i.maxSourceWidth = .9 * innerWidth, i.maxSourceHeight = .9 * innerHeight;
                        for (var e = 0; e < n.length; e++) n[e].d(), t[e] && t[e].adjustSize();
                        var s = r.previous,
                            a = r.next;
                        void 0 !== s && n[s].ne(), void 0 !== a && n[a].p()
                    }
                }(e)
        }

        function Z(e, t, s) {
            return (Z = J() ? Reflect.construct.bind() : function(e, t, s) {
                var i = [null];
                i.push.apply(i, t);
                var n = new(Function.bind.apply(e, i));
                return s && ee(n, s.prototype), n
            }).apply(null, arguments)
        }

        function J() { if ("undefined" == typeof Reflect || !Reflect.construct) return !1; if (Reflect.construct.sham) return !1; if ("function" == typeof Proxy) return !0; try { return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0 } catch (e) { return !1 } }

        function ee(e, t) { return (ee = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) { return e.__proto__ = t, e })(e, t) }

        function te(e) { return function(e) { if (Array.isArray(e)) return se(e) }(e) || function(e) { if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e) }(e) || function(e, t) { if (e) { if ("string" == typeof e) return se(e, t); var s = Object.prototype.toString.call(e).slice(8, -1); return "Object" === s && e.constructor && (s = e.constructor.name), "Map" === s || "Set" === s ? Array.from(e) : "Arguments" === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? se(e, t) : void 0 } }(e) || function() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }() }

        function se(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var s = 0, i = new Array(t); s < t; s++) i[s] = e[s];
            return i
        }

        function ie() {
            for (var e = document.getElementsByTagName("a"), t = function(t) {
                    if (!e[t].hasAttribute("data-fslightbox")) return "continue";
                    var s = e[t].hasAttribute("data-href") ? e[t].getAttribute("data-href") : e[t].getAttribute("href");
                    if (!s) return console.warn('The "data-fslightbox" attribute was set without the "href" attribute.'), "continue";
                    var i = e[t].getAttribute("data-fslightbox");
                    fsLightboxInstances[i] || (fsLightboxInstances[i] = new FsLightbox);
                    var n = null;
                    "#" === s.charAt(0) ? (n = document.getElementById(s.substring(1)).cloneNode(!0)).removeAttribute("id") : n = s, fsLightboxInstances[i].props.sources.push(n), fsLightboxInstances[i].elements.a.push(e[t]);
                    var r = fsLightboxInstances[i].props.sources.length - 1;
                    e[t].onclick = function(e) { e.preventDefault(), fsLightboxInstances[i].open(r) }, u("types", "data-type"), u("videosPosters", "data-video-poster"), u("customClasses", "data-class"), u("customClasses", "data-custom-class");
                    for (var a = ["href", "data-fslightbox", "data-href", "data-type", "data-video-poster", "data-class", "data-custom-class"], o = e[t].attributes, l = fsLightboxInstances[i].props.customAttributes, c = 0; c < o.length; c++)
                        if (-1 === a.indexOf(o[c].name) && "data-" === o[c].name.substr(0, 5)) {
                            l[r] || (l[r] = {});
                            var d = o[c].name.substr(5);
                            l[r][d] = o[c].value
                        }

                    function u(s, n) { e[t].hasAttribute(n) && (fsLightboxInstances[i].props[s][r] = e[t].getAttribute(n)) }
                }, s = 0; s < e.length; s++) t(s);
            var i = Object.keys(fsLightboxInstances);
            window.fsLightbox = fsLightboxInstances[i[i.length - 1]]
        }
        "object" === ("undefined" == typeof document ? "undefined" : x(document)) && ((i = document.createElement("style")).className = r, i.appendChild(document.createTextNode(".fslightbox-absoluted{position:absolute;top:0;left:0}.fslightbox-fade-in{animation:fslightbox-fade-in .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out{animation:fslightbox-fade-out .3s ease}.fslightbox-fade-in-strong{animation:fslightbox-fade-in-strong .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out-strong{animation:fslightbox-fade-out-strong .3s ease}@keyframes fslightbox-fade-in{from{opacity:.65}to{opacity:1}}@keyframes fslightbox-fade-out{from{opacity:.35}to{opacity:0}}@keyframes fslightbox-fade-in-strong{from{opacity:.3}to{opacity:1}}@keyframes fslightbox-fade-out-strong{from{opacity:1}to{opacity:0}}.fslightbox-cursor-grabbing{cursor:grabbing}.fslightbox-full-dimension{width:100%;height:100%}.fslightbox-open{overflow:hidden;height:100%}.fslightbox-flex-centered{display:flex;justify-content:center;align-items:center}.fslightbox-opacity-0{opacity:0!important}.fslightbox-opacity-1{opacity:1!important}.fslightbox-scrollbarfix{padding-right:17px}.fslightbox-transform-transition{transition:transform .3s}.fslightbox-container{font-family:Arial,sans-serif;position:fixed;top:0;left:0;background:linear-gradient(rgba(30,30,30,.9),#000 1810%);touch-action:pinch-zoom;z-index:1000000000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.fslightbox-container *{box-sizing:border-box}.fslightbox-svg-path{transition:fill .15s ease;fill:#ddd}.fslightbox-nav{height:45px;width:100%;position:absolute;top:0;left:0}.fslightbox-slide-number-container{display:flex;justify-content:center;align-items:center;position:relative;height:100%;font-size:15px;color:#d7d7d7;z-index:0;max-width:55px;text-align:left}.fslightbox-slide-number-container .fslightbox-flex-centered{height:100%}.fslightbox-slash{display:block;margin:0 5px;width:1px;height:12px;transform:rotate(15deg);background:#fff}.fslightbox-toolbar{position:absolute;z-index:3;right:0;top:0;height:100%;display:flex;background:rgba(35,35,35,.65)}.fslightbox-toolbar-button{height:100%;width:45px;cursor:pointer}.fslightbox-toolbar-button:hover .fslightbox-svg-path{fill:#fff}.fslightbox-slide-btn-container{display:flex;align-items:center;padding:12px 12px 12px 6px;position:absolute;top:50%;cursor:pointer;z-index:3;transform:translateY(-50%)}@media (min-width:476px){.fslightbox-slide-btn-container{padding:22px 22px 22px 6px}}@media (min-width:768px){.fslightbox-slide-btn-container{padding:30px 30px 30px 6px}}.fslightbox-slide-btn-container:hover .fslightbox-svg-path{fill:#f1f1f1}.fslightbox-slide-btn{padding:9px;font-size:26px;background:rgba(35,35,35,.65)}@media (min-width:768px){.fslightbox-slide-btn{padding:10px}}@media (min-width:1600px){.fslightbox-slide-btn{padding:11px}}.fslightbox-slide-btn-container-previous{left:0}@media (max-width:475.99px){.fslightbox-slide-btn-container-previous{padding-left:3px}}.fslightbox-slide-btn-container-next{right:0;padding-left:12px;padding-right:3px}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-left:22px}}@media (min-width:768px){.fslightbox-slide-btn-container-next{padding-left:30px}}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-right:6px}}.fslightbox-down-event-detector{position:absolute;z-index:1}.fslightbox-slide-swiping-hoverer{z-index:4}.fslightbox-invalid-file-wrapper{font-size:22px;color:#eaebeb;margin:auto}.fslightbox-video{object-fit:cover}.fslightbox-youtube-iframe{border:0}.fslightboxl{display:block;margin:auto;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:67px;height:67px}.fslightboxl div{box-sizing:border-box;display:block;position:absolute;width:54px;height:54px;margin:6px;border:5px solid;border-color:#999 transparent transparent transparent;border-radius:50%;animation:fslightboxl 1.2s cubic-bezier(.5,0,.5,1) infinite}.fslightboxl div:nth-child(1){animation-delay:-.45s}.fslightboxl div:nth-child(2){animation-delay:-.3s}.fslightboxl div:nth-child(3){animation-delay:-.15s}@keyframes fslightboxl{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.fslightbox-source{position:relative;z-index:2;opacity:0}")), document.head.appendChild(i)), window.FsLightbox = function() {
            var e = this;
            this.props = { sources: [], customAttributes: [], customClasses: [], types: [], videosPosters: [], slideDistance: .3 }, this.data = { isFullscreenOpen: !1, maxSourceWidth: 0, maxSourceHeight: 0, scrollbarWidth: 0 }, this.isl = [], this.sourcePointerProps = { downScreenX: null, isPointering: !1, isSourceDownEventTarget: !1, swipedX: 0 }, this.stageIndexes = {}, this.elements = { a: [], container: null, slideSwipingHoverer: null, smw: [], sourceWrappersContainer: null, sources: [], sourceAnimationWrappers: [] }, this.componentsServices = { setSlideNumber: function() {} }, this.resolve = function(t) { var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []; return s.unshift(e), Z(t, te(s)) }, this.collections = { sourceLoadHandlers: [], sourcesRenderFunctions: [], sourceSizers: [] }, this.core = { eventsDispatcher: {}, globalEventsController: {}, lightboxCloser: {}, lightboxUpdater: {}, scrollbarRecompensor: {}, slideChangeFacade: {}, slideIndexChanger: {}, sourcesPointerDown: {}, sourceDisplayFacade: {}, stageManager: {}, windowResizeActioner: {} }, this.fs = {}, this.sws = {},
                function(e) {
                    var t = e.componentsServices,
                        s = e.core,
                        i = s.eventsDispatcher,
                        r = s.globalEventsController,
                        a = s.scrollbarRecompensor,
                        l = s.sourceDisplayFacade,
                        d = s.stageManager,
                        p = s.windowResizeActioner,
                        h = e.data,
                        f = e.elements,
                        m = (e.props, e.stageIndexes),
                        v = e.sws;

                    function b() {
                        var t, s;
                        h.i = !0, h.scrollbarWidth = function() {
                                var e = document.createElement("div"),
                                    t = e.style,
                                    s = document.createElement("div");
                                t.visibility = "hidden", t.width = "100px", t.msOverflowStyle = "scrollbar", t.overflow = "scroll", s.style.width = "100%", document.body.appendChild(e);
                                var i = e.offsetWidth;
                                e.appendChild(s);
                                var n = s.offsetWidth;
                                return document.body.removeChild(e), i - n
                            }(), Q(e), f.container = document.createElement("div"), f.container.className = "".concat(n, "container ").concat(o, " ").concat(g),
                            function(e) {
                                var t = e.elements;
                                t.slideSwipingHoverer = document.createElement("div"), t.slideSwipingHoverer.className = "".concat(n, "slide-swiping-hoverer ").concat(o, " ").concat(u)
                            }(e), F(e),
                            function(e) {
                                var t = e.core.sourcesPointerDown,
                                    s = e.elements,
                                    i = e.props.sources,
                                    n = document.createElement("div");
                                n.className = "".concat(u, " ").concat(o), s.container.appendChild(n), n.addEventListener("pointerdown", t.listener), s.sourceWrappersContainer = n;
                                for (var r = 0; r < i.length; r++) N(e, r)
                            }(e), e.props.sources.length > 1 && (s = (t = e).core.slideChangeFacade, B(t, s.changeToPrevious, "previous", "M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z"), B(t, s.changeToNext, "next", "M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z")),
                            function(e) {
                                for (var t = e.props.sources, s = e.resolve, i = s(E), n = s(I), r = s(D, [i, n]), a = 0; a < t.length; a++)
                                    if ("string" == typeof t[a]) {
                                        var o = r.getTypeSetByClientForIndex(a);
                                        if (o) n.runActionsForSourceTypeAndIndex(o, a);
                                        else {
                                            var l = i.getSourceTypeFromLocalStorageByUrl(t[a]);
                                            l ? n.runActionsForSourceTypeAndIndex(l, a) : r.retrieveTypeWithXhrForIndex(a)
                                        }
                                    } else n.runActionsForSourceTypeAndIndex("custom", a)
                            }(e), i.dispatch("onInit")
                    }
                    e.open = function() {
                        var s = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            n = m.previous,
                            o = m.current,
                            u = m.next;
                        m.current = s, h.i || _(e), d.updateStageIndexes(), h.i ? (v.c(), v.a(), v.b(n), v.b(o), v.b(u), i.dispatch("onShow")) : b(), l.displaySourcesWhichShouldBeDisplayed(), t.setSlideNumber(s + 1), document.body.appendChild(f.container), document.documentElement.classList.add(c), a.addRecompense(), r.attachListeners(), p.runActions(), f.smw[m.current].n(), i.dispatch("onOpen")
                    }
                }(this), this.close = function() { return e.core.lightboxCloser.closeLightbox() }
        }, window.fsLightboxInstances = {}, ie(), window.refreshFsLightbox = function() {
            for (var e in fsLightboxInstances) {
                var t = fsLightboxInstances[e].props;
                fsLightboxInstances[e] = new FsLightbox, fsLightboxInstances[e].props = t, fsLightboxInstances[e].props.sources = [], fsLightboxInstances[e].elements.a = []
            }
            ie()
        }
    }])
})),
function(e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t() }(this, (function() {
    "use strict";

    function e(e) { return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object }

    function t(s, i) { void 0 === s && (s = {}), void 0 === i && (i = {}), Object.keys(i).forEach(n => { void 0 === s[n] ? s[n] = i[n] : e(i[n]) && e(s[n]) && Object.keys(i[n]).length > 0 && t(s[n], i[n]) }) }
    const s = { body: {}, addEventListener() {}, removeEventListener() {}, activeElement: { blur() {}, nodeName: "" }, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, createEvent: () => ({ initEvent() {} }), createElement: () => ({ children: [], childNodes: [], style: {}, setAttribute() {}, getElementsByTagName: () => [] }), createElementNS: () => ({}), importNode: () => null, location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" } };

    function i() { const e = "undefined" != typeof document ? document : {}; return t(e, s), e }
    const n = { document: s, navigator: { userAgent: "" }, location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" }, history: { replaceState() {}, pushState() {}, go() {}, back() {} }, CustomEvent: function() { return this }, addEventListener() {}, removeEventListener() {}, getComputedStyle: () => ({ getPropertyValue: () => "" }), Image() {}, Date() {}, screen: {}, setTimeout() {}, clearTimeout() {}, matchMedia: () => ({}), requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0), cancelAnimationFrame(e) { "undefined" != typeof setTimeout && clearTimeout(e) } };

    function r() { const e = "undefined" != typeof window ? window : {}; return t(e, n), e }
    class a extends Array {
        constructor(e) {
            "number" == typeof e ? super(e) : (super(...e || []), function(e) {
                const t = e.__proto__;
                Object.defineProperty(e, "__proto__", { get: () => t, set(e) { t.__proto__ = e } })
            }(this))
        }
    }

    function o(e) { void 0 === e && (e = []); const t = []; return e.forEach(e => { Array.isArray(e) ? t.push(...o(e)) : t.push(e) }), t }

    function l(e, t) { return Array.prototype.filter.call(e, t) }

    function c(e, t) {
        const s = r(),
            n = i();
        let o = [];
        if (!t && e instanceof a) return e;
        if (!e) return new a(o);
        if ("string" == typeof e) {
            const s = e.trim();
            if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
                let e = "div";
                0 === s.indexOf("<li") && (e = "ul"), 0 === s.indexOf("<tr") && (e = "tbody"), 0 !== s.indexOf("<td") && 0 !== s.indexOf("<th") || (e = "tr"), 0 === s.indexOf("<tbody") && (e = "table"), 0 === s.indexOf("<option") && (e = "select");
                const t = n.createElement(e);
                t.innerHTML = s;
                for (let e = 0; e < t.childNodes.length; e += 1) o.push(t.childNodes[e])
            } else o = function(e, t) {
                if ("string" != typeof e) return [e];
                const s = [],
                    i = t.querySelectorAll(e);
                for (let e = 0; e < i.length; e += 1) s.push(i[e]);
                return s
            }(e.trim(), t || n)
        } else if (e.nodeType || e === s || e === n) o.push(e);
        else if (Array.isArray(e)) {
            if (e instanceof a) return e;
            o = e
        }
        return new a(function(e) { const t = []; for (let s = 0; s < e.length; s += 1) - 1 === t.indexOf(e[s]) && t.push(e[s]); return t }(o))
    }
    c.fn = a.prototype;
    const d = {
        addClass: function() { for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s]; const i = o(t.map(e => e.split(" "))); return this.forEach(e => { e.classList.add(...i) }), this },
        removeClass: function() { for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s]; const i = o(t.map(e => e.split(" "))); return this.forEach(e => { e.classList.remove(...i) }), this },
        hasClass: function() { for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s]; const i = o(t.map(e => e.split(" "))); return l(this, e => i.filter(t => e.classList.contains(t)).length > 0).length > 0 },
        toggleClass: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            const i = o(t.map(e => e.split(" ")));
            this.forEach(e => { i.forEach(t => { e.classList.toggle(t) }) })
        },
        attr: function(e, t) {
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (let s = 0; s < this.length; s += 1)
                if (2 === arguments.length) this[s].setAttribute(e, t);
                else
                    for (const t in e) this[s][t] = e[t], this[s].setAttribute(t, e[t]);
            return this
        },
        removeAttr: function(e) { for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e); return this },
        transform: function(e) { for (let t = 0; t < this.length; t += 1) this[t].style.transform = e; return this },
        transition: function(e) { for (let t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? e + "ms" : e; return this },
        on: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            let [i, n, r, a] = t;

            function o(e) {
                const t = e.target;
                if (!t) return;
                const s = e.target.dom7EventData || [];
                if (s.indexOf(e) < 0 && s.unshift(e), c(t).is(n)) r.apply(t, s);
                else { const e = c(t).parents(); for (let t = 0; t < e.length; t += 1) c(e[t]).is(n) && r.apply(e[t], s) }
            }

            function l(e) {
                const t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t)
            }
            "function" == typeof t[1] && ([i, r, a] = t, n = void 0), a || (a = !1);
            const d = i.split(" ");
            let u;
            for (let e = 0; e < this.length; e += 1) {
                const t = this[e];
                if (n)
                    for (u = 0; u < d.length; u += 1) {
                        const e = d[u];
                        t.dom7LiveListeners || (t.dom7LiveListeners = {}), t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []), t.dom7LiveListeners[e].push({ listener: r, proxyListener: o }), t.addEventListener(e, o, a)
                    } else
                        for (u = 0; u < d.length; u += 1) {
                            const e = d[u];
                            t.dom7Listeners || (t.dom7Listeners = {}), t.dom7Listeners[e] || (t.dom7Listeners[e] = []), t.dom7Listeners[e].push({ listener: r, proxyListener: l }), t.addEventListener(e, l, a)
                        }
            }
            return this
        },
        off: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            let [i, n, r, a] = t;
            "function" == typeof t[1] && ([i, r, a] = t, n = void 0), a || (a = !1);
            const o = i.split(" ");
            for (let e = 0; e < o.length; e += 1) {
                const t = o[e];
                for (let e = 0; e < this.length; e += 1) {
                    const s = this[e];
                    let i;
                    if (!n && s.dom7Listeners ? i = s.dom7Listeners[t] : n && s.dom7LiveListeners && (i = s.dom7LiveListeners[t]), i && i.length)
                        for (let e = i.length - 1; e >= 0; e -= 1) {
                            const n = i[e];
                            r && n.listener === r || r && n.listener && n.listener.dom7proxy && n.listener.dom7proxy === r ? (s.removeEventListener(t, n.proxyListener, a), i.splice(e, 1)) : r || (s.removeEventListener(t, n.proxyListener, a), i.splice(e, 1))
                        }
                }
            }
            return this
        },
        trigger: function() {
            const e = r();
            for (var t = arguments.length, s = new Array(t), i = 0; i < t; i++) s[i] = arguments[i];
            const n = s[0].split(" "),
                a = s[1];
            for (let t = 0; t < n.length; t += 1) {
                const i = n[t];
                for (let t = 0; t < this.length; t += 1) {
                    const n = this[t];
                    if (e.CustomEvent) {
                        const t = new e.CustomEvent(i, { detail: a, bubbles: !0, cancelable: !0 });
                        n.dom7EventData = s.filter((e, t) => t > 0), n.dispatchEvent(t), n.dom7EventData = [], delete n.dom7EventData
                    }
                }
            }
            return this
        },
        transitionEnd: function(e) { const t = this; return e && t.on("transitionend", (function s(i) { i.target === this && (e.call(this, i), t.off("transitionend", s)) })), this },
        outerWidth: function(e) { if (this.length > 0) { if (e) { const e = this.styles(); return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left")) } return this[0].offsetWidth } return null },
        outerHeight: function(e) { if (this.length > 0) { if (e) { const e = this.styles(); return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom")) } return this[0].offsetHeight } return null },
        styles: function() { const e = r(); return this[0] ? e.getComputedStyle(this[0], null) : {} },
        offset: function() {
            if (this.length > 0) {
                const e = r(),
                    t = i(),
                    s = this[0],
                    n = s.getBoundingClientRect(),
                    a = t.body,
                    o = s.clientTop || a.clientTop || 0,
                    l = s.clientLeft || a.clientLeft || 0,
                    c = s === e ? e.scrollY : s.scrollTop,
                    d = s === e ? e.scrollX : s.scrollLeft;
                return { top: n.top + c - o, left: n.left + d - l }
            }
            return null
        },
        css: function(e, t) {
            const s = r();
            let i;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (i = 0; i < this.length; i += 1)
                        for (const t in e) this[i].style[t] = e[t];
                    return this
                }
                if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) { for (i = 0; i < this.length; i += 1) this[i].style[e] = t; return this }
            return this
        },
        each: function(e) { return e ? (this.forEach((t, s) => { e.apply(t, [t, s]) }), this) : this },
        html: function(e) { if (void 0 === e) return this[0] ? this[0].innerHTML : null; for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e; return this },
        text: function(e) { if (void 0 === e) return this[0] ? this[0].textContent.trim() : null; for (let t = 0; t < this.length; t += 1) this[t].textContent = e; return this },
        is: function(e) {
            const t = r(),
                s = i(),
                n = this[0];
            let o, l;
            if (!n || void 0 === e) return !1;
            if ("string" == typeof e) {
                if (n.matches) return n.matches(e);
                if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
                if (n.msMatchesSelector) return n.msMatchesSelector(e);
                for (o = c(e), l = 0; l < o.length; l += 1)
                    if (o[l] === n) return !0;
                return !1
            }
            if (e === s) return n === s;
            if (e === t) return n === t;
            if (e.nodeType || e instanceof a) {
                for (o = e.nodeType ? [e] : e, l = 0; l < o.length; l += 1)
                    if (o[l] === n) return !0;
                return !1
            }
            return !1
        },
        index: function() { let e, t = this[0]; if (t) { for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1); return e } },
        eq: function(e) { if (void 0 === e) return this; const t = this.length; if (e > t - 1) return c([]); if (e < 0) { const s = t + e; return c(s < 0 ? [] : [this[s]]) } return c([this[e]]) },
        append: function() {
            let e;
            const t = i();
            for (let s = 0; s < arguments.length; s += 1) {
                e = s < 0 || arguments.length <= s ? void 0 : arguments[s];
                for (let s = 0; s < this.length; s += 1)
                    if ("string" == typeof e) { const i = t.createElement("div"); for (i.innerHTML = e; i.firstChild;) this[s].appendChild(i.firstChild) } else if (e instanceof a)
                    for (let t = 0; t < e.length; t += 1) this[s].appendChild(e[t]);
                else this[s].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            const t = i();
            let s, n;
            for (s = 0; s < this.length; s += 1)
                if ("string" == typeof e) { const i = t.createElement("div"); for (i.innerHTML = e, n = i.childNodes.length - 1; n >= 0; n -= 1) this[s].insertBefore(i.childNodes[n], this[s].childNodes[0]) } else if (e instanceof a)
                for (n = 0; n < e.length; n += 1) this[s].insertBefore(e[n], this[s].childNodes[0]);
            else this[s].insertBefore(e, this[s].childNodes[0]);
            return this
        },
        next: function(e) { return this.length > 0 ? e ? this[0].nextElementSibling && c(this[0].nextElementSibling).is(e) ? c([this[0].nextElementSibling]) : c([]) : this[0].nextElementSibling ? c([this[0].nextElementSibling]) : c([]) : c([]) },
        nextAll: function(e) {
            const t = [];
            let s = this[0];
            if (!s) return c([]);
            for (; s.nextElementSibling;) {
                const i = s.nextElementSibling;
                e ? c(i).is(e) && t.push(i) : t.push(i), s = i
            }
            return c(t)
        },
        prev: function(e) { if (this.length > 0) { const t = this[0]; return e ? t.previousElementSibling && c(t.previousElementSibling).is(e) ? c([t.previousElementSibling]) : c([]) : t.previousElementSibling ? c([t.previousElementSibling]) : c([]) } return c([]) },
        prevAll: function(e) {
            const t = [];
            let s = this[0];
            if (!s) return c([]);
            for (; s.previousElementSibling;) {
                const i = s.previousElementSibling;
                e ? c(i).is(e) && t.push(i) : t.push(i), s = i
            }
            return c(t)
        },
        parent: function(e) { const t = []; for (let s = 0; s < this.length; s += 1) null !== this[s].parentNode && (e ? c(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode)); return c(t) },
        parents: function(e) { const t = []; for (let s = 0; s < this.length; s += 1) { let i = this[s].parentNode; for (; i;) e ? c(i).is(e) && t.push(i) : t.push(i), i = i.parentNode } return c(t) },
        closest: function(e) { let t = this; return void 0 === e ? c([]) : (t.is(e) || (t = t.parents(e).eq(0)), t) },
        find: function(e) { const t = []; for (let s = 0; s < this.length; s += 1) { const i = this[s].querySelectorAll(e); for (let e = 0; e < i.length; e += 1) t.push(i[e]) } return c(t) },
        children: function(e) { const t = []; for (let s = 0; s < this.length; s += 1) { const i = this[s].children; for (let s = 0; s < i.length; s += 1) e && !c(i[s]).is(e) || t.push(i[s]) } return c(t) },
        filter: function(e) { return c(l(this, e)) },
        remove: function() { for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]); return this }
    };

    function u(e, t) { return void 0 === t && (t = 0), setTimeout(e, t) }

    function p() { return Date.now() }

    function h(e, t) { void 0 === t && (t = "x"); const s = r(); let i, n, a; const o = function(e) { const t = r(); let s; return t.getComputedStyle && (s = t.getComputedStyle(e, null)), !s && e.currentStyle && (s = e.currentStyle), s || (s = e.style), s }(e); return s.WebKitCSSMatrix ? (n = o.transform || o.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map(e => e.replace(",", ".")).join(", ")), a = new s.WebKitCSSMatrix("none" === n ? "" : n)) : (a = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = a.toString().split(",")), "x" === t && (n = s.WebKitCSSMatrix ? a.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (n = s.WebKitCSSMatrix ? a.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), n || 0 }

    function f(e) { return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1) }

    function m(e) { return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType) }

    function g() {
        const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
            t = ["__proto__", "constructor", "prototype"];
        for (let s = 1; s < arguments.length; s += 1) {
            const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
            if (null != i && !m(i)) {
                const s = Object.keys(Object(i)).filter(e => t.indexOf(e) < 0);
                for (let t = 0, n = s.length; t < n; t += 1) {
                    const n = s[t],
                        r = Object.getOwnPropertyDescriptor(i, n);
                    void 0 !== r && r.enumerable && (f(e[n]) && f(i[n]) ? i[n].__swiper__ ? e[n] = i[n] : g(e[n], i[n]) : !f(e[n]) && f(i[n]) ? (e[n] = {}, i[n].__swiper__ ? e[n] = i[n] : g(e[n], i[n])) : e[n] = i[n])
                }
            }
        }
        return e
    }

    function v(e, t, s) { e.style.setProperty(t, s) }

    function b(e) {
        let { swiper: t, targetPosition: s, side: i } = e;
        const n = r(),
            a = -t.translate;
        let o, l = null;
        const c = t.params.speed;
        t.wrapperEl.style.scrollSnapType = "none", n.cancelAnimationFrame(t.cssModeFrameID);
        const d = s > a ? "next" : "prev",
            u = (e, t) => "next" === d && e >= t || "prev" === d && e <= t,
            p = () => {
                o = (new Date).getTime(), null === l && (l = o);
                const e = Math.max(Math.min((o - l) / c, 1), 0),
                    r = .5 - Math.cos(e * Math.PI) / 2;
                let d = a + r * (s - a);
                if (u(d, s) && (d = s), t.wrapperEl.scrollTo({
                        [i]: d
                    }), u(d, s)) return t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
                    t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({
                        [i]: d
                    })
                }), void n.cancelAnimationFrame(t.cssModeFrameID);
                t.cssModeFrameID = n.requestAnimationFrame(p)
            };
        p()
    }
    let y, w, x;

    function _() {
        return y || (y = function() {
            const e = r(),
                t = i();
            return {
                smoothScroll: t.documentElement && "scrollBehavior" in t.documentElement.style,
                touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch),
                passiveListener: function() {
                    let t = !1;
                    try {
                        const s = Object.defineProperty({}, "passive", {get() { t = !0 } });
                        e.addEventListener("testPassiveListener", null, s)
                    } catch (e) {}
                    return t
                }(),
                gestures: "ongesturestart" in e
            }
        }()), y
    }

    function E(e) {
        return void 0 === e && (e = {}), w || (w = function(e) {
            let { userAgent: t } = void 0 === e ? {} : e;
            const s = _(),
                i = r(),
                n = i.navigator.platform,
                a = t || i.navigator.userAgent,
                o = { ios: !1, android: !1 },
                l = i.screen.width,
                c = i.screen.height,
                d = a.match(/(Android);?[\s\/]+([\d.]+)?/);
            let u = a.match(/(iPad).*OS\s([\d_]+)/);
            const p = a.match(/(iPod)(.*OS\s([\d_]+))?/),
                h = !u && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                f = "Win32" === n;
            let m = "MacIntel" === n;
            return !u && m && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${l}x${c}`) >= 0 && (u = a.match(/(Version)\/([\d.]+)/), u || (u = [0, 1, "13_0_0"]), m = !1), d && !f && (o.os = "android", o.android = !0), (u || h || p) && (o.os = "ios", o.ios = !0), o
        }(e)), w
    }

    function T() { return x || (x = function() { const e = r(); return { isSafari: function() { const t = e.navigator.userAgent.toLowerCase(); return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0 }(), isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent) } }()), x }

    function C(e) {
        let { swiper: t, runCallbacks: s, direction: i, step: n } = e;
        const { activeIndex: r, previousIndex: a } = t;
        let o = i;
        if (o || (o = r > a ? "next" : r < a ? "prev" : "reset"), t.emit("transition" + n), s && r !== a) {
            if ("reset" === o) return void t.emit("slideResetTransition" + n);
            t.emit("slideChangeTransition" + n), "next" === o ? t.emit("slideNextTransition" + n) : t.emit("slidePrevTransition" + n)
        }
    }

    function S(e) {
        const t = this,
            s = i(),
            n = r(),
            a = t.touchEventsData,
            { params: o, touches: l, enabled: d } = t;
        if (!d) return;
        if (t.animating && o.preventInteractionOnTransition) return;
        !t.animating && o.cssMode && o.loop && t.loopFix();
        let u = e;
        u.originalEvent && (u = u.originalEvent);
        let h = c(u.target);
        if ("wrapper" === o.touchEventsTarget && !h.closest(t.wrapperEl).length) return;
        if (a.isTouchEvent = "touchstart" === u.type, !a.isTouchEvent && "which" in u && 3 === u.which) return;
        if (!a.isTouchEvent && "button" in u && u.button > 0) return;
        if (a.isTouched && a.isMoved) return;
        const f = !!o.noSwipingClass && "" !== o.noSwipingClass,
            m = e.composedPath ? e.composedPath() : e.path;
        f && u.target && u.target.shadowRoot && m && (h = c(m[0]));
        const g = o.noSwipingSelector ? o.noSwipingSelector : "." + o.noSwipingClass,
            v = !(!u.target || !u.target.shadowRoot);
        if (o.noSwiping && (v ? function(e, t) {
                return void 0 === t && (t = this),
                    function t(s) {
                        if (!s || s === i() || s === r()) return null;
                        s.assignedSlot && (s = s.assignedSlot);
                        const n = s.closest(e);
                        return n || s.getRootNode ? n || t(s.getRootNode().host) : null
                    }(t)
            }(g, h[0]) : h.closest(g)[0])) return void(t.allowClick = !0);
        if (o.swipeHandler && !h.closest(o.swipeHandler)[0]) return;
        l.currentX = "touchstart" === u.type ? u.targetTouches[0].pageX : u.pageX, l.currentY = "touchstart" === u.type ? u.targetTouches[0].pageY : u.pageY;
        const b = l.currentX,
            y = l.currentY,
            w = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
            x = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
        if (w && (b <= x || b >= n.innerWidth - x)) {
            if ("prevent" !== w) return;
            e.preventDefault()
        }
        if (Object.assign(a, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }), l.startX = b, l.startY = y, a.touchStartTime = p(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, o.threshold > 0 && (a.allowThresholdMove = !1), "touchstart" !== u.type) {
            let e = !0;
            h.is(a.focusableElements) && (e = !1, "SELECT" === h[0].nodeName && (a.isTouched = !1)), s.activeElement && c(s.activeElement).is(a.focusableElements) && s.activeElement !== h[0] && s.activeElement.blur();
            const i = e && t.allowTouchMove && o.touchStartPreventDefault;
            !o.touchStartForcePreventDefault && !i || h[0].isContentEditable || u.preventDefault()
        }
        t.params.freeMode && t.params.freeMode.enabled && t.freeMode && t.animating && !o.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", u)
    }

    function M(e) {
        const t = i(),
            s = this,
            n = s.touchEventsData,
            { params: r, touches: a, rtlTranslate: o, enabled: l } = s;
        if (!l) return;
        let d = e;
        if (d.originalEvent && (d = d.originalEvent), !n.isTouched) return void(n.startMoving && n.isScrolling && s.emit("touchMoveOpposite", d));
        if (n.isTouchEvent && "touchmove" !== d.type) return;
        const u = "touchmove" === d.type && d.targetTouches && (d.targetTouches[0] || d.changedTouches[0]),
            h = "touchmove" === d.type ? u.pageX : d.pageX,
            f = "touchmove" === d.type ? u.pageY : d.pageY;
        if (d.preventedByNestedSwiper) return a.startX = h, void(a.startY = f);
        if (!s.allowTouchMove) return c(d.target).is(n.focusableElements) || (s.allowClick = !1), void(n.isTouched && (Object.assign(a, { startX: h, startY: f, currentX: h, currentY: f }), n.touchStartTime = p()));
        if (n.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
            if (s.isVertical()) { if (f < a.startY && s.translate <= s.maxTranslate() || f > a.startY && s.translate >= s.minTranslate()) return n.isTouched = !1, void(n.isMoved = !1) } else if (h < a.startX && s.translate <= s.maxTranslate() || h > a.startX && s.translate >= s.minTranslate()) return;
        if (n.isTouchEvent && t.activeElement && d.target === t.activeElement && c(d.target).is(n.focusableElements)) return n.isMoved = !0, void(s.allowClick = !1);
        if (n.allowTouchCallbacks && s.emit("touchMove", d), d.targetTouches && d.targetTouches.length > 1) return;
        a.currentX = h, a.currentY = f;
        const m = a.currentX - a.startX,
            g = a.currentY - a.startY;
        if (s.params.threshold && Math.sqrt(m ** 2 + g ** 2) < s.params.threshold) return;
        if (void 0 === n.isScrolling) {
            let e;
            s.isHorizontal() && a.currentY === a.startY || s.isVertical() && a.currentX === a.startX ? n.isScrolling = !1 : m * m + g * g >= 25 && (e = 180 * Math.atan2(Math.abs(g), Math.abs(m)) / Math.PI, n.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
        }
        if (n.isScrolling && s.emit("touchMoveOpposite", d), void 0 === n.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (n.startMoving = !0)), n.isScrolling) return void(n.isTouched = !1);
        if (!n.startMoving) return;
        s.allowClick = !1, !r.cssMode && d.cancelable && d.preventDefault(), r.touchMoveStopPropagation && !r.nested && d.stopPropagation(), n.isMoved || (r.loop && !r.cssMode && s.loopFix(), n.startTranslate = s.getTranslate(), s.setTransition(0), s.animating && s.$wrapperEl.trigger("webkitTransitionEnd transitionend"), n.allowMomentumBounce = !1, !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0), s.emit("sliderFirstMove", d)), s.emit("sliderMove", d), n.isMoved = !0;
        let v = s.isHorizontal() ? m : g;
        a.diff = v, v *= r.touchRatio, o && (v = -v), s.swipeDirection = v > 0 ? "prev" : "next", n.currentTranslate = v + n.startTranslate;
        let b = !0,
            y = r.resistanceRatio;
        if (r.touchReleaseOnEdges && (y = 0), v > 0 && n.currentTranslate > s.minTranslate() ? (b = !1, r.resistance && (n.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + n.startTranslate + v) ** y)) : v < 0 && n.currentTranslate < s.maxTranslate() && (b = !1, r.resistance && (n.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - n.startTranslate - v) ** y)), b && (d.preventedByNestedSwiper = !0), !s.allowSlideNext && "next" === s.swipeDirection && n.currentTranslate < n.startTranslate && (n.currentTranslate = n.startTranslate), !s.allowSlidePrev && "prev" === s.swipeDirection && n.currentTranslate > n.startTranslate && (n.currentTranslate = n.startTranslate), s.allowSlidePrev || s.allowSlideNext || (n.currentTranslate = n.startTranslate), r.threshold > 0) { if (!(Math.abs(v) > r.threshold || n.allowThresholdMove)) return void(n.currentTranslate = n.startTranslate); if (!n.allowThresholdMove) return n.allowThresholdMove = !0, a.startX = a.currentX, a.startY = a.currentY, n.currentTranslate = n.startTranslate, void(a.diff = s.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY) }
        r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(), s.updateSlidesClasses()), s.params.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(), s.updateProgress(n.currentTranslate), s.setTranslate(n.currentTranslate))
    }

    function k(e) {
        const t = this,
            s = t.touchEventsData,
            { params: i, touches: n, rtlTranslate: r, slidesGrid: a, enabled: o } = t;
        if (!o) return;
        let l = e;
        if (l.originalEvent && (l = l.originalEvent), s.allowTouchCallbacks && t.emit("touchEnd", l), s.allowTouchCallbacks = !1, !s.isTouched) return s.isMoved && i.grabCursor && t.setGrabCursor(!1), s.isMoved = !1, void(s.startMoving = !1);
        i.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        const c = p(),
            d = c - s.touchStartTime;
        if (t.allowClick) {
            const e = l.path || l.composedPath && l.composedPath();
            t.updateClickedSlide(e && e[0] || l.target), t.emit("tap click", l), d < 300 && c - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", l)
        }
        if (s.lastClickTime = p(), u(() => { t.destroyed || (t.allowClick = !0) }), !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === n.diff || s.currentTranslate === s.startTranslate) return s.isTouched = !1, s.isMoved = !1, void(s.startMoving = !1);
        let h;
        if (s.isTouched = !1, s.isMoved = !1, s.startMoving = !1, h = i.followFinger ? r ? t.translate : -t.translate : -s.currentTranslate, i.cssMode) return;
        if (t.params.freeMode && i.freeMode.enabled) return void t.freeMode.onTouchEnd({ currentPos: h });
        let f = 0,
            m = t.slidesSizesGrid[0];
        for (let e = 0; e < a.length; e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
            const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
            void 0 !== a[e + t] ? h >= a[e] && h < a[e + t] && (f = e, m = a[e + t] - a[e]) : h >= a[e] && (f = e, m = a[a.length - 1] - a[a.length - 2])
        }
        let g = null,
            v = null;
        i.rewind && (t.isBeginning ? v = t.params.virtual && t.params.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (g = 0));
        const b = (h - a[f]) / m,
            y = f < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
        if (d > i.longSwipesMs) { if (!i.longSwipes) return void t.slideTo(t.activeIndex); "next" === t.swipeDirection && (b >= i.longSwipesRatio ? t.slideTo(i.rewind && t.isEnd ? g : f + y) : t.slideTo(f)), "prev" === t.swipeDirection && (b > 1 - i.longSwipesRatio ? t.slideTo(f + y) : null !== v && b < 0 && Math.abs(b) > i.longSwipesRatio ? t.slideTo(v) : t.slideTo(f)) } else { if (!i.shortSwipes) return void t.slideTo(t.activeIndex);!t.navigation || l.target !== t.navigation.nextEl && l.target !== t.navigation.prevEl ? ("next" === t.swipeDirection && t.slideTo(null !== g ? g : f + y), "prev" === t.swipeDirection && t.slideTo(null !== v ? v : f)) : l.target === t.navigation.nextEl ? t.slideTo(f + y) : t.slideTo(f) }
    }

    function A() {
        const e = this,
            { params: t, el: s } = e;
        if (s && 0 === s.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const { allowSlideNext: i, allowSlidePrev: n, snapGrid: r } = e;
        e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(), ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = n, e.allowSlideNext = i, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
    }

    function P(e) {
        const t = this;
        t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())))
    }

    function O() {
        const e = this,
            { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
        if (!i) return;
        let n;
        e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
        const r = e.maxTranslate() - e.minTranslate();
        n = 0 === r ? 0 : (e.translate - e.minTranslate()) / r, n !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
    }
    Object.keys(d).forEach(e => { Object.defineProperty(c.fn, e, { value: d[e], writable: !0 }) });
    let L = !1;

    function $() {}
    const I = (e, t) => {
        const s = i(),
            { params: n, touchEvents: r, el: a, wrapperEl: o, device: l, support: c } = e,
            d = !!n.nested,
            u = "on" === t ? "addEventListener" : "removeEventListener",
            p = t;
        if (c.touch) {
            const t = !("touchstart" !== r.start || !c.passiveListener || !n.passiveListeners) && { passive: !0, capture: !1 };
            a[u](r.start, e.onTouchStart, t), a[u](r.move, e.onTouchMove, c.passiveListener ? { passive: !1, capture: d } : d), a[u](r.end, e.onTouchEnd, t), r.cancel && a[u](r.cancel, e.onTouchEnd, t)
        } else a[u](r.start, e.onTouchStart, !1), s[u](r.move, e.onTouchMove, d), s[u](r.end, e.onTouchEnd, !1);
        (n.preventClicks || n.preventClicksPropagation) && a[u]("click", e.onClick, !0), n.cssMode && o[u]("scroll", e.onScroll), n.updateOnWindowResize ? e[p](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", A, !0) : e[p]("observerUpdate", A, !0)
    };
    const z = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var D = { init: !0, direction: "horizontal", touchEventsTarget: "wrapper", initialSlide: 0, speed: 300, cssMode: !1, updateOnWindowResize: !0, resizeObserver: !0, nested: !1, createElements: !1, enabled: !0, focusableElements: "input, select, option, textarea, button, video, label", width: null, height: null, preventInteractionOnTransition: !1, userAgent: null, url: null, edgeSwipeDetection: !1, edgeSwipeThreshold: 20, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", breakpoints: void 0, breakpointsBase: "window", spaceBetween: 0, slidesPerView: 1, slidesPerGroup: 1, slidesPerGroupSkip: 0, slidesPerGroupAuto: !1, centeredSlides: !1, centeredSlidesBounds: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, normalizeSlideIndex: !0, centerInsufficientSlides: !1, watchOverflow: !0, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, allowTouchMove: !0, threshold: 0, touchMoveStopPropagation: !1, touchStartPreventDefault: !0, touchStartForcePreventDefault: !1, touchReleaseOnEdges: !1, uniqueNavElements: !0, resistance: !0, resistanceRatio: .85, watchSlidesProgress: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, loopedSlidesLimit: !0, loopFillGroupWithBlank: !1, loopPreventsSlide: !0, rewind: !1, allowSlidePrev: !0, allowSlideNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", noSwipingSelector: null, passiveListeners: !0, maxBackfaceHiddenSlides: 10, containerModifierClass: "swiper-", slideClass: "swiper-slide", slideBlankClass: "swiper-slide-invisible-blank", slideActiveClass: "swiper-slide-active", slideDuplicateActiveClass: "swiper-slide-duplicate-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slideDuplicateNextClass: "swiper-slide-duplicate-next", slidePrevClass: "swiper-slide-prev", slideDuplicatePrevClass: "swiper-slide-duplicate-prev", wrapperClass: "swiper-wrapper", runCallbacksOnInit: !0, _emitClasses: !1 };

    function N(e, t) {
        return function(s) {
            void 0 === s && (s = {});
            const i = Object.keys(s)[0],
                n = s[i];
            "object" == typeof n && null !== n ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 && !0 === e[i] && (e[i] = { auto: !0 }), i in e && "enabled" in n ? (!0 === e[i] && (e[i] = { enabled: !0 }), "object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0), e[i] || (e[i] = { enabled: !1 }), g(t, s)) : g(t, s)) : g(t, s)
        }
    }
    const j = {
            eventsEmitter: {
                on(e, t, s) { const i = this; if (!i.eventsListeners || i.destroyed) return i; if ("function" != typeof t) return i; const n = s ? "unshift" : "push"; return e.split(" ").forEach(e => { i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][n](t) }), i },
                once(e, t, s) {
                    const i = this;
                    if (!i.eventsListeners || i.destroyed) return i;
                    if ("function" != typeof t) return i;

                    function n() {
                        i.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
                        for (var s = arguments.length, r = new Array(s), a = 0; a < s; a++) r[a] = arguments[a];
                        t.apply(i, r)
                    }
                    return n.__emitterProxy = t, i.on(e, n, s)
                },
                onAny(e, t) { const s = this; if (!s.eventsListeners || s.destroyed) return s; if ("function" != typeof e) return s; const i = t ? "unshift" : "push"; return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s },
                offAny(e) { const t = this; if (!t.eventsListeners || t.destroyed) return t; if (!t.eventsAnyListeners) return t; const s = t.eventsAnyListeners.indexOf(e); return s >= 0 && t.eventsAnyListeners.splice(s, 1), t },
                off(e, t) {
                    const s = this;
                    return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach(e => {
                        void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach((i, n) => {
                            (i === t || i.__emitterProxy && i.__emitterProxy === t) && s.eventsListeners[e].splice(n, 1)
                        })
                    }), s) : s
                },
                emit() { const e = this; if (!e.eventsListeners || e.destroyed) return e; if (!e.eventsListeners) return e; let t, s, i; for (var n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a]; return "string" == typeof r[0] || Array.isArray(r[0]) ? (t = r[0], s = r.slice(1, r.length), i = e) : (t = r[0].events, s = r[0].data, i = r[0].context || e), s.unshift(i), (Array.isArray(t) ? t : t.split(" ")).forEach(t => { e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach(e => { e.apply(i, [t, ...s]) }), e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach(e => { e.apply(i, s) }) }), e }
            },
            update: {
                updateSize: function() {
                    const e = this;
                    let t, s;
                    const i = e.$el;
                    t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i[0].clientWidth, s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i[0].clientHeight, 0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(i.css("padding-left") || 0, 10) - parseInt(i.css("padding-right") || 0, 10), s = s - parseInt(i.css("padding-top") || 0, 10) - parseInt(i.css("padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, { width: t, height: s, size: e.isHorizontal() ? t : s }))
                },
                updateSlides: function() {
                    const e = this;

                    function t(t) { return e.isHorizontal() ? t : { width: "height", "margin-top": "margin-left", "margin-bottom ": "margin-right", "margin-left": "margin-top", "margin-right": "margin-bottom", "padding-left": "padding-top", "padding-right": "padding-bottom", marginRight: "marginBottom" }[t] }

                    function s(e, s) { return parseFloat(e.getPropertyValue(t(s)) || 0) }
                    const i = e.params,
                        { $wrapperEl: n, size: r, rtlTranslate: a, wrongRTL: o } = e,
                        l = e.virtual && i.virtual.enabled,
                        c = l ? e.virtual.slides.length : e.slides.length,
                        d = n.children("." + e.params.slideClass),
                        u = l ? e.virtual.slides.length : d.length;
                    let p = [];
                    const h = [],
                        f = [];
                    let m = i.slidesOffsetBefore;
                    "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
                    let g = i.slidesOffsetAfter;
                    "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
                    const b = e.snapGrid.length,
                        y = e.slidesGrid.length;
                    let w = i.spaceBetween,
                        x = -m,
                        _ = 0,
                        E = 0;
                    if (void 0 === r) return;
                    "string" == typeof w && w.indexOf("%") >= 0 && (w = parseFloat(w.replace("%", "")) / 100 * r), e.virtualSize = -w, a ? d.css({ marginLeft: "", marginBottom: "", marginTop: "" }) : d.css({ marginRight: "", marginBottom: "", marginTop: "" }), i.centeredSlides && i.cssMode && (v(e.wrapperEl, "--swiper-centered-offset-before", ""), v(e.wrapperEl, "--swiper-centered-offset-after", ""));
                    const T = i.grid && i.grid.rows > 1 && e.grid;
                    let C;
                    T && e.grid.initSlides(u);
                    const S = "auto" === i.slidesPerView && i.breakpoints && Object.keys(i.breakpoints).filter(e => void 0 !== i.breakpoints[e].slidesPerView).length > 0;
                    for (let n = 0; n < u; n += 1) {
                        C = 0;
                        const a = d.eq(n);
                        if (T && e.grid.updateSlide(n, a, u, t), "none" !== a.css("display")) {
                            if ("auto" === i.slidesPerView) {
                                S && (d[n].style[t("width")] = "");
                                const r = getComputedStyle(a[0]),
                                    o = a[0].style.transform,
                                    l = a[0].style.webkitTransform;
                                if (o && (a[0].style.transform = "none"), l && (a[0].style.webkitTransform = "none"), i.roundLengths) C = e.isHorizontal() ? a.outerWidth(!0) : a.outerHeight(!0);
                                else {
                                    const e = s(r, "width"),
                                        t = s(r, "padding-left"),
                                        i = s(r, "padding-right"),
                                        n = s(r, "margin-left"),
                                        o = s(r, "margin-right"),
                                        l = r.getPropertyValue("box-sizing");
                                    if (l && "border-box" === l) C = e + n + o;
                                    else {
                                        const { clientWidth: s, offsetWidth: r } = a[0];
                                        C = e + t + i + n + o + (r - s)
                                    }
                                }
                                o && (a[0].style.transform = o), l && (a[0].style.webkitTransform = l), i.roundLengths && (C = Math.floor(C))
                            } else C = (r - (i.slidesPerView - 1) * w) / i.slidesPerView, i.roundLengths && (C = Math.floor(C)), d[n] && (d[n].style[t("width")] = C + "px");
                            d[n] && (d[n].swiperSlideSize = C), f.push(C), i.centeredSlides ? (x = x + C / 2 + _ / 2 + w, 0 === _ && 0 !== n && (x = x - r / 2 - w), 0 === n && (x = x - r / 2 - w), Math.abs(x) < .001 && (x = 0), i.roundLengths && (x = Math.floor(x)), E % i.slidesPerGroup == 0 && p.push(x), h.push(x)) : (i.roundLengths && (x = Math.floor(x)), (E - Math.min(e.params.slidesPerGroupSkip, E)) % e.params.slidesPerGroup == 0 && p.push(x), h.push(x), x = x + C + w), e.virtualSize += C + w, _ = C, E += 1
                        }
                    }
                    if (e.virtualSize = Math.max(e.virtualSize, r) + g, a && o && ("slide" === i.effect || "coverflow" === i.effect) && n.css({ width: e.virtualSize + i.spaceBetween + "px" }), i.setWrapperSize && n.css({
                            [t("width")]: e.virtualSize + i.spaceBetween + "px"
                        }), T && e.grid.updateWrapperSize(C, p, t), !i.centeredSlides) {
                        const t = [];
                        for (let s = 0; s < p.length; s += 1) {
                            let n = p[s];
                            i.roundLengths && (n = Math.floor(n)), p[s] <= e.virtualSize - r && t.push(n)
                        }
                        p = t, Math.floor(e.virtualSize - r) - Math.floor(p[p.length - 1]) > 1 && p.push(e.virtualSize - r)
                    }
                    if (0 === p.length && (p = [0]), 0 !== i.spaceBetween) {
                        const s = e.isHorizontal() && a ? "marginLeft" : t("marginRight");
                        d.filter((e, t) => !i.cssMode || t !== d.length - 1).css({
                            [s]: w + "px"
                        })
                    }
                    if (i.centeredSlides && i.centeredSlidesBounds) {
                        let e = 0;
                        f.forEach(t => { e += t + (i.spaceBetween ? i.spaceBetween : 0) }), e -= i.spaceBetween;
                        const t = e - r;
                        p = p.map(e => e < 0 ? -m : e > t ? t + g : e)
                    }
                    if (i.centerInsufficientSlides) {
                        let e = 0;
                        if (f.forEach(t => { e += t + (i.spaceBetween ? i.spaceBetween : 0) }), e -= i.spaceBetween, e < r) {
                            const t = (r - e) / 2;
                            p.forEach((e, s) => { p[s] = e - t }), h.forEach((e, s) => { h[s] = e + t })
                        }
                    }
                    if (Object.assign(e, { slides: d, snapGrid: p, slidesGrid: h, slidesSizesGrid: f }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
                        v(e.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"), v(e.wrapperEl, "--swiper-centered-offset-after", e.size / 2 - f[f.length - 1] / 2 + "px");
                        const t = -e.snapGrid[0],
                            s = -e.slidesGrid[0];
                        e.snapGrid = e.snapGrid.map(e => e + t), e.slidesGrid = e.slidesGrid.map(e => e + s)
                    }
                    if (u !== c && e.emit("slidesLengthChange"), p.length !== b && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), h.length !== y && e.emit("slidesGridLengthChange"), i.watchSlidesProgress && e.updateSlidesOffset(), !(l || i.cssMode || "slide" !== i.effect && "fade" !== i.effect)) {
                        const t = i.containerModifierClass + "backface-hidden",
                            s = e.$el.hasClass(t);
                        u <= i.maxBackfaceHiddenSlides ? s || e.$el.addClass(t) : s && e.$el.removeClass(t)
                    }
                },
                updateAutoHeight: function(e) {
                    const t = this,
                        s = [],
                        i = t.virtual && t.params.virtual.enabled;
                    let n, r = 0;
                    "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
                    const a = e => i ? t.slides.filter(t => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e)[0] : t.slides.eq(e)[0];
                    if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                        if (t.params.centeredSlides)(t.visibleSlides || c([])).each(e => { s.push(e) });
                        else
                            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
                                const e = t.activeIndex + n;
                                if (e > t.slides.length && !i) break;
                                s.push(a(e))
                            } else s.push(a(t.activeIndex));
                    for (n = 0; n < s.length; n += 1)
                        if (void 0 !== s[n]) {
                            const e = s[n].offsetHeight;
                            r = e > r ? e : r
                        }(r || 0 === r) && t.$wrapperEl.css("height", r + "px")
                },
                updateSlidesOffset: function() {
                    const e = this,
                        t = e.slides;
                    for (let s = 0; s < t.length; s += 1) t[s].swiperSlideOffset = e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop
                },
                updateSlidesProgress: function(e) {
                    void 0 === e && (e = this && this.translate || 0);
                    const t = this,
                        s = t.params,
                        { slides: i, rtlTranslate: n, snapGrid: r } = t;
                    if (0 === i.length) return;
                    void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                    let a = -e;
                    n && (a = e), i.removeClass(s.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
                    for (let e = 0; e < i.length; e += 1) {
                        const o = i[e];
                        let l = o.swiperSlideOffset;
                        s.cssMode && s.centeredSlides && (l -= i[0].swiperSlideOffset);
                        const c = (a + (s.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + s.spaceBetween),
                            d = (a - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - l) / (o.swiperSlideSize + s.spaceBetween),
                            u = -(a - l),
                            p = u + t.slidesSizesGrid[e];
                        (u >= 0 && u < t.size - 1 || p > 1 && p <= t.size || u <= 0 && p >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e), i.eq(e).addClass(s.slideVisibleClass)), o.progress = n ? -c : c, o.originalProgress = n ? -d : d
                    }
                    t.visibleSlides = c(t.visibleSlides)
                },
                updateProgress: function(e) {
                    const t = this;
                    if (void 0 === e) {
                        const s = t.rtlTranslate ? -1 : 1;
                        e = t && t.translate && t.translate * s || 0
                    }
                    const s = t.params,
                        i = t.maxTranslate() - t.minTranslate();
                    let { progress: n, isBeginning: r, isEnd: a } = t;
                    const o = r,
                        l = a;
                    0 === i ? (n = 0, r = !0, a = !0) : (n = (e - t.minTranslate()) / i, r = n <= 0, a = n >= 1), Object.assign(t, { progress: n, isBeginning: r, isEnd: a }), (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), a && !l && t.emit("reachEnd toEdge"), (o && !r || l && !a) && t.emit("fromEdge"), t.emit("progress", n)
                },
                updateSlidesClasses: function() {
                    const e = this,
                        { slides: t, params: s, $wrapperEl: i, activeIndex: n, realIndex: r } = e,
                        a = e.virtual && s.virtual.enabled;
                    let o;
                    t.removeClass(`${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`), o = a ? e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${n}"]`) : t.eq(n), o.addClass(s.slideActiveClass), s.loop && (o.hasClass(s.slideDuplicateClass) ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass) : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass));
                    let l = o.nextAll("." + s.slideClass).eq(0).addClass(s.slideNextClass);
                    s.loop && 0 === l.length && (l = t.eq(0), l.addClass(s.slideNextClass));
                    let c = o.prevAll("." + s.slideClass).eq(0).addClass(s.slidePrevClass);
                    s.loop && 0 === c.length && (c = t.eq(-1), c.addClass(s.slidePrevClass)), s.loop && (l.hasClass(s.slideDuplicateClass) ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass) : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass), c.hasClass(s.slideDuplicateClass) ? i.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass) : i.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)), e.emitSlidesClasses()
                },
                updateActiveIndex: function(e) {
                    const t = this,
                        s = t.rtlTranslate ? t.translate : -t.translate,
                        { slidesGrid: i, snapGrid: n, params: r, activeIndex: a, realIndex: o, snapIndex: l } = t;
                    let c, d = e;
                    if (void 0 === d) {
                        for (let e = 0; e < i.length; e += 1) void 0 !== i[e + 1] ? s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2 ? d = e : s >= i[e] && s < i[e + 1] && (d = e + 1) : s >= i[e] && (d = e);
                        r.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0)
                    }
                    if (n.indexOf(s) >= 0) c = n.indexOf(s);
                    else {
                        const e = Math.min(r.slidesPerGroupSkip, d);
                        c = e + Math.floor((d - e) / r.slidesPerGroup)
                    }
                    if (c >= n.length && (c = n.length - 1), d === a) return void(c !== l && (t.snapIndex = c, t.emit("snapIndexChange")));
                    const u = parseInt(t.slides.eq(d).attr("data-swiper-slide-index") || d, 10);
                    Object.assign(t, { snapIndex: c, realIndex: u, previousIndex: a, activeIndex: d }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), o !== u && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange")
                },
                updateClickedSlide: function(e) {
                    const t = this,
                        s = t.params,
                        i = c(e).closest("." + s.slideClass)[0];
                    let n, r = !1;
                    if (i)
                        for (let e = 0; e < t.slides.length; e += 1)
                            if (t.slides[e] === i) { r = !0, n = e; break }
                    if (!i || !r) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
                    t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(c(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = n, s.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
                }
            },
            translate: {
                getTranslate: function(e) { void 0 === e && (e = this.isHorizontal() ? "x" : "y"); const { params: t, rtlTranslate: s, translate: i, $wrapperEl: n } = this; if (t.virtualTranslate) return s ? -i : i; if (t.cssMode) return i; let r = h(n[0], e); return s && (r = -r), r || 0 },
                setTranslate: function(e, t) {
                    const s = this,
                        { rtlTranslate: i, params: n, $wrapperEl: r, wrapperEl: a, progress: o } = s;
                    let l, c = 0,
                        d = 0;
                    s.isHorizontal() ? c = i ? -e : e : d = e, n.roundLengths && (c = Math.floor(c), d = Math.floor(d)), n.cssMode ? a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -c : -d : n.virtualTranslate || r.transform(`translate3d(${c}px, ${d}px, 0px)`), s.previousTranslate = s.translate, s.translate = s.isHorizontal() ? c : d;
                    const u = s.maxTranslate() - s.minTranslate();
                    l = 0 === u ? 0 : (e - s.minTranslate()) / u, l !== o && s.updateProgress(e), s.emit("setTranslate", s.translate, t)
                },
                minTranslate: function() { return -this.snapGrid[0] },
                maxTranslate: function() { return -this.snapGrid[this.snapGrid.length - 1] },
                translateTo: function(e, t, s, i, n) {
                    void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), void 0 === i && (i = !0);
                    const r = this,
                        { params: a, wrapperEl: o } = r;
                    if (r.animating && a.preventInteractionOnTransition) return !1;
                    const l = r.minTranslate(),
                        c = r.maxTranslate();
                    let d;
                    if (d = i && e > l ? l : i && e < c ? c : e, r.updateProgress(d), a.cssMode) {
                        const e = r.isHorizontal();
                        if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -d;
                        else {
                            if (!r.support.smoothScroll) return b({ swiper: r, targetPosition: -d, side: e ? "left" : "top" }), !0;
                            o.scrollTo({
                                [e ? "left" : "top"]: -d,
                                behavior: "smooth"
                            })
                        }
                        return !0
                    }
                    return 0 === t ? (r.setTransition(0), r.setTranslate(d), s && (r.emit("beforeTransitionStart", t, n), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(d), s && (r.emit("beforeTransitionStart", t, n), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e) { r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, s && r.emit("transitionEnd")) }), r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))), !0
                }
            },
            transition: {
                setTransition: function(e, t) {
                    const s = this;
                    s.params.cssMode || s.$wrapperEl.transition(e), s.emit("setTransition", e, t)
                },
                transitionStart: function(e, t) {
                    void 0 === e && (e = !0);
                    const s = this,
                        { params: i } = s;
                    i.cssMode || (i.autoHeight && s.updateAutoHeight(), C({ swiper: s, runCallbacks: e, direction: t, step: "Start" }))
                },
                transitionEnd: function(e, t) {
                    void 0 === e && (e = !0);
                    const s = this,
                        { params: i } = s;
                    s.animating = !1, i.cssMode || (s.setTransition(0), C({ swiper: s, runCallbacks: e, direction: t, step: "End" }))
                }
            },
            slide: {
                slideTo: function(e, t, s, i, n) {
                    if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "number" != typeof e && "string" != typeof e) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
                    if ("string" == typeof e) {
                        const t = parseInt(e, 10);
                        if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                        e = t
                    }
                    const r = this;
                    let a = e;
                    a < 0 && (a = 0);
                    const { params: o, snapGrid: l, slidesGrid: c, previousIndex: d, activeIndex: u, rtlTranslate: p, wrapperEl: h, enabled: f } = r;
                    if (r.animating && o.preventInteractionOnTransition || !f && !i && !n) return !1;
                    const m = Math.min(r.params.slidesPerGroupSkip, a);
                    let g = m + Math.floor((a - m) / r.params.slidesPerGroup);
                    g >= l.length && (g = l.length - 1);
                    const v = -l[g];
                    if (o.normalizeSlideIndex)
                        for (let e = 0; e < c.length; e += 1) {
                            const t = -Math.floor(100 * v),
                                s = Math.floor(100 * c[e]),
                                i = Math.floor(100 * c[e + 1]);
                            void 0 !== c[e + 1] ? t >= s && t < i - (i - s) / 2 ? a = e : t >= s && t < i && (a = e + 1) : t >= s && (a = e)
                        }
                    if (r.initialized && a !== u) { if (!r.allowSlideNext && v < r.translate && v < r.minTranslate()) return !1; if (!r.allowSlidePrev && v > r.translate && v > r.maxTranslate() && (u || 0) !== a) return !1 }
                    let y;
                    if (a !== (d || 0) && s && r.emit("beforeSlideChangeStart"), r.updateProgress(v), y = a > u ? "next" : a < u ? "prev" : "reset", p && -v === r.translate || !p && v === r.translate) return r.updateActiveIndex(a), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(v), "reset" !== y && (r.transitionStart(s, y), r.transitionEnd(s, y)), !1;
                    if (o.cssMode) {
                        const e = r.isHorizontal(),
                            s = p ? v : -v;
                        if (0 === t) {
                            const t = r.virtual && r.params.virtual.enabled;
                            t && (r.wrapperEl.style.scrollSnapType = "none", r._immediateVirtual = !0), h[e ? "scrollLeft" : "scrollTop"] = s, t && requestAnimationFrame(() => { r.wrapperEl.style.scrollSnapType = "", r._swiperImmediateVirtual = !1 })
                        } else {
                            if (!r.support.smoothScroll) return b({ swiper: r, targetPosition: s, side: e ? "left" : "top" }), !0;
                            h.scrollTo({
                                [e ? "left" : "top"]: s,
                                behavior: "smooth"
                            })
                        }
                        return !0
                    }
                    return r.setTransition(t), r.setTranslate(v), r.updateActiveIndex(a), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, i), r.transitionStart(s, y), 0 === t ? r.transitionEnd(s, y) : r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) { r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(s, y)) }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd)), !0
                },
                slideToLoop: function(e, t, s, i) {
                    if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof e) {
                        const t = parseInt(e, 10);
                        if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                        e = t
                    }
                    const n = this;
                    let r = e;
                    return n.params.loop && (r += n.loopedSlides), n.slideTo(r, t, s, i)
                },
                slideNext: function(e, t, s) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    const i = this,
                        { animating: n, enabled: r, params: a } = i;
                    if (!r) return i;
                    let o = a.slidesPerGroup;
                    "auto" === a.slidesPerView && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
                    const l = i.activeIndex < a.slidesPerGroupSkip ? 1 : o;
                    if (a.loop) {
                        if (n && a.loopPreventsSlide) return !1;
                        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
                    }
                    return a.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + l, e, t, s)
                },
                slidePrev: function(e, t, s) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
                    const i = this,
                        { params: n, animating: r, snapGrid: a, slidesGrid: o, rtlTranslate: l, enabled: c } = i;
                    if (!c) return i;
                    if (n.loop) {
                        if (r && n.loopPreventsSlide) return !1;
                        i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
                    }

                    function d(e) { return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e) }
                    const u = d(l ? i.translate : -i.translate),
                        p = a.map(e => d(e));
                    let h = a[p.indexOf(u) - 1];
                    if (void 0 === h && n.cssMode) {
                        let e;
                        a.forEach((t, s) => { u >= t && (e = s) }), void 0 !== e && (h = a[e > 0 ? e - 1 : e])
                    }
                    let f = 0;
                    if (void 0 !== h && (f = o.indexOf(h), f < 0 && (f = i.activeIndex - 1), "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (f = f - i.slidesPerViewDynamic("previous", !0) + 1, f = Math.max(f, 0))), n.rewind && i.isBeginning) { const n = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1; return i.slideTo(n, e, t, s) }
                    return i.slideTo(f, e, t, s)
                },
                slideReset: function(e, t, s) { return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, s) },
                slideToClosest: function(e, t, s, i) {
                    void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === i && (i = .5);
                    const n = this;
                    let r = n.activeIndex;
                    const a = Math.min(n.params.slidesPerGroupSkip, r),
                        o = a + Math.floor((r - a) / n.params.slidesPerGroup),
                        l = n.rtlTranslate ? n.translate : -n.translate;
                    if (l >= n.snapGrid[o]) {
                        const e = n.snapGrid[o];
                        l - e > (n.snapGrid[o + 1] - e) * i && (r += n.params.slidesPerGroup)
                    } else {
                        const e = n.snapGrid[o - 1];
                        l - e <= (n.snapGrid[o] - e) * i && (r -= n.params.slidesPerGroup)
                    }
                    return r = Math.max(r, 0), r = Math.min(r, n.slidesGrid.length - 1), n.slideTo(r, e, t, s)
                },
                slideToClickedSlide: function() {
                    const e = this,
                        { params: t, $wrapperEl: s } = e,
                        i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
                    let n, r = e.clickedIndex;
                    if (t.loop) {
                        if (e.animating) return;
                        n = parseInt(c(e.clickedSlide).attr("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - i / 2 || r > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(), r = s.children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), u(() => { e.slideTo(r) })) : e.slideTo(r) : r > e.slides.length - i ? (e.loopFix(), r = s.children(`.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`).eq(0).index(), u(() => { e.slideTo(r) })) : e.slideTo(r)
                    } else e.slideTo(r)
                }
            },
            loop: {
                loopCreate: function() {
                    const e = this,
                        t = i(),
                        { params: s, $wrapperEl: n } = e,
                        r = n.children().length > 0 ? c(n.children()[0].parentNode) : n;
                    r.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
                    let a = r.children("." + s.slideClass);
                    if (s.loopFillGroupWithBlank) {
                        const e = s.slidesPerGroup - a.length % s.slidesPerGroup;
                        if (e !== s.slidesPerGroup) {
                            for (let i = 0; i < e; i += 1) {
                                const e = c(t.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);
                                r.append(e)
                            }
                            a = r.children("." + s.slideClass)
                        }
                    }
                    "auto" !== s.slidesPerView || s.loopedSlides || (s.loopedSlides = a.length), e.loopedSlides = Math.ceil(parseFloat(s.loopedSlides || s.slidesPerView, 10)), e.loopedSlides += s.loopAdditionalSlides, e.loopedSlides > a.length && e.params.loopedSlidesLimit && (e.loopedSlides = a.length);
                    const o = [],
                        l = [];
                    a.each((e, t) => { c(e).attr("data-swiper-slide-index", t) });
                    for (let t = 0; t < e.loopedSlides; t += 1) {
                        const e = t - Math.floor(t / a.length) * a.length;
                        l.push(a.eq(e)[0]), o.unshift(a.eq(a.length - e - 1)[0])
                    }
                    for (let e = 0; e < l.length; e += 1) r.append(c(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
                    for (let e = o.length - 1; e >= 0; e -= 1) r.prepend(c(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass))
                },
                loopFix: function() {
                    const e = this;
                    e.emit("beforeLoopFix");
                    const { activeIndex: t, slides: s, loopedSlides: i, allowSlidePrev: n, allowSlideNext: r, snapGrid: a, rtlTranslate: o } = e;
                    let l;
                    e.allowSlidePrev = !0, e.allowSlideNext = !0;
                    const c = -a[t] - e.getTranslate();
                    t < i ? (l = s.length - 3 * i + t, l += i, e.slideTo(l, 0, !1, !0) && 0 !== c && e.setTranslate((o ? -e.translate : e.translate) - c)) : t >= s.length - i && (l = -s.length + t + i, l += i, e.slideTo(l, 0, !1, !0) && 0 !== c && e.setTranslate((o ? -e.translate : e.translate) - c)), e.allowSlidePrev = n, e.allowSlideNext = r, e.emit("loopFix")
                },
                loopDestroy: function() {
                    const { $wrapperEl: e, params: t, slides: s } = this;
                    e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(), s.removeAttr("data-swiper-slide-index")
                }
            },
            grabCursor: {
                setGrabCursor: function(e) {
                    const t = this;
                    if (t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
                    const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                    s.style.cursor = "move", s.style.cursor = e ? "grabbing" : "grab"
                },
                unsetGrabCursor: function() {
                    const e = this;
                    e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "")
                }
            },
            events: {
                attachEvents: function() {
                    const e = this,
                        t = i(),
                        { params: s, support: n } = e;
                    e.onTouchStart = S.bind(e), e.onTouchMove = M.bind(e), e.onTouchEnd = k.bind(e), s.cssMode && (e.onScroll = O.bind(e)), e.onClick = P.bind(e), n.touch && !L && (t.addEventListener("touchstart", $), L = !0), I(e, "on")
                },
                detachEvents: function() { I(this, "off") }
            },
            breakpoints: {
                setBreakpoint: function() {
                    const e = this,
                        { activeIndex: t, initialized: s, loopedSlides: i = 0, params: n, $el: r } = e,
                        a = n.breakpoints;
                    if (!a || a && 0 === Object.keys(a).length) return;
                    const o = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
                    if (!o || e.currentBreakpoint === o) return;
                    const l = (o in a ? a[o] : void 0) || e.originalParams,
                        c = z(e, n),
                        d = z(e, l),
                        u = n.enabled;
                    c && !d ? (r.removeClass(`${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`), e.emitContainerClasses()) : !c && d && (r.addClass(n.containerModifierClass + "grid"), (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === n.grid.fill) && r.addClass(n.containerModifierClass + "grid-column"), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach(t => {
                        const s = n[t] && n[t].enabled,
                            i = l[t] && l[t].enabled;
                        s && !i && e[t].disable(), !s && i && e[t].enable()
                    });
                    const p = l.direction && l.direction !== n.direction,
                        h = n.loop && (l.slidesPerView !== n.slidesPerView || p);
                    p && s && e.changeDirection(), g(e.params, l);
                    const f = e.params.enabled;
                    Object.assign(e, { allowTouchMove: e.params.allowTouchMove, allowSlideNext: e.params.allowSlideNext, allowSlidePrev: e.params.allowSlidePrev }), u && !f ? e.disable() : !u && f && e.enable(), e.currentBreakpoint = o, e.emit("_beforeBreakpoint", l), h && s && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - i + e.loopedSlides, 0, !1)), e.emit("breakpoint", l)
                },
                getBreakpoint: function(e, t, s) {
                    if (void 0 === t && (t = "window"), !e || "container" === t && !s) return;
                    let i = !1;
                    const n = r(),
                        a = "window" === t ? n.innerHeight : s.clientHeight,
                        o = Object.keys(e).map(e => { if ("string" == typeof e && 0 === e.indexOf("@")) { const t = parseFloat(e.substr(1)); return { value: a * t, point: e } } return { value: e, point: e } });
                    o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
                    for (let e = 0; e < o.length; e += 1) { const { point: r, value: a } = o[e]; "window" === t ? n.matchMedia(`(min-width: ${a}px)`).matches && (i = r) : a <= s.clientWidth && (i = r) }
                    return i || "max"
                }
            },
            checkOverflow: {
                checkOverflow: function() {
                    const e = this,
                        { isLocked: t, params: s } = e,
                        { slidesOffsetBefore: i } = s;
                    if (i) {
                        const t = e.slides.length - 1,
                            s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                        e.isLocked = e.size > s
                    } else e.isLocked = 1 === e.snapGrid.length;
                    !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
                }
            },
            classes: {
                addClasses: function() {
                    const e = this,
                        { classNames: t, params: s, rtl: i, $el: n, device: r, support: a } = e,
                        o = function(e, t) { const s = []; return e.forEach(e => { "object" == typeof e ? Object.keys(e).forEach(i => { e[i] && s.push(t + i) }) : "string" == typeof e && s.push(t + e) }), s }(["initialized", s.direction, { "pointer-events": !a.touch }, { "free-mode": e.params.freeMode && s.freeMode.enabled }, { autoheight: s.autoHeight }, { rtl: i }, { grid: s.grid && s.grid.rows > 1 }, { "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill }, { android: r.android }, { ios: r.ios }, { "css-mode": s.cssMode }, { centered: s.cssMode && s.centeredSlides }, { "watch-progress": s.watchSlidesProgress }], s.containerModifierClass);
                    t.push(...o), n.addClass([...t].join(" ")), e.emitContainerClasses()
                },
                removeClasses: function() {
                    const { $el: e, classNames: t } = this;
                    e.removeClass(t.join(" ")), this.emitContainerClasses()
                }
            },
            images: {
                loadImage: function(e, t, s, i, n, a) {
                    const o = r();
                    let l;

                    function d() { a && a() }
                    c(e).parent("picture")[0] || e.complete && n ? d() : t ? (l = new o.Image, l.onload = d, l.onerror = d, i && (l.sizes = i), s && (l.srcset = s), t && (l.src = t)) : d()
                },
                preloadImages: function() {
                    const e = this;

                    function t() { null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady"))) }
                    e.imagesToLoad = e.$el.find("img");
                    for (let s = 0; s < e.imagesToLoad.length; s += 1) {
                        const i = e.imagesToLoad[s];
                        e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        H = {};
    class F {
        constructor() {
            let e, t;
            for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++) i[n] = arguments[n];
            if (1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? t = i[0] : [e, t] = i, t || (t = {}), t = g({}, t), e && !t.el && (t.el = e), t.el && c(t.el).length > 1) {
                const e = [];
                return c(t.el).each(s => {
                    const i = g({}, t, { el: s });
                    e.push(new F(i))
                }), e
            }
            const r = this;
            r.__swiper__ = !0, r.support = _(), r.device = E({ userAgent: t.userAgent }), r.browser = T(), r.eventsListeners = {}, r.eventsAnyListeners = [], r.modules = [...r.__modules__], t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
            const a = {};
            r.modules.forEach(e => { e({ swiper: r, extendParams: N(t, a), on: r.on.bind(r), once: r.once.bind(r), off: r.off.bind(r), emit: r.emit.bind(r) }) });
            const o = g({}, D, a);
            return r.params = g({}, o, H, t), r.originalParams = g({}, r.params), r.passedParams = g({}, t), r.params && r.params.on && Object.keys(r.params.on).forEach(e => { r.on(e, r.params.on[e]) }), r.params && r.params.onAny && r.onAny(r.params.onAny), r.$ = c, Object.assign(r, {
                enabled: r.params.enabled,
                el: e,
                classNames: [],
                slides: c(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: () => "horizontal" === r.params.direction,
                isVertical: () => "vertical" === r.params.direction,
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                allowSlideNext: r.params.allowSlideNext,
                allowSlidePrev: r.params.allowSlidePrev,
                touchEvents: function() {
                    const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
                        t = ["pointerdown", "pointermove", "pointerup"];
                    return r.touchEventsTouch = { start: e[0], move: e[1], end: e[2], cancel: e[3] }, r.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }, r.support.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop
                }(),
                touchEventsData: { isTouched: void 0, isMoved: void 0, allowTouchCallbacks: void 0, touchStartTime: void 0, isScrolling: void 0, currentTranslate: void 0, startTranslate: void 0, allowThresholdMove: void 0, focusableElements: r.params.focusableElements, lastClickTime: p(), clickTimeout: void 0, velocities: [], allowMomentumBounce: void 0, isTouchEvent: void 0, startMoving: void 0 },
                allowClick: !0,
                allowTouchMove: r.params.allowTouchMove,
                touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
                imagesToLoad: [],
                imagesLoaded: 0
            }), r.emit("_swiper"), r.params.init && r.init(), r
        }
        enable() {
            const e = this;
            e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"))
        }
        disable() {
            const e = this;
            e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"))
        }
        setProgress(e, t) {
            const s = this;
            e = Math.min(Math.max(e, 0), 1);
            const i = s.minTranslate(),
                n = (s.maxTranslate() - i) * e + i;
            s.translateTo(n, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses()
        }
        emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = e.el.className.split(" ").filter(t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass));
            e.emit("_containerClasses", t.join(" "))
        }
        getSlideClasses(e) { const t = this; return t.destroyed ? "" : e.className.split(" ").filter(e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)).join(" ") }
        emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = [];
            e.slides.each(s => {
                const i = e.getSlideClasses(s);
                t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i)
            }), e.emit("_slideClasses", t)
        }
        slidesPerViewDynamic(e, t) {
            void 0 === e && (e = "current"), void 0 === t && (t = !1);
            const { params: s, slides: i, slidesGrid: n, slidesSizesGrid: r, size: a, activeIndex: o } = this;
            let l = 1;
            if (s.centeredSlides) { let e, t = i[o].swiperSlideSize; for (let s = o + 1; s < i.length; s += 1) i[s] && !e && (t += i[s].swiperSlideSize, l += 1, t > a && (e = !0)); for (let s = o - 1; s >= 0; s -= 1) i[s] && !e && (t += i[s].swiperSlideSize, l += 1, t > a && (e = !0)) } else if ("current" === e)
                for (let e = o + 1; e < i.length; e += 1)(t ? n[e] + r[e] - n[o] < a : n[e] - n[o] < a) && (l += 1);
            else
                for (let e = o - 1; e >= 0; e -= 1) n[o] - n[e] < a && (l += 1);
            return l
        }
        update() {
            const e = this;
            if (!e || e.destroyed) return;
            const { snapGrid: t, params: s } = e;

            function i() {
                const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                    s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses()
            }
            let n;
            s.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode && e.params.freeMode.enabled ? (i(), e.params.autoHeight && e.updateAutoHeight()) : (n = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), n || i()), s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
        }
        changeDirection(e, t) {
            void 0 === t && (t = !0);
            const s = this,
                i = s.params.direction;
            return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (s.$el.removeClass(`${s.params.containerModifierClass}${i}`).addClass(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.each(t => { "vertical" === e ? t.style.width = "" : t.style.height = "" }), s.emit("changeDirection"), t && s.update()), s
        }
        changeLanguageDirection(e) {
            const t = this;
            t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e, t.rtlTranslate = "horizontal" === t.params.direction && t.rtl, t.rtl ? (t.$el.addClass(t.params.containerModifierClass + "rtl"), t.el.dir = "rtl") : (t.$el.removeClass(t.params.containerModifierClass + "rtl"), t.el.dir = "ltr"), t.update())
        }
        mount(e) {
            const t = this;
            if (t.mounted) return !0;
            const s = c(e || t.params.el);
            if (!(e = s[0])) return !1;
            e.swiper = t;
            const n = () => "." + (t.params.wrapperClass || "").trim().split(" ").join(".");
            let r = (() => { if (e && e.shadowRoot && e.shadowRoot.querySelector) { const t = c(e.shadowRoot.querySelector(n())); return t.children = e => s.children(e), t } return s.children ? s.children(n()) : c(s).children(n()) })();
            if (0 === r.length && t.params.createElements) {
                const e = i().createElement("div");
                r = c(e), e.className = t.params.wrapperClass, s.append(e), s.children("." + t.params.slideClass).each(e => { r.append(e) })
            }
            return Object.assign(t, { $el: s, el: e, $wrapperEl: r, wrapperEl: r[0], mounted: !0, rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"), rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")), wrongRTL: "-webkit-box" === r.css("display") }), !0
        }
        init(e) { const t = this; return t.initialized || !1 === t.mount(e) || (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.attachEvents(), t.initialized = !0, t.emit("init"), t.emit("afterInit")), t }
        destroy(e, t) {
            void 0 === e && (e = !0), void 0 === t && (t = !0);
            const s = this,
                { params: i, $el: n, $wrapperEl: r, slides: a } = s;
            return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), i.loop && s.loopDestroy(), t && (s.removeClasses(), n.removeAttr("style"), r.removeAttr("style"), a && a.length && a.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), s.emit("destroy"), Object.keys(s.eventsListeners).forEach(e => { s.off(e) }), !1 !== e && (s.$el[0].swiper = null, function(e) {
                const t = e;
                Object.keys(t).forEach(e => { try { t[e] = null } catch (e) {} try { delete t[e] } catch (e) {} })
            }(s)), s.destroyed = !0), null
        }
        static extendDefaults(e) { g(H, e) }
        static get extendedDefaults() { return H }
        static get defaults() { return D }
        static installModule(e) { F.prototype.__modules__ || (F.prototype.__modules__ = []); const t = F.prototype.__modules__; "function" == typeof e && t.indexOf(e) < 0 && t.push(e) }
        static use(e) { return Array.isArray(e) ? (e.forEach(e => F.installModule(e)), F) : (F.installModule(e), F) }
    }

    function B(e, t, s, n) {
        const r = i();
        return e.params.createElements && Object.keys(n).forEach(i => {
            if (!s[i] && !0 === s.auto) {
                let a = e.$el.children("." + n[i])[0];
                a || (a = r.createElement("div"), a.className = n[i], e.$el.append(a)), s[i] = a, t[i] = a
            }
        }), s
    }

    function W(e) { return void 0 === e && (e = ""), "." + e.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".") }

    function q(e) {
        const t = this,
            { $wrapperEl: s, params: i } = t;
        if (i.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
            for (let t = 0; t < e.length; t += 1) e[t] && s.append(e[t]);
        else s.append(e);
        i.loop && t.loopCreate(), i.observer || t.update()
    }

    function R(e) {
        const t = this,
            { params: s, $wrapperEl: i, activeIndex: n } = t;
        s.loop && t.loopDestroy();
        let r = n + 1;
        if ("object" == typeof e && "length" in e) {
            for (let t = 0; t < e.length; t += 1) e[t] && i.prepend(e[t]);
            r = n + e.length
        } else i.prepend(e);
        s.loop && t.loopCreate(), s.observer || t.update(), t.slideTo(r, 0, !1)
    }

    function V(e, t) {
        const s = this,
            { $wrapperEl: i, params: n, activeIndex: r } = s;
        let a = r;
        n.loop && (a -= s.loopedSlides, s.loopDestroy(), s.slides = i.children("." + n.slideClass));
        const o = s.slides.length;
        if (e <= 0) return void s.prependSlide(t);
        if (e >= o) return void s.appendSlide(t);
        let l = a > e ? a + 1 : a;
        const c = [];
        for (let t = o - 1; t >= e; t -= 1) {
            const e = s.slides.eq(t);
            e.remove(), c.unshift(e)
        }
        if ("object" == typeof t && "length" in t) {
            for (let e = 0; e < t.length; e += 1) t[e] && i.append(t[e]);
            l = a > e ? a + t.length : a
        } else i.append(t);
        for (let e = 0; e < c.length; e += 1) i.append(c[e]);
        n.loop && s.loopCreate(), n.observer || s.update(), n.loop ? s.slideTo(l + s.loopedSlides, 0, !1) : s.slideTo(l, 0, !1)
    }

    function X(e) {
        const t = this,
            { params: s, $wrapperEl: i, activeIndex: n } = t;
        let r = n;
        s.loop && (r -= t.loopedSlides, t.loopDestroy(), t.slides = i.children("." + s.slideClass));
        let a, o = r;
        if ("object" == typeof e && "length" in e) {
            for (let s = 0; s < e.length; s += 1) a = e[s], t.slides[a] && t.slides.eq(a).remove(), a < o && (o -= 1);
            o = Math.max(o, 0)
        } else a = e, t.slides[a] && t.slides.eq(a).remove(), a < o && (o -= 1), o = Math.max(o, 0);
        s.loop && t.loopCreate(), s.observer || t.update(), s.loop ? t.slideTo(o + t.loopedSlides, 0, !1) : t.slideTo(o, 0, !1)
    }

    function Y() {
        const e = this,
            t = [];
        for (let s = 0; s < e.slides.length; s += 1) t.push(s);
        e.removeSlide(t)
    }

    function G(e) {
        const { effect: t, swiper: s, on: i, setTranslate: n, setTransition: r, overwriteParams: a, perspective: o, recreateShadows: l, getEffectParams: c } = e;
        let d;
        i("beforeInit", () => {
            if (s.params.effect !== t) return;
            s.classNames.push(`${s.params.containerModifierClass}${t}`), o && o() && s.classNames.push(s.params.containerModifierClass + "3d");
            const e = a ? a() : {};
            Object.assign(s.params, e), Object.assign(s.originalParams, e)
        }), i("setTranslate", () => { s.params.effect === t && n() }), i("setTransition", (e, i) => { s.params.effect === t && r(i) }), i("transitionEnd", () => {
            if (s.params.effect === t && l) {
                if (!c || !c().slideShadows) return;
                s.slides.each(e => { s.$(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove() }), l()
            }
        }), i("virtualUpdate", () => { s.params.effect === t && (s.slides.length || (d = !0), requestAnimationFrame(() => { d && s.slides && s.slides.length && (n(), d = !1) })) })
    }

    function U(e, t) { return e.transformEl ? t.find(e.transformEl).css({ "backface-visibility": "hidden", "-webkit-backface-visibility": "hidden" }) : t }

    function K(e) {
        let { swiper: t, duration: s, transformEl: i, allSlides: n } = e;
        const { slides: r, activeIndex: a, $wrapperEl: o } = t;
        if (t.params.virtualTranslate && 0 !== s) {
            let e, s = !1;
            e = n ? i ? r.find(i) : r : i ? r.eq(a).find(i) : r.eq(a), e.transitionEnd(() => {
                if (s) return;
                if (!t || t.destroyed) return;
                s = !0, t.animating = !1;
                const e = ["webkitTransitionEnd", "transitionend"];
                for (let t = 0; t < e.length; t += 1) o.trigger(e[t])
            })
        }
    }

    function Q(e, t, s) {
        const i = "swiper-slide-shadow" + (s ? "-" + s : ""),
            n = e.transformEl ? t.find(e.transformEl) : t;
        let r = n.children("." + i);
        return r.length || (r = c(`<div class="swiper-slide-shadow${s?"-"+s:""}"></div>`), n.append(r)), r
    }
    Object.keys(j).forEach(e => { Object.keys(j[e]).forEach(t => { F.prototype[t] = j[e][t] }) }), F.use([function(e) {
        let { swiper: t, on: s, emit: i } = e;
        const n = r();
        let a = null,
            o = null;
        const l = () => { t && !t.destroyed && t.initialized && (i("beforeResize"), i("resize")) },
            c = () => { t && !t.destroyed && t.initialized && i("orientationchange") };
        s("init", () => {
            t.params.resizeObserver && void 0 !== n.ResizeObserver ? t && !t.destroyed && t.initialized && (a = new ResizeObserver(e => {
                o = n.requestAnimationFrame(() => {
                    const { width: s, height: i } = t;
                    let n = s,
                        r = i;
                    e.forEach(e => {
                        let { contentBoxSize: s, contentRect: i, target: a } = e;
                        a && a !== t.el || (n = i ? i.width : (s[0] || s).inlineSize, r = i ? i.height : (s[0] || s).blockSize)
                    }), n === s && r === i || l()
                })
            }), a.observe(t.el)) : (n.addEventListener("resize", l), n.addEventListener("orientationchange", c))
        }), s("destroy", () => { o && n.cancelAnimationFrame(o), a && a.unobserve && t.el && (a.unobserve(t.el), a = null), n.removeEventListener("resize", l), n.removeEventListener("orientationchange", c) })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        const a = [],
            o = r(),
            l = function(e, t) {
                void 0 === t && (t = {});
                const s = new(o.MutationObserver || o.WebkitMutationObserver)(e => {
                    if (1 === e.length) return void n("observerUpdate", e[0]);
                    const t = function() { n("observerUpdate", e[0]) };
                    o.requestAnimationFrame ? o.requestAnimationFrame(t) : o.setTimeout(t, 0)
                });
                s.observe(e, { attributes: void 0 === t.attributes || t.attributes, childList: void 0 === t.childList || t.childList, characterData: void 0 === t.characterData || t.characterData }), a.push(s)
            };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }), i("init", () => {
            if (t.params.observer) {
                if (t.params.observeParents) { const e = t.$el.parents(); for (let t = 0; t < e.length; t += 1) l(e[t]) }
                l(t.$el[0], { childList: t.params.observeSlideChildren }), l(t.$wrapperEl[0], { attributes: !1 })
            }
        }), i("destroy", () => { a.forEach(e => { e.disconnect() }), a.splice(0, a.length) })
    }]);
    const Z = [function(e) {
        let t, { swiper: s, extendParams: i, on: n, emit: r } = e;

        function a(e, t) { const i = s.params.virtual; if (i.cache && s.virtual.cache[t]) return s.virtual.cache[t]; const n = i.renderSlide ? c(i.renderSlide.call(s, e, t)) : c(`<div class="${s.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`); return n.attr("data-swiper-slide-index") || n.attr("data-swiper-slide-index", t), i.cache && (s.virtual.cache[t] = n), n }

        function o(e) {
            const { slidesPerView: t, slidesPerGroup: i, centeredSlides: n } = s.params, { addSlidesBefore: o, addSlidesAfter: l } = s.params.virtual, { from: c, to: d, slides: u, slidesGrid: p, offset: h } = s.virtual;
            s.params.cssMode || s.updateActiveIndex();
            const f = s.activeIndex || 0;
            let m, g, v;
            m = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top", n ? (g = Math.floor(t / 2) + i + l, v = Math.floor(t / 2) + i + o) : (g = t + (i - 1) + l, v = i + o);
            const b = Math.max((f || 0) - v, 0),
                y = Math.min((f || 0) + g, u.length - 1),
                w = (s.slidesGrid[b] || 0) - (s.slidesGrid[0] || 0);

            function x() { s.updateSlides(), s.updateProgress(), s.updateSlidesClasses(), s.lazy && s.params.lazy.enabled && s.lazy.load(), r("virtualUpdate") }
            if (Object.assign(s.virtual, { from: b, to: y, offset: w, slidesGrid: s.slidesGrid }), c === b && d === y && !e) return s.slidesGrid !== p && w !== h && s.slides.css(m, w + "px"), s.updateProgress(), void r("virtualUpdate");
            if (s.params.virtual.renderExternal) return s.params.virtual.renderExternal.call(s, { offset: w, from: b, to: y, slides: function() { const e = []; for (let t = b; t <= y; t += 1) e.push(u[t]); return e }() }), void(s.params.virtual.renderExternalUpdate ? x() : r("virtualUpdate"));
            const _ = [],
                E = [];
            if (e) s.$wrapperEl.find("." + s.params.slideClass).remove();
            else
                for (let e = c; e <= d; e += 1)(e < b || e > y) && s.$wrapperEl.find(`.${s.params.slideClass}[data-swiper-slide-index="${e}"]`).remove();
            for (let t = 0; t < u.length; t += 1) t >= b && t <= y && (void 0 === d || e ? E.push(t) : (t > d && E.push(t), t < c && _.push(t)));
            E.forEach(e => { s.$wrapperEl.append(a(u[e], e)) }), _.sort((e, t) => t - e).forEach(e => { s.$wrapperEl.prepend(a(u[e], e)) }), s.$wrapperEl.children(".swiper-slide").css(m, w + "px"), x()
        }
        i({ virtual: { enabled: !1, slides: [], cache: !0, renderSlide: null, renderExternal: null, renderExternalUpdate: !0, addSlidesBefore: 0, addSlidesAfter: 0 } }), s.virtual = { cache: {}, from: void 0, to: void 0, slides: [], offset: 0, slidesGrid: [] }, n("beforeInit", () => { s.params.virtual.enabled && (s.virtual.slides = s.params.virtual.slides, s.classNames.push(s.params.containerModifierClass + "virtual"), s.params.watchSlidesProgress = !0, s.originalParams.watchSlidesProgress = !0, s.params.initialSlide || o()) }), n("setTranslate", () => { s.params.virtual.enabled && (s.params.cssMode && !s._immediateVirtual ? (clearTimeout(t), t = setTimeout(() => { o() }, 100)) : o()) }), n("init update resize", () => { s.params.virtual.enabled && s.params.cssMode && v(s.wrapperEl, "--swiper-virtual-size", s.virtualSize + "px") }), Object.assign(s.virtual, {
            appendSlide: function(e) {
                if ("object" == typeof e && "length" in e)
                    for (let t = 0; t < e.length; t += 1) e[t] && s.virtual.slides.push(e[t]);
                else s.virtual.slides.push(e);
                o(!0)
            },
            prependSlide: function(e) {
                const t = s.activeIndex;
                let i = t + 1,
                    n = 1;
                if (Array.isArray(e)) {
                    for (let t = 0; t < e.length; t += 1) e[t] && s.virtual.slides.unshift(e[t]);
                    i = t + e.length, n = e.length
                } else s.virtual.slides.unshift(e);
                if (s.params.virtual.cache) {
                    const e = s.virtual.cache,
                        t = {};
                    Object.keys(e).forEach(s => {
                        const i = e[s],
                            r = i.attr("data-swiper-slide-index");
                        r && i.attr("data-swiper-slide-index", parseInt(r, 10) + n), t[parseInt(s, 10) + n] = i
                    }), s.virtual.cache = t
                }
                o(!0), s.slideTo(i, 0)
            },
            removeSlide: function(e) {
                if (null == e) return;
                let t = s.activeIndex;
                if (Array.isArray(e))
                    for (let i = e.length - 1; i >= 0; i -= 1) s.virtual.slides.splice(e[i], 1), s.params.virtual.cache && delete s.virtual.cache[e[i]], e[i] < t && (t -= 1), t = Math.max(t, 0);
                else s.virtual.slides.splice(e, 1), s.params.virtual.cache && delete s.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0);
                o(!0), s.slideTo(t, 0)
            },
            removeAllSlides: function() { s.virtual.slides = [], s.params.virtual.cache && (s.virtual.cache = {}), o(!0), s.slideTo(0, 0) },
            update: o
        })
    }, function(e) {
        let { swiper: t, extendParams: s, on: n, emit: a } = e;
        const o = i(),
            l = r();

        function d(e) {
            if (!t.enabled) return;
            const { rtlTranslate: s } = t;
            let i = e;
            i.originalEvent && (i = i.originalEvent);
            const n = i.keyCode || i.charCode,
                r = t.params.keyboard.pageUpDown,
                c = r && 33 === n,
                d = r && 34 === n,
                u = 37 === n,
                p = 39 === n,
                h = 38 === n,
                f = 40 === n;
            if (!t.allowSlideNext && (t.isHorizontal() && p || t.isVertical() && f || d)) return !1;
            if (!t.allowSlidePrev && (t.isHorizontal() && u || t.isVertical() && h || c)) return !1;
            if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || o.activeElement && o.activeElement.nodeName && ("input" === o.activeElement.nodeName.toLowerCase() || "textarea" === o.activeElement.nodeName.toLowerCase()))) {
                if (t.params.keyboard.onlyInViewport && (c || d || u || p || h || f)) {
                    let e = !1;
                    if (t.$el.parents("." + t.params.slideClass).length > 0 && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
                    const i = t.$el,
                        n = i[0].clientWidth,
                        r = i[0].clientHeight,
                        a = l.innerWidth,
                        o = l.innerHeight,
                        c = t.$el.offset();
                    s && (c.left -= t.$el[0].scrollLeft);
                    const d = [
                        [c.left, c.top],
                        [c.left + n, c.top],
                        [c.left, c.top + r],
                        [c.left + n, c.top + r]
                    ];
                    for (let t = 0; t < d.length; t += 1) {
                        const s = d[t];
                        if (s[0] >= 0 && s[0] <= a && s[1] >= 0 && s[1] <= o) {
                            if (0 === s[0] && 0 === s[1]) continue;
                            e = !0
                        }
                    }
                    if (!e) return
                }
                t.isHorizontal() ? ((c || d || u || p) && (i.preventDefault ? i.preventDefault() : i.returnValue = !1), ((d || p) && !s || (c || u) && s) && t.slideNext(), ((c || u) && !s || (d || p) && s) && t.slidePrev()) : ((c || d || h || f) && (i.preventDefault ? i.preventDefault() : i.returnValue = !1), (d || f) && t.slideNext(), (c || h) && t.slidePrev()), a("keyPress", n)
            }
        }

        function u() { t.keyboard.enabled || (c(o).on("keydown", d), t.keyboard.enabled = !0) }

        function p() { t.keyboard.enabled && (c(o).off("keydown", d), t.keyboard.enabled = !1) }
        t.keyboard = { enabled: !1 }, s({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }), n("init", () => { t.params.keyboard.enabled && u() }), n("destroy", () => { t.keyboard.enabled && p() }), Object.assign(t.keyboard, { enable: u, disable: p })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        const a = r();
        let o;
        s({ mousewheel: { enabled: !1, releaseOnEdges: !1, invert: !1, forceToAxis: !1, sensitivity: 1, eventsTarget: "container", thresholdDelta: null, thresholdTime: null } }), t.mousewheel = { enabled: !1 };
        let l, d = p();
        const h = [];

        function f() { t.enabled && (t.mouseEntered = !0) }

        function m() { t.enabled && (t.mouseEntered = !1) }

        function g(e) { return !(t.params.mousewheel.thresholdDelta && e.delta < t.params.mousewheel.thresholdDelta || t.params.mousewheel.thresholdTime && p() - d < t.params.mousewheel.thresholdTime || !(e.delta >= 6 && p() - d < 60) && (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), n("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), n("scroll", e.raw)), d = (new a.Date).getTime(), 1)) }

        function v(e) {
            let s = e,
                i = !0;
            if (!t.enabled) return;
            const r = t.params.mousewheel;
            t.params.cssMode && s.preventDefault();
            let a = t.$el;
            if ("container" !== t.params.mousewheel.eventsTarget && (a = c(t.params.mousewheel.eventsTarget)), !t.mouseEntered && !a[0].contains(s.target) && !r.releaseOnEdges) return !0;
            s.originalEvent && (s = s.originalEvent);
            let d = 0;
            const f = t.rtlTranslate ? -1 : 1,
                m = function(e) {
                    let t = 0,
                        s = 0,
                        i = 0,
                        n = 0;
                    return "detail" in e && (s = e.detail), "wheelDelta" in e && (s = -e.wheelDelta / 120), "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = s, s = 0), i = 10 * t, n = 10 * s, "deltaY" in e && (n = e.deltaY), "deltaX" in e && (i = e.deltaX), e.shiftKey && !i && (i = n, n = 0), (i || n) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, n *= 40) : (i *= 800, n *= 800)), i && !t && (t = i < 1 ? -1 : 1), n && !s && (s = n < 1 ? -1 : 1), { spinX: t, spinY: s, pixelX: i, pixelY: n }
                }(s);
            if (r.forceToAxis)
                if (t.isHorizontal()) {
                    if (!(Math.abs(m.pixelX) > Math.abs(m.pixelY))) return !0;
                    d = -m.pixelX * f
                } else {
                    if (!(Math.abs(m.pixelY) > Math.abs(m.pixelX))) return !0;
                    d = -m.pixelY
                }
            else d = Math.abs(m.pixelX) > Math.abs(m.pixelY) ? -m.pixelX * f : -m.pixelY;
            if (0 === d) return !0;
            r.invert && (d = -d);
            let v = t.getTranslate() + d * r.sensitivity;
            if (v >= t.minTranslate() && (v = t.minTranslate()), v <= t.maxTranslate() && (v = t.maxTranslate()), i = !!t.params.loop || !(v === t.minTranslate() || v === t.maxTranslate()), i && t.params.nested && s.stopPropagation(), t.params.freeMode && t.params.freeMode.enabled) {
                const e = { time: p(), delta: Math.abs(d), direction: Math.sign(d) },
                    i = l && e.time < l.time + 500 && e.delta <= l.delta && e.direction === l.direction;
                if (!i) {
                    l = void 0, t.params.loop && t.loopFix();
                    let a = t.getTranslate() + d * r.sensitivity;
                    const c = t.isBeginning,
                        p = t.isEnd;
                    if (a >= t.minTranslate() && (a = t.minTranslate()), a <= t.maxTranslate() && (a = t.maxTranslate()), t.setTransition(0), t.setTranslate(a), t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses(), (!c && t.isBeginning || !p && t.isEnd) && t.updateSlidesClasses(), t.params.freeMode.sticky) {
                        clearTimeout(o), o = void 0, h.length >= 15 && h.shift();
                        const s = h.length ? h[h.length - 1] : void 0,
                            i = h[0];
                        if (h.push(e), s && (e.delta > s.delta || e.direction !== s.direction)) h.splice(0);
                        else if (h.length >= 15 && e.time - i.time < 500 && i.delta - e.delta >= 1 && e.delta <= 6) {
                            const s = d > 0 ? .8 : .2;
                            l = e, h.splice(0), o = u(() => { t.slideToClosest(t.params.speed, !0, void 0, s) }, 0)
                        }
                        o || (o = u(() => { l = e, h.splice(0), t.slideToClosest(t.params.speed, !0, void 0, .5) }, 500))
                    }
                    if (i || n("scroll", s), t.params.autoplay && t.params.autoplayDisableOnInteraction && t.autoplay.stop(), a === t.minTranslate() || a === t.maxTranslate()) return !0
                }
            } else {
                const s = { time: p(), delta: Math.abs(d), direction: Math.sign(d), raw: e };
                h.length >= 2 && h.shift();
                const i = h.length ? h[h.length - 1] : void 0;
                if (h.push(s), i ? (s.direction !== i.direction || s.delta > i.delta || s.time > i.time + 150) && g(s) : g(s), function(e) { const s = t.params.mousewheel; if (e.direction < 0) { if (t.isEnd && !t.params.loop && s.releaseOnEdges) return !0 } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges) return !0; return !1 }(s)) return !0
            }
            return s.preventDefault ? s.preventDefault() : s.returnValue = !1, !1
        }

        function b(e) { let s = t.$el; "container" !== t.params.mousewheel.eventsTarget && (s = c(t.params.mousewheel.eventsTarget)), s[e]("mouseenter", f), s[e]("mouseleave", m), s[e]("wheel", v) }

        function y() { return t.params.cssMode ? (t.wrapperEl.removeEventListener("wheel", v), !0) : !t.mousewheel.enabled && (b("on"), t.mousewheel.enabled = !0, !0) }

        function w() { return t.params.cssMode ? (t.wrapperEl.addEventListener(event, v), !0) : !!t.mousewheel.enabled && (b("off"), t.mousewheel.enabled = !1, !0) }
        i("init", () => {!t.params.mousewheel.enabled && t.params.cssMode && w(), t.params.mousewheel.enabled && y() }), i("destroy", () => { t.params.cssMode && y(), t.mousewheel.enabled && w() }), Object.assign(t.mousewheel, { enable: y, disable: w })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;

        function r(e) { let s; return e && (s = c(e), t.params.uniqueNavElements && "string" == typeof e && s.length > 1 && 1 === t.$el.find(e).length && (s = t.$el.find(e))), s }

        function a(e, s) {
            const i = t.params.navigation;
            e && e.length > 0 && (e[s ? "addClass" : "removeClass"](i.disabledClass), e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s), t.params.watchOverflow && t.enabled && e[t.isLocked ? "addClass" : "removeClass"](i.lockClass))
        }

        function o() {
            if (t.params.loop) return;
            const { $nextEl: e, $prevEl: s } = t.navigation;
            a(s, t.isBeginning && !t.params.rewind), a(e, t.isEnd && !t.params.rewind)
        }

        function l(e) { e.preventDefault(), (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(), n("navigationPrev")) }

        function d(e) { e.preventDefault(), (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(), n("navigationNext")) }

        function u() {
            const e = t.params.navigation;
            if (t.params.navigation = B(t, t.originalParams.navigation, t.params.navigation, { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }), !e.nextEl && !e.prevEl) return;
            const s = r(e.nextEl),
                i = r(e.prevEl);
            s && s.length > 0 && s.on("click", d), i && i.length > 0 && i.on("click", l), Object.assign(t.navigation, { $nextEl: s, nextEl: s && s[0], $prevEl: i, prevEl: i && i[0] }), t.enabled || (s && s.addClass(e.lockClass), i && i.addClass(e.lockClass))
        }

        function p() {
            const { $nextEl: e, $prevEl: s } = t.navigation;
            e && e.length && (e.off("click", d), e.removeClass(t.params.navigation.disabledClass)), s && s.length && (s.off("click", l), s.removeClass(t.params.navigation.disabledClass))
        }
        s({ navigation: { nextEl: null, prevEl: null, hideOnClick: !1, disabledClass: "swiper-button-disabled", hiddenClass: "swiper-button-hidden", lockClass: "swiper-button-lock", navigationDisabledClass: "swiper-navigation-disabled" } }), t.navigation = { nextEl: null, $nextEl: null, prevEl: null, $prevEl: null }, i("init", () => {!1 === t.params.navigation.enabled ? h() : (u(), o()) }), i("toEdge fromEdge lock unlock", () => { o() }), i("destroy", () => { p() }), i("enable disable", () => {
            const { $nextEl: e, $prevEl: s } = t.navigation;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass), s && s[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass)
        }), i("click", (e, s) => {
            const { $nextEl: i, $prevEl: r } = t.navigation, a = s.target;
            if (t.params.navigation.hideOnClick && !c(a).is(r) && !c(a).is(i)) {
                if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === a || t.pagination.el.contains(a))) return;
                let e;
                i ? e = i.hasClass(t.params.navigation.hiddenClass) : r && (e = r.hasClass(t.params.navigation.hiddenClass)), n(!0 === e ? "navigationShow" : "navigationHide"), i && i.toggleClass(t.params.navigation.hiddenClass), r && r.toggleClass(t.params.navigation.hiddenClass)
            }
        });
        const h = () => { t.$el.addClass(t.params.navigation.navigationDisabledClass), p() };
        Object.assign(t.navigation, { enable: () => { t.$el.removeClass(t.params.navigation.navigationDisabledClass), u(), o() }, disable: h, update: o, init: u, destroy: p })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        const r = "swiper-pagination";
        let a;
        s({ pagination: { el: null, bulletElement: "span", clickable: !1, hideOnClick: !1, renderBullet: null, renderProgressbar: null, renderFraction: null, renderCustom: null, progressbarOpposite: !1, type: "bullets", dynamicBullets: !1, dynamicMainBullets: 1, formatFractionCurrent: e => e, formatFractionTotal: e => e, bulletClass: r + "-bullet", bulletActiveClass: r + "-bullet-active", modifierClass: r + "-", currentClass: r + "-current", totalClass: r + "-total", hiddenClass: r + "-hidden", progressbarFillClass: r + "-progressbar-fill", progressbarOppositeClass: r + "-progressbar-opposite", clickableClass: r + "-clickable", lockClass: r + "-lock", horizontalClass: r + "-horizontal", verticalClass: r + "-vertical", paginationDisabledClass: r + "-disabled" } }), t.pagination = { el: null, $el: null, bullets: [] };
        let o = 0;

        function l() { return !t.params.pagination.el || !t.pagination.el || !t.pagination.$el || 0 === t.pagination.$el.length }

        function d(e, s) {
            const { bulletActiveClass: i } = t.params.pagination;
            e[s]().addClass(`${i}-${s}`)[s]().addClass(`${i}-${s}-${s}`)
        }

        function u() {
            const e = t.rtl,
                s = t.params.pagination;
            if (l()) return;
            const i = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length,
                r = t.pagination.$el;
            let u;
            const p = t.params.loop ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
            if (t.params.loop ? (u = Math.ceil((t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup), u > i - 1 - 2 * t.loopedSlides && (u -= i - 2 * t.loopedSlides), u > p - 1 && (u -= p), u < 0 && "bullets" !== t.params.paginationType && (u = p + u)) : u = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0, "bullets" === s.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
                const i = t.pagination.bullets;
                let n, l, p;
                if (s.dynamicBullets && (a = i.eq(0)[t.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(t.isHorizontal() ? "width" : "height", a * (s.dynamicMainBullets + 4) + "px"), s.dynamicMainBullets > 1 && void 0 !== t.previousIndex && (o += u - (t.previousIndex - t.loopedSlides || 0), o > s.dynamicMainBullets - 1 ? o = s.dynamicMainBullets - 1 : o < 0 && (o = 0)), n = Math.max(u - o, 0), l = n + (Math.min(i.length, s.dynamicMainBullets) - 1), p = (l + n) / 2), i.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(e => `${s.bulletActiveClass}${e}`).join(" ")), r.length > 1) i.each(e => {
                    const t = c(e),
                        i = t.index();
                    i === u && t.addClass(s.bulletActiveClass), s.dynamicBullets && (i >= n && i <= l && t.addClass(s.bulletActiveClass + "-main"), i === n && d(t, "prev"), i === l && d(t, "next"))
                });
                else {
                    const e = i.eq(u),
                        r = e.index();
                    if (e.addClass(s.bulletActiveClass), s.dynamicBullets) {
                        const e = i.eq(n),
                            a = i.eq(l);
                        for (let e = n; e <= l; e += 1) i.eq(e).addClass(s.bulletActiveClass + "-main");
                        if (t.params.loop)
                            if (r >= i.length) {
                                for (let e = s.dynamicMainBullets; e >= 0; e -= 1) i.eq(i.length - e).addClass(s.bulletActiveClass + "-main");
                                i.eq(i.length - s.dynamicMainBullets - 1).addClass(s.bulletActiveClass + "-prev")
                            } else d(e, "prev"), d(a, "next");
                        else d(e, "prev"), d(a, "next")
                    }
                }
                if (s.dynamicBullets) {
                    const n = Math.min(i.length, s.dynamicMainBullets + 4),
                        r = (a * n - a) / 2 - p * a,
                        o = e ? "right" : "left";
                    i.css(t.isHorizontal() ? o : "top", r + "px")
                }
            }
            if ("fraction" === s.type && (r.find(W(s.currentClass)).text(s.formatFractionCurrent(u + 1)), r.find(W(s.totalClass)).text(s.formatFractionTotal(p))), "progressbar" === s.type) {
                let e;
                e = s.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical";
                const i = (u + 1) / p;
                let n = 1,
                    a = 1;
                "horizontal" === e ? n = i : a = i, r.find(W(s.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${a})`).transition(t.params.speed)
            }
            "custom" === s.type && s.renderCustom ? (r.html(s.renderCustom(t, u + 1, p)), n("paginationRender", r[0])) : n("paginationUpdate", r[0]), t.params.watchOverflow && t.enabled && r[t.isLocked ? "addClass" : "removeClass"](s.lockClass)
        }

        function p() {
            const e = t.params.pagination;
            if (l()) return;
            const s = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length,
                i = t.pagination.$el;
            let r = "";
            if ("bullets" === e.type) {
                let n = t.params.loop ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
                t.params.freeMode && t.params.freeMode.enabled && !t.params.loop && n > s && (n = s);
                for (let s = 0; s < n; s += 1) e.renderBullet ? r += e.renderBullet.call(t, s, e.bulletClass) : r += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`;
                i.html(r), t.pagination.bullets = i.find(W(e.bulletClass))
            }
            "fraction" === e.type && (r = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`, i.html(r)), "progressbar" === e.type && (r = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`, i.html(r)), "custom" !== e.type && n("paginationRender", t.pagination.$el[0])
        }

        function h() {
            t.params.pagination = B(t, t.originalParams.pagination, t.params.pagination, { el: "swiper-pagination" });
            const e = t.params.pagination;
            if (!e.el) return;
            let s = c(e.el);
            0 !== s.length && (t.params.uniqueNavElements && "string" == typeof e.el && s.length > 1 && (s = t.$el.find(e.el), s.length > 1 && (s = s.filter(e => c(e).parents(".swiper")[0] === t.el))), "bullets" === e.type && e.clickable && s.addClass(e.clickableClass), s.addClass(e.modifierClass + e.type), s.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass), "bullets" === e.type && e.dynamicBullets && (s.addClass(`${e.modifierClass}${e.type}-dynamic`), o = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && s.addClass(e.progressbarOppositeClass), e.clickable && s.on("click", W(e.bulletClass), (function(e) {
                e.preventDefault();
                let s = c(this).index() * t.params.slidesPerGroup;
                t.params.loop && (s += t.loopedSlides), t.slideTo(s)
            })), Object.assign(t.pagination, { $el: s, el: s[0] }), t.enabled || s.addClass(e.lockClass))
        }

        function f() {
            const e = t.params.pagination;
            if (l()) return;
            const s = t.pagination.$el;
            s.removeClass(e.hiddenClass), s.removeClass(e.modifierClass + e.type), s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass), t.pagination.bullets && t.pagination.bullets.removeClass && t.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && s.off("click", W(e.bulletClass))
        }
        i("init", () => {!1 === t.params.pagination.enabled ? m() : (h(), p(), u()) }), i("activeIndexChange", () => {
            (t.params.loop || void 0 === t.snapIndex) && u()
        }), i("snapIndexChange", () => { t.params.loop || u() }), i("slidesLengthChange", () => { t.params.loop && (p(), u()) }), i("snapGridLengthChange", () => { t.params.loop || (p(), u()) }), i("destroy", () => { f() }), i("enable disable", () => {
            const { $el: e } = t.pagination;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.pagination.lockClass)
        }), i("lock unlock", () => { u() }), i("click", (e, s) => {
            const i = s.target,
                { $el: r } = t.pagination;
            if (t.params.pagination.el && t.params.pagination.hideOnClick && r && r.length > 0 && !c(i).hasClass(t.params.pagination.bulletClass)) {
                if (t.navigation && (t.navigation.nextEl && i === t.navigation.nextEl || t.navigation.prevEl && i === t.navigation.prevEl)) return;
                const e = r.hasClass(t.params.pagination.hiddenClass);
                n(!0 === e ? "paginationShow" : "paginationHide"), r.toggleClass(t.params.pagination.hiddenClass)
            }
        });
        const m = () => { t.$el.addClass(t.params.pagination.paginationDisabledClass), t.pagination.$el && t.pagination.$el.addClass(t.params.pagination.paginationDisabledClass), f() };
        Object.assign(t.pagination, { enable: () => { t.$el.removeClass(t.params.pagination.paginationDisabledClass), t.pagination.$el && t.pagination.$el.removeClass(t.params.pagination.paginationDisabledClass), h(), p(), u() }, disable: m, render: p, update: u, init: h, destroy: f })
    }, function(e) {
        let { swiper: t, extendParams: s, on: n, emit: r } = e;
        const a = i();
        let o, l, d, p, h = !1,
            f = null,
            m = null;

        function g() {
            if (!t.params.scrollbar.el || !t.scrollbar.el) return;
            const { scrollbar: e, rtlTranslate: s, progress: i } = t, { $dragEl: n, $el: r } = e, a = t.params.scrollbar;
            let o = l,
                c = (d - l) * i;
            s ? (c = -c, c > 0 ? (o = l - c, c = 0) : -c + l > d && (o = d + c)) : c < 0 ? (o = l + c, c = 0) : c + l > d && (o = d - c), t.isHorizontal() ? (n.transform(`translate3d(${c}px, 0, 0)`), n[0].style.width = o + "px") : (n.transform(`translate3d(0px, ${c}px, 0)`), n[0].style.height = o + "px"), a.hide && (clearTimeout(f), r[0].style.opacity = 1, f = setTimeout(() => { r[0].style.opacity = 0, r.transition(400) }, 1e3))
        }

        function v() {
            if (!t.params.scrollbar.el || !t.scrollbar.el) return;
            const { scrollbar: e } = t, { $dragEl: s, $el: i } = e;
            s[0].style.width = "", s[0].style.height = "", d = t.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, p = t.size / (t.virtualSize + t.params.slidesOffsetBefore - (t.params.centeredSlides ? t.snapGrid[0] : 0)), l = "auto" === t.params.scrollbar.dragSize ? d * p : parseInt(t.params.scrollbar.dragSize, 10), t.isHorizontal() ? s[0].style.width = l + "px" : s[0].style.height = l + "px", i[0].style.display = p >= 1 ? "none" : "", t.params.scrollbar.hide && (i[0].style.opacity = 0), t.params.watchOverflow && t.enabled && e.$el[t.isLocked ? "addClass" : "removeClass"](t.params.scrollbar.lockClass)
        }

        function b(e) { return t.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY }

        function y(e) {
            const { scrollbar: s, rtlTranslate: i } = t, { $el: n } = s;
            let r;
            r = (b(e) - n.offset()[t.isHorizontal() ? "left" : "top"] - (null !== o ? o : l / 2)) / (d - l), r = Math.max(Math.min(r, 1), 0), i && (r = 1 - r);
            const a = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
            t.updateProgress(a), t.setTranslate(a), t.updateActiveIndex(), t.updateSlidesClasses()
        }

        function w(e) {
            const s = t.params.scrollbar,
                { scrollbar: i, $wrapperEl: n } = t,
                { $el: a, $dragEl: l } = i;
            h = !0, o = e.target === l[0] || e.target === l ? b(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), n.transition(100), l.transition(100), y(e), clearTimeout(m), a.transition(0), s.hide && a.css("opacity", 1), t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"), r("scrollbarDragStart", e)
        }

        function x(e) {
            const { scrollbar: s, $wrapperEl: i } = t, { $el: n, $dragEl: a } = s;
            h && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, y(e), i.transition(0), n.transition(0), a.transition(0), r("scrollbarDragMove", e))
        }

        function _(e) {
            const s = t.params.scrollbar,
                { scrollbar: i, $wrapperEl: n } = t,
                { $el: a } = i;
            h && (h = !1, t.params.cssMode && (t.$wrapperEl.css("scroll-snap-type", ""), n.transition("")), s.hide && (clearTimeout(m), m = u(() => { a.css("opacity", 0), a.transition(400) }, 1e3)), r("scrollbarDragEnd", e), s.snapOnRelease && t.slideToClosest())
        }

        function E(e) {
            const { scrollbar: s, touchEventsTouch: i, touchEventsDesktop: n, params: r, support: o } = t, l = s.$el;
            if (!l) return;
            const c = l[0],
                d = !(!o.passiveListener || !r.passiveListeners) && { passive: !1, capture: !1 },
                u = !(!o.passiveListener || !r.passiveListeners) && { passive: !0, capture: !1 };
            if (!c) return;
            const p = "on" === e ? "addEventListener" : "removeEventListener";
            o.touch ? (c[p](i.start, w, d), c[p](i.move, x, d), c[p](i.end, _, u)) : (c[p](n.start, w, d), a[p](n.move, x, d), a[p](n.end, _, u))
        }

        function T() {
            const { scrollbar: e, $el: s } = t;
            t.params.scrollbar = B(t, t.originalParams.scrollbar, t.params.scrollbar, { el: "swiper-scrollbar" });
            const i = t.params.scrollbar;
            if (!i.el) return;
            let n = c(i.el);
            t.params.uniqueNavElements && "string" == typeof i.el && n.length > 1 && 1 === s.find(i.el).length && (n = s.find(i.el)), n.addClass(t.isHorizontal() ? i.horizontalClass : i.verticalClass);
            let r = n.find("." + t.params.scrollbar.dragClass);
            0 === r.length && (r = c(`<div class="${t.params.scrollbar.dragClass}"></div>`), n.append(r)), Object.assign(e, { $el: n, el: n[0], $dragEl: r, dragEl: r[0] }), i.draggable && t.params.scrollbar.el && t.scrollbar.el && E("on"), n && n[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass)
        }

        function C() {
            const e = t.params.scrollbar,
                s = t.scrollbar.$el;
            s && s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass), t.params.scrollbar.el && t.scrollbar.el && E("off")
        }
        s({ scrollbar: { el: null, dragSize: "auto", hide: !1, draggable: !1, snapOnRelease: !0, lockClass: "swiper-scrollbar-lock", dragClass: "swiper-scrollbar-drag", scrollbarDisabledClass: "swiper-scrollbar-disabled", horizontalClass: "swiper-scrollbar-horizontal", verticalClass: "swiper-scrollbar-vertical" } }), t.scrollbar = { el: null, dragEl: null, $el: null, $dragEl: null }, n("init", () => {!1 === t.params.scrollbar.enabled ? S() : (T(), v(), g()) }), n("update resize observerUpdate lock unlock", () => { v() }), n("setTranslate", () => { g() }), n("setTransition", (e, s) => {! function(e) { t.params.scrollbar.el && t.scrollbar.el && t.scrollbar.$dragEl.transition(e) }(s) }), n("enable disable", () => {
            const { $el: e } = t.scrollbar;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass)
        }), n("destroy", () => { C() });
        const S = () => { t.$el.addClass(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.$el && t.scrollbar.$el.addClass(t.params.scrollbar.scrollbarDisabledClass), C() };
        Object.assign(t.scrollbar, { enable: () => { t.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass), t.scrollbar.$el && t.scrollbar.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass), T(), v(), g() }, disable: S, updateSize: v, setTranslate: g, init: T, destroy: C })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i } = e;
        s({ parallax: { enabled: !1 } });
        const n = (e, s) => {
                const { rtl: i } = t, n = c(e), r = i ? -1 : 1, a = n.attr("data-swiper-parallax") || "0";
                let o = n.attr("data-swiper-parallax-x"),
                    l = n.attr("data-swiper-parallax-y");
                const d = n.attr("data-swiper-parallax-scale"),
                    u = n.attr("data-swiper-parallax-opacity");
                if (o || l ? (o = o || "0", l = l || "0") : t.isHorizontal() ? (o = a, l = "0") : (l = a, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * s * r + "%" : o * s * r + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * s + "%" : l * s + "px", null != u) {
                    const e = u - (u - 1) * (1 - Math.abs(s));
                    n[0].style.opacity = e
                }
                if (null == d) n.transform(`translate3d(${o}, ${l}, 0px)`);
                else {
                    const e = d - (d - 1) * (1 - Math.abs(s));
                    n.transform(`translate3d(${o}, ${l}, 0px) scale(${e})`)
                }
            },
            r = () => {
                const { $el: e, slides: s, progress: i, snapGrid: r } = t;
                e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => { n(e, i) }), s.each((e, s) => {
                    let a = e.progress;
                    t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (a += Math.ceil(s / 2) - i * (r.length - 1)), a = Math.min(Math.max(a, -1), 1), c(e).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => { n(e, a) })
                })
            };
        i("beforeInit", () => { t.params.parallax.enabled && (t.params.watchSlidesProgress = !0, t.originalParams.watchSlidesProgress = !0) }), i("init", () => { t.params.parallax.enabled && r() }), i("setTranslate", () => { t.params.parallax.enabled && r() }), i("setTransition", (e, s) => {
            t.params.parallax.enabled && function(e) {
                void 0 === e && (e = t.params.speed);
                const { $el: s } = t;
                s.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(t => {
                    const s = c(t);
                    let i = parseInt(s.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (i = 0), s.transition(i)
                })
            }(s)
        })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        const a = r();
        s({ zoom: { enabled: !1, maxRatio: 3, minRatio: 1, toggle: !0, containerClass: "swiper-zoom-container", zoomedSlideClass: "swiper-slide-zoomed" } }), t.zoom = { enabled: !1 };
        let o, l, d, u = 1,
            p = !1;
        const f = { $slideEl: void 0, slideWidth: void 0, slideHeight: void 0, $imageEl: void 0, $imageWrapEl: void 0, maxRatio: 3 },
            m = { isTouched: void 0, isMoved: void 0, currentX: void 0, currentY: void 0, minX: void 0, minY: void 0, maxX: void 0, maxY: void 0, width: void 0, height: void 0, startX: void 0, startY: void 0, touchesStart: {}, touchesCurrent: {} },
            g = { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 };
        let v = 1;

        function b(e) {
            if (e.targetTouches.length < 2) return 1;
            const t = e.targetTouches[0].pageX,
                s = e.targetTouches[0].pageY,
                i = e.targetTouches[1].pageX,
                n = e.targetTouches[1].pageY;
            return Math.sqrt((i - t) ** 2 + (n - s) ** 2)
        }

        function y(e) {
            const s = t.support,
                i = t.params.zoom;
            if (l = !1, d = !1, !s.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                l = !0, f.scaleStart = b(e)
            }
            f.$slideEl && f.$slideEl.length || (f.$slideEl = c(e.target).closest("." + t.params.slideClass), 0 === f.$slideEl.length && (f.$slideEl = t.slides.eq(t.activeIndex)), f.$imageEl = f.$slideEl.find("." + i.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), f.$imageWrapEl = f.$imageEl.parent("." + i.containerClass), f.maxRatio = f.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 0 !== f.$imageWrapEl.length) ? (f.$imageEl && f.$imageEl.transition(0), p = !0) : f.$imageEl = void 0
        }

        function w(e) {
            const s = t.support,
                i = t.params.zoom,
                n = t.zoom;
            if (!s.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                d = !0, f.scaleMove = b(e)
            }
            f.$imageEl && 0 !== f.$imageEl.length ? (s.gestures ? n.scale = e.scale * u : n.scale = f.scaleMove / f.scaleStart * u, n.scale > f.maxRatio && (n.scale = f.maxRatio - 1 + (n.scale - f.maxRatio + 1) ** .5), n.scale < i.minRatio && (n.scale = i.minRatio + 1 - (i.minRatio - n.scale + 1) ** .5), f.$imageEl.transform(`translate3d(0,0,0) scale(${n.scale})`)) : "gesturechange" === e.type && y(e)
        }

        function x(e) {
            const s = t.device,
                i = t.support,
                n = t.params.zoom,
                r = t.zoom;
            if (!i.gestures) {
                if (!l || !d) return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !s.android) return;
                l = !1, d = !1
            }
            f.$imageEl && 0 !== f.$imageEl.length && (r.scale = Math.max(Math.min(r.scale, f.maxRatio), n.minRatio), f.$imageEl.transition(t.params.speed).transform(`translate3d(0,0,0) scale(${r.scale})`), u = r.scale, p = !1, 1 === r.scale && (f.$slideEl = void 0))
        }

        function _(e) {
            const s = t.zoom;
            if (!f.$imageEl || 0 === f.$imageEl.length) return;
            if (t.allowClick = !1, !m.isTouched || !f.$slideEl) return;
            m.isMoved || (m.width = f.$imageEl[0].offsetWidth, m.height = f.$imageEl[0].offsetHeight, m.startX = h(f.$imageWrapEl[0], "x") || 0, m.startY = h(f.$imageWrapEl[0], "y") || 0, f.slideWidth = f.$slideEl[0].offsetWidth, f.slideHeight = f.$slideEl[0].offsetHeight, f.$imageWrapEl.transition(0));
            const i = m.width * s.scale,
                n = m.height * s.scale;
            if (!(i < f.slideWidth && n < f.slideHeight)) {
                if (m.minX = Math.min(f.slideWidth / 2 - i / 2, 0), m.maxX = -m.minX, m.minY = Math.min(f.slideHeight / 2 - n / 2, 0), m.maxY = -m.minY, m.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, m.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !m.isMoved && !p) { if (t.isHorizontal() && (Math.floor(m.minX) === Math.floor(m.startX) && m.touchesCurrent.x < m.touchesStart.x || Math.floor(m.maxX) === Math.floor(m.startX) && m.touchesCurrent.x > m.touchesStart.x)) return void(m.isTouched = !1); if (!t.isHorizontal() && (Math.floor(m.minY) === Math.floor(m.startY) && m.touchesCurrent.y < m.touchesStart.y || Math.floor(m.maxY) === Math.floor(m.startY) && m.touchesCurrent.y > m.touchesStart.y)) return void(m.isTouched = !1) }
                e.cancelable && e.preventDefault(), e.stopPropagation(), m.isMoved = !0, m.currentX = m.touchesCurrent.x - m.touchesStart.x + m.startX, m.currentY = m.touchesCurrent.y - m.touchesStart.y + m.startY, m.currentX < m.minX && (m.currentX = m.minX + 1 - (m.minX - m.currentX + 1) ** .8), m.currentX > m.maxX && (m.currentX = m.maxX - 1 + (m.currentX - m.maxX + 1) ** .8), m.currentY < m.minY && (m.currentY = m.minY + 1 - (m.minY - m.currentY + 1) ** .8), m.currentY > m.maxY && (m.currentY = m.maxY - 1 + (m.currentY - m.maxY + 1) ** .8), g.prevPositionX || (g.prevPositionX = m.touchesCurrent.x), g.prevPositionY || (g.prevPositionY = m.touchesCurrent.y), g.prevTime || (g.prevTime = Date.now()), g.x = (m.touchesCurrent.x - g.prevPositionX) / (Date.now() - g.prevTime) / 2, g.y = (m.touchesCurrent.y - g.prevPositionY) / (Date.now() - g.prevTime) / 2, Math.abs(m.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0), Math.abs(m.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0), g.prevPositionX = m.touchesCurrent.x, g.prevPositionY = m.touchesCurrent.y, g.prevTime = Date.now(), f.$imageWrapEl.transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`)
            }
        }

        function E() {
            const e = t.zoom;
            f.$slideEl && t.previousIndex !== t.activeIndex && (f.$imageEl && f.$imageEl.transform("translate3d(0,0,0) scale(1)"), f.$imageWrapEl && f.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, u = 1, f.$slideEl = void 0, f.$imageEl = void 0, f.$imageWrapEl = void 0)
        }

        function T(e) {
            const s = t.zoom,
                i = t.params.zoom;
            if (f.$slideEl || (e && e.target && (f.$slideEl = c(e.target).closest("." + t.params.slideClass)), f.$slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? f.$slideEl = t.$wrapperEl.children("." + t.params.slideActiveClass) : f.$slideEl = t.slides.eq(t.activeIndex)), f.$imageEl = f.$slideEl.find("." + i.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), f.$imageWrapEl = f.$imageEl.parent("." + i.containerClass)), !f.$imageEl || 0 === f.$imageEl.length || !f.$imageWrapEl || 0 === f.$imageWrapEl.length) return;
            let n, r, o, l, d, p, h, g, v, b, y, w, x, _, E, T, C, S;
            t.params.cssMode && (t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.touchAction = "none"), f.$slideEl.addClass("" + i.zoomedSlideClass), void 0 === m.touchesStart.x && e ? (n = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, r = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (n = m.touchesStart.x, r = m.touchesStart.y), s.scale = f.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, u = f.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, e ? (C = f.$slideEl[0].offsetWidth, S = f.$slideEl[0].offsetHeight, o = f.$slideEl.offset().left + a.scrollX, l = f.$slideEl.offset().top + a.scrollY, d = o + C / 2 - n, p = l + S / 2 - r, v = f.$imageEl[0].offsetWidth, b = f.$imageEl[0].offsetHeight, y = v * s.scale, w = b * s.scale, x = Math.min(C / 2 - y / 2, 0), _ = Math.min(S / 2 - w / 2, 0), E = -x, T = -_, h = d * s.scale, g = p * s.scale, h < x && (h = x), h > E && (h = E), g < _ && (g = _), g > T && (g = T)) : (h = 0, g = 0), f.$imageWrapEl.transition(300).transform(`translate3d(${h}px, ${g}px,0)`), f.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${s.scale})`)
        }

        function C() {
            const e = t.zoom,
                s = t.params.zoom;
            f.$slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? f.$slideEl = t.$wrapperEl.children("." + t.params.slideActiveClass) : f.$slideEl = t.slides.eq(t.activeIndex), f.$imageEl = f.$slideEl.find("." + s.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0), f.$imageWrapEl = f.$imageEl.parent("." + s.containerClass)), f.$imageEl && 0 !== f.$imageEl.length && f.$imageWrapEl && 0 !== f.$imageWrapEl.length && (t.params.cssMode && (t.wrapperEl.style.overflow = "", t.wrapperEl.style.touchAction = ""), e.scale = 1, u = 1, f.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), f.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), f.$slideEl.removeClass("" + s.zoomedSlideClass), f.$slideEl = void 0)
        }

        function S(e) {
            const s = t.zoom;
            s.scale && 1 !== s.scale ? C() : T(e)
        }

        function M() { const e = t.support; return { passiveListener: !("touchstart" !== t.touchEvents.start || !e.passiveListener || !t.params.passiveListeners) && { passive: !0, capture: !1 }, activeListenerWithCapture: !e.passiveListener || { passive: !1, capture: !0 } } }

        function k() { return "." + t.params.slideClass }

        function A(e) {
            const { passiveListener: s } = M(), i = k();
            t.$wrapperEl[e]("gesturestart", i, y, s), t.$wrapperEl[e]("gesturechange", i, w, s), t.$wrapperEl[e]("gestureend", i, x, s)
        }

        function P() { o || (o = !0, A("on")) }

        function O() { o && (o = !1, A("off")) }

        function L() {
            const e = t.zoom;
            if (e.enabled) return;
            e.enabled = !0;
            const s = t.support,
                { passiveListener: i, activeListenerWithCapture: n } = M(),
                r = k();
            s.gestures ? (t.$wrapperEl.on(t.touchEvents.start, P, i), t.$wrapperEl.on(t.touchEvents.end, O, i)) : "touchstart" === t.touchEvents.start && (t.$wrapperEl.on(t.touchEvents.start, r, y, i), t.$wrapperEl.on(t.touchEvents.move, r, w, n), t.$wrapperEl.on(t.touchEvents.end, r, x, i), t.touchEvents.cancel && t.$wrapperEl.on(t.touchEvents.cancel, r, x, i)), t.$wrapperEl.on(t.touchEvents.move, "." + t.params.zoom.containerClass, _, n)
        }

        function $() {
            const e = t.zoom;
            if (!e.enabled) return;
            const s = t.support;
            e.enabled = !1;
            const { passiveListener: i, activeListenerWithCapture: n } = M(), r = k();
            s.gestures ? (t.$wrapperEl.off(t.touchEvents.start, P, i), t.$wrapperEl.off(t.touchEvents.end, O, i)) : "touchstart" === t.touchEvents.start && (t.$wrapperEl.off(t.touchEvents.start, r, y, i), t.$wrapperEl.off(t.touchEvents.move, r, w, n), t.$wrapperEl.off(t.touchEvents.end, r, x, i), t.touchEvents.cancel && t.$wrapperEl.off(t.touchEvents.cancel, r, x, i)), t.$wrapperEl.off(t.touchEvents.move, "." + t.params.zoom.containerClass, _, n)
        }
        Object.defineProperty(t.zoom, "scale", {
            get: () => v,
            set(e) {
                if (v !== e) {
                    const t = f.$imageEl ? f.$imageEl[0] : void 0,
                        s = f.$slideEl ? f.$slideEl[0] : void 0;
                    n("zoomChange", e, t, s)
                }
                v = e
            }
        }), i("init", () => { t.params.zoom.enabled && L() }), i("destroy", () => { $() }), i("touchStart", (e, s) => {
            t.zoom.enabled && function(e) {
                const s = t.device;
                f.$imageEl && 0 !== f.$imageEl.length && (m.isTouched || (s.android && e.cancelable && e.preventDefault(), m.isTouched = !0, m.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, m.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            }(s)
        }), i("touchEnd", (e, s) => {
            t.zoom.enabled && function() {
                const e = t.zoom;
                if (!f.$imageEl || 0 === f.$imageEl.length) return;
                if (!m.isTouched || !m.isMoved) return m.isTouched = !1, void(m.isMoved = !1);
                m.isTouched = !1, m.isMoved = !1;
                let s = 300,
                    i = 300;
                const n = g.x * s,
                    r = m.currentX + n,
                    a = g.y * i,
                    o = m.currentY + a;
                0 !== g.x && (s = Math.abs((r - m.currentX) / g.x)), 0 !== g.y && (i = Math.abs((o - m.currentY) / g.y));
                const l = Math.max(s, i);
                m.currentX = r, m.currentY = o;
                const c = m.width * e.scale,
                    d = m.height * e.scale;
                m.minX = Math.min(f.slideWidth / 2 - c / 2, 0), m.maxX = -m.minX, m.minY = Math.min(f.slideHeight / 2 - d / 2, 0), m.maxY = -m.minY, m.currentX = Math.max(Math.min(m.currentX, m.maxX), m.minX), m.currentY = Math.max(Math.min(m.currentY, m.maxY), m.minY), f.$imageWrapEl.transition(l).transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`)
            }()
        }), i("doubleTap", (e, s) => {!t.animating && t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && S(s) }), i("transitionEnd", () => { t.zoom.enabled && t.params.zoom.enabled && E() }), i("slideChange", () => { t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && E() }), Object.assign(t.zoom, { enable: L, disable: $, in: T, out: C, toggle: S })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        s({ lazy: { checkInView: !1, enabled: !1, loadPrevNext: !1, loadPrevNextAmount: 1, loadOnTransitionStart: !1, scrollingElement: "", elementClass: "swiper-lazy", loadingClass: "swiper-lazy-loading", loadedClass: "swiper-lazy-loaded", preloaderClass: "swiper-lazy-preloader" } }), t.lazy = {};
        let a = !1,
            o = !1;

        function l(e, s) {
            void 0 === s && (s = !0);
            const i = t.params.lazy;
            if (void 0 === e) return;
            if (0 === t.slides.length) return;
            const r = t.virtual && t.params.virtual.enabled ? t.$wrapperEl.children(`.${t.params.slideClass}[data-swiper-slide-index="${e}"]`) : t.slides.eq(e),
                a = r.find(`.${i.elementClass}:not(.${i.loadedClass}):not(.${i.loadingClass})`);
            !r.hasClass(i.elementClass) || r.hasClass(i.loadedClass) || r.hasClass(i.loadingClass) || a.push(r[0]), 0 !== a.length && a.each(e => {
                const a = c(e);
                a.addClass(i.loadingClass);
                const o = a.attr("data-background"),
                    d = a.attr("data-src"),
                    u = a.attr("data-srcset"),
                    p = a.attr("data-sizes"),
                    h = a.parent("picture");
                t.loadImage(a[0], d || o, u, p, !1, () => {
                    if (null != t && t && (!t || t.params) && !t.destroyed) {
                        if (o ? (a.css("background-image", `url("${o}")`), a.removeAttr("data-background")) : (u && (a.attr("srcset", u), a.removeAttr("data-srcset")), p && (a.attr("sizes", p), a.removeAttr("data-sizes")), h.length && h.children("source").each(e => {
                                const t = c(e);
                                t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"))
                            }), d && (a.attr("src", d), a.removeAttr("data-src"))), a.addClass(i.loadedClass).removeClass(i.loadingClass), r.find("." + i.preloaderClass).remove(), t.params.loop && s) {
                            const e = r.attr("data-swiper-slide-index");
                            r.hasClass(t.params.slideDuplicateClass) ? l(t.$wrapperEl.children(`[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`).index(), !1) : l(t.$wrapperEl.children(`.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`).index(), !1)
                        }
                        n("lazyImageReady", r[0], a[0]), t.params.autoHeight && t.updateAutoHeight()
                    }
                }), n("lazyImageLoad", r[0], a[0])
            })
        }

        function d() {
            const { $wrapperEl: e, params: s, slides: i, activeIndex: n } = t, r = t.virtual && s.virtual.enabled, a = s.lazy;
            let d = s.slidesPerView;

            function u(t) { if (r) { if (e.children(`.${s.slideClass}[data-swiper-slide-index="${t}"]`).length) return !0 } else if (i[t]) return !0; return !1 }

            function p(e) { return r ? c(e).attr("data-swiper-slide-index") : c(e).index() }
            if ("auto" === d && (d = 0), o || (o = !0), t.params.watchSlidesProgress) e.children("." + s.slideVisibleClass).each(e => { l(r ? c(e).attr("data-swiper-slide-index") : c(e).index()) });
            else if (d > 1)
                for (let e = n; e < n + d; e += 1) u(e) && l(e);
            else l(n);
            if (a.loadPrevNext)
                if (d > 1 || a.loadPrevNextAmount && a.loadPrevNextAmount > 1) {
                    const e = a.loadPrevNextAmount,
                        t = Math.ceil(d),
                        s = Math.min(n + t + Math.max(e, t), i.length),
                        r = Math.max(n - Math.max(t, e), 0);
                    for (let e = n + t; e < s; e += 1) u(e) && l(e);
                    for (let e = r; e < n; e += 1) u(e) && l(e)
                } else {
                    const t = e.children("." + s.slideNextClass);
                    t.length > 0 && l(p(t));
                    const i = e.children("." + s.slidePrevClass);
                    i.length > 0 && l(p(i))
                }
        }

        function u() {
            const e = r();
            if (!t || t.destroyed) return;
            const s = t.params.lazy.scrollingElement ? c(t.params.lazy.scrollingElement) : c(e),
                i = s[0] === e,
                n = i ? e.innerWidth : s[0].offsetWidth,
                o = i ? e.innerHeight : s[0].offsetHeight,
                l = t.$el.offset(),
                { rtlTranslate: p } = t;
            let h = !1;
            p && (l.left -= t.$el[0].scrollLeft);
            const f = [
                [l.left, l.top],
                [l.left + t.width, l.top],
                [l.left, l.top + t.height],
                [l.left + t.width, l.top + t.height]
            ];
            for (let e = 0; e < f.length; e += 1) {
                const t = f[e];
                if (t[0] >= 0 && t[0] <= n && t[1] >= 0 && t[1] <= o) {
                    if (0 === t[0] && 0 === t[1]) continue;
                    h = !0
                }
            }
            const m = !("touchstart" !== t.touchEvents.start || !t.support.passiveListener || !t.params.passiveListeners) && { passive: !0, capture: !1 };
            h ? (d(), s.off("scroll", u, m)) : a || (a = !0, s.on("scroll", u, m))
        }
        i("beforeInit", () => { t.params.lazy.enabled && t.params.preloadImages && (t.params.preloadImages = !1) }), i("init", () => { t.params.lazy.enabled && (t.params.lazy.checkInView ? u() : d()) }), i("scroll", () => { t.params.freeMode && t.params.freeMode.enabled && !t.params.freeMode.sticky && d() }), i("scrollbarDragMove resize _freeModeNoMomentumRelease", () => { t.params.lazy.enabled && (t.params.lazy.checkInView ? u() : d()) }), i("transitionStart", () => { t.params.lazy.enabled && (t.params.lazy.loadOnTransitionStart || !t.params.lazy.loadOnTransitionStart && !o) && (t.params.lazy.checkInView ? u() : d()) }), i("transitionEnd", () => { t.params.lazy.enabled && !t.params.lazy.loadOnTransitionStart && (t.params.lazy.checkInView ? u() : d()) }), i("slideChange", () => {
            const { lazy: e, cssMode: s, watchSlidesProgress: i, touchReleaseOnEdges: n, resistanceRatio: r } = t.params;
            e.enabled && (s || i && (n || 0 === r)) && d()
        }), i("destroy", () => { t.$el && t.$el.find("." + t.params.lazy.loadingClass).removeClass(t.params.lazy.loadingClass) }), Object.assign(t.lazy, { load: d, loadInSlide: l })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i } = e;

        function n(e, t) { const s = function() { let e, t, s; return (i, n) => { for (t = -1, e = i.length; e - t > 1;) s = e + t >> 1, i[s] <= n ? t = s : e = s; return e } }(); let i, n; return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) { return e ? (n = s(this.x, e), i = n - 1, (e - this.x[i]) * (this.y[n] - this.y[i]) / (this.x[n] - this.x[i]) + this.y[i]) : 0 }, this }

        function r() { t.controller.control && t.controller.spline && (t.controller.spline = void 0, delete t.controller.spline) }
        s({ controller: { control: void 0, inverse: !1, by: "slide" } }), t.controller = { control: void 0 }, i("beforeInit", () => { t.controller.control = t.params.controller.control }), i("update", () => { r() }), i("resize", () => { r() }), i("observerUpdate", () => { r() }), i("setTranslate", (e, s, i) => { t.controller.control && t.controller.setTranslate(s, i) }), i("setTransition", (e, s, i) => { t.controller.control && t.controller.setTransition(s, i) }), Object.assign(t.controller, {
            setTranslate: function(e, s) {
                const i = t.controller.control;
                let r, a;
                const o = t.constructor;

                function l(e) { const s = t.rtlTranslate ? -t.translate : t.translate; "slide" === t.params.controller.by && (function(e) { t.controller.spline || (t.controller.spline = t.params.loop ? new n(t.slidesGrid, e.slidesGrid) : new n(t.snapGrid, e.snapGrid)) }(e), a = -t.controller.spline.interpolate(-s)), a && "container" !== t.params.controller.by || (r = (e.maxTranslate() - e.minTranslate()) / (t.maxTranslate() - t.minTranslate()), a = (s - t.minTranslate()) * r + e.minTranslate()), t.params.controller.inverse && (a = e.maxTranslate() - a), e.updateProgress(a), e.setTranslate(a, t), e.updateActiveIndex(), e.updateSlidesClasses() }
                if (Array.isArray(i))
                    for (let e = 0; e < i.length; e += 1) i[e] !== s && i[e] instanceof o && l(i[e]);
                else i instanceof o && s !== i && l(i)
            },
            setTransition: function(e, s) {
                const i = t.constructor,
                    n = t.controller.control;
                let r;

                function a(s) { s.setTransition(e, t), 0 !== e && (s.transitionStart(), s.params.autoHeight && u(() => { s.updateAutoHeight() }), s.$wrapperEl.transitionEnd(() => { n && (s.params.loop && "slide" === t.params.controller.by && s.loopFix(), s.transitionEnd()) })) }
                if (Array.isArray(n))
                    for (r = 0; r < n.length; r += 1) n[r] !== s && n[r] instanceof i && a(n[r]);
                else n instanceof i && s !== n && a(n)
            }
        })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i } = e;
        s({ a11y: { enabled: !0, notificationClass: "swiper-notification", prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}", slideLabelMessage: "{{index}} / {{slidesLength}}", containerMessage: null, containerRoleDescriptionMessage: null, itemRoleDescriptionMessage: null, slideRole: "group", id: null } }), t.a11y = { clicked: !1 };
        let n = null;

        function r(e) {
            const t = n;
            0 !== t.length && (t.html(""), t.html(e))
        }

        function a(e) { e.attr("tabIndex", "0") }

        function o(e) { e.attr("tabIndex", "-1") }

        function l(e, t) { e.attr("role", t) }

        function d(e, t) { e.attr("aria-roledescription", t) }

        function u(e, t) { e.attr("aria-label", t) }

        function p(e) { e.attr("aria-disabled", !0) }

        function h(e) { e.attr("aria-disabled", !1) }

        function f(e) {
            if (13 !== e.keyCode && 32 !== e.keyCode) return;
            const s = t.params.a11y,
                i = c(e.target);
            t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? r(s.lastSlideMessage) : r(s.nextSlideMessage)), t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? r(s.firstSlideMessage) : r(s.prevSlideMessage)), t.pagination && i.is(W(t.params.pagination.bulletClass)) && i[0].click()
        }

        function m() { return t.pagination && t.pagination.bullets && t.pagination.bullets.length }

        function g() { return m() && t.params.pagination.clickable }
        const v = (e, t, s) => {
                a(e), "BUTTON" !== e[0].tagName && (l(e, "button"), e.on("keydown", f)), u(e, s),
                    function(e, t) { e.attr("aria-controls", t) }(e, t)
            },
            b = () => { t.a11y.clicked = !0 },
            y = () => { requestAnimationFrame(() => { requestAnimationFrame(() => { t.destroyed || (t.a11y.clicked = !1) }) }) },
            w = e => {
                if (t.a11y.clicked) return;
                const s = e.target.closest("." + t.params.slideClass);
                if (!s || !t.slides.includes(s)) return;
                const i = t.slides.indexOf(s) === t.activeIndex,
                    n = t.params.watchSlidesProgress && t.visibleSlides && t.visibleSlides.includes(s);
                i || n || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || (t.isHorizontal() ? t.el.scrollLeft = 0 : t.el.scrollTop = 0, t.slideTo(t.slides.indexOf(s), 0))
            },
            x = () => {
                const e = t.params.a11y;
                e.itemRoleDescriptionMessage && d(c(t.slides), e.itemRoleDescriptionMessage), e.slideRole && l(c(t.slides), e.slideRole);
                const s = t.params.loop ? t.slides.filter(e => !e.classList.contains(t.params.slideDuplicateClass)).length : t.slides.length;
                e.slideLabelMessage && t.slides.each((i, n) => {
                    const r = c(i),
                        a = t.params.loop ? parseInt(r.attr("data-swiper-slide-index"), 10) : n;
                    u(r, e.slideLabelMessage.replace(/\{\{index\}\}/, a + 1).replace(/\{\{slidesLength\}\}/, s))
                })
            };
        i("beforeInit", () => { n = c(`<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`) }), i("afterInit", () => {
            t.params.a11y.enabled && (() => {
                const e = t.params.a11y;
                t.$el.append(n);
                const s = t.$el;
                e.containerRoleDescriptionMessage && d(s, e.containerRoleDescriptionMessage), e.containerMessage && u(s, e.containerMessage);
                const i = t.$wrapperEl,
                    r = e.id || i.attr("id") || "swiper-wrapper-" + (void 0 === (a = 16) && (a = 16), "x".repeat(a).replace(/x/g, () => Math.round(16 * Math.random()).toString(16)));
                var a;
                const o = t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
                var l;
                let c, p;
                l = r, i.attr("id", l),
                    function(e, t) { e.attr("aria-live", t) }(i, o), x(), t.navigation && t.navigation.$nextEl && (c = t.navigation.$nextEl), t.navigation && t.navigation.$prevEl && (p = t.navigation.$prevEl), c && c.length && v(c, r, e.nextSlideMessage), p && p.length && v(p, r, e.prevSlideMessage), g() && t.pagination.$el.on("keydown", W(t.params.pagination.bulletClass), f), t.$el.on("focus", w, !0), t.$el.on("pointerdown", b, !0), t.$el.on("pointerup", y, !0)
            })()
        }), i("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => { t.params.a11y.enabled && x() }), i("fromEdge toEdge afterInit lock unlock", () => {
            t.params.a11y.enabled && function() {
                if (t.params.loop || t.params.rewind || !t.navigation) return;
                const { $nextEl: e, $prevEl: s } = t.navigation;
                s && s.length > 0 && (t.isBeginning ? (p(s), o(s)) : (h(s), a(s))), e && e.length > 0 && (t.isEnd ? (p(e), o(e)) : (h(e), a(e)))
            }()
        }), i("paginationUpdate", () => {
            t.params.a11y.enabled && function() {
                const e = t.params.a11y;
                m() && t.pagination.bullets.each(s => {
                    const i = c(s);
                    t.params.pagination.clickable && (a(i), t.params.pagination.renderBullet || (l(i, "button"), u(i, e.paginationBulletMessage.replace(/\{\{index\}\}/, i.index() + 1)))), i.is("." + t.params.pagination.bulletActiveClass) ? i.attr("aria-current", "true") : i.removeAttr("aria-current")
                })
            }()
        }), i("destroy", () => {
            t.params.a11y.enabled && function() {
                let e, s;
                n && n.length > 0 && n.remove(), t.navigation && t.navigation.$nextEl && (e = t.navigation.$nextEl), t.navigation && t.navigation.$prevEl && (s = t.navigation.$prevEl), e && e.off("keydown", f), s && s.off("keydown", f), g() && t.pagination.$el.off("keydown", W(t.params.pagination.bulletClass), f), t.$el.off("focus", w, !0), t.$el.off("pointerdown", b, !0), t.$el.off("pointerup", y, !0)
            }()
        })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i } = e;
        s({ history: { enabled: !1, root: "", replaceState: !1, key: "slides", keepQuery: !1 } });
        let n = !1,
            a = {};
        const o = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, ""),
            l = e => {
                const t = r();
                let s;
                s = e ? new URL(e) : t.location;
                const i = s.pathname.slice(1).split("/").filter(e => "" !== e),
                    n = i.length;
                return { key: i[n - 2], value: i[n - 1] }
            },
            c = (e, s) => {
                const i = r();
                if (!n || !t.params.history.enabled) return;
                let a;
                a = t.params.url ? new URL(t.params.url) : i.location;
                const l = t.slides.eq(s);
                let c = o(l.attr("data-history"));
                if (t.params.history.root.length > 0) { let s = t.params.history.root; "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)), c = `${s}/${e}/${c}` } else a.pathname.includes(e) || (c = `${e}/${c}`);
                t.params.history.keepQuery && (c += a.search);
                const d = i.history.state;
                d && d.value === c || (t.params.history.replaceState ? i.history.replaceState({ value: c }, null, c) : i.history.pushState({ value: c }, null, c))
            },
            d = (e, s, i) => {
                if (s)
                    for (let n = 0, r = t.slides.length; n < r; n += 1) {
                        const r = t.slides.eq(n);
                        if (o(r.attr("data-history")) === s && !r.hasClass(t.params.slideDuplicateClass)) {
                            const s = r.index();
                            t.slideTo(s, e, i)
                        }
                    } else t.slideTo(0, e, i)
            },
            u = () => { a = l(t.params.url), d(t.params.speed, a.value, !1) };
        i("init", () => {
            t.params.history.enabled && (() => {
                const e = r();
                if (t.params.history) {
                    if (!e.history || !e.history.pushState) return t.params.history.enabled = !1, void(t.params.hashNavigation.enabled = !0);
                    n = !0, a = l(t.params.url), (a.key || a.value) && (d(0, a.value, t.params.runCallbacksOnInit), t.params.history.replaceState || e.addEventListener("popstate", u))
                }
            })()
        }), i("destroy", () => {
            t.params.history.enabled && (() => {
                const e = r();
                t.params.history.replaceState || e.removeEventListener("popstate", u)
            })()
        }), i("transitionEnd _freeModeNoMomentumRelease", () => { n && c(t.params.history.key, t.activeIndex) }), i("slideChange", () => { n && t.params.cssMode && c(t.params.history.key, t.activeIndex) })
    }, function(e) {
        let { swiper: t, extendParams: s, emit: n, on: a } = e, o = !1;
        const l = i(),
            d = r();
        s({ hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } });
        const u = () => {
                n("hashChange");
                const e = l.location.hash.replace("#", "");
                if (e !== t.slides.eq(t.activeIndex).attr("data-hash")) {
                    const s = t.$wrapperEl.children(`.${t.params.slideClass}[data-hash="${e}"]`).index();
                    if (void 0 === s) return;
                    t.slideTo(s)
                }
            },
            p = () => {
                if (o && t.params.hashNavigation.enabled)
                    if (t.params.hashNavigation.replaceState && d.history && d.history.replaceState) d.history.replaceState(null, null, "#" + t.slides.eq(t.activeIndex).attr("data-hash") || ""), n("hashSet");
                    else {
                        const e = t.slides.eq(t.activeIndex),
                            s = e.attr("data-hash") || e.attr("data-history");
                        l.location.hash = s || "", n("hashSet")
                    }
            };
        a("init", () => {
            t.params.hashNavigation.enabled && (() => {
                if (!t.params.hashNavigation.enabled || t.params.history && t.params.history.enabled) return;
                o = !0;
                const e = l.location.hash.replace("#", "");
                if (e) {
                    const s = 0;
                    for (let i = 0, n = t.slides.length; i < n; i += 1) {
                        const n = t.slides.eq(i);
                        if ((n.attr("data-hash") || n.attr("data-history")) === e && !n.hasClass(t.params.slideDuplicateClass)) {
                            const e = n.index();
                            t.slideTo(e, s, t.params.runCallbacksOnInit, !0)
                        }
                    }
                }
                t.params.hashNavigation.watchState && c(d).on("hashchange", u)
            })()
        }), a("destroy", () => { t.params.hashNavigation.enabled && t.params.hashNavigation.watchState && c(d).off("hashchange", u) }), a("transitionEnd _freeModeNoMomentumRelease", () => { o && p() }), a("slideChange", () => { o && t.params.cssMode && p() })
    }, function(e) {
        let t, { swiper: s, extendParams: n, on: r, emit: a } = e;

        function o() {
            if (!s.size) return s.autoplay.running = !1, void(s.autoplay.paused = !1);
            const e = s.slides.eq(s.activeIndex);
            let i = s.params.autoplay.delay;
            e.attr("data-swiper-autoplay") && (i = e.attr("data-swiper-autoplay") || s.params.autoplay.delay), clearTimeout(t), t = u(() => {
                let e;
                s.params.autoplay.reverseDirection ? s.params.loop ? (s.loopFix(), e = s.slidePrev(s.params.speed, !0, !0), a("autoplay")) : s.isBeginning ? s.params.autoplay.stopOnLastSlide ? c() : (e = s.slideTo(s.slides.length - 1, s.params.speed, !0, !0), a("autoplay")) : (e = s.slidePrev(s.params.speed, !0, !0), a("autoplay")) : s.params.loop ? (s.loopFix(), e = s.slideNext(s.params.speed, !0, !0), a("autoplay")) : s.isEnd ? s.params.autoplay.stopOnLastSlide ? c() : (e = s.slideTo(0, s.params.speed, !0, !0), a("autoplay")) : (e = s.slideNext(s.params.speed, !0, !0), a("autoplay")), (s.params.cssMode && s.autoplay.running || !1 === e) && o()
            }, i)
        }

        function l() { return void 0 === t && !s.autoplay.running && (s.autoplay.running = !0, a("autoplayStart"), o(), !0) }

        function c() { return !!s.autoplay.running && void 0 !== t && (t && (clearTimeout(t), t = void 0), s.autoplay.running = !1, a("autoplayStop"), !0) }

        function d(e) { s.autoplay.running && (s.autoplay.paused || (t && clearTimeout(t), s.autoplay.paused = !0, 0 !== e && s.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach(e => { s.$wrapperEl[0].addEventListener(e, h) }) : (s.autoplay.paused = !1, o()))) }

        function p() { const e = i(); "hidden" === e.visibilityState && s.autoplay.running && d(), "visible" === e.visibilityState && s.autoplay.paused && (o(), s.autoplay.paused = !1) }

        function h(e) { s && !s.destroyed && s.$wrapperEl && e.target === s.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach(e => { s.$wrapperEl[0].removeEventListener(e, h) }), s.autoplay.paused = !1, s.autoplay.running ? o() : c()) }

        function f() { s.params.autoplay.disableOnInteraction ? c() : (a("autoplayPause"), d()), ["transitionend", "webkitTransitionEnd"].forEach(e => { s.$wrapperEl[0].removeEventListener(e, h) }) }

        function m() { s.params.autoplay.disableOnInteraction || (s.autoplay.paused = !1, a("autoplayResume"), o()) }
        s.autoplay = { running: !1, paused: !1 }, n({ autoplay: { enabled: !1, delay: 3e3, waitForTransition: !0, disableOnInteraction: !0, stopOnLastSlide: !1, reverseDirection: !1, pauseOnMouseEnter: !1 } }), r("init", () => { s.params.autoplay.enabled && (l(), i().addEventListener("visibilitychange", p), s.params.autoplay.pauseOnMouseEnter && (s.$el.on("mouseenter", f), s.$el.on("mouseleave", m))) }), r("beforeTransitionStart", (e, t, i) => { s.autoplay.running && (i || !s.params.autoplay.disableOnInteraction ? s.autoplay.pause(t) : c()) }), r("sliderFirstMove", () => { s.autoplay.running && (s.params.autoplay.disableOnInteraction ? c() : d()) }), r("touchEnd", () => { s.params.cssMode && s.autoplay.paused && !s.params.autoplay.disableOnInteraction && o() }), r("destroy", () => { s.$el.off("mouseenter", f), s.$el.off("mouseleave", m), s.autoplay.running && c(), i().removeEventListener("visibilitychange", p) }), Object.assign(s.autoplay, { pause: d, run: o, start: l, stop: c })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i } = e;
        s({ thumbs: { swiper: null, multipleActiveThumbs: !0, autoScrollOffset: 0, slideThumbActiveClass: "swiper-slide-thumb-active", thumbsContainerClass: "swiper-thumbs" } });
        let n = !1,
            r = !1;

        function a() {
            const e = t.thumbs.swiper;
            if (!e || e.destroyed) return;
            const s = e.clickedIndex,
                i = e.clickedSlide;
            if (i && c(i).hasClass(t.params.thumbs.slideThumbActiveClass)) return;
            if (null == s) return;
            let n;
            if (n = e.params.loop ? parseInt(c(e.clickedSlide).attr("data-swiper-slide-index"), 10) : s, t.params.loop) {
                let e = t.activeIndex;
                t.slides.eq(e).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), t._clientLeft = t.$wrapperEl[0].clientLeft, e = t.activeIndex);
                const s = t.slides.eq(e).prevAll(`[data-swiper-slide-index="${n}"]`).eq(0).index(),
                    i = t.slides.eq(e).nextAll(`[data-swiper-slide-index="${n}"]`).eq(0).index();
                n = void 0 === s ? i : void 0 === i ? s : i - e < e - s ? i : s
            }
            t.slideTo(n)
        }

        function o() {
            const { thumbs: e } = t.params;
            if (n) return !1;
            n = !0;
            const s = t.constructor;
            if (e.swiper instanceof s) t.thumbs.swiper = e.swiper, Object.assign(t.thumbs.swiper.originalParams, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), Object.assign(t.thumbs.swiper.params, { watchSlidesProgress: !0, slideToClickedSlide: !1 });
            else if (f(e.swiper)) {
                const i = Object.assign({}, e.swiper);
                Object.assign(i, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), t.thumbs.swiper = new s(i), r = !0
            }
            return t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass), t.thumbs.swiper.on("tap", a), !0
        }

        function l(e) {
            const s = t.thumbs.swiper;
            if (!s || s.destroyed) return;
            const i = "auto" === s.params.slidesPerView ? s.slidesPerViewDynamic() : s.params.slidesPerView;
            let n = 1;
            const r = t.params.thumbs.slideThumbActiveClass;
            if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (n = t.params.slidesPerView), t.params.thumbs.multipleActiveThumbs || (n = 1), n = Math.floor(n), s.slides.removeClass(r), s.params.loop || s.params.virtual && s.params.virtual.enabled)
                for (let e = 0; e < n; e += 1) s.$wrapperEl.children(`[data-swiper-slide-index="${t.realIndex+e}"]`).addClass(r);
            else
                for (let e = 0; e < n; e += 1) s.slides.eq(t.realIndex + e).addClass(r);
            const a = t.params.thumbs.autoScrollOffset,
                o = a && !s.params.loop;
            if (t.realIndex !== s.realIndex || o) {
                let n, r, l = s.activeIndex;
                if (s.params.loop) {
                    s.slides.eq(l).hasClass(s.params.slideDuplicateClass) && (s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft, l = s.activeIndex);
                    const e = s.slides.eq(l).prevAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index(),
                        i = s.slides.eq(l).nextAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index();
                    n = void 0 === e ? i : void 0 === i ? e : i - l == l - e ? s.params.slidesPerGroup > 1 ? i : l : i - l < l - e ? i : e, r = t.activeIndex > t.previousIndex ? "next" : "prev"
                } else n = t.realIndex, r = n > t.previousIndex ? "next" : "prev";
                o && (n += "next" === r ? a : -1 * a), s.visibleSlidesIndexes && s.visibleSlidesIndexes.indexOf(n) < 0 && (s.params.centeredSlides ? n = n > l ? n - Math.floor(i / 2) + 1 : n + Math.floor(i / 2) - 1 : n > l && s.params.slidesPerGroup, s.slideTo(n, e ? 0 : void 0))
            }
        }
        t.thumbs = { swiper: null }, i("beforeInit", () => {
            const { thumbs: e } = t.params;
            e && e.swiper && (o(), l(!0))
        }), i("slideChange update resize observerUpdate", () => { l() }), i("setTransition", (e, s) => {
            const i = t.thumbs.swiper;
            i && !i.destroyed && i.setTransition(s)
        }), i("beforeDestroy", () => {
            const e = t.thumbs.swiper;
            e && !e.destroyed && r && e.destroy()
        }), Object.assign(t.thumbs, { init: o, update: l })
    }, function(e) {
        let { swiper: t, extendParams: s, emit: i, once: n } = e;
        s({ freeMode: { enabled: !1, momentum: !0, momentumRatio: 1, momentumBounce: !0, momentumBounceRatio: 1, momentumVelocityRatio: 1, sticky: !1, minimumVelocity: .02 } }), Object.assign(t, {
            freeMode: {
                onTouchStart: function() {
                    const e = t.getTranslate();
                    t.setTranslate(e), t.setTransition(0), t.touchEventsData.velocities.length = 0, t.freeMode.onTouchEnd({ currentPos: t.rtl ? t.translate : -t.translate })
                },
                onTouchMove: function() {
                    const { touchEventsData: e, touches: s } = t;
                    0 === e.velocities.length && e.velocities.push({ position: s[t.isHorizontal() ? "startX" : "startY"], time: e.touchStartTime }), e.velocities.push({ position: s[t.isHorizontal() ? "currentX" : "currentY"], time: p() })
                },
                onTouchEnd: function(e) {
                    let { currentPos: s } = e;
                    const { params: r, $wrapperEl: a, rtlTranslate: o, snapGrid: l, touchEventsData: c } = t, d = p() - c.touchStartTime;
                    if (s < -t.minTranslate()) t.slideTo(t.activeIndex);
                    else if (s > -t.maxTranslate()) t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1);
                    else {
                        if (r.freeMode.momentum) {
                            if (c.velocities.length > 1) {
                                const e = c.velocities.pop(),
                                    s = c.velocities.pop(),
                                    i = e.position - s.position,
                                    n = e.time - s.time;
                                t.velocity = i / n, t.velocity /= 2, Math.abs(t.velocity) < r.freeMode.minimumVelocity && (t.velocity = 0), (n > 150 || p() - e.time > 300) && (t.velocity = 0)
                            } else t.velocity = 0;
                            t.velocity *= r.freeMode.momentumVelocityRatio, c.velocities.length = 0;
                            let e = 1e3 * r.freeMode.momentumRatio;
                            const s = t.velocity * e;
                            let d = t.translate + s;
                            o && (d = -d);
                            let u, h = !1;
                            const f = 20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
                            let m;
                            if (d < t.maxTranslate()) r.freeMode.momentumBounce ? (d + t.maxTranslate() < -f && (d = t.maxTranslate() - f), u = t.maxTranslate(), h = !0, c.allowMomentumBounce = !0) : d = t.maxTranslate(), r.loop && r.centeredSlides && (m = !0);
                            else if (d > t.minTranslate()) r.freeMode.momentumBounce ? (d - t.minTranslate() > f && (d = t.minTranslate() + f), u = t.minTranslate(), h = !0, c.allowMomentumBounce = !0) : d = t.minTranslate(), r.loop && r.centeredSlides && (m = !0);
                            else if (r.freeMode.sticky) {
                                let e;
                                for (let t = 0; t < l.length; t += 1)
                                    if (l[t] > -d) { e = t; break }
                                d = Math.abs(l[e] - d) < Math.abs(l[e - 1] - d) || "next" === t.swipeDirection ? l[e] : l[e - 1], d = -d
                            }
                            if (m && n("transitionEnd", () => { t.loopFix() }), 0 !== t.velocity) {
                                if (e = o ? Math.abs((-d - t.translate) / t.velocity) : Math.abs((d - t.translate) / t.velocity), r.freeMode.sticky) {
                                    const s = Math.abs((o ? -d : d) - t.translate),
                                        i = t.slidesSizesGrid[t.activeIndex];
                                    e = s < i ? r.speed : s < 2 * i ? 1.5 * r.speed : 2.5 * r.speed
                                }
                            } else if (r.freeMode.sticky) return void t.slideToClosest();
                            r.freeMode.momentumBounce && h ? (t.updateProgress(u), t.setTransition(e), t.setTranslate(d), t.transitionStart(!0, t.swipeDirection), t.animating = !0, a.transitionEnd(() => { t && !t.destroyed && c.allowMomentumBounce && (i("momentumBounce"), t.setTransition(r.speed), setTimeout(() => { t.setTranslate(u), a.transitionEnd(() => { t && !t.destroyed && t.transitionEnd() }) }, 0)) })) : t.velocity ? (i("_freeModeNoMomentumRelease"), t.updateProgress(d), t.setTransition(e), t.setTranslate(d), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, a.transitionEnd(() => { t && !t.destroyed && t.transitionEnd() }))) : t.updateProgress(d), t.updateActiveIndex(), t.updateSlidesClasses()
                        } else {
                            if (r.freeMode.sticky) return void t.slideToClosest();
                            r.freeMode && i("_freeModeNoMomentumRelease")
                        }(!r.freeMode.momentum || d >= r.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                    }
                }
            }
        })
    }, function(e) {
        let t, s, i, { swiper: n, extendParams: r } = e;
        r({ grid: { rows: 1, fill: "column" } }), n.grid = {
            initSlides: e => {
                const { slidesPerView: r } = n.params, { rows: a, fill: o } = n.params.grid;
                s = t / a, i = Math.floor(e / a), t = Math.floor(e / a) === e / a ? e : Math.ceil(e / a) * a, "auto" !== r && "row" === o && (t = Math.max(t, r * a))
            },
            updateSlide: (e, r, a, o) => {
                const { slidesPerGroup: l, spaceBetween: c } = n.params, { rows: d, fill: u } = n.params.grid;
                let p, h, f;
                if ("row" === u && l > 1) {
                    const s = Math.floor(e / (l * d)),
                        i = e - d * l * s,
                        n = 0 === s ? l : Math.min(Math.ceil((a - s * d * l) / d), l);
                    f = Math.floor(i / n), h = i - f * n + s * l, p = h + f * t / d, r.css({ "-webkit-order": p, order: p })
                } else "column" === u ? (h = Math.floor(e / d), f = e - h * d, (h > i || h === i && f === d - 1) && (f += 1, f >= d && (f = 0, h += 1))) : (f = Math.floor(e / s), h = e - f * s);
                r.css(o("margin-top"), 0 !== f ? c && c + "px" : "")
            },
            updateWrapperSize: (e, s, i) => {
                const { spaceBetween: r, centeredSlides: a, roundLengths: o } = n.params, { rows: l } = n.params.grid;
                if (n.virtualSize = (e + r) * t, n.virtualSize = Math.ceil(n.virtualSize / l) - r, n.$wrapperEl.css({
                        [i("width")]: n.virtualSize + r + "px"
                    }), a) {
                    s.splice(0, s.length);
                    const e = [];
                    for (let t = 0; t < s.length; t += 1) {
                        let i = s[t];
                        o && (i = Math.floor(i)), s[t] < n.virtualSize + s[0] && e.push(i)
                    }
                    s.push(...e)
                }
            }
        }
    }, function(e) {
        let { swiper: t } = e;
        Object.assign(t, { appendSlide: q.bind(t), prependSlide: R.bind(t), addSlide: V.bind(t), removeSlide: X.bind(t), removeAllSlides: Y.bind(t) })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i } = e;
        s({ fadeEffect: { crossFade: !1, transformEl: null } }), G({
            effect: "fade",
            swiper: t,
            on: i,
            setTranslate: () => {
                const { slides: e } = t, s = t.params.fadeEffect;
                for (let i = 0; i < e.length; i += 1) {
                    const e = t.slides.eq(i);
                    let n = -e[0].swiperSlideOffset;
                    t.params.virtualTranslate || (n -= t.translate);
                    let r = 0;
                    t.isHorizontal() || (r = n, n = 0);
                    const a = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e[0].progress), 0) : 1 + Math.min(Math.max(e[0].progress, -1), 0);
                    U(s, e).css({ opacity: a }).transform(`translate3d(${n}px, ${r}px, 0px)`)
                }
            },
            setTransition: e => {
                const { transformEl: s } = t.params.fadeEffect;
                (s ? t.slides.find(s) : t.slides).transition(e), K({ swiper: t, duration: e, transformEl: s, allSlides: !0 })
            },
            overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !t.params.cssMode })
        })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i } = e;
        s({ cubeEffect: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 } });
        const n = (e, t, s) => {
            let i = s ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
                n = s ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
            0 === i.length && (i = c(`<div class="swiper-slide-shadow-${s?"left":"top"}"></div>`), e.append(i)), 0 === n.length && (n = c(`<div class="swiper-slide-shadow-${s?"right":"bottom"}"></div>`), e.append(n)), i.length && (i[0].style.opacity = Math.max(-t, 0)), n.length && (n[0].style.opacity = Math.max(t, 0))
        };
        G({
            effect: "cube",
            swiper: t,
            on: i,
            setTranslate: () => {
                const { $el: e, $wrapperEl: s, slides: i, width: r, height: a, rtlTranslate: o, size: l, browser: d } = t, u = t.params.cubeEffect, p = t.isHorizontal(), h = t.virtual && t.params.virtual.enabled;
                let f, m = 0;
                u.shadow && (p ? (f = s.find(".swiper-cube-shadow"), 0 === f.length && (f = c('<div class="swiper-cube-shadow"></div>'), s.append(f)), f.css({ height: r + "px" })) : (f = e.find(".swiper-cube-shadow"), 0 === f.length && (f = c('<div class="swiper-cube-shadow"></div>'), e.append(f))));
                for (let e = 0; e < i.length; e += 1) {
                    const t = i.eq(e);
                    let s = e;
                    h && (s = parseInt(t.attr("data-swiper-slide-index"), 10));
                    let r = 90 * s,
                        a = Math.floor(r / 360);
                    o && (r = -r, a = Math.floor(-r / 360));
                    const c = Math.max(Math.min(t[0].progress, 1), -1);
                    let d = 0,
                        f = 0,
                        g = 0;
                    s % 4 == 0 ? (d = 4 * -a * l, g = 0) : (s - 1) % 4 == 0 ? (d = 0, g = 4 * -a * l) : (s - 2) % 4 == 0 ? (d = l + 4 * a * l, g = l) : (s - 3) % 4 == 0 && (d = -l, g = 3 * l + 4 * l * a), o && (d = -d), p || (f = d, d = 0);
                    const v = `rotateX(${p?0:-r}deg) rotateY(${p?r:0}deg) translate3d(${d}px, ${f}px, ${g}px)`;
                    c <= 1 && c > -1 && (m = 90 * s + 90 * c, o && (m = 90 * -s - 90 * c)), t.transform(v), u.slideShadows && n(t, c, p)
                }
                if (s.css({ "-webkit-transform-origin": `50% 50% -${l/2}px`, "transform-origin": `50% 50% -${l/2}px` }), u.shadow)
                    if (p) f.transform(`translate3d(0px, ${r/2+u.shadowOffset}px, ${-r/2}px) rotateX(90deg) rotateZ(0deg) scale(${u.shadowScale})`);
                    else {
                        const e = Math.abs(m) - 90 * Math.floor(Math.abs(m) / 90),
                            t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2),
                            s = u.shadowScale,
                            i = u.shadowScale / t,
                            n = u.shadowOffset;
                        f.transform(`scale3d(${s}, 1, ${i}) translate3d(0px, ${a/2+n}px, ${-a/2/i}px) rotateX(-90deg)`)
                    }
                const g = d.isSafari || d.isWebView ? -l / 2 : 0;
                s.transform(`translate3d(0px,0,${g}px) rotateX(${t.isHorizontal()?0:m}deg) rotateY(${t.isHorizontal()?-m:0}deg)`), s[0].style.setProperty("--swiper-cube-translate-z", g + "px")
            },
            setTransition: e => {
                const { $el: s, slides: i } = t;
                i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.cubeEffect.shadow && !t.isHorizontal() && s.find(".swiper-cube-shadow").transition(e)
            },
            recreateShadows: () => {
                const e = t.isHorizontal();
                t.slides.each(t => {
                    const s = Math.max(Math.min(t.progress, 1), -1);
                    n(c(t), s, e)
                })
            },
            getEffectParams: () => t.params.cubeEffect,
            perspective: () => !0,
            overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, resistanceRatio: 0, spaceBetween: 0, centeredSlides: !1, virtualTranslate: !0 })
        })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i } = e;
        s({ flipEffect: { slideShadows: !0, limitRotation: !0, transformEl: null } });
        const n = (e, s, i) => {
            let n = t.isHorizontal() ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
                r = t.isHorizontal() ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
            0 === n.length && (n = Q(i, e, t.isHorizontal() ? "left" : "top")), 0 === r.length && (r = Q(i, e, t.isHorizontal() ? "right" : "bottom")), n.length && (n[0].style.opacity = Math.max(-s, 0)), r.length && (r[0].style.opacity = Math.max(s, 0))
        };
        G({
            effect: "flip",
            swiper: t,
            on: i,
            setTranslate: () => {
                const { slides: e, rtlTranslate: s } = t, i = t.params.flipEffect;
                for (let r = 0; r < e.length; r += 1) {
                    const a = e.eq(r);
                    let o = a[0].progress;
                    t.params.flipEffect.limitRotation && (o = Math.max(Math.min(a[0].progress, 1), -1));
                    const l = a[0].swiperSlideOffset;
                    let c = -180 * o,
                        d = 0,
                        u = t.params.cssMode ? -l - t.translate : -l,
                        p = 0;
                    t.isHorizontal() ? s && (c = -c) : (p = u, u = 0, d = -c, c = 0), a[0].style.zIndex = -Math.abs(Math.round(o)) + e.length, i.slideShadows && n(a, o, i);
                    const h = `translate3d(${u}px, ${p}px, 0px) rotateX(${d}deg) rotateY(${c}deg)`;
                    U(i, a).transform(h)
                }
            },
            setTransition: e => {
                const { transformEl: s } = t.params.flipEffect;
                (s ? t.slides.find(s) : t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), K({ swiper: t, duration: e, transformEl: s })
            },
            recreateShadows: () => {
                const e = t.params.flipEffect;
                t.slides.each(s => {
                    const i = c(s);
                    let r = i[0].progress;
                    t.params.flipEffect.limitRotation && (r = Math.max(Math.min(s.progress, 1), -1)), n(i, r, e)
                })
            },
            getEffectParams: () => t.params.flipEffect,
            perspective: () => !0,
            overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !t.params.cssMode })
        })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i } = e;
        s({ coverflowEffect: { rotate: 50, stretch: 0, depth: 100, scale: 1, modifier: 1, slideShadows: !0, transformEl: null } }), G({
            effect: "coverflow",
            swiper: t,
            on: i,
            setTranslate: () => {
                const { width: e, height: s, slides: i, slidesSizesGrid: n } = t, r = t.params.coverflowEffect, a = t.isHorizontal(), o = t.translate, l = a ? e / 2 - o : s / 2 - o, c = a ? r.rotate : -r.rotate, d = r.depth;
                for (let e = 0, t = i.length; e < t; e += 1) {
                    const t = i.eq(e),
                        s = n[e],
                        o = (l - t[0].swiperSlideOffset - s / 2) / s,
                        u = "function" == typeof r.modifier ? r.modifier(o) : o * r.modifier;
                    let p = a ? c * u : 0,
                        h = a ? 0 : c * u,
                        f = -d * Math.abs(u),
                        m = r.stretch;
                    "string" == typeof m && -1 !== m.indexOf("%") && (m = parseFloat(r.stretch) / 100 * s);
                    let g = a ? 0 : m * u,
                        v = a ? m * u : 0,
                        b = 1 - (1 - r.scale) * Math.abs(u);
                    Math.abs(v) < .001 && (v = 0), Math.abs(g) < .001 && (g = 0), Math.abs(f) < .001 && (f = 0), Math.abs(p) < .001 && (p = 0), Math.abs(h) < .001 && (h = 0), Math.abs(b) < .001 && (b = 0);
                    const y = `translate3d(${v}px,${g}px,${f}px)  rotateX(${h}deg) rotateY(${p}deg) scale(${b})`;
                    if (U(r, t).transform(y), t[0].style.zIndex = 1 - Math.abs(Math.round(u)), r.slideShadows) {
                        let e = a ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
                            s = a ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                        0 === e.length && (e = Q(r, t, a ? "left" : "top")), 0 === s.length && (s = Q(r, t, a ? "right" : "bottom")), e.length && (e[0].style.opacity = u > 0 ? u : 0), s.length && (s[0].style.opacity = -u > 0 ? -u : 0)
                    }
                }
            },
            setTransition: e => {
                const { transformEl: s } = t.params.coverflowEffect;
                (s ? t.slides.find(s) : t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            },
            perspective: () => !0,
            overwriteParams: () => ({ watchSlidesProgress: !0 })
        })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i } = e;
        s({ creativeEffect: { transformEl: null, limitProgress: 1, shadowPerProgress: !1, progressMultiplier: 1, perspective: !0, prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 }, next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 } } });
        const n = e => "string" == typeof e ? e : e + "px";
        G({
            effect: "creative",
            swiper: t,
            on: i,
            setTranslate: () => {
                const { slides: e, $wrapperEl: s, slidesSizesGrid: i } = t, r = t.params.creativeEffect, { progressMultiplier: a } = r, o = t.params.centeredSlides;
                if (o) {
                    const e = i[0] / 2 - t.params.slidesOffsetBefore || 0;
                    s.transform(`translateX(calc(50% - ${e}px))`)
                }
                for (let s = 0; s < e.length; s += 1) {
                    const i = e.eq(s),
                        l = i[0].progress,
                        c = Math.min(Math.max(i[0].progress, -r.limitProgress), r.limitProgress);
                    let d = c;
                    o || (d = Math.min(Math.max(i[0].originalProgress, -r.limitProgress), r.limitProgress));
                    const u = i[0].swiperSlideOffset,
                        p = [t.params.cssMode ? -u - t.translate : -u, 0, 0],
                        h = [0, 0, 0];
                    let f = !1;
                    t.isHorizontal() || (p[1] = p[0], p[0] = 0);
                    let m = { translate: [0, 0, 0], rotate: [0, 0, 0], scale: 1, opacity: 1 };
                    c < 0 ? (m = r.next, f = !0) : c > 0 && (m = r.prev, f = !0), p.forEach((e, t) => { p[t] = `calc(${e}px + (${n(m.translate[t])} * ${Math.abs(c*a)}))` }), h.forEach((e, t) => { h[t] = m.rotate[t] * Math.abs(c * a) }), i[0].style.zIndex = -Math.abs(Math.round(l)) + e.length;
                    const g = p.join(", "),
                        v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`,
                        b = d < 0 ? `scale(${1+(1-m.scale)*d*a})` : `scale(${1-(1-m.scale)*d*a})`,
                        y = d < 0 ? 1 + (1 - m.opacity) * d * a : 1 - (1 - m.opacity) * d * a,
                        w = `translate3d(${g}) ${v} ${b}`;
                    if (f && m.shadow || !f) {
                        let e = i.children(".swiper-slide-shadow");
                        if (0 === e.length && m.shadow && (e = Q(r, i)), e.length) {
                            const t = r.shadowPerProgress ? c * (1 / r.limitProgress) : c;
                            e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1)
                        }
                    }
                    const x = U(r, i);
                    x.transform(w).css({ opacity: y }), m.origin && x.css("transform-origin", m.origin)
                }
            },
            setTransition: e => {
                const { transformEl: s } = t.params.creativeEffect;
                (s ? t.slides.find(s) : t.slides).transition(e).find(".swiper-slide-shadow").transition(e), K({ swiper: t, duration: e, transformEl: s, allSlides: !0 })
            },
            perspective: () => t.params.creativeEffect.perspective,
            overwriteParams: () => ({ watchSlidesProgress: !0, virtualTranslate: !t.params.cssMode })
        })
    }, function(e) {
        let { swiper: t, extendParams: s, on: i } = e;
        s({ cardsEffect: { slideShadows: !0, transformEl: null, rotate: !0, perSlideRotate: 2, perSlideOffset: 8 } }), G({
            effect: "cards",
            swiper: t,
            on: i,
            setTranslate: () => {
                const { slides: e, activeIndex: s } = t, i = t.params.cardsEffect, { startTranslate: n, isTouched: r } = t.touchEventsData, a = t.translate;
                for (let o = 0; o < e.length; o += 1) {
                    const l = e.eq(o),
                        c = l[0].progress,
                        d = Math.min(Math.max(c, -4), 4);
                    let u = l[0].swiperSlideOffset;
                    t.params.centeredSlides && !t.params.cssMode && t.$wrapperEl.transform(`translateX(${t.minTranslate()}px)`), t.params.centeredSlides && t.params.cssMode && (u -= e[0].swiperSlideOffset);
                    let p = t.params.cssMode ? -u - t.translate : -u,
                        h = 0;
                    const f = -100 * Math.abs(d);
                    let m = 1,
                        g = -i.perSlideRotate * d,
                        v = i.perSlideOffset - .75 * Math.abs(d);
                    const b = t.virtual && t.params.virtual.enabled ? t.virtual.from + o : o,
                        y = (b === s || b === s - 1) && d > 0 && d < 1 && (r || t.params.cssMode) && a < n,
                        w = (b === s || b === s + 1) && d < 0 && d > -1 && (r || t.params.cssMode) && a > n;
                    if (y || w) {
                        const e = (1 - Math.abs((Math.abs(d) - .5) / .5)) ** .5;
                        g += -28 * d * e, m += -.5 * e, v += 96 * e, h = -25 * e * Math.abs(d) + "%"
                    }
                    if (p = d < 0 ? `calc(${p}px + (${v*Math.abs(d)}%))` : d > 0 ? `calc(${p}px + (-${v*Math.abs(d)}%))` : p + "px", !t.isHorizontal()) {
                        const e = h;
                        h = p, p = e
                    }
                    const x = d < 0 ? "" + (1 + (1 - m) * d) : "" + (1 - (1 - m) * d),
                        _ = `\n        translate3d(${p}, ${h}, ${f}px)\n        rotateZ(${i.rotate?g:0}deg)\n        scale(${x})\n      `;
                    if (i.slideShadows) {
                        let e = l.find(".swiper-slide-shadow");
                        0 === e.length && (e = Q(i, l)), e.length && (e[0].style.opacity = Math.min(Math.max((Math.abs(d) - .5) / .5, 0), 1))
                    }
                    l[0].style.zIndex = -Math.abs(Math.round(c)) + e.length, U(i, l).transform(_)
                }
            },
            setTransition: e => {
                const { transformEl: s } = t.params.cardsEffect;
                (s ? t.slides.find(s) : t.slides).transition(e).find(".swiper-slide-shadow").transition(e), K({ swiper: t, duration: e, transformEl: s })
            },
            perspective: () => !0,
            overwriteParams: () => ({ watchSlidesProgress: !0, virtualTranslate: !t.params.cssMode })
        })
    }];
    return F.use(Z), F
})),
function(e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("simpleParallax", [], t) : "object" == typeof exports ? exports.simpleParallax = t() : e.simpleParallax = t() }(window, (function() {
    return function(e) {
        var t = {};

        function s(i) { if (t[i]) return t[i].exports; var n = t[i] = { i: i, l: !1, exports: {} }; return e[i].call(n.exports, n, n.exports, s), n.l = !0, n.exports }
        return s.m = e, s.c = t, s.d = function(e, t, i) { s.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i }) }, s.r = function(e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, s.t = function(e, t) {
            if (1 & t && (e = s(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var i = Object.create(null);
            if (s.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e)
                for (var n in e) s.d(i, n, function(t) { return e[t] }.bind(null, n));
            return i
        }, s.n = function(e) { var t = e && e.__esModule ? function() { return e.default } : function() { return e }; return s.d(t, "a", t), t }, s.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, s.p = "", s(s.s = 0)
    }([function(e, t, s) {
        "use strict";
        s.r(t), s.d(t, "default", (function() { return b }));

        function i(e, t) {
            for (var s = 0; s < t.length; s++) {
                var i = t[s];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }
        var n = new(function() {
                function e() {! function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, e), this.positions = { top: 0, bottom: 0, height: 0 } }
                var t, s;
                return t = e, (s = [{ key: "setViewportTop", value: function(e) { return this.positions.top = e ? e.scrollTop : window.pageYOffset, this.positions } }, { key: "setViewportBottom", value: function() { return this.positions.bottom = this.positions.top + this.positions.height, this.positions } }, { key: "setViewportAll", value: function(e) { return this.positions.top = e ? e.scrollTop : window.pageYOffset, this.positions.height = e ? e.clientHeight : document.documentElement.clientHeight, this.positions.bottom = this.positions.top + this.positions.height, this.positions } }]) && i(t.prototype, s), e
            }()),
            r = function(e) { return NodeList.prototype.isPrototypeOf(e) || HTMLCollection.prototype.isPrototypeOf(e) ? Array.from(e) : "string" == typeof e || e instanceof String ? document.querySelectorAll(e) : [e] },
            a = function() { for (var e, t = "transform webkitTransform mozTransform oTransform msTransform".split(" "), s = 0; void 0 === e;) e = void 0 !== document.createElement("div").style[t[s]] ? t[s] : void 0, s += 1; return e }();

        function o(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var s = 0, i = new Array(t); s < t; s++) i[s] = e[s];
            return i
        }

        function l(e, t) {
            for (var s = 0; s < t.length; s++) {
                var i = t[s];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }
        var c = function() {
            function e(t, s) {
                var i = this;
                ! function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, e), this.element = t, this.elementContainer = t, this.settings = s, this.isVisible = !0, this.isInit = !1, this.oldTranslateValue = -1, this.init = this.init.bind(this), this.customWrapper = this.settings.customWrapper && this.element.closest(this.settings.customWrapper) ? this.element.closest(this.settings.customWrapper) : null,
                    function(e) { return "img" !== e.tagName.toLowerCase() && "picture" !== e.tagName.toLowerCase() || !!e && !!e.complete && (void 0 === e.naturalWidth || 0 !== e.naturalWidth) }(t) ? this.init() : this.element.addEventListener("load", (function() { setTimeout((function() { i.init(!0) }), 50) }))
            }
            var t, s;
            return t = e, (s = [{
                key: "init",
                value: function(e) {
                    var t = this;
                    this.isInit || (e && (this.rangeMax = null), this.element.closest(".simpleParallax") || (!1 === this.settings.overflow && this.wrapElement(this.element), this.setTransformCSS(), this.getElementOffset(), this.intersectionObserver(), this.getTranslateValue(), this.animate(), this.settings.delay > 0 ? setTimeout((function() { t.setTransitionCSS(), t.elementContainer.classList.add("simple-parallax-initialized") }), 10) : this.elementContainer.classList.add("simple-parallax-initialized"), this.isInit = !0))
                }
            }, {
                key: "wrapElement",
                value: function() {
                    var e = this.element.closest("picture") || this.element,
                        t = this.customWrapper || document.createElement("div");
                    t.classList.add("simpleParallax"), t.style.overflow = "hidden", this.customWrapper || (e.parentNode.insertBefore(t, e), t.appendChild(e)), this.elementContainer = t
                }
            }, {
                key: "unWrapElement",
                value: function() {
                    var e = this.elementContainer;
                    this.customWrapper ? (e.classList.remove("simpleParallax"), e.style.overflow = "") : e.replaceWith.apply(e, function(e) { return function(e) { if (Array.isArray(e)) return o(e) }(e) || function(e) { if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e) }(e) || function(e, t) { if (e) { if ("string" == typeof e) return o(e, t); var s = Object.prototype.toString.call(e).slice(8, -1); return "Object" === s && e.constructor && (s = e.constructor.name), "Map" === s || "Set" === s ? Array.from(e) : "Arguments" === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? o(e, t) : void 0 } }(e) || function() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }() }(e.childNodes))
                }
            }, { key: "setTransformCSS", value: function() {!1 === this.settings.overflow && (this.element.style[a] = "scale(".concat(this.settings.scale, ")")), this.element.style.willChange = "transform" } }, { key: "setTransitionCSS", value: function() { this.element.style.transition = "transform ".concat(this.settings.delay, "s ").concat(this.settings.transition) } }, { key: "unSetStyle", value: function() { this.element.style.willChange = "", this.element.style[a] = "", this.element.style.transition = "" } }, {
                key: "getElementOffset",
                value: function() {
                    var e = this.elementContainer.getBoundingClientRect();
                    if (this.elementHeight = e.height, this.elementTop = e.top + n.positions.top, this.settings.customContainer) {
                        var t = this.settings.customContainer.getBoundingClientRect();
                        this.elementTop = e.top - t.top + n.positions.top
                    }
                    this.elementBottom = this.elementHeight + this.elementTop
                }
            }, {
                key: "buildThresholdList",
                value: function() {
                    for (var e = [], t = 1; t <= this.elementHeight; t++) {
                        var s = t / this.elementHeight;
                        e.push(s)
                    }
                    return e
                }
            }, {
                key: "intersectionObserver",
                value: function() {
                    var e = { root: null, threshold: this.buildThresholdList() };
                    this.observer = new IntersectionObserver(this.intersectionObserverCallback.bind(this), e), this.observer.observe(this.element)
                }
            }, {
                key: "intersectionObserverCallback",
                value: function(e) {
                    var t = this;
                    e.forEach((function(e) { e.isIntersecting ? t.isVisible = !0 : t.isVisible = !1 }))
                }
            }, { key: "checkIfVisible", value: function() { return this.elementBottom > n.positions.top && this.elementTop < n.positions.bottom } }, {
                key: "getRangeMax",
                value: function() {
                    var e = this.element.clientHeight;
                    this.rangeMax = e * this.settings.scale - e
                }
            }, { key: "getTranslateValue", value: function() { var e = ((n.positions.bottom - this.elementTop) / ((n.positions.height + this.elementHeight) / 100)).toFixed(1); return e = Math.min(100, Math.max(0, e)), 0 !== this.settings.maxTransition && e > this.settings.maxTransition && (e = this.settings.maxTransition), this.oldPercentage !== e && (this.rangeMax || this.getRangeMax(), this.translateValue = (e / 100 * this.rangeMax - this.rangeMax / 2).toFixed(0), this.oldTranslateValue !== this.translateValue && (this.oldPercentage = e, this.oldTranslateValue = this.translateValue, !0)) } }, {
                key: "animate",
                value: function() {
                    var e, t = 0,
                        s = 0;
                    (this.settings.orientation.includes("left") || this.settings.orientation.includes("right")) && (s = "".concat(this.settings.orientation.includes("left") ? -1 * this.translateValue : this.translateValue, "px")), (this.settings.orientation.includes("up") || this.settings.orientation.includes("down")) && (t = "".concat(this.settings.orientation.includes("up") ? -1 * this.translateValue : this.translateValue, "px")), e = !1 === this.settings.overflow ? "translate3d(".concat(s, ", ").concat(t, ", 0) scale(").concat(this.settings.scale, ")") : "translate3d(".concat(s, ", ").concat(t, ", 0)"), this.element.style[a] = e
                }
            }]) && l(t.prototype, s), e
        }();

        function d(e) { return function(e) { if (Array.isArray(e)) return p(e) }(e) || function(e) { if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e) }(e) || u(e) || function() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }() }

        function u(e, t) { if (e) { if ("string" == typeof e) return p(e, t); var s = Object.prototype.toString.call(e).slice(8, -1); return "Object" === s && e.constructor && (s = e.constructor.name), "Map" === s || "Set" === s ? Array.from(e) : "Arguments" === s || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s) ? p(e, t) : void 0 } }

        function p(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var s = 0, i = new Array(t); s < t; s++) i[s] = e[s];
            return i
        }

        function h(e, t) {
            for (var s = 0; s < t.length; s++) {
                var i = t[s];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }
        var f, m, g = !1,
            v = [],
            b = function() {
                function e(t, s) {
                    if (function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, e), t && Element.prototype.closest && "IntersectionObserver" in window) {
                        if (this.elements = r(t), this.defaults = { delay: 0, orientation: "up", scale: 1.3, overflow: !1, transition: "cubic-bezier(0,0,0,1)", customContainer: "", customWrapper: "", maxTransition: 0 }, this.settings = Object.assign(this.defaults, s), this.settings.customContainer) {
                            var i = function(e, t) {
                                return function(e) { if (Array.isArray(e)) return e }(e) || function(e, t) {
                                    if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
                                        var s = [],
                                            i = !0,
                                            n = !1,
                                            r = void 0;
                                        try { for (var a, o = e[Symbol.iterator](); !(i = (a = o.next()).done) && (s.push(a.value), !t || s.length !== t); i = !0); } catch (e) { n = !0, r = e } finally { try { i || null == o.return || o.return() } finally { if (n) throw r } }
                                        return s
                                    }
                                }(e, t) || u(e, t) || function() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }()
                            }(r(this.settings.customContainer), 1);
                            this.customContainer = i[0]
                        }
                        this.lastPosition = -1, this.resizeIsDone = this.resizeIsDone.bind(this), this.refresh = this.refresh.bind(this), this.proceedRequestAnimationFrame = this.proceedRequestAnimationFrame.bind(this), this.init()
                    }
                }
                var t, s;
                return t = e, (s = [{
                    key: "init",
                    value: function() {
                        var e = this;
                        n.setViewportAll(this.customContainer), v = [].concat(d(this.elements.map((function(t) { return new c(t, e.settings) }))), d(v)), g || (this.proceedRequestAnimationFrame(), window.addEventListener("resize", this.resizeIsDone), g = !0)
                    }
                }, { key: "resizeIsDone", value: function() { clearTimeout(m), m = setTimeout(this.refresh, 200) } }, {
                    key: "proceedRequestAnimationFrame",
                    value: function() {
                        var e = this;
                        n.setViewportTop(this.customContainer), this.lastPosition !== n.positions.top ? (n.setViewportBottom(), v.forEach((function(t) { e.proceedElement(t) })), f = window.requestAnimationFrame(this.proceedRequestAnimationFrame), this.lastPosition = n.positions.top) : f = window.requestAnimationFrame(this.proceedRequestAnimationFrame)
                    }
                }, {
                    key: "proceedElement",
                    value: function(e) {
                        (this.customContainer ? e.checkIfVisible() : e.isVisible) && e.getTranslateValue() && e.animate()
                    }
                }, { key: "refresh", value: function() { n.setViewportAll(this.customContainer), v.forEach((function(e) { e.getElementOffset(), e.getRangeMax() })), this.lastPosition = -1 } }, {
                    key: "destroy",
                    value: function() {
                        var e = this,
                            t = [];
                        v = v.filter((function(s) { return e.elements.includes(s.element) ? (t.push(s), !1) : s })), t.forEach((function(t) { t.unSetStyle(), !1 === e.settings.overflow && t.unWrapElement() })), v.length || (window.cancelAnimationFrame(f), window.removeEventListener("resize", this.refresh), g = !1)
                    }
                }]) && h(t.prototype, s), e
            }()
    }]).default
})),
function(e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.AOS = t() : e.AOS = t() }(this, (function() {
    return function(e) {
        function t(i) { if (s[i]) return s[i].exports; var n = s[i] = { exports: {}, id: i, loaded: !1 }; return e[i].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports }
        var s = {};
        return t.m = e, t.c = s, t.p = "dist/", t(0)
    }([function(e, t, s) {
        "use strict";

        function i(e) { return e && e.__esModule ? e : { default: e } }
        var n = Object.assign || function(e) { for (var t = 1; t < arguments.length; t++) { var s = arguments[t]; for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i]) } return e },
            r = (i(s(1)), s(6)),
            a = i(r),
            o = i(s(7)),
            l = i(s(8)),
            c = i(s(9)),
            d = i(s(10)),
            u = i(s(11)),
            p = i(s(14)),
            h = [],
            f = !1,
            m = { offset: 120, delay: 0, easing: "ease", duration: 400, disable: !1, once: !1, startEvent: "DOMContentLoaded", throttleDelay: 99, debounceDelay: 50, disableMutationObserver: !1 },
            g = function() { var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; if (e && (f = !0), f) return h = (0, u.default)(h, m), (0, d.default)(h, m.once), h },
            v = function() { h = (0, p.default)(), g() };
        e.exports = {
            init: function(e) {
                m = n(m, e), h = (0, p.default)();
                var t = document.all && !window.atob;
                return function(e) { return !0 === e || "mobile" === e && c.default.mobile() || "phone" === e && c.default.phone() || "tablet" === e && c.default.tablet() || "function" == typeof e && !0 === e() }(m.disable) || t ? void h.forEach((function(e, t) { e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay") })) : (m.disableMutationObserver || l.default.isSupported() || (console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '), m.disableMutationObserver = !0), document.querySelector("body").setAttribute("data-aos-easing", m.easing), document.querySelector("body").setAttribute("data-aos-duration", m.duration), document.querySelector("body").setAttribute("data-aos-delay", m.delay), "DOMContentLoaded" === m.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? g(!0) : "load" === m.startEvent ? window.addEventListener(m.startEvent, (function() { g(!0) })) : document.addEventListener(m.startEvent, (function() { g(!0) })), window.addEventListener("resize", (0, o.default)(g, m.debounceDelay, !0)), window.addEventListener("orientationchange", (0, o.default)(g, m.debounceDelay, !0)), window.addEventListener("scroll", (0, a.default)((function() {
                    (0, d.default)(h, m.once)
                }), m.throttleDelay)), m.disableMutationObserver || l.default.ready("[data-aos]", v), h)
            },
            refresh: g,
            refreshHard: v
        }
    }, function(e, t) {}, , , , , function(e, t) {
        (function(t) {
            "use strict";

            function s(e, t, s) {
                function n(t) {
                    var s = p,
                        i = h;
                    return p = h = void 0, b = t, m = e.apply(i, s)
                }

                function a(e) { return b = e, g = setTimeout(c, t), _ ? n(e) : m }

                function l(e) { var s = e - v; return void 0 === v || s >= t || s < 0 || E && e - b >= f }

                function c() { var e = x(); return l(e) ? d(e) : void(g = setTimeout(c, function(e) { var s = t - (e - v); return E ? w(s, f - (e - b)) : s }(e))) }

                function d(e) { return g = void 0, T && p ? n(e) : (p = h = void 0, m) }

                function u() {
                    var e = x(),
                        s = l(e);
                    if (p = arguments, h = this, v = e, s) { if (void 0 === g) return a(v); if (E) return g = setTimeout(c, t), n(v) }
                    return void 0 === g && (g = setTimeout(c, t)), m
                }
                var p, h, f, m, g, v, b = 0,
                    _ = !1,
                    E = !1,
                    T = !0;
                if ("function" != typeof e) throw new TypeError(o);
                return t = r(t) || 0, i(s) && (_ = !!s.leading, f = (E = "maxWait" in s) ? y(r(s.maxWait) || 0, t) : f, T = "trailing" in s ? !!s.trailing : T), u.cancel = function() { void 0 !== g && clearTimeout(g), b = 0, p = v = h = g = void 0 }, u.flush = function() { return void 0 === g ? m : d(x()) }, u
            }

            function i(e) { var t = void 0 === e ? "undefined" : a(e); return !!e && ("object" == t || "function" == t) }

            function n(e) { return "symbol" == (void 0 === e ? "undefined" : a(e)) || function(e) { return !!e && "object" == (void 0 === e ? "undefined" : a(e)) }(e) && b.call(e) == c }

            function r(e) {
                if ("number" == typeof e) return e;
                if (n(e)) return l;
                if (i(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = i(t) ? t + "" : t
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(d, "");
                var s = p.test(e);
                return s || h.test(e) ? f(e.slice(2), s ? 2 : 8) : u.test(e) ? l : +e
            }
            var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
                o = "Expected a function",
                l = NaN,
                c = "[object Symbol]",
                d = /^\s+|\s+$/g,
                u = /^[-+]0x[0-9a-f]+$/i,
                p = /^0b[01]+$/i,
                h = /^0o[0-7]+$/i,
                f = parseInt,
                m = "object" == (void 0 === t ? "undefined" : a(t)) && t && t.Object === Object && t,
                g = "object" == ("undefined" == typeof self ? "undefined" : a(self)) && self && self.Object === Object && self,
                v = m || g || Function("return this")(),
                b = Object.prototype.toString,
                y = Math.max,
                w = Math.min,
                x = function() { return v.Date.now() };
            e.exports = function(e, t, n) {
                var r = !0,
                    a = !0;
                if ("function" != typeof e) throw new TypeError(o);
                return i(n) && (r = "leading" in n ? !!n.leading : r, a = "trailing" in n ? !!n.trailing : a), s(e, t, { leading: r, maxWait: t, trailing: a })
            }
        }).call(t, function() { return this }())
    }, function(e, t) {
        (function(t) {
            "use strict";

            function s(e) { var t = void 0 === e ? "undefined" : r(e); return !!e && ("object" == t || "function" == t) }

            function i(e) { return "symbol" == (void 0 === e ? "undefined" : r(e)) || function(e) { return !!e && "object" == (void 0 === e ? "undefined" : r(e)) }(e) && v.call(e) == l }

            function n(e) {
                if ("number" == typeof e) return e;
                if (i(e)) return o;
                if (s(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = s(t) ? t + "" : t
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(c, "");
                var n = u.test(e);
                return n || p.test(e) ? h(e.slice(2), n ? 2 : 8) : d.test(e) ? o : +e
            }
            var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
                a = "Expected a function",
                o = NaN,
                l = "[object Symbol]",
                c = /^\s+|\s+$/g,
                d = /^[-+]0x[0-9a-f]+$/i,
                u = /^0b[01]+$/i,
                p = /^0o[0-7]+$/i,
                h = parseInt,
                f = "object" == (void 0 === t ? "undefined" : r(t)) && t && t.Object === Object && t,
                m = "object" == ("undefined" == typeof self ? "undefined" : r(self)) && self && self.Object === Object && self,
                g = f || m || Function("return this")(),
                v = Object.prototype.toString,
                b = Math.max,
                y = Math.min,
                w = function() { return g.Date.now() };
            e.exports = function(e, t, i) {
                function r(t) {
                    var s = p,
                        i = h;
                    return p = h = void 0, x = t, m = e.apply(i, s)
                }

                function o(e) { return x = e, g = setTimeout(c, t), _ ? r(e) : m }

                function l(e) { var s = e - v; return void 0 === v || s >= t || s < 0 || E && e - x >= f }

                function c() { var e = w(); return l(e) ? d(e) : void(g = setTimeout(c, function(e) { var s = t - (e - v); return E ? y(s, f - (e - x)) : s }(e))) }

                function d(e) { return g = void 0, T && p ? r(e) : (p = h = void 0, m) }

                function u() {
                    var e = w(),
                        s = l(e);
                    if (p = arguments, h = this, v = e, s) { if (void 0 === g) return o(v); if (E) return g = setTimeout(c, t), r(v) }
                    return void 0 === g && (g = setTimeout(c, t)), m
                }
                var p, h, f, m, g, v, x = 0,
                    _ = !1,
                    E = !1,
                    T = !0;
                if ("function" != typeof e) throw new TypeError(a);
                return t = n(t) || 0, s(i) && (_ = !!i.leading, f = (E = "maxWait" in i) ? b(n(i.maxWait) || 0, t) : f, T = "trailing" in i ? !!i.trailing : T), u.cancel = function() { void 0 !== g && clearTimeout(g), x = 0, p = v = h = g = void 0 }, u.flush = function() { return void 0 === g ? m : d(w()) }, u
            }
        }).call(t, function() { return this }())
    }, function(e, t) {
        "use strict";

        function s() { return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver }

        function i(e) {
            e && e.forEach((function(e) {
                var t = Array.prototype.slice.call(e.addedNodes),
                    s = Array.prototype.slice.call(e.removedNodes);
                if (function e(t) {
                        var s = void 0,
                            i = void 0;
                        for (s = 0; s < t.length; s += 1) { if ((i = t[s]).dataset && i.dataset.aos) return !0; if (i.children && e(i.children)) return !0 }
                        return !1
                    }(t.concat(s))) return n()
            }))
        }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var n = function() {};
        t.default = {
            isSupported: function() { return !!s() },
            ready: function(e, t) {
                var r = window.document,
                    a = new(s())(i);
                n = t, a.observe(r.documentElement, { childList: !0, subtree: !0, removedNodes: !0 })
            }
        }
    }, function(e, t) {
        "use strict";

        function s() { return navigator.userAgent || navigator.vendor || window.opera || "" }
        Object.defineProperty(t, "__esModule", { value: !0 });
        var i = function() {
                function e(e, t) {
                    for (var s = 0; s < t.length; s++) {
                        var i = t[s];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, s, i) { return s && e(t.prototype, s), i && e(t, i), t }
            }(),
            n = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
            r = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            a = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
            o = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            l = function() {
                function e() {! function(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }(this, e) }
                return i(e, [{ key: "phone", value: function() { var e = s(); return !(!n.test(e) && !r.test(e.substr(0, 4))) } }, { key: "mobile", value: function() { var e = s(); return !(!a.test(e) && !o.test(e.substr(0, 4))) } }, { key: "tablet", value: function() { return this.mobile() && !this.phone() } }]), e
            }();
        t.default = new l
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        t.default = function(e, t) {
            var s = window.pageYOffset,
                i = window.innerHeight;
            e.forEach((function(e, n) {
                ! function(e, t, s) {
                    var i = e.node.getAttribute("data-aos-once");
                    t > e.position ? e.node.classList.add("aos-animate") : void 0 !== i && ("false" === i || !s && "true" !== i) && e.node.classList.remove("aos-animate")
                }(e, i + s, t)
            }))
        }
    }, function(e, t, s) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var i = function(e) { return e && e.__esModule ? e : { default: e } }(s(12));
        t.default = function(e, t) { return e.forEach((function(e, s) { e.node.classList.add("aos-init"), e.position = (0, i.default)(e.node, t.offset) })), e }
    }, function(e, t, s) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var i = function(e) { return e && e.__esModule ? e : { default: e } }(s(13));
        t.default = function(e, t) {
            var s = 0,
                n = 0,
                r = window.innerHeight,
                a = { offset: e.getAttribute("data-aos-offset"), anchor: e.getAttribute("data-aos-anchor"), anchorPlacement: e.getAttribute("data-aos-anchor-placement") };
            switch (a.offset && !isNaN(a.offset) && (n = parseInt(a.offset)), a.anchor && document.querySelectorAll(a.anchor) && (e = document.querySelectorAll(a.anchor)[0]), s = (0, i.default)(e).top, a.anchorPlacement) {
                case "top-bottom":
                    break;
                case "center-bottom":
                    s += e.offsetHeight / 2;
                    break;
                case "bottom-bottom":
                    s += e.offsetHeight;
                    break;
                case "top-center":
                    s += r / 2;
                    break;
                case "bottom-center":
                    s += r / 2 + e.offsetHeight;
                    break;
                case "center-center":
                    s += r / 2 + e.offsetHeight / 2;
                    break;
                case "top-top":
                    s += r;
                    break;
                case "bottom-top":
                    s += e.offsetHeight + r;
                    break;
                case "center-top":
                    s += e.offsetHeight / 2 + r
            }
            return a.anchorPlacement || a.offset || isNaN(t) || (n = t), s + n
        }
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        t.default = function(e) { for (var t = 0, s = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), s += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent; return { top: s, left: t } }
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        t.default = function(e) { return e = e || document.querySelectorAll("[data-aos]"), Array.prototype.map.call(e, (function(e) { return { node: e } })) }
    }])
})),
function(e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Pristine = t() }(this, (function() {
    "use strict";
    var e = { required: "This field is required", email: "This field requires a valid e-mail address", number: "This field requires a number", integer: "This field requires an integer value", url: "This field requires a valid website URL", tel: "This field requires a valid telephone number", maxlength: "This fields length must be < ${1}", minlength: "This fields length must be > ${1}", min: "Minimum value for this field is ${1}", max: "Maximum value for this field is ${1}", pattern: "Please match the requested format" };

    function t(e) { var t = arguments; return this.replace(/\${([^{}]*)}/g, (function(e, s) { return t[s] })) }

    function s(e) { return e.pristine.self.form.querySelectorAll('input[name="' + e.getAttribute("name") + '"]:checked').length }
    var i = { classTo: "form-group", errorClass: "has-danger", successClass: "has-success", errorTextParent: "form-group", errorTextTag: "div", errorTextClass: "text-help" },
        n = ["required", "min", "max", "minlength", "maxlength", "pattern"],
        r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        a = {},
        o = function(t, s) { s.name = t, s.msg || (s.msg = e[t]), void 0 === s.priority && (s.priority = 1), a[t] = s };

    function l(e, s, r) {
        var o = this;

        function l(e, t, s, i) {
            var n = a[s];
            if (n && (e.push(n), i)) {
                var r = i.split(",");
                r.unshift(null), t[s] = r
            }
        }

        function c(e) {
            for (var s, i = [], n = !0, r = 0; e.validators[r]; r++) {
                var a = e.validators[r],
                    o = e.params[a.name] ? e.params[a.name] : [];
                if (o[0] = e.input.value, !a.fn.apply(e.input, o)) {
                    if (n = !1, (s = a.msg) && s.constructor && s.call && s.apply) i.push(a.msg(e.input.value, o));
                    else {
                        var l = e.messages[a.name] || a.msg;
                        i.push(t.apply(l, o))
                    }
                    if (!0 === a.halt) break
                }
            }
            return e.errors = i, n
        }

        function d(e) {
            if (e.errorElements) return e.errorElements;
            var t = function(e, t) {
                    for (;
                        (e = e.parentElement) && !e.classList.contains(t););
                    return e
                }(e.input, o.config.classTo),
                s = null,
                i = null;
            return (s = o.config.classTo === o.config.errorTextParent ? t : t.querySelector("." + o.config.errorTextParent)) && ((i = s.querySelector(".pristine-error")) || ((i = document.createElement(o.config.errorTextTag)).className = "pristine-error " + o.config.errorTextClass, s.appendChild(i), i.pristineDisplay = i.style.display)), e.errorElements = [t, i]
        }

        function u(e) {
            var t = d(e),
                s = t[0],
                i = t[1];
            s && (s.classList.remove(o.config.successClass), s.classList.add(o.config.errorClass)), i && (i.innerHTML = e.errors.join("<br/>"), i.style.display = i.pristineDisplay || "")
        }

        function p(e) {
            var t = function(e) {
                var t = d(e),
                    s = t[0],
                    i = t[1];
                return s && (s.classList.remove(o.config.errorClass), s.classList.remove(o.config.successClass)), i && (i.innerHTML = "", i.style.display = "none"), t
            }(e)[0];
            t && t.classList.add(o.config.successClass)
        }
        return function(e, t, s) {
            e.setAttribute("novalidate", "true"), o.form = e, o.config = function(e, t) { for (var s in t) s in e || (e[s] = t[s]); return e }(t || {}, i), o.live = !(!1 === s), o.fields = Array.from(e.querySelectorAll("input:not([type^=hidden]):not([type^=submit]), select, textarea")).map(function(e) {
                var t = [],
                    s = {},
                    i = {};
                return [].forEach.call(e.attributes, (function(e) { if (/^data-pristine-/.test(e.name)) { var r = e.name.substr(14); if (r.endsWith("-message")) return void(i[r.slice(0, r.length - 8)] = e.value); "type" === r && (r = e.value), l(t, s, r, e.value) } else ~n.indexOf(e.name) ? l(t, s, e.name, e.value) : "type" === e.name && l(t, s, e.value) })), t.sort((function(e, t) { return t.priority - e.priority })), o.live && e.addEventListener(~["radio", "checkbox"].indexOf(e.getAttribute("type")) ? "change" : "input", function(e) { o.validate(e.target) }.bind(o)), e.pristine = { input: e, validators: t, params: s, messages: i, self: o }
            }.bind(o))
        }(e, s, r), o.validate = function(e, t) {
            t = e && !0 === t || !0 === e;
            var s = o.fields;
            !0 !== e && !1 !== e && (e instanceof HTMLElement ? s = [e.pristine] : (e instanceof NodeList || e instanceof(window.$ || Array) || e instanceof Array) && (s = Array.from(e).map((function(e) { return e.pristine }))));
            for (var i = !0, n = 0; s[n]; n++) {
                var r = s[n];
                c(r) ? !t && p(r) : (i = !1, !t && u(r))
            }
            return i
        }, o.getErrors = function(e) {
            if (!e) {
                for (var t = [], s = 0; s < o.fields.length; s++) {
                    var i = o.fields[s];
                    i.errors.length && t.push({ input: i.input, errors: i.errors })
                }
                return t
            }
            return e.tagName && "select" === e.tagName.toLowerCase() ? e.pristine.errors : e.length ? e[0].pristine.errors : e.pristine.errors
        }, o.addValidator = function(e, t, s, i, n) { e instanceof HTMLElement ? (e.pristine.validators.push({ fn: t, msg: s, priority: i, halt: n }), e.pristine.validators.sort((function(e, t) { return t.priority - e.priority }))) : console.warn("The parameter elem must be a dom element") }, o.addError = function(e, t) {
            (e = e.length ? e[0] : e).pristine.errors.push(t), u(e.pristine)
        }, o.reset = function() {
            for (var e = 0; o.fields[e]; e++) o.fields[e].errorElements = null;
            Array.from(o.form.querySelectorAll(".pristine-error")).map((function(e) { e.parentNode.removeChild(e) })), Array.from(o.form.querySelectorAll("." + o.config.classTo)).map((function(e) { e.classList.remove(o.config.successClass), e.classList.remove(o.config.errorClass) }))
        }, o.destroy = function() { o.reset(), o.fields.forEach((function(e) { delete e.input.pristine })), o.fields = [] }, o.setGlobalConfig = function(e) { i = e }, o
    }
    return o("text", { fn: function(e) { return !0 }, priority: 0 }), o("required", { fn: function(e) { return "radio" === this.type || "checkbox" === this.type ? s(this) : void 0 !== e && "" !== e }, priority: 99, halt: !0 }), o("email", { fn: function(e) { return !e || r.test(e) } }), o("number", { fn: function(e) { return !e || !isNaN(parseFloat(e)) }, priority: 2 }), o("integer", { fn: function(e) { return !e || /^\d+$/.test(e) } }), o("minlength", { fn: function(e, t) { return !e || e.length >= parseInt(t) } }), o("maxlength", { fn: function(e, t) { return !e || e.length <= parseInt(t) } }), o("min", { fn: function(e, t) { return !e || ("checkbox" === this.type ? s(this) >= parseInt(t) : parseFloat(e) >= parseFloat(t)) } }), o("max", { fn: function(e, t) { return !e || ("checkbox" === this.type ? s(this) <= parseInt(t) : parseFloat(e) <= parseFloat(t)) } }), o("pattern", { fn: function(e, t) { var s = t.match(new RegExp("^/(.*?)/([gimy]*)$")); return !e || new RegExp(s[1], s[2]).test(e) } }), l.addValidator = function(e, t, s, i, n) { o(e, { fn: t, msg: s, priority: i, halt: n }) }, l
}));
/*!
 * NioApp v1.0.0 (https://Wizgle.com/)
 * Developed by Wizgle Team.
 * Copyright by Wizgle.
 */
var NioApp = function(e, t) {
    "use strict";
    var s = { AppInfo: { name: "NioApp", version: "1.0.0", author: "Wizgle" }, Package: { name: "Our Smart Housing", version: "1.0" } };
    return s.docReady = function(e) { document.addEventListener("DOMContentLoaded", e, !1) }, s.winLoad = function(e) { window.addEventListener("load", e, !1) }, s.onResize = function(e, t) {
        (t = void 0 === t ? window : t).addEventListener("resize", e)
    }, s
}(window, document);
NioApp = function(e) {
    "use strict";
    return e.BS = {}, e.Addons = {}, e.Custom = {}, e.Toggle = {}, e.body = document.querySelector("body"), e.Win = { height: window.innerHeight, width: window.innerWidth }, e.Break = { mb: 420, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400, any: 1 / 0 }, e.State = { isRTL: !(!e.body.classList.contains("has-rtl") && "rtl" !== e.body.getAttribute("dir")), isTouch: "ontouchstart" in document.documentElement, isMobile: !!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|/i), asMobile: e.Win.width < e.Break.md }, e.StateUpdate = function() { e.Win = { height: window.innerHeight, width: window.innerWidth }, e.State.asMobile = e.Win.width < e.Break.md }, e.SlideUp = function(e, t = 500) { e.style.transitionProperty = "height, margin, padding", e.style.transitionDuration = t + "ms", e.style.boxSizing = "border-box", e.style.height = e.offsetHeight + "px", e.offsetHeight, e.style.overflow = "hidden", e.style.height = 0, e.style.paddingTop = 0, e.style.paddingBottom = 0, e.style.marginTop = 0, e.style.marginBottom = 0, window.setTimeout(() => { e.style.display = "none", e.style.removeProperty("height"), e.style.removeProperty("padding-top"), e.style.removeProperty("padding-bottom"), e.style.removeProperty("margin-top"), e.style.removeProperty("margin-bottom"), e.style.removeProperty("overflow"), e.style.removeProperty("transition-duration"), e.style.removeProperty("transition-property") }, t) }, e.SlideDown = function(e, t = 500) {
        e.style.removeProperty("display");
        let s = window.getComputedStyle(e).display;
        "none" === s && (s = "block"), e.style.display = s;
        let i = e.offsetHeight;
        e.style.overflow = "hidden", e.style.height = 0, e.style.paddingTop = 0, e.style.paddingBottom = 0, e.style.marginTop = 0, e.style.marginBottom = 0, e.offsetHeight, e.style.boxSizing = "border-box", e.style.transitionProperty = "height, margin, padding", e.style.transitionDuration = t + "ms", e.style.height = i + "px", e.style.removeProperty("padding-top"), e.style.removeProperty("padding-bottom"), e.style.removeProperty("margin-top"), e.style.removeProperty("margin-bottom"), window.setTimeout(() => { e.style.removeProperty("height"), e.style.removeProperty("overflow"), e.style.removeProperty("transition-duration"), e.style.removeProperty("transition-property") }, t)
    }, e.SlideToggle = function(t, s = 500) { return "none" === window.getComputedStyle(t).display ? e.SlideDown(t, s) : e.SlideUp(t, s) }, e.extendObject = function(e, t) { return Object.keys(t).forEach((function(s) { e[s] = t[s] })), e }, e.onResize(e.StateUpdate), e
}(NioApp);