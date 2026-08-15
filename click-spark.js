/**
 * ClickSpark — Vanilla JS port of the React Bits ClickSpark component
 *
 * Fires spark animations on:
 *  • Every mouse click (document click event)
 *  • Every touch tap (document touchstart event)
 *  • Every native <select> change — because OS-native dropdown option
 *    clicks do NOT fire DOM click events; we catch them via "change" instead
 *    and fire sparks at the centre of the <select> element.
 */
(function () {
  'use strict';

  /* ---------- Config -------------------------------------------------------- */
  var CONFIG = {
    sparkColor:  '#14b8a6',
    sparkSize:   11,
    sparkRadius: 38,
    sparkCount:  7,
    duration:    500,
    easing:      'ease-out',
    extraScale:  1.1,
  };

  /* ---------- Easing -------------------------------------------------------- */
  function easeFunc(t, fn) {
    switch (fn) {
      case 'linear':      return t;
      case 'ease-in':     return t * t;
      case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default:            return t * (2 - t);   // ease-out
    }
  }

  /* ---------- State --------------------------------------------------------- */
  var sparks = [];
  var rafId  = null;

  /* ---------- Canvas -------------------------------------------------------- */
  var canvas = document.createElement('canvas');
  canvas.id  = 'click-spark-canvas';
  canvas.style.cssText = [
    'position:fixed',
    'inset:0',
    'width:100%',
    'height:100%',
    'pointer-events:none',
    'z-index:2147483647',
    'display:block',
    'user-select:none',
  ].join(';');

  var ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /* ---------- Draw loop ----------------------------------------------------- */
  function draw(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparks = sparks.filter(function (spark) {
      var elapsed = timestamp - spark.startTime;
      if (elapsed >= CONFIG.duration) return false;

      var progress   = elapsed / CONFIG.duration;
      var eased      = easeFunc(progress, CONFIG.easing);
      var distance   = eased * CONFIG.sparkRadius * CONFIG.extraScale;
      var lineLength = CONFIG.sparkSize * (1 - eased);

      var x1 = spark.x + distance                * Math.cos(spark.angle);
      var y1 = spark.y + distance                * Math.sin(spark.angle);
      var x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      var y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      ctx.globalAlpha = 1 - eased;
      ctx.strokeStyle = CONFIG.sparkColor;
      ctx.lineWidth   = 2.2;
      ctx.lineCap     = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.globalAlpha = 1;

      return true;
    });

    if (sparks.length > 0) {
      rafId = requestAnimationFrame(draw);
    } else {
      rafId = null;
    }
  }

  /* ---------- Core addSparks helper ----------------------------------------- */
  function addSparks(clientX, clientY) {
    var now = performance.now();
    for (var i = 0; i < CONFIG.sparkCount; i++) {
      sparks.push({
        x:         clientX,
        y:         clientY,
        angle:     (2 * Math.PI * i) / CONFIG.sparkCount,
        startTime: now,
      });
    }
    if (!rafId) {
      rafId = requestAnimationFrame(draw);
    }
  }

  /* ---------- Event handlers ------------------------------------------------ */
  function onMouseClick(e) {
    addSparks(e.clientX, e.clientY);
  }

  function onTouchStart(e) {
    if (e.touches && e.touches.length > 0) {
      addSparks(e.touches[0].clientX, e.touches[0].clientY);
    }
  }

  /**
   * Native <select> dropdowns open an OS-level popup — clicking an option
   * inside it does NOT fire a DOM "click" event on document.
   * We listen to "change" and fire sparks at the centre of the <select> box.
   */
  function onSelectChange(e) {
    var el   = e.target;
    var rect = el.getBoundingClientRect();
    var cx   = rect.left + rect.width  / 2;
    var cy   = rect.top  + rect.height / 2;
    addSparks(cx, cy);
  }

  /**
   * Attach change listeners to every <select> that exists now AND
   * to any that are dynamically added later (via MutationObserver).
   */
  function attachSelectListeners(root) {
    var selects = root.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
      // Use a flag so we don't double-attach on the same element
      if (!selects[i]._sparkBound) {
        selects[i].addEventListener('change', onSelectChange);
        selects[i]._sparkBound = true;
      }
    }
  }

  /* ---------- Init ---------------------------------------------------------- */
  function init() {
    document.body.appendChild(canvas);
    resizeCanvas();

    window.addEventListener('resize',       resizeCanvas,   { passive: true });
    document.addEventListener('click',      onMouseClick,   { passive: true });
    document.addEventListener('touchstart', onTouchStart,   { passive: true });

    // Attach to all current selects
    attachSelectListeners(document);

    // Watch for dynamically added selects (e.g. via JS frameworks)
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {          // Element node
            if (node.tagName === 'SELECT') {
              if (!node._sparkBound) {
                node.addEventListener('change', onSelectChange);
                node._sparkBound = true;
              }
            }
            attachSelectListeners(node);      // check descendants too
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
