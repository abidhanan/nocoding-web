/**
 * The languages the site is written in. Indonesian is the page itself; every other language is a
 * full hand-written translation stored in /public/i18n (ui-<code>.json for the interface and
 * art-<code>.json for the articles), so switching is instant and needs no outside service.
 *
 * This file is kept tiny because every page loads it: language code -> flag file, plus the
 * right-to-left languages. Display names live in ./language-names.ts (language menu only).
 */
const entries = "id:id en:gb es:es fr:fr de:de pt:pt it:it nl:nl ru:ru tr:tr zh-CN:cn ja:jp ko:kr ar:sa hi:in th:th vi:vn ms:my ace:id af:za sq:al am:et hy:am as:in awa:in ay:bo az:az ban:id bm:ml ba:ru eu:es btx:id bts:id bbc:id be:by bn:bd bew:id bho:in bik:ph bs:ba br:fr bg:bg my:mm ca:es ceb:ph ny:mw zh-TW:tw cv:ru kw:gb co:fr crh:ua hr:hr cs:cz da:dk dv:mv doi:in dz:bt eo:un et:ee ee:gh fo:fo fj:fj fil:ph fi:fi fy:nl fur:it ff:sn gl:es ka:ge el:gr kl:gl gn:py gu:in ht:ht ha:ng haw:us he:il hil:ph hmn:la hu:hu is:is ig:ng ilo:ph ga:ie jv:id kn:in pam:ph ks:in kk:kz km:kh kg:cd rw:rw rn:bi kok:in kri:sl ku:iq ckb:iq ky:kg lo:la la:va lv:lv lij:it li:nl ln:cd lt:lt lmo:it lg:ug luo:ke lb:lu mk:mk mad:id mai:in mak:id mg:mg ml:in mt:mt gv:im mi:nz mr:in mfe:mu mhr:ru min:id lus:in mn:mn ne:np se:no no:no oc:fr or:in om:et pag:ph pap:aw ps:af fa:ir pl:pl pa:in qu:pe ro:ro rm:ch sm:ws sg:cf sa:in gd:gb-sct nso:za sr:rs st:ls tn:bw sn:zw scn:it szl:pl sd:pk si:lk sk:sk sl:si so:so su:id sw:ke ss:sz sv:se ty:pf tg:tj ta:in tt:ru te:in tet:tl ti:er tpi:pg lua:cd ts:za tum:mw tk:tm ak:gh uk:ua ur:pk ug:cn uz:uz ve:za war:ph cy:gb-wls wo:sn xh:za yi:il yo:ng yua:mx zu:za";

const flags = new Map<string, string>(entries.split(" ").map((entry) => entry.split(":") as [string, string]));
const rtlCodes = new Set("ar dv he ks ckb ps fa sd ur ug yi".split(" "));

export function isSiteLanguage(code: string | null | undefined): code is string {
  return Boolean(code && flags.has(code));
}

/** Flag file name (in /public/flags) for a language, if there is one. */
export function flagOf(code: string) {
  return flags.get(code);
}

export function isRtlLanguage(code: string) {
  return rtlCodes.has(code);
}

// Older or alternative codes browsers still send.
const aliases: Record<string, string> = { in: "id", iw: "he", tl: "fil", jw: "jv", nb: "no", nn: "no", mo: "ro", sh: "hr" };

/**
 * The site language closest to a browser language tag (en-GB, pt-BR, zh-Hans-CN, ...), or null when
 * the site is not offered in it.
 */
export function languageForBrowserTag(tag: string): string | null {
  const lower = tag.toLowerCase();
  const base = lower.split("-")[0];

  if (base === "zh") {
    return /tw|hk|mo|hant/.test(lower) ? "zh-TW" : "zh-CN";
  }

  const code = aliases[base] ?? base;

  return flags.has(code) ? code : null;
}
