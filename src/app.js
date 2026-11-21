(function () {
  var d = document, root = d.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }

  $(".stagger").forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (c, i) {
      c.classList.add("reveal");
      c.style.setProperty("--i", i % 6);
    });
  });

  var targets = $(".reveal, .term, .timeline li");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add("in"); });
    root.classList.add("static");
  }

  $(".card").forEach(function (c) {
    c.addEventListener("pointermove", function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", (e.clientX - r.left) + "px");
      c.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  var bar = $(".progress")[0], pin = $("#install")[0], steps = $(".steps li"),
      fill = $(".win-foot .bar b")[0], tl = $(".timeline")[0], items = $(".timeline li"),
      links = $(".main-nav a"), secs = links.map(function (a) { return $(a.getAttribute("href"))[0]; }),
      hero = $(".hero")[0], ticking = false, lastStep = -1;

  function frame() {
    ticking = false;
    var y = window.pageYOffset, vh = window.innerHeight,
        max = Math.max(1, root.scrollHeight - vh);
    root.style.setProperty("--hy", Math.min(y, vh * 1.5));
    if (bar) bar.style.setProperty("--p", (y / max).toFixed(4));
    root.classList.toggle("scrolled", y > 24);

    if (pin && root.classList.contains("js")) {
      var r = pin.getBoundingClientRect(), total = r.height - vh;
      var p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      if (window.innerWidth < 900 || window.innerHeight < 620) p = r.top < vh * .6 ? 1 : 0;
      var n = steps.length, idx = Math.min(n - 1, Math.floor(p * n * 0.999));
      if (p <= 0) idx = -1;
      if (idx !== lastStep) {
        lastStep = idx;
        steps.forEach(function (s, i) {
          s.classList.toggle("done", i < idx || (p >= 1 && i <= idx));
          s.classList.toggle("now", i === idx && p < 1);
        });
      }
      if (fill) fill.style.setProperty("--w", p.toFixed(4));
    }

    if (tl) {
      var tr = tl.getBoundingClientRect(), mid = vh * 0.55;
      var tp = Math.min(1, Math.max(0, (mid - tr.top) / tr.height));
      tl.style.setProperty("--rp", tp.toFixed(4));
      items.forEach(function (li) {
        li.classList.toggle("reached", li.getBoundingClientRect().top < mid);
      });
    }

    var cur = -1;
    secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < vh * 0.4) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle("active", i === cur); });
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener("scroll", req, { passive: true });
  addEventListener("resize", req);
  frame();
})();
