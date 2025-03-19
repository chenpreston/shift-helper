// utils.js 文件内容

function generateUuid() {
  return crypto.randomUUID();
}

function formatDateTimeToUTCString(date) {
  

  if (!(date instanceof Date) || isNaN(date)) {
    // **添加 检查 date 是否是有效的 Date 对象**
    console.error(
      "formatDateTimeToUTCString 接收到的参数 date 不是有效的 Date 对象!",
      date
    ); // **调试信息： 输出错误信息， 如果 date 不是有效的 Date 对象**
    return "Invalid Date"; //  如果 date 不是有效的 Date 对象， 返回 "Invalid Date" 字符串，  方便排查问题
  }

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // 月份从 0 开始，需要 +1，并补零到两位
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hour = String(date.getUTCHours()).padStart(2, "0");
  const minute = String(date.getUTCMinutes()).padStart(2, "0");
  const second = String(date.getUTCSeconds()).padStart(2, "0");
  const formattedDateTime = `${year}${month}${day}T${hour}${minute}${second}`; // 先将格式化后的日期时间 存储到变量 formattedDateTime
  
  return formattedDateTime; // 返回 格式化后的日期时间字符串
}

function createUTCDateFromDateTextAndTime(dateText, timeStr) {
  const [day, month] = dateText.split("/"); // 分割日期文本为日和月
  const [hour, minute] = timeStr.split(":"); // 分割时间字符串为小时和分钟

  const year = new Date().getFullYear(); // 获取当前年份 (或者你可以根据需要从别处获取年份)

  const utcDate = new Date(
    Date.UTC(
      year,
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      0
    )
  ); // 使用 Date.UTC 构建 UTC Date 对象，月份需要 -1，因为月份从 0 开始

  if (isNaN(utcDate)) {
    // 检查 Date 对象是否有效
    return null; // 如果 Date 对象无效，则返回 null
  }
  return utcDate; // 返回 UTC Date 对象
}
