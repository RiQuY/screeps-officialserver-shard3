module.exports = {"version":3,"file":"main.js","sources":["../src/stats/StatsBK.ts","../src/utils/MemoryClean.ts","../src/models/Spawner.ts","../src/controllers/SpawnController.ts","../src/models/RoomRoles.ts","../src/controllers/RolesController.ts","../src/old/Roles.ts","../src/main.ts"],"names":[],"mappings":";;;;AAoCA;SACgB,eAAe;IAE3B,IAAI,MAAM,CAAC,KAAK,IAAI,SAAS,EAAE;QAC3B,MAAM,CAAC,KAAK,GAAG;YACX,KAAK,EAAE,EAAE;YACT,GAAG,EAAE;gBACD,QAAQ,EAAE,CAAC;gBACX,aAAa,EAAE,CAAC;gBAChB,KAAK,EAAE,CAAC;aACX;YACD,MAAM,EAAE,EAAE;YACV,GAAG,EAAE;gBACD,MAAM,EAAE,CAAC;gBACT,KAAK,EAAE,CAAC;gBACR,OAAO,EAAE,CAAC;aACb;SACJ,CAAC;KACL;IAED,IAAI,KAAK,GAAG,IAAI,CAAC,KAAK,CAAC;IACvB,IAAI,MAAM,GAAG,IAAI,CAAC,MAAM,CAAC;IACzB,KAAK,IAAI,OAAO,IAAI,KAAK,EAAE;QACvB,IAAI,IAAI,GAAS,IAAI,CAAC,KAAK,CAAC,OAAO,CAAC,CAAC;QACrC,IAAI,QAAQ,IAAI,IAAI,CAAC,UAAU,GAAG,IAAI,CAAC,UAAU,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;QAE1D,MAAM,CAAC,KAAK,CAAC,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,GAAG;YAC5B,MAAM,EAAE,CAAC;YACT,eAAe,EAAE,CAAC;YAClB,uBAAuB,EAAE,CAAC;YAC1B,kBAAkB,EAAE,CAAC;YACrB,uBAAuB,EAAE,CAAC;YAC1B,YAAY,EAAE,CAAC;SAClB,CAAC;QAEF,IAAI,QAAQ,EAAE;YACV,MAAM,CAAC,KAAK,CAAC,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,MAAM,GAAG,CAAC,CAAC;YACzC,MAAM,CAAC,KAAK,CAAC,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,eAAe,GAAG,IAAI,CAAC,eAAe,CAAC;YACrE,MAAM,CAAC,KAAK,CAAC,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,uBAAuB,GAAG,IAAI,CAAC,uBAAuB,CAAC;YAErF,IAAI,IAAI,CAAC,UAAU,KAAK,SAAS,EAAE;gBAC/B,MAAM,CAAC,KAAK,CAAC,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,kBAAkB,GAAG,IAAI,CAAC,UAAU,CAAC,QAAQ,CAAC;gBAC5E,MAAM,CAAC,KAAK,CAAC,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,uBAAuB,GAAG,IAAI,CAAC,UAAU,CAAC,aAAa,CAAC;aACzF;YACD,IAAI,MAAM,GAAG,CAAC,CAAC;YACf,IAAI,WAAW,GAAG,CAAC,CAAC;YAEpB,IAAI,IAAI,CAAC,OAAO,EAAE;gBACd,MAAM,GAAG,IAAI,CAAC,OAAO,CAAC,KAAK,CAAC,eAAe,CAAC,CAAC;gBAC7C,WAAW,GAAG,IAAI,CAAC,OAAO,CAAC,KAAK,CAAC,WAAW,EAAE,CAAC;aAClD;iBACI;gBACD,MAAM,GAAG,CAAC,CAAC;gBACX,WAAW,GAAG,CAAC,CAAC;aACnB;YACD,MAAM,CAAC,KAAK,CAAC,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,YAAY,GAAG,MAAM,CAAC;SACvD;aACI;YACD,MAAM,CAAC,KAAK,CAAC,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,MAAM,GAAG,CAAC,CAAC;SAC5C;KACJ;IAED,MAAM,CAAC,KAAK,CAAC,GAAG,CAAC,QAAQ,GAAG,IAAI,CAAC,GAAG,CAAC,QAAQ,CAAC;IAC9C,MAAM,CAAC,KAAK,CAAC,GAAG,CAAC,aAAa,GAAG,IAAI,CAAC,GAAG,CAAC,aAAa,CAAC;IACxD,MAAM,CAAC,KAAK,CAAC,GAAG,CAAC,KAAK,GAAG,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC;IAGxC,KAAK,IAAI,QAAQ,IAAI,MAAM,EAAE;QACzB,IAAI,KAAK,GAAmB,IAAI,CAAC,MAAM,CAAC,QAAQ,CAAC,CAAC;QAClD,MAAM,CAAC,KAAK,CAAC,MAAM,CAAC,KAAK,CAAC,IAAI,CAAC,GAAG;YAC9B,aAAa,EAAE,CAAC;SACnB,CAAC;QACF,MAAM,CAAC,KAAK,CAAC,MAAM,CAAC,KAAK,CAAC,IAAI,CAAC,CAAC,aAAa,GAAG,KAAK,CAAC,MAAM,CAAC;;KAEhE;;;;;;;;IAQD,MAAM,CAAC,KAAK,CAAC,GAAG,CAAC,MAAM,GAAG,IAAI,CAAC,GAAG,CAAC,MAAM,CAAC;IAC1C,MAAM,CAAC,KAAK,CAAC,GAAG,CAAC,KAAK,GAAG,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC;;IAExC,MAAM,CAAC,KAAK,CAAC,GAAG,CAAC,OAAO,GAAG,IAAI,CAAC,GAAG,CAAC,OAAO,EAAE,CAAC;AAClD;;SC1HgB,gBAAgB;;IAE5B,KAAK,MAAM,IAAI,IAAI,MAAM,CAAC,MAAM,EAAE;QAC9B,IAAI,EAAE,IAAI,IAAI,IAAI,CAAC,MAAM,CAAC,EAAE;YACxB,OAAO,MAAM,CAAC,MAAM,CAAC,IAAI,CAAC,CAAC;SAC9B;KACJ;AACL;;MCPa,OAAO;IAER,OAAO,eAAe,CAAC,IAAY,EAAE,IAAY;QACrD,IAAI,OAAO,GAAiB;YACxB,MAAM,EAAE;gBACJ,IAAI,EAAE,IAAI;gBACV,IAAI,EAAE,IAAI;gBACV,OAAO,EAAE,KAAK;aACjB;SACJ,CAAA;QAED,OAAO,OAAO,CAAC;KAClB;IAEM,OAAO,eAAe,CAAC,KAAqB;QAC/C,IAAI,IAAI,GAAG,WAAW,CAAC;QACvB,KAAK,CAAC,UAAU,CAAC,CAAC,IAAI,EAAE,KAAK,EAAE,IAAI,CAAC,EAAE,YAAY,GAAC,IAAI,CAAC,IAAI,EAAE,OAAO,CAAC,eAAe,CAAC,IAAI,EAAE,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,CAAE,CAAC;KAClH;IAEM,OAAO,cAAc,CAAC,KAAqB;QAC9C,IAAI,IAAI,GAAG,UAAU,CAAC;QACtB,KAAK,CAAC,UAAU,CAAC,CAAC,IAAI,EAAE,KAAK,EAAE,IAAI,CAAC,EAAE,WAAW,GAAC,IAAI,CAAC,IAAI,EAAE,OAAO,CAAC,eAAe,CAAC,IAAI,EAAE,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,CAAE,CAAC;KACjH;IAEM,OAAO,gBAAgB,CAAC,KAAqB;QAChD,IAAI,IAAI,GAAG,SAAS,CAAC;QACrB,KAAK,CAAC,UAAU,CAAC,CAAC,IAAI,EAAE,KAAK,EAAE,IAAI,CAAC,EAAE,WAAW,GAAC,IAAI,CAAC,IAAI,EAAE,OAAO,CAAC,eAAe,CAAC,IAAI,EAAE,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,CAAE,CAAC;KACjH;;;MCzBQ,eAAe;IAEjB,OAAO,IAAI;QAEd,KAAK,MAAM,SAAS,IAAI,IAAI,CAAC,MAAM,EAAE;YACjC,IAAI,IAAI,CAAC,MAAM,CAAC,cAAc,CAAC,SAAS,CAAC,EAAE;gBACvC,MAAM,KAAK,GAAG,IAAI,CAAC,MAAM,CAAC,SAAS,CAAC,CAAC;;gBAIrC,IAAI,KAAK,CAAC,KAAK,CAAC,eAAe,CAAC,IAAI,GAAG,IAAI,MAAM,CAAC,IAAI,CAAC,IAAI,CAAC,MAAM,CAAC,CAAC,MAAM,GAAG,CAAC,EAAE;oBAC5E,OAAO,CAAC,eAAe,CAAC,KAAK,CAAC,CAAC;iBAClC;aACJ;SACJ;KACJ;;;MCjBQ,SAAS;IAMlB,YAAa,UAAkB,EAAE,SAAiB,EAAE,SAAiB,EAAE,QAAgB;QACnF,IAAI,CAAC,UAAU,GAAG,UAAU,CAAC;QAC7B,IAAI,CAAC,SAAS,GAAG,SAAS,CAAC;QAC3B,IAAI,CAAC,SAAS,GAAG,SAAS,CAAC;QAC3B,IAAI,CAAC,QAAQ,GAAG,QAAQ,CAAC;KAC5B;;;MCHQ,eAAe;IAEjB,OAAO,IAAI;QACd,MAAM,CAAC,SAAS,GAAG,IAAI,SAAS,CAAC,CAAC,EAAC,CAAC,EAAC,CAAC,EAAC,CAAC,CAAC,CAAC;KAC7C;;;SCAW,SAAS,CAAC,KAAY;IAClC,UAAU,CAAC,KAAK,CAAC,CAAC;;IAElB,kBAAkB,CAAC,KAAK,CAAC,CAAC;AAC9B,CAAC;AAED,SAAS,UAAU,CAAC,KAAY;;;;;;;;;;;;;;;;;;;;;;;;;;IA0B5B,IAAI,KAAK,CAAC,KAAK,CAAC,eAAe,CAAC,GAAG,KAAK,CAAC,KAAK,CAAC,WAAW,EAAE,EAAE;QAC1D,IAAI,OAAO,GAAG,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,YAAY,CAAC,CAAC;QAC5C,IAAI,KAAK,CAAC,OAAO,CAAC,OAAO,CAAC,CAAC,CAAC,CAAC,IAAI,gBAAgB,EAAE;YAC/C,KAAK,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,CAAC,EAAE,EAAE,kBAAkB,EAAE,EAAE,MAAM,EAAE,SAAS,EAAE,EAAE,CAAC,CAAC;SAC3E;KACJ;SACI;QACD,IAAI,OAAO,GAAG,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,eAAe,EAAE;YAC3C,MAAM,EAAE,CAAC,SAAS;gBACd,OAAO,CAAC,SAAS,CAAC,aAAa,IAAI,mBAAmB;oBAClD,SAAS,CAAC,aAAa,IAAI,eAAe;oBAC1C,SAAS,CAAC,aAAa,IAAI,eAAe,KAAK,SAAS,CAAC,MAAM,GAAG,SAAS,CAAC,cAAc,CAAC;aAClG;SACJ,CAAC,CAAC;QACH,IAAI,OAAO,CAAC,MAAM,GAAG,CAAC,EAAE;YACpB,IAAI,KAAK,CAAC,QAAQ,CAAC,OAAO,CAAC,CAAC,CAAC,EAAE,eAAe,CAAC,IAAI,gBAAgB,EAAE;gBACjE,KAAK,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,CAAC,EAAE,EAAE,kBAAkB,EAAE,EAAE,MAAM,EAAE,SAAS,EAAE,EAAE,CAAC,CAAC;aAC3E;SACJ;KACJ;AACL,CAAC;AASD,SAAS,kBAAkB,CAAC,KAAY;;;;;;;;;IASpC,IAAI,KAAK,CAAC,MAAM,CAAC,OAAO,IAAI,KAAK,CAAC,KAAK,CAAC,eAAe,CAAC,IAAI,CAAC,EAAE;QAC3D,KAAK,CAAC,MAAM,CAAC,OAAO,GAAG,KAAK,CAAC;QAC7B,KAAK,CAAC,GAAG,CAAC,YAAY,CAAC,CAAC;KAC3B;IACD,IAAI,CAAC,KAAK,CAAC,MAAM,CAAC,OAAO,IAAI,KAAK,CAAC,KAAK,CAAC,eAAe,CAAC,IAAI,KAAK,CAAC,KAAK,CAAC,WAAW,EAAE,EAAE;QACpF,KAAK,CAAC,MAAM,CAAC,OAAO,GAAG,IAAI,CAAC;QAC5B,KAAK,CAAC,GAAG,CAAC,WAAW,CAAC,CAAC;KAC1B;IAED,IAAI,KAAK,CAAC,MAAM,CAAC,OAAO,EAAE;QACtB,IAAI,KAAK,CAAC,iBAAiB,CAAuB,KAAK,CAAC,IAAI,CAAC,UAAU,CAAC,IAAI,gBAAgB,EAAE;YAC1F,KAAK,CAAC,MAAM,CAAuB,KAAK,CAAC,IAAI,CAAC,UAAU,EAAE,EAAE,kBAAkB,EAAE,EAAE,MAAM,EAAE,SAAS,EAAE,EAAE,CAAC,CAAC;SAC5G;KACJ;SACI;QACD,IAAI,OAAO,GAAG,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,YAAY,CAAC,CAAC;QAC5C,IAAI,KAAK,CAAC,OAAO,CAAC,OAAO,CAAC,CAAC,CAAC,CAAC,IAAI,gBAAgB,EAAE;YAC/C,KAAK,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,CAAC,EAAE,EAAE,kBAAkB,EAAE,EAAE,MAAM,EAAE,SAAS,EAAE,EAAE,CAAC,CAAC;SAC3E;KACJ;AACL;;AC3FA;MACa,IAAI,GAAG;IAEhB,gBAAgB,EAAE,CAAC;IAEnB,eAAe,CAAC,IAAI,EAAE,CAAC;IACvB,eAAe,CAAC,IAAI,EAAE,CAAC;IAEvB,KAAK,MAAM,IAAI,IAAI,MAAM,CAAC,MAAM,EAAE;QAC9B,SAAS,CAAC,IAAI,CAAC,MAAM,CAAC,IAAI,CAAC,CAAC,CAAC;KAChC;IAED,eAAe,EAAE,CAAC;;;AAGtB,EAAE;AAEF;AACA;;;;"};