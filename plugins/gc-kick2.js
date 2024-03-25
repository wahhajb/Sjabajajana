const handler = async (m, {conn, participants, usedPrefix, command}) => {
  if (!global.db.data.settings[conn.user.jid].restrict) throw '*[ ⚠️ ] يمتلك المالك تقييدًا (تمكين تقييد/تعطيل تقييد) باستخدام هذا الأمر*';
  const kicktext = `*[❗] ضع علامة على شخص ما أو قم بالرد على رسالة جماعية لإزالة المستخدم*\n\n*—◉ مثال:*\n*${usedPrefix + command} @${global.suittag}*`;
  if (!m.mentionedJid[0] && !m.quoted) return m.reply(kicktext, m.chat, {mentions: conn.parseMention(kicktext)});
  if (m.mentionedJid.includes(conn.user.jid)) return;
  const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
  const owr = m.chat.split`-`[0];
  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
};
handler.command = /^(طرد)$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;
export default handler;
