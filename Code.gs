/*
 * Google Apps Script backend cho website Bài 5.
 * Hướng dẫn cài đặt ở README.md. Chỉnh CLASS_CODE trước khi triển khai.
 */
const SHEET_NAME = 'KetQua';
const CLASS_CODE = 'DDCS1-B5'; // đổi mã này và sửa cùng mã trong index.html

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!data.studentId || !data.classCode || data.classCode !== CLASS_CODE ||
        data.expectedClassCode !== CLASS_CODE) {
      return jsonOutput({ ok: false, message: 'Thông tin không hợp lệ hoặc sai mã lớp.' });
    }
    if (!Array.isArray(data.answers) || data.answers.length !== 20) {
      return jsonOutput({ ok: false, message: 'Dữ liệu bài làm không hợp lệ.' });
    }
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Thời gian nộp', 'Mã sinh viên', 'Họ tên', 'Mã lớp',
        'Điểm / 10', 'Số câu đúng', 'Tổng số câu', 'Chi tiết đáp án (JSON)'
      ]);
      sheet.setFrozenRows(1);
    }
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([
        new Date(), String(data.studentId).slice(0, 40),
        String(data.studentName || '').slice(0, 80), CLASS_CODE,
        Number(data.score) || 0, Number(data.correct) || 0, 20,
        JSON.stringify(data.answers)
      ]);
    } finally {
      lock.releaseLock();
    }
    return jsonOutput({ ok: true, message: 'Đã ghi nhận bài làm.' });
  } catch (err) {
    return jsonOutput({ ok: false, message: 'Lỗi lưu bài làm.' });
  }
}
function doGet() {
  return jsonOutput({ ok: true, message: 'Quiz backend is running.' });
}
function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
