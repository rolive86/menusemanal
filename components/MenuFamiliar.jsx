'use client'

import { useState } from "react";

const colors = {
  bg: "#FDFAF4",
  paper: "#FFFEF9",
  green: "#2D6A4F",
  greenLight: "#52B788",
  greenPale: "#D8F3DC",
  orange: "#E76F51",
  orangePale: "#FFE8E0",
  gold: "#E9C46A",
  goldPale: "#FFF3CD",
  text: "#1B2A1D",
  muted: "#6B7C6D",
  border: "#C8DEC9",
  p1: "#5E60CE",
  p1pale: "#EEF0FF",
  p2: "#E76F51",
  p2pale: "#FFF0EB",
};

const TAG = ({ color, bg, children }) => (
  <span style={{
    background: bg, color: color,
    borderRadius: 20, padding: "2px 10px",
    fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
    whiteSpace: "nowrap"
  }}>{children}</span>
);

const weekMenu = [
  {
    dia: "Lunes",
    emoji: "🥗",
    color: "#E8F5E9",
    desayuno: {
      base: "Tostadas integrales con queso crema + fruta (banana o manzana)",
      p1: "2 tostadas, porción pequeña de queso crema (1 cda), fruta entera",
      p2: "3 tostadas, queso crema generoso (2 cdas) + maní o almendras (1 puñado)",
      racional: "El desayuno actual es bueno. Solo se mejora usando pan integral para más saciedad en P1 y más calorías para P2 con oleaginosas."
    },
    almuerzo: {
      base: "Pollo al horno con arroz y zanahorias asadas",
      p1: "1 muslo/pata sin piel, ½ taza arroz cocido, abundantes zanahorias",
      p2: "1 muslo + 1 pechuga, ¾ taza arroz + chorro de aceite de oliva al servir",
      racional: "Proteína magra, carbohidrato de fácil digestión, vegetal dulce bien tolerado por colon irritable. Preparar doble para usar el martes.",
      batchTip: "🔄 Cocinar el doble de pollo. El sobrante se usa el martes en ensalada o sandwich."
    },
    merienda: {
      base: "Yogur natural con fruta",
      p1: "Yogur descremado, frutas sin azúcar agregada",
      p2: "Yogur entero + granola casera o avena tostada",
      racional: "Probióticos tolerables, calcio, y para P2 suma calorías sin esfuerzo."
    },
    cena: {
      base: "Sopa de zapallo y batata con tostadas",
      p1: "Porción grande de sopa, 1 tostada",
      p2: "Porción grande + 2 tostadas + huevo pochado encima",
      racional: "Cena liviana y digestiva. El zapallo y la batata tienen fibra suave ideal para colon irritable. Fácil de preparar en cantidad."
    }
  },
  {
    dia: "Martes",
    emoji: "🥚",
    color: "#FFF8E1",
    desayuno: {
      base: "Tostadas integrales con queso crema + fruta",
      p1: "Igual al lunes",
      p2: "Igual al lunes",
      racional: "Repetir desayuno y merienda simplifica la rutina y ayuda a la adherencia."
    },
    almuerzo: {
      base: "Ensalada tibia de pollo (sobrante), papa cocida y tomate",
      p1: "Más tomate y lechuga, porción moderada de papa (1 mediana)",
      p2: "Papa extra, aceite de oliva abundante, huevo duro + palta si hay",
      racional: "Recicla el pollo del lunes. Sin cocción extra. Nutritivo y liviano.",
      batchTip: "♻️ Usa el pollo del lunes. Cero cocción nueva."
    },
    merienda: {
      base: "Yogur natural con fruta",
      p1: "Igual al lunes",
      p2: "Igual al lunes",
      racional: "Consistencia en merienda facilita el plan."
    },
    cena: {
      base: "Tortilla de verduras al horno (zapallito, morrón, huevo)",
      p1: "Porción mediana, ensalada verde de acompañamiento",
      p2: "Porción grande + tostadas + queso rallado encima",
      racional: "Huevo aporta proteína completa. Zapallito y morrón son bien tolerados. Sin fritura."
    }
  },
  {
    dia: "Miércoles",
    emoji: "🐟",
    color: "#E3F2FD",
    desayuno: {
      base: "Tostadas integrales con queso crema + fruta",
      p1: "Igual al lunes",
      p2: "Igual al lunes"
    },
    almuerzo: {
      base: "Fideos con salsa de tomate casera y atún",
      p1: "Porción pequeña de fideos (½ taza), más salsa de tomate, ensalada",
      p2: "Porción grande fideos (1 taza), aceite de oliva extra, doble atún",
      racional: "La pasta es energética. El atún aporta omega-3 anti-inflamatorio bueno para las migrañas. Salsa casera sin exceso de ajo/cebolla.",
      batchTip: "🔄 Cocinar el doble de salsa. Guardar para el viernes."
    },
    merienda: {
      base: "Yogur natural con fruta",
      p1: "Igual", p2: "Igual"
    },
    cena: {
      base: "Lentejas guisadas suaves con verduras (zanahoria, papa, tomate)",
      p1: "Porción mediana (½ taza cocida), más zanahoria",
      p2: "Porción grande + caldo extra + pan de campo",
      racional: "Las lentejas son ricas en hierro y fibra soluble. Preparadas suaves y sin picante son toleradas por el colon irritable. Muy nutritivas y económicas.",
      batchTip: "🔄 Hacer doble cantidad. Las lentejas duran 3 días en heladera."
    }
  },
  {
    dia: "Jueves",
    emoji: "🍗",
    color: "#FCE4EC",
    desayuno: {
      base: "Tostadas integrales con queso crema + fruta",
      p1: "Igual", p2: "Igual"
    },
    almuerzo: {
      base: "Lentejas del miércoles reconvertidas + arroz",
      p1: "Lentejas solas con ensalada de remolacha",
      p2: "Lentejas con arroz mezclados + aceite de oliva",
      racional: "Arroz + lentejas = proteína completa económica. Reutilizar la cocción del miércoles ahorra tiempo y gas.",
      batchTip: "♻️ Recicla lentejas del miércoles. Agrega arroz recién cocido."
    },
    merienda: {
      base: "Yogur natural con fruta",
      p1: "Igual", p2: "Igual"
    },
    cena: {
      base: "Milanesa de pollo al horno con puré de papa",
      p1: "1 milanesa chica, puré liviano (sin crema), ensalada verde",
      p2: "2 milanesas, puré con manteca y leche, zanahoria rallada",
      racional: "Horno en lugar de fritura = más digestivo. El puré de papa es muy bien tolerado por colon irritable y aporta energía."
    }
  },
  {
    dia: "Viernes",
    emoji: "🥘",
    color: "#F3E5F5",
    desayuno: {
      base: "Tostadas integrales con queso crema + fruta",
      p1: "Igual", p2: "Igual"
    },
    almuerzo: {
      base: "Fideos con salsa de tomate casera (sobrante miércoles) y huevo revuelto",
      p1: "Porción chica, más ensalada",
      p2: "Porción grande + queso rallado",
      racional: "Recicla la salsa. Huevo suma proteína rápida. Práctico para fin de semana.",
      batchTip: "♻️ Usa salsa del miércoles. Cocinar solo fideos frescos."
    },
    merienda: {
      base: "Yogur natural con fruta",
      p1: "Igual", p2: "Igual"
    },
    cena: {
      base: "Estofado de carne magra (nalga/cuadrada) con papa y zanahoria",
      p1: "Porción moderada de carne, más verduras, sin pan",
      p2: "Porción grande + pan de campo para mojar",
      racional: "Carne magra = hierro + proteína sin exceso graso. El estofado es digestivo y reconfortante. Ideal para hacer en cantidad."
    }
  },
  {
    dia: "Sábado",
    emoji: "🫕",
    color: "#E8F5E9",
    desayuno: {
      base: "Desayuno especial: huevos revueltos + tostadas + fruta",
      p1: "1 huevo, 2 tostadas, fruta entera",
      p2: "2-3 huevos, 3 tostadas, manteca o aceite de oliva, fruta",
      racional: "Fin de semana permite un desayuno más elaborado. El huevo aporta colina, buena para el sistema nervioso y las migrañas."
    },
    almuerzo: {
      base: "Guiso de arroz con pollo y verduras (zapallito, tomate, morrón)",
      p1: "Porción mediana, más verdura que arroz",
      p2: "Porción grande con más arroz, aceite de oliva al servir",
      racional: "El guiso es económico, nutritivo y se hace en una sola olla. Ideal para batch cooking del fin de semana.",
      batchTip: "🔄 Hacer el triple. Guarda para el domingo y el lunes siguiente."
    },
    merienda: {
      base: "Tostadas con dulce de leche light o mermelada + mate",
      p1: "1-2 tostadas, mermelada light o dulce de leche mínimo",
      p2: "2-3 tostadas, dulce de leche regular + maní",
      racional: "Una merienda más placentera el sábado ayuda a la adherencia semanal."
    },
    cena: {
      base: "Pizza casera de molde con vegetales",
      p1: "2 porciones chicas, más vegetales, queso rallado moderado",
      p2: "3 porciones, más queso, aceitunas, jamón",
      racional: "Pizza casera evita ultraprocesados. El molde reduce grasa vs. piedra. Permite personalizar la cobertura. Momento familiar."
    }
  },
  {
    dia: "Domingo",
    emoji: "🥗",
    color: "#FFF3E0",
    desayuno: {
      base: "Tostadas integrales + queso crema o ricota + fruta",
      p1: "Con ricota magra como variante más proteica",
      p2: "Con ricota + miel + nueces o maní",
      racional: "Pequeña variación del desayuno habitual para no aburrir."
    },
    almuerzo: {
      base: "Guiso sobrante del sábado o pollo con ensalada rusa",
      p1: "Ensalada rusa con más zanahoria y arveja, menos papa, sin mayonesa",
      p2: "Ensalada rusa completa con mayonesa light + pollo extra",
      racional: "Recicla el guiso o usa pollo restante. La ensalada rusa es económica y nutritiva.",
      batchTip: "♻️ Fin del batch del sábado."
    },
    merienda: {
      base: "Yogur + fruta + avena cruda o tostada",
      p1: "Avena cruda remojada (más saciante), fruta sin azúcar",
      p2: "Avena tostada + miel + banana",
      racional: "La avena remojada es muy digestiva y saciante. Cierra la semana con buen aporte de fibra soluble."
    },
    cena: {
      base: "Sopa de fideos finos con verduras y huevo",
      p1: "Porción grande de sopa, 1 huevo pochado",
      p2: "Porción grande + fideos extra + queso rallado + tostadas",
      racional: "Cena dominical liviana y reconfortante. Fácil digestión para empezar la semana bien."
    }
  }
];

const compras = {
  "🥩 Carnes y proteínas": [
    "Pollo (muslos/patas/pechuga) – 1,5 kg",
    "Carne magra (nalga o cuadrada) – 500 g",
    "Atún en lata al natural – 3 latas",
    "Huevos – 1 docena",
  ],
  "🥛 Lácteos": [
    "Queso crema – 1 pote (200 g)",
    "Yogur natural entero/descremado – 1 kg",
    "Ricota – 250 g",
    "Leche entera/descremada – 1 litro",
    "Queso rallado – 100 g",
  ],
  "🌾 Cereales y harinas": [
    "Pan integral de molde – 1 paquete",
    "Arroz blanco – 1 kg",
    "Fideos (fetuccine o spaghetti) – 500 g",
    "Fideos finos (tipo cabello ángel) – 250 g",
    "Harina 0000 (para pizza) – 500 g",
    "Avena arrollada – 500 g",
  ],
  "🥦 Verduras": [
    "Zanahoria – 1 kg",
    "Papa – 1,5 kg",
    "Batata – 500 g",
    "Zapallo anco – ½ (o 500 g)",
    "Zapallito verde – 4 unidades",
    "Morrón rojo – 2 unidades",
    "Tomate – 1 kg",
    "Lechuga – 1 planta",
    "Remolacha – 2 unidades",
    "Arveja (lata o congelada) – 1 unidad",
  ],
  "🍌 Frutas": [
    "Banana – 6-7 unidades",
    "Manzana – 4-5 unidades",
    "Naranja o mandarina – 4 unidades",
    "Fruta de estación a elección",
  ],
  "🫘 Legumbres": [
    "Lentejas secas – 500 g",
  ],
  "🫙 Despensa": [
    "Tomate triturado (lata o tetra) – 2 unidades",
    "Aceite de oliva – 1 botella chica",
    "Aceite de girasol – 1 botella",
    "Sal, pimienta, pimentón, comino",
    "Caldo en cubos (sin glutamato si posible)",
    "Mermelada de fruta o dulce de leche",
    "Maní tostado sin sal – 200 g",
  ],
};

const reemplazos = [
  { original: "Aceite de oliva", reemplazo: "Aceite de girasol", nota: "Para cocción diaria; oliva para crudo" },
  { original: "Palta / Aguacate", reemplazo: "Huevo duro o queso untable", nota: "Aporta grasa saludable similar" },
  { original: "Nalga/cuadrada", reemplazo: "Paleta o pollo", nota: "Más económico, igualmente proteico" },
  { original: "Atún al natural", reemplazo: "Sardinas en lata o caballa", nota: "Más omega-3, más económico" },
  { original: "Yogur entero", reemplazo: "Yogur descremado + avena", nota: "Para P1 si necesita más control calórico" },
  { original: "Pan integral", reemplazo: "Pan lactal común + avena", nota: "Si el integral es muy caro" },
];

const planMensual = [
  { semana: "Semana 1", variante: "Menú base (esta guía)", color: colors.greenPale },
  { semana: "Semana 2", variante: "Rotación A: reemplazar pollo por carne, lentejas por garbanzos, sopa por crema de brócoli", color: colors.goldPale },
  { semana: "Semana 3", variante: "Rotación B: más pescado (merluza al horno), zapallo asado, guiso de porotos", color: colors.p1pale },
  { semana: "Semana 4", variante: "Rotación C: milanesas de soja o vegetarianas, risotto, tarta de verduras con tapa comprada", color: colors.p2pale },
];

const batchTips = [
  { emoji: "🍗", tip: "Lunes: cocinar el doble de pollo. Sirve para el martes sin esfuerzo." },
  { emoji: "🍝", tip: "Miércoles: hacer doble salsa de tomate. Se guarda 4 días en heladera." },
  { emoji: "🫘", tip: "Miércoles: cocinar triple de lentejas. Rinden hasta el jueves y pueden congelarse." },
  { emoji: "🫕", tip: "Sábado: guiso para 3 días. Es la base del batch cooking semanal." },
  { emoji: "🥣", tip: "Avena: preparar la noche anterior remojada con yogur para el desayuno del día siguiente." },
  { emoji: "🥕", tip: "Verduras: lavar, picar y conservar en tupper en la heladera el domingo. Ahorra 15 min por día." },
];

export default function MenuFamiliar() {
  const [diaActivo, setDiaActivo] = useState(0);
  const [tab, setTab] = useState("menu");

  const dia = weekMenu[diaActivo];

  const MealCard = ({ titulo, comida, emoji }) => (
    <div style={{
      background: colors.paper,
      border: `1.5px solid ${colors.border}`,
      borderRadius: 16,
      padding: "18px 20px",
      marginBottom: 14,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 20 }}>{emoji}</span>
        <span style={{ fontWeight: 800, fontSize: 15, color: colors.green, letterSpacing: 0.5, textTransform: "uppercase" }}>{titulo}</span>
      </div>
      
      <div style={{ 
        background: "#F7FBF7",
        borderLeft: `4px solid ${colors.greenLight}`,
        borderRadius: "0 10px 10px 0",
        padding: "10px 14px",
        marginBottom: 12,
        fontWeight: 600,
        color: colors.text,
        fontSize: 14,
        lineHeight: 1.5
      }}>
        🍽️ <strong>Base compartida:</strong> {comida.base}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <div style={{ background: colors.p1pale, borderRadius: 12, padding: "10px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
            <TAG color={colors.p1} bg={colors.p1pale}>👩 Persona 1</TAG>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: colors.text, lineHeight: 1.5 }}>{comida.p1}</p>
        </div>
        <div style={{ background: colors.p2pale, borderRadius: 12, padding: "10px 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
            <TAG color={colors.orange} bg={colors.p2pale}>👨 Persona 2</TAG>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: colors.text, lineHeight: 1.5 }}>{comida.p2}</p>
        </div>
      </div>

      {comida.racional && (
        <div style={{ 
          background: colors.goldPale,
          borderRadius: 10,
          padding: "8px 12px",
          fontSize: 12,
          color: "#7C6B1A",
          marginBottom: comida.batchTip ? 8 : 0
        }}>
          💡 {comida.racional}
        </div>
      )}
      {comida.batchTip && (
        <div style={{ 
          background: "#E8F5E9",
          borderRadius: 10,
          padding: "8px 12px",
          fontSize: 12,
          color: colors.green,
          fontWeight: 600
        }}>
          {comida.batchTip}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ 
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: colors.bg, 
      minHeight: "100vh",
      padding: "0 0 40px 0"
    }}>
      {/* Header */}
      <div style={{
        background: colors.green,
        padding: "28px 24px 20px",
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, fontSize: 120, opacity: 0.05 }}>🥗</div>
        <p style={{ margin: "0 0 4px", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", opacity: 0.7, fontFamily: "sans-serif" }}>Plan familiar · dos objetivos · una sola cocina</p>
        <h1 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 900, lineHeight: 1.2 }}>🥗 Menú Familiar Semanal</h1>
        <p style={{ margin: 0, fontSize: 13, opacity: 0.85, fontFamily: "sans-serif" }}>Personalizado · Económico · Casero · Argentina</p>
        
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
          <TAG color="white" bg="rgba(255,255,255,0.15)">👩 Alimentación equilibrada</TAG>
          <TAG color="white" bg="rgba(255,255,255,0.15)">👨 Ganar peso · Colon irritable</TAG>
          <TAG color="white" bg="rgba(255,255,255,0.15)">⏱ Max 40 min</TAG>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "white", borderBottom: `2px solid ${colors.border}`, overflowX: "auto" }}>
        {[
          { id: "menu", label: "📅 Menú" },
          { id: "compras", label: "🛒 Compras" },
          { id: "mensual", label: "📆 Plan Mensual" },
          { id: "batch", label: "⚡ Batch Cooking" },
          { id: "claves", label: "🔑 Claves" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            border: "none",
            background: tab === t.id ? colors.greenPale : "white",
            borderBottom: tab === t.id ? `3px solid ${colors.green}` : "3px solid transparent",
            color: tab === t.id ? colors.green : colors.muted,
            fontWeight: tab === t.id ? 800 : 500,
            padding: "14px 18px",
            fontSize: 13,
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "sans-serif",
            transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px" }}>

        {/* MENÚ */}
        {tab === "menu" && (
          <div>
            {/* Selector de días */}
            <div style={{ display: "flex", overflowX: "auto", gap: 8, padding: "16px 0", scrollbarWidth: "none" }}>
              {weekMenu.map((d, i) => (
                <button key={i} onClick={() => setDiaActivo(i)} style={{
                  background: diaActivo === i ? colors.green : d.color,
                  color: diaActivo === i ? "white" : colors.text,
                  border: diaActivo === i ? "none" : `1.5px solid ${colors.border}`,
                  borderRadius: 12,
                  padding: "10px 16px",
                  fontSize: 13,
                  fontWeight: diaActivo === i ? 800 : 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: "sans-serif",
                  transition: "all 0.2s",
                }}>
                  <span>{d.emoji}</span><br />
                  <span style={{ fontSize: 11 }}>{d.dia}</span>
                </button>
              ))}
            </div>

            <div style={{
              background: dia.color,
              borderRadius: 16,
              padding: "14px 18px",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <span style={{ fontSize: 36 }}>{dia.emoji}</span>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: colors.text }}>{dia.dia}</h2>
                <p style={{ margin: 0, fontSize: 12, color: colors.muted, fontFamily: "sans-serif" }}>Toca cada comida para ver detalles de cada persona</p>
              </div>
            </div>

            <MealCard titulo="Desayuno" emoji="☀️" comida={dia.desayuno} />
            <MealCard titulo="Almuerzo" emoji="🍽️" comida={dia.almuerzo} />
            <MealCard titulo="Merienda" emoji="☕" comida={dia.merienda} />
            <MealCard titulo="Cena" emoji="🌙" comida={dia.cena} />
          </div>
        )}

        {/* COMPRAS */}
        {tab === "compras" && (
          <div style={{ paddingTop: 20 }}>
            <h2 style={{ color: colors.green, fontSize: 20, fontWeight: 900, marginBottom: 4 }}>🛒 Lista de Compras Semanal</h2>
            <p style={{ color: colors.muted, fontSize: 13, marginBottom: 20, fontFamily: "sans-serif" }}>Una sola lista para ambas personas. Alcanza para toda la semana.</p>
            
            {Object.entries(compras).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: 20 }}>
                <h3 style={{ 
                  fontSize: 14, fontWeight: 800, color: colors.green,
                  margin: "0 0 10px", fontFamily: "sans-serif",
                  letterSpacing: 0.5, textTransform: "uppercase"
                }}>{cat}</h3>
                <div style={{ background: colors.paper, border: `1.5px solid ${colors.border}`, borderRadius: 12, overflow: "hidden" }}>
                  {items.map((item, i) => (
                    <div key={i} style={{
                      padding: "10px 16px",
                      borderBottom: i < items.length - 1 ? `1px solid ${colors.border}` : "none",
                      fontSize: 14,
                      color: colors.text,
                      display: "flex",
                      alignItems: "center",
                      gap: 10
                    }}>
                      <span style={{ color: colors.greenLight, fontWeight: 900 }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ background: colors.goldPale, border: `1.5px solid ${colors.gold}`, borderRadius: 14, padding: "16px 18px", marginTop: 10 }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 800, color: "#7C6B1A", fontFamily: "sans-serif" }}>💱 Reemplazos Económicos</h3>
              {reemplazos.map((r, i) => (
                <div key={i} style={{ 
                  display: "flex", gap: 10, alignItems: "flex-start",
                  marginBottom: i < reemplazos.length - 1 ? 10 : 0,
                  paddingBottom: i < reemplazos.length - 1 ? 10 : 0,
                  borderBottom: i < reemplazos.length - 1 ? `1px solid ${colors.gold}40` : "none"
                }}>
                  <span style={{ fontSize: 13, color: "#7C6B1A", minWidth: 100, fontWeight: 700 }}>{r.original}</span>
                  <span style={{ color: colors.muted, fontSize: 12 }}>→</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: colors.green }}>{r.reemplazo}</div>
                    <div style={{ fontSize: 11, color: colors.muted, fontFamily: "sans-serif" }}>{r.nota}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLAN MENSUAL */}
        {tab === "mensual" && (
          <div style={{ paddingTop: 20 }}>
            <h2 style={{ color: colors.green, fontSize: 20, fontWeight: 900, marginBottom: 4 }}>📆 Plan Mensual Rotativo</h2>
            <p style={{ color: colors.muted, fontSize: 13, marginBottom: 20, fontFamily: "sans-serif" }}>Cada semana rota para no aburrir, manteniendo la misma estructura y lógica.</p>
            
            {planMensual.map((s, i) => (
              <div key={i} style={{ 
                background: s.color,
                border: `1.5px solid ${colors.border}`,
                borderRadius: 16,
                padding: "18px 20px",
                marginBottom: 14,
                display: "flex",
                gap: 16,
                alignItems: "flex-start"
              }}>
                <div style={{
                  background: colors.green, color: "white",
                  borderRadius: 10, padding: "6px 12px",
                  fontSize: 12, fontWeight: 800, fontFamily: "sans-serif",
                  whiteSpace: "nowrap"
                }}>{s.semana}</div>
                <p style={{ margin: 0, fontSize: 14, color: colors.text, lineHeight: 1.6 }}>{s.variante}</p>
              </div>
            ))}

            <div style={{ background: colors.paper, border: `1.5px solid ${colors.border}`, borderRadius: 14, padding: "18px 20px", marginTop: 10 }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 800, color: colors.green }}>🔁 Principios del Plan Mensual</h3>
              {[
                "La estructura Desayuno / Almuerzo / Merienda / Cena siempre se mantiene igual.",
                "Los desayunos y meriendas se repiten casi todos los días (facilita adherencia).",
                "En cada semana se rotan las proteínas principales: pollo → carne → pescado → vegetariano.",
                "Las legumbres (lentejas, garbanzos, porotos) rotan mensualmente.",
                "El batch cooking del sábado cambia pero mantiene la lógica de reutilizar el domingo y el lunes.",
                "Se puede imprimir este menú y pegarlo en la heladera. La repetición es aliada, no enemiga."
              ].map((tip, i) => (
                <div key={i} style={{ 
                  display: "flex", gap: 10, marginBottom: 10,
                  fontSize: 13, color: colors.text, lineHeight: 1.5
                }}>
                  <span style={{ color: colors.greenLight, fontWeight: 900, marginTop: 1 }}>•</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BATCH COOKING */}
        {tab === "batch" && (
          <div style={{ paddingTop: 20 }}>
            <h2 style={{ color: colors.green, fontSize: 20, fontWeight: 900, marginBottom: 4 }}>⚡ Batch Cooking</h2>
            <p style={{ color: colors.muted, fontSize: 13, marginBottom: 20, fontFamily: "sans-serif" }}>Cocinar de más en momentos clave ahorra tiempo, gas y decisiones durante la semana.</p>
            
            {batchTips.map((b, i) => (
              <div key={i} style={{
                background: colors.paper,
                border: `1.5px solid ${colors.border}`,
                borderRadius: 14,
                padding: "14px 18px",
                marginBottom: 12,
                display: "flex",
                gap: 14,
                alignItems: "center"
              }}>
                <span style={{ fontSize: 28 }}>{b.emoji}</span>
                <p style={{ margin: 0, fontSize: 14, color: colors.text, lineHeight: 1.6 }}>{b.tip}</p>
              </div>
            ))}

            <div style={{ background: colors.greenPale, border: `1.5px solid ${colors.greenLight}`, borderRadius: 14, padding: "18px 20px", marginTop: 10 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 800, color: colors.green }}>🗓️ Rutina de Preparación Ideal</h3>
              {[
                { dia: "Domingo", accion: "Lavar y picar verduras para la semana. Dejar avena remojando para el lunes." },
                { dia: "Lunes", accion: "Cocinar doble pollo al horno." },
                { dia: "Miércoles", accion: "Cocinar triple lentejas + doble salsa de tomate." },
                { dia: "Sábado", accion: "Guiso grande (rinde sábado, domingo y lunes)." },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                  <div style={{
                    background: colors.green, color: "white",
                    borderRadius: 8, padding: "4px 10px",
                    fontSize: 11, fontWeight: 800, fontFamily: "sans-serif",
                    whiteSpace: "nowrap", flexShrink: 0
                  }}>{r.dia}</div>
                  <p style={{ margin: 0, fontSize: 13, color: colors.text, lineHeight: 1.5 }}>{r.accion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CLAVES */}
        {tab === "claves" && (
          <div style={{ paddingTop: 20 }}>
            <h2 style={{ color: colors.green, fontSize: 20, fontWeight: 900, marginBottom: 4 }}>🔑 Claves del Plan</h2>
            <p style={{ color: colors.muted, fontSize: 13, marginBottom: 20, fontFamily: "sans-serif" }}>Por qué funciona para ambas personas.</p>

            {[
              {
                titulo: "👩 Para Persona 1",
                color: colors.p1pale,
                border: colors.p1,
                items: [
                  "Más verduras en el plato → mayor saciedad y aporte de nutrientes.",
                  "Proteína en cada comida → reduce el hambre entre horas y sostiene la energía.",
                  "Carbohidratos moderados, no eliminados → adherencia a largo plazo.",
                  "Sin productos ultraprocesados como base → mejor calidad nutricional general.",
                  "Cenas livianas (sopas, tortillas) → favorece la digestión y el buen descanso.",
                  "Desayuno actual conservado y mejorado → no romper hábitos que funcionan.",
                ]
              },
              {
                titulo: "👨 Para Persona 2 (ganar peso + colon irritable)",
                color: colors.p2pale,
                border: colors.orange,
                items: [
                  "Más carbohidratos complejos (arroz, papa, fideos) → energía sin irritar.",
                  "Aceite de oliva en crudo sobre el plato → calorías densas sin cocción adicional.",
                  "Huevo frecuente → proteína completa, digestiva, económica.",
                  "Evitar exceso de ajo y cebolla → desencadenantes comunes del SII.",
                  "Fibra soluble (avena, zanahoria, batata, lentejas bien cocidas) → regularidad intestinal.",
                  "Buena hidratación implícita en sopas y guisos → previene estreñimiento.",
                  "Comidas cocidas y suaves, no crudas en exceso → menos carga digestiva.",
                ]
              },
              {
                titulo: "🏠 Principios comunes de la cocina familiar",
                color: colors.goldPale,
                border: colors.gold,
                items: [
                  "Una sola preparación base: lo que cambia es la porción y el agregado.",
                  "Sin frituras como método habitual → horno, vapor o hervido.",
                  "Ingredientes de almacén o super de barrio → sin exóticos ni caros.",
                  "Tiempo máximo 40 minutos por comida (la mayoría en 20).",
                  "El batch cooking del miércoles y sábado es el corazón del sistema.",
                  "Incluir una comida 'placentera' semanal (pizza, milanesa) para adherencia.",
                ]
              }
            ].map((sec, i) => (
              <div key={i} style={{
                background: sec.color,
                border: `1.5px solid ${sec.border}40`,
                borderLeft: `4px solid ${sec.border}`,
                borderRadius: "0 14px 14px 0",
                padding: "16px 18px",
                marginBottom: 16
              }}>
                <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 800, color: colors.text }}>{sec.titulo}</h3>
                {sec.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13, color: colors.text, lineHeight: 1.5 }}>
                    <span style={{ color: colors.green, fontWeight: 900, marginTop: 1 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            ))}

            <div style={{ 
              background: colors.green, color: "white",
              borderRadius: 16, padding: "20px 22px",
              textAlign: "center", marginTop: 8
            }}>
              <p style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 900 }}>⚠️ Recordatorio importante</p>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, opacity: 0.9, fontFamily: "sans-serif" }}>
                Este plan es orientativo. Si el colon irritable persiste o se intensifica, consultar un gastroenterólogo. 
                Si el tratamiento médico de Persona 1 implica restricciones alimentarias específicas, 
                consultar con el médico tratante antes de aplicar cambios.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
