const myModule = (() => { "use strict"; let e = []; const t = ["C", "D", "H", "S"], r = ["A", "J", "Q", "K"]; let n = []; const l = document.querySelector("#btnRequest"), o = document.querySelector("#btnStop"), s = (document.querySelector("#btnNew"), document.querySelectorAll(".divCards")), c = document.querySelectorAll("small"), d = () => { e = []; for (let r = 2; r <= 10; r++)for (let n of t) e.push(r + n); for (let n of t) for (let t of r) e.push(t + n); return _.shuffle(e) }, a = () => { if (0 === e.length) throw "There are no cards in the deck"; return e.pop() }, i = (e, t) => (n[t] = n[t] + (e => { const t = e.substring(0, e.length - 1); return isNaN(t) ? "A" === t ? 11 : 10 : 1 * t })(e), c[t].innerText = n[t], n[t]), u = (e, t) => { const r = document.createElement("img"); r.src = `assets/cartas/${e}.png`, r.classList.add("card"), s[t].append(r) }, h = e => { let t = 0; do { const e = a(); t = i(e, n.length - 1), u(e, n.length - 1) } while (t < e && e <= 21); (() => { const [e, t] = n; setTimeout(() => { t === e ? alert("Nobody wins") : e > 21 ? alert("Computer Win") : t > 21 ? alert("Player Win") : alert("Computer Win") }, 100) })() }; return l.addEventListener("click", () => { const e = a(), t = i(e, 0); u(e, 0), t > 21 ? (l.disabled = !0, h(t)) : 21 === t && (l.disabled = !0, h(t)) }), o.addEventListener("click", () => { o.disabled = !0, l.disabled = !0, h(n[0]) }), { newGame: (t = 2) => { e = d(), n = []; for (let e = 0; e < t; e++)n.push(0); c.forEach(e => e.innerText = 0), s.forEach(e => e.innerText = ""), l.disabled = !1, o.disabled = !1 } } })();