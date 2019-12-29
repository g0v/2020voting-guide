

interface PartyColor {
  main: string;
  secondary?: string;
  text?: string;
}
export const partiesColors: {
    [key: string]: PartyColor;
} = {
    中國國民黨: { main: '#000099' },
    民主進步黨: { main: '#1B9431' },
    台灣民眾黨: { main: '#0CB5B5' },
    時代力量: { main: '#FBBE01' },
    國會政黨聯盟: { main: '#E60012', secondary: '#FFF100' },
    新黨: { main: '#1C298B', secondary: '#FFDA00' },
    台灣基進: { main: '#A73F24' },
    綠黨: { main: '#73BE00', secondary: '#FFFF00' },
    親民黨: { main: '#FF6310' },
    台灣維新: { main: '#51448D' },
    無黨團結聯盟: { main: '#C20F51' },
    社會民主黨: { main: '#FF0088' },
    台灣團結聯盟: { main: '#C69E6A' },
    安定力量: { main: '#5E3190' },
    一邊一國行動黨: { main: '#5BBDE0' },
    喜樂島聯盟: { main: '#009E96' },
    宗教聯盟: { main: '#EAD9A5' },
    無黨籍: { main: '#212121' },
    其他: { main: '#AEAEAE' }
};

export const MODAL_MAX_WIDTH = 980

export const API_CONSTITUENCY = (constituency: string) => `/api/constituency/${constituency}`
export const API_ALL_REGIONAL_CANDIDATES = '/api/data/regional_candidates.json'

export const KEYCODE = {
  ENTER: 13 as 13,
  ESCAPE: 27 as 27,

  ARROW_UP: 38 as 38,
  ARROW_RIGHT: 39 as 39,
  ARROW_DOWN: 40 as 40,
  ARROW_LEFT: 37 as 37,
}