import { openBlock as m, createElementBlock as c, normalizeClass as _, withModifiers as l, createElementVNode as p, mergeProps as I, renderSlot as v, normalizeStyle as w, createCommentVNode as E, Fragment as P, renderList as T } from "vue";
var N = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function S(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var y = { exports: {} };
(function(t, e) {
  (function(i, a) {
    t.exports = a();
  })(N, function() {
    function i(a, n, s, r, o, u) {
      if (!/^[1-8]$/.test(n))
        throw new Error("orientation should be [1-8]");
      s == null && (s = 0), r == null && (r = 0), o == null && (o = a.width), u == null && (u = a.height);
      var d = document.createElement("canvas"), g = d.getContext("2d");
      switch (d.width = o, d.height = u, g.save(), +n) {
        case 1:
          break;
        case 2:
          g.translate(o, 0), g.scale(-1, 1);
          break;
        case 3:
          g.translate(o, u), g.rotate(180 / 180 * Math.PI);
          break;
        case 4:
          g.translate(0, u), g.scale(1, -1);
          break;
        case 5:
          d.width = u, d.height = o, g.rotate(90 / 180 * Math.PI), g.scale(1, -1);
          break;
        case 6:
          d.width = u, d.height = o, g.rotate(90 / 180 * Math.PI), g.translate(0, -u);
          break;
        case 7:
          d.width = u, d.height = o, g.rotate(270 / 180 * Math.PI), g.translate(-o, u), g.scale(1, -1);
          break;
        case 8:
          d.width = u, d.height = o, g.translate(0, o), g.rotate(270 / 180 * Math.PI);
          break;
      }
      return g.drawImage(a, s, r, o, u), g.restore(), d;
    }
    return {
      drawImage: i
    };
  });
})(y);
var M = y.exports;
const O = /* @__PURE__ */ S(M), h = {
  onePointCoord(t, e) {
    let { canvas: i, quality: a } = e, n = i.getBoundingClientRect(), s = t.clientX, r = t.clientY;
    return {
      x: (s - n.left) * a,
      y: (r - n.top) * a
    };
  },
  getPointerCoords(t, e) {
    let i;
    return t.touches && t.touches[0] ? i = t.touches[0] : t.changedTouches && t.changedTouches[0] ? i = t.changedTouches[0] : i = t, this.onePointCoord(i, e);
  },
  getPinchDistance(t, e) {
    let i = t.touches[0], a = t.touches[1], n = this.onePointCoord(i, e), s = this.onePointCoord(a, e);
    return Math.sqrt(Math.pow(n.x - s.x, 2) + Math.pow(n.y - s.y, 2));
  },
  getPinchCenterCoord(t, e) {
    let i = t.touches[0], a = t.touches[1], n = this.onePointCoord(i, e), s = this.onePointCoord(a, e);
    return {
      x: (n.x + s.x) / 2,
      y: (n.y + s.y) / 2
    };
  },
  imageLoaded(t) {
    return t.complete && t.naturalWidth !== 0;
  },
  rAFPolyfill() {
    if (!(typeof document > "u" || typeof window > "u")) {
      for (var t = 0, e = ["webkit", "moz"], i = 0; i < e.length && !window.requestAnimationFrame; ++i)
        window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || // Webkit中此取消方法的名字变了
        window[e[i] + "CancelRequestAnimationFrame"];
      window.requestAnimationFrame || (window.requestAnimationFrame = function(a) {
        var n = (/* @__PURE__ */ new Date()).getTime(), s = Math.max(0, 16.7 - (n - t)), r = window.setTimeout(function() {
          var o = n + s;
          a(o);
        }, s);
        return t = n + s, r;
      }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
        clearTimeout(a);
      }), Array.isArray = function(a) {
        return Object.prototype.toString.call(a) === "[object Array]";
      };
    }
  },
  toBlobPolyfill() {
    if (!(typeof document > "u" || typeof window > "u" || !HTMLCanvasElement)) {
      var t, e, i;
      HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
        value: function(a, n, s) {
          t = atob(this.toDataURL(n, s).split(",")[1]), e = t.length, i = new Uint8Array(e);
          for (var r = 0; r < e; r++)
            i[r] = t.charCodeAt(r);
          a(new Blob([i], { type: n || "image/png" }));
        }
      });
    }
  },
  eventHasFile(t) {
    var e = t.dataTransfer || t.originalEvent.dataTransfer;
    if (e.types) {
      for (var i = 0, a = e.types.length; i < a; i++)
        if (e.types[i] == "Files")
          return !0;
    }
    return !1;
  },
  getFileOrientation(t) {
    var e = new DataView(t);
    if (e.getUint16(0, !1) != 65496)
      return -2;
    for (var i = e.byteLength, a = 2; a < i; ) {
      var n = e.getUint16(a, !1);
      if (a += 2, n == 65505) {
        if (e.getUint32(a += 2, !1) != 1165519206)
          return -1;
        var s = e.getUint16(a += 6, !1) == 18761;
        a += e.getUint32(a + 4, s);
        var r = e.getUint16(a, s);
        a += 2;
        for (var o = 0; o < r; o++)
          if (e.getUint16(a + o * 12, s) == 274)
            return e.getUint16(a + o * 12 + 8, s);
      } else {
        if ((n & 65280) != 65280)
          break;
        a += e.getUint16(a, !1);
      }
    }
    return -1;
  },
  parseDataUrl(t) {
    return /^data:([^;]+)?(;base64)?,(.*)/gmi.exec(t)[3];
  },
  base64ToArrayBuffer(t) {
    for (var e = atob(t), i = e.length, a = new Uint8Array(i), n = 0; n < i; n++)
      a[n] = e.charCodeAt(n);
    return a.buffer;
  },
  getRotatedImage(t, e) {
    var i = O.drawImage(t, e), a = new Image();
    return a.src = i.toDataURL(), a;
  },
  flipX(t) {
    return t % 2 == 0 ? t - 1 : t + 1;
  },
  flipY(t) {
    return {
      1: 4,
      4: 1,
      2: 3,
      3: 2,
      5: 8,
      8: 5,
      6: 7,
      7: 6
    }[t];
  },
  rotate90(t) {
    return {
      1: 6,
      2: 7,
      3: 8,
      4: 5,
      5: 2,
      6: 3,
      7: 4,
      8: 1
    }[t];
  },
  numberValid(t) {
    return typeof t == "number" && !isNaN(t);
  }
};
Number.isInteger = Number.isInteger || function(t) {
  return typeof t == "number" && isFinite(t) && Math.floor(t) === t;
};
var C = String;
typeof window < "u" && window.Image && (C = [String, Image]);
const F = {
  value: Object,
  width: {
    type: Number,
    default: 200,
    validator: function(t) {
      return t > 0;
    }
  },
  height: {
    type: Number,
    default: 200,
    validator: function(t) {
      return t > 0;
    }
  },
  placeholder: {
    type: String,
    default: "Choose an image"
  },
  placeholderColor: {
    default: "#606060"
  },
  placeholderFontSize: {
    type: Number,
    default: 0,
    validator: function(t) {
      return t >= 0;
    }
  },
  canvasColor: {
    default: "transparent"
  },
  quality: {
    type: Number,
    default: 2,
    validator: function(t) {
      return t > 0;
    }
  },
  zoomSpeed: {
    default: 3,
    type: Number,
    validator: function(t) {
      return t > 0;
    }
  },
  accept: String,
  fileSizeLimit: {
    type: Number,
    default: 0,
    validator: function(t) {
      return t >= 0;
    }
  },
  disabled: Boolean,
  disableDragAndDrop: Boolean,
  disableClickToChoose: Boolean,
  disableDragToMove: Boolean,
  disableScrollToZoom: Boolean,
  disablePinchToZoom: Boolean,
  disableRotation: Boolean,
  reverseScrollToZoom: Boolean,
  preventWhiteSpace: Boolean,
  showRemoveButton: {
    type: Boolean,
    default: !0
  },
  removeButtonColor: {
    type: String,
    default: "red"
  },
  removeButtonSize: {
    type: Number
  },
  initialImage: C,
  initialSize: {
    type: String,
    default: "cover",
    validator: function(t) {
      return t === "cover" || t === "contain" || t === "natural";
    }
  },
  initialPosition: {
    type: String,
    default: "center",
    validator: function(t) {
      var e = ["center", "top", "bottom", "left", "right"];
      return t.split(" ").every((i) => e.indexOf(i) >= 0) || /^-?\d+% -?\d+%$/.test(t);
    }
  },
  inputAttrs: Object,
  showLoading: Boolean,
  loadingSize: {
    type: Number,
    default: 20
  },
  loadingColor: {
    type: String,
    default: "#606060"
  },
  replaceDrop: Boolean,
  passive: Boolean,
  imageBorderRadius: {
    type: [Number, String],
    default: 0
  },
  autoSizing: Boolean,
  videoEnabled: Boolean
}, f = {
  INIT_EVENT: "init",
  FILE_CHOOSE_EVENT: "file-choose",
  FILE_SIZE_EXCEED_EVENT: "file-size-exceed",
  FILE_TYPE_MISMATCH_EVENT: "file-type-mismatch",
  NEW_IMAGE_EVENT: "new-image",
  NEW_IMAGE_DRAWN_EVENT: "new-image-drawn",
  IMAGE_REMOVE_EVENT: "image-remove",
  MOVE_EVENT: "move",
  ZOOM_EVENT: "zoom",
  DRAW_EVENT: "draw",
  INITIAL_IMAGE_LOADED_EVENT: "initial-image-loaded",
  LOADING_START_EVENT: "loading-start",
  LOADING_END_EVENT: "loading-end"
};
const z = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [a, n] of e)
    i[a] = n;
  return i;
}, A = 1 / 1e5, W = 500, R = 100, x = 10, L = 2 / 3, k = 1, H = ["imgData", "img", "imgSet", "originalImage", "naturalHeight", "naturalWidth", "orientation", "scaleRatio"], V = {
  model: {
    prop: "value",
    event: f.INIT_EVENT
  },
  props: F,
  data() {
    return {
      canvas: null,
      ctx: null,
      originalImage: null,
      img: null,
      video: null,
      dragging: !1,
      lastMovingCoord: null,
      imgData: {
        width: 0,
        height: 0,
        startX: 0,
        startY: 0
      },
      fileDraggedOver: !1,
      tabStart: 0,
      scrolling: !1,
      pinching: !1,
      rotating: !1,
      pinchDistance: 0,
      supportTouch: !1,
      pointerMoved: !1,
      pointerStartCoord: null,
      naturalWidth: 0,
      naturalHeight: 0,
      scaleRatio: null,
      orientation: 1,
      userMetadata: null,
      imageSet: !1,
      currentPointerCoord: null,
      currentIsInitial: !1,
      loading: !1,
      realWidth: 0,
      // only for when autoSizing is on
      realHeight: 0,
      // only for when autoSizing is on
      chosenFile: null,
      useAutoSizing: !1
    };
  },
  computed: {
    outputWidth() {
      return (this.useAutoSizing ? this.realWidth : this.width) * this.quality;
    },
    outputHeight() {
      return (this.useAutoSizing ? this.realHeight : this.height) * this.quality;
    },
    computedPlaceholderFontSize() {
      return this.placeholderFontSize * this.quality;
    },
    aspectRatio() {
      return this.naturalWidth / this.naturalHeight;
    },
    loadingStyle() {
      return {
        width: this.loadingSize + "px",
        height: this.loadingSize + "px",
        right: "15px",
        bottom: "10px"
      };
    }
  },
  mounted() {
    this._initialize(), h.rAFPolyfill(), h.toBlobPolyfill(), this.supportDetection().basic || console.warn("Your browser does not support vue-croppa functionality."), this.passive && this.$watch("value._data", (e) => {
      let i = !1;
      if (e) {
        for (let a in e)
          if (H.indexOf(a) >= 0) {
            let n = e[a];
            n !== this[a] && (this.$set(this, a, n), i = !0);
          }
        i && (this.img ? this.$nextTick(() => {
          this._draw();
        }) : this.remove());
      }
    }, {
      deep: !0
    }), this.useAutoSizing = !!(this.autoSizing && this.$refs.wrapper && getComputedStyle), this.useAutoSizing && this._autoSizingInit();
  },
  beforeDestroy() {
    this.useAutoSizing && this._autoSizingRemove();
  },
  watch: {
    outputWidth: function() {
      this.onDimensionChange();
    },
    outputHeight: function() {
      this.onDimensionChange();
    },
    canvasColor: function() {
      this.img ? this._draw() : this._setPlaceholders();
    },
    imageBorderRadius: function() {
      this.img && this._draw();
    },
    placeholder: function() {
      this.img || this._setPlaceholders();
    },
    placeholderColor: function() {
      this.img || this._setPlaceholders();
    },
    computedPlaceholderFontSize: function() {
      this.img || this._setPlaceholders();
    },
    preventWhiteSpace(t) {
      t && (this.imageSet = !1), this._placeImage();
    },
    scaleRatio(t, e) {
      if (!this.passive && this.img && h.numberValid(t)) {
        var i = 1;
        h.numberValid(e) && e !== 0 && (i = t / e);
        var a = this.currentPointerCoord || {
          x: this.imgData.startX + this.imgData.width / 2,
          y: this.imgData.startY + this.imgData.height / 2
        };
        if (this.imgData.width = this.naturalWidth * t, this.imgData.height = this.naturalHeight * t, !this.userMetadata && this.imageSet && !this.rotating) {
          let n = (i - 1) * (a.x - this.imgData.startX), s = (i - 1) * (a.y - this.imgData.startY);
          this.imgData.startX = this.imgData.startX - n, this.imgData.startY = this.imgData.startY - s;
        }
        this.preventWhiteSpace && (this._preventZoomingToWhiteSpace(), this._preventMovingToWhiteSpace());
      }
    },
    "imgData.width": function(t, e) {
      h.numberValid(t) && (this.scaleRatio = t / this.naturalWidth, this.hasImage() && Math.abs(t - e) > t * (1 / 1e5) && (this.emitEvent(f.ZOOM_EVENT), this._draw()));
    },
    "imgData.height": function(t) {
      h.numberValid(t) && (this.scaleRatio = t / this.naturalHeight);
    },
    "imgData.startX": function(t) {
      this.hasImage() && this.$nextTick(this._draw);
    },
    "imgData.startY": function(t) {
      this.hasImage() && this.$nextTick(this._draw);
    },
    loading(t) {
      this.passive || (t ? this.emitEvent(f.LOADING_START_EVENT) : this.emitEvent(f.LOADING_END_EVENT));
    },
    autoSizing(t) {
      this.useAutoSizing = !!(this.autoSizing && this.$refs.wrapper && getComputedStyle), t ? this._autoSizingInit() : this._autoSizingRemove();
    }
  },
  methods: {
    emitEvent(...t) {
      this.$emit(...t);
    },
    getCanvas() {
      return this.canvas;
    },
    getContext() {
      return this.ctx;
    },
    getChosenFile() {
      return this.chosenFile || this.$refs.fileInput.files[0];
    },
    move(t) {
      if (!t || this.passive)
        return;
      let e = this.imgData.startX, i = this.imgData.startY;
      this.imgData.startX += t.x, this.imgData.startY += t.y, this.preventWhiteSpace && this._preventMovingToWhiteSpace(), (this.imgData.startX !== e || this.imgData.startY !== i) && (this.emitEvent(f.MOVE_EVENT), this._draw());
    },
    moveUpwards(t = 1) {
      this.move({ x: 0, y: -t });
    },
    moveDownwards(t = 1) {
      this.move({ x: 0, y: t });
    },
    moveLeftwards(t = 1) {
      this.move({ x: -t, y: 0 });
    },
    moveRightwards(t = 1) {
      this.move({ x: t, y: 0 });
    },
    zoom(t = !0, e = 1) {
      if (this.passive)
        return;
      let i = this.zoomSpeed * e, a = this.outputWidth * A * i, n = 1;
      t ? n = 1 + a : this.imgData.width > x && (n = 1 - a), this.scaleRatio *= n;
    },
    zoomIn() {
      this.zoom(!0);
    },
    zoomOut() {
      this.zoom(!1);
    },
    rotate(t = 1) {
      this.disableRotation || this.disabled || this.passive || (t = parseInt(t), (isNaN(t) || t > 3 || t < -3) && (console.warn("Invalid argument for rotate() method. It should one of the integers from -3 to 3."), t = 1), this._rotateByStep(t));
    },
    flipX() {
      this.disableRotation || this.disabled || this.passive || this._setOrientation(2);
    },
    flipY() {
      this.disableRotation || this.disabled || this.passive || this._setOrientation(4);
    },
    refresh() {
      this.$nextTick(this._initialize);
    },
    hasImage() {
      return !!this.imageSet;
    },
    applyMetadata(t) {
      if (!(!t || this.passive)) {
        this.userMetadata = t;
        var e = t.orientation || this.orientation || 1;
        this._setOrientation(e, !0);
      }
    },
    generateDataUrl(t, e) {
      return this.hasImage() ? this.canvas.toDataURL(t, e) : "";
    },
    generateBlob(t, e, i) {
      if (!this.hasImage()) {
        t(null);
        return;
      }
      this.canvas.toBlob(t, e, i);
    },
    promisedBlob(...t) {
      if (typeof Promise > "u") {
        console.warn("No Promise support. Please add Promise polyfill if you want to use this method.");
        return;
      }
      return new Promise((e, i) => {
        try {
          this.generateBlob((a) => {
            e(a);
          }, ...t);
        } catch (a) {
          i(a);
        }
      });
    },
    getMetadata() {
      if (!this.hasImage())
        return {};
      let { startX: t, startY: e } = this.imgData;
      return {
        startX: t,
        startY: e,
        scale: this.scaleRatio,
        orientation: this.orientation
      };
    },
    supportDetection() {
      if (!(typeof window > "u")) {
        var t = document.createElement("div");
        return {
          basic: window.requestAnimationFrame && window.File && window.FileReader && window.FileList && window.Blob,
          dnd: "ondragstart" in t && "ondrop" in t
        };
      }
    },
    chooseFile() {
      this.passive || this.$refs.fileInput.click();
    },
    remove() {
      if (!this.imageSet)
        return;
      this._setPlaceholders();
      let t = this.img != null;
      this.originalImage = null, this.img = null, this.$refs.fileInput.value = "", this.imgData = {
        width: 0,
        height: 0,
        startX: 0,
        startY: 0
      }, this.orientation = 1, this.scaleRatio = null, this.userMetadata = null, this.imageSet = !1, this.chosenFile = null, this.video && (this.video.pause(), this.video = null), t && this.emitEvent(f.IMAGE_REMOVE_EVENT);
    },
    addClipPlugin(t) {
      if (this.clipPlugins || (this.clipPlugins = []), typeof t == "function" && this.clipPlugins.indexOf(t) < 0)
        this.clipPlugins.push(t);
      else
        throw Error("Clip plugins should be functions");
    },
    emitNativeEvent(t) {
      this.emitEvent(t.type, t);
    },
    setFile(t) {
      this._onNewFileIn(t);
    },
    _setContainerSize() {
      this.useAutoSizing && (this.realWidth = +getComputedStyle(this.$refs.wrapper).width.slice(0, -2), this.realHeight = +getComputedStyle(this.$refs.wrapper).height.slice(0, -2));
    },
    _autoSizingInit() {
      this._setContainerSize(), window.addEventListener("resize", this._setContainerSize);
    },
    _autoSizingRemove() {
      this._setContainerSize(), window.removeEventListener("resize", this._setContainerSize);
    },
    _initialize() {
      this.canvas = this.$refs.canvas, this._setSize(), this.canvas.style.backgroundColor = !this.canvasColor || this.canvasColor == "default" ? "transparent" : typeof this.canvasColor == "string" ? this.canvasColor : "", this.ctx = this.canvas.getContext("2d"), this.ctx.imageSmoothingEnabled = !0, this.ctx.imageSmoothingQuality = "high", this.ctx.webkitImageSmoothingEnabled = !0, this.ctx.msImageSmoothingEnabled = !0, this.ctx.imageSmoothingEnabled = !0, this.originalImage = null, this.img = null, this.$refs.fileInput.value = "", this.imageSet = !1, this.chosenFile = null, this._setInitial(), this.passive || this.emitEvent(f.INIT_EVENT, this);
    },
    _setSize() {
      this.canvas.width = this.outputWidth, this.canvas.height = this.outputHeight, this.canvas.style.width = (this.useAutoSizing ? this.realWidth : this.width) + "px", this.canvas.style.height = (this.useAutoSizing ? this.realHeight : this.height) + "px";
    },
    _rotateByStep(t) {
      let e = 1;
      switch (t) {
        case 1:
          e = 6;
          break;
        case 2:
          e = 3;
          break;
        case 3:
          e = 8;
          break;
        case -1:
          e = 8;
          break;
        case -2:
          e = 3;
          break;
        case -3:
          e = 6;
          break;
      }
      this._setOrientation(e);
    },
    _setImagePlaceholder() {
      let t;
      if (this.$slots.placeholder && this.$slots.placeholder[0]) {
        let i = this.$slots.placeholder[0], { tag: a, elm: n } = i;
        a == "img" && n && (t = n);
      }
      if (t) {
        var e = () => {
          this.ctx.drawImage(t, 0, 0, this.outputWidth, this.outputHeight);
        };
        h.imageLoaded(t) ? e() : t.onload = e;
      }
    },
    _setTextPlaceholder() {
      var t = this.ctx;
      t.textBaseline = "middle", t.textAlign = "center";
      let e = this.outputWidth * L / this.placeholder.length, i = !this.computedPlaceholderFontSize || this.computedPlaceholderFontSize == 0 ? e : this.computedPlaceholderFontSize;
      t.font = i + "px sans-serif", t.fillStyle = !this.placeholderColor || this.placeholderColor == "default" ? "#606060" : this.placeholderColor, t.fillText(this.placeholder, this.outputWidth / 2, this.outputHeight / 2);
    },
    _setPlaceholders() {
      this._paintBackground(), this._setImagePlaceholder(), this._setTextPlaceholder();
    },
    _setInitial() {
      let t, e;
      if (this.$slots.initial && this.$slots.initial[0]) {
        let i = this.$slots.initial[0], { tag: a, elm: n } = i;
        a == "img" && n && (e = n);
      }
      if (this.initialImage && typeof this.initialImage == "string" ? (t = this.initialImage, e = new Image(), !/^data:/.test(t) && !/^blob:/.test(t) && e.setAttribute("crossOrigin", "anonymous"), e.src = t) : typeof this.initialImage == "object" && this.initialImage instanceof Image && (e = this.initialImage), !t && !e) {
        this._setPlaceholders();
        return;
      }
      this.currentIsInitial = !0, h.imageLoaded(e) ? this._onload(e, +e.dataset.exifOrientation, !0) : (this.loading = !0, e.onload = () => {
        this._onload(e, +e.dataset.exifOrientation, !0);
      }, e.onerror = () => {
        this._setPlaceholders();
      });
    },
    _onload(t, e = 1, i) {
      this.imageSet && this.remove(), this.originalImage = t, this.img = t, isNaN(e) && (e = 1), this._setOrientation(e), i && this.emitEvent(f.INITIAL_IMAGE_LOADED_EVENT);
    },
    _onVideoLoad(t, e) {
      this.video = t;
      const i = document.createElement("canvas"), { videoWidth: a, videoHeight: n } = t;
      i.width = a, i.height = n;
      const s = i.getContext("2d");
      this.loading = !1;
      const r = (u) => {
        if (!this.video)
          return;
        s.drawImage(this.video, 0, 0, a, n);
        const d = new Image();
        d.src = i.toDataURL(), d.onload = () => {
          this.img = d, u ? this._placeImage() : this._draw();
        };
      };
      r(!0);
      const o = () => {
        this.$nextTick(() => {
          r(), !(!this.video || this.video.ended || this.video.paused) && requestAnimationFrame(o);
        });
      };
      this.video.addEventListener("play", () => {
        requestAnimationFrame(o);
      });
    },
    _handleClick(t) {
      this.emitNativeEvent(t), !this.hasImage() && !this.disableClickToChoose && !this.disabled && !this.supportTouch && !this.passive && this.chooseFile();
    },
    _handleDblClick(t) {
      if (this.emitNativeEvent(t), this.videoEnabled && this.video) {
        this.video.paused || this.video.ended ? this.video.play() : this.video.pause();
        return;
      }
    },
    _handleInputChange() {
      let t = this.$refs.fileInput;
      if (!t.files.length || this.passive)
        return;
      let e = t.files[0];
      this._onNewFileIn(e);
    },
    _onNewFileIn(t) {
      if (this.currentIsInitial = !1, this.loading = !0, this.emitEvent(f.FILE_CHOOSE_EVENT, t), this.chosenFile = t, !this._fileSizeIsValid(t))
        return this.loading = !1, this.emitEvent(f.FILE_SIZE_EXCEED_EVENT, t), !1;
      if (!this._fileTypeIsValid(t))
        return this.loading = !1, this.emitEvent(f.FILE_TYPE_MISMATCH_EVENT, t), t.type || t.name.toLowerCase().split(".").pop(), !1;
      if (typeof window < "u" && typeof window.FileReader < "u") {
        let e = new FileReader();
        e.onload = (i) => {
          let a = i.target.result;
          const n = h.parseDataUrl(a);
          if (/^video/.test(t.type)) {
            let r = document.createElement("video");
            r.src = a, a = null, r.readyState >= r.HAVE_FUTURE_DATA ? this._onVideoLoad(r) : r.addEventListener("canplay", () => {
              console.log("can play event"), this._onVideoLoad(r);
            }, !1);
          } else {
            let r = 1;
            try {
              r = h.getFileOrientation(h.base64ToArrayBuffer(n));
            } catch {
            }
            r < 1 && (r = 1);
            let o = new Image();
            o.src = a, a = null, o.onload = () => {
              this._onload(o, r), this.emitEvent(f.NEW_IMAGE_EVENT);
            };
          }
        }, e.readAsDataURL(t);
      }
    },
    _fileSizeIsValid(t) {
      return t ? !this.fileSizeLimit || this.fileSizeLimit == 0 ? !0 : t.size < this.fileSizeLimit : !1;
    },
    _fileTypeIsValid(t) {
      if (!(this.videoEnabled && /^video/.test(t.type) && document.createElement("video").canPlayType(t.type) || /^image/.test(t.type)))
        return !1;
      if (!this.accept)
        return !0;
      let i = this.accept, a = i.replace(/\/.*$/, ""), n = i.split(",");
      for (let r = 0, o = n.length; r < o; r++) {
        let u = n[r], d = u.trim();
        if (d.charAt(0) == ".") {
          if (t.name.toLowerCase().split(".").pop() === d.toLowerCase().slice(1))
            return !0;
        } else if (/\/\*$/.test(d)) {
          var s = t.type.replace(/\/.*$/, "");
          if (s === a)
            return !0;
        } else if (t.type === u)
          return !0;
      }
      return !1;
    },
    _placeImage(t) {
      if (this.img) {
        var e = this.imgData;
        if (this.naturalWidth = this.img.naturalWidth, this.naturalHeight = this.img.naturalHeight, e.startX = h.numberValid(e.startX) ? e.startX : 0, e.startY = h.numberValid(e.startY) ? e.startY : 0, this.preventWhiteSpace ? this._aspectFill() : this.imageSet ? (this.imgData.width = this.naturalWidth * this.scaleRatio, this.imgData.height = this.naturalHeight * this.scaleRatio) : this.initialSize == "contain" ? this._aspectFit() : this.initialSize == "natural" ? this._naturalSize() : this._aspectFill(), !this.imageSet && (/top/.test(this.initialPosition) ? e.startY = 0 : /bottom/.test(this.initialPosition) && (e.startY = this.outputHeight - e.height), /left/.test(this.initialPosition) ? e.startX = 0 : /right/.test(this.initialPosition) && (e.startX = this.outputWidth - e.width), /^-?\d+% -?\d+%$/.test(this.initialPosition))) {
          var i = /^(-?\d+)% (-?\d+)%$/.exec(this.initialPosition), a = +i[1] / 100, n = +i[2] / 100;
          e.startX = a * (this.outputWidth - e.width), e.startY = n * (this.outputHeight - e.height);
        }
        t && this._applyMetadata(), t && this.preventWhiteSpace ? this.zoom(!1, 0) : (this.move({ x: 0, y: 0 }), this._draw());
      }
    },
    _aspectFill() {
      let t = this.naturalWidth, e = this.naturalHeight, i = this.outputWidth / this.outputHeight, a;
      this.aspectRatio > i ? (a = e / this.outputHeight, this.imgData.width = t / a, this.imgData.height = this.outputHeight, this.imgData.startX = -(this.imgData.width - this.outputWidth) / 2, this.imgData.startY = 0) : (a = t / this.outputWidth, this.imgData.height = e / a, this.imgData.width = this.outputWidth, this.imgData.startY = -(this.imgData.height - this.outputHeight) / 2, this.imgData.startX = 0);
    },
    _aspectFit() {
      let t = this.naturalWidth, e = this.naturalHeight, i = this.outputWidth / this.outputHeight, a;
      this.aspectRatio > i ? (a = t / this.outputWidth, this.imgData.height = e / a, this.imgData.width = this.outputWidth, this.imgData.startY = -(this.imgData.height - this.outputHeight) / 2, this.imgData.startX = 0) : (a = e / this.outputHeight, this.imgData.width = t / a, this.imgData.height = this.outputHeight, this.imgData.startX = -(this.imgData.width - this.outputWidth) / 2, this.imgData.startY = 0);
    },
    _naturalSize() {
      let t = this.naturalWidth, e = this.naturalHeight;
      this.imgData.width = t, this.imgData.height = e, this.imgData.startX = -(this.imgData.width - this.outputWidth) / 2, this.imgData.startY = -(this.imgData.height - this.outputHeight) / 2;
    },
    _handlePointerStart(t) {
      if (this.emitNativeEvent(t), this.passive)
        return;
      this.supportTouch = !0, this.pointerMoved = !1;
      let e = h.getPointerCoords(t, this);
      if (this.pointerStartCoord = e, this.disabled)
        return;
      if (!this.hasImage() && !this.disableClickToChoose) {
        this.tabStart = (/* @__PURE__ */ new Date()).valueOf();
        return;
      }
      if (t.which && t.which > 1)
        return;
      if (!t.touches || t.touches.length === 1) {
        this.dragging = !0, this.pinching = !1;
        let a = h.getPointerCoords(t, this);
        this.lastMovingCoord = a;
      }
      t.touches && t.touches.length === 2 && !this.disablePinchToZoom && (this.dragging = !1, this.pinching = !0, this.pinchDistance = h.getPinchDistance(t, this));
      let i = ["mouseup", "touchend", "touchcancel", "pointerend", "pointercancel"];
      for (let a = 0, n = i.length; a < n; a++) {
        let s = i[a];
        document.addEventListener(s, this._handlePointerEnd);
      }
    },
    _handlePointerEnd(t) {
      if (this.emitNativeEvent(t), this.passive)
        return;
      let e = 0;
      if (this.pointerStartCoord) {
        let i = h.getPointerCoords(t, this);
        e = Math.sqrt(Math.pow(i.x - this.pointerStartCoord.x, 2) + Math.pow(i.y - this.pointerStartCoord.y, 2)) || 0;
      }
      if (!this.disabled) {
        if (!this.hasImage() && !this.disableClickToChoose) {
          let i = (/* @__PURE__ */ new Date()).valueOf();
          e < R && i - this.tabStart < W && this.supportTouch && this.chooseFile(), this.tabStart = 0;
          return;
        }
        this.dragging = !1, this.pinching = !1, this.pinchDistance = 0, this.lastMovingCoord = null, this.pointerMoved = !1, this.pointerStartCoord = null;
      }
    },
    _handlePointerMove(t) {
      if (this.emitNativeEvent(t), this.passive || (this.pointerMoved = !0, !this.hasImage()))
        return;
      let e = h.getPointerCoords(t, this);
      if (this.currentPointerCoord = e, !(this.disabled || this.disableDragToMove)) {
        if (t.preventDefault(), !t.touches || t.touches.length === 1) {
          if (!this.dragging)
            return;
          this.lastMovingCoord && this.move({
            x: e.x - this.lastMovingCoord.x,
            y: e.y - this.lastMovingCoord.y
          }), this.lastMovingCoord = e;
        }
        if (t.touches && t.touches.length === 2 && !this.disablePinchToZoom) {
          if (!this.pinching)
            return;
          let i = h.getPinchDistance(t, this), a = i - this.pinchDistance;
          this.zoom(a > 0, k), this.pinchDistance = i;
        }
      }
    },
    _handlePointerLeave(t) {
      this.emitNativeEvent(t), !this.passive && (this.currentPointerCoord = null);
    },
    _handleWheel(t) {
      this.emitNativeEvent(t), !this.passive && (this.disabled || this.disableScrollToZoom || !this.hasImage() || (t.preventDefault(), this.scrolling = !0, t.wheelDelta < 0 || t.deltaY > 0 || t.detail > 0 ? this.zoom(this.reverseScrollToZoom) : (t.wheelDelta > 0 || t.deltaY < 0 || t.detail < 0) && this.zoom(!this.reverseScrollToZoom), this.$nextTick(() => {
        this.scrolling = !1;
      })));
    },
    _handleDragEnter(t) {
      this.emitNativeEvent(t), !this.passive && (this.disabled || this.disableDragAndDrop || !h.eventHasFile(t) || this.hasImage() && !this.replaceDrop || (this.fileDraggedOver = !0));
    },
    _handleDragLeave(t) {
      this.emitNativeEvent(t), !this.passive && (!this.fileDraggedOver || !h.eventHasFile(t) || (this.fileDraggedOver = !1));
    },
    _handleDragOver(t) {
      this.emitNativeEvent(t);
    },
    _handleDrop(t) {
      if (this.emitNativeEvent(t), this.passive || !this.fileDraggedOver || !h.eventHasFile(t) || this.hasImage() && !this.replaceDrop)
        return;
      this.fileDraggedOver = !1;
      let e, i = t.dataTransfer;
      if (i) {
        if (i.items)
          for (var a = 0, n = i.items.length; a < n; a++) {
            let s = i.items[a];
            if (s.kind == "file") {
              e = s.getAsFile();
              break;
            }
          }
        else
          e = i.files[0];
        e && this._onNewFileIn(e);
      }
    },
    _preventMovingToWhiteSpace() {
      this.imgData.startX > 0 && (this.imgData.startX = 0), this.imgData.startY > 0 && (this.imgData.startY = 0), this.outputWidth - this.imgData.startX > this.imgData.width && (this.imgData.startX = -(this.imgData.width - this.outputWidth)), this.outputHeight - this.imgData.startY > this.imgData.height && (this.imgData.startY = -(this.imgData.height - this.outputHeight));
    },
    _preventZoomingToWhiteSpace() {
      this.imgData.width < this.outputWidth && (this.scaleRatio = this.outputWidth / this.naturalWidth), this.imgData.height < this.outputHeight && (this.scaleRatio = this.outputHeight / this.naturalHeight);
    },
    _setOrientation(t = 6, e) {
      var i = e;
      if (t > 1 || i) {
        if (!this.img)
          return;
        this.rotating = !0;
        var a = h.getRotatedImage(i ? this.originalImage : this.img, t);
        a.onload = () => {
          this.img = a, this._placeImage(e);
        };
      } else
        this._placeImage(e);
      t == 2 ? this.orientation = h.flipX(this.orientation) : t == 4 ? this.orientation = h.flipY(this.orientation) : t == 6 ? this.orientation = h.rotate90(this.orientation) : t == 3 ? this.orientation = h.rotate90(h.rotate90(this.orientation)) : t == 8 ? this.orientation = h.rotate90(h.rotate90(h.rotate90(this.orientation))) : this.orientation = t, i && (this.orientation = t);
    },
    _paintBackground() {
      let t = !this.canvasColor || this.canvasColor == "default" ? "transparent" : this.canvasColor;
      this.ctx.fillStyle = t, this.ctx.clearRect(0, 0, this.outputWidth, this.outputHeight), this.ctx.fillRect(0, 0, this.outputWidth, this.outputHeight);
    },
    _draw() {
      this.$nextTick(() => {
        typeof window < "u" && window.requestAnimationFrame ? requestAnimationFrame(this._drawFrame) : this._drawFrame();
      });
    },
    _drawFrame() {
      if (!this.img)
        return;
      this.loading = !1;
      let t = this.ctx, { startX: e, startY: i, width: a, height: n } = this.imgData;
      this._paintBackground(), t.drawImage(this.img, e, i, a, n), this.preventWhiteSpace && this._clip(this._createContainerClipPath), this.emitEvent(f.DRAW_EVENT, t), this.imageSet || (this.imageSet = !0, this.emitEvent(f.NEW_IMAGE_DRAWN_EVENT)), this.rotating = !1;
    },
    _clipPathFactory(t, e, i, a) {
      let n = this.ctx, s = typeof this.imageBorderRadius == "number" ? this.imageBorderRadius : isNaN(Number(this.imageBorderRadius)) ? 0 : Number(this.imageBorderRadius);
      n.beginPath(), n.moveTo(t + s, e), n.lineTo(t + i - s, e), n.quadraticCurveTo(t + i, e, t + i, e + s), n.lineTo(t + i, e + a - s), n.quadraticCurveTo(t + i, e + a, t + i - s, e + a), n.lineTo(t + s, e + a), n.quadraticCurveTo(t, e + a, t, e + a - s), n.lineTo(t, e + s), n.quadraticCurveTo(t, e, t + s, e), n.closePath();
    },
    _createContainerClipPath() {
      this._clipPathFactory(0, 0, this.outputWidth, this.outputHeight), this.clipPlugins && this.clipPlugins.length && this.clipPlugins.forEach((t) => {
        t(this.ctx, 0, 0, this.outputWidth, this.outputHeight);
      });
    },
    // _createImageClipPath () {
    //   let { startX, startY, width, height } = this.imgData
    //   let w = width
    //   let h = height
    //   let x = startX
    //   let y = startY
    //   if (w < h) {
    //     h = this.outputHeight * (width / this.outputWidth)
    //   }
    //   if (h < w) {
    //     w = this.outputWidth * (height / this.outputHeight)
    //     x = startX + (width - this.outputWidth) / 2
    //   }
    //   this._clipPathFactory(x, startY, w, h)
    // },
    _clip(t) {
      let e = this.ctx;
      e.save(), e.fillStyle = "#fff", e.globalCompositeOperation = "destination-in", t(), e.fill(), e.restore();
    },
    _applyMetadata() {
      if (this.userMetadata) {
        var { startX: t, startY: e, scale: i } = this.userMetadata;
        h.numberValid(t) && (this.imgData.startX = t), h.numberValid(e) && (this.imgData.startY = e), h.numberValid(i) && (this.scaleRatio = i), this.$nextTick(() => {
          this.userMetadata = null;
        });
      }
    },
    onDimensionChange() {
      this.img ? (this.preventWhiteSpace && (this.imageSet = !1), this._setSize(), this._placeImage()) : this._initialize();
    }
  }
}, B = ["accept", "disabled"], Y = {
  class: "slots",
  style: { width: "0", height: "0", visibility: "hidden" }
}, X = ["width", "height"], j = ["fill"];
function U(t, e, i, a, n, s) {
  return m(), c("div", {
    ref: "wrapper",
    class: _(`croppa-container ${n.img ? "croppa--has-target" : ""} ${t.passive ? "croppa--passive" : ""} ${t.disabled ? "croppa--disabled" : ""} ${t.disableClickToChoose ? "croppa--disabled-cc" : ""} ${t.disableDragToMove && t.disableScrollToZoom ? "croppa--disabled-mz" : ""} ${n.fileDraggedOver ? "croppa--dropzone" : ""}`),
    onDragenter: e[19] || (e[19] = l((...r) => s._handleDragEnter && s._handleDragEnter(...r), ["stop", "prevent"])),
    onDragleave: e[20] || (e[20] = l((...r) => s._handleDragLeave && s._handleDragLeave(...r), ["stop", "prevent"])),
    onDragover: e[21] || (e[21] = l((...r) => s._handleDragOver && s._handleDragOver(...r), ["stop", "prevent"])),
    onDrop: e[22] || (e[22] = l((...r) => s._handleDrop && s._handleDrop(...r), ["stop", "prevent"]))
  }, [
    p("input", I({
      type: "file",
      accept: t.accept,
      disabled: t.disabled
    }, t.inputAttrs, {
      ref: "fileInput",
      onChange: e[0] || (e[0] = (...r) => s._handleInputChange && s._handleInputChange(...r)),
      style: { height: "1px", width: "1px", overflow: "hidden", "margin-left": "-99999px", position: "absolute" }
    }), null, 16, B),
    p("div", Y, [
      v(t.$slots, "initial"),
      v(t.$slots, "placeholder")
    ]),
    p("canvas", {
      ref: "canvas",
      onClick: e[1] || (e[1] = l((...r) => s._handleClick && s._handleClick(...r), ["stop", "prevent"])),
      onDblclick: e[2] || (e[2] = l((...r) => s._handleDblClick && s._handleDblClick(...r), ["stop", "prevent"])),
      onTouchstart: e[3] || (e[3] = l((...r) => s._handlePointerStart && s._handlePointerStart(...r), ["stop"])),
      onMousedown: e[4] || (e[4] = l((...r) => s._handlePointerStart && s._handlePointerStart(...r), ["stop", "prevent"])),
      onPointerstart: e[5] || (e[5] = l((...r) => s._handlePointerStart && s._handlePointerStart(...r), ["stop", "prevent"])),
      onTouchend: e[6] || (e[6] = l((...r) => s._handlePointerEnd && s._handlePointerEnd(...r), ["stop", "prevent"])),
      onTouchcancel: e[7] || (e[7] = l((...r) => s._handlePointerEnd && s._handlePointerEnd(...r), ["stop", "prevent"])),
      onMouseup: e[8] || (e[8] = l((...r) => s._handlePointerEnd && s._handlePointerEnd(...r), ["stop", "prevent"])),
      onPointerend: e[9] || (e[9] = l((...r) => s._handlePointerEnd && s._handlePointerEnd(...r), ["stop", "prevent"])),
      onPointercancel: e[10] || (e[10] = l((...r) => s._handlePointerEnd && s._handlePointerEnd(...r), ["stop", "prevent"])),
      onTouchmove: e[11] || (e[11] = l((...r) => s._handlePointerMove && s._handlePointerMove(...r), ["stop"])),
      onMousemove: e[12] || (e[12] = l((...r) => s._handlePointerMove && s._handlePointerMove(...r), ["stop", "prevent"])),
      onPointermove: e[13] || (e[13] = l((...r) => s._handlePointerMove && s._handlePointerMove(...r), ["stop", "prevent"])),
      onPointerleave: e[14] || (e[14] = l((...r) => s._handlePointerLeave && s._handlePointerLeave(...r), ["stop", "prevent"])),
      "on:DOMMouseScroll": e[15] || (e[15] = l((...r) => s._handleWheel && s._handleWheel(...r), ["stop"])),
      onWheel: e[16] || (e[16] = l((...r) => s._handleWheel && s._handleWheel(...r), ["stop"])),
      onMousewheel: e[17] || (e[17] = l((...r) => s._handleWheel && s._handleWheel(...r), ["stop"]))
    }, null, 544),
    t.showRemoveButton && n.img && !t.passive ? (m(), c("svg", {
      key: 0,
      class: "icon icon-remove",
      onClick: e[18] || (e[18] = (...r) => s.remove && s.remove(...r)),
      style: w(`top: -${t.height / 40}px; right: -${t.width / 40}px`),
      viewBox: "0 0 1024 1024",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      width: t.removeButtonSize || t.width / 10,
      height: t.removeButtonSize || t.width / 10
    }, [
      p("path", {
        d: "M511.921231 0C229.179077 0 0 229.257846 0 512 0 794.702769 229.179077 1024 511.921231 1024 794.781538 1024 1024 794.702769 1024 512 1024 229.257846 794.781538 0 511.921231 0ZM732.041846 650.633846 650.515692 732.081231C650.515692 732.081231 521.491692 593.683692 511.881846 593.683692 502.429538 593.683692 373.366154 732.081231 373.366154 732.081231L291.761231 650.633846C291.761231 650.633846 430.316308 523.500308 430.316308 512.196923 430.316308 500.696615 291.761231 373.523692 291.761231 373.523692L373.366154 291.918769C373.366154 291.918769 503.453538 430.395077 511.881846 430.395077 520.349538 430.395077 650.515692 291.918769 650.515692 291.918769L732.041846 373.523692C732.041846 373.523692 593.447385 502.547692 593.447385 512.196923 593.447385 521.412923 732.041846 650.633846 732.041846 650.633846Z",
        fill: t.removeButtonColor
      }, null, 8, j)
    ], 12, X)) : E("", !0),
    t.showLoading && n.loading ? (m(), c("div", {
      key: 1,
      class: "sk-fading-circle",
      style: w(s.loadingStyle)
    }, [
      (m(), c(P, null, T(12, (r) => p("div", {
        class: _(`sk-circle${r} sk-circle`),
        key: r
      }, [
        p("div", {
          class: "sk-circle-indicator",
          style: w({ backgroundColor: t.loadingColor })
        }, null, 4)
      ], 2)), 64))
    ], 4)) : E("", !0),
    v(t.$slots, "default")
  ], 34);
}
const b = /* @__PURE__ */ z(V, [["render", U]]);
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var D = Object.getOwnPropertySymbols, q = Object.prototype.hasOwnProperty, Z = Object.prototype.propertyIsEnumerable;
function G(t) {
  if (t == null)
    throw new TypeError("Object.assign cannot be called with null or undefined");
  return Object(t);
}
function K() {
  try {
    if (!Object.assign)
      return !1;
    var t = new String("abc");
    if (t[5] = "de", Object.getOwnPropertyNames(t)[0] === "5")
      return !1;
    for (var e = {}, i = 0; i < 10; i++)
      e["_" + String.fromCharCode(i)] = i;
    var a = Object.getOwnPropertyNames(e).map(function(s) {
      return e[s];
    });
    if (a.join("") !== "0123456789")
      return !1;
    var n = {};
    return "abcdefghijklmnopqrst".split("").forEach(function(s) {
      n[s] = s;
    }), Object.keys(Object.assign({}, n)).join("") === "abcdefghijklmnopqrst";
  } catch {
    return !1;
  }
}
var Q = K() ? Object.assign : function(t, e) {
  for (var i, a = G(t), n, s = 1; s < arguments.length; s++) {
    i = Object(arguments[s]);
    for (var r in i)
      q.call(i, r) && (a[r] = i[r]);
    if (D) {
      n = D(i);
      for (var o = 0; o < n.length; o++)
        Z.call(i, n[o]) && (a[n[o]] = i[n[o]]);
    }
  }
  return a;
};
const J = /* @__PURE__ */ S(Q), $ = {
  componentName: "croppa"
}, et = {
  install: function(t, e) {
    e = J({}, $, e);
    let i = Number(t.version.split(".")[0]);
    if (i < 2)
      throw new Error(`vue-croppa supports vue version 2.0 and above. You are using Vue@${i}. Please upgrade to the latest version of Vue.`);
    let a = e.componentName || "croppa";
    t.component(a, b);
  },
  component: b
};
export {
  et as default
};
