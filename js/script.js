console.log("script.js 加载中...");

let shiftOptionsGroups = {};
let shiftDetailsDictionary = {};

async function loadCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const text = await response.text();
    const result = Papa.parse(text, { header: true, skipEmptyLines: true });
    return result.data;
  } catch (error) {
    console.error(`Error loading CSV from ${url}:`, error);
    return [];
  }
}

function parseOptionsCSV(data) {
  const groups = {};
  if (!data.length) return groups;

  const headers = Object.keys(data[0]);
  headers.forEach((header) => {
    const [depot, dayType, schoolHoliday] =
      header
        .match(
          /(greerton|papamoa|maleme|standby)(Weekday|Weekend)SchoolHoliday(True|False)/i
        )
        ?.slice(1) || [];
    if (!depot) return;

    const depotKey =
      schoolHoliday === "True" ? `${depot}-schoolHoliday` : depot;
    if (!groups[depotKey]) {
      groups[depotKey] = { weekday: [], weekend: [] };
    }
    const dayKey = dayType.toLowerCase();
    data.forEach((row) => {
      if (row[header] && !groups[depotKey][dayKey].includes(row[header])) {
        groups[depotKey][dayKey].push(row[header]);
      }
    });
  });
  return groups;
}

function parseShiftsCSV(data) {
  const dictionary = {
    "": {
      signOn1: "none",
      signOff1: "none",
      signOn2: "none",
      signOff2: "none",
      mealLocation: "无",
      mealStart: "none",
      mealFinish: "none",
      mealDuration: "无",
    },
    OFF: {
      signOn1: "none",
      signOff1: "none",
      signOn2: "none",
      signOff2: "none",
      mealLocation: "无",
      mealStart: "none",
      mealFinish: "none",
      mealDuration: "无",
    },
  };
  data.forEach((row) => {
    dictionary[row.shift] = {
      signOn1: row.signOn1 || "none",
      signOff1: row.signOff1 || "none",
      signOn2: row.signOn2 || "none",
      signOff2: row.signOff2 || "none",
      mealLocation: row.mealLocation || "none",
      mealStart: row.mealStart || "none",
      mealFinish: row.mealFinish || "none",
      mealDuration: row.mealDuration || "none",
    };
  });
  return dictionary;
}

async function initData() {
  const optionsData = await loadCSV("./data/options.csv");
  const shiftsData = await loadCSV("./data/shifts.csv");
  shiftOptionsGroups = parseOptionsCSV(optionsData);
  shiftDetailsDictionary = parseShiftsCSV(shiftsData);
  console.log("已加载 options.csv:", shiftOptionsGroups);
  console.log("已加载 shifts.csv:", shiftDetailsDictionary);
}

initData().catch((error) => console.error("Initialization failed:", error));

const appVersion = "v0.6.0";
const shiftDetailsVersion = "28.01.2025";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");

  document.querySelector("#depot-prompt").innerHTML += `<p>app version: ${appVersion}</p>`;
  document.querySelector("#depot-prompt").innerHTML += `<p>shift details database version: ${shiftDetailsVersion}</p>`;

  // 获取 DOM 元素
  const schoolHolidaySwitch = document.getElementById("school-holiday-switch");
  const greertonDepotButton = document.getElementById("greerton-depot");
  const papamoaDepotButton = document.getElementById("papamoa-depot");
  const malemeDepotButton = document.getElementById("maleme-depot");
  const standbyDepotButton = document.getElementById("standby-depot");
  const backToDepotFromForm = document.getElementById("back-to-depot-selection-from-form");
  const backToDepotSelectionButton = document.getElementById("back-to-depot-selection");
  const depotSelectionUI = document.getElementById("depot-selection-ui");
  const weekDateSelector = document.getElementById("week-date-selector");
  const weekStartDateInput = document.getElementById("week-start-date");
  const scheduleWeekView = document.getElementById("schedule-week-view");
  const backToDateSelectorButton = document.getElementById("back-to-date-selector-button");
  const addToCalendarButton = document.getElementById("add-to-calendar-button");
  const aboutSection = document.getElementById("about-section");
  const aboutButton = document.getElementById("about-button");
  const backToDepotFromAboutButton = document.getElementById("back-to-depot-from-about");
  const contactButton = document.getElementById("contact-button");
  const contactSection = document.getElementById("contact-section");
  const resetShiftsButton = document.getElementById("reset-shifts");
  const toggleWeekdaysButton = document.getElementById("toggle-weekdays");
  const restHolidaysSwitch = document.getElementById("reset-holidays");
  const everyDayHolidayCheckbox = {
    sunSlider: document.getElementById("switch-sun"),
    monSlider: document.getElementById("switch-mon"),
    tueSlider: document.getElementById("switch-tue"),
    wedSlider: document.getElementById("switch-wed"),
    thuSlider: document.getElementById("switch-thu"),
    friSlider: document.getElementById("switch-fri"),
    satSlider: document.getElementById("switch-sat")
  }

  const checkboxes = {
    sun: document.getElementById("same-shift-checkbox-sun"),
    mon: document.getElementById("same-shift-checkbox-mon"),
    tue: document.getElementById("same-shift-checkbox-tue"),
    wed: document.getElementById("same-shift-checkbox-wed"),
    thu: document.getElementById("same-shift-checkbox-thu"),
    fri: document.getElementById("same-shift-checkbox-fri"),
    sat: document.getElementById("same-shift-checkbox-sat")
  };
  const shiftSelectors = document.querySelectorAll(".shift-selector");
  const holidaySwitches = document.querySelectorAll(".weekday-holiday-switch input[type='checkbox']");

  let currentDepot = null;
  let isSchoolHolidayEnabled = false;

  // 设置默认日期
  const today = new Date().toISOString().split('T')[0];
  weekStartDateInput.value = today;

  // 更新 Shift 下拉菜单状态
  function updateShiftSelectors() {
    const checkedCheckboxes = Object.entries(checkboxes)
      .filter(([_, checkbox]) => checkbox.checked)
      .map(([day, checkbox]) => ({ day, checkbox }));

    if (checkedCheckboxes.length > 1) {
      // 多个复选框选中时，只有最上面的可操作，其他被选中的禁用
      const topmostIndex = Object.values(checkboxes).findIndex(cb => cb.checked);
      shiftSelectors.forEach((select, index) => {
        const isChecked = checkedCheckboxes.some(cb => cb.checkbox === Object.values(checkboxes)[index]);
        if (isChecked) {
          // 只对被选中的行进行处理
          const isTopmostChecked = index === topmostIndex;
          select.disabled = !isTopmostChecked;
          if (isTopmostChecked) {
            select.addEventListener("change", syncShifts);
          } else {
            select.removeEventListener("change", syncShifts);
          }
        } else {
          // 未选中的行保持可操作
          select.disabled = false;
          select.removeEventListener("change", syncShifts);
        }
      });
    } else {
      // 少于或等于1个选中时，所有 Shift 可操作
      shiftSelectors.forEach(select => {
        select.disabled = false;
        select.removeEventListener("change", syncShifts);
      });
    }

    // 检查 Weekend 和 Weekday 是否同时选中
    const hasWeekend = checkedCheckboxes.some(cb => cb.day === "sun" || cb.day === "sat");
    const hasWeekday = checkedCheckboxes.some(cb => ["mon", "tue", "wed", "thu", "fri"].includes(cb.day));
    if (hasWeekend && hasWeekday) {
      holidaySwitches.forEach((switchInput, index) => {
        const day = ["mon", "tue", "wed", "thu", "fri"][index];
        if (checkboxes[day].checked) {
          switchInput.checked = true;
          updateSingleDayShiftOptions(index + 1);
        }
      });
    }
  }

  // 同步 Shift 选择（只同步被选中的其他行）
  function syncShifts(event) {
    const selectedValue = event.target.value;
    const checkedCheckboxes = Object.entries(checkboxes)
      .filter(([_, checkbox]) => checkbox.checked)
      .map(([day, checkbox]) => checkbox);

    shiftSelectors.forEach((select, index) => {
      const isChecked = checkedCheckboxes.includes(Object.values(checkboxes)[index]);
      if (isChecked && select.disabled) { // 只同步被选中的禁用行
        select.value = selectedValue;
      }
      // 未选中的行保持原有值，不做任何修改
    });
    console.log(`Shift 选择已同步为: ${selectedValue}`);
    checkboxes.sun.checked = false;
    checkboxes.mon.checked = false;
    checkboxes.tue.checked = false;
    checkboxes.wed.checked = false;
    checkboxes.thu.checked = false;
    checkboxes.fri.checked = false;
    checkboxes.sat.checked = false;
    checkboxes.sun.closest("tr").classList.remove("highlight");
    checkboxes.mon.closest("tr").classList.remove("highlight"); 
    checkboxes.tue.closest("tr").classList.remove("highlight");
    checkboxes.wed.closest("tr").classList.remove("highlight");
    checkboxes.thu.closest("tr").classList.remove("highlight");
    checkboxes.fri.closest("tr").classList.remove("highlight");
    checkboxes.sat.closest("tr").classList.remove("highlight");
    shiftSelectors.forEach(select => {
      select.disabled = false;
    }
    );
  }

  // 复选框高亮和状态更新
  Object.values(checkboxes).forEach(checkbox => {
    checkbox.addEventListener("change", function () {
      const row = checkbox.closest("tr");
      if (!row) return;
      if (checkbox.checked) {
        row.classList.add("highlight");
      } else {
        row.classList.remove("highlight");
      }
      updateShiftSelectors();
    });
  });

  // toggle-weekdays 按钮
  toggleWeekdaysButton.addEventListener("click", function () {
    console.log("A/C按钮被点击");
    const anyChecked = Object.values(checkboxes).some(checkbox => checkbox.checked);

    if (anyChecked) {
      Object.values(checkboxes).forEach(checkbox => {
        checkbox.checked = false;
        checkbox.closest("tr").classList.remove("highlight");
      });
    } else {
      checkboxes.mon.checked = true;
      checkboxes.tue.checked = true;
      checkboxes.wed.checked = true;
      checkboxes.thu.checked = true;
      checkboxes.fri.checked = true;
      checkboxes.sun.checked = false;
      checkboxes.sat.checked = false;

      checkboxes.mon.closest("tr").classList.add("highlight");
      checkboxes.tue.closest("tr").classList.add("highlight");
      checkboxes.wed.closest("tr").classList.add("highlight");
      checkboxes.thu.closest("tr").classList.add("highlight");
      checkboxes.fri.closest("tr").classList.add("highlight");
      checkboxes.sun.closest("tr").classList.remove("highlight");
      checkboxes.sat.closest("tr").classList.remove("highlight");
    }
    updateShiftSelectors();
  });

  // reset-shifts 按钮
  resetShiftsButton.addEventListener("click", function () {
    if (confirm("Are you sure you want to reset all shift choices?")) {
      console.log("reset shifts 按钮被点击");
      shiftSelectors.forEach(select => {
        select.value = "";
        select.disabled = false;
      });
      console.log("所有 shift 选择已重置");
    }
  });

  // reset-holiday-switch 按钮
  restHolidaysSwitch.addEventListener("click", function () {
      console.log("reset holiday switch 按钮被点击");
      everyDayHolidayCheckbox.sunSlider.checked = false;
      everyDayHolidayCheckbox.monSlider.checked = false;
      everyDayHolidayCheckbox.tueSlider.checked = false;
      everyDayHolidayCheckbox.wedSlider.checked = false;
      everyDayHolidayCheckbox.thuSlider.checked = false;
      everyDayHolidayCheckbox.friSlider.checked = false;
      everyDayHolidayCheckbox.satSlider.checked = false;
      console.log("所有 weekday holiday switches 已重置");
    }
  );

  // 页面导航（保持不变）
  contactButton.addEventListener("click", () => {
    console.log("Sent Feedback 按钮被点击");
    depotSelectionUI.style.display = "none";
    aboutSection.style.display = "none";
    weekDateSelector.style.display = "none";
    scheduleWeekView.style.display = "none";
    contactSection.style.display = "block";
  });

  backToDepotFromForm.addEventListener("click", () => {
    console.log("Back from Sent Feedback 按钮被点击");
    depotSelectionUI.style.display = "block";
    aboutSection.style.display = "none";
    weekDateSelector.style.display = "none";
    scheduleWeekView.style.display = "none";
    contactSection.style.display = "none";
  });

  aboutButton.addEventListener("click", () => {
    console.log("About 按钮被点击");
    depotSelectionUI.style.display = "none";
    aboutSection.style.display = "block";
    weekDateSelector.style.display = "none";
    scheduleWeekView.style.display = "none";
  });

  backToDepotFromAboutButton.addEventListener("click", () => {
    console.log("Back from About 按钮被点击");
    depotSelectionUI.style.display = "block";
    aboutSection.style.display = "none";
    weekDateSelector.style.display = "none";
    scheduleWeekView.style.display = "none";
  });

  // School Holiday 开关
  schoolHolidaySwitch.addEventListener("change", function (event) {
    isSchoolHolidayEnabled = event.target.checked;
    console.log("School Holiday Switch 状态改变:", isSchoolHolidayEnabled);
    if (scheduleWeekView.style.display === "block") {
      updateShiftOptionsInTableView();
    }
  });

  // DEPOT 选择
  greertonDepotButton.addEventListener("click", function () {
    console.log("Greerton 按钮被点击");
    currentDepot = "greerton";
    depotSelectionUI.style.display = "none";
    weekDateSelector.style.display = "block";
    scheduleWeekView.style.display = "none";
  });

  papamoaDepotButton.addEventListener("click", function () {
    console.log("Papamoa 按钮被点击");
    currentDepot = "papamoa";
    depotSelectionUI.style.display = "none";
    weekDateSelector.style.display = "block";
    scheduleWeekView.style.display = "none";
  });

  malemeDepotButton.addEventListener("click", function () {
    console.log("Maleme 按钮被点击");
    currentDepot = "maleme";
    depotSelectionUI.style.display = "none";
    weekDateSelector.style.display = "block";
    scheduleWeekView.style.display = "none";
  });

  standbyDepotButton.addEventListener("click", function () {
    console.log("Standby 按钮被点击");
    currentDepot = "standby";
    depotSelectionUI.style.display = "none";
    weekDateSelector.style.display = "block";
    scheduleWeekView.style.display = "none";
  });

  backToDepotSelectionButton.addEventListener("click", function () {
    console.log("Back from date picker 按钮被点击");
    depotSelectionUI.style.display = "block";
    weekDateSelector.style.display = "none";
    scheduleWeekView.style.display = "none";
  });

  // 日期选择
  weekStartDateInput.addEventListener("change", function (event) {
    const selectedDate = event.target.value;
    console.log("用户在日期选择器中选择了日期:", selectedDate);

    weekDateSelector.style.display = "none";
    scheduleWeekView.style.display = "block";

    const startDate = new Date(selectedDate);
    const dayOfWeek = startDate.getDay();
    const sundayDate = new Date(startDate);
    sundayDate.setDate(startDate.getDate() - dayOfWeek);

    const dateCells = scheduleWeekView.querySelectorAll(
      "tbody:not(#control-row) tr td:nth-child(2)"
    );

    for (let i = 0; i < dateCells.length; i++) {
      const currentDate = new Date(sundayDate);
      currentDate.setDate(sundayDate.getDate() + i);
      const formattedDate =
        String(currentDate.getDate()).padStart(2, "0") +
        "/" +
        String(currentDate.getMonth() + 1).padStart(2, "0");
      dateCells[i].textContent = formattedDate;
    }

    updateShiftOptionsInTableView();
  });

  backToDateSelectorButton.addEventListener("click", function () {
    console.log("Back from schedule 按钮被点击");
    weekDateSelector.style.display = "block";
    scheduleWeekView.style.display = "none";
  });

  // 更新 Shift 选项
  function updateShiftOptionsInTableView() {
    console.log("updateShiftOptionsInTableView() 函数被调用");
    const currentOptionsGroupKey = isSchoolHolidayEnabled ? `${currentDepot}-schoolHoliday` : currentDepot;
    console.log("当前opstions备选组:", currentOptionsGroupKey);

    if (!currentDepot) {
      console.error("currentDepot 未定义");
      return;
    }
    if (!shiftOptionsGroups[currentOptionsGroupKey]) {
      console.error(`shiftOptionsGroups 中不存在 ${currentOptionsGroupKey}`);
      return;
    }

    const shiftSelectors = scheduleWeekView.querySelectorAll("tbody tr td select.shift-selector");
    const weekdayHolidaySwitches = scheduleWeekView.querySelectorAll('.weekday-holiday-switch input[type="checkbox"]');

    const currentSelections = Array.from(shiftSelectors).map(select => select.value);

    shiftSelectors.forEach((selectElement, index) => {
      const dayIndex = index;
      let dayOfWeek = dayIndex === 0 || dayIndex === 6 ? "weekend" : "weekday";

      if (dayOfWeek === "weekday" && dayIndex >= 1 && dayIndex <= 5) {
        const currentWeekdayHolidaySwitch = weekdayHolidaySwitches[dayIndex - 1];
        if (currentWeekdayHolidaySwitch && currentWeekdayHolidaySwitch.checked) {
          dayOfWeek = "weekend";
        }
      }

      //console.log(`处理星期${["日", "一", "二", "三", "四", "五", "六"][dayIndex]} (dayOfWeek: ${dayOfWeek})`);

      const optionsGroup = shiftOptionsGroups[currentOptionsGroupKey][dayOfWeek];
      if (!optionsGroup) {
        console.error(`在 ${currentOptionsGroupKey} 中未找到 ${dayOfWeek}`);
        return;
      }

      const currentValue = selectElement.value;
      while (selectElement.options.length > 1) {
        selectElement.remove(1);
      }

      optionsGroup.forEach((optionText) => {
        const optionElement = document.createElement("option");
        optionElement.value = optionText;
        optionElement.textContent = optionText;
        selectElement.appendChild(optionElement);
      });

      if (optionsGroup.includes(currentValue)) {
        selectElement.value = currentValue;
      } else {
        selectElement.value = "";
      }
    });

    weekdayHolidaySwitches.forEach((holidaySwitch, index) => {
      holidaySwitch.removeEventListener("change", updateSingleDayShiftOptionsHandler);
      holidaySwitch.addEventListener("change", updateSingleDayShiftOptionsHandler);
    });

    function updateSingleDayShiftOptionsHandler() {
      const index = Array.from(weekdayHolidaySwitches).indexOf(this);
      console.log(`工作日${index + 1}公共假日开关状态改变`);
      updateSingleDayShiftOptions(index + 1);
    }

    updateShiftSelectors(); // 确保 Shift 状态更新
  }

  function updateSingleDayShiftOptions(dayIndex) {
    const currentOptionsGroupKey = isSchoolHolidayEnabled ? `${currentDepot}-schoolHoliday` : currentDepot;
    const shiftSelector = scheduleWeekView.querySelector(`tbody tr:nth-child(${dayIndex + 1}) td select.shift-selector`);
    const holidaySwitch = scheduleWeekView.querySelector(`.weekday-holiday-switch.weekday-holiday-switch-${["mon", "tue", "wed", "thu", "fri"][dayIndex - 1]} input[type="checkbox"]`);

    if (!shiftSelector || (dayIndex > 0 && dayIndex < 6 && !holidaySwitch)) return;

    let dayOfWeek = (dayIndex === 0 || dayIndex === 6) ? "weekend" : "weekday";
    if (dayOfWeek === "weekday" && dayIndex >= 1 && dayIndex <= 5 && holidaySwitch.checked) {
      dayOfWeek = "weekend";
    }

    const optionsGroup = shiftOptionsGroups[currentOptionsGroupKey][dayOfWeek];
    if (!optionsGroup) return;

    const currentValue = shiftSelector.value;
    while (shiftSelector.options.length > 1) {
      shiftSelector.remove(1);
    }

    optionsGroup.forEach((optionText) => {
      const optionElement = document.createElement("option");
      optionElement.value = optionText;
      optionElement.textContent = optionText;
      shiftSelector.appendChild(optionElement);
    });

    if (optionsGroup.includes(currentValue)) {
      shiftSelector.value = currentValue;
    } else {
      shiftSelector.value = "";
    }
  }

  // 添加到日历（保持不变）
  addToCalendarButton.addEventListener("click", async function () {
    console.log("add to calendar 按钮被点击");
    await initData();

    const scheduleTableBody = scheduleWeekView.querySelector("tbody");
    if (!scheduleTableBody) {
      console.error("找不到排班表格的 <tbody> 元素！");
      return;
    }

    const scheduleRows = scheduleTableBody.querySelectorAll("tr");
    if (!scheduleRows.length) {
      console.warn("排班表格 <tbody> 中没有找到任何数据行 (<tr>)！");
      return;
    }

    const shiftEvents = [];
    scheduleRows.forEach((row) => {
      const dateCell = row.querySelectorAll("td")[0];
      const shiftCell = row.querySelectorAll("td")[1];
      if (!dateCell || !shiftCell) return;

      const dateText = dateCell.textContent.trim();
      const shiftSelector = shiftCell.querySelector("select.shift-selector");
      if (!shiftSelector) return;

      const selectedShiftValue = shiftSelector.value;
      if (selectedShiftValue) {
        shiftEvents.push({ date: dateText, shiftCode: selectedShiftValue });
      }
    });

    let icsContent = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//SHIFT Helper//EN\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\n";

    shiftEvents.forEach((event) => {
      const { shiftCode, date } = event;
      const shiftDetails = shiftDetailsDictionary[shiftCode];
      if (!shiftDetails || shiftCode === "OFF" || shiftCode === "") return;

      const { signOn1, signOff1, signOn2, signOff2, mealLocation, mealStart, mealFinish, mealDuration } = shiftDetails;

      if (signOn2 === "none" && mealLocation !== "none") {
        icsContent += generateEvent(`${shiftCode} part 1`, date, signOn1, mealStart);
        icsContent += generateEvent(`Meal at ${mealLocation} ${mealDuration}`, date, mealStart, mealFinish);
        icsContent += generateEvent(`${shiftCode} part 2`, date, mealFinish, signOff1);
      } else if (signOn2 !== "none" && signOff2 !== "none") {
        icsContent += generateEvent(`${shiftCode} AM`, date, signOn1, signOff1);
        const gapDuration = calculateGap(signOff1, signOn2);
        icsContent += generateEvent(`GAP ${gapDuration}`, date, signOff1, signOn2);
        icsContent += generateEvent(`${shiftCode} PM`, date, signOn2, signOff2);
      } else if (signOn2 === "none" && mealLocation === "none") {
        icsContent += generateEvent(shiftCode, date, signOn1, signOff1);
      }
    });

    icsContent += "END:VCALENDAR\r\n";
    console.log("已生成 .ics 文件:\n", icsContent);

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const downloadLink = document.getElementById("hiddenDownloadLink");
    downloadLink.href = downloadUrl;
    downloadLink.click();
    URL.revokeObjectURL(downloadUrl);
    console.log("已触发 .ics 文件下载");
  });

  function generateEvent(summary, dateText, startTime, endTime) {
    if (startTime === "none" || endTime === "none") return "";
    const startDateTime = createUTCDateFromDateTextAndTime(dateText, startTime);
    const endDateTime = createUTCDateFromDateTextAndTime(dateText, endTime);
    if (!startDateTime || !endDateTime) return "";

    const uid = generateUuid();
    const dtstamp = formatDateTimeToUTCString(new Date());
    const dtstart = formatDateTimeToUTCString(startDateTime);
    const dtend = formatDateTimeToUTCString(endDateTime);

    return `BEGIN:VEVENT\r\nUID:${uid}\r\nDTSTAMP:${dtstamp}\r\nDTSTART:${dtstart}\r\nDTEND:${dtend}\r\nSUMMARY:${summary}\r\nEND:VEVENT\r\n`;
  }

  function calculateGap(endTime, startTime) {
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const [startHour, startMinute] = startTime.split(":").map(Number);
    let minutes = (startHour * 60 + startMinute) - (endHour * 60 + endMinute);
    if (minutes < 0) minutes += 24 * 60;
    const hours = Math.floor(minutes / 60);
    minutes %= 60;
    return `${hours} hr ${minutes} min`;
  }
});

// Service Worker 注册
if ("serviceWorker" in navigator) {
  console.log("script.js: 注册 Service Worker 中...");
  navigator.serviceWorker
    .register("./service-worker.js")
    .then((registration) => {
      console.log("script.js: Service Worker 已注册:", registration);
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            console.log("有新版本的 Service Worker 可用");
            if (confirm("A new version is available. Refresh to update?")) {
              newWorker.postMessage({ action: "skipWaiting" });
            }
          }
        });
      });
    })
    .catch((err) =>
      console.error("script.js: Service Worker registration failed:", err)
    );

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    console.log("正在载入新版本的 Service Worker");
    window.location.reload();
  });

  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data && event.data.action === "skipWaiting") {
      console.log("Skipping waiting via message");
    }
  });
}