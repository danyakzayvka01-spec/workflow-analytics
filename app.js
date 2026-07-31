const defaultAccounts = [
  {
    id: "keen-developer",
    name: "Keen",
    login: "keen",
    email: "keen",
    password: "keen1488",
    role: "developer",
    category: "office",
    department: "Разработка",
    status: "Активен",
    access: "Полный доступ",
  },
];

const roleLabels = {
  developer: "Разработчик",
  admin: "Администратор",
  employee: "Холодка",
  "request-rkn": "Заявка/РКН",
  closer: "Клоузер",
};

const workerRoles = ["employee", "request-rkn", "closer"];

const categoryLabels = {
  sales: "Продажи",
  production: "Производство",
  support: "Поддержка",
  office: "Офис",
  "method-1": "ПСБ",
  "method-2": "FaceID",
  "method-3": "СВО",
  "department-request": "Заявка",
  "department-closer": "Клоузер",
  "department-rkn": "РКН",
};

const statusLabels = {
  "in-progress": "В работе",
  review: "На проверке",
  done: "Готово",
};

const priorityLabels = {
  high: "Высокий",
  medium: "Средний",
  low: "Низкий",
};

const methodLabels = {
  "method-1": "ПСБ",
  "method-2": "FaceID",
  "method-3": "СВО",
  "department-request": "Заявка",
  "department-closer": "Клоузер",
  "department-rkn": "РКН",
  custom: "Другая методика",
};

const materialCategoryLabels = {
  database: "База",
  telephony: "Телефония",
  messengers: "Мессенджеры",
  "proxy-vpn": "Прокси/ВПН",
  other: "Другое",
  custom: "Другое",
  "method-1": "ПСБ",
  "method-2": "FaceID",
  "method-3": "СВО",
};

const departmentKeys = ["method-1", "method-2", "method-3", "department-request", "department-closer", "department-rkn"];
const transferFlowDepartments = ["department-request", "department-rkn"];
const closerDepartment = "department-closer";

const storageKey = "workflow-accounts";
const sessionKey = "workflow-current-user";
const transientSessionKey = "workflow-session-user";
const rememberKey = "workflow-remember-login";
const themeKey = "workflow-theme";
const cleanupKey = "workflow-keen-cleanup-done";
const materialsKey = "workflow-materials";
const dayReportsKey = "workflow-day-reports";
const dealsKey = "workflow-closed-deals";
const clientsKey = "workflow-clients";
const apiUrl = "./api.php";

const chartData = {
  7: {
    labels: ["27 мая", "28 мая", "29 мая", "30 мая", "31 мая", "1 июня", "2 июня"],
    done: [118, 152, 114, 137, 130, 106, 168],
    success: [56, 79, 55, 68, 62, 49, 88],
  },
  14: {
    labels: ["20 мая", "21 мая", "22 мая", "23 мая", "24 мая", "25 мая", "26 мая", "27 мая", "28 мая", "29 мая", "30 мая", "31 мая", "1 июня", "2 июня"],
    done: [110, 114, 132, 174, 126, 112, 104, 118, 152, 114, 137, 130, 106, 168],
    success: [53, 52, 59, 88, 57, 50, 45, 56, 79, 55, 68, 62, 49, 88],
  },
  30: {
    labels: ["4 мая", "6 мая", "8 мая", "10 мая", "12 мая", "14 мая", "16 мая", "18 мая", "20 мая", "22 мая", "24 мая", "26 мая", "28 мая", "30 мая", "2 июня"],
    done: [96, 108, 122, 101, 146, 132, 158, 120, 110, 132, 126, 104, 152, 137, 168],
    success: [42, 48, 64, 45, 71, 66, 82, 58, 53, 59, 57, 45, 79, 68, 88],
  },
};

const authScreen = document.querySelector("#authScreen");
const appShell = document.querySelector("#appShell");
const loginForm = document.querySelector("#loginForm");
const loginMessage = document.querySelector("#loginMessage");
const rememberInput = loginForm.elements.remember;
const accountMenuButton = document.querySelector("#accountMenuButton");
const accountDropdown = document.querySelector("#accountDropdown");
const logoutButton = document.querySelector("#logoutButton");
const themeToggle = document.querySelector("#themeToggle");
const currentUserName = document.querySelector("#currentUserName");
const currentUserRole = document.querySelector("#currentUserRole");
const pageTitle = document.querySelector("#pageTitle");
const accountForm = document.querySelector("#accountForm");
const accountMessage = document.querySelector("#accountMessage");
const roleFilter = document.querySelector("#roleFilter");
const accountsTableBody = document.querySelector("#accountsTableBody");
const topEmployeeLists = document.querySelectorAll("[data-method-top]");
const departmentSummaryCards = document.querySelectorAll("[data-department-summary]");
const overallSummaryGrid = document.querySelector("#overallSummaryGrid");
const attentionList = document.querySelector("#attentionList");
const employeeHomeGrid = document.querySelector("#employeeHomeGrid");
const todayStatusBadge = document.querySelector("#todayStatusBadge");
const todayTransfers = document.querySelector("#todayTransfers");
const todayGreen = document.querySelector("#todayGreen");
const weekHomeConversion = document.querySelector("#weekHomeConversion");
const weekHomeTransfers = document.querySelector("#weekHomeTransfers");
const weekHomeGreen = document.querySelector("#weekHomeGreen");
const lastDayComment = document.querySelector("#lastDayComment");
const lastDayDate = document.querySelector("#lastDayDate");
const totalAccounts = document.querySelector("#totalAccounts");
const adminAccounts = document.querySelector("#adminAccounts");
const employeeAccounts = document.querySelector("#employeeAccounts");
const taskInProgress = document.querySelector("#taskInProgress");
const taskCompleted = document.querySelector("#taskCompleted");
const weeklyTransfersDashboard = document.querySelector("#weeklyTransfersDashboard");
const taskWeekFilter = document.querySelector("#taskWeekFilter");
const tasksTitle = document.querySelector("#tasksTitle");
const dayForm = document.querySelector("#dayForm");
const dayMessage = document.querySelector("#dayMessage");
const dayConversionBadge = document.querySelector("#dayConversionBadge");
const weekTotalTransfers = document.querySelector("#weekTotalTransfers");
const weekGreenTransfers = document.querySelector("#weekGreenTransfers");
const weekConversion = document.querySelector("#weekConversion");
const weeklyResultsBody = document.querySelector("#weeklyResultsBody");
const resultsTitle = document.querySelector("#resultsTitle");
const dealFormToggle = document.querySelector("#dealFormToggle");
const dealForm = document.querySelector("#dealForm");
const dealMessage = document.querySelector("#dealMessage");
const dealPeriodFilter = document.querySelector("#dealPeriodFilter");
const dealPeriodLabel = document.querySelector("#dealPeriodLabel");
const dealDateFilter = document.querySelector("#dealDateFilter");
const dealDateClear = document.querySelector("#dealDateClear");
const clientForm = document.querySelector("#clientForm");
const clientMessage = document.querySelector("#clientMessage");
const clientTotal = document.querySelector("#clientTotal");
const clientExpectedTotal = document.querySelector("#clientExpectedTotal");
const clientBusyStatus = document.querySelector("#clientBusyStatus");
const clientsStatusBadge = document.querySelector("#clientsStatusBadge");
const clientsTitle = document.querySelector("#clientsTitle");
const clientsTableBody = document.querySelector("#clientsTableBody");
const clientPeriodFilter = document.querySelector("#clientPeriodFilter");
const clientPeriodLabel = document.querySelector("#clientPeriodLabel");
const clientDateFilter = document.querySelector("#clientDateFilter");
const clientDateClear = document.querySelector("#clientDateClear");
const materialForm = document.querySelector("#materialForm");
const materialFormPanel = document.querySelector("#materialFormPanel");
const materialMessage = document.querySelector("#materialMessage");
const materialsTableBody = document.querySelector("#materialsTableBody");
const materialTotalCost = document.querySelector("#materialTotalCost");
const materialRows = document.querySelector("#materialRows");
const materialEmployees = document.querySelector("#materialEmployees");
const materialsTitle = document.querySelector("#materialsTitle");
const materialDateFilter = document.querySelector("#materialDateFilter");
const materialDateClear = document.querySelector("#materialDateClear");
const departmentEmployeesBody = document.querySelector("#departmentEmployeesBody");
const departmentTableHead = document.querySelector("#departmentTableHead");
const departmentDetailTitle = document.querySelector("#departmentDetailTitle");
const departmentDetailBadge = document.querySelector("#departmentDetailBadge");
const departmentPeriodFilter = document.querySelector("#departmentPeriodFilter");
const departmentPeriodLabel = document.querySelector("#departmentPeriodLabel");
const departmentDateFilter = document.querySelector("#departmentDateFilter");
const departmentDateClear = document.querySelector("#departmentDateClear");
const departmentDateCaption = document.querySelector("#departmentDateCaption");
const chart = document.querySelector("#resultsChart");
const select = document.querySelector("#periodSelect");
let activeUser = null;
let selectedDepartment = "method-1";
let selectedDepartmentPeriod = "all";
let selectedDepartmentDate = "";
let selectedMaterialDate = "";
let selectedDealPeriod = "all";
let selectedDealDate = "";
let selectedClientPeriod = "all";
let selectedClientDate = "";
let appData = {
  accounts: [...defaultAccounts],
  materials: [],
  dayReports: [],
  deals: [],
  clients: [],
};
let remoteStorageReady = false;

function normalizeData(data = {}) {
  return {
    accounts: Array.isArray(data.accounts) && data.accounts.length ? data.accounts : [...defaultAccounts],
    materials: Array.isArray(data.materials) ? data.materials : [],
    dayReports: Array.isArray(data.dayReports) ? data.dayReports : [],
    deals: Array.isArray(data.deals) ? data.deals : [],
    clients: Array.isArray(data.clients) ? data.clients : [],
  };
}

async function apiRequest(action, payload = null) {
  const options = payload
    ? {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    : { method: "GET" };
  const response = await fetch(`${apiUrl}?action=${action}`, options);
  if (!response.ok) throw new Error("Сервер временно недоступен.");
  const result = await response.json();
  if (!result.ok) throw new Error(result.message || "Не удалось сохранить данные.");
  return result.data;
}

async function loadRemoteData() {
  try {
    appData = normalizeData(await apiRequest("load"));
    remoteStorageReady = true;
  } catch (error) {
    console.warn(error);
    appData = normalizeData({
      accounts: readLocalCollection(storageKey, defaultAccounts),
      materials: readLocalCollection(materialsKey, []),
      dayReports: readLocalCollection(dayReportsKey, []),
      deals: readLocalCollection(dealsKey, []),
      clients: readLocalCollection(clientsKey, []),
    });
    remoteStorageReady = false;
  }
}

function readLocalCollection(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

async function migrateLocalDataOnce() {
  const migrationKey = "workflow-remote-migration-done";
  if (localStorage.getItem(migrationKey) === "true") return;

  const localData = normalizeData({
    accounts: readLocalCollection(storageKey, []),
    materials: readLocalCollection(materialsKey, []),
    dayReports: readLocalCollection(dayReportsKey, []),
    deals: readLocalCollection(dealsKey, []),
    clients: readLocalCollection(clientsKey, []),
  });

  const hasLocalData =
    localData.accounts.length > 1 ||
    localData.materials.length ||
    localData.dayReports.length ||
    localData.deals.length ||
    localData.clients.length;

  if (!hasLocalData) {
    localStorage.setItem(migrationKey, "true");
    return;
  }

  appData = {
    accounts: mergeById(appData.accounts, localData.accounts),
    materials: mergeById(appData.materials, localData.materials),
    dayReports: mergeById(appData.dayReports, localData.dayReports),
    deals: mergeById(appData.deals, localData.deals),
    clients: mergeById(appData.clients, localData.clients),
  };
  await saveAllRemote();
  localStorage.setItem(migrationKey, "true");
}

function mergeById(remoteItems, localItems) {
  const map = new Map(remoteItems.map((item) => [item.id, item]));
  localItems.forEach((item) => {
    if (item?.id) map.set(item.id, { ...map.get(item.id), ...item });
  });
  return [...map.values()];
}

async function saveRemoteCollection(collection, items) {
  if (!remoteStorageReady) return;
  try {
    appData = normalizeData(await apiRequest("save", { collection, items, actorId: activeUser?.id || "" }));
  } catch (error) {
    console.warn(error);
  }
}

async function saveAllRemote() {
  if (!remoteStorageReady) return;
  appData = normalizeData(await apiRequest("save-all", { ...appData, actorId: activeUser?.id || "" }));
}

function getAccounts() {
  return [...appData.accounts];
}

function saveAccounts(accounts) {
  appData.accounts = [...accounts];
  localStorage.setItem(storageKey, JSON.stringify(appData.accounts));
  saveRemoteCollection("accounts", appData.accounts);
}

function getMaterials() {
  return [...appData.materials];
}

function saveMaterials(materials) {
  appData.materials = [...materials];
  localStorage.setItem(materialsKey, JSON.stringify(appData.materials));
  saveRemoteCollection("materials", appData.materials);
}

function getDayReports() {
  return [...appData.dayReports];
}

function saveDayReports(reports) {
  appData.dayReports = [...reports];
  localStorage.setItem(dayReportsKey, JSON.stringify(appData.dayReports));
  saveRemoteCollection("dayReports", appData.dayReports);
}

function getDeals() {
  return [...appData.deals];
}

function saveDeals(deals) {
  appData.deals = [...deals];
  localStorage.setItem(dealsKey, JSON.stringify(appData.deals));
  saveRemoteCollection("deals", appData.deals);
}

function getClients() {
  return [...appData.clients];
}

function saveClients(clients) {
  appData.clients = [...clients];
  localStorage.setItem(clientsKey, JSON.stringify(appData.clients));
  saveRemoteCollection("clients", appData.clients);
}

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(themeKey, nextTheme);
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
    themeToggle.setAttribute("aria-label", nextTheme === "dark" ? "Включить светлую тему" : "Включить темную тему");
  }
}

function getCurrentUser() {
  const remembered = localStorage.getItem(rememberKey) === "true";
  const id = remembered ? localStorage.getItem(sessionKey) : sessionStorage.getItem(transientSessionKey);
  return getAccounts().find((account) => account.id === id);
}

function showMessage(element, text, isError = false) {
  element.textContent = text;
  element.classList.toggle("error", isError);
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function temporaryPassword() {
  return `user${Math.floor(1000 + Math.random() * 9000)}`;
}

function accountLogin(account) {
  return account.login || account.email || "";
}

function padDatePart(value) {
  return String(value).padStart(2, "0");
}

function isoDate(date) {
  return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`;
}

function localDateFromISO(value) {
  if (!value) return new Date();
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function normalizeStoredDate(value) {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const ruDate = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
  if (ruDate) {
    return `${ruDate[3]}-${ruDate[2]}-${ruDate[1]}`;
  }
  return "";
}

function displayStoredDate(value) {
  const normalized = normalizeStoredDate(value);
  return normalized ? localDateFromISO(normalized).toLocaleDateString("ru-RU") : "—";
}

function monthInputValue(date = new Date()) {
  return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}`;
}

function weekDays(anchor = new Date()) {
  const start = anchor instanceof Date ? new Date(anchor) : localDateFromISO(anchor);
  const day = start.getDay() || 7;
  start.setDate(start.getDate() - day + 1);
  start.setHours(0, 0, 0, 0);
  const labels = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  return labels.map((label, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      label,
      date,
      iso: isoDate(date),
      caption: date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" }),
    };
  });
}

function weekInputValue(date = new Date()) {
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7));
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const weekNumber = 1 + Math.round(((target - firstThursday) / 86400000 - 3 + ((firstThursday.getDay() + 6) % 7)) / 7);
  return `${target.getFullYear()}-W${padDatePart(weekNumber)}`;
}

function weekStartFromInput(value) {
  if (!value) return new Date();
  const [yearPart, weekPart] = value.split("-W");
  const year = Number(yearPart);
  const week = Number(weekPart);
  const jan4 = new Date(year, 0, 4);
  const jan4Day = jan4.getDay() || 7;
  const start = new Date(jan4);
  start.setDate(jan4.getDate() - jan4Day + 1 + (week - 1) * 7);
  start.setHours(0, 0, 0, 0);
  return start;
}

function periodMatchesDate(date, period) {
  if (!period || period.mode === "all") return true;
  const normalizedDate = normalizeStoredDate(date);
  if (!normalizedDate || !period.value) return false;
  if (period.mode === "day") return normalizedDate === period.value;
  if (period.mode === "week") {
    const reportDate = localDateFromISO(normalizedDate);
    const start = weekStartFromInput(period.value);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return reportDate >= start && reportDate <= end;
  }
  if (period.mode === "month") {
    return normalizedDate.startsWith(period.value);
  }
  return true;
}

function periodConfig(mode) {
  return {
    all: { label: "Период", type: "date", value: "" },
    day: { label: "День", type: "date", value: isoDate(new Date()) },
    week: { label: "Неделя", type: "week", value: weekInputValue(new Date()) },
    month: { label: "Месяц", type: "month", value: monthInputValue(new Date()) },
  }[mode] || { label: "Период", type: "date", value: "" };
}

function syncPeriodControls(periodFilter, periodLabel, dateFilter, mode, valueSetter) {
  const config = periodConfig(periodFilter.value || mode);
  periodLabel.textContent = config.label;
  dateFilter.type = config.type;
  dateFilter.disabled = periodFilter.value === "all";
  if (periodFilter.value === "all") {
    dateFilter.value = "";
    valueSetter("");
    return;
  }
  if (!dateFilter.value) {
    dateFilter.value = config.value;
    valueSetter(config.value);
  }
}

function timestampDate(value) {
  const date = new Date(Number(value));
  return Number.isNaN(date.getTime()) ? "" : isoDate(date);
}

function entryDate(entry) {
  return normalizeStoredDate(entry.date) || timestampDate(entry.createdAt);
}

function entryMatchesPeriod(entry, period) {
  return periodMatchesDate(entryDate(entry), period);
}

function formatMoney(value) {
  return `$${Number(value).toLocaleString("en-US")}`;
}

function canManage(user) {
  return user && (user.role === "developer" || user.role === "admin");
}

function isWorkerRole(role) {
  return workerRoles.includes(role);
}

function isWorker(user) {
  return user && isWorkerRole(user.role);
}

function canUseDeals(user) {
  return canManage(user) || user?.role === "closer";
}

function canUseClients(user) {
  return canManage(user) || user?.role === "closer";
}

function highestMethodExpense(materials) {
  const totals = materials.reduce((acc, item) => {
    const method = item.method || "custom";
    acc[method] = (acc[method] || 0) + Number(item.cost);
    return acc;
  }, {});
  const top = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  return top ? { method: top[0], cost: top[1] } : { method: null, cost: 0 };
}

function taskTemplates(category) {
  const templates = {
    sales: ["Обработать заявки", "Подготовить КП", "Закрыть сделки недели", "Обновить CRM"],
    production: ["Подготовить материалы", "Выполнить сменный план", "Проверить качество", "Передать результат"],
    support: ["Разобрать обращения", "Закрыть SLA", "Обновить базу знаний", "Передать сложные кейсы"],
    office: ["Подготовить отчет", "Сверить документы", "Обновить регламенты", "Проверить статусы"],
    "method-1": ["Проверить заявки ПСБ", "Сверить документы ПСБ", "Закрыть рабочий пакет", "Передать отчет"],
    "method-2": ["Проверить FaceID-сессии", "Разобрать отклонения", "Обновить статусы", "Передать спорные кейсы"],
    "method-3": ["Подготовить пакет СВО", "Проверить материалы", "Закрыть этап", "Передать результат"],
    "department-request": ["Принять новую заявку", "Проверить вводные данные", "Передать заявку дальше", "Описать статус"],
    "department-closer": ["Проверить готовность сделки", "Связаться с клиентом", "Закрыть передачу", "Зафиксировать итог"],
    "department-rkn": ["Проверить запись РКН", "Сверить статус", "Передать подтвержденные", "Зафиксировать срез"],
  };
  return templates[category] || templates.office;
}

function tasksForAccount(account) {
  const base = taskTemplates(account.category);
  const seed = account.id.length + account.name.length;
  const statuses = ["in-progress", "review", "done", "done"];
  const priorities = ["high", "medium", "medium", "low"];

  return base.map((title, index) => ({
    id: `${account.id}-task-${index}`,
    title,
    employeeId: account.id,
    employeeName: account.name,
    status: statuses[(seed + index) % statuses.length],
    priority: priorities[(seed + index) % priorities.length],
    due: ["Сегодня", "Завтра", "Пятница", "Следующая неделя"][index],
    progress: [35, 60, 82, 100][(seed + index) % 4],
  }));
}

function allEmployeeAccounts() {
  return getAccounts().filter((account) => isWorkerRole(account.role));
}

function allTasks() {
  return allEmployeeAccounts().flatMap(tasksForAccount);
}

function employeeStats(account, method = "method-1", period = "") {
  const reports = getDayReports()
    .filter((report) => report.employeeId === account.id)
    .filter((report) => {
      if (!period) return true;
      if (typeof period === "string") return normalizeStoredDate(report.date) === period;
      return periodMatchesDate(report.date, period);
    });
  if (reports.length) {
    const totalTransfers = reports.reduce((sum, report) => sum + Number(report.totalTransfers), 0);
    const greenTransfers = reports.reduce((sum, report) => sum + Number(report.greenTransfers), 0);
    const conversion = totalTransfers ? Math.round((greenTransfers / totalTransfers) * 1000) / 10 : 0;
    return { conversion, greenTransfers, totalTransfers };
  }

  return { conversion: 0, greenTransfers: 0, totalTransfers: 0 };
}

function setView(view) {
  if (view === "accounts" && !canManage(activeUser)) view = "dashboard";
  if (view === "tasks" && !isWorker(activeUser)) view = "dashboard";
  if (view === "expenses" && isWorker(activeUser)) view = "dashboard";
  if (view === "departments" && !canManage(activeUser)) view = "dashboard";
  if (view === "results" && !canUseDeals(activeUser)) view = "dashboard";
  if (view === "clients" && !canUseClients(activeUser)) view = "dashboard";
  document.querySelectorAll(".view-panel").forEach((panel) => panel.classList.add("is-hidden"));
  document.querySelector(`#${view}View`)?.classList.remove("is-hidden");
  document.querySelectorAll("[data-view-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.viewLink === view);
  });
  const titles = {
    dashboard: isWorker(activeUser) ? "Моя рабочая сводка" : "Система управления работой сотрудников",
    accounts: "Сотрудники",
    departments: "Отделы",
    tasks: "Мой день",
    results: "Мои сделки",
    clients: "Мои клиенты",
    expenses: isWorker(activeUser) ? "Мои материалы" : "Расход материалов",
  };
  pageTitle.textContent = titles[view] || titles.dashboard;
  if (view === "accounts") {
    renderAccounts();
  }
  if (view === "dashboard") {
    renderDashboard();
  }
  if (view === "tasks") {
    renderTasks();
  }
  if (view === "departments") {
    renderDepartments();
  }
  if (view === "results") {
    renderResults();
  }
  if (view === "clients") {
    renderClients();
  }
  if (view === "expenses") {
    renderMaterials();
  }
}

function showApp(user) {
  activeUser = user;
  authScreen.classList.add("is-hidden");
  appShell.classList.remove("is-hidden");
  currentUserName.textContent = user.name;
  currentUserRole.textContent = roleLabels[user.role];
  renderRoleNavigation(user);
  setView(location.hash === "#accounts" || location.hash === "#tasks" || location.hash === "#expenses" || location.hash === "#departments" || location.hash === "#results" || location.hash === "#clients" ? location.hash.slice(1) : "dashboard");
}

function showLogin() {
  appShell.classList.add("is-hidden");
  authScreen.classList.remove("is-hidden");
}

function renderAccounts() {
  const accounts = getAccounts();
  const filter = roleFilter.value;
  const visibleAccounts = filter === "all" ? accounts : accounts.filter((account) => account.role === filter);

  totalAccounts.textContent = accounts.length;
  adminAccounts.textContent = accounts.filter((account) => account.role === "admin").length;
  employeeAccounts.textContent = accounts.filter((account) => isWorkerRole(account.role)).length;

  accountsTableBody.innerHTML = visibleAccounts
    .map(
      (account) => `
        <tr>
          <td>
            <div class="user-cell">
              <span>${initials(account.name)}</span>
              <div>
                <strong>${account.name}</strong>
                <small>${accountLogin(account)}</small>
              </div>
            </div>
          </td>
          <td><span class="role-badge ${account.role}">${roleLabels[account.role]}</span></td>
          <td>${categoryLabels[account.department] || account.department || categoryLabels[account.category] || "Не указано"}</td>
          <td><span class="role-badge active">${account.status}</span></td>
          <td class="access-text">${account.access}</td>
          <td>
            <button class="danger-btn" type="button" data-delete-account="${account.id}" ${account.role === "developer" ? "disabled" : ""}>
              Удалить
            </button>
          </td>
        </tr>
      `,
    )
    .join("");
}

function renderRoleNavigation(user) {
  document.querySelectorAll("[data-view-link]").forEach((link) => {
    const view = link.dataset.viewLink;
    const restricted =
      (view === "accounts" && !canManage(user)) ||
      (view === "tasks" && !isWorker(user)) ||
      (view === "expenses" && isWorker(user)) ||
      (view === "departments" && !canManage(user)) ||
      (view === "results" && !canUseDeals(user)) ||
      (view === "clients" && !canUseClients(user));
    link.classList.toggle("is-hidden", restricted);
    if (view === "tasks") {
      link.querySelector("span:last-child").textContent = isWorker(user) ? "Мой день" : "Задачи";
    }
  });
  document.querySelectorAll("[data-employee-hidden]").forEach((link) => {
    link.classList.toggle("is-hidden", isWorker(user));
  });
}

function renderTopEmployees() {
  topEmployeeLists.forEach((list) => {
    const method = list.dataset.methodTop;
    const metricMode = departmentMetricMode(method);
    list.classList.toggle("request-top-list", metricMode !== "cold");
    const employees = allEmployeeAccounts()
      .filter((account) => account.department === method || account.category === method)
      .map((account) => ({ account, stats: employeeStats(account, method) }))
      .sort((a, b) => b.stats.conversion - a.stats.conversion)
      .slice(0, 5);

    if (!employees.length) {
      list.innerHTML = `<li class="empty-list-message">В отделе ${methodLabels[method]} пока нет сотрудников</li>`;
      return;
    }

    list.innerHTML = employees
      .map(
        ({ account, stats }, index) => {
          const cutCount = Math.max(0, stats.totalTransfers - stats.greenTransfers);
          const statItems = metricMode === "transfer"
            ? [
              ["Общ.", stats.totalTransfers],
              ["Передано", stats.greenTransfers],
              ["Срезано", cutCount],
              ["Конв.", `${stats.conversion}%`],
            ]
            : metricMode === "closer"
              ? [
                ["Получил", stats.totalTransfers],
                ["Закрыл", stats.greenTransfers],
                ["Срез", cutCount],
                ["Конв.", `${stats.conversion}%`],
              ]
            : [
              ["Всего", stats.totalTransfers],
              ["Зел.", stats.greenTransfers],
              ["Конв.", `${stats.conversion}%`],
            ];
          return `
          <li class="compact-top-row">
            <span class="rank">${index + 1}</span>
            <span class="top-avatar">${initials(account.name)}</span>
            <div class="compact-top-content">
              <strong>${account.name}</strong>
              <div class="compact-stats">
                ${statItems.map(([label, value]) => `<span><small>${label}</small><b>${value}</b></span>`).join("")}
              </div>
            </div>
          </li>
        `;
        },
      )
      .join("");
  });
}

function departmentEmployees(method) {
  return allEmployeeAccounts().filter((account) => account.department === method || account.category === method);
}

function departmentSummary(method, date = "") {
  const employees = departmentEmployees(method);
  const stats = employees.map((account) => employeeStats(account, method, date));
  const totalTransfers = stats.reduce((sum, item) => sum + item.totalTransfers, 0);
  const greenTransfers = stats.reduce((sum, item) => sum + item.greenTransfers, 0);
  const cutTransfers = Math.max(0, totalTransfers - greenTransfers);
  const conversion = totalTransfers ? Math.round((greenTransfers / totalTransfers) * 1000) / 10 : 0;
  return { employees, totalTransfers, greenTransfers, cutTransfers, conversion };
}

function departmentMetricMode(method) {
  if (method === closerDepartment) return "closer";
  if (transferFlowDepartments.includes(method)) return "transfer";
  return "cold";
}

function departmentStatus(summary) {
  if (!summary.employees.length || !summary.totalTransfers) return { label: "Нет данных", tone: "medium" };
  if (summary.conversion < 45) return { label: "Просадка", tone: "high" };
  if (summary.conversion < 60) return { label: "Контроль", tone: "medium" };
  return { label: "Хорошо", tone: "active" };
}

function roleDepartmentSummary(role, departments) {
  const employees = allEmployeeAccounts().filter((account) => role === account.role && departments.includes(account.department || account.category));
  const stats = employees.map((account) => employeeStats(account, account.department || account.category));
  const totalTransfers = stats.reduce((sum, item) => sum + item.totalTransfers, 0);
  const greenTransfers = stats.reduce((sum, item) => sum + item.greenTransfers, 0);
  const cutTransfers = Math.max(0, totalTransfers - greenTransfers);
  const conversion = totalTransfers ? Math.round((greenTransfers / totalTransfers) * 1000) / 10 : 0;
  return { employees, totalTransfers, greenTransfers, cutTransfers, conversion };
}

function overallSummaryBlock(title, badgeClass, values) {
  return `
    <div class="overall-summary-block">
      <div class="overall-summary-head">
        <span class="role-badge ${badgeClass}">${title}</span>
      </div>
      <div class="overall-summary-row">
        ${values.map(([label, value]) => `<span><small>${label}</small><b>${value}</b></span>`).join("")}
      </div>
    </div>
  `;
}

function renderDepartmentSummaryHome() {
  const summaries = departmentKeys.map((method) => ({ method, summary: departmentSummary(method) }));

  departmentSummaryCards.forEach((card) => {
    const method = card.dataset.departmentSummary;
    const summary = departmentSummary(method);
    const metricMode = departmentMetricMode(method);
    const status = departmentStatus(summary);
    const body = card.querySelector(".department-summary-body");
    const values = metricMode === "transfer"
      ? [
        ["Сотрудников", summary.employees.length],
        ["Общ.", summary.totalTransfers],
        ["Передано", summary.greenTransfers],
        ["Срезано", summary.cutTransfers],
        ["Конверсия", `${summary.conversion}%`],
      ]
      : metricMode === "closer"
        ? [
          ["Сотрудников", summary.employees.length],
          ["Получил", summary.totalTransfers],
          ["Закрыл", summary.greenTransfers],
          ["Срез", summary.cutTransfers],
          ["Конверсия", `${summary.conversion}%`],
        ]
      : [
        ["Сотрудников", summary.employees.length],
        ["Всего", summary.totalTransfers],
        ["Зелёных", summary.greenTransfers],
        ["Конверсия", `${summary.conversion}%`],
      ];

    body.innerHTML = `
      <div class="department-health">
        <strong>${summary.conversion}%</strong>
        <span class="role-badge ${status.tone}">${status.label}</span>
      </div>
      <div class="department-summary-metrics ${metricMode !== "cold" ? "wide" : ""}">
        ${values.map(([label, value]) => `<span><small>${label}</small><b>${value}</b></span>`).join("")}
      </div>
    `;
  });

  const coldSummary = roleDepartmentSummary("employee", ["method-1", "method-2", "method-3"]);
  const requestRknSummary = roleDepartmentSummary("request-rkn", ["department-request", "department-rkn"]);
  overallSummaryGrid.innerHTML = [
    overallSummaryBlock("Холодка", "employee", [
      ["Всего", coldSummary.totalTransfers],
      ["Зелёных", coldSummary.greenTransfers],
      ["Конверсия", `${coldSummary.conversion}%`],
    ]),
    overallSummaryBlock("Заявка/РКН", "request-rkn", [
      ["Общ. кол-во", requestRknSummary.totalTransfers],
      ["Передано", requestRknSummary.greenTransfers],
      ["Срезано", requestRknSummary.cutTransfers],
      ["Конверсия", `${requestRknSummary.conversion}%`],
    ]),
  ].join("");

  const attentionItems = summaries
    .map(({ method, summary }) => ({ method, summary, status: departmentStatus(summary) }))
    .filter((item) => item.status.tone !== "active")
    .slice(0, 4);

  attentionList.innerHTML = attentionItems.length
    ? attentionItems.map((item) => `
      <li>
        <span class="role-badge ${item.status.tone}">${methodLabels[item.method]}</span>
        <strong>${item.status.label}</strong>
        <small>${item.summary.employees.length ? `${item.summary.conversion}% конверсия` : "нет сотрудников"}</small>
      </li>
    `).join("")
    : '<li><span class="role-badge active">OK</span><strong>Критичных просадок нет</strong><small>все отделы в норме</small></li>';
}

function departmentDateLabel() {
  if (selectedDepartmentPeriod === "all") return "все время";
  if (!selectedDepartmentDate) return "период не выбран";
  if (selectedDepartmentPeriod === "day") {
    return localDateFromISO(selectedDepartmentDate).toLocaleDateString("ru-RU");
  }
  if (selectedDepartmentPeriod === "week") {
    const start = weekStartFromInput(selectedDepartmentDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${start.toLocaleDateString("ru-RU")} - ${end.toLocaleDateString("ru-RU")}`;
  }
  if (selectedDepartmentPeriod === "month") {
    const [year, month] = selectedDepartmentDate.split("-").map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
  }
  return "все время";
}

function departmentPeriodValue() {
  if (selectedDepartmentPeriod === "all") return "";
  return { mode: selectedDepartmentPeriod, value: selectedDepartmentDate };
}

function syncDepartmentPeriodControls() {
  const config = {
    all: { label: "Период", type: "date", value: "" },
    day: { label: "День", type: "date", value: isoDate(new Date()) },
    week: { label: "Неделя", type: "week", value: weekInputValue(new Date()) },
    month: { label: "Месяц", type: "month", value: monthInputValue(new Date()) },
  }[selectedDepartmentPeriod];
  departmentPeriodLabel.textContent = config.label;
  departmentDateFilter.type = config.type;
  departmentDateFilter.disabled = selectedDepartmentPeriod === "all";
  if (selectedDepartmentPeriod === "all") {
    selectedDepartmentDate = "";
    departmentDateFilter.value = "";
    return;
  }
  if (!selectedDepartmentDate) {
    selectedDepartmentDate = config.value;
  }
  departmentDateFilter.value = selectedDepartmentDate;
}

function renderDepartments() {
  syncDepartmentPeriodControls();
  const currentPeriod = departmentPeriodValue();
  departmentKeys.forEach((method) => {
    const employees = departmentEmployees(method);
    const stats = employees.map((account) => employeeStats(account, method, currentPeriod));
    const average = stats.length ? Math.round(stats.reduce((sum, item) => sum + item.conversion, 0) / stats.length) : 0;
    const countNode = document.querySelector(`[data-department-count="${method}"]`);
    const conversionNode = document.querySelector(`[data-department-conversion="${method}"]`);
    countNode.textContent = employees.length;
    conversionNode.textContent = `${average}%`;
  });

  document.querySelectorAll("[data-department-card]").forEach((card) => {
    card.classList.toggle("active", card.dataset.departmentCard === selectedDepartment);
  });

  const selectedEmployees = departmentEmployees(selectedDepartment)
    .map((account) => ({ account, stats: employeeStats(account, selectedDepartment, currentPeriod) }))
    .sort((a, b) => b.stats.conversion - a.stats.conversion);
  const metricMode = departmentMetricMode(selectedDepartment);
  const hasCutColumn = metricMode !== "cold";

  departmentDetailTitle.textContent = `Отдел ${methodLabels[selectedDepartment]}`;
  departmentDetailBadge.textContent = methodLabels[selectedDepartment];
  departmentDateCaption.textContent = selectedDepartmentPeriod === "all" ? "Показано: все время" : `Показано: ${departmentDateLabel()}`;
  departmentTableHead.innerHTML = metricMode === "transfer"
    ? "<tr><th>Сотрудник</th><th>Общ. кол-во</th><th>Передано</th><th>Срезано</th><th>Конверсия</th><th>Статус</th></tr>"
    : metricMode === "closer"
      ? "<tr><th>Сотрудник</th><th>Получил</th><th>Закрыл</th><th>Срез</th><th>Конверсия</th><th>Статус</th></tr>"
    : "<tr><th>Сотрудник</th><th>Всего передач</th><th>Зелёных передач</th><th>Конверсия</th><th>Статус</th></tr>";

  if (!selectedEmployees.length) {
    departmentEmployeesBody.innerHTML = `<tr><td colspan="${hasCutColumn ? 6 : 5}" class="access-text">В отделе ${methodLabels[selectedDepartment]} пока нет сотрудников.</td></tr>`;
    return;
  }

  departmentEmployeesBody.innerHTML = selectedEmployees
    .map(
      ({ account, stats }) => {
        const cutCount = Math.max(0, stats.totalTransfers - stats.greenTransfers);
        return `
        <tr>
          <td>
            <div class="user-cell">
              <span>${initials(account.name)}</span>
              <div>
                <strong>${account.name}</strong>
                <small>${accountLogin(account)}</small>
              </div>
            </div>
          </td>
          <td>${stats.totalTransfers}</td>
          <td class="green-count">${stats.greenTransfers}</td>
          ${hasCutColumn ? `<td>${cutCount}</td>` : ""}
          <td class="success-text">${stats.conversion}%</td>
          <td><span class="role-badge active">${account.status}</span></td>
        </tr>
      `;
      },
    )
    .join("");
}

function reportsForLastWeek(employeeId) {
  return getDayReports()
    .filter((report) => report.employeeId === employeeId)
    .filter((report) => {
      const reportDate = localDateFromISO(report.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 6);
      weekAgo.setHours(0, 0, 0, 0);
      return reportDate >= weekAgo;
    })
    .sort((a, b) => localDateFromISO(b.date) - localDateFromISO(a.date));
}

function renderEmployeeHome() {
  if (!isWorker(activeUser)) return;

  const reports = getDayReports()
    .filter((report) => report.employeeId === activeUser.id)
    .sort((a, b) => localDateFromISO(b.date) - localDateFromISO(a.date));
  const today = isoDate(new Date());
  const todayReport = reports.find((report) => report.date === today);
  const weekReports = reportsForLastWeek(activeUser.id);
  const weekTransfers = weekReports.reduce((sum, report) => sum + Number(report.totalTransfers), 0);
  const weekGreen = weekReports.reduce((sum, report) => sum + Number(report.greenTransfers), 0);
  const weekConversionValue = weekTransfers ? Math.round((weekGreen / weekTransfers) * 1000) / 10 : 0;
  const latestReport = reports[0];
  const latestComment = latestReport?.planComment || latestReport?.changeComment || latestReport?.addedComment;

  todayStatusBadge.textContent = todayReport ? (todayReport.completed ? "Полный день" : "Неполный день") : "Не отмечен";
  todayStatusBadge.className = `role-badge ${todayReport?.completed ? "done" : todayReport ? "medium" : "active"}`;
  todayTransfers.textContent = `${Number(todayReport?.totalTransfers || 0).toLocaleString("ru-RU")} передач`;
  todayGreen.textContent = `${Number(todayReport?.greenTransfers || 0).toLocaleString("ru-RU")} зелёных трубок`;
  weekHomeConversion.textContent = `${weekConversionValue}%`;
  weekHomeTransfers.textContent = `${weekTransfers.toLocaleString("ru-RU")} передач`;
  weekHomeGreen.textContent = `${weekGreen.toLocaleString("ru-RU")} зелёных трубок за 7 дней`;
  lastDayComment.textContent = latestComment || "Пока нет комментариев.";
  lastDayDate.textContent = latestReport ? localDateFromISO(latestReport.date).toLocaleDateString("ru-RU") : "Заполните раздел Мой день";
}

function renderDashboard() {
  drawChart(select.value);
  const cards = document.querySelectorAll("#dashboardView .metrics-grid .metric-card");
  const metricsGrid = document.querySelector("#dashboardView .metrics-grid");
  const dashboardGrid = document.querySelector("#dashboardView .dashboard-grid");
  const homeInsightGrid = document.querySelector("#dashboardView .home-insight-grid");
  if (!cards.length || !activeUser) return;
  const employeeMode = isWorker(activeUser);

  dashboardGrid.classList.toggle("is-hidden", employeeMode);
  homeInsightGrid.classList.toggle("is-hidden", employeeMode);
  employeeHomeGrid.classList.toggle("is-hidden", !employeeMode);
  if (employeeMode) {
    renderEmployeeHome();
  } else {
    renderDepartmentSummaryHome();
  }

  cards.forEach((card) => card.classList.remove("is-hidden"));
  metricsGrid.classList.toggle("four-widgets", false);
  metricsGrid.classList.toggle("three-widgets", isWorker(activeUser) || canManage(activeUser));

  if (!isWorker(activeUser)) {
    const teamTasks = allTasks();
    const done = teamTasks.filter((task) => task.status === "done").length;
    const totalExpense = getMaterials().reduce((sum, item) => sum + Number(item.cost), 0);
    const success = teamTasks.length ? Math.round((done / teamTasks.length) * 100) : 0;
    const employees = allEmployeeAccounts().length;
    const admins = getAccounts().filter((account) => account.role === "admin").length;
    const values = {
      0: ["Сотрудников", employees, "активные рабочие аккаунты"],
      2: ["Успешность", `${success}%`, "по текущим задачам"],
      3: ["Расход", formatMoney(totalExpense), "по всем материалам"],
      4: ["Администраторов", admins, "управляют процессами"],
    };

    cards[1].classList.add("is-hidden");
    cards[4].classList.add("is-hidden");
    Object.entries(values).forEach(([index, value]) => {
      cards[index].querySelector("p").textContent = value[0];
      cards[index].querySelector("strong").textContent = value[1];
      cards[index].querySelector("small").innerHTML = `<span>${value[2]}</span>`;
    });
    return;
  }

  const userTasks = tasksForAccount(activeUser);
  const done = userTasks.filter((task) => task.status === "done").length;
  const materials = getMaterials().filter((item) => item.employeeId === activeUser.id);
  const dayReports = getDayReports().filter((report) => report.employeeId === activeUser.id);
  const dayExpense = dayReports.reduce((sum, report) => sum + Number(report.expense), 0);
  const dayTransfers = dayReports.reduce((sum, report) => sum + Number(report.totalTransfers), 0);
  const dayGreenTransfers = dayReports.reduce((sum, report) => sum + Number(report.greenTransfers), 0);
  const materialsCost = dayReports.length ? dayExpense : materials.reduce((sum, item) => sum + Number(item.cost), 0);
  const materialQty = materials.reduce((sum, item) => sum + Number(item.quantity), 0);
  const success = dayReports.length ? Math.round((dayGreenTransfers / Math.max(dayTransfers, 1)) * 100) : userTasks.length ? Math.round((done / userTasks.length) * 100) : 0;
  const values = [
    ["Дней отмечено", dayReports.length || userTasks.length, "по разделу Мой день"],
    ["Зелёных трубок", dayReports.length ? dayGreenTransfers : done, "успешные передачи"],
    ["Конверсия", `${success}%`, "по личной статистике"],
    ["Материалы", materialQty.toLocaleString("ru-RU"), "единиц использовано"],
    ["Расход", formatMoney(materialsCost), categoryLabels[activeUser.category] || "рабочая категория"],
  ];

  cards.forEach((card, index) => {
    card.querySelector("p").textContent = values[index][0];
    card.querySelector("strong").textContent = values[index][1];
    card.querySelector("small").innerHTML = `<span>${values[index][2]}</span>`;
  });
  cards[3].classList.add("is-hidden");
  cards[4].classList.add("is-hidden");
}

function renderTasks() {
  const reports = getDayReports()
    .filter((report) => report.employeeId === activeUser.id)
    .sort((a, b) => localDateFromISO(b.date) - localDateFromISO(a.date));
  if (!taskWeekFilter.value) {
    taskWeekFilter.value = weekInputValue(new Date());
  }
  const week = weekDays(weekStartFromInput(taskWeekFilter.value));
  const weekReports = week
    .filter((day) => day.label !== "ВС")
    .map((day) => reports.find((report) => report.date === day.iso))
    .filter(Boolean);
  const totalTransfers = reports.reduce((sum, report) => sum + Number(report.totalTransfers), 0);
  const greenTransfers = reports.reduce((sum, report) => sum + Number(report.greenTransfers), 0);
  const weekTransfers = weekReports.reduce((sum, report) => sum + Number(report.totalTransfers), 0);
  const weekGreenTransfers = weekReports.reduce((sum, report) => sum + Number(report.greenTransfers), 0);
  const conversion = weekTransfers ? Math.round((weekGreenTransfers / weekTransfers) * 1000) / 10 : 0;

  tasksTitle.textContent = `Мой день: ${activeUser.name}`;
  taskInProgress.textContent = reports.filter((report) => report.completed).length;
  taskCompleted.textContent = greenTransfers.toLocaleString("ru-RU");
  dayConversionBadge.textContent = `${conversion}%`;

  if (!dayForm.elements.date.value) {
    dayForm.elements.date.value = isoDate(new Date());
  }

  const maxTransfers = Math.max(1, ...week.map((day) => {
    const report = reports.find((item) => item.date === day.iso);
    return Number(report?.totalTransfers || 0);
  }));

  weeklyTransfersDashboard.innerHTML = week
    .map((day) => {
      const isWeekend = day.label === "ВС";
      const report = reports.find((item) => item.date === day.iso);
      const transfers = Number(report?.totalTransfers || 0);
      const greenTransfers = Number(report?.greenTransfers || 0);
      const percent = Math.round((transfers / maxTransfers) * 100);
      const conversion = transfers ? Math.round((greenTransfers / transfers) * 1000) / 10 : 0;
      return `
        <article class="weekly-transfer-row ${isWeekend ? "weekend" : ""}">
          <div class="weekly-transfer-day">
            <strong>${day.label}</strong>
            <small>${day.caption}</small>
          </div>
          <div class="weekly-transfer-main">
            <div class="weekly-transfer-meta">
              <b>${isWeekend && !report ? "Выходной" : `${transfers.toLocaleString("ru-RU")} передач`}</b>
              <span>${isWeekend && !report ? "воскресенье" : `${greenTransfers.toLocaleString("ru-RU")} зелёных · ${conversion}%`}</span>
            </div>
            <div class="weekly-transfer-track">
              <span style="width: ${percent}%"></span>
            </div>
          </div>
          <span class="role-badge ${report ? (report.completed ? "done" : "medium") : isWeekend ? "active" : "review"}">${report ? "Отмечен" : isWeekend ? "Выходной" : "Нет"}</span>
        </article>
      `;
    })
    .join("");
}

function renderResults() {
  syncPeriodControls(dealPeriodFilter, dealPeriodLabel, dealDateFilter, selectedDealPeriod, (value) => {
    selectedDealDate = value;
  });
  const currentPeriod = selectedDealPeriod === "all" ? "" : { mode: selectedDealPeriod, value: selectedDealDate };
  const deals = getDeals()
    .filter((deal) => activeUser?.role !== "closer" || deal.closerId === activeUser.id || deal.closerName === activeUser.name)
    .filter((deal) => entryMatchesPeriod(deal, currentPeriod))
    .sort((a, b) => b.createdAt - a.createdAt);
  const totalAmount = deals.reduce((sum, deal) => sum + Number(deal.amount), 0);

  resultsTitle.textContent = activeUser?.role === "closer" ? `Мои сделки: ${activeUser.name}` : "Мои сделки";
  weekTotalTransfers.textContent = deals.length;
  weekGreenTransfers.textContent = formatMoney(totalAmount);
  weekConversion.textContent = deals.filter((deal) => deal.status === "Закрыт").length;

  if (!deals.length) {
    weeklyResultsBody.innerHTML = '<tr><td colspan="4" class="access-text">Сделок пока нет.</td></tr>';
    return;
  }

  weeklyResultsBody.innerHTML = deals
    .map(
      (deal) => `
        <tr>
          <td>${deal.clientName}</td>
          <td>${deal.phone || "—"}</td>
          <td>${formatMoney(deal.amount)}</td>
          <td><span class="role-badge done">${deal.status}</span></td>
        </tr>
      `,
    )
    .join("");
}

function visibleClients() {
  return getClients()
    .filter((client) => activeUser?.role !== "closer" || client.closerId === activeUser.id || client.closerName === activeUser.name)
    .sort((a, b) => b.createdAt - a.createdAt);
}

function closerBusyStatus(count) {
  if (count >= 2) return "в работе с 2-я и более";
  if (count === 1) return "в работе с 1-м клиентом";
  return "свободен";
}

function renderClients() {
  syncPeriodControls(clientPeriodFilter, clientPeriodLabel, clientDateFilter, selectedClientPeriod, (value) => {
    selectedClientDate = value;
  });
  const currentPeriod = selectedClientPeriod === "all" ? "" : { mode: selectedClientPeriod, value: selectedClientDate };
  const clients = visibleClients().filter((client) => entryMatchesPeriod(client, currentPeriod));
  const expectedTotal = clients.reduce((sum, client) => sum + Number(client.expectedAmount), 0);
  const busyStatus = closerBusyStatus(clients.length);

  clientsTitle.textContent = activeUser?.role === "closer" ? `Мои клиенты: ${activeUser.name}` : "Мои клиенты";
  clientTotal.textContent = clients.length;
  clientExpectedTotal.textContent = formatMoney(expectedTotal);
  clientBusyStatus.textContent = busyStatus;
  clientsStatusBadge.textContent = busyStatus;
  if (clientForm.elements.date && !clientForm.elements.date.value) {
    clientForm.elements.date.value = isoDate(new Date());
  }

  if (!clients.length) {
    clientsTableBody.innerHTML = '<tr><td colspan="7" class="access-text">Клиентов пока нет.</td></tr>';
    return;
  }

  clientsTableBody.innerHTML = clients
    .map(
      (client) => `
        <tr>
          <td>${displayStoredDate(entryDate(client))}</td>
          <td>${client.clientName}</td>
          <td>${client.phone}</td>
          <td>${formatMoney(client.expectedAmount)}</td>
          <td>${client.comment || "—"}</td>
          <td>${client.closerName}</td>
          <td><button class="danger-btn compact-btn" type="button" data-cut-client="${client.id}">Срез</button></td>
        </tr>
      `,
    )
    .join("");
}

function employeeOptions(includeAll = false) {
  const employees = allEmployeeAccounts();
  const options = employees.map((employee) => `<option value="${employee.id}">${employee.name}</option>`).join("");
  return `${includeAll ? '<option value="all">Все сотрудники</option>' : ""}${options || '<option value="">Нет сотрудников</option>'}`;
}

function getVisibleMaterials() {
  return getMaterials().filter((item) => {
    if (!selectedMaterialDate) return true;
    return normalizeStoredDate(item.date) === selectedMaterialDate;
  });
}

function renderMaterials() {
  const materials = getVisibleMaterials();
  const total = materials.reduce((sum, item) => sum + Number(item.cost), 0);
  const uniqueCategories = new Set(materials.map((item) => item.method || "other"));

  materialFormPanel.classList.toggle("muted-panel", !canManage(activeUser));
  materialsTitle.textContent = selectedMaterialDate ? `Расход материалов за ${displayStoredDate(selectedMaterialDate)}` : "Расход материалов";

  materialTotalCost.textContent = formatMoney(total);
  materialRows.textContent = materials.length;
  materialEmployees.textContent = uniqueCategories.size;

  materialsTableBody.innerHTML = materials
    .map((item) => {
      return `
        <tr>
          <td>${item.material}</td>
          <td>${materialCategoryLabels[item.method] || "Другое"}</td>
          <td>${Number(item.quantity).toLocaleString("ru-RU")}</td>
          <td>${formatMoney(item.cost)}</td>
          <td><button class="danger-btn compact-btn" type="button" data-delete-material="${item.id}">Удалить</button></td>
        </tr>
      `;
    })
    .join("");

  if (!materials.length) {
    materialsTableBody.innerHTML = '<tr><td colspan="5" class="access-text">Пока нет записей по материалам.</td></tr>';
  }
}

function pointList(values, width, height, padding, maxValue) {
  const step = (width - padding.left - padding.right) / (values.length - 1);
  return values.map((value, index) => {
    const x = padding.left + index * step;
    const y = height - padding.bottom - (value / maxValue) * (height - padding.top - padding.bottom);
    return { x, y, value };
  });
}

function drawChart(period = "14") {
  if (!chart) return;

  const data = chartData[period];
  const width = 900;
  const height = 300;
  const padding = { top: 18, right: 18, bottom: 48, left: 48 };
  const maxValue = 210;
  const donePoints = pointList(data.done, width, height, padding, maxValue);
  const successPoints = pointList(data.success, width, height, padding, maxValue);
  const path = (points) => points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
  const area = (points) => `${path(points)} L${points.at(-1).x},${height - padding.bottom} L${points[0].x},${height - padding.bottom} Z`;
  const gridValues = [0, 50, 100, 150, 200];

  chart.innerHTML = `
    <defs>
      <linearGradient id="blueArea" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#2f78ff" stop-opacity=".16" />
        <stop offset="1" stop-color="#2f78ff" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="greenArea" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#21b573" stop-opacity=".16" />
        <stop offset="1" stop-color="#21b573" stop-opacity="0" />
      </linearGradient>
    </defs>
    ${gridValues
      .map((value) => {
        const y = height - padding.bottom - (value / maxValue) * (height - padding.top - padding.bottom);
        return `<g>
          <line x1="${padding.left}" x2="${width - padding.right}" y1="${y}" y2="${y}" stroke="#dfe7f1" />
          <text x="${padding.left - 16}" y="${y + 5}" text-anchor="end" fill="#72819c" font-size="13" font-weight="700">${value}</text>
        </g>`;
      })
      .join("")}
    <path d="${area(donePoints)}" fill="url(#blueArea)" />
    <path d="${area(successPoints)}" fill="url(#greenArea)" />
    <path d="${path(donePoints)}" fill="none" stroke="#2f78ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <path d="${path(successPoints)}" fill="none" stroke="#21b573" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    ${donePoints.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="4" fill="#2f78ff" stroke="#fff" stroke-width="2" />`).join("")}
    ${successPoints.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="4" fill="#21b573" stroke="#fff" stroke-width="2" />`).join("")}
    ${data.labels
      .map((label, index) => `<text x="${donePoints[index].x}" y="${height - 18}" text-anchor="middle" fill="#667895" font-size="13" font-weight="700">${label}</text>`)
      .join("")}
  `;
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const login = String(formData.get("login")).trim().toLowerCase();
  const password = String(formData.get("password"));
  const user = getAccounts().find((account) => accountLogin(account).toLowerCase() === login && account.password === password);

  if (!user) {
    showMessage(loginMessage, "Неверный login или password.", true);
    return;
  }

  if (rememberInput.checked) {
    localStorage.setItem(sessionKey, user.id);
    localStorage.setItem(rememberKey, "true");
    sessionStorage.removeItem(transientSessionKey);
  } else {
    sessionStorage.setItem(transientSessionKey, user.id);
    localStorage.removeItem(sessionKey);
    localStorage.removeItem(rememberKey);
  }
  showMessage(loginMessage, "");
  loginForm.reset();
  showApp(user);
});

accountMenuButton.addEventListener("click", () => {
  const isOpen = accountDropdown.classList.toggle("is-hidden");
  accountMenuButton.setAttribute("aria-expanded", String(!isOpen));
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem(sessionKey);
  localStorage.removeItem(rememberKey);
  sessionStorage.removeItem(transientSessionKey);
  activeUser = null;
  accountDropdown.classList.add("is-hidden");
  accountMenuButton.setAttribute("aria-expanded", "false");
  history.replaceState(null, "", "#login");
  showLogin();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".account-menu")) {
    accountDropdown.classList.add("is-hidden");
    accountMenuButton.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("[data-view-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const view = link.dataset.viewLink;
    if (link.dataset.departmentOpen) {
      selectedDepartment = link.dataset.departmentOpen;
    }
    history.replaceState(null, "", `#${view}`);
    setView(view);
  });
});

accountsTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-account]");
  if (!button || button.disabled) return;

  const accountId = button.dataset.deleteAccount;
  const accounts = getAccounts();
  const account = accounts.find((item) => item.id === accountId);
  if (!account || account.role === "developer") return;

  saveAccounts(accounts.filter((item) => item.id !== accountId));
  saveMaterials(getMaterials().filter((item) => item.employeeId !== accountId));
  saveDayReports(getDayReports().filter((report) => report.employeeId !== accountId));
  saveClients(getClients().filter((client) => client.closerId !== accountId));
  renderAccounts();
  renderDashboard();
  renderDepartments();
  renderMaterials();
  showMessage(accountMessage, `Аккаунт ${account.name} удален.`);
});

materialsTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-material]");
  if (!button || !canManage(activeUser)) return;

  const materialId = button.dataset.deleteMaterial;
  saveMaterials(getMaterials().filter((item) => item.id !== materialId));
  renderMaterials();
  renderDashboard();
  showMessage(materialMessage, "Запись расхода удалена.");
});

clientsTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cut-client]");
  if (!button || !canUseClients(activeUser)) return;

  const clientId = button.dataset.cutClient;
  const nextClients = getClients().filter((client) => client.id !== clientId);
  saveClients(nextClients);
  renderClients();
  showMessage(clientMessage, "Клиент срезан.");
});

document.querySelectorAll("[data-department-card]").forEach((card) => {
  card.addEventListener("click", () => {
    selectedDepartment = card.dataset.departmentCard;
    renderDepartments();
  });
});

departmentPeriodFilter.addEventListener("change", () => {
  selectedDepartmentPeriod = departmentPeriodFilter.value;
  selectedDepartmentDate = "";
  renderDepartments();
});

departmentDateFilter.addEventListener("change", () => {
  selectedDepartmentDate = departmentDateFilter.value;
  renderDepartments();
});

departmentDateClear.addEventListener("click", () => {
  selectedDepartmentPeriod = "all";
  departmentPeriodFilter.value = "all";
  selectedDepartmentDate = "";
  departmentDateFilter.value = "";
  renderDepartments();
});

materialDateFilter.addEventListener("change", () => {
  selectedMaterialDate = materialDateFilter.value;
  renderMaterials();
});

materialDateClear.addEventListener("click", () => {
  selectedMaterialDate = "";
  materialDateFilter.value = "";
  renderMaterials();
});

dealPeriodFilter.addEventListener("change", () => {
  selectedDealPeriod = dealPeriodFilter.value;
  selectedDealDate = "";
  dealDateFilter.value = "";
  renderResults();
});

dealDateFilter.addEventListener("change", () => {
  selectedDealDate = dealDateFilter.value;
  renderResults();
});

dealDateClear.addEventListener("click", () => {
  selectedDealPeriod = "all";
  dealPeriodFilter.value = "all";
  selectedDealDate = "";
  dealDateFilter.value = "";
  renderResults();
});

clientPeriodFilter.addEventListener("change", () => {
  selectedClientPeriod = clientPeriodFilter.value;
  selectedClientDate = "";
  clientDateFilter.value = "";
  renderClients();
});

clientDateFilter.addEventListener("change", () => {
  selectedClientDate = clientDateFilter.value;
  renderClients();
});

clientDateClear.addEventListener("click", () => {
  selectedClientPeriod = "all";
  clientPeriodFilter.value = "all";
  selectedClientDate = "";
  clientDateFilter.value = "";
  renderClients();
});

dealFormToggle.addEventListener("click", () => {
  dealForm.classList.toggle("is-hidden");
});

dealForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canUseDeals(activeUser)) return;

  const formData = new FormData(dealForm);
  const deal = {
    id: `deal-${Date.now()}`,
    clientName: String(formData.get("clientName")).trim(),
    phone: String(formData.get("phone")).trim(),
    closerName: activeUser.name,
    closerId: activeUser.id,
    amount: Number(formData.get("amount")),
    status: "Закрыт",
    date: isoDate(new Date()),
    createdAt: Date.now(),
  };

  const deals = getDeals();
  deals.push(deal);
  saveDeals(deals);
  dealForm.reset();
  renderResults();
  showMessage(dealMessage, "Сделка добавлена.");
});

clientForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canUseClients(activeUser)) return;

  const formData = new FormData(clientForm);
  const client = {
    id: `client-${Date.now()}`,
    date: normalizeStoredDate(String(formData.get("date")).trim()) || isoDate(new Date()),
    clientName: String(formData.get("clientName")).trim(),
    phone: String(formData.get("phone")).trim(),
    expectedAmount: Number(formData.get("expectedAmount")),
    comment: String(formData.get("comment")).trim(),
    closerName: activeUser.name,
    closerId: activeUser.id,
    createdAt: Date.now(),
  };

  const clients = getClients();
  clients.push(client);
  saveClients(clients);
  clientForm.reset();
  clientForm.elements.date.value = isoDate(new Date());
  renderClients();
  showMessage(clientMessage, "Клиент добавлен.");
});

accountForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const accounts = getAccounts();
  const formData = new FormData(accountForm);
  const login = String(formData.get("login")).trim().toLowerCase();

  if (accounts.some((account) => accountLogin(account).toLowerCase() === login)) {
    showMessage(accountMessage, "Такой login уже используется.", true);
    return;
  }

  const role = String(formData.get("role"));
  const password = String(formData.get("password")).trim();
  const account = {
    id: `${role}-${Date.now()}`,
    name: String(formData.get("name")).trim(),
    login,
    email: login,
    password,
    role,
    category: String(formData.get("department")),
    department: String(formData.get("department")),
    status: "Активен",
    access: role === "admin" ? "Команда и отчеты" : "Личный кабинет",
  };

  accounts.push(account);
  saveAccounts(accounts);
  accountForm.reset();
  renderAccounts();
  renderDashboard();
  renderDepartments();
  renderMaterials();
  showMessage(accountMessage, `Аккаунт создан. Login: ${login}, Password: ${password}`);
});

dayForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isWorker(activeUser)) return;

  const formData = new FormData(dayForm);
  const totalTransfersValue = Number(formData.get("totalTransfers"));
  const greenTransfersValue = Number(formData.get("greenTransfers"));

  if (greenTransfersValue > totalTransfersValue) {
    showMessage(dayMessage, "Зелёных трубок не может быть больше общего количества передач.", true);
    return;
  }

  const reports = getDayReports();
  const report = {
    id: `day-${Date.now()}`,
    employeeId: activeUser.id,
    date: String(formData.get("date")),
    completed: formData.get("completed") === "on",
    expense: 0,
    totalTransfers: totalTransfersValue,
    greenTransfers: greenTransfersValue,
    planComment: String(formData.get("planComment")).trim(),
    changeComment: String(formData.get("changeComment")).trim(),
    addedComment: String(formData.get("addedComment")).trim(),
  };

  const nextReports = reports.filter((item) => !(item.employeeId === activeUser.id && item.date === report.date));
  nextReports.push(report);
  saveDayReports(nextReports);
  renderTasks();
  renderDashboard();
  renderDepartments();
  renderResults();
  showMessage(dayMessage, "День сохранён.");
});

materialForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canManage(activeUser)) return;

  const formData = new FormData(materialForm);
  const materials = getMaterials();
  materials.push({
    id: `material-${Date.now()}`,
    material: String(formData.get("material")).trim(),
    method: String(formData.get("method")),
    quantity: Number(formData.get("quantity")),
    cost: Number(formData.get("cost")),
    date: isoDate(new Date()),
  });

  saveMaterials(materials);
  materialForm.reset();
  renderMaterials();
  renderDashboard();
  showMessage(materialMessage, "Расход материала сохранен.");
});

roleFilter.addEventListener("change", renderAccounts);
select.addEventListener("change", (event) => drawChart(event.target.value));
taskWeekFilter.addEventListener("change", renderTasks);
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

async function initApp() {
  await loadRemoteData();
  const currentUser = getCurrentUser();
  if (currentUser) {
    showApp(currentUser);
  } else {
    showLogin();
  }
}

applyTheme(localStorage.getItem(themeKey) || "light");
initApp();
