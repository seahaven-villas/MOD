// ==============================================================================
// MOD REPORT SYSTEM - BACKEND (Code.gs)
// Seahaven by Kamuela - Bali
// ==============================================================================

// ID Template Google Docs (Ganti dengan ID unik file Google Docs Template kamu)
var TEMPLATE_DOC_ID = 'PASTE_ID_GOOGLE_DOCS_TEMPLATE_KAMU_DISINI'; 

/**
 * 1. Menampilkan Halaman Utama Web App
 */
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('MOD Report System - Seahaven')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 2. Autentikasi Login HOD (Mengecek Username & Password di sheet Users_HOD)
 */
function checkHODLogin(username, password) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Users_HOD');
  
  if (!sheet) {
    return { 
      status: 'Error', 
      message: 'Sheet Users_HOD tidak ditemukan! Buat tab "Users_HOD" terlebih dahulu.' 
    };
  }
  
  const data = sheet.getDataRange().getValues();
  data.shift(); // Hapus baris header
  
  // Cari pencocokan Username, Password, dan Status Active
  const user = data.find(row => 
    String(row[0]).trim().toLowerCase() === String(username).trim().toLowerCase() && 
    String(row[1]).trim() === String(password).trim() && 
    String(row[4]).trim().toLowerCase() === 'active'
  );
  
  if (user) {
    return {
      status: 'Success',
      userData: {
        username: user[0],
        fullName: user[2],
        position: user[3]
      }
    };
  } else {
    return { 
      status: 'Failed', 
      message: 'Username atau Password salah (atau akun belum Aktif)!' 
    };
  }
}

/**
 * 3. Mengambil Master Checklist secara dinamis dari sheet Master_Checklist
 */
function getMasterChecklistData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Master_Checklist');
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  data.shift(); // Hapus baris header
  return data;
}

/**
 * 4. Menyimpan Laporan MOD dari Web App ke Google Sheets & Trigger PDF Generator
 */
function submitFullMODReport(payload) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('MOD_Header');
  
  if (!sheet) {
    return { 
      status: 'Error', 
      message: 'Sheet MOD_Header tidak ditemukan. Silakan buat sheet terlebih dahulu.' 
    };
  }
  
  const reportId = 'MOD-' + new Date().getTime();
  const timestamp = new Date();
  
  // Simpan data lengkap ke baris baru sheet MOD_Header
  sheet.appendRow([
    reportId,
    timestamp,
    payload.general.date,
    payload.general.time,
    payload.general.name,
    payload.general.position,
    payload.general.lastOcc,
    payload.general.lastSold,
    payload.general.lastArr,
    payload.general.todayForecastOcc,
    payload.general.todayForecastSold,
    payload.general.todayForecastArr,
    payload.general.vipWelcome,
    payload.general.specialPackage,
    payload.general.fnbCover,
    payload.general.fnbRev,
    payload.general.eventToday,
    payload.general.tomorrowForecastOcc,
    payload.general.tomorrowForecastSold,
    payload.general.tomorrowForecastArr,
    payload.general.tomorrowVip,
    payload.general.nordicVisit,
    payload.villaNo,
    payload.guestComments,
    payload.foodComments,
    payload.notAvailableItems,
    payload.operational.generalObs,
    payload.operational.gardenObs,
    payload.operational.waterTank,
    payload.operational.pln53,
    payload.operational.pln192,
    payload.operational.secAM,
    payload.operational.secPM,
    payload.operational.secNight,
    payload.operational.poolMaint,
    payload.operational.ownerNotes,
    JSON.stringify(payload.checklist) // Simpan objek rincian checklist dalam format JSON Teks
  ]);
  
  // Generate File PDF (Opsional jika ID Template sudah terisi)
  let pdfUrl = "";
  if (TEMPLATE_DOC_ID && TEMPLATE_DOC_ID !== 'PASTE_ID_GOOGLE_DOCS_TEMPLATE_KAMU_DISINI') {
    try {
      pdfUrl = generatePDFReport(reportId, payload);
    } catch (err) {
      console.error("Proses PDF dilewati / bermasalah: " + err.message);
    }
  }
  
  return {
    status: 'Success',
    message: 'Laporan MOD berhasil disimpan ke Google Sheets!',
    reportId: reportId,
    pdfUrl: pdfUrl
  };
}

/**
 * 5. Fungsi Pembuat File PDF dari Google Docs Template
 */
function generatePDFReport(reportId, payload) {
  const templateFile = DriveApp.getFileById(TEMPLATE_DOC_ID);
  const parentFolder = templateFile.getParents().next();
  
  // Duplikat template Google Docs sementara
  const tempCopy = templateFile.makeCopy('MOD_Report_' + reportId, parentFolder);
  const doc = DocumentApp.openById(tempCopy.getId());
  const body = doc.getBody();

  // Replace Placeholder Teks
  body.replaceText('{{Report_ID}}', reportId);
  body.replaceText('{{Tanggal}}', payload.general.date || '-');
  body.replaceText('{{Shift}}', payload.general.time || '-');
  body.replaceText('{{Nama_MOD}}', payload.general.name || '-');
  body.replaceText('{{Jabatan}}', payload.general.position || '-');
  body.replaceText('{{Villa_No}}', payload.villaNo || '-');

  body.replaceText('{{Last_Occ}}', payload.general.lastOcc || '-');
  body.replaceText('{{Last_Sold}}', payload.general.lastSold || '-');
  body.replaceText('{{Last_ARR}}', payload.general.lastArr || '-');
  body.replaceText('{{Today_Occ}}', payload.general.todayForecastOcc || '-');
  body.replaceText('{{Today_Sold}}', payload.general.todayForecastSold || '-');
  body.replaceText('{{Today_ARR}}', payload.general.todayForecastArr || '-');
  
  body.replaceText('{{FnB_Cover}}', payload.general.fnbCover || '-');
  body.replaceText('{{FnB_Rev}}', payload.general.fnbRev || '-');
  body.replaceText('{{Event_Today}}', payload.general.eventToday || '-');
  body.replaceText('{{Tom_Occ}}', payload.general.tomorrowForecastOcc || '-');
  body.replaceText('{{Tom_Sold}}', payload.general.tomorrowForecastSold || '-');
  body.replaceText('{{Tom_ARR}}', payload.general.tomorrowForecastArr || '-');

  body.replaceText('{{VIP_Welcome}}', payload.general.vipWelcome || '-');
  body.replaceText('{{Special_Pkg}}', payload.general.specialPackage || '-');
  body.replaceText('{{Tom_VIP}}', payload.general.tomorrowVip || '-');
  body.replaceText('{{Nordic_Visit}}', payload.general.nordicVisit || '-');

  body.replaceText('{{Gen_Obs}}', payload.operational.generalObs || '-');
  body.replaceText('{{Garden_Obs}}', payload.operational.gardenObs || '-');
  body.replaceText('{{Water_Tank}}', payload.operational.waterTank || '-');
  body.replaceText('{{PLN_53}}', payload.operational.pln53 || '-');
  body.replaceText('{{PLN_192}}', payload.operational.pln192 || '-');
  body.replaceText('{{Sec_AM}}', payload.operational.secAM || '-');
  body.replaceText('{{Sec_PM}}', payload.operational.secPM || '-');
  body.replaceText('{{Sec_Night}}', payload.operational.secNight || '-');
  body.replaceText('{{Pool_Maint}}', payload.operational.poolMaint || '-');
  body.replaceText('{{Owner_Notes}}', payload.operational.ownerNotes || '-');

  body.replaceText('{{Guest_Comments}}', payload.guestComments || '-');
  body.replaceText('{{Food_Comments}}', payload.foodComments || '-');
  body.replaceText('{{Not_Available}}', payload.notAvailableItems || '-');

  // Format Temuan Checklist yang bermasalah (Pending / Issue)
  const issues = payload.checklist.filter(item => item.status !== 'OK');
  let issueText = "";
  if (issues.length === 0) {
    issueText = "Semua item inspeksi dalam kondisi OK / Baik.";
  } else {
    issueText = issues.map((item, i) => `${i+1}. [${item.status}] ${item.item} -> Remarks: ${item.remarks || '-'}`).join('\n');
  }
  body.replaceText('{{Checklist_Issues_Table}}', issueText);

  // Simpan & Konversi ke PDF
  doc.saveAndClose();
  const pdfBlob = tempCopy.getAs(MimeType.PDF);
  const pdfFile = parentFolder.createFile(pdfBlob).setName('MOD_Report_' + payload.general.date + '_' + reportId + '.pdf');
  
  // Set izin file agar dapat dibuka lewat link
  pdfFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  tempCopy.setTrashed(true);

  return pdfFile.getUrl();
}