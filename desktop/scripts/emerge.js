//! v.1.1.1, http://ilyabirman.net/projects/emerge/
jQuery && (! function(t) {
  t(function() {
    t.expr[":"].uncached = function(a) {
      if (!t(a).is('img[src!=""]')) return !1;
      var e = new Image;
      return e.src = a.src, !e.complete
    };
    var a = [],
      e = 500,
      r = !1,
      i = ["backgroundImage", "borderImage", "borderCornerImage", "listStyleImage", "cursor"],
      o = /url\(\s*(['"]?)(.*?)\1\s*\)/g,
      n = 0,
      s = function(t, a, e, r, i) {
        var o = "emergeRotate" + ++n;
        return "<style>@-webkit-keyframes " + o + " { from { -webkit-transform: rotate(" + 360 * e + "deg); } to { -webkit-transform: rotate(" + 360 * !e + "deg); }  } @keyframes " + o + " { from { transform: rotate(" + 360 * e + "deg); } to { transform: rotate(" + 360 * !e + 'deg); }  } </style><div style="position: absolute; transition: opacity ' + i + 'ms ease-out"><div style="position: absolute; left: 50%; top: 50%; margin: -' + t + 'px"><svg xmlns="http://www.w3.org/2000/svg" width="' + 2 * t + '" height="' + 2 * t + '"viewBox="0 0 24 24" style="-webkit-animation: ' + o + " " + r + "ms linear infinite;animation: " + o + " " + r + 'ms linear infinite"><path fill="' + a + '" d="M17.25 1.5c-.14-.06-.28-.11-.44-.11-.55 0-1 .45-1 1 0 .39.23.72.56.89l-.01.01c3.2 1.6 5.39 4.9 5.39 8.71 0 5.38-4.37 9.75-9.75 9.75S2.25 17.39 2.25 12c0-3.82 2.2-7.11 5.39-8.71v-.02c.33-.16.56-.49.56-.89 0-.55-.45-1-1-1-.16 0-.31.05-.44.11C2.9 3.43.25 7.4.25 12c0 6.49 5.26 11.75 11.75 11.75S23.75 18.49 23.75 12c0-4.6-2.65-8.57-6.5-10.5z"></path></svg></div></div>'
      };
    if (window.navigator && "preview" === window.navigator.loadPurpose) return t(".emerge").css("transition", "none"), t(".emerge").css("opacity", "1"), !1;
    var d = function(t, a) {
        var r = t.data("hold");
        if (r && !t.data("_holding")) return t.data("_holding", !0), setTimeout(function() {
          d(t, !0)
        }, r), !1;
        if (t.data("_holding") && !a) return !1;
        var i = t.data("_spinner");
        i && i.css("opacity", 0), t.css("transition", "opacity " + e + "ms ease-out"), t.css("opacity", "1");
        var o = t.data("style-2");
        o && t.attr("style", t.attr("style") + "; " + o), t.data("_fired", !0), c()
      },
      c = function(t) {
        t && a.push(t);
        for (var e in a) {
          var r = a[e];
          if (r.data("_fired"));
          else {
            var i, o = !1;
            if (i = r.data("_waitFor")) {
              for (;;) {
                if (!i.data("_fired")) {
                  if (i[0] == r[0]) {
                    o = !0;
                    break
                  }
                  if (i = i.data("_waitFor")) continue
                }
                break
              }(r.data("_waitFor").data("_fired") || o) && d(r)
            } else d(r)
          }
        }
      };
    t(".emerge").each(function() {
      var a = t(this),
        n = {},
        d = !1,
        l = 12,
        f = 1333,
        u = "#404040",
        p = 0,
        g = e,
        m = 0,
        v = 0,
        w = "",
        y = "",
        b = e,
        h = {};
      a.$prev = r;
      var k = function() {
          a.data("continue") && a.data("_waitFor", a.$prev), a.data("await") && a.data("_waitFor", t("#" + a.data("await"))), c(a)
        },
        _ = function() {
          v++, v == m && setTimeout(k, a.data("slow"))
        };
      if (a.data("opaque") && a.css("opacity", 1), h = a.data("effect") || !1, b = a.data("duration") || e, h) {
        var x = {},
          z = ["", "-webkit-"],
          I = "transform",
          F = "transform-origin",
          j = a.data("up") || 0,
          S = a.data("down") || 0,
          B = a.data("left") || 0,
          C = a.data("right") || 0,
          M = a.data("angle") || "90",
          O = a.data("scale") || -1,
          Q = a.data("origin") || "50% 50%";
        if (S && (j = "-" + S, "--" == j.substr(0, 2) && (j = j.substr(2))), C && (B = "-" + C, "--" == B.substr(0, 2) && (B = B.substr(2))), "relax" == h && (-1 == O && (O = .92), "50% 50%" == Q && (Q = "top"), x = {
            one: "scaleY(" + O + ")",
            two: "scaleY(1)",
            orn: Q,
            crv: "cubic-bezier(0, 0, 0.001, 1)"
          }), "slide" == h && (j || (j = "20px"), x = {
            one: "translate(" + B + "," + j + ")",
            two: "translate(0,0)",
            crv: "cubic-bezier(0, 0.9, 0.1, 1)"
          }), "zoom" == h && (-1 == O && (O = .5), x = {
            one: "scale(" + O + ")",
            two: "scale(1)",
            orn: Q,
            crv: "cubic-bezier(0, 0.75, 0.25, 1)"
          }), "screw" == h && (-1 == O && (O = .5), M || (M = 90), x = {
            one: "scale(" + O + ") rotate(" + M + "deg)",
            two: "scale(1) rotate(0)",
            orn: Q,
            crv: "cubic-bezier(0, 0.75, 0.25, 1)"
          }), x)
          for (var T = 0; T < z.length; ++T) w += z[T] + I + ": " + x.one + "; " + z[T] + F + ": " + x.orn + "; ", y += z[T] + I + ": " + x.two + "; " + z[T] + "transition: opacity " + b + "ms ease-out, " + z[T] + I + " " + b + "ms " + x.crv + "; ";
        a.data("style-1", w), a.data("style-2", y)
      }
      if (w || (w = a.data("style-1")), w && a.attr("style", a.attr("style") + "; " + w), a.find("*").addBack().each(function() {
          var a = t(this);
          a.is("img:uncached") && a.attr("src") && (n[a.attr("src")] = !0);
          for (var e = 0; e < i.length; ++e) {
            var r, s = i[e],
              d = a.css(s),
              c = -1;
            if (d && (c = d.indexOf("url(")) >= 0)
              for (; null !== (r = o.exec(d));) n[r[2]] = !0
          }
        }), Object.keys(n).length > 0 && (d = a.data("spin"))) {
        var Y = a.data("spin-element");
        if (Y) var $ = t("#" + Y).clone().css({
          position: "absolute",
          display: "block"
        });
        else {
          a.data("spin-size") && (l = a.data("spin-size") / 2), a.data("spin-color") && (u = a.data("spin-color")), a.data("spin-period") && (f = a.data("spin-period")), a.data("spin-direction") && (p = "clockwise" == a.data("spin-direction") ? 0 : 1), g = b;
          var $ = t(s(l, u, p, f, g))
        }
        $.css({
          width: "100%",
          height: Math.min(a.height(), document.body.clientHeight - a.offset().top)
        }), a.before($), a.data("_spinner", $)
      }
      for (var T in n) {
        var q = new Image;
        q.src = T, m++, q.width > 0 ? _() : t(q).on("load error", _)
      }
      m++, _(), r = a
    })
  })
}(jQuery), document.write("<style>.emerge { opacity: 0; }</style>"));
