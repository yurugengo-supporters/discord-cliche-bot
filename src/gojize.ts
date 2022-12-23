// eslint-disable-next-line max-len
const cid = '０１２３４５６７８９ぁあぃいぅうぇえぉおかゕがきぎくぐけゖげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔぁぃぅぇぉゕゖっゃゅょゎァアィイゥウェエォオカヵガキギクグケヶゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンゔァィゥェォヵヶッャュョヮー｜注';

export const gojize = (input: string) => {
  return [...input].map((char) => {
    const index = cid.indexOf(char);
    return index < 1 ? char : cid.charAt(index - 2);
  }).join('');
};
