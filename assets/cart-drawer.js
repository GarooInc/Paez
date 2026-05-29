/* ============================================================
   Cart Drawer — Paez Theme
   ============================================================ */
(function () {
  'use strict';

  var upsellVariantId = null;

  // ── Helpers ──────────────────────────────────────────────

  function money(cents) {
    var fmt = (window.CART_MONEY_FMT || '€{{amount}}').replace(/<[^>]*>/g, '');
    var amount = (cents / 100).toFixed(2);
    return fmt
      .replace('{{amount}}', amount)
      .replace('{{amount_with_comma_separator}}', amount.replace('.', ','))
      .replace('{{amount_no_decimals}}', Math.floor(cents / 100))
      .replace('{{amount_no_decimals_with_comma_separator}}', Math.floor(cents / 100));
  }

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function el(id) { return document.getElementById(id); }

  // ── Open / Close ─────────────────────────────────────────

  function open() {
    el('cart-drawer-overlay').classList.add('cd-open');
    el('cart-drawer').classList.add('cd-open');
    document.body.style.overflow = 'hidden';
    refresh();
  }

  function close() {
    el('cart-drawer-overlay').classList.remove('cd-open');
    el('cart-drawer').classList.remove('cd-open');
    document.body.style.overflow = '';
  }

  // ── Fetch & render ────────────────────────────────────────

  async function refresh() {
    var loadEl = el('cd-loading');
    if (loadEl) loadEl.style.display = 'flex';

    try {
      var res  = await fetch('/cart.js');
      var cart = await res.json();
      render(cart);
      updateBadge(cart.item_count);
    } catch (e) {
      console.error('[CartDrawer] fetch error', e);
    } finally {
      if (loadEl) loadEl.style.display = 'none';
    }
  }

  function render(cart) {
    var titleEl    = el('cd-title');
    var subtotalEl = el('cd-subtotal');
    var listEl     = el('cd-items-list');
    var emptyEl    = el('cd-empty');

    var count = cart.item_count;
    if (titleEl)    titleEl.textContent    = count === 1 ? '1 producto' : count + ' productos';
    if (subtotalEl) subtotalEl.textContent = money(cart.total_price);

    updateProgress(cart.total_price);

    if (cart.items.length === 0) {
      if (listEl) listEl.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'flex';
      hideUpsell();
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    if (listEl)  listEl.innerHTML = cart.items.map(renderItem).join('');

    var last           = cart.items[cart.items.length - 1];
    var cartProductIds = cart.items.map(function (i) { return i.product_id; });
    loadUpsell(last.product_id, cartProductIds);
  }

  function renderItem(item) {
    var img = item.image
      ? '<img src="' + esc(item.image) + '" alt="' + esc(item.title) + '" loading="lazy">'
      : '';

    var variantLine = (item.variant_title && item.variant_title !== 'Default Title')
      ? '<p class="cd-item-variant">' + esc(item.variant_title) + '</p>'
      : '';

    return [
      '<div class="cd-item">',
        '<a href="' + item.url + '" class="cd-item-img">' + img + '</a>',
        '<div class="cd-item-info">',
          '<a href="' + item.url + '" class="cd-item-title">' + esc(item.product_title) + '</a>',
          variantLine,
          '<p class="cd-item-price">' + money(item.final_line_price) + '</p>',
          '<div class="cd-qty-wrap">',
            '<button type="button" class="cd-qty-btn"',
              ' onclick="CartDrawer.updateQty(\'' + item.key + '\',' + (item.quantity - 1) + ')"',
              ' aria-label="Reducir cantidad">',
              '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">',
                '<line x1="5" y1="12" x2="19" y2="12"/>',
              '</svg>',
            '</button>',
            '<span class="cd-qty-num">' + item.quantity + '</span>',
            '<button type="button" class="cd-qty-btn"',
              ' onclick="CartDrawer.updateQty(\'' + item.key + '\',' + (item.quantity + 1) + ')"',
              ' aria-label="Aumentar cantidad">',
              '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">',
                '<line x1="12" y1="5" x2="12" y2="19"/>',
                '<line x1="5" y1="12" x2="19" y2="12"/>',
              '</svg>',
            '</button>',
          '</div>',
        '</div>',
        '<button type="button" class="cd-remove-btn"',
          ' onclick="CartDrawer.removeItem(\'' + item.key + '\')"',
          ' aria-label="Eliminar del carrito">',
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"',
               ' stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">',
            '<polyline points="3 6 5 6 21 6"/>',
            '<path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>',
            '<path d="M10 11v6M14 11v6"/>',
            '<path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>',
          '</svg>',
        '</button>',
      '</div>',
      '<div class="cd-divider"></div>'
    ].join('');
  }

  // ── Progress Bar ──────────────────────────────────────────

  function updateProgress(totalCents) {
    var minC       = window.CART_MIN_CENTS  || 1500;
    var freeC      = window.CART_FREE_CENTS || 3500;
    var fill       = el('cd-progress-fill');
    var markerMin  = el('cd-marker-min');
    var markerFree = el('cd-marker-free');

    if (!fill) return;

    fill.style.width = Math.min((totalCents / freeC) * 100, 100) + '%';

    function toggle(markerEl, reached) {
      if (!markerEl) return;
      markerEl.classList.toggle('active', reached);
    }

    toggle(markerMin,  totalCents >= minC);
    toggle(markerFree, totalCents >= freeC);
  }

  // ── Cart mutations ────────────────────────────────────────

  async function updateQty(key, qty) {
    if (qty < 0) return;
    try {
      var res  = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: qty })
      });
      var cart = await res.json();
      render(cart);
      updateBadge(cart.item_count);
    } catch (e) {
      console.error('[CartDrawer] updateQty error', e);
    }
  }

  function removeItem(key) { updateQty(key, 0); }

  // ── Upsell ────────────────────────────────────────────────

  async function loadUpsell(productId, cartProductIds) {
    if (!productId) { hideUpsell(); return; }
    try {
      var res  = await fetch('/recommendations/products.json?product_id=' + productId + '&limit=5');
      var data = await res.json();
      var recs = (data.products || []).filter(function (p) {
        return !cartProductIds.includes(p.id) && p.available;
      });

      if (!recs.length) { hideUpsell(); return; }

      var prod    = recs[0];
      var variant = prod.variants[0];
      upsellVariantId = variant.id;

      var imgEl = el('cd-upsell-img');
      if (imgEl) imgEl.src = prod.featured_image || '';

      var titleEl = el('cd-upsell-title');
      if (titleEl) titleEl.textContent = prod.title;

      var priceEl = el('cd-upsell-price');
      if (priceEl) {
        var raw = variant.price;
        // La API puede devolver price como string "38.99" o como entero en centavos
        var cents = typeof raw === 'string'
          ? Math.round(parseFloat(raw) * 100)
          : raw;
        priceEl.textContent = money(cents);
      }

      var upsellEl = el('cd-upsell');
      if (upsellEl) upsellEl.classList.add('visible');
    } catch (e) {
      hideUpsell();
    }
  }

  function hideUpsell() {
    var upsellEl = el('cd-upsell');
    if (upsellEl) upsellEl.classList.remove('visible');
    upsellVariantId = null;
  }

  async function addUpsell() {
    if (!upsellVariantId) return;
    try {
      var res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: upsellVariantId, quantity: 1 })
      });
      if (res.ok) await refresh();
    } catch (e) {
      console.error('[CartDrawer] addUpsell error', e);
    }
  }

  // ── Badge ─────────────────────────────────────────────────

  function updateBadge(count) {
    document.querySelectorAll('[data-cart-count]').forEach(function (badge) {
      badge.textContent = count > 0 ? count : '';
      badge.classList.toggle('badge-visible', count > 0);
    });
  }

  // ── Init ─────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {

    var overlay = el('cart-drawer-overlay');
    if (overlay) overlay.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    // Interceptar add-to-cart
    document.addEventListener('submit', async function (e) {
      var form   = e.target;
      var action = form.getAttribute('action') || '';
      if (!action.includes('/cart/add')) return;

      e.preventDefault();
      var formData = new FormData(form);

      try {
        var res = await fetch('/cart/add.js', { method: 'POST', body: formData });
        if (res.ok) open();
        else form.submit();
      } catch (err) {
        form.submit();
      }
    });

    // Badge inicial
    fetch('/cart.js')
      .then(function (r) { return r.json(); })
      .then(function (c) { updateBadge(c.item_count); })
      .catch(function () {});
  });

  // ── API pública ───────────────────────────────────────────
  window.CartDrawer = {
    open:       open,
    close:      close,
    refresh:    refresh,
    updateQty:  updateQty,
    removeItem: removeItem,
    addUpsell:  addUpsell
  };

  window.openCartDrawer  = open;
  window.closeCartDrawer = close;

})();
