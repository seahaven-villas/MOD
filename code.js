// ==============================================================================
// MOD REPORT SYSTEM - BACKEND (code.js) - PHASE 1: HARDENED & OPTIMIZED
// Seahaven by Kamuela - Bali
// ==============================================================================

var TEMPLATE_DOC_ID = '1Wsb9mMfI1n7zQMW1TO1LzeWvoq82q4NaOkzhl0WN5Ns';
var REPORT_SHEET_NAME = 'MOD_Reports';
var ISSUE_SHEET_NAME = 'MOD_Issues';

var PA_MASTER_ROWS = [
  ["TOTEM & ENTRANCE", "Villa Entrance – Main Road"], ["TOTEM & ENTRANCE", "Villa Totem Main Entrance"],
  ["TOTEM & ENTRANCE", "Entrance Pathway"], ["GENSET", "Genset Building Front Side"],
  ["GENSET", "Genset Building Inside"], ["GARDEN & PATHWAY", "Pond (water flow)"],
  ["TOTEM & ENTRANCE", "Kamuela Sign Board"], ["GARDEN & PATHWAY", "Main Pathway"],
  ["GARDEN & PATHWAY", "Main Pathway Signage"], ["GARDEN & PATHWAY", "Garden Main Pathway"],
  ["GARDEN & PATHWAY", "Corridor AB & Garden"], ["GARDEN & PATHWAY", "Signage"],
  ["GARDEN & PATHWAY", "Corridor CD & Garden"], ["GARDEN & PATHWAY", "Temple"],
  ["MAIN POOL", "Pool Deck, Wall, Rim"], ["MAIN POOL", "Pool Sun Bed & Cushion"],
  ["MAIN POOL", "Main Swimming Pool"], ["MAIN POOL", "Pool Signage"],
  ["GARDEN & PATHWAY", "Garden Building Levithia"], ["GARDEN & PATHWAY", "The River"],
  ["GARDEN & PATHWAY", "Garden River Side"], ["GARDEN & PATHWAY", "Drainage next to the restaurant"],
  ["ALL", "All Lamp/Lighting"]
];

var BOH_MASTER_ROWS = [
  ["OFFICE", "Staircase"], ["OFFICE", "ITM Office"], ["OFFICE", "GM Office"], ["OFFICE", "HRM Office"],
  ["OFFICE", "PRC/PRM Office"], ["OFFICE", "CA Office"], ["OFFICE", "Accounting Office area"],
  ["OFFICE", "Meeting Area"], ["OFFICE", "Terrace Garden"], ["OFFICE", "Toilet 2nd floor"],
  ["OFFICE", "Curtain"], ["OFFICE", "Canteen"], ["OFFICE", "Corridor"], ["OFFICE", "PABX"],
  ["OFFICE", "Locker"], ["OFFICE", "Staff Toilet"], ["OFFICE", "Main Corridor"], ["OFFICE", "General Store"],
  ["OFFICE", "F&B Store"], ["OFFICE", "Linen Store"], ["OFFICE", "Laundry Machine & Area"],
  ["OFFICE", "Petrol Tank & Area"], ["OFFICE", "Genset Room"], ["OFFICE", "Garbage Area"],
  ["OFFICE", "Roof top floor next to GM’s office"], ["OFFICE", "Garden next to Executive Office"],
  ["OFFICE", "Roof (Any Leaking)?"], ["LOBBY AREA", "Drop Off"], ["LOBBY AREA", "Receiving Area"],
  ["LOBBY AREA", "Reception Counter"], ["LOBBY AREA", "Fresh Flower"], ["LOBBY AREA", "Lobby Toilet"],
  ["OFFICE & LOBBY AREA", "All Lamp/Lighting"]
];

var REST_MASTER_ROWS = [
  ["KITCHEN", "Cabinet"], ["KITCHEN", "Freezer"], ["KITCHEN", "Chiller"], ["KITCHEN", "Sink"],
  ["KITCHEN", "Stove with Oven"], ["KITCHEN", "Deep Fryer"], ["KITCHEN", "Wok"], ["KITCHEN", "Ceiling"],
  ["KITCHEN", "Floor"], ["KITCHEN", "Gutter & Grease Trap"], ["BAR", "Restaurant Entrance-Signage"],
  ["BAR", "Restaurant Level 2 & Fan"], ["BAR", "Restaurant Level 1 & Fan"], ["BAR", "Restaurant Toilet"],
  ["BAR", "Restaurant Bar"], ["BAR & KITCHEN", "All Lamp/Lighting"]
];

var VILLA_MASTER_ROWS = [
  ["1st Floor", "Entrance"], ["1st Floor", "Garden Entrance"], ["1st Floor", "Main Door & Villa Number"],
  ["1st Floor", "Clay Pot Décor / Gentong"], ["1st Floor", "Pool"], ["1st Floor", "Kitchenette & Table"],
  ["1st Floor", "Refrigerator & Cabinet"], ["1st Floor", "Blind Curtain"], ["1st Floor", "Induction is Working"],
  ["1st Floor", "Sink"], ["1st Floor", "Kitchen Tools (Pot, Pan, Etc)"], ["1st Floor", "Cleaning Supplies"],
  ["1st Floor", "2 Bottles of Water 1000ml"], ["1st Floor", "Kitchen Shelves"], ["1st Floor", "Kitchen Drawer"],
  ["1st Floor", "Grease Trap"], ["1st Floor", "Dining Table"], ["1st Floor", "Emergency Signage"],
  ["1st Floor", "APAR"], ["1st Floor", "Door Handle & Key Lock"], ["1st Floor", "Toilet & Sanitary Ware"],
  ["1st Floor", "Living Room Area"], ["1st Floor", "Fan"], ["1st Floor", "Air Conditioning (AC)"],
  ["1st Floor", "TV & Channel Card"], ["1st Floor", "Telephone"], ["1st Floor", "Side Standing Lamp"],
  ["1st Floor", "Cactus Plant"], ["1st Floor", "Wooden Pool Deck"], ["1st Floor", "Garden, Grass"],
  ["1st Floor", "Pump Room Steel Black"], ["1st Floor", "Wooden Bench Pool"], ["1st Floor", "All Lamp/Lighting"],
  ["2nd Floor", "Hanging Balls Decoration"], ["2nd Floor", "Staircase"], ["2nd Floor", "Wardrobe"],
  ["2nd Floor", "Kimono & Hanger"], ["2nd Floor", "Sleepers"], ["2nd Floor", "Laundry Bag"],
  ["2nd Floor", "Laundry List"], ["2nd Floor", "Pencil"], ["2nd Floor", "Safe Deposit Box"],
  ["2nd Floor", "Cabinet"], ["2nd Floor", "2nd Floor Bathroom Area"], ["2nd Floor", "Amenities – Check Standard"],
  ["2nd Floor", "Tissue Box"], ["2nd Floor", "Hair Dryer"], ["2nd Floor", "Face Towels"],
  ["2nd Floor", "Hand Towels"], ["2nd Floor", "Bath Towels"], ["2nd Floor", "Water Closet"],
  ["2nd Floor", "Spray Jet"], ["2nd Floor", "Toilet Paper"], ["2nd Floor", "Bath Tub"],
  ["2nd Floor", "Glass Window"], ["2nd Floor", "Blind Curtain"], ["2nd Floor", "Bath Soap"],
  ["2nd Floor", "Shower Head, Upper Side"], ["2nd Floor", "Hand Shower"], ["2nd Floor", "Soap, Shampoo"],
  ["2nd Floor", "Drainage"], ["2nd Floor", "TV & Channels Card"], ["2nd Floor", "Curtain"],
  ["2nd Floor", "Inner Curtain"], ["2nd Floor", "Air Conditioning/AC"], ["2nd Floor", "Bed"],
  ["2nd Floor", "2 Large Pillow & Cover"], ["2nd Floor", "2 Small Pillow & Cover"], ["2nd Floor", "Duvet"],
  ["2nd Floor", "Bed Sheet"], ["2nd Floor", "Bed Wooden Frame"], ["2nd Floor", "Below Bed"],
  ["2nd Floor", "Bottle of water 600mll"], ["2nd Floor", "Jacuzzi"], ["2nd Floor", "Check Hot Water"],
  ["2nd Floor", "Terrace to main Pool (D)"], ["2nd Floor", "Garden"], ["2nd Floor", "Curb Ramp"],
  ["2nd Floor", "Wooden Decorative Wall"], ["2nd Floor", "Back Villa Wall (wall facing to the main pool)"],
  ["2nd Floor", "All Lamp/Lighting"]
];

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
 * 2A. Autentikasi Login Google Workspace Official (@seahavenvillas.com)
 */
function checkGoogleWorkspaceLogin() {
  const email = Session.getActiveUser().getEmail();
  if (!email) {
    return {
      status: 'Failed',
      message: 'Sesi Google tidak terdeteksi. Pastikan Anda login menggunakan akun Google Workspace Seahaven atau gunakan Username & Password.'
    };
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Users_HOD');
  if (!sheet) {
    return { status: 'Error', message: 'Sheet Users_HOD tidak ditemukan!' };
  }

  const data = sheet.getDataRange().getValues();
  data.shift();

  const user = data.find(row => {
    const colA = String(row[0] || '').trim().toLowerCase();
    const colF = String(row[5] || '').trim().toLowerCase();
    const isActive = String(row[4] || '').trim().toLowerCase() === 'active';
    return isActive && (colA === email.toLowerCase() || colF === email.toLowerCase());
  });

  if (user) {
    return {
      status: 'Success',
      userData: { username: email, fullName: user[2], position: user[3] }
    };
  } else if (email.toLowerCase().endsWith('@seahavenvillas.com')) {
    const namePart = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return {
      status: 'Success',
      userData: { username: email, fullName: namePart, position: 'MOD / HOD' }
    };
  } else {
    return {
      status: 'Failed',
      message: `Akun Google (${email}) tidak terdaftar di Users_HOD. Gunakan email official Seahaven atau login manual.`
    };
  }
}

/**
 * 2B. Autentikasi Login Manual (Username & Password di sheet Users_HOD)
 */
function checkHODLogin(username, password) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Users_HOD');
  if (!sheet) {
    return { status: 'Error', message: 'Sheet Users_HOD tidak ditemukan!' };
  }
  
  const data = sheet.getDataRange().getValues();
  data.shift();
  
  const user = data.find(row => 
    String(row[0]).trim().toLowerCase() === String(username).trim().toLowerCase() && 
    String(row[1]).trim() === String(password).trim() && 
    String(row[4]).trim().toLowerCase() === 'active'
  );
  
  if (user) {
    return {
      status: 'Success',
      userData: { username: user[0], fullName: user[2], position: user[3] }
    };
  } else {
    return { status: 'Failed', message: 'Username atau Password salah (atau akun belum Aktif)!' };
  }
}

/**
 * 2C. Single Bootstrap Endpoint (Untuk UI Phase 2 - Sekali Panggil Saat Masuk Dashboard)
 */
function getInitialDashboardData() {
  const issues = getHistoryIssues();
  const openCount = issues.filter(i => i.issueStatus === 'Open').length;
  return {
    hodEmails: getHODEmailsList(),
    openIssueCount: openCount,
    masterChecklist: {
      pa: PA_MASTER_ROWS,
      boh: BOH_MASTER_ROWS,
      rest: REST_MASTER_ROWS,
      villa: VILLA_MASTER_ROWS
    }
  };
}

/**
 * Ambil Daftar Email HOD dari Sheet Users_HOD untuk Preset Kirim Email
 */
function getHODEmailsList() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Users_HOD');
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  data.shift();
  const list = [];
  data.forEach(row => {
    const isActive = String(row[4] || '').trim().toLowerCase() === 'active';
    const email = String(row[5] || (String(row[0]).includes('@') ? row[0] : '')).trim();
    if (isActive && email) {
      list.push({ name: row[2], position: row[3], email: email });
    }
  });
  return list;
}

/**
 * 3. Inisialisasi Sheet Database MOD_Reports & MOD_Issues
 */
function getOrCreateReportSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(REPORT_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(REPORT_SHEET_NAME);
    const headers = [
      'Report_ID', 'DayDate', 'Time', 'ModName', 'ModPosition', 
      'Status_Doc', 'Last_Updated', 'Villas_Checked', 'PDF_Url', 'JSON_Payload'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getOrCreateIssueSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(ISSUE_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(ISSUE_SHEET_NAME);
    const headers = [
      'Issue_ID', 'Report_ID', 'DayDate', 'ModName', 'Area_Category',
      'Sub_Area_Unit', 'Item_Checklist', 'Notes', 'Issue_Status', 'Created_At'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * 4A. Ambil Daftar Ringkasan Riwayat Laporan
 */
function getMODReports() {
  const sheet = getOrCreateReportSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];
  
  const data = sheet.getRange(2, 1, lastRow - 1, 9).getDisplayValues();
  const reports = [];
  
  for (let i = data.length - 1; i >= 0; i--) {
    reports.push({
      reportId: data[i][0] || '',
      dayDate: data[i][1] || '',
      time: data[i][2] || '',
      modName: data[i][3] || '',
      modPosition: data[i][4] || '',
      statusDoc: data[i][5] || 'Draft',
      lastUpdated: data[i][6] || '',
      villasChecked: data[i][7] || '',
      pdfUrl: data[i][8] || ''
    });
  }
  return reports;
}

/**
 * 4B. Ambil Detail JSON Payload Hanya Saat Tombol "Edit" Ditekan
 */
function getReportPayloadById(reportId) {
  const sheet = getOrCreateReportSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return null;

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(reportId)) {
      const jsonStr = sheet.getRange(i + 2, 10).getValue();
      const pdfUrl = sheet.getRange(i + 2, 9).getDisplayValue();
      const lastUpdated = sheet.getRange(i + 2, 7).getDisplayValue();
      return {
        payload: jsonStr ? JSON.parse(jsonStr) : null,
        pdfUrl: pdfUrl,
        lastUpdated: lastUpdated
      };
    }
  }
  return null;
}

/**
 * 5. Simpan / Update Data Checklist 1-8 + Ekstrak Otomatis Item Berstatus "Issue" ke MOD_Issues
 *    Dilindungi LockService untuk mencegah data tumpang tindih.
 */
function saveMODDraft(payload) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);

    const sheet = getOrCreateReportSheet();
    const lastRow = sheet.getLastRow();
    const tz = Session.getScriptTimeZone();
    const now = Utilities.formatDate(new Date(), tz, 'dd MMM yyyy HH:mm');
    
    const villasList = (payload.villas || [])
      .map(v => v.name)
      .filter(n => n)
      .join(', ');

    let targetRow = -1;
    let currentStatusDoc = 'Draft';

    if (payload.reportId && lastRow > 1) {
      const meta = sheet.getRange(2, 1, lastRow - 1, 6).getDisplayValues();
      for (let i = 0; i < meta.length; i++) {
        if (meta[i][0] === payload.reportId) {
          targetRow = i + 2;
          currentStatusDoc = meta[i][5] || 'Draft';
          break;
        }
      }
    } else {
      payload.reportId = 'MOD-' + Utilities.formatDate(new Date(), tz, 'yyyyMMdd-HHmmss');
    }

    const rowValues = [
      payload.reportId,
      payload.header.DayDate || '',
      payload.header.Time || '',
      payload.header.ModName || '',
      payload.header.ModPosition || '',
      currentStatusDoc,
      now,
      villasList || 'Belum ada villa',
      payload.pdfUrl || '',
      JSON.stringify(payload)
    ];

    if (targetRow > 0) {
      sheet.getRange(targetRow, 1, 1, rowValues.length).setValues([rowValues]);
    } else {
      sheet.appendRow(rowValues);
    }

    // Sinkronisasi otomatis semua item dengan status "Issue" ke sheet MOD_Issues
    const issueCount = syncIssuesFromPayload(payload, now);

    return { status: 'Success', reportId: payload.reportId, lastUpdated: now, issueCount: issueCount };
  } catch (e) {
    throw new Error('Server sibuk saat menyimpan data, silakan coba sesaat lagi. (' + e.message + ')');
  } finally {
    lock.releaseLock();
  }
}

/**
 * Sinkronisasi Item Berstatus "Issue" ke Sheet MOD_Issues (Safe Incremental Update)
 */
function syncIssuesFromPayload(payload, timestamp) {
  const issueSheet = getOrCreateIssueSheet();
  const lastRow = issueSheet.getLastRow();
  const existingStatusMap = {};
  const keepRows = [];

  // Pisahkan baris milik report lain agar tidak terhapus, dan simpan status Resolved untuk report ini
  if (lastRow > 1) {
    const oldData = issueSheet.getRange(2, 1, lastRow - 1, 10).getValues();
    oldData.forEach(r => {
      if (String(r[1]) === String(payload.reportId)) {
        existingStatusMap[String(r[0])] = r[8];
      } else {
        keepRows.push(r);
      }
    });
  }

  const newIssues = [];
  const pushIfIssue = (areaCategory, subAreaUnit, itemName, itemObj, codeSuffix) => {
    if (itemObj && String(itemObj.status).trim() === 'Issue') {
      const issueId = `${payload.reportId}-${codeSuffix}`;
      const prevStatus = existingStatusMap[issueId] || 'Open';
      newIssues.push([
        issueId,
        payload.reportId,
        payload.header.DayDate || '',
        payload.header.ModName || '',
        areaCategory,
        subAreaUnit,
        itemName,
        itemObj.notes || '-',
        prevStatus,
        timestamp
      ]);
    }
  };

  // 1. Public Area
  (payload.pa || []).forEach((it, idx) => {
    const m = PA_MASTER_ROWS[idx] || ['PUBLIC AREA', 'Item #' + (idx + 1)];
    pushIfIssue('Public Area Issue', m[0], m[1], it, `PA-${idx + 1}`);
  });

  // 2. BOH & Lobby Area
  (payload.boh || []).forEach((it, idx) => {
    const m = BOH_MASTER_ROWS[idx] || ['BOH & LOBBY', 'Item #' + (idx + 1)];
    pushIfIssue('BOH & Lobby Area Issue', m[0], m[1], it, `BOH-${idx + 1}`);
  });

  // 3. Restaurant
  (payload.rest || []).forEach((it, idx) => {
    const m = REST_MASTER_ROWS[idx] || ['RESTAURANT', 'Item #' + (idx + 1)];
    pushIfIssue('Restaurant Issue', m[0], m[1], it, `REST-${idx + 1}`);
  });

  // 4. Villa Checklist
  (payload.villas || []).forEach((v, vIdx) => {
    const vName = v.name || `Villa #${vIdx + 1}`;
    (v.items || []).forEach((it, idx) => {
      const m = VILLA_MASTER_ROWS[idx] || ['Villa', 'Item #' + (idx + 1)];
      pushIfIssue('Villa Issue', `${vName} (${m[0]})`, m[1], it, `V${vIdx + 1}-${idx + 1}`);
    });
  });

  const combinedRows = keepRows.concat(newIssues);

  // Tulis ulang baris data secara utuh dan bersih
  if (lastRow > 1) {
    issueSheet.getRange(2, 1, lastRow - 1, 10).clearContent();
  }
  if (combinedRows.length > 0) {
    issueSheet.getRange(2, 1, combinedRows.length, 10).setValues(combinedRows);
  }

  return newIssues.length;
}

/**
 * Ambil Semua Data History Issue untuk Menu Sidebar "History Issue"
 */
function getHistoryIssues() {
  const sheet = getOrCreateIssueSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];

  const data = sheet.getRange(2, 1, lastRow - 1, 10).getDisplayValues();
  const issues = [];
  for (let i = data.length - 1; i >= 0; i--) {
    if (!data[i][0]) continue;
    issues.push({
      issueId: data[i][0] || '',
      reportId: data[i][1] || '',
      dayDate: data[i][2] || '',
      modName: data[i][3] || '',
      areaCategory: data[i][4] || '',
      subAreaUnit: data[i][5] || '',
      itemChecklist: data[i][6] || '',
      notes: data[i][7] || '-',
      issueStatus: data[i][8] || 'Open',
      createdAt: data[i][9] || ''
    });
  }
  return issues;
}

/**
 * Update Status Tindak Lanjut Issue (Open <-> Resolved) dengan LockService
 */
function updateIssueStatus(issueId, newStatus) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const sheet = getOrCreateIssueSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return { status: 'Error' };

    const ids = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
    for (let i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === String(issueId)) {
        sheet.getRange(i + 2, 9).setValue(newStatus);
        return { status: 'Success' };
      }
    }
    return { status: 'NotFound' };
  } finally {
    lock.releaseLock();
  }
}

/**
 * Helper Keamanan Sharing Drive File (Batasi ke Domain Internal Seahaven)
 */
function applyInternalDriveSharing(file) {
  try {
    file.setSharing(DriveApp.Access.DOMAIN_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {
    // Fallback jika dijalankan dari akun non-Google Workspace (tetap Restricted ke internal folder)
    console.warn('DOMAIN_WITH_LINK tidak didukung pada akun ini, menggunakan izin default folder.');
  }
}

/**
 * Export PDF Khusus Rekap Issue Terpilih & Kembalikan Base64 + URL Drive
 */
function generateIssuePDFReport(selectedIssues, areaFilterLabel) {
  if (!selectedIssues || selectedIssues.length === 0) {
    throw new Error('Pilih minimal 1 item issue untuk di-export ke PDF.');
  }

  const templateFile = DriveApp.getFileById(TEMPLATE_DOC_ID);
  const parentFolder = templateFile.getParents().hasNext() ? templateFile.getParents().next() : DriveApp.getRootFolder();
  const dateStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd-MMM-yyyy_HHmm');
  const titleLabel = areaFilterLabel || 'All Areas';
  const fileName = `MOD_Issue_Report_${titleLabel.replace(/[^a-zA-Z0-9]/g, '_')}_${dateStr}`;

  const doc = DocumentApp.create(fileName);
  const docFile = DriveApp.getFileById(doc.getId());
  parentFolder.addFile(docFile);
  DriveApp.getRootFolder().removeFile(docFile);

  const body = doc.getBody();
  body.setMarginTop(36).setMarginBottom(36).setMarginLeft(36).setMarginRight(36);

  // Header Dokumen Seahaven
  const headerTitle = body.appendParagraph('SEAHAVEN VILLAS BY KAMUELA');
  headerTitle.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  headerTitle.editAsText().setForegroundColor('#17431f').setBold(true).setFontSize(16);

  const subTitle = body.appendParagraph(`MOD ISSUE & DEFECT FOLLOW-UP REPORT (${titleLabel.toUpperCase()})`);
  subTitle.editAsText().setForegroundColor('#991b1b').setBold(true).setFontSize(11);

  const metaPara = body.appendParagraph(
    `Generated Date: ${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd MMM yyyy HH:mm')}   |   Total Issues: ${selectedIssues.length} Item(s)\n`
  );
  metaPara.editAsText().setForegroundColor('#475569').setFontSize(9);

  // Tabel Rekap Issue
  const tableRows = [
    ['NO', 'DATE / MOD', 'AREA CATEGORY', 'LOCATION / UNIT', 'ITEM CHECKLIST', 'ISSUE NOTES', 'STATUS']
  ];

  selectedIssues.forEach((it, idx) => {
    tableRows.push([
      String(idx + 1),
      `${it.dayDate}\n(${it.modName})`,
      it.areaCategory.replace(' Issue', ''),
      it.subAreaUnit,
      it.itemChecklist,
      it.notes || '-',
      it.issueStatus || 'Open'
    ]);
  });

  const table = body.appendTable(tableRows);
  table.setBorderColor('#cbd5e1');
  table.setBorderWidth(0.5);

  const colWidths = [25, 80, 75, 85, 95, 115, 45];
  for (let r = 0; r < table.getNumRows(); r++) {
    const row = table.getRow(r);
    for (let c = 0; c < row.getNumCells(); c++) {
      const cell = row.getCell(c);
      cell.setWidth(colWidths[c]);
      cell.setPaddingTop(4).setPaddingBottom(4).setPaddingLeft(4).setPaddingRight(4);
      const txt = cell.editAsText();
      txt.setFontFamily('Arial').setFontSize(8.5);
      if (r === 0) {
        cell.setBackgroundColor('#17431f');
        txt.setBold(true).setForegroundColor('#ffffff');
      } else {
        if (r % 2 === 0) cell.setBackgroundColor('#f8fafc');
        txt.setBold(c === 6).setForegroundColor(c === 6 ? '#991b1b' : '#1e293b');
      }
    }
  }

  const footerPara = body.appendParagraph('\nNote: Mohon kepada HOD terkait (Engineering / Housekeeping / Operational) untuk segera menindaklanjuti daftar issue di atas.');
  footerPara.editAsText().setItalic(true).setFontSize(8.5).setForegroundColor('#64748b');

  doc.saveAndClose();

  const pdfBlob = docFile.getAs(MimeType.PDF);
  const pdfFile = parentFolder.createFile(pdfBlob).setName(fileName + '.pdf');
  applyInternalDriveSharing(pdfFile);
  docFile.setTrashed(true);

  return {
    status: 'Success',
    pdfUrl: pdfFile.getUrl(),
    fileId: pdfFile.getId(),
    pdfBase64: Utilities.base64Encode(pdfBlob.getBytes())
  };
}

/**
 * Kirim PDF Rekap Issue via Email ke HOD (Engineering / Housekeeping / All HOD)
 */
function sendIssueReportEmail(pdfFileId, recipientEmail, ccEmail, subjectTitle, customMessage) {
  if (!pdfFileId) throw new Error('File PDF Issue belum tersedia.');
  const pdfFile = DriveApp.getFileById(pdfFileId);

  const mailOptions = {
    attachments: [pdfFile.getAs(MimeType.PDF)],
    name: 'Seahaven Villas - MOD Issue Tracker'
  };
  if (ccEmail) mailOptions.cc = ccEmail;

  const bodyText = customMessage || `Dear HOD Team,\n\nTerlampir adalah daftar temuan MOD Issue Checklist yang memerlukan tindak lanjut dari departemen terkait.\n\nTerima kasih,\nMOD Seahaven Villas`;
  GmailApp.sendEmail(recipientEmail, subjectTitle || 'MOD Issue Follow-Up Report - Seahaven', bodyText, mailOptions);

  return { status: 'Success' };
}

/**
 * 6. Export All Data PDF Utama (1-8 Kategori)
 */
function generatePDFReport(reportId, returnBase64) {
  const sheet = getOrCreateReportSheet();
  let targetRow = -1;
  let payload = null;

  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const ids = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
    for (let i = 0; i < ids.length; i++) {
      if (ids[i][0] === reportId) {
        targetRow = i + 2;
        const jsonVal = sheet.getRange(targetRow, 10).getValue();
        payload = jsonVal ? JSON.parse(jsonVal) : null;
        break;
      }
    }
  }

  if (!payload) throw new Error('Data laporan tidak ditemukan.');

  const templateFile = DriveApp.getFileById(TEMPLATE_DOC_ID);
  const parentFolder = templateFile.getParents().hasNext() ? templateFile.getParents().next() : DriveApp.getRootFolder();
  
  const fileName = `MOD_Report_${payload.header.DayDate || reportId}_${payload.header.ModName || 'Seahaven'}`;
  const tempCopy = templateFile.makeCopy(fileName, parentFolder);
  const doc = DocumentApp.openById(tempCopy.getId());
  const body = doc.getBody();

  const v1 = (payload.villas && payload.villas[0]) ? payload.villas[0] : { name: 'N/A', items: [] };
  const v2 = (payload.villas && payload.villas[1]) ? payload.villas[1] : { name: 'N/A', items: [] };

  const simpleFields = {
    ...payload.header,
    ...payload.forecast,
    ...payload.comments,
    Villa1_Name: v1.name || 'N/A',
    Villa2_Name: v2.name || 'N/A'
  };

  for (const [key, val] of Object.entries(simpleFields)) {
    body.replaceText(`\\{\\{${key}\\}\\}`, String(val || '-'));
  }

  const tables = body.getTables();
  let villa2Table = null;

  for (let t = 0; t < tables.length; t++) {
    const table = tables[t];
    const txt = table.getText();

    if (txt.includes('{{PA_S1}}')) {
      fillTableSmart(table, payload.pa || [], 'PA');
    } else if (txt.includes('{{BOH_S1}}')) {
      fillTableSmart(table, payload.boh || [], 'BOH');
    } else if (txt.includes('{{REST_S1}}')) {
      fillTableSmart(table, payload.rest || [], 'REST');
    } else if (txt.includes('{{V1_S1}}')) {
      fillTableSmart(table, v1.items || [], 'V1');
    } else if (txt.includes('{{V2_S1}}')) {
      fillTableSmart(table, v2.items || [], 'V2');
      villa2Table = table;
    } else if (txt.includes('{{Staff_Dept}}')) {
      populateStaffTableFast(table, payload.staff || []);
    }
  }

  if (payload.villas && payload.villas.length > 2 && villa2Table) {
    let insertIndex = body.getChildIndex(villa2Table) + 1;
    payload.villas.slice(2).forEach((v, idx) => {
      const villaNum = idx + 3;
      const pTitle = body.insertParagraph(insertIndex++, `\nVILLA Checklist #${villaNum} - ${v.name || 'N/A'}`);
      pTitle.setHeading(DocumentApp.ParagraphHeading.HEADING3);
      pTitle.editAsText().setForegroundColor('#17431f').setBold(true);

      const rowsData = [['FLOOR', 'ITEM CHECKLIST', 'STATUS', 'NOTES']];
      VILLA_MASTER_ROWS.forEach((mRow, rIdx) => {
        const itemData = (v.items && v.items[rIdx]) ? v.items[rIdx] : { status: '', notes: '' };
        rowsData.push([
          mRow[0],
          mRow[1],
          itemData.status || '-',
          itemData.notes || '-'
        ]);
      });

      const newTable = body.insertTable(insertIndex++, rowsData);
      styleGeneratedVillaTable(newTable);
    });
  }

  doc.saveAndClose();

  const pdfBlob = tempCopy.getAs(MimeType.PDF);
  const pdfFile = parentFolder.createFile(pdfBlob).setName(fileName + '.pdf');
  applyInternalDriveSharing(pdfFile);
  tempCopy.setTrashed(true);

  const pdfUrl = pdfFile.getUrl();
  if (targetRow > 0) {
    sheet.getRange(targetRow, 6).setValue('Final / PDF Generated');
    sheet.getRange(targetRow, 9).setValue(pdfUrl);
  }

  return {
    status: 'Success',
    pdfUrl: pdfUrl,
    fileId: pdfFile.getId(),
    pdfBase64: returnBase64 ? Utilities.base64Encode(pdfBlob.getBytes()) : ''
  };
}

function fillTableSmart(table, items, prefix) {
  const numRows = table.getNumRows();
  let statusCol = -1;
  let notesCol = -1;

  if (numRows > 1) {
    const sampleRow = table.getRow(1);
    const numCols = sampleRow.getNumCells();
    for (let c = 0; c < numCols; c++) {
      const cellTxt = sampleRow.getCell(c).getText();
      if (cellTxt.includes(`{{${prefix}_S`)) statusCol = c;
      if (cellTxt.includes(`{{${prefix}_N`)) notesCol = c;
    }
  }

  if (statusCol === -1 || notesCol === -1) {
    const lastCol = table.getRow(0).getNumCells() - 1;
    notesCol = lastCol;
    statusCol = lastCol - 1;
  }

  for (let r = 1; r < numRows; r++) {
    const item = items[r - 1] || { status: '', notes: '' };
    const row = table.getRow(r);
    if (statusCol >= 0 && statusCol < row.getNumCells()) {
      row.getCell(statusCol).setText(item.status || '-');
    }
    if (notesCol >= 0 && notesCol < row.getNumCells()) {
      row.getCell(notesCol).setText(item.notes || '-');
    }
  }
}

function styleGeneratedVillaTable(table) {
  table.setBorderColor('#cbd5e1');
  table.setBorderWidth(0.5);
  const numRows = table.getNumRows();
  for (let r = 0; r < numRows; r++) {
    const row = table.getRow(r);
    const numCols = row.getNumCells();
    for (let c = 0; c < numCols; c++) {
      const cell = row.getCell(c);
      cell.setPaddingTop(3).setPaddingBottom(3).setPaddingLeft(5).setPaddingRight(5);
      const text = cell.editAsText();
      text.setFontSize(8.5).setFontFamily('Arial');
      if (r === 0) {
        cell.setBackgroundColor('#f1f5f9');
        text.setBold(true).setForegroundColor('#1e293b');
      } else {
        text.setBold(false).setForegroundColor('#334155');
      }
    }
  }
}

function populateStaffTableFast(table, staffList) {
  const templateRow = table.getRow(1);
  if (!staffList || staffList.length === 0) {
    templateRow.getCell(0).setText('-');
    templateRow.getCell(1).setText('-');
    templateRow.getCell(2).setText('-');
    return;
  }
  staffList.forEach((st, idx) => {
    const row = idx === 0 ? templateRow : table.appendTableRow(templateRow.copy());
    row.getCell(0).setText(st.dept || '-');
    row.getCell(1).setText(st.name || '-');
    row.getCell(2).setText(st.shift || '-');
  });
}

function sendReportEmail(reportId, recipientEmail, ccEmail, customMessage) {
  const sheet = getOrCreateReportSheet();
  const lastRow = sheet.getLastRow();
  let pdfUrl = '';
  let reportTitle = reportId;
  let targetRow = -1;

  if (lastRow > 1) {
    const rows = sheet.getRange(2, 1, lastRow - 1, 9).getDisplayValues();
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === reportId) {
        targetRow = i + 2;
        pdfUrl = rows[i][8];
        reportTitle = `MOD Report - ${rows[i][1]} (${rows[i][3]})`;
        break;
      }
    }
  }

  if (!pdfUrl) {
    throw new Error('Silakan klik "Export All Data PDF" terlebih dahulu sebelum mengirim email.');
  }

  const match = pdfUrl.match(/[-\w]{25,}/);
  const fileId = match ? match[0] : '';
  const pdfFile = DriveApp.getFileById(fileId);

  const mailOptions = {
    attachments: [pdfFile.getAs(MimeType.PDF)],
    name: 'Seahaven Villas - MOD System'
  };
  if (ccEmail) mailOptions.cc = ccEmail;

  const bodyText = customMessage || `Dear Team,\n\nTerlampir adalah laporan MOD Report Checklist untuk Seahaven Villas (${reportTitle}).\n\nTerima kasih.`;
  GmailApp.sendEmail(recipientEmail, reportTitle, bodyText, mailOptions);

  if (targetRow > 0) {
    sheet.getRange(targetRow, 6).setValue('Sent via Email');
  }
  return { status: 'Success' };
}