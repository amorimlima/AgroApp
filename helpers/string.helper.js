exports.sanitize = (string) => 
  string
    .trim()
    .replace(/^\s+/, "")
    .replace(/[áàâãåäæª\u00e1\u00e0\u00e2\u00e3\u00e5\u00e4\u00e6\u00aa]/g, "a")
    .replace(/[éèêëЄ€\u00e9\u00e8\u00ea\u00eb\u0404\u20ac]/g, "e")
    .replace(/[íìîï\u00ed\u00ec\u00ee\u00ef]/g, "i")
    .replace(/[\u00f3\u00f2\u00f4\u00f5\u00f6\u00f8]/g, "o")
    .replace(/[º\u00ba]/g, 'o.')
    .replace(/[úùûü\u00fa\u00f9\u00fb\u00fc]/g, "u")
    .replace(/[ç¢©\u00e7\u00a2\u00a9]/g, "c")
    .replace(/_+/g, "_");